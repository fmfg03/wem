
import React from 'react';
import { Check, Clock, CreditCard, Truck, Headset, FileSpreadsheet } from 'lucide-react';

const WholesaleAdvantages = () => {
  const advantages = [
    {
      icon: <Check className="h-10 w-10 text-wem-green" />,
      title: "Calidad Garantizada",
      description: "Todos nuestros productos pasan por rigurosos controles de calidad antes de ser enviados."
    },
    {
      icon: <Clock className="h-10 w-10 text-wem-green" />,
      title: "Entrega Rápida",
      description: "Logística optimizada para que recibas tu pedido en el menor tiempo posible."
    },
    {
      icon: <CreditCard className="h-10 w-10 text-wem-green" />,
      title: "Facilidades de Pago",
      description: "Ofrecemos crédito a clientes recurrentes y diferentes métodos de pago."
    },
    {
      icon: <Truck className="h-10 w-10 text-wem-green" />,
      title: "Envío a Todo México",
      description: "Enviamos a cualquier punto de la República Mexicana, incluso a zonas remotas."
    },
    {
      icon: <Headset className="h-10 w-10 text-wem-green" />,
      title: "Asesoría Personalizada",
      description: "Un ejecutivo de cuenta dedicado para atender todas tus necesidades."
    },
    {
      icon: <FileSpreadsheet className="h-10 w-10 text-wem-green" />,
      title: "Facturación Inmediata",
      description: "Generamos tu factura al momento de realizar tu compra para tu contabilidad."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Ventajas de Comprar al Mayoreo</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            En WEM México ofrecemos beneficios exclusivos para nuestros clientes mayoristas que hacen que tu inversión valga la pena.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WholesaleAdvantages;
