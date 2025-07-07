
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  X
} from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getProductImageCategory, getWebpImagePath } from '@/utils/webpImageMap';
import { getLazyLoadingProps, getResponsiveImageProps } from '@/utils/imageUtils';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  
  // Use images as provided - they're already converted to WebP
  const webpImages = images;
  
  // Get lazy loading props
  const lazyLoadingProps = getLazyLoadingProps('/placeholder.svg');
  
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? webpImages.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === webpImages.length - 1 ? 0 : prev + 1));
  };

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({
      ...prev,
      [index]: true
    }));
  };
  
  return (
    <div className="product-gallery">
      {/* Main Image */}
      <div className="relative mb-4 bg-white rounded-lg border overflow-hidden">
        <div className="relative w-full h-[400px]">
          {!imagesLoaded[activeImageIndex] && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400">Cargando imagen...</span>
            </div>
          )}
          <img
            src={webpImages[activeImageIndex]}
            alt={`${productName} - Imagen ${activeImageIndex + 1}`}
            className={`w-full h-full object-contain transition-opacity duration-300 ${imagesLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => handleImageLoad(activeImageIndex)}
            {...(activeImageIndex === 0 ? { loading: 'eager' } : lazyLoadingProps)}
            {...getResponsiveImageProps(webpImages[activeImageIndex])}
          />
        </div>
        
        {/* Image Navigation */}
        {webpImages.length > 1 && (
          <>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {/* Lightbox Button */}
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-2 top-2 rounded-full bg-white opacity-80 hover:opacity-100"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Thumbnails */}
      {webpImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {webpImages.map((img, index) => (
            <div 
              key={index} 
              className={`
                cursor-pointer border overflow-hidden rounded-md relative
                ${activeImageIndex === index ? 'ring-2 ring-wem-blue' : ''}
              `}
              onClick={() => setActiveImageIndex(index)}
            >
              {!imagesLoaded[index] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <img
                src={img}
                alt={`${productName} - Miniatura ${index + 1}`}
                className={`w-full h-20 object-cover transition-opacity duration-300 ${imagesLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => handleImageLoad(index)}
                {...lazyLoadingProps}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-screen-lg">
          <div className="relative h-[80vh]">
            <img
              src={webpImages[activeImageIndex]}
              alt={`${productName} - Vista ampliada`}
              className="w-full h-full object-contain"
              {...getResponsiveImageProps(webpImages[activeImageIndex], [768, 1024, 1280, 1536])}
            />
            
            {webpImages.length > 1 && (
              <>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-4 top-4 rounded-full bg-white"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductImageGallery;
