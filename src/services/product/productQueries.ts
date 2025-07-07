
import { supabase } from "@/integrations/supabase/client";
import { FrontendProduct } from '@/contexts/ProductContext';
import { convertDbProductToFrontend } from './productConverters';

/**
 * Test the connection to Supabase
 */
export const testSupabaseConnection = async (): Promise<boolean> => {
  console.log("🧪 Testing Supabase connection...");
  // Get the Supabase URL from the environment variable or client configuration
  const supabaseUrl = process.env.SUPABASE_URL || "https://murxvnwhxvtfkajcwenw.supabase.co";
  console.log("🌐 Using Supabase URL:", supabaseUrl);
  console.log("🔑 API Key provided:", !!supabase);
  
  try {
    // First attempt a simple query to check connection
    console.log("🔍 Attempting simple count query on products table...");
    const { data, error } = await supabase
      .from('products')
      .select('count(*)', { count: 'exact' })
      .limit(1)
      .single();
    
    if (error) {
      console.error("❌ Supabase connection test failed:", error.message);
      console.error("Error code:", error.code);
      console.error("Error details:", JSON.stringify(error, null, 2));
      
      // Try a different query to see if the issue is specific to the count query
      console.log("🔍 Attempting alternative query to check connection...");
      const { error: altError } = await supabase.from('categories').select('id').limit(1);
      
      if (altError) {
        console.error("❌ Alternative query also failed:", altError.message);
      } else {
        console.log("✅ Alternative query succeeded but count query failed");
      }
      
      return false;
    }
    
    console.log("✅ Supabase connection test successful!", data);
    return true;
  } catch (err) {
    console.error("❌ Unexpected error during connection test:", err);
    console.error("Error type:", typeof err);
    console.error("Error stack:", err instanceof Error ? err.stack : "No stack trace available");
    return false;
  }
};

/**
 * Fetch all products with their related data
 */
export const fetchProducts = async (): Promise<FrontendProduct[]> => {
  console.log("📊 Fetching products from Supabase database...");
  
  try {
    // First test the connection
    const isConnected = await testSupabaseConnection();
    
    if (!isConnected) {
      console.error("❌ Cannot fetch products: Database connection failed");
      throw new Error("Database connection failed");
    }
    
    console.log("🔍 Executing products query with related data...");
    
    const startTime = performance.now();
    
    const { data: dbProducts, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        categories:category_id (*),
        product_specifications:product_specifications(*)
      `);
    
    const endTime = performance.now();
    console.log(`⏱️ Query execution time: ${(endTime - startTime).toFixed(2)}ms`);
    
    if (productsError) {
      console.error("❌ Error fetching products:", productsError.message);
      console.error("Error details:", JSON.stringify(productsError, null, 2));
      throw productsError;
    }
    
    console.log(`✅ Successfully fetched ${dbProducts?.length || 0} products from database`);
    console.log("📦 Sample product data:", dbProducts && dbProducts.length > 0 ? JSON.stringify(dbProducts[0], null, 2) : "No products found");
    
    // If the database is empty, return an empty array
    if (!dbProducts || dbProducts.length === 0) {
      console.log("⚠️ No products found in database");
      return [];
    }
    
    // Convert to frontend format
    const frontendProducts: FrontendProduct[] = dbProducts.map(product => {
      const category = product.categories;
      const specifications = Array.isArray(product.product_specifications) && 
                            product.product_specifications.length > 0 ? 
                            product.product_specifications[0] : null;
      
      return convertDbProductToFrontend(product, category, specifications);
    });
    
    return frontendProducts;
  } catch (err) {
    console.error("❌ Error in fetchProducts:", err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    throw err;
  }
};

/**
 * Fetch a single product by ID with related data
 */
export const fetchProductById = async (id: string): Promise<FrontendProduct | null> => {
  console.log(`🔍 Fetching product with ID: ${id}`);
  
  try {
    // First test the connection
    const isConnected = await testSupabaseConnection();
    
    if (!isConnected) {
      console.error(`❌ Cannot fetch product ${id}: Database connection failed`);
      throw new Error("Database connection failed");
    }
    
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        categories:category_id (*),
        product_specifications:product_specifications(*)
      `)
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`❌ Error fetching product with ID ${id}:`, error.message);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
    
    if (!product) {
      console.log(`⚠️ No product found with ID: ${id}`);
      return null;
    }
    
    // Convert to frontend format
    const category = product.categories;
    const specifications = Array.isArray(product.product_specifications) && 
                           product.product_specifications.length > 0 ? 
                           product.product_specifications[0] : null;
    
    return convertDbProductToFrontend(product, category, specifications);
  } catch (err) {
    console.error(`❌ Error fetching product with ID ${id}:`, err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    throw err;
  }
};
