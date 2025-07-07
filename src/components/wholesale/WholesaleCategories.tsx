
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  description: string;
  minOrder: string;
  imageSrc: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, minOrder, imageSrc, link }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-sm text-gray-500 mb-4">
          <span className="font-medium">Pedido mínimo:</span> {minOrder}
        </div>
        <Link 
          to={link}
          className="inline-flex items-center text-wem-blue hover:text-wem-darkblue transition-colors"
        >
          Ver productos <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

const WholesaleCategories = () => {
  const categories = [
    {
      title: "Bolsas para Basura",
      description: "Bolsas resistentes para todo tipo de desechos. Ideales para hoteles, restaurantes y empresas.",
      minOrder: "100 kg",
      imageSrc: "/placeholder.svg",
      link: "/categoria/bolsas-para-basura?wholesale=true"
    },
    {
      title: "Bolsas de Plástico",
      description: "Amplia variedad de tamaños y calibres para diferentes usos comerciales e industriales.",
      minOrder: "75 kg",
      imageSrc: "/placeholder.svg",
      link: "/categoria/bolsas-de-plastico?wholesale=true"
    },
    {
      title: "Polietileno en Rollo",
      description: "Material en rollo para embalaje, protección y diversos usos industriales.",
      minOrder: "150 kg",
      imageSrc: "/placeholder.svg",
      link: "/categoria/polietileno-en-rollo?wholesale=true"
    },
    {
      title: "Playo y Stretch",
      description: "Material elástico para empaquetar, asegurar y proteger cargas durante el transporte.",
      minOrder: "50 kg",
      imageSrc: "/placeholder.svg",
      link: "/categoria/playo-y-stretch?wholesale=true"
    },
    {
      title: "Material de Empaque",
      description: "Soluciones completas para embalaje, protección y presentación de productos.",
      minOrder: "Variado según producto",
      imageSrc: "/placeholder.svg",
      link: "/categoria/material-de-empaque?wholesale=true"
    },
    {
      title: "Productos Personalizados",
      description: "Fabricamos productos según las especificaciones exactas que tu negocio necesita.",
      minOrder: "Consulta con ventas",
      imageSrc: "/placeholder.svg",
      link: "/cotizar?tipo=personalizado"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Categorías Disponibles al Mayoreo</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de productos plásticos y materiales de empaque al mayoreo para diferentes industrias y aplicaciones.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              title={category.title}
              description={category.description}
              minOrder={category.minOrder}
              imageSrc={category.imageSrc}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WholesaleCategories;
