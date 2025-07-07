
import React from 'react';
import { Truck, Clock, BadgeCheck, Package, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <BadgeCheck className="w-12 h-12 text-wem-blue" />,
    title: "Más de 20 Años de Experiencia",
    description: "Experiencia y conocimiento en el mercado de plásticos y empaques desde hace más de dos décadas."
  },
  {
    icon: <Truck className="w-12 h-12 text-wem-blue" />,
    title: "Entrega Rápida y Puntual",
    description: "Servicio de entrega a toda la República Mexicana con los tiempos más competitivos del mercado."
  },
  {
    icon: <Package className="w-12 h-12 text-wem-blue" />,
    title: "Amplia Variedad de Productos",
    description: "Contamos con una extensa gama de productos para satisfacer todas tus necesidades de empaque."
  },
  {
    icon: <Users className="w-12 h-12 text-wem-blue" />,
    title: "Atención Personalizada",
    description: "Asesoría técnica y atención personalizada para cada cliente según sus necesidades específicas."
  },
  {
    icon: <Clock className="w-12 h-12 text-wem-blue" />,
    title: "Disponibilidad Inmediata",
    description: "Amplio inventario con disponibilidad inmediata para atender pedidos urgentes."
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-wem-blue" />,
    title: "Calidad Garantizada",
    description: "Productos de la más alta calidad que cumplen con todos los estándares de la industria."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-wem-lightblue">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">¿Por Qué Elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center animate-scale-in">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-wem-darkblue mb-4">
              Descubre la diferencia WEM en tu próximo pedido
            </h3>
            <p className="text-gray-700 mb-6">
              Nuestro compromiso es brindarte soluciones de empaque de la más alta calidad, 
              con atención personalizada y los mejores tiempos de entrega.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/sobre-nosotros">
                <Button className="bg-wem-blue hover:bg-wem-darkblue">
                  Conoce Nuestra Historia
                </Button>
              </Link>
              <Link to="/productos">
                <Button variant="outline" className="border-wem-blue text-wem-blue hover:bg-wem-lightblue">
                  Ver Catálogo Completo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
