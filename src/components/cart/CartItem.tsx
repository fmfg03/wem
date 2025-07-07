
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart, CartItem as CartItemType } from '@/contexts/CartContext';
import { convertToWebP } from '@/utils/imageUtils';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const { id, name, price, quantity, image = 'https://placehold.co/600x400?text=No+Image', slug } = item;
  
  // Convert image to WebP format
  const webpImage = convertToWebP(image);

  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(id, quantity - 1);
  };

  const handleRemove = () => {
    removeItem(id);
  };

  const subtotal = price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 border-b py-4">
      {/* Product Image */}
      <Link to={`/producto/${slug}`} className="sm:w-24 sm:h-24 w-full h-32 flex-shrink-0">
        <img 
          src={webpImage} 
          alt={name} 
          className="w-full h-full object-cover rounded-md"
          loading="lazy"
        />
      </Link>
      
      <div className="flex-grow">
        {/* Product Info */}
        <div className="flex justify-between">
          <Link to={`/producto/${slug}`} className="font-semibold text-lg hover:text-wem-blue transition-colors">
            {name}
          </Link>
          <button 
            onClick={handleRemove}
            className="text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Eliminar producto"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="text-wem-blue font-medium mt-1">
          ${price.toFixed(2)} <span className="text-sm text-gray-500 font-normal">MXN / unidad</span>
        </div>
        
        {/* Quantity Controls and Subtotal */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDecrement}
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleIncrement}
              aria-label="Aumentar cantidad"
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="font-semibold">
            ${subtotal.toFixed(2)} <span className="text-sm text-gray-500 font-normal">MXN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
