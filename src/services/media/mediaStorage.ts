
import { supabase } from "@/integrations/supabase/client";
import { testMediaConnection } from './mediaQueries';

/**
 * Ensures the media storage bucket exists
 */
export const ensureMediaBucketExists = async (): Promise<void> => {
  try {
    // First test connection to database
    const isConnected = await testMediaConnection();
    
    if (!isConnected) {
      console.error("❌ Cannot check media bucket: Database connection failed");
      throw new Error("Database connection failed");
    }
    
    // Check if bucket exists
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Error checking buckets:', error);
      throw error;
    }
    
    if (!buckets.some(bucket => bucket.name === 'media')) {
      console.log('Media bucket does not exist. Creating it now...');
      // Create media bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket('media', {
        public: true,
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (createError) {
        console.error('Error creating media bucket:', createError);
        throw createError;
      }
      
      console.log('✅ Created media storage bucket successfully');
    } else {
      console.log('✅ Media bucket already exists');
    }
  } catch (err) {
    console.error('Error checking/creating storage bucket:', err);
    throw err;
  }
};

/**
 * Ensures the RLS policies for media bucket are set
 * Note: This requires admin rights, so it's better to use SQL migrations
 * This is just a helper method for reference
 */
export const setupMediaBucketPolicies = async (): Promise<void> => {
  try {
    console.log('Checking media bucket policies...');
    // This would typically be done through SQL migrations
    // Left as a reference for what needs to be set up
  } catch (err) {
    console.error('Error setting up media bucket policies:', err);
    throw err;
  }
};
