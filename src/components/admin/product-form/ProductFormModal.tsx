
import React from "react";
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { Product } from "@/contexts/ProductContext";
import { BasicInfoTab } from "./BasicInfoTab";
import { SpecificationsTab } from "./SpecificationsTab";
import { TechnicalFeaturesTab } from "./TechnicalFeaturesTab";
import { ProductFormTabs } from "./ProductFormTabs";
import { BasicInformationContent } from "./BasicInformationContent";
import { useProductForm } from "./useProductForm";
import { Loader2, Save, X } from "lucide-react";

interface ProductFormModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => Promise<Product | null>;
  updateProduct: (id: string | number, product: Partial<Product>) => Promise<void>;
  product: Product | null;
}

const ProductFormModal = ({ 
  open, 
  setOpen, 
  addProduct, 
  updateProduct, 
  product 
}: ProductFormModalProps) => {
  const { form, onSubmit, isEditing, isSubmitting } = useProductForm({ 
    product, 
    addProduct, 
    updateProduct, 
    setOpen 
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] p-0 max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-xl font-bold flex items-center">
            {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6 py-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
              <BasicInfoTab form={form} />
            </div>

            <ProductFormTabs>
              <TabsContent value="basic" className="pt-4">
                <BasicInformationContent form={form} />
              </TabsContent>
              <SpecificationsTab form={form} />
              <TechnicalFeaturesTab form={form} />
            </ProductFormTabs>

            <DialogFooter className="flex gap-2 pt-4 sticky bottom-0 bg-white pb-2 border-t mt-6 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="gap-2"
              >
                <X size={16} />
                <span>Cancelar</span>
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                <span>{isEditing ? 'Guardar Cambios' : 'Crear Producto'}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
