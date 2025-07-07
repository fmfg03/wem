
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';

const FeaturedProducts = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="section-title">Productos Destacados</h2>
          <Link to="/productos">
            <Button variant="outline" className="mt-4 md:mt-0">
              Ver todos los productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id}
              id={String(product.id)} // Convert id to string to match ProductCardProps
              name={product.name}
              description={product.description}
              image={product.image}
              category={product.category}
              price={product.price}
              inStock={product.stock > 0}
              featured={product.featured}
              slug={product.slug}
            />
          ))}
        </div>
        
        <div className="mt-10 bg-gradient-to-r from-wem-lightblue to-blue-100 rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-wem-darkblue mb-2">¿Buscas productos personalizados?</h3>
              <p className="text-gray-700">
                Ofrecemos soluciones de empaque a la medida para tus necesidades específicas. 
                Contáctanos para discutir tu proyecto.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/cotizar">
                <Button className="bg-wem-blue hover:bg-wem-darkblue w-full sm:w-auto">
                  Solicitar Cotización
                </Button>
              </Link>
              <Link to="/categoria/bolsas-de-plastico">
                <Button variant="outline" className="border-wem-blue text-wem-blue hover:bg-wem-lightblue w-full sm:w-auto">
                  <Package className="mr-2 h-4 w-4" />
                  Ver Bolsas Personalizadas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
