
export interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category_id: string | null;
  sku: string;
  price: number;
  stock: number;
  weight: number | null; // Added the weight property
  featured: boolean;
  image: string | null;
  slug: string;
}

export interface ProductSpecification {
  id: string;
  product_id: string;
  medida: string | null;
  color: string | null;
  calibre: string | null;
  calidad: string | null;
  tipo_camiseta: boolean;
  suaje_reforzado: boolean;
  polipapel: boolean;
  compostable: boolean;
}

export interface ProductApplication {
  id: string;
  product_id: string;
  application: string;
}

export interface ProductBenefit {
  id: string;
  product_id: string;
  benefit: string;
}

// Combined product type for frontend use
export interface CompleteProduct extends Product {
  specifications?: ProductSpecification;
  applications?: ProductApplication[];
  benefits?: ProductBenefit[];
  category?: Category;
}

// Type definitions matching Supabase structure
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id'> & { id?: string };
        Update: Partial<Category>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id'> & { id?: string };
        Update: Partial<Product>;
      };
      product_specifications: {
        Row: ProductSpecification;
        Insert: Omit<ProductSpecification, 'id'> & { id?: string };
        Update: Partial<ProductSpecification>;
      };
      product_applications: {
        Row: ProductApplication;
        Insert: Omit<ProductApplication, 'id'> & { id?: string };
        Update: Partial<ProductApplication>;
      };
      product_benefits: {
        Row: ProductBenefit;
        Insert: Omit<ProductBenefit, 'id'> & { id?: string };
        Update: Partial<ProductBenefit>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
