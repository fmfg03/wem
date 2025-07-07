
import { getProductWebpImage } from './webpImageMap';

/**
 * Utility for image format conversion, optimization, and lazy loading
 */

/**
 * Converts an image to WebP format
 * @param imageUrl The original image URL
 * @returns WebP image URL if conversion is successful, original URL otherwise
 */
export const convertToWebP = (imageUrl: string): string => {
  // If URL is null or undefined, return a placeholder
  if (!imageUrl) {
    return '/placeholder.svg';
  }
  
  // If URL starts with /webp-images/, it's already a local WebP image
  if (imageUrl.startsWith('/webp-images/')) {
    return imageUrl;
  }
  
  // Skip conversion if already webp or for placeholder images
  if (imageUrl.endsWith('.webp') || imageUrl.includes('placehold.co')) {
    return imageUrl;
  }
  
  // Skip conversion for unsplash images (already optimized)
  if (imageUrl.includes('unsplash.com')) {
    return imageUrl;
  }
  
  // Skip conversion for Supabase Storage URLs
  if (imageUrl.includes('supabase.co/storage/v1')) {
    return imageUrl;
  }
  
  try {
    // For server-side images (handled paths differently)
    if (imageUrl.startsWith('public/')) {
      // Convert path from 'public/path/to/image.jpg' to '/path/to/image.webp'
      const relativePath = imageUrl.replace('public', '');
      const pathWithoutExtension = relativePath.substring(0, relativePath.lastIndexOf('.'));
      return `${pathWithoutExtension}.webp`;
    }
    
    // For images with absolute URLs
    const urlWithoutExtension = imageUrl.substring(0, imageUrl.lastIndexOf('.'));
    return `${urlWithoutExtension}.webp`;
  } catch (error) {
    console.error('Error converting image to WebP:', error);
    return imageUrl; // Return original URL as fallback
  }
};

/**
 * Gets image dimensions to use as initial size attributes for better CLS optimization
 * @param imageUrl The image URL
 * @returns Promise with width and height or undefined if error
 */
export const getImageDimensions = (
  imageUrl: string
): Promise<{ width: number; height: number } | undefined> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = () => {
      console.error('Error loading image for dimensions:', imageUrl);
      resolve(undefined);
    };
    img.src = imageUrl;
  });
};

/**
 * Attempts to find a local WebP image for a product based on name and category
 * @param product The product data
 * @returns WebP image path or undefined if no appropriate local image found
 */
export const findLocalWebpImageForProduct = (product: {
  name: string;
  category: string;
  id?: string;
}): string | undefined => {
  // Use our webpImageMap utility to find an appropriate local WebP image
  return getProductWebpImage(product);
};

/**
 * Creates loading and error handling attributes for lazy-loaded images
 * @param placeholder Optional placeholder URL to use while loading
 * @returns Object with necessary attributes for lazy loading images
 */
export const getLazyLoadingProps = (placeholder?: string) => {
  return {
    loading: 'lazy' as const,
    decoding: 'async' as const,
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
      // Set fallback image if the image fails to load
      const imgElement = e.currentTarget;
      if (placeholder && imgElement.src !== placeholder) {
        imgElement.src = placeholder;
      }
    }
  };
};

/**
 * Creates a srcset for responsive images with WebP format
 * @param imageUrl Base image URL 
 * @param widths Array of widths to generate srcset for
 * @returns Object with srcset and sizes attributes
 */
export const getResponsiveImageProps = (imageUrl: string, widths: number[] = [320, 480, 640, 768, 1024]) => {
  // Skip WebP conversion for Supabase Storage URLs
  const webpUrl = imageUrl.includes('supabase.co/storage/v1') ? imageUrl : convertToWebP(imageUrl);
  
  // Generate srcset for WebP images
  const srcSet = widths
    .map(width => `${webpUrl} ${width}w`)
    .join(', ');
  
  return {
    srcSet,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  };
};

/**
 * Determines the appropriate blog image to use based on context
 * @param blog The blog post data
 * @param context The context where the image will be displayed (card, featured, page)
 * @returns The appropriate image URL for the context
 */
export const getBlogImage = (
  blog: { 
    featuredImage?: string; 
    thumbnailCard?: string; 
    thumbnailFeatured?: string;
    image?: string; 
  }, 
  context: 'card' | 'featured' | 'page' = 'card'
): string => {
  if (context === 'page' && blog.featuredImage) {
    return blog.featuredImage;
  }
  
  if (context === 'featured' && blog.thumbnailFeatured) {
    return blog.thumbnailFeatured;
  }
  
  if (context === 'card' && blog.thumbnailCard) {
    return blog.thumbnailCard;
  }
  
  // Fallbacks in order of preference
  return blog.image || blog.featuredImage || blog.thumbnailCard || blog.thumbnailFeatured || '/placeholder.svg';
};
