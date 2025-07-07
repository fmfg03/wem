
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HardHat, 
  Trash2, 
  UtensilsCrossed, 
  Package2 
} from 'lucide-react';

interface Industry {
  id: string;
  name: string;
  slug: string;
  icon: React.ReactNode;
  description: string;
}

interface IndustrySelectorProps {
  activeIndustry?: string;
}

const IndustrySelector = ({ activeIndustry }: IndustrySelectorProps) => {
  const industries: Industry[] = [
    {
      id: "1",
      name: "Construcción",
      slug: "construccion",
      icon: <HardHat />,
      description: "Soluciones para la industria de la construcción"
    },
    {
      id: "2",
      name: "Limpieza",
      slug: "limpieza",
      icon: <Trash2 />,
      description: "Productos para servicios de limpieza"
    },
    {
      id: "3",
      name: "Alimentos",
      slug: "alimentos",
      icon: <UtensilsCrossed />,
      description: "Empaques para la industria alimenticia"
    },
    {
      id: "4",
      name: "Empaque",
      slug: "empaque",
      icon: <Package2 />,
      description: "Soluciones para empaque y embalaje"
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {industries.map((industry) => (
        <Link 
          key={industry.id}
          to={`/industria/${industry.slug}`}
          className={`
            flex flex-col items-center justify-center p-4 rounded-lg border 
            transition-all duration-200 hover:shadow-md
            ${activeIndustry === industry.slug 
              ? 'bg-blue-50 border-blue-300' 
              : 'bg-white border-gray-200 hover:border-blue-200'}
          `}
        >
          <div className={`
            p-3 rounded-full mb-2
            ${activeIndustry === industry.slug ? 'text-blue-600 bg-blue-100' : 'text-gray-600 bg-gray-100'}
          `}>
            {industry.icon}
          </div>
          <h3 className="font-medium text-center">{industry.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default IndustrySelector;
