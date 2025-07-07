
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { ShoppingBag, Shield, Layers, Leaf } from "lucide-react";

interface TechnicalFeaturesTabProps {
  form: UseFormReturn<any>;
}

export const TechnicalFeaturesTab = ({ form }: TechnicalFeaturesTabProps) => {
  return (
    <TabsContent value="technical" className="pt-4">
      <Card className="border-blue-100 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="technical.tipoCamiseta"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium flex items-center gap-2">
                      <ShoppingBag size={16} className="text-blue-600" />
                      <span>Tipo Camiseta</span>
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Bolsa tipo camiseta con asas
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technical.suajeReforzado"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium flex items-center gap-2">
                      <Shield size={16} className="text-blue-600" />
                      <span>Suaje Reforzado</span>
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Mayor resistencia en los cortes
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technical.polipapel"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium flex items-center gap-2">
                      <Layers size={16} className="text-blue-600" />
                      <span>Polipapel</span>
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Material mixto polietileno y papel
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technical.compostable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium flex items-center gap-2">
                      <Leaf size={16} className="text-blue-600" />
                      <span>Compostable</span>
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Material biodegradable y compostable
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
