
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Truck, Package, Calculator, Clock } from 'lucide-react';

const Quote = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('producto');
  const quantity = searchParams.get('cantidad');
  const unit = searchParams.get('unidad');
  
  // This will be passed to the QuoteForm component
  const prefillData = {
    productId,
    quantity,
    unit
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-wem-green text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Solicita tu Cotización</h1>
              <p className="text-xl">
                Completa el formulario a continuación para recibir una cotización personalizada 
                adaptada a tus necesidades específicas.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Benefits */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-wem-darkblue mb-6">¿Por qué solicitar una cotización?</h2>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="bg-wem-lightblue p-3 rounded-full mr-4 flex-shrink-0">
                      <Calculator className="text-wem-blue h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Precios Competitivos</h3>
                      <p className="text-gray-600 mt-1">
                        Ofrecemos los mejores precios del mercado, especialmente para compras al mayoreo.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-wem-lightblue p-3 rounded-full mr-4 flex-shrink-0">
                      <Package className="text-wem-blue h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Productos Personalizados</h3>
                      <p className="text-gray-600 mt-1">
                        Disponemos de opciones personalizadas según tus necesidades específicas.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-wem-lightblue p-3 rounded-full mr-4 flex-shrink-0">
                      <Truck className="text-wem-blue h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Entrega a Domicilio</h3>
                      <p className="text-gray-600 mt-1">
                        Servicio de entrega a toda la República Mexicana directamente a tu negocio.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-wem-lightblue p-3 rounded-full mr-4 flex-shrink-0">
                      <Clock className="text-wem-blue h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Respuesta Rápida</h3>
                      <p className="text-gray-600 mt-1">
                        Recibirás tu cotización en menos de 24 horas hábiles.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-wem-lightblue rounded-lg">
                  <h3 className="font-bold text-lg mb-3">¿Prefieres contactarnos directamente?</h3>
                  <p className="text-gray-700 mb-4">
                    Puedes llamarnos o enviarnos un WhatsApp para una atención más personalizada:
                  </p>
                  <p className="font-semibold text-wem-blue">(55) 1234-5678</p>
                </div>
              </div>
              
              {/* Quote Form */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-wem-darkblue mb-6">Formulario de Cotización</h2>
                <QuoteForm prefillData={prefillData} />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-8">Preguntas Frecuentes</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-wem-blue mb-2">¿Cuánto tiempo tardaré en recibir mi cotización?</h3>
                <p className="text-gray-700">
                  Normalmente, enviamos las cotizaciones en menos de 24 horas hábiles después de recibir tu solicitud.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-wem-blue mb-2">¿Hay un pedido mínimo para cotizaciones?</h3>
                <p className="text-gray-700">
                  Para mayoreo, generalmente trabajamos con pedidos a partir de 1 tonelada. Para cantidades menores, 
                  contamos con precios de lista que puedes consultar directamente.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-wem-blue mb-2">¿Realizan envíos a toda la República Mexicana?</h3>
                <p className="text-gray-700">
                  Sí, realizamos envíos a cualquier parte de la República Mexicana. Los costos y tiempos de entrega 
                  varían según la ubicación.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-wem-blue mb-2">¿Ofrecen productos personalizados?</h3>
                <p className="text-gray-700">
                  Sí, podemos fabricar productos según tus especificaciones de tamaño, calibre, color y otras características. 
                  Detalla tus necesidades en el formulario de cotización.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Quote;
