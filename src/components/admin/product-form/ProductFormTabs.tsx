
import React from "react";
import { Package, Gauge, ListChecks } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductFormTabsProps {
  children: React.ReactNode;
}

export const ProductFormTabs = ({ children }: ProductFormTabsProps) => {
  return (
    <Tabs defaultValue="basic" className="border rounded-lg p-1 bg-gray-50">
      <TabsList className="grid w-full grid-cols-3 mb-2">
        <TabsTrigger 
          value="basic" 
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
        >
          <Package className="h-4 w-4" />
          <span>Información Básica</span>
        </TabsTrigger>
        <TabsTrigger 
          value="specs" 
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
        >
          <Gauge className="h-4 w-4" />
          <span>Especificaciones</span>
        </TabsTrigger>
        <TabsTrigger 
          value="technical" 
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
        >
          <ListChecks className="h-4 w-4" />
          <span>Características</span>
        </TabsTrigger>
      </TabsList>

      <div className="p-2 bg-white rounded-md">
        {children}
      </div>
    </Tabs>
  );
};
