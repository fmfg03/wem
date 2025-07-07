
import { FrontendProduct } from '@/types/product';

export const useProductUtils = (products: FrontendProduct[]) => {
  const getProduct = (id: string): FrontendProduct | undefined => {
    return products.find(product => product.id.toString() === id.toString());
  };

  const getProductBySlug = (slug: string): FrontendProduct | undefined => {
    return products.find(product => product.slug === slug);
  };

  const getProductsByCategory = (category: string): FrontendProduct[] => {
    const categoryName = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return products.filter(
      product => 
        product.category.toLowerCase() === categoryName.toLowerCase() || 
        product.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
    );
  };

  const getFeaturedProducts = (): FrontendProduct[] => {
    return products.filter(product => product.featured);
  };

  return {
    getProduct,
    getProductBySlug,
    getProductsByCategory,
    getFeaturedProducts
  };
};
