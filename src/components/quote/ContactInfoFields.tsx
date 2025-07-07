
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
import FormSection from './FormSection';

interface ContactInfoFieldsProps {
  control: Control<any>;
}

const ContactInfoFields = ({ control }: ContactInfoFieldsProps) => {
  return (
    <FormSection title="Información de Contacto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre *</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="tu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono *</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(55) 1234-5678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa *</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de tu empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};

export default ContactInfoFields;
