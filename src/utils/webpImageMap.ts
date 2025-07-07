
/**
 * Maps local WebP images to product categories and types
 * This allows us to easily reference local WebP images that have already been converted
 */

// Define categories for organization
export type ImageCategory = 
  | 'banners' 
  | 'bolsasBasura' 
  | 'bolsasEcologicas' 
  | 'bolsasSuper' 
  | 'bolsasHDPE' 
  | 'rollos' 
  | 'promocionales';

// Map of available WebP images by category
export const webpImageMap: Record<ImageCategory, string[]> = {
  banners: [
    'banner-oficial-verde.webp',
    'banner-oficial-wem-amarillo.webp',
    'banner-oficial-wem.webp',
    'banner-promocional-amarillo.webp',
    'banner-promocional-verde.webp',
    'banner-promocional-wem.webp',
    'banner-wem-oficial.webp'
  ],
  bolsasBasura: [
    'bolsa-basura-negra-industrial.webp',
    'bolsa-basura-negra.webp',
    'bolsa-negra-industrial.webp',
    'bolsa-transparente-limpieza.webp'
  ],
  bolsasEcologicas: [
    'bolsa-biodegradable-verde.webp',
    'bolsa-ecologica-biodegradable.webp',
    'bolsa-ecologica-transparente.webp',
    'bolsa-tipo-super-ecologica.webp',
    'bolsas-biodegradables-verdes.webp',
    'bolsas-sustentables-blancas.webp'
  ],
  bolsasSuper: [
    'bolsa-blanca-asa.webp',
    'bolsa-de-plastico-frutas.webp',
    'bolsa-reutilizable-blanca.webp',
    'bolsa-supermercado-asa.webp',
    'bolsa-tipo-super-blanca.webp',
    'bolsa-tipo-super-transparente.webp',
    'bolsas-plasticas-reutilizables.webp'
  ],
  bolsasHDPE: [
    'bolsa-con-cierre-hdpe.webp',
    'bolsa-de-plastico-hdpe-blanca.webp',
    'bolsa-hdpe-blanca.webp',
    'bolsa-hdpe-negra.webp',
    'bolsa-hdpe-promocional.webp',
    'bolsa-transparente-cierre.webp',
    'bolsa-transparente-hdpe.webp',
    'bolsa-transparente-sin-asas.webp',
    'bolsa-transparente.webp',
    'imagen-bolsa-hdpe.webp',
    'imagen-comercial-bolsa-hdpe.webp',
    'imagen-comercial-bolsa.webp',
    'imagen-hogar-bolsa.webp'
  ],
  rollos: [
    'film-industrial-hdpe.webp',
    'film-industrial-transparente.webp',
    'rollo-estirable-negro.webp',
    'rollo-estirable-transparente.webp',
    'rollo-film-estirable-industrial.webp',
    'rollo-film-estirable-negro.webp',
    'rollo-film-negro.webp',
    'rollo-industrial-blanco.webp',
    'rollo-negro-industrial-polietileno.webp',
    'rollo-plastico-negro-industrial.webp',
    'rollo-plastico-transparente.webp',
    'rollo-polietileno-alta-densidad.webp',
    'rollo-polietileno-blanco.webp',
    'rollo-polietileno-negro-industrial.webp'
  ],
  promocionales: [
    'grafico-ecologico-limpieza.webp',
    'grafico-promocional-cuidado.webp',
    'grafico-promocional-eco.webp',
    'grafico-promocional-hogar.webp'
  ]
};

/**
 * Gets WebP image path for a given category and optional index
 * @param category The image category
 * @param index Optional index in the category array (defaults to 0)
 * @returns Path to the WebP image
 */
export const getWebpImagePath = (category: ImageCategory, index: number = 0): string => {
  const images = webpImageMap[category];
  if (!images || images.length === 0) {
    return ''; // Return empty string if category has no images
  }
  
  // Use modulo to ensure the index is always within bounds
  const safeIndex = index % images.length;
  return `/webp-images/${images[safeIndex]}`;
};

/**
 * Gets a random WebP image from a specific category
 * @param category The image category
 * @returns Path to a random WebP image from the category
 */
export const getRandomWebpImage = (category: ImageCategory): string => {
  const images = webpImageMap[category];
  if (!images || images.length === 0) {
    return '';
  }
  
  const randomIndex = Math.floor(Math.random() * images.length);
  return `/webp-images/${images[randomIndex]}`;
};

/**
 * Gets the appropriate category for a product based on its name and description
 * @param productName Product name
 * @param category Product category
 * @returns The most appropriate image category
 */
export const getProductImageCategory = (productName: string, category: string): ImageCategory => {
  const name = productName.toLowerCase();
  const cat = category.toLowerCase();
  
  if (cat.includes('basura') || name.includes('basura')) {
    return 'bolsasBasura';
  }
  
  if (name.includes('biodegradable') || name.includes('ecolog') || name.includes('sustentable')) {
    return 'bolsasEcologicas';
  }
  
  if (name.includes('rollo') || name.includes('film') || cat.includes('polietileno en rollo')) {
    return 'rollos';
  }
  
  if (name.includes('hdpe') || (name.includes('alta') && name.includes('densidad'))) {
    return 'bolsasHDPE';
  }
  
  if (name.includes('super') || name.includes('asa') || name.includes('camiseta')) {
    return 'bolsasSuper';
  }
  
  // Default to HDPE bags if no clear match
  return 'bolsasHDPE';
};

/**
 * Gets WebP image path for a product based on its properties
 * @param product A product object with name, category and optionally id
 * @returns Path to an appropriate WebP image
 */
export const getProductWebpImage = (product: { 
  name: string; 
  category: string; 
  id?: string;
}): string => {
  const category = getProductImageCategory(product.name, product.category);
  
  // Use product ID as index if available to ensure consistent images for same products
  const index = product.id ? parseInt(product.id, 10) % webpImageMap[category].length : 0;
  return getWebpImagePath(category, index);
};
