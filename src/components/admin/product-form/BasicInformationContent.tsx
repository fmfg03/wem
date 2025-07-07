
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { Tag, Coins, PackageCheck, Weight } from "lucide-react";

interface BasicInformationContentProps {
  form: UseFormReturn<any>;
}

export const BasicInformationContent = ({ form }: BasicInformationContentProps) => {
  return (
    <Card className="border-blue-100 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium flex items-center gap-2">
                    <Tag size={16} className="text-blue-600" />
                    <span>SKU</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: BP-001" {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium flex items-center gap-2">
                    <Coins size={16} className="text-blue-600" />
                    <span>Precio (MXN)</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      min="0"
                      placeholder="0.00" 
                      {...field}
                      className="border-gray-300" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium flex items-center gap-2">
                    <PackageCheck size={16} className="text-blue-600" />
                    <span>Existencias</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="0" 
                      {...field}
                      className="border-gray-300" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium flex items-center gap-2">
                    <Weight size={16} className="text-blue-600" />
                    <span>Peso (kg)</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      min="0"
                      placeholder="0.10" 
                      {...field}
                      className="border-gray-300" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-yellow-50 border-yellow-200">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium">Destacar Producto</FormLabel>
                  <FormDescription className="text-xs text-gray-600">
                    Este producto aparecerá en la sección destacada de la página principal
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
