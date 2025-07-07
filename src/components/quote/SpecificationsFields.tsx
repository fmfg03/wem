
import React from 'react';
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FormSection from './FormSection';
import { useLocale } from '@/contexts/LocaleContext';

interface SpecificationsFieldsProps {
  control: Control<any>;
}

const SpecificationsFields = ({ control }: SpecificationsFieldsProps) => {
  const { t } = useLocale();
  
  return (
    <FormSection>
      <div className="grid gap-4 md:gap-6">
        <FormField
          control={control}
          name="specifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('quote.specifications')} *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('quote.specifications.placeholder')}
                  className="min-h-[80px] md:min-h-[100px] text-sm resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('quote.additional_info')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('quote.additional_info.placeholder')}
                  className="min-h-[80px] md:min-h-[100px] text-sm resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};

export default SpecificationsFields;
