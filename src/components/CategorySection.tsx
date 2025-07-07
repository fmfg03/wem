
import React from 'react';
import CategoryCard from './CategoryCard';
import { Package, PackageOpen, Scroll, Layers, Box, Search, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Bolsas para Basura",
    image: "https://images.unsplash.com/photo-1613149778612-28072ae467c2?q=80&w=2070",
    slug: "bolsas-para-basura",
    count: 25,
    icon: <PackageOpen className="h-8 w-8 text-wem-blue" />
  },
  {
    id: 2,
    name: "Bolsas de Plástico",
    image: "https://images.unsplash.com/photo-1586098947744-c1ee72d22b36?q=80&w=1974",
    slug: "bolsas-de-plastico",
    count: 18,
    icon: <Package className="h-8 w-8 text-wem-blue" />
  },
  {
    id: 3,
    name: "Bolsa en Rollo",
    image: "public/lovable-uploads/0365f9d9-0ec7-42b5-8814-7c6233785eb0.png",
    slug: "bolsa-en-rollo",
    count: 10,
    icon: <Scroll className="h-8 w-8 text-wem-blue" />
  },
  {
    id: 4,
    name: "Polietileno en Rollo",
    image: "https://images.unsplash.com/photo-1548667340-a36a8915ca71?q=80&w=2070",
    slug: "polietileno-en-rollo",
    count: 12,
    icon: <Layers className="h-8 w-8 text-wem-blue" />
  },
  {
    id: 5,
    name: "Playo y Stretch",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=2070",
    slug: "playo-y-stretch",
    count: 10,
    icon: <Box className="h-8 w-8 text-wem-blue" />
  }
];

const CategorySection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Nuestras Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
          {categories.map(category => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">
            ¿No encuentras lo que buscas? Tenemos muchas más opciones disponibles.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/productos">
              <Button className="bg-wem-blue hover:bg-wem-darkblue">
                <Search className="mr-2 h-4 w-4" />
                Explorar Todos los Productos
              </Button>
            </Link>
            <Link to="/contacto">
              <Button variant="outline" className="border-wem-blue text-wem-blue hover:bg-wem-lightblue">
                Solicitar Producto Específico
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="outline" className="border-wem-green text-wem-green hover:bg-wem-lightgreen">
                <FileText className="mr-2 h-4 w-4" />
                Leer Nuestro Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
