
import React from 'react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: "Roberto Sánchez",
    company: "Distribuidora Alimenticia El Norte",
    quote: "Nunca pensamos que cambiar de proveedor de bolsas de plástico haría tanta diferencia en nuestra logística. Ahora, tenemos menos desperdicio, más eficiencia y costos más bajos.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
    industry: "Alimentos"
  },
  {
    id: 2,
    name: "Ana María Gutiérrez",
    company: "Hospital Regional Santa Fe",
    quote: "La calidad de los materiales que nos provee WEM ha sido fundamental para mantener nuestros estándares de higiene. Su confiabilidad en entregas ha eliminado por completo los problemas de abastecimiento.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974",
    industry: "Salud"
  },
  {
    id: 3,
    name: "Eduardo Ramírez",
    company: "Constructora Edificar",
    quote: "Los rollos de polietileno de WEM han demostrado ser superiores a cualquier otro que hayamos usado. La resistencia y durabilidad nos permiten proteger nuestros materiales en cualquier condición climática.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
    industry: "Construcción"
  },
  {
    id: 4,
    name: "Gabriela Mendoza",
    company: "Cadena de Tiendas La Comercial",
    quote: "Desde que implementamos las bolsas de WEM en nuestras 23 sucursales, las quejas por roturas se redujeron en un 90%. Nuestros clientes notan y aprecian la diferencia en calidad.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
    industry: "Retail"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex mb-4">
                <Quote className="w-8 h-8 text-wem-blue opacity-30 mr-2" />
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                  <span className="inline-block bg-wem-lightblue text-wem-blue text-xs px-2 py-1 rounded mt-1">
                    {testimonial.industry}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center bg-wem-lightblue p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-wem-darkblue mb-3">Únete a nuestros clientes satisfechos</h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Descubre por qué cientos de empresas en México confían en WEM para sus 
            necesidades de empaque y embalaje.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/productos">
              <Button className="bg-wem-blue hover:bg-wem-darkblue">
                Comenzar a Comprar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/sobre-nosotros">
              <Button variant="outline" className="border-wem-blue text-wem-blue hover:bg-white">
                Conocer Más Sobre Nosotros
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
