export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics_metrics: {
        Row: {
          comparison_label: string | null
          comparison_type: string | null
          comparison_value: number | null
          created_at: string | null
          id: string
          metric_name: string
          metric_value: number
          period: string
        }
        Insert: {
          comparison_label?: string | null
          comparison_type?: string | null
          comparison_value?: number | null
          created_at?: string | null
          id?: string
          metric_name: string
          metric_value: number
          period: string
        }
        Update: {
          comparison_label?: string | null
          comparison_type?: string | null
          comparison_value?: number | null
          created_at?: string | null
          id?: string
          metric_name?: string
          metric_value?: number
          period?: string
        }
        Relationships: []
      }
      analytics_timeseries: {
        Row: {
          category: string | null
          created_at: string | null
          data_point: number
          date: string
          id: string
          period: string
          series_name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          data_point: number
          date: string
          id?: string
          period: string
          series_name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          data_point?: number
          date?: string
          id?: string
          period?: string
          series_name?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      client_orders: {
        Row: {
          amount: number
          client_id: string
          created_at: string
          id: string
          order_id: string
        }
        Insert: {
          amount: number
          client_id: string
          created_at?: string
          id?: string
          order_id: string
        }
        Update: {
          amount?: number
          client_id?: string
          created_at?: string
          id?: string
          order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string | null
          id: string
          last_order_date: string | null
          name: string
          notes: string | null
          phone: string | null
          state: string | null
          type: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_order_date?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          type?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_order_date?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          type?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: []
      }
      media_files: {
        Row: {
          alt_text: string | null
          file_path: string
          file_size: number
          file_type: string
          filename: string
          height: number | null
          id: string
          original_name: string
          public_url: string
          upload_date: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          file_path: string
          file_size: number
          file_type: string
          filename: string
          height?: number | null
          id?: string
          original_name: string
          public_url: string
          upload_date?: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          file_path?: string
          file_size?: number
          file_type?: string
          filename?: string
          height?: number | null
          id?: string
          original_name?: string
          public_url?: string
          upload_date?: string
          width?: number | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          sections: Json | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          sections?: Json | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          sections?: Json | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_applications: {
        Row: {
          application: string
          id: string
          product_id: string | null
        }
        Insert: {
          application: string
          id?: string
          product_id?: string | null
        }
        Update: {
          application?: string
          id?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_applications_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_benefits: {
        Row: {
          benefit: string
          id: string
          product_id: string | null
        }
        Insert: {
          benefit: string
          id?: string
          product_id?: string | null
        }
        Update: {
          benefit?: string
          id?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_benefits_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_specifications: {
        Row: {
          calibre: string | null
          calidad: string | null
          color: string | null
          compostable: boolean | null
          id: string
          medida: string | null
          polipapel: boolean | null
          product_id: string | null
          suaje_reforzado: boolean | null
          tipo_camiseta: boolean | null
        }
        Insert: {
          calibre?: string | null
          calidad?: string | null
          color?: string | null
          compostable?: boolean | null
          id?: string
          medida?: string | null
          polipapel?: boolean | null
          product_id?: string | null
          suaje_reforzado?: boolean | null
          tipo_camiseta?: boolean | null
        }
        Update: {
          calibre?: string | null
          calidad?: string | null
          color?: string | null
          compostable?: boolean | null
          id?: string
          medida?: string | null
          polipapel?: boolean | null
          product_id?: string | null
          suaje_reforzado?: boolean | null
          tipo_camiseta?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "product_specifications_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          description: string | null
          featured: boolean | null
          id: string
          image: string | null
          name: string
          price: number
          sku: string
          slug: string
          stock: number
          weight: number | null
        }
        Insert: {
          category_id?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          name: string
          price: number
          sku: string
          slug: string
          stock?: number
          weight?: number | null
        }
        Update: {
          category_id?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          name?: string
          price?: number
          sku?: string
          slug?: string
          stock?: number
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          category: string | null
          description: string | null
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          category?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          category?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
