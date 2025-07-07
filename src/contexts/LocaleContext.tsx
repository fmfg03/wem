
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available locales
export type Locale = 'es-MX' | 'en-US';

// Create the context
type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Translations
const translations: Record<Locale, Record<string, string>> = {
  'es-MX': {
    // Header
    'nav.home': 'Inicio',
    'nav.products': 'Productos',
    'nav.industries': 'Industrias',
    'nav.wholesale': 'Mayoreo',
    'nav.blog': 'Blog',
    'nav.about': 'Sobre Nosotros',
    'nav.contact': 'Contacto',
    'nav.quote': 'Solicitar Cotización',
    'nav.search': 'Buscar',
    'nav.cart': 'Carrito',
    'nav.close': 'Cerrar menú',
    'nav.menu': 'Menú',
    'nav.buy': 'Comprar',
    'nav.by_product': 'Por Producto',
    'nav.by_industry': 'Por Industria',
    'contact.phone': 'Teléfono',
    'contact.email': 'Email',
    'header.service_years': '¡20+ años sirviendo a empresas en toda la República Mexicana!',
    
    // Hero slider
    'hero.cta.explore': 'Explorar',
    'hero.cta.quote': 'Solicitar Cotización',
    'hero.cta.wholesale': 'Ver Mayoreo',
    'hero.cta.specifications': 'Ver Especificaciones',
    'hero.cta.buy': 'Comprar Ahora',
    
    // Categories
    'categories.title': 'Nuestras Categorías',
    'categories.not_found': '¿No encuentras lo que buscas? Tenemos muchas más opciones disponibles.',
    'categories.explore_all': 'Explorar Todos los Productos',
    'categories.request_specific': 'Solicitar Producto Específico',
    'categories.read_blog': 'Leer Nuestro Blog',
    'category.garbage_bags': 'Bolsas para Basura',
    'category.plastic_bags': 'Bolsas de Plástico',
    'category.roll_bags': 'Bolsa en Rollo',
    'category.polyethylene': 'Polietileno en Rollo',
    'category.stretch_film': 'Playo y Stretch',
    'category.packaging': 'Material de Empaque',
    
    // Product section
    'products.featured': 'Productos Destacados',
    'products.view_all': 'Ver todos los productos',
    'products.custom.title': '¿Buscas productos personalizados?',
    'products.custom.description': 'Ofrecemos soluciones de empaque a la medida para tus necesidades específicas. Contáctanos para discutir tu proyecto.',
    'products.custom.quote': 'Solicitar Cotización',
    'products.custom.view': 'Ver Bolsas Personalizadas',
    
    // Call to action
    'cta.title': '¿Necesitas un Presupuesto Personalizado?',
    'cta.description': 'Ofrecemos los mejores precios para compras al mayoreo. Contáctanos hoy mismo para obtener una cotización adaptada a tus necesidades específicas.',
    'cta.quote': 'Solicita una Cotización',
    'cta.quote.description': 'Completa nuestro formulario en línea y recibe una cotización personalizada en menos de 24 horas.',
    'cta.quote.button': 'Cotizar Ahora',
    'cta.call': 'Llamanos Directamente',
    'cta.call.description': 'Habla con nuestros asesores expertos y recibe asesoramiento personalizado sobre tus necesidades de empaque.',
    'cta.call.button': 'Contactar Ahora',
    'cta.blog': 'Visita Nuestro Blog',
    'cta.blog.description': 'Aprende sobre las últimas tendencias en empaques, consejos para tu negocio y noticias de la industria.',
    'cta.blog.button': 'Explorar Blog',
    'cta.cart.prompt': '¿Ya sabes lo que necesitas?',
    'cta.cart.button': 'Ir al carrito de compras',
    
    // Footer
    'footer.about': 'Más de 20 años distribuyendo bolsas de plástico y material de empaque de la más alta calidad para clientes en toda la República Mexicana.',
    'footer.quick_links': 'Enlaces Rápidos',
    'footer.main_products': 'Productos Principales',
    'footer.contact': 'Contacto',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Aviso de Privacidad',
    'footer.terms': 'Términos y Condiciones',
    
    // Quote form
    'quote.contact_info': 'Información de Contacto',
    'quote.name': 'Nombre',
    'quote.email': 'Correo Electrónico',
    'quote.phone': 'Teléfono',
    'quote.company': 'Empresa',
    'quote.product_info': 'Información del Producto',
    'quote.product_type': 'Tipo de Producto',
    'quote.quantity': 'Cantidad Estimada',
    'quote.unit': 'Unidad',
    'quote.specifications': 'Especificaciones del Producto',
    'quote.specifications.placeholder': 'Describe las medidas, calibre, color, y otras especificaciones relevantes',
    'quote.additional_info': 'Información Adicional',
    'quote.additional_info.placeholder': 'Cualquier otra información que consideres relevante para tu cotización',
    'quote.submit': 'Enviar Solicitud',
    'quote.submitting': 'Enviando...',
    
    // Wholesale
    'wholesale.title': 'Programa de Mayoreo WEM',
    'wholesale.description': 'Precios especiales, entregas directas y atención personalizada para negocios que requieren volumen.',
    'wholesale.quote': 'Solicitar Cotización',
    'wholesale.call': 'Llamar a Ventas',
    'wholesale.direct_delivery': 'Entrega Directa',
    'wholesale.direct_delivery.description': 'Recibe tus pedidos directamente en tu negocio o bodega sin intermediarios. Nuestros camiones llegan a toda la República.',
    'wholesale.volume': 'Volumen Optimizado',
    'wholesale.volume.description': 'Producimos grandes cantidades con la misma calidad. Optimizamos nuestros procesos para ofrecer el mejor precio sin comprometer la calidad.',
    'wholesale.prices': 'Precios Preferenciales',
    'wholesale.prices.description': 'Descuentos por volumen para aumentar tu margen de ganancia. Precios especiales para distribuidores y clientes recurrentes.',
    'wholesale.advantages': 'Ventajas de Comprar al Mayoreo',
    'wholesale.advantages.description': 'En WEM México ofrecemos beneficios exclusivos para nuestros clientes mayoristas que hacen que tu inversión valga la pena.',
    'wholesale.faq': 'Preguntas Frecuentes',
    'wholesale.faq.description': 'Respuestas a las dudas más comunes sobre nuestro programa de mayoreo.',
    'wholesale.contact_us': 'Contáctanos directamente',
    'wholesale.ready': '¿Listo para comprar al mayoreo?',
    'wholesale.ready.description': 'Nuestro equipo de ventas está listo para ayudarte a encontrar las mejores soluciones para tu negocio a precios competitivos.',
    'wholesale.hours': 'Horario de atención: Lunes a Viernes de 9:00 a 18:00 hrs.',
    'wholesale.email': 'También puedes escribirnos a:',
    
    // Common
    'select': 'Seleccionar',
    'required': 'requerido',
    'loading': 'Cargando...'
  },
  'en-US': {
    // Header
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.industries': 'Industries',
    'nav.wholesale': 'Wholesale',
    'nav.blog': 'Blog',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.quote': 'Request Quote',
    'nav.search': 'Search',
    'nav.cart': 'Cart',
    'nav.close': 'Close menu',
    'nav.menu': 'Menu',
    'nav.buy': 'Buy',
    'nav.by_product': 'By Product',
    'nav.by_industry': 'By Industry',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'header.service_years': '20+ years serving businesses throughout Mexico!',
    
    // Hero slider
    'hero.cta.explore': 'Explore',
    'hero.cta.quote': 'Request Quote',
    'hero.cta.wholesale': 'View Wholesale',
    'hero.cta.specifications': 'View Specifications',
    'hero.cta.buy': 'Buy Now',
    
    // Categories
    'categories.title': 'Our Categories',
    'categories.not_found': "Can't find what you're looking for? We have many more options available.",
    'categories.explore_all': 'Explore All Products',
    'categories.request_specific': 'Request Specific Product',
    'categories.read_blog': 'Read Our Blog',
    'category.garbage_bags': 'Garbage Bags',
    'category.plastic_bags': 'Plastic Bags',
    'category.roll_bags': 'Roll Bags',
    'category.polyethylene': 'Polyethylene Rolls',
    'category.stretch_film': 'Stretch Film',
    'category.packaging': 'Packaging Materials',
    
    // Product section
    'products.featured': 'Featured Products',
    'products.view_all': 'View all products',
    'products.custom.title': 'Looking for custom products?',
    'products.custom.description': 'We offer custom packaging solutions tailored to your specific needs. Contact us to discuss your project.',
    'products.custom.quote': 'Request Quote',
    'products.custom.view': 'View Custom Bags',
    
    // Call to action
    'cta.title': 'Need a Custom Quote?',
    'cta.description': 'We offer the best prices for wholesale purchases. Contact us today to get a quote tailored to your specific needs.',
    'cta.quote': 'Request a Quote',
    'cta.quote.description': 'Complete our online form and receive a personalized quote in less than 24 hours.',
    'cta.quote.button': 'Get Quote Now',
    'cta.call': 'Call Us Directly',
    'cta.call.description': 'Talk to our expert advisors and receive personalized advice on your packaging needs.',
    'cta.call.button': 'Contact Now',
    'cta.blog': 'Visit Our Blog',
    'cta.blog.description': 'Learn about the latest trends in packaging, tips for your business, and industry news.',
    'cta.blog.button': 'Explore Blog',
    'cta.cart.prompt': 'Already know what you need?',
    'cta.cart.button': 'Go to shopping cart',
    
    // Footer
    'footer.about': 'More than 20 years distributing high-quality plastic bags and packaging material to customers throughout Mexico.',
    'footer.quick_links': 'Quick Links',
    'footer.main_products': 'Main Products',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms and Conditions',
    
    // Quote form
    'quote.contact_info': 'Contact Information',
    'quote.name': 'Name',
    'quote.email': 'Email',
    'quote.phone': 'Phone',
    'quote.company': 'Company',
    'quote.product_info': 'Product Information',
    'quote.product_type': 'Product Type',
    'quote.quantity': 'Estimated Quantity',
    'quote.unit': 'Unit',
    'quote.specifications': 'Product Specifications',
    'quote.specifications.placeholder': 'Describe measurements, gauge, color, and other relevant specifications',
    'quote.additional_info': 'Additional Information',
    'quote.additional_info.placeholder': 'Any other information you consider relevant for your quote',
    'quote.submit': 'Submit Request',
    'quote.submitting': 'Submitting...',
    
    // Wholesale
    'wholesale.title': 'WEM Wholesale Program',
    'wholesale.description': 'Special prices, direct deliveries, and personalized attention for businesses that require volume.',
    'wholesale.quote': 'Request Quote',
    'wholesale.call': 'Call Sales',
    'wholesale.direct_delivery': 'Direct Delivery',
    'wholesale.direct_delivery.description': 'Receive your orders directly at your business or warehouse without intermediaries. Our trucks reach the entire country.',
    'wholesale.volume': 'Optimized Volume',
    'wholesale.volume.description': 'We produce large quantities with the same quality. We optimize our processes to offer the best price without compromising quality.',
    'wholesale.prices': 'Preferential Prices',
    'wholesale.prices.description': 'Volume discounts to increase your profit margin. Special prices for distributors and recurring customers.',
    'wholesale.advantages': 'Advantages of Buying Wholesale',
    'wholesale.advantages.description': 'At WEM Mexico we offer exclusive benefits for our wholesale customers that make your investment worthwhile.',
    'wholesale.faq': 'Frequently Asked Questions',
    'wholesale.faq.description': 'Answers to common questions about our wholesale program.',
    'wholesale.contact_us': 'Contact us directly',
    'wholesale.ready': 'Ready to buy wholesale?',
    'wholesale.ready.description': 'Our sales team is ready to help you find the best solutions for your business at competitive prices.',
    'wholesale.hours': 'Service hours: Monday to Friday from 9:00 to 18:00 hrs.',
    'wholesale.email': 'You can also write to us at:',
    
    // Common
    'select':  'Select',
    'required': 'required',
    'loading': 'Loading...'
  }
};

interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  // Default to Spanish for Mexican market
  const [locale, setLocaleState] = useState<Locale>('es-MX');

  // Function to translate text
  const translate = (key: string): string => {
    return translations[locale][key] || key;
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale.split('-')[0];
  };

  // Initialize locale from localStorage if available
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && (savedLocale === 'es-MX' || savedLocale === 'en-US')) {
      setLocaleState(savedLocale);
      document.documentElement.lang = savedLocale.split('-')[0];
    } else {
      // Default to Spanish
      document.documentElement.lang = 'es';
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translate }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Hook to use locale throughout the app
export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
