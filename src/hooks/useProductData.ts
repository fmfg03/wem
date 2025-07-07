
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  fetchProducts, 
  createProduct, 
  updateProductInDb, 
  deleteProductFromDb 
} from '@/services/product';
import { generateSlug } from '@/utils/slugUtils';
import { FrontendProduct } from '@/types/product';
import { useProductUtils } from './useProductUtils';

export const useProductData = () => {
  const [products, setProducts] = useState<FrontendProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isConnectedToDatabase, setIsConnectedToDatabase] = useState(false);
  
  const { 
    getProduct, 
    getProductBySlug, 
    getProductsByCategory,
    getFeaturedProducts 
  } = useProductUtils(products);

  useEffect(() => {
    console.log('🔄 Initializing product data and Supabase connection...');
    fetchProductData();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          console.log('📡 Real-time update received:', payload);
          fetchProductData();
        }
      )
      .subscribe(status => {
        console.log('📡 Supabase channel status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('✅ Successfully subscribed to Supabase real-time channel');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('❌ Error subscribing to Supabase real-time channel');
        }
      });

    return () => {
      console.log('♻️ Cleaning up Supabase channel subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  // Save products to localStorage when they change
  useEffect(() => {
    if (products.length > 0) {
      console.log('💾 Saving products to localStorage, count:', products.length);
      localStorage.setItem('wem-products', JSON.stringify(products));
    }
  }, [products]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Attempting to fetch products from Supabase...');
      const startTime = performance.now();
      const frontendProducts = await fetchProducts();
      const endTime = performance.now();
      
      const productsWithInStock = frontendProducts.map(product => ({
        ...product,
        inStock: product.stock > 0
      }));
      
      setProducts(productsWithInStock);
      setIsConnectedToDatabase(true);
      console.log(`✅ Successfully loaded ${productsWithInStock.length} products from Supabase in ${(endTime - startTime).toFixed(2)}ms`);
      
    } catch (err) {
      console.error('❌ Error fetching products from Supabase:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      setIsConnectedToDatabase(false);
      
      // Try to load from local storage as fallback
      if (localStorage.getItem('wem-products')) {
        try {
          console.log('📁 Attempting to load products from localStorage (fallback)');
          const cachedProducts = JSON.parse(localStorage.getItem('wem-products')!);
          setProducts(cachedProducts);
          toast.error("Usando datos en caché. No se pudieron cargar productos desde la base de datos.");
          console.log('📁 Using cached products from localStorage:', cachedProducts.length);
        } catch (e) {
          console.error('❌ Error parsing saved products from localStorage:', e);
        }
      } else {
        console.error('❌ No cached products available in localStorage');
      }
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<FrontendProduct, 'id' | 'slug'>): Promise<FrontendProduct | null> => {
    try {
      if (!isConnectedToDatabase) {
        console.error('❌ Cannot add product: No connection to database');
        toast.error("No hay conexión con la base de datos");
        return null;
      }
      
      console.log('➕ Adding new product to Supabase:', product.name);
      const newProduct = await createProduct(product);
      
      if (newProduct) {
        const productWithInStock = {
          ...newProduct,
          inStock: newProduct.stock > 0
        };
        
        setProducts(prevProducts => [...prevProducts, productWithInStock]);
        
        toast.success("Producto agregado correctamente", {
          description: product.name
        });
        console.log('✅ Product added successfully:', productWithInStock.id);
        
        return productWithInStock;
      }
      
      return null;
    } catch (err) {
      console.error('❌ Error adding product:', err);
      toast.error("Error al agregar producto");
      return null;
    }
  };

  const updateProduct = async (id: string, updates: Partial<FrontendProduct>) => {
    try {
      if (!isConnectedToDatabase) {
        console.error('❌ Cannot update product: No connection to database');
        toast.error("No hay conexión con la base de datos");
        return;
      }
      
      const product = getProduct(id);
      if (!product) {
        console.error(`❌ Product with ID ${id} not found for update`);
        throw new Error(`Product with ID ${id} not found`);
      }

      console.log('🔄 Updating product in Supabase:', id, updates);
      await updateProductInDb(id.toString(), updates);

      const updatedProduct = { ...product, ...updates };
      if (updates.name) {
        updatedProduct.slug = generateSlug(updates.name);
      }
      
      if (updates.stock !== undefined) {
        updatedProduct.inStock = updates.stock > 0;
      }
      
      setProducts(prevProducts => 
        prevProducts.map(p => p.id.toString() === id.toString() ? updatedProduct : p)
      );
      
      toast.success("Producto actualizado correctamente");
      console.log('✅ Product updated successfully:', id);
    } catch (err) {
      console.error('❌ Error updating product:', err);
      toast.error("Error al actualizar producto");
      fetchProductData();
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      if (!isConnectedToDatabase) {
        console.error('❌ Cannot delete product: No connection to database');
        toast.error("No hay conexión con la base de datos");
        return;
      }
      
      const productToDelete = getProduct(id);
      if (!productToDelete) {
        console.error(`❌ Product with ID ${id} not found for deletion`);
        throw new Error(`Product with ID ${id} not found`);
      }

      console.log('🗑️ Deleting product from Supabase:', id);
      await deleteProductFromDb(id);

      setProducts(prevProducts => 
        prevProducts.filter(product => product.id.toString() !== id.toString())
      );
      
      if (productToDelete) {
        toast.info(`Producto "${productToDelete.name}" eliminado`);
        console.log('✅ Product deleted successfully:', id);
      }
    } catch (err) {
      console.error('❌ Error deleting product:', err);
      toast.error("Error al eliminar producto");
      fetchProductData();
    }
  };

  const refreshProducts = async () => {
    console.log('🔄 Manually refreshing products from database...');
    await fetchProductData();
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductBySlug,
    getProductsByCategory,
    getFeaturedProducts,
    refreshProducts,
    isConnectedToDatabase
  };
};
