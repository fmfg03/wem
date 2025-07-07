
import React from 'react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";

interface ProductVariantFormProps {
  onAddVariant: (variant: any) => void;
  productType: 'bolsa' | 'rollo';
}

const ProductVariantForm = ({ onAddVariant, productType }: ProductVariantFormProps) => {
  const form = useForm({
    defaultValues: {
      medida: '',
      color: 'Natural',
      calibre: '125',
      calidad: '1a',
      tipoCamiseta: false,
      suajeReforzado: false,
      polipapel: false,
      compostable: false,
      impresion: 'Sin impresión',
      aditivoBiodegradable: false,
      tubular: productType === 'rollo' ? true : false,
      foam: false,
      poliburbuja: false,
      precio: '',
      stock: '0'
    }
  });
  
  const availableColors = [
    'Natural', 'Negra', 'Blanca', 'Verde', 'Azul', 'Gris', 
    'Roja', 'Naranja', 'Amarilla', 'Caramelo'
  ];
  
  const availableCalibres = ['125', '150', '200', '300', '400', '600'];
  const availableCalidades = ['1a', '2a', '3a'];
  const availableImpresiones = [
    'Sin impresión', '3 tintas un lado', '3 tintas dos lados', '6 tintas'
  ];
  
  const onSubmit = (data: any) => {
    onAddVariant(data);
    form.reset();
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-lg font-medium">Nueva Variante</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="medida"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medida (ancho x largo)</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 40*60" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableColors.map(color => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {productType === 'bolsa' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="calibre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calibre</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar calibre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableCalibres.map(calibre => (
                          <SelectItem key={calibre} value={calibre}>{calibre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="calidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calidad</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar calidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableCalidades.map(calidad => (
                          <SelectItem key={calidad} value={calidad}>{calidad}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <h4 className="text-md font-medium">Especificaciones Técnicas</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tipoCamiseta"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Tipo Camiseta</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="suajeReforzado"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Suaje Reforzado</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="polipapel"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Polipapel</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="compostable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Compostable</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="impresion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Impresión</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo de impresión" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableImpresiones.map(impresion => (
                          <SelectItem key={impresion} value={impresion}>{impresion}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="aditivoBiodegradable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Con Aditivo Biodegradable</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
        
        {productType === 'rollo' && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="tubular"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Tubular</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="foam"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Foam</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="poliburbuja"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Poliburbuja</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}
        
        <Separator />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="precio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio (MXN)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="0.00" 
                    {...field} 
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
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    placeholder="0" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Agregar Variante
          </button>
        </div>
      </form>
    </Form>
  );
};

export default ProductVariantForm;
