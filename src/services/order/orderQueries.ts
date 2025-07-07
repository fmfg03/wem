
import { supabase } from "@/integrations/supabase/client";
import { Order } from '@/types/order';
import { mockOrders } from '@/data/orders';

/**
 * Test connection to Supabase for order functionality
 * Note: Orders are currently mocked, but this prepares for future database integration
 */
export const testOrderConnection = async (): Promise<boolean> => {
  console.log("🧪 Testing Supabase connection for orders...");
  // Get the Supabase URL from the environment variable or client configuration
  const supabaseUrl = process.env.SUPABASE_URL || "https://murxvnwhxvtfkajcwenw.supabase.co";
  console.log("🌐 Using Supabase URL:", supabaseUrl);
  console.log("🔑 API Key provided:", !!supabase);
  
  try {
    // Check if we can connect to Supabase in general
    // Note: We're checking the categories table since orders are still mocked
    console.log("🔍 Attempting test query to check database connection...");
    const { data, error } = await supabase
      .from('categories')
      .select('count(*)', { count: 'exact' })
      .limit(1)
      .single();
    
    if (error) {
      console.error("❌ Database connection test failed:", error.message);
      console.error("Error code:", error.code);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return false;
    }
    
    console.log("✅ Database connection test successful!");
    console.log("⚠️ Note: Orders are currently using mock data, not database storage");
    return true;
  } catch (err) {
    console.error("❌ Unexpected error during connection test:", err);
    console.error("Error type:", typeof err);
    console.error("Error stack:", err instanceof Error ? err.stack : "No stack trace available");
    return false;
  }
};

/**
 * Fetch all orders
 * Note: Currently returns mock data, but includes database connection checks for future integration
 */
export const fetchAllOrders = async (): Promise<Order[]> => {
  console.log("🛒 Fetching all orders...");
  
  try {
    // Test the database connection for future integration
    await testOrderConnection();
    
    // Return mock data for now
    console.log("⚠️ Using mock order data since orders are not yet stored in database");
    console.log(`📦 Returning ${mockOrders.length} mock orders`);
    return mockOrders;
  } catch (err) {
    console.error("❌ Error in fetchAllOrders:", err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    
    // Even if there's an error connecting to the database, return mock data
    // since that's what we're using currently
    console.log("⚠️ Using mock order data due to connection error");
    return mockOrders;
  }
};

/**
 * Fetch an order by ID
 * Note: Currently searches mock data, but includes database connection checks for future integration
 */
export const fetchOrderById = async (id: string): Promise<Order | null> => {
  console.log(`🔍 Fetching order with ID: ${id}`);
  
  try {
    // Test the database connection for future integration
    await testOrderConnection();
    
    // Search in mock data for now
    console.log("⚠️ Searching in mock order data since orders are not yet stored in database");
    const order = mockOrders.find(order => order.id === id) || null;
    
    if (!order) {
      console.log(`⚠️ No order found with ID: ${id}`);
      return null;
    }
    
    return order;
  } catch (err) {
    console.error(`❌ Error fetching order with ID ${id}:`, err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    
    // Even if there's an error connecting to the database, search mock data
    // since that's what we're using currently
    console.log("⚠️ Searching in mock order data due to connection error");
    return mockOrders.find(order => order.id === id) || null;
  }
};

/**
 * Fetch orders by user ID
 * Note: Currently filters mock data, but includes database connection checks for future integration
 */
export const fetchOrdersByUserId = async (userId: string): Promise<Order[]> => {
  console.log(`🔍 Fetching orders for user with ID: ${userId}`);
  
  try {
    // Test the database connection for future integration
    await testOrderConnection();
    
    // Filter mock data for now
    console.log("⚠️ Filtering mock order data since orders are not yet stored in database");
    const userOrders = mockOrders.filter(order => order.userId === userId);
    
    console.log(`📦 Found ${userOrders.length} orders for user ${userId}`);
    return userOrders;
  } catch (err) {
    console.error(`❌ Error fetching orders for user ${userId}:`, err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    
    // Even if there's an error connecting to the database, filter mock data
    // since that's what we're using currently
    console.log("⚠️ Filtering mock order data due to connection error");
    return mockOrders.filter(order => order.userId === userId);
  }
};
