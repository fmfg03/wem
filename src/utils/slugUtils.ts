
/**
 * Generate a slug from a string
 * 
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
};
