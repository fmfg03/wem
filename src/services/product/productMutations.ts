
import { supabase } from "@/integrations/supabase/client";
import { FrontendProduct } from '@/contexts/ProductContext';
import { generateSlug } from '@/utils/slugUtils';
import { convertDbProductToFrontend } from './productConverters';
import { findOrCreateCategory } from './categoryService';
import { Product as DbProduct, Category, ProductSpecification } from '@/types/database';

/**
 * Create a new product
 */
export const createProduct = async (product: Omit<FrontendProduct, 'id' | 'slug'>): Promise<FrontendProduct | null> => {
  const slug = generateSlug(product.name);
  
  // Find or create the category
  const categoryId = await findOrCreateCategory(product.category);
  if (!categoryId) throw new Error('Failed to create or find category');

  // Insert the product
  const { data: newProduct, error: productError } = await supabase
    .from('products')
    .insert({
      name: product.name,
      description: product.description,
      category_id: categoryId,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      weight: product.weight || 0.1, // Default weight if not specified
      featured: product.featured,
      image: product.image || null,
      slug: slug
    })
    .select()
    .single();
    
  if (productError) throw productError;
  if (!newProduct) throw new Error('Failed to create product');

  // Add product specifications
  if (product.specifications || product.technical) {
    const { error: specError } = await supabase
      .from('product_specifications')
      .insert({
        product_id: newProduct.id,
        medida: product.specifications?.medida || null,
        color: product.specifications?.color || null,
        calibre: product.specifications?.calibre || null,
        calidad: product.specifications?.calidad || null,
        tipo_camiseta: product.technical?.tipoCamiseta || false,
        suaje_reforzado: product.technical?.suajeReforzado || false,
        polipapel: product.technical?.polipapel || false,
        compostable: product.technical?.compostable || false
      });
      
    if (specError) throw specError;
  }

  // Convert and return
  const category: Category = { 
    id: categoryId, 
    name: product.category, 
    description: null, 
    slug: generateSlug(product.category) 
  };
  
  const specifications: ProductSpecification | null = (product.specifications || product.technical) ? {
    id: '',
    product_id: newProduct.id,
    medida: product.specifications?.medida || null,
    color: product.specifications?.color || null,
    calibre: product.specifications?.calibre || null,
    calidad: product.specifications?.calidad || null,
    tipo_camiseta: product.technical?.tipoCamiseta || false,
    suaje_reforzado: product.technical?.suajeReforzado || false,
    polipapel: product.technical?.polipapel || false,
    compostable: product.technical?.compostable || false
  } : null;
  
  return convertDbProductToFrontend(newProduct, category, specifications);
};

/**
 * Update an existing product
 */
export const updateProductInDb = async (id: string, updates: Partial<FrontendProduct>): Promise<void> => {
  let dbUpdates: Partial<DbProduct> = {};

  // If name is updated, regenerate the slug
  if (updates.name) {
    dbUpdates.name = updates.name;
    dbUpdates.slug = generateSlug(updates.name);
  }

  // If category is updated, find or create it
  let categoryId = null;
  if (updates.category) {
    categoryId = await findOrCreateCategory(updates.category);
    if (categoryId) {
      dbUpdates.category_id = categoryId;
    }
  }

  // Add other fields to update
  if (updates.description !== undefined) dbUpdates.description = updates.description;
  if (updates.sku !== undefined) dbUpdates.sku = updates.sku;
  if (updates.price !== undefined) dbUpdates.price = updates.price;
  if (updates.stock !== undefined) dbUpdates.stock = updates.stock;
  if (updates.weight !== undefined) dbUpdates.weight = updates.weight;
  if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
  if (updates.image !== undefined) dbUpdates.image = updates.image;

  // Update product in database
  if (Object.keys(dbUpdates).length > 0) {
    const { error: productError } = await supabase
      .from('products')
      .update(dbUpdates)
      .eq('id', id);
      
    if (productError) throw productError;
  }

  // Update specifications if needed
  if (updates.specifications || updates.technical) {
    const specUpdates: Partial<ProductSpecification> = {};
    
    if (updates.specifications?.medida !== undefined) specUpdates.medida = updates.specifications.medida;
    if (updates.specifications?.color !== undefined) specUpdates.color = updates.specifications.color;
    if (updates.specifications?.calibre !== undefined) specUpdates.calibre = updates.specifications.calibre;
    if (updates.specifications?.calidad !== undefined) specUpdates.calidad = updates.specifications.calidad;
    
    if (updates.technical?.tipoCamiseta !== undefined) specUpdates.tipo_camiseta = updates.technical.tipoCamiseta;
    if (updates.technical?.suajeReforzado !== undefined) specUpdates.suaje_reforzado = updates.technical.suajeReforzado;
    if (updates.technical?.polipapel !== undefined) specUpdates.polipapel = updates.technical.polipapel;
    if (updates.technical?.compostable !== undefined) specUpdates.compostable = updates.technical.compostable;

    // Check if specifications exist
    const { data: existingSpecs } = await supabase
      .from('product_specifications')
      .select('id')
      .eq('product_id', id)
      .limit(1);

    if (existingSpecs && existingSpecs.length > 0) {
      // Update existing specifications
      const { error: specError } = await supabase
        .from('product_specifications')
        .update(specUpdates)
        .eq('product_id', id);
        
      if (specError) throw specError;
    } else {
      // Create new specifications
      const { error: specError } = await supabase
        .from('product_specifications')
        .insert({
          product_id: id,
          ...specUpdates
        });
        
      if (specError) throw specError;
    }
  }
};

/**
 * Delete a product
 */
export const deleteProductFromDb = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};
