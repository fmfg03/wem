
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Mensaje enviado con éxito", {
        description: "Nos pondremos en contacto contigo pronto."
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Tu nombre completo"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">
            Teléfono *
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(55) 1234-5678"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium">
            Empresa
          </label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nombre de tu empresa"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Mensaje *
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="¿En qué podemos ayudarte?"
          rows={5}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full md:w-auto bg-wem-blue hover:bg-wem-darkblue" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
      </Button>
    </form>
  );
};

export default ContactForm;
