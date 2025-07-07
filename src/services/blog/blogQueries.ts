
import { supabase } from "@/integrations/supabase/client";

/**
 * Test connection to Supabase for blog functionality
 */
export const testBlogConnection = async (): Promise<boolean> => {
  console.log("🧪 Testing Supabase connection for blog posts...");
  // Get the Supabase URL from the environment variable or client configuration
  const supabaseUrl = process.env.SUPABASE_URL || "https://murxvnwhxvtfkajcwenw.supabase.co";
  console.log("🌐 Using Supabase URL:", supabaseUrl);
  console.log("🔑 API Key provided:", !!supabase);
  
  try {
    // Attempt a simple query to check connection
    console.log("🔍 Attempting simple count query on blog_posts table...");
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count(*)', { count: 'exact' })
      .limit(1)
      .single();
    
    if (error) {
      console.error("❌ Blog posts connection test failed:", error.message);
      console.error("Error code:", error.code);
      console.error("Error details:", JSON.stringify(error, null, 2));
      
      // Try a different query to see if the issue is specific to the count query
      console.log("🔍 Attempting alternative blog query to check connection...");
      const { error: altError } = await supabase.from('blog_posts').select('id').limit(1);
      
      if (altError) {
        console.error("❌ Alternative blog query also failed:", altError.message);
      } else {
        console.log("✅ Alternative blog query succeeded but count query failed");
      }
      
      return false;
    }
    
    console.log("✅ Blog connection test successful!", data);
    return true;
  } catch (err) {
    console.error("❌ Unexpected error during blog connection test:", err);
    console.error("Error type:", typeof err);
    console.error("Error stack:", err instanceof Error ? err.stack : "No stack trace available");
    return false;
  }
};

/**
 * Fetch all blog posts from the database
 */
export const fetchBlogPosts = async () => {
  console.log("📰 Fetching blog posts from Supabase database...");
  
  try {
    // First test the connection
    const isConnected = await testBlogConnection();
    
    if (!isConnected) {
      console.error("❌ Cannot fetch blog posts: Database connection failed");
      throw new Error("Database connection failed");
    }
    
    console.log("🔍 Executing blog posts query...");
    
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error("❌ Error fetching blog posts:", error.message);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
    
    console.log(`✅ Successfully fetched ${blogPosts?.length || 0} blog posts from database`);
    
    return blogPosts || [];
  } catch (err) {
    console.error("❌ Error in fetchBlogPosts:", err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    throw err;
  }
};

/**
 * Fetch a single blog post by slug
 */
export const fetchBlogPostBySlug = async (slug: string) => {
  console.log(`🔍 Fetching blog post with slug: ${slug}`);
  
  try {
    // First test the connection
    const isConnected = await testBlogConnection();
    
    if (!isConnected) {
      console.error(`❌ Cannot fetch blog post ${slug}: Database connection failed`);
      throw new Error("Database connection failed");
    }
    
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error(`❌ Error fetching blog post with slug ${slug}:`, error.message);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
    
    if (!post) {
      console.log(`⚠️ No blog post found with slug: ${slug}`);
      return null;
    }
    
    return post;
  } catch (err) {
    console.error(`❌ Error fetching blog post with slug ${slug}:`, err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    throw err;
  }
};
