
import React from 'react';
import { Button } from "@/components/ui/button";
import { Truck, Package, PercentSquare, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const WholesaleHero = () => {
  return (
    <section className="relative bg-gradient-to-r from-wem-blue to-blue-700 py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Programa de Mayoreo WEM
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Precios especiales, entregas directas y atención personalizada para negocios que requieren volumen.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/cotizar">
              <Button size="lg" className="bg-wem-green hover:bg-wem-darkgreen text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Solicitar Cotización
              </Button>
            </Link>
            <a href="tel:+525512345678">
              <Button variant="outline" size="lg" className="bg-white/10 border-white hover:bg-white/20 text-white">
                Llamar a Ventas: (55) 1234-5678
              </Button>
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Entrega Directa</h3>
            </div>
            <p className="text-white/90">
              Recibe tus pedidos directamente en tu negocio o bodega sin intermediarios. Nuestros camiones llegan a toda la República.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Volumen Optimizado</h3>
            </div>
            <p className="text-white/90">
              Producimos grandes cantidades con la misma calidad. Optimizamos nuestros procesos para ofrecer el mejor precio sin comprometer la calidad.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-full">
                <PercentSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Precios Preferenciales</h3>
            </div>
            <p className="text-white/90">
              Descuentos por volumen para aumentar tu margen de ganancia. Precios especiales para distribuidores y clientes recurrentes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleHero;
