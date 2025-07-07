
import { supabase } from "@/integrations/supabase/client";
import { MediaFile } from '@/components/admin/MediaUpload';

/**
 * Test connection to Supabase for media functionality
 */
export const testMediaConnection = async (): Promise<boolean> => {
  console.log("🧪 Testing Supabase connection for media files...");
  // Get the Supabase URL from the environment variable or client configuration
  const supabaseUrl = process.env.SUPABASE_URL || "https://murxvnwhxvtfkajcwenw.supabase.co";
  console.log("🌐 Using Supabase URL:", supabaseUrl);
  console.log("🔑 API Key provided:", !!supabase);
  
  try {
    // First check if the media bucket exists
    console.log("📦 Checking if media bucket exists...");
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error("❌ Error listing buckets:", bucketError);
      return false;
    }
    
    const mediaBucketExists = buckets.some(bucket => bucket.name === 'media');
    console.log("📦 Media bucket exists:", mediaBucketExists);
    
    // Attempt a simple query to check connection to media_files table
    console.log("🔍 Attempting simple count query on media_files table...");
    const { count, error } = await supabase
      .from('media_files')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error("❌ Media files connection test failed:", error.message);
      console.error("Error code:", error.code);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return false;
    }
    
    console.log(`✅ Media connection test successful! Found ${count} files`);
    return true;
  } catch (err) {
    console.error("❌ Unexpected error during media connection test:", err);
    console.error("Error type:", typeof err);
    console.error("Error stack:", err instanceof Error ? err.stack : "No stack trace available");
    return false;
  }
};

/**
 * Fetch all media files from the database
 */
export const fetchMediaFiles = async (): Promise<MediaFile[]> => {
  console.log("Fetching media files from database...");
  
  try {
    // Fetch media metadata from the database
    const { data: mediaData, error: mediaError } = await supabase
      .from('media_files')
      .select('*')
      .order('upload_date', { ascending: false });
    
    if (mediaError) {
      console.error("Database fetch error:", mediaError);
      throw mediaError;
    }
    
    console.log("Media files fetched:", mediaData?.length || 0);
    
    if (!mediaData || mediaData.length === 0) {
      console.log("No media files found in database");
      return [];
    }
    
    // Convert database records to MediaFile format
    const mediaFiles = mediaData.map(file => ({
      id: file.id,
      name: file.original_name,
      type: file.file_type,
      size: file.file_size,
      url: file.public_url,
      uploadDate: file.upload_date,
      altText: file.alt_text || '',
      width: file.width,
      height: file.height
    }));
    
    return mediaFiles;
  } catch (err) {
    console.error("Error fetching media files:", err);
    throw err;
  }
};

/**
 * Fetch a single media file by ID
 */
export const fetchMediaFileById = async (id: string): Promise<MediaFile | null> => {
  console.log(`🔍 Fetching media file with ID: ${id}`);
  
  try {
    // First test the connection
    const isConnected = await testMediaConnection();
    
    if (!isConnected) {
      console.error(`❌ Cannot fetch media file ${id}: Database connection failed`);
      throw new Error("Database connection failed");
    }
    
    const { data: file, error } = await supabase
      .from('media_files')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`❌ Error fetching media file with ID ${id}:`, error.message);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
    
    if (!file) {
      console.log(`⚠️ No media file found with ID: ${id}`);
      return null;
    }
    
    // Transform to the expected MediaFile format
    const mediaFile: MediaFile = {
      id: file.id,
      name: file.original_name,
      type: file.file_type,
      size: file.file_size,
      url: file.public_url,
      uploadDate: file.upload_date,
      altText: file.alt_text || '',
      width: file.width,
      height: file.height
    };
    
    return mediaFile;
  } catch (err) {
    console.error(`❌ Error fetching media file with ID ${id}:`, err);
    console.error("Error stack:", err instanceof Error ? err.stack : "Unknown error");
    throw err;
  }
};
