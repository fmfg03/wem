
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/contexts/ProductContext";
import { toast } from "sonner";

type ProductFormValues = {
  name: string;
  description: string;
  category: string;
  sku: string;
  price: string;
  stock: string;
  weight: string;
  featured: boolean;
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
};

interface UseProductFormProps {
  product: Product | null;
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => Promise<Product | null>;
  updateProduct: (id: string | number, product: Partial<Product>) => Promise<void>;
  setOpen: (open: boolean) => void;
}

export const useProductForm = ({ 
  product, 
  addProduct, 
  updateProduct, 
  setOpen 
}: UseProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      sku: "",
      price: "0",
      stock: "0",
      weight: "0.1",
      featured: false,
      specifications: {
        medida: "",
        color: "",
        calibre: "",
        calidad: "",
      },
      technical: {
        tipoCamiseta: false,
        suajeReforzado: false,
        polipapel: false,
        compostable: false,
      },
    },
  });

  useEffect(() => {
    if (open) {
      if (product) {
        form.reset({
          name: product.name,
          description: product.description,
          category: product.category,
          sku: product.sku,
          price: product.price.toString(),
          stock: product.stock.toString(),
          weight: product.weight?.toString() || "0.1",
          featured: product.featured,
          specifications: product.specifications || {
            medida: "",
            color: "",
            calibre: "",
            calidad: "",
          },
          technical: product.technical || {
            tipoCamiseta: false,
            suajeReforzado: false,
            polipapel: false,
            compostable: false,
          },
        });
      } else {
        form.reset({
          name: "",
          description: "",
          category: "",
          sku: "",
          price: "0",
          stock: "0",
          weight: "0.1",
          featured: false,
          specifications: {
            medida: "",
            color: "",
            calibre: "",
            calidad: "",
          },
          technical: {
            tipoCamiseta: false,
            suajeReforzado: false,
            polipapel: false,
            compostable: false,
          },
        });
      }
    }
  }, [open, product, form]);

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      if (product?.id) {
        await updateProduct(product.id, data as unknown as Partial<Product>);
        toast.success("Producto actualizado correctamente");
      } else {
        const newProduct = await addProduct(data as unknown as Omit<Product, 'id' | 'slug'>);
        if (newProduct) {
          toast.success("Producto creado correctamente");
        }
      }
      setOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Error al guardar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isEditing: !!product?.id,
    isSubmitting
  };
};
