import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-wem-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h1>
              <p className="text-xl">
                Estamos aquí para ayudarte. Contáctanos para cualquier consulta o solicitud.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="section-title">Información de Contacto</h2>
                <div className="space-y-8 mt-8">
                  <div className="flex items-start">
                    <div className="bg-wem-lightblue p-3 rounded-full mr-4">
                      <MapPin className="text-wem-blue h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Dirección</h3>
                      <p className="text-gray-600 mt-1">
                        Calle Plásticos #123, Col. Industrial<br />
                        Ciudad de México, CP 12345<br />
                        México
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-wem-lightblue p-3 rounded-full mr-4">
                      <Phone className="text-wem-blue h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Teléfono</h3>
                      <p className="text-gray-600 mt-1">
                        Ventas: (55) 1234-5678<br />
                        Atención a Clientes: (55) 8765-4321
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-wem-lightblue p-3 rounded-full mr-4">
                      <Mail className="text-wem-blue h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-600 mt-1">
                        Ventas: ventas@wem.mx<br />
                        Información: info@wem.mx
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-wem-lightblue p-3 rounded-full mr-4">
                      <Clock className="text-wem-blue h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Horario de Atención</h3>
                      <p className="text-gray-600 mt-1">
                        Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                        Sábados: 9:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-wem-darkblue mb-6">Envíanos un Mensaje</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-8">Nuestra Ubicación</h2>
            <div className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
              {/* Placeholder for map */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <p className="text-gray-600 font-semibold">Mapa de Ubicación</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
