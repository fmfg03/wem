
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import { Building, CheckCircle2, Clock, ShieldCheck, Truck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-wem-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h1>
              <div className="flex items-center justify-center mb-4 text-xl">
                <span className="mr-2">📍</span>
                <p>Bolsas de Plástico: La Base de Toda la Cadena de Suministro</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our History */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-wem-blue mb-6">Nuestra Historia</h2>
                <p className="text-gray-700 mb-6">
                  En WEM, llevamos más de 20 años asegurándonos de que todo lo que importa llegue 
                  en perfectas condiciones. Desde la bolsa que envuelve el lunch de un niño hasta 
                  el rollo de polietileno que envuelve un edifico en construcción, nuestros productos 
                  son invisibles, pero esenciales.
                </p>
                <p className="text-gray-700">
                  En WEM vivimos y respiramos bolsas de plástico. Nuestro equipo de profesionales 
                  está dedicado exclusivamente a diseñar soluciones de empaque que faciliten la 
                  operación de tu negocio. Pensamos en cada detalle para que tú no tengas que hacerlo.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070" 
                  alt="WEM México Equipo" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-wem-blue text-center mb-12">Nuestra Filosofía</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-wem-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovamos en lo esencial</h3>
                  <p className="text-gray-600">
                    Optimizamos procesos para que nunca falte tu empaque.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <Clock className="w-16 h-16 text-wem-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Eficiencia sin interrupciones</h3>
                  <p className="text-gray-600">
                    Sin retrasos, sin excusas.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <ShieldCheck className="w-16 h-16 text-wem-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Calidad que se nota</h3>
                  <p className="text-gray-600">
                    Porque la resistencia importa en cada industria.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="bg-wem-blue hover:bg-wem-darkblue">
                <Link to="/contacto">Conócenos Más</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-3xl font-bold text-wem-blue mb-6">Compromiso con la calidad</h2>
                <p className="text-gray-700 mb-6">
                  Con años de experiencia en la industria, entendemos que cada cliente tiene 
                  necesidades únicas. Por eso, ofrecemos soluciones personalizadas, materiales 
                  de alta calidad y un servicio excepcional, garantizando que siempre cuentes 
                  con el empaque perfecto para proteger, transportar y entregar tus productos con confianza.
                </p>
              </div>
              
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <Building className="w-12 h-12 text-wem-blue" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Instalación Moderna</h3>
                  <p className="text-gray-600">
                    Tecnología de punta para garantizar la mejor calidad.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <Truck className="w-12 h-12 text-wem-blue" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Entrega Nacional</h3>
                  <p className="text-gray-600">
                    Distribución a todo México garantizando tiempos de entrega.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Clients */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-wem-blue text-center mb-12">Confiado por Empresas Líderes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {/* Placeholder logos */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex justify-center">
                  <div className="bg-gray-200 h-20 w-full max-w-[160px] rounded flex items-center justify-center text-gray-500 font-semibold">
                    LOGO {i}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
