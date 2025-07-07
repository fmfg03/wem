
import React from 'react';
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormSection from './FormSection';
import { useLocale } from '@/contexts/LocaleContext';

interface ProductInfoFieldsProps {
  control: Control<any>;
}

const ProductInfoFields = ({ control }: ProductInfoFieldsProps) => {
  const { t } = useLocale();
  
  return (
    <FormSection title={t('quote.product_info')}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <FormField
          control={control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('quote.product_type')} *</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder={`${t('select')} ${t('quote.product_type')}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bolsas-basura">{t('category.garbage_bags')}</SelectItem>
                  <SelectItem value="bolsas-plastico">{t('category.plastic_bags')}</SelectItem>
                  <SelectItem value="polietileno-rollo">{t('category.polyethylene')}</SelectItem>
                  <SelectItem value="playo-stretch">{t('category.stretch_film')}</SelectItem>
                  <SelectItem value="material-empaque">{t('category.packaging')}</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <FormField
            control={control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>{t('quote.quantity')} *</FormLabel>
                <FormControl>
                  <Input {...field} className="text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="unit"
            render={({ field }) => (
              <FormItem className="w-full sm:w-24">
                <FormLabel>{t('quote.unit')}</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder={t('quote.unit')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="piezas">piezas</SelectItem>
                    <SelectItem value="rollos">rollos</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </FormSection>
  );
};

export default ProductInfoFields;
