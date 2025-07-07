
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
import { UseFormReturn } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Ruler, Palette, GitBranch, Stars } from "lucide-react";

interface SpecificationsTabProps {
  form: UseFormReturn<any>;
}

export const SpecificationsTab = ({ form }: SpecificationsTabProps) => {
  return (
    <TabsContent value="specs" className="pt-4">
      <Card className="border-blue-100 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="specifications.medida"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium flex items-center gap-2">
                    <Ruler size={16} className="text-blue-600" />
                    <span>Dimensiones</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 40x60 cm" {...field} className="border-gray-300" />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Dimensiones del producto (ancho x alto)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specifications.color"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium flex items-center gap-2">
                    <Palette size={16} className="text-blue-600" />
                    <span>Color</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Natural, Negro, etc." {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specifications.calibre"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium flex items-center gap-2">
                    <GitBranch size={16} className="text-blue-600" />
                    <span>Calibre</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 125, 200, etc." {...field} className="border-gray-300" />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Grosor del material en micras
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specifications.calidad"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium flex items-center gap-2">
                    <Stars size={16} className="text-blue-600" />
                    <span>Calidad</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 1a, 2a, etc." {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
