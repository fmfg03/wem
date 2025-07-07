
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { MediaFile } from '@/components/admin/MediaUpload';
import { ensureMediaBucketExists } from './mediaStorage';

/**
 * Uploads a file to Supabase storage and creates a database record
 */
export const uploadMediaFile = async (file: File): Promise<MediaFile | null> => {
  const fileId = uuidv4();
  const fileName = `${fileId}-${file.name}`;
  const filePath = `uploads/${fileName}`;
  
  try {
    console.log(`Starting upload for file: ${file.name} (${file.size} bytes)`);
    
    // First ensure the media bucket exists
    await ensureMediaBucketExists();
    
    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error("Storage upload error:", error);
      throw error;
    }
    
    console.log(`✅ File uploaded successfully to storage: ${filePath}`);
    
    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
    
    // Get image dimensions if it's an image
    let width, height;
    if (file.type.startsWith('image/')) {
      try {
        const dimensions = await getImageDimensions(file);
        width = dimensions.width;
        height = dimensions.height;
      } catch (err) {
        console.warn("Could not get image dimensions:", err);
      }
    }
    
    // Store metadata in the database
    const { data: mediaData, error: mediaError } = await supabase
      .from('media_files')
      .insert({
        id: fileId,
        filename: fileName,
        original_name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
        public_url: publicUrl,
        alt_text: '',
        upload_date: new Date().toISOString(),
        width,
        height
      })
      .select()
      .single();
    
    if (mediaError) {
      console.error("Database insert error:", mediaError);
      throw mediaError;
    }
    
    console.log("✅ File metadata saved to database:", mediaData);
    
    // Create a MediaFile object to return
    const mediaFile: MediaFile = {
      id: fileId,
      name: file.name,
      type: file.type,
      size: file.size,
      url: publicUrl,
      uploadDate: new Date().toISOString(),
      altText: '',
      width,
      height
    };
    
    return mediaFile;
  } catch (error) {
    console.error("Error uploading file to Supabase:", error);
    throw error;
  }
};

/**
 * Helper function to get image dimensions
 */
const getImageDimensions = (file: File): Promise<{width: number, height: number}> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Delete a media file from storage and database
 */
export const deleteMediaFile = async (id: string): Promise<void> => {
  console.log("Deleting media file:", id);
  
  try {
    // Find the file to delete from the database
    const { data: fileData, error: fetchError } = await supabase
      .from('media_files')
      .select('file_path')
      .eq('id', id)
      .single();
      
    if (fetchError) {
      console.error("Database fetch error:", fetchError);
      throw fetchError;
    }
    
    if (!fileData) {
      console.error("Media file not found:", id);
      throw new Error('Media file not found');
    }
    
    // Delete from the database first
    const { error: dbError } = await supabase
      .from('media_files')
      .delete()
      .eq('id', id);
      
    if (dbError) {
      console.error("Database delete error:", dbError);
      throw dbError;
    }
    
    console.log(`✅ Deleted file record from database: ${id}`);
    
    // Then delete from Supabase storage
    const { error: storageError } = await supabase.storage
      .from('media')
      .remove([fileData.file_path]);
      
    if (storageError) {
      console.warn("Storage delete error, but continuing:", storageError);
    } else {
      console.log(`✅ Deleted file from storage: ${fileData.file_path}`);
    }
  } catch (err) {
    console.error("Error deleting file:", err);
    throw err;
  }
};

/**
 * Update media file metadata in the database
 */
export const updateMediaFile = async (updatedFile: MediaFile): Promise<void> => {
  console.log("Updating media file:", updatedFile.id);
  
  try {
    // Update metadata in database
    const { error } = await supabase
      .from('media_files')
      .update({
        alt_text: updatedFile.altText,
        original_name: updatedFile.name // Allow name updates
      })
      .eq('id', updatedFile.id);
      
    if (error) {
      console.error("Database update error:", error);
      throw error;
    }
    
    console.log("✅ Media file updated successfully:", updatedFile.id);
  } catch (err) {
    console.error("Error updating file:", err);
    throw err;
  }
};

/**
 * Upload multiple files at once
 */
export const uploadMultipleMediaFiles = async (files: File[]): Promise<MediaFile[]> => {
  console.log(`Starting batch upload for ${files.length} files`);
  
  const results: MediaFile[] = [];
  const errors: {file: string, error: any}[] = [];
  
  // Process files in sequence to avoid overwhelming the server
  for (const file of files) {
    try {
      const result = await uploadMediaFile(file);
      if (result) {
        results.push(result);
      }
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      errors.push({file: file.name, error});
    }
  }
  
  if (errors.length > 0) {
    console.warn(`Completed with ${errors.length} errors:`, errors);
  }
  
  console.log(`✅ Batch upload completed. Uploaded ${results.length} of ${files.length} files`);
  return results;
};
