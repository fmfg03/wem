
import React from "react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { Package } from "lucide-react";

interface BasicInfoTabProps {
  form: UseFormReturn<any>;
}

export const BasicInfoTab = ({ form }: BasicInfoTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Package className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-blue-600">Información Principal</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Nombre del Producto</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Bolsa Biodegradable Premium" {...field} className="border-gray-300" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Categoría</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Bolsas de Plástico" {...field} className="border-gray-300" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Descripción</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describa detalladamente el producto..." 
                rows={3} 
                {...field}
                className="resize-none border-gray-300" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
