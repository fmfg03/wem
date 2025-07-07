
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from '@/utils/slugUtils';

/**
 * Find or create a category by name
 */
export const findOrCreateCategory = async (categoryName: string): Promise<string | null> => {
  // Check if category exists
  const { data: existingCategories } = await supabase
    .from('categories')
    .select('id')
    .eq('name', categoryName)
    .limit(1);
    
  if (existingCategories && existingCategories.length > 0) {
    return existingCategories[0].id;
  }
  
  // Create new category
  const categorySlug = generateSlug(categoryName);
  const { data: newCategory, error: categoryError } = await supabase
    .from('categories')
    .insert({
      name: categoryName,
      description: null,
      slug: categorySlug
    })
    .select('id')
    .single();
    
  if (categoryError) throw categoryError;
  if (!newCategory) return null;
  
  return newCategory.id;
};
