import { supabase } from "@/integrations/supabase/client";

/**
 * Type definition for a Setting object
 */
export interface Setting {
  id: string;
  key: string;
  value: any;
  category?: string;
  description?: string;
  updated_at: string;
}

/**
 * Fetches all settings from the database
 */
export const fetchAllSettings = async (): Promise<Setting[]> => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .order('key', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching settings:', error);
    return [];
  }
};

/**
 * Fetches settings by category
 */
export const fetchSettingsByCategory = async (category: string): Promise<Setting[]> => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('category', category)
      .order('key', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching settings for category ${category}:`, error);
    return [];
  }
};

/**
 * Fetches a single setting by key
 */
export const fetchSettingByKey = async (key: string): Promise<Setting | null> => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', key)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching setting with key ${key}:`, error);
    return null;
  }
};

/**
 * Creates a new setting if it doesn't exist or returns the existing one
 */
export const getOrCreateSetting = async (
  key: string, 
  defaultValue: any, 
  category?: string, 
  description?: string
): Promise<Setting | null> => {
  // First try to get the setting
  const existingSetting = await fetchSettingByKey(key);
  
  // If it exists, return it
  if (existingSetting) {
    return existingSetting;
  }
  
  // Otherwise, create a new setting
  try {
    const { data, error } = await supabase
      .from('settings')
      .insert({
        key,
        value: defaultValue,
        category,
        description
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error creating setting with key ${key}:`, error);
    return null;
  }
};
