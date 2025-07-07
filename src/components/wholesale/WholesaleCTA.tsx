
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const WholesaleCTA = () => {
  return (
    <section className="py-16 bg-wem-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para comprar al mayoreo?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Nuestro equipo de ventas está listo para ayudarte a encontrar las mejores soluciones para tu negocio a precios competitivos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cotizar">
              <Button size="lg" className="bg-wem-green hover:bg-wem-darkgreen text-white w-full sm:w-auto flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Solicitar Cotización
              </Button>
            </Link>
            <a href="tel:+525512345678">
              <Button size="lg" variant="outline" className="border-white hover:bg-white/10 text-white w-full sm:w-auto flex items-center gap-2">
                <Phone className="h-5 w-5" />
                (55) 1234-5678
              </Button>
            </a>
          </div>
          
          <div className="mt-8 text-sm opacity-80">
            <p>Horario de atención: Lunes a Viernes de 9:00 a 18:00 hrs.</p>
            <p>También puedes escribirnos a: <a href="mailto:mayoreo@wem.com.mx" className="underline">mayoreo@wem.com.mx</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleCTA;
