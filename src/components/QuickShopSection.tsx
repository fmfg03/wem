
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  Trash2, 
  Recycle, 
  Truck, 
  Box, 
  PackageOpen,
  ArrowRight,
  Leaf
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface QuickShopItemProps {
  title: string;
  icon: React.ReactNode;
  link: string;
  bgColor: string;
  textColor: string;
}

const QuickShopItem = ({ title, icon, link, bgColor, textColor }: QuickShopItemProps) => (
  <Link 
    to={link} 
    className={`flex flex-col items-center justify-center p-6 rounded-lg hover:shadow-lg transition-all ${bgColor} ${textColor} text-center h-full`}
  >
    <div className="mb-3 text-3xl">{icon}</div>
    <h3 className="text-sm font-medium">{title}</h3>
  </Link>
);

const productCategories = [
  {
    title: "Bolsa Natural",
    icon: <ShoppingBag />,
    link: "/categoria/bolsa-natural",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800"
  },
  {
    title: "Bolsa Basura",
    icon: <Trash2 />,
    link: "/categoria/bolsa-basura",
    bgColor: "bg-zinc-100",
    textColor: "text-zinc-800"
  },
  {
    title: "Bolsa Chica",
    icon: <PackageOpen />,
    link: "/categoria/bolsa-chica",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800"
  },
  {
    title: "Bolsa en Rollo",
    icon: <Recycle />,
    link: "/categoria/bolsa-en-rollo",
    bgColor: "bg-green-50",
    textColor: "text-green-800"
  },
  {
    title: "Bolsa Biodegradable",
    icon: <Leaf />,
    link: "/categoria/bolsa-biodegradable",
    bgColor: "bg-green-100",
    textColor: "text-green-800"
  },
  {
    title: "Rollo Polietileno",
    icon: <Package />,
    link: "/categoria/rollo-polietileno",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800"
  },
  {
    title: "Rollo Vinil",
    icon: <Box />,
    link: "/categoria/rollo-vinil",
    bgColor: "bg-pink-50",
    textColor: "text-pink-800"
  },
  {
    title: "Rollo PVC",
    icon: <Truck />,
    link: "/categoria/rollo-pvc",
    bgColor: "bg-orange-50",
    textColor: "text-orange-800"
  }
];

const QuickShopSection = () => {
  return (
    <section className="py-6 md:py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Compra Rápida por Producto</h2>
          <Link to="/productos" className="text-wem-blue hover:text-wem-darkblue flex items-center text-sm">
            Ver todos los productos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {productCategories.map((category, index) => (
                <CarouselItem key={index} className="basis-1/2 sm:basis-1/3">
                  <div className="p-1 h-full">
                    <QuickShopItem {...category} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="static transform-none mx-2" />
              <CarouselNext className="static transform-none mx-2" />
            </div>
          </Carousel>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-8 gap-4">
          {productCategories.map((category, index) => (
            <div key={index} className="h-full">
              <QuickShopItem {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickShopSection;
