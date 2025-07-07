
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLazyLoadingProps } from '@/utils/imageUtils';

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
  count: number;
  icon?: React.ReactNode;
}

const CategoryCard = ({ name, image, slug, count, icon }: CategoryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const lazyLoadingProps = getLazyLoadingProps();

  return (
    <Link to={`/categoria/${slug}`} className="category-card group">
      <div className="w-20 h-20 flex items-center justify-center mb-3 rounded-full bg-wem-lightblue p-4 group-hover:scale-110 transition-transform relative">
        {icon || (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse" />
            )}
            <img 
              src={image} 
              alt={name} 
              className={`max-w-full max-h-full transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              {...lazyLoadingProps}
            />
          </>
        )}
      </div>
      <h3 className="font-semibold text-center">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">{count} productos</p>
    </Link>
  );
};

export default CategoryCard;
