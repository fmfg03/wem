
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactInfoFields from './quote/ContactInfoFields';
import ProductInfoFields from './quote/ProductInfoFields';
import SpecificationsFields from './quote/SpecificationsFields';
import FormSubmitButton from './quote/FormSubmitButton';
import FreightCalculator from './shipping/FreightCalculator';

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Nombre es requerido" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(8, { message: "Teléfono inválido" }),
  company: z.string().min(1, { message: "Empresa es requerida" }),
  productType: z.string().min(1, { message: "Selecciona un tipo de producto" }),
  quantity: z.string().min(1, { message: "Cantidad es requerida" }),
  unit: z.string().optional(),
  specifications: z.string().min(1, { message: "Especificaciones son requeridas" }),
  additionalInfo: z.string().optional(),
  productId: z.string().optional(),
  shippingZone: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

interface QuoteFormProps {
  prefillData?: {
    productId?: string | null;
    quantity?: string | null;
    unit?: string | null;
  };
}

const QuoteForm = ({ prefillData }: QuoteFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(50);
  const [unit, setUnit] = useState<'kg' | 'piezas'>('kg');

  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      productType: "",
      quantity: prefillData?.quantity || "",
      unit: prefillData?.unit || "kg",
      specifications: "",
      additionalInfo: "",
      productId: prefillData?.productId || "",
      shippingZone: "cdmx-metro"
    }
  });

  // Update form when prefillData changes
  useEffect(() => {
    if (prefillData?.quantity) {
      form.setValue('quantity', prefillData.quantity);
      setQuantity(parseInt(prefillData.quantity) || 50);
    }
    if (prefillData?.unit) {
      form.setValue('unit', prefillData.unit);
      setUnit(prefillData.unit as 'kg' | 'piezas');
    }
    if (prefillData?.productId) {
      form.setValue('productId', prefillData.productId);
      // Here you would typically fetch product details based on ID
      // and pre-fill other fields like productType
      form.setValue('productType', 'bolsas-plastico');
      form.setValue('specifications', `Producto ID: ${prefillData.productId}, requiere ${prefillData.quantity} ${prefillData.unit}`);
    }
  }, [prefillData, form]);

  // Update quantity and unit when form values change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'quantity') {
        setQuantity(parseInt(value.quantity || '0') || 0);
      }
      if (name === 'unit') {
        setUnit(value.unit as 'kg' | 'piezas' || 'kg');
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Solicitud de cotización enviada", {
        description: "Recibirás tu cotización personalizada pronto."
      });
      
      // Reset form
      form.reset();
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContactInfoFields control={form.control} />
        <ProductInfoFields control={form.control} />
        <SpecificationsFields control={form.control} />
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Información de Envío</h3>
          <p className="text-sm text-gray-600">
            Indícanos a dónde necesitas que se envíe tu pedido. Esta información es para fines de cotización.
          </p>
          <FreightCalculator
            productWeight={0.1} // Default weight, would be dynamic in real implementation
            quantity={quantity}
            unit={unit}
            channel="quote"
          />
        </div>
        
        <FormSubmitButton isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default QuoteForm;
