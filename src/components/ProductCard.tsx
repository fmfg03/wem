
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Tag, Calculator } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import QuantityCalculator from './QuantityCalculator';
import { convertToWebP, getLazyLoadingProps, getResponsiveImageProps } from '@/utils/imageUtils';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image?: string; // Made optional with '?'
  category: string;
  price?: number;
  inStock?: boolean;
  featured?: boolean;
  slug: string;
  className?: string;
  specifications?: {
    medida?: string;
    color?: string;
    calibre?: string;
    calidad?: string;
  };
  technical?: {
    tipoCamiseta?: boolean;
    suajeReforzado?: boolean;
    polipapel?: boolean;
    compostable?: boolean;
  };
}

const ProductCard = ({ 
  id, 
  name, 
  description, 
  image = 'https://placehold.co/600x400?text=No+Image', // Default image 
  category, 
  price, 
  inStock = true, 
  featured = false, 
  slug,
  className = '',
  specifications,
  technical
}: ProductCardProps) => {
  const isListView = className.includes('list-view');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCart();
  
  // Convert image to WebP format
  const webpImage = convertToWebP(image);
  
  // Get lazy loading props
  const lazyLoadingProps = getLazyLoadingProps('/placeholder.svg');
  
  // Get responsive image props
  const responsiveProps = getResponsiveImageProps(webpImage);

  const handleAddToCart = () => {
    if (price !== undefined && inStock) {
      addItem({
        id,
        name,
        price,
        image,
        slug
      }, 1);
    }
  };

  return (
    <div className={`product-card ${featured ? 'border-2 border-wem-green' : 'border border-gray-200'} rounded-lg bg-white overflow-hidden transition-all hover:shadow-md ${className}`}>
      <div className={`${isListView ? 'flex' : ''}`}>
        <Link to={`/producto/${slug}`} className={`block ${isListView ? 'w-1/3 flex-shrink-0' : 'w-full'}`}>
          <div className="relative overflow-hidden">
            <img 
              src={webpImage} 
              alt={name} 
              className={`product-card-img h-48 w-full object-cover transition-transform duration-500 hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              {...lazyLoadingProps}
              {...responsiveProps}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            {featured && (
              <div className="absolute top-0 right-0 bg-wem-green text-white px-3 py-1 text-sm font-semibold">
                Destacado
              </div>
            )}
            {!inStock && (
              <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-sm font-semibold">
                Agotado
              </div>
            )}
            {technical?.compostable && (
              <div className="absolute bottom-0 left-0 bg-green-600 text-white px-3 py-1 text-xs font-semibold">
                Compostable
              </div>
            )}
          </div>
        </Link>
        
        <div className={`p-4 ${isListView ? 'w-2/3' : ''}`}>
          <div className="flex flex-wrap gap-2 mb-2">
            <Link to={`/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`}>
              <Badge variant="outline" className="text-wem-blue hover:bg-wem-lightblue">
                {category}
              </Badge>
            </Link>
            
            {specifications?.medida && (
              <Badge variant="outline" className="text-gray-600">
                {specifications.medida}
              </Badge>
            )}
            
            {specifications?.calibre && (
              <Badge variant="outline" className="text-gray-600">
                Calibre {specifications.calibre}
              </Badge>
            )}
          </div>
          
          <Link to={`/producto/${slug}`}>
            <h3 className="font-bold text-lg mt-2 mb-2 hover:text-wem-blue transition-colors">
              {name}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          {specifications && (
            <div className="flex flex-wrap gap-2 mb-3">
              {specifications.color && (
                <div className="flex items-center text-xs text-gray-600">
                  <span className="font-semibold mr-1">Color:</span> {specifications.color}
                </div>
              )}
              
              {specifications.calidad && (
                <div className="flex items-center text-xs text-gray-600">
                  <span className="font-semibold mr-1">Calidad:</span> {specifications.calidad}
                </div>
              )}
            </div>
          )}
          
          {price !== undefined && (
            <div className="text-lg font-bold text-wem-blue mb-3">
              ${price.toFixed(2)} <span className="text-sm text-gray-500 font-normal">+ IVA</span>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              <Link to={`/producto/${slug}`}>
                <Button variant="outline" className="text-wem-blue border-wem-blue hover:bg-wem-lightblue hover:text-wem-blue flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Ver Producto
                </Button>
              </Link>
              
              <Button 
                variant="outline"
                className="border-wem-green text-wem-green hover:bg-wem-lightgreen hover:text-wem-green"
                size="icon"
                onClick={() => setIsCalculatorOpen(true)}
                aria-label="Calcular precio"
              >
                <Calculator className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              variant="default" 
              className={`bg-wem-green hover:bg-wem-darkgreen ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              size="icon"
              aria-label="Agregar al carrito"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quantity Calculator Dialog */}
      <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Calcular Precio por Cantidad</DialogTitle>
          <DialogDescription>
            Determina el mejor canal de compra según tu cantidad
          </DialogDescription>
          
          <QuantityCalculator 
            productId={id}
            productName={name}
            basePrice={price}
            onClose={() => setIsCalculatorOpen(false)}
          />
          
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Close</span>
            <div className="h-4 w-4">×</div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;
