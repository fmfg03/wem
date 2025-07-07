
import React, { createContext, useContext, ReactNode } from 'react';
import { useProductData } from '@/hooks/useProductData';
import { FrontendProduct } from '@/types/product';

// Re-export the FrontendProduct type
export type { FrontendProduct };
export type Product = FrontendProduct;

interface ProductContextType {
  products: FrontendProduct[];
  loading: boolean;
  error: Error | null;
  addProduct: (product: Omit<FrontendProduct, 'id' | 'slug'>) => Promise<FrontendProduct | null>;
  updateProduct: (id: string, product: Partial<FrontendProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => FrontendProduct | undefined;
  getProductBySlug: (slug: string) => FrontendProduct | undefined;
  getProductsByCategory: (category: string) => FrontendProduct[];
  getFeaturedProducts: () => FrontendProduct[];
  refreshProducts: () => Promise<void>;
  isConnectedToDatabase: boolean;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  addProduct: async () => null,
  updateProduct: async () => {},
  deleteProduct: async () => {},
  getProduct: () => undefined,
  getProductBySlug: () => undefined,
  getProductsByCategory: () => [],
  getFeaturedProducts: () => [],
  refreshProducts: async () => {},
  isConnectedToDatabase: false
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const productData = useProductData();
  
  return (
    <ProductContext.Provider value={productData}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
