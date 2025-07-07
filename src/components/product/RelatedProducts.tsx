
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { getProductWebpImage } from '@/utils/webpImageMap';

interface Product {
  id: string;
  name: string;
  description: string;
  image?: string;
  images?: string[];
  category: string;
  price?: number;
  inStock?: boolean;
  featured?: boolean;
  slug: string;
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

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (!products.length) {
    return null;
  }
  
  // Prefer local WebP images when available, otherwise fall back to original images
  const productsWithWebpImage = products.map(product => {
    // Try to get a locally available WebP image first
    const localWebpImage = getProductWebpImage(product);
    
    // If no local WebP image found, use the original image or the first from images array
    let imageUrl = localWebpImage || product.image;
    if (!imageUrl && product.images && product.images.length > 0) {
      imageUrl = product.images[0];
    }
    
    return { 
      ...product, 
      image: imageUrl 
    };
  });
  
  return (
    <section className="related-products">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="section-title">Productos Relacionados</h2>
        <Link to="/productos" className="text-wem-blue hover:underline mt-2 md:mt-0">
          Ver todos los productos
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productsWithWebpImage.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
