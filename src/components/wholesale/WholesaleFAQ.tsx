
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const WholesaleFAQ = () => {
  const faqs = [
    {
      question: "¿Cuál es el pedido mínimo para mayoreo?",
      answer: "El pedido mínimo varía según la categoría de producto. En general, manejamos pedidos desde 50kg para algunos productos y 100kg para otros. Para productos especializados o personalizados, por favor consulta con nuestro equipo de ventas."
    },
    {
      question: "¿Ofrecen muestras antes de hacer un pedido grande?",
      answer: "Sí, podemos enviar muestras de nuestros productos estándar para que compruebes la calidad antes de realizar un pedido grande. Para productos personalizados, se puede requerir un pago por las muestras que se descontará del pedido final."
    },
    {
      question: "¿Cuáles son las opciones de envío disponibles?",
      answer: "Contamos con envíos a toda la República Mexicana. Para pedidos al mayoreo, ofrecemos entregas directas con nuestra flota propia en CDMX y área metropolitana. Para el resto del país, trabajamos con transportistas confiables y podemos coordinar la logística completa."
    },
    {
      question: "¿Cuánto tiempo tarda en llegar mi pedido?",
      answer: "Los tiempos de entrega dependen del volumen del pedido y tu ubicación. Para productos en stock, los tiempos varían de 2-5 días hábiles. Para productos personalizados o de fabricación especial, el tiempo de producción puede ser de 5-15 días hábiles más el tiempo de envío."
    },
    {
      question: "¿Qué métodos de pago aceptan para clientes mayoristas?",
      answer: "Aceptamos transferencias bancarias, depósitos, tarjetas de crédito/débito empresariales y, para clientes recurrentes, ofrecemos líneas de crédito a 15, 30 o 45 días dependiendo del historial y volumen de compra."
    },
    {
      question: "¿Pueden fabricar productos con nuestro logo o especificaciones?",
      answer: "Sí, ofrecemos servicios de personalización para la mayoría de nuestros productos. Podemos imprimir tu logo, utilizar colores específicos o fabricar con medidas especiales según tus necesidades. Para productos personalizados se requiere un volumen mínimo mayor."
    },
    {
      question: "¿Ofrecen descuentos por volumen?",
      answer: "Definitivamente. Contamos con una estructura de descuentos escalonados según el volumen de compra. A mayor cantidad, mejor precio. También ofrecemos precios especiales para contratos a largo plazo o compras recurrentes."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3">
            <HelpCircle className="h-12 w-12 text-wem-blue" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Preguntas Frecuentes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Respuestas a las dudas más comunes sobre nuestro programa de mayoreo.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gray-600">
            ¿No encuentras respuesta a tu pregunta? 
            <a href="mailto:info@wem.com.mx" className="text-wem-blue hover:text-wem-darkblue ml-1">
              Contáctanos directamente
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WholesaleFAQ;
