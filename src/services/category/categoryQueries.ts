
import { supabase } from "@/integrations/supabase/client";
import { Category } from '@/types/database';

/**
 * Test connection to Supabase for category functionality
 */
export const testCategoryConnection = async (): Promise<boolean> => {
  console.log("🧪 Testing Supabase connection for categories...");
  // Get the Supabase URL from the environment variable or client configuration
  const supabaseUrl = process.env.SUPABASE_URL || "https://murxvnwhxvtfkajcwenw.supabase.co";
  console.log("🌐 Using Supabase URL:", supabaseUrl);
  console.log("🔑 API Key provided:", !!supabase);
  
  try {
    // Attempt a simple query to check connection
    console.log("🔍 Attempting simple count query on categories table...");
    const { data, error } = await supabase
      .from('categories')
      .select('count(*)', { count: 'exact' })
      .limit(1)
      .single();
    
    if (error) {
      console.error("❌ Categories connection test failed:", error.message);
      console.error("Error code:", error.code);
      console.error("Error details:", JSON.stringify(error, null, 2));
      
      // Try a different query to see if the issue is specific to the count query
      console.log("🔍 Attempting alternative category query to check connection...");
      const { error: altError } = await supabase.from('categories').select('id').limit(1);
      
      if (altError) {
        console.error("❌ Alternative category query also failed:", altError.message);
      } else {
        console.log("✅ Alternative category query succeeded but count query failed");
      }
      
      return false;
    }
    
    console.log("✅ Categories connection test successful!", data);
    return true;
  } catch (err) {
    console.error("❌ Unexpected error during categories connection test:", err);
    console.error("Error type:", typeof err);
    console.error("Error stack:", err instanceof Error ? err.stack : "No stack trace available");
    return false;
  }
};

/**
 * Fetch all categories from the database
 */
export const fetchAllCategories = async (): Promise<Category[]> => {
  console.log("📂 Fetching all categories from Supabase database...");
  
  try {
    // First test the connection
    const isConnected = await testCategoryConnection();
    
    if (!isConnected) {
      console.error("❌ Cannot fetch categories: Database connection failed");
      throw new Error("Database connection failed");
    }
    
    console.log("🔍 Executing categories query...");
    
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error("❌ Error fetching categories:", error.message);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
    
    console.log(`✅ Successfully fetched ${categories?.length || 0} categories from database`);
    
    return categories || [];
  } catch (err) {
    console.error("❌ Error in fetchAllCategories:", err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    throw err;
  }
};

/**
 * Fetch a single category by ID
 */
export const fetchCategoryById = async (id: string): Promise<Category | null> => {
  console.log(`🔍 Fetching category with ID: ${id}`);
  
  try {
    // First test the connection
    const isConnected = await testCategoryConnection();
    
    if (!isConnected) {
      console.error(`❌ Cannot fetch category ${id}: Database connection failed`);
      throw new Error("Database connection failed");
    }
    
    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`❌ Error fetching category with ID ${id}:`, error.message);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
    
    if (!category) {
      console.log(`⚠️ No category found with ID: ${id}`);
      return null;
    }
    
    return category;
  } catch (err) {
    console.error(`❌ Error fetching category with ID ${id}:`, err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    throw err;
  }
};

/**
 * Fetch a single category by slug
 */
export const fetchCategoryBySlug = async (slug: string): Promise<Category | null> => {
  console.log(`🔍 Fetching category with slug: ${slug}`);
  
  try {
    // First test the connection
    const isConnected = await testCategoryConnection();
    
    if (!isConnected) {
      console.error(`❌ Cannot fetch category ${slug}: Database connection failed`);
      throw new Error("Database connection failed");
    }
    
    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error(`❌ Error fetching category with slug ${slug}:`, error.message);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
    
    if (!category) {
      console.log(`⚠️ No category found with slug: ${slug}`);
      return null;
    }
    
    return category;
  } catch (err) {
    console.error(`❌ Error fetching category with slug ${slug}:`, err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    throw err;
  }
};
