import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

// Define types for our cart items and context
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug: string;
  imageUrl?: string; // Add this property to fix the type error
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
  tax: 0.16, // 16% IVA in Mexico
  total: 0,
});

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize cart from localStorage or empty array
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('wem-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Calculate derived values
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16; // 16% IVA in Mexico
  const total = subtotal + tax;

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wem-cart', JSON.stringify(items));
  }, [items]);

  // Add an item to the cart
  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        toast.success("Producto actualizado en el carrito", {
          description: `${item.name} (${newItems[existingItemIndex].quantity} unidades)`
        });
        return newItems;
      } else {
        // Add new item if it doesn't exist
        toast.success("Producto agregado al carrito", {
          description: `${item.name} (${quantity} unidades)`
        });
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  // Remove an item from the cart
  const removeItem = (id: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.info(`"${itemToRemove.name}" eliminado del carrito`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  // Update the quantity of an item
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
    toast.info("Carrito vaciado");
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      itemCount,
      subtotal,
      tax,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
