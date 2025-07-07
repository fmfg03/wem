
import React from 'react';
import { Button } from "@/components/ui/button";

interface FormSubmitButtonProps {
  isSubmitting: boolean;
}

const FormSubmitButton = ({ isSubmitting }: FormSubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full md:w-auto bg-wem-green hover:bg-wem-darkgreen" 
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Enviando solicitud...' : 'Solicitar Cotización'}
    </Button>
  );
};

export default FormSubmitButton;
