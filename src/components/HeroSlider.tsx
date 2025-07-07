
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  title: string;
  description: string;
  subDescription: string;
  image: string;
  ctaLink: string;
  ctaText: string;
  secondaryCta?: {
    text: string;
    link: string;
  }
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Las bolsas de plástico hacen posible tu día",
    description: "En WEM, nos especializamos en ofrecer soluciones de empaque que no solo cumplen con los estándares de calidad más altos, sino que también se adaptan a las necesidades específicas de cada cliente.",
    subDescription: "Nuestras bolsas están diseñadas para ser resistentes y versátiles, asegurando que tus productos estén siempre protegidos, ya sea durante el transporte o el almacenamiento. Además, nos comprometemos a innovar constantemente, incorporando materiales sostenibles y tecnologías avanzadas para ofrecerte lo mejor en empaque.",
    image: "https://images.unsplash.com/photo-1606037177194-544ed5501c82?q=80&w=2070",
    ctaLink: "/categoria/bolsas-de-plastico",
    ctaText: "Explorar Bolsas",
    secondaryCta: {
      text: "Solicitar Cotización",
      link: "/cotizar"
    }
  },
  {
    id: 2,
    title: "Material de Empaque para Empresas",
    description: "La mejor selección de película stretch, burbuja, y más para tus necesidades de empaque.",
    subDescription: "Proveemos soluciones completas de empaque industrial que garantizan la protección de tus productos durante todo el proceso logístico.",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=2070",
    ctaLink: "/categoria/material-de-empaque",
    ctaText: "Explorar Materiales",
    secondaryCta: {
      text: "Ver Mayoreo",
      link: "/mayoreo"
    }
  },
  {
    id: 3,
    title: "Polietileno en Rollo de Alta Calidad",
    description: "Rollos de polietileno natural, negro y de colores para todo tipo de aplicaciones industriales.",
    subDescription: "Nuestro polietileno en rollo ofrece versatilidad y resistencia para diversas aplicaciones, desde empaque hasta protección de superficies.",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2070",
    ctaLink: "/categoria/polietileno-en-rollo",
    ctaText: "Comprar Ahora",
    secondaryCta: {
      text: "Ver Especificaciones",
      link: "/categoria/polietileno-en-rollo"
    }
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[50vh] sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
          </div>
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 animate-fade-in line-clamp-2 sm:line-clamp-none text-white text-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-2 sm:mb-4 animate-fade-in line-clamp-2 sm:line-clamp-3 text-white/90 text-shadow-lg">
                  {slide.description}
                </p>
                <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-6 animate-fade-in hidden sm:block sm:line-clamp-2 md:line-clamp-3 text-white/80 text-shadow">
                  {slide.subDescription}
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link to={slide.ctaLink}>
                    <Button size="sm" className="animate-fade-in w-full sm:w-auto sm:text-sm md:text-base bg-primary-100 hover:bg-secondary-200 text-white">
                      {slide.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  {slide.secondaryCta && (
                    <Link to={slide.secondaryCta.link}>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-white text-white hover:bg-white/20 animate-fade-in w-full sm:w-auto sm:text-sm md:text-base"
                      >
                        {slide.secondaryCta.text}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
