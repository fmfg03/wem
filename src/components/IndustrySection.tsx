
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Store, Building, ShoppingBag, GraduationCap, ArrowRight, FileText } from 'lucide-react';

const industries = [
  { 
    name: "Restaurantes & Food Service", 
    description: "La higiene empieza con el empaque correcto.",
    icon: <Store className="w-10 h-10 text-wem-blue mb-2" />,
    link: "/industria/restaurantes-food-service"
  },
  { 
    name: "Construcción & Manufactura", 
    description: "El plástico protege desde el primer ladrillo.",
    icon: <Building className="w-10 h-10 text-wem-blue mb-2" />,
    link: "/industria/construccion-manufactura"
  },
  { 
    name: "Retail & Comercio", 
    description: "Cada compra se transporta en una bolsa de calidad.",
    icon: <ShoppingBag className="w-10 h-10 text-wem-blue mb-2" />,
    link: "/industria/retail-comercio"
  },
  { 
    name: "Gobierno & Salud", 
    description: "Materiales que cumplen con normas de seguridad y calidad.",
    icon: <GraduationCap className="w-10 h-10 text-wem-blue mb-2" />,
    link: "/industria/gobierno-salud"
  },
];

const IndustrySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">Industrias que Servimos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <Card key={index} className="border-t-4 border-t-wem-blue shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <Link to={industry.link}>
                  <Button variant="outline" size="sm" className="w-full border-wem-blue text-wem-blue hover:bg-wem-lightblue">
                    Ver Soluciones
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row bg-wem-blue text-white rounded-lg overflow-hidden shadow-lg">
          <div className="md:w-2/3 p-8">
            <h3 className="text-2xl font-bold mb-3">Soluciones para cada Industria</h3>
            <p className="mb-6">
              Entendemos las necesidades específicas de cada sector. Nuestros expertos pueden 
              ayudarte a encontrar las soluciones de empaque ideales para tu industria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/soluciones">
                <Button size="lg" className="bg-wem-green hover:bg-wem-darkgreen w-full sm:w-auto">
                  Explorar Soluciones por Industria
                </Button>
              </Link>
              <Link to="/cotizar">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-wem-blue w-full sm:w-auto">
                  <FileText className="mr-2 h-4 w-4" />
                  Solicitar Asesoría Especializada
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 bg-wem-darkblue flex items-center justify-center p-6">
            <div className="text-center">
              <h4 className="text-xl font-bold mb-2">¿No encuentras tu industria?</h4>
              <p className="mb-4 text-white/80">Contáctanos para una solución personalizada</p>
              <Link to="/contacto">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-wem-darkblue">
                  Contactar Ahora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
