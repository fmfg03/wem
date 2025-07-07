
export interface FrontendProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  weight?: number;
  featured: boolean;
  image?: string;
  imageUrl?: string;
  slug: string;
  inStock?: boolean;
  specifications?: {
    medida?: string;
    color?: string;
    calibre?: string;
    calidad?: string;
  };
  technical?: {
    tipoCamiseta: boolean;
    suajeReforzado: boolean;
    polipapel: boolean;
    compostable: boolean;
  };
}
