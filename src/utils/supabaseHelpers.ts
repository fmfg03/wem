import { supabase } from "@/integrations/supabase/client";
import { CompleteProduct, Product, Category, ProductSpecification } from '@/types/database';
import { FrontendProduct } from '@/contexts/ProductContext';
import { convertDbProductToFrontend } from '@/services/product';

/**
 * Fetches a product by its slug with all related data
 */
export const fetchProductBySlug = async (slug: string): Promise<FrontendProduct | null> => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        categories:category_id (*),
        product_specifications:product_specifications(*)
      `)
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    if (!product) return null;
    
    // Convert to frontend format
    const category = product.categories;
    const specifications = Array.isArray(product.product_specifications) && 
                        product.product_specifications.length > 0 ? 
                        product.product_specifications[0] : null;
    
    return convertDbProductToFrontend(product, category, specifications);
    
  } catch (err) {
    console.error('Error fetching product by slug:', err);
    return null;
  }
};

/**
 * Fetches all categories from the database
 */
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
};
