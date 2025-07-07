
import { 
  Product as DbProduct, 
  Category, 
  ProductSpecification 
} from '@/types/database';
import { FrontendProduct } from '@/contexts/ProductContext';

/**
 * Convert database product to frontend format
 */
export const convertDbProductToFrontend = (
  dbProduct: DbProduct, 
  category?: Category | null,
  specifications?: ProductSpecification | null
): FrontendProduct => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description || '',
    category: category?.name || '',
    sku: dbProduct.sku,
    price: dbProduct.price,
    stock: dbProduct.stock,
    weight: dbProduct.weight || undefined,
    featured: dbProduct.featured,
    image: dbProduct.image || undefined,
    slug: dbProduct.slug,
    inStock: dbProduct.stock > 0,
    specifications: {
      medida: specifications?.medida || undefined,
      color: specifications?.color || undefined,
      calibre: specifications?.calibre || undefined,
      calidad: specifications?.calidad || undefined,
    },
    technical: {
      tipoCamiseta: specifications?.tipo_camiseta || false,
      suajeReforzado: specifications?.suaje_reforzado || false,
      polipapel: specifications?.polipapel || false,
      compostable: specifications?.compostable || false,
    }
  };
};
