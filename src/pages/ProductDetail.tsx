import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import QuantityCalculator from '../components/QuantityCalculator';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductSpecifications from '../components/product/ProductSpecifications';
import RelatedProducts from '../components/product/RelatedProducts';
import { 
  ShoppingCart, 
  FileText, 
  Tag, 
  Package, 
  Box, 
  CheckCircle2,
  ArrowLeft,
  Plus, 
  Minus
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const productsData = [
    {
        id: '1',
        name: 'Bolsa de Basura Negra Grande',
        description: 'Bolsas de basura resistentes para uso general.',
        image: 'https://placehold.co/600x400/000/fff?text=Bolsa+Negra',
        images: [
          'https://placehold.co/600x400/000/fff?text=Bolsa+Negra+1',
          'https://placehold.co/600x400/000/fff?text=Bolsa+Negra+2',
          'https://placehold.co/600x400/000/fff?text=Bolsa+Negra+3'
        ],
        category: 'Bolsas para Basura',
        price: 15.99,
        inStock: true,
        featured: true,
        slug: 'bolsa-basura-negra-grande',
        specifications: {
          medida: '90x120',
          color: 'Negro',
          calibre: '200',
          calidad: 'Alta'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: false,
          polipapel: false,
          compostable: false
        },
        applications: [
          "Residencial",
          "Comercial",
          "Industrial"
        ],
        benefits: [
          "Alta resistencia",
          "Fácil de usar",
          "Económica"
        ],
        relatedProductIds: ['2', '3']
      },
      {
        id: '2',
        name: 'Bolsa de Basura Biodegradable Mediana',
        description: 'Bolsas de basura amigables con el medio ambiente.',
        image: 'https://placehold.co/600x400/008000/fff?text=Bolsa+Verde',
        category: 'Bolsas para Basura',
        price: 19.99,
        inStock: true,
        featured: false,
        slug: 'bolsa-basura-biodegradable-mediana',
        specifications: {
          medida: '70x90',
          color: 'Verde',
          calibre: '150',
          calidad: 'Media'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: false,
          polipapel: false,
          compostable: true
        },
        applications: [
          "Doméstico",
          "Oficinas",
          "Jardines"
        ],
        benefits: [
          "Biodegradable",
          "No tóxica",
          "Compostable"
        ],
        relatedProductIds: ['1', '3']
      },
      {
        id: '3',
        name: 'Bolsa de Basura con Cordón Pequeña',
        description: 'Bolsas de basura con cierre fácil y seguro.',
        image: 'https://placehold.co/600x400/ADD8E6/000?text=Bolsa+Azul',
        category: 'Bolsas para Basura',
        price: 17.49,
        inStock: false,
        featured: false,
        slug: 'bolsa-basura-con-cordon-pequena',
        specifications: {
          medida: '50x60',
          color: 'Azul',
          calibre: '120',
          calidad: 'Media'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: true,
          polipapel: false,
          compostable: false
        },
        applications: [
          "Baños",
          "Automóviles",
          "Mascotas"
        ],
        benefits: [
          "Cierre seguro",
          "Fácil de transportar",
          "Higiénica"
        ],
        relatedProductIds: ['1', '2']
      },
      {
        id: '4',
        name: 'Bolsa de Regalo Metalizada Grande',
        description: 'Bolsas de regalo elegantes para ocasiones especiales.',
        image: 'https://placehold.co/600x400/C0C0C0/000?text=Bolsa+Gris',
        category: 'Bolsas de Regalo',
        price: 22.99,
        inStock: true,
        featured: true,
        slug: 'bolsa-regalo-metalizada-grande',
        specifications: {
          medida: '30x40',
          color: 'Gris',
          calibre: 'N/A',
          calidad: 'Premium'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: true,
          polipapel: true,
          compostable: false
        },
        applications: [
          "Cumpleaños",
          "Bodas",
          "Aniversarios"
        ],
        benefits: [
          "Elegante",
          "Reutilizable",
          "Resistente"
        ],
        relatedProductIds: ['5', '6']
      },
      {
        id: '5',
        name: 'Bolsa de Regalo de Papel Kraft Mediana',
        description: 'Bolsas de regalo rústicas y ecológicas.',
        image: 'https://placehold.co/600x400/F5DEB3/000?text=Bolsa+Cafe',
        category: 'Bolsas de Regalo',
        price: 18.79,
        inStock: true,
        featured: false,
        slug: 'bolsa-regalo-papel-kraft-mediana',
        specifications: {
          medida: '25x35',
          color: 'Café',
          calibre: 'N/A',
          calidad: 'Media'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: false,
          polipapel: false,
          compostable: true
        },
        applications: [
          "Regalos corporativos",
          "Eventos",
          "Tiendas"
        ],
        benefits: [
          "Ecológica",
          "Personalizable",
          "Económica"
        ],
        relatedProductIds: ['4', '6']
      },
      {
        id: '6',
        name: 'Bolsa de Regalo con Diseño Infantil Pequeña',
        description: 'Bolsas de regalo divertidas para niños.',
        image: 'https://placehold.co/600x400/FF69B4/000?text=Bolsa+Rosa',
        category: 'Bolsas de Regalo',
        price: 15.49,
        inStock: true,
        featured: false,
        slug: 'bolsa-regalo-con-diseno-infantil-pequena',
        specifications: {
          medida: '20x30',
          color: 'Rosa',
          calibre: 'N/A',
          calidad: 'Media'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: true,
          polipapel: true,
          compostable: false
        },
        applications: [
          "Fiestas infantiles",
          "Regalos escolares",
          "Jugueterías"
        ],
        benefits: [
          "Atractiva",
          "Resistente",
          "Segura"
        ],
        relatedProductIds: ['4', '5']
      },
      {
        id: '7',
        name: 'Bolsa Tipo Boutique con Asas Troqueladas Grande',
        description: 'Bolsas tipo boutique para tiendas de ropa y accesorios.',
        image: 'https://placehold.co/600x400/D3D3D3/000?text=Bolsa+Blanca',
        category: 'Bolsas Tipo Boutique',
        price: 25.99,
        inStock: true,
        featured: true,
        slug: 'bolsa-tipo-boutique-con-asas-troqueladas-grande',
        specifications: {
          medida: '40x50',
          color: 'Blanco',
          calibre: 'N/A',
          calidad: 'Premium'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: true,
          polipapel: true,
          compostable: false
        },
        applications: [
          "Boutiques",
          "Tiendas de ropa",
          "Accesorios"
        ],
        benefits: [
          "Elegante",
          "Resistente",
          "Cómoda"
        ],
        relatedProductIds: ['8', '9']
      },
      {
        id: '8',
        name: 'Bolsa Tipo Boutique con Asas de Cordón Mediana',
        description: 'Bolsas tipo boutique con asas de cordón para mayor comodidad.',
        image: 'https://placehold.co/600x400/800080/fff?text=Bolsa+Morada',
        category: 'Bolsas Tipo Boutique',
        price: 23.49,
        inStock: true,
        featured: false,
        slug: 'bolsa-tipo-boutique-con-asas-de-cordon-mediana',
        specifications: {
          medida: '35x45',
          color: 'Morado',
          calibre: 'N/A',
          calidad: 'Media'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: true,
          polipapel: true,
          compostable: false
        },
        applications: [
          "Zapaterías",
          "Joyerías",
          "Regalos"
        ],
        benefits: [
          "Cómoda",
          "Resistente",
          "Atractiva"
        ],
        relatedProductIds: ['7', '9']
      },
      {
        id: '9',
        name: 'Bolsa Tipo Boutique Laminada Pequeña',
        description: 'Bolsas tipo boutique laminadas para mayor protección.',
        image: 'https://placehold.co/600x400/FFD700/000?text=Bolsa+Dorada',
        category: 'Bolsas Tipo Boutique',
        price: 21.99,
        inStock: true,
        featured: false,
        slug: 'bolsa-tipo-boutique-laminada-pequena',
        specifications: {
          medida: '30x40',
          color: 'Dorado',
          calibre: 'N/A',
          calidad: 'Media'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: true,
          polipapel: true,
          compostable: false
        },
        applications: [
          "Cosméticos",
          "Perfumes",
          "Eventos especiales"
        ],
        benefits: [
          "Protectora",
          "Elegante",
          "Atractiva"
        ],
        relatedProductIds: ['7', '8']
      },
      {
        id: '10',
        name: 'Bolsa de Camiseta Lisa Grande',
        description: 'Bolsas de camiseta lisas para supermercados y tiendas.',
        image: 'https://placehold.co/600x400/FFFFFF/000?text=Bolsa+Blanca',
        category: 'Bolsas Tipo Camiseta',
        price: 12.49,
        inStock: true,
        featured: true,
        slug: 'bolsa-de-camiseta-lisa-grande',
        specifications: {
          medida: '30x50',
          color: 'Blanco',
          calibre: 'N/A',
          calidad: 'Estándar'
        },
        technical: {
          tipoCamiseta: true,
          suajeReforzado: false,
          polipapel: false,
          compostable: false
        },
        applications: [
          "Supermercados",
          "Tiendas de conveniencia",
          "Mercados"
        ],
        benefits: [
          "Económica",
          "Resistente",
          "Práctica"
        ],
        relatedProductIds: ['11', '12']
      },
      {
        id: '11',
        name: 'Bolsa de Camiseta Impresa Mediana',
        description: 'Bolsas de camiseta impresas para promociones y publicidad.',
        image: 'https://placehold.co/600x400/00FFFF/000?text=Bolsa+Cyan',
        category: 'Bolsas Tipo Camiseta',
        price: 14.99,
        inStock: true,
        featured: false,
        slug: 'bolsa-de-camiseta-impresa-mediana',
        specifications: {
          medida: '25x45',
          color: 'Cyan',
          calibre: 'N/A',
          calidad: 'Estándar'
        },
        technical: {
          tipoCamiseta: true,
          suajeReforzado: false,
          polipapel: true,
          compostable: false
        },
        applications: [
          "Promociones",
          "Eventos",
          "Publicidad"
        ],
        benefits: [
          "Publicitaria",
          "Económica",
          "Práctica"
        ],
        relatedProductIds: ['10', '12']
      },
      {
        id: '12',
        name: 'Bolsa de Camiseta Reforzada Pequeña',
        description: 'Bolsas de camiseta reforzadas para productos pesados.',
        image: 'https://placehold.co/600x400/8B4513/fff?text=Bolsa+Cafe',
        category: 'Bolsas Tipo Camiseta',
        price: 13.79,
        inStock: true,
        featured: false,
        slug: 'bolsa-de-camiseta-reforzada-pequena',
        specifications: {
          medida: '20x40',
          color: 'Café',
          calibre: 'N/A',
          calidad: 'Reforzada'
        },
        technical: {
          tipoCamiseta: true,
          suajeReforzado: true,
          polipapel: false,
          compostable: false
        },
        applications: [
          "Ferreterías",
          "Jugueterías",
          "Productos pesados"
        ],
        benefits: [
          "Resistente",
          "Segura",
          "Práctica"
        ],
         relatedProductIds: ['10', '11']
      },
      {
        id: '13',
        name: 'Bolsa de Polipropileno Transparente Lisa Grande',
        description: 'Bolsas de polipropileno transparente para alimentos y productos.',
        image: 'https://placehold.co/600x400/FFFFFF/000?text=Bolsa+Transparente',
        category: 'Bolsas de Polipropileno',
        price: 16.29,
        inStock: true,
        featured: true,
        slug: 'bolsa-de-polipropileno-transparente-lisa-grande',
        specifications: {
          medida: '30x40',
          color: 'Transparente',
          calibre: 'N/A',
          calidad: 'Estándar'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: false,
          polipapel: false,
          compostable: false
        },
        applications: [
          "Alimentos",
          "Productos",
          "Empaques"
        ],
        benefits: [
          "Transparente",
          "Protectora",
          "Versátil"
        ],
        relatedProductIds: ['14', '15']
      },
      {
        id: '14',
        name: 'Bolsa de Polipropileno Impresa Mediana',
        description: 'Bolsas de polipropileno impresas para publicidad y promociones.',
        image: 'https://placehold.co/600x400/00FFFF/000?text=Bolsa+Cyan',
        category: 'Bolsas de Polipropileno',
        price: 18.79,
        inStock: true,
        featured: false,
        slug: 'bolsa-de-polipropileno-impresa-mediana',
        specifications: {
          medida: '25x35',
          color: 'Cyan',
          calibre: 'N/A',
          calidad: 'Estándar'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: false,
          polipapel: true,
          compostable: false
        },
        applications: [
          "Publicidad",
          "Promociones",
          "Eventos"
        ],
        benefits: [
          "Publicitaria",
          "Atractiva",
          "Versátil"
        ],
        relatedProductIds: ['13', '15']
      },
      {
        id: '15',
        name: 'Bolsa de Polipropileno Metalizada Pequeña',
        description: 'Bolsas de polipropileno metalizadas para productos especiales.',
        image: 'https://placehold.co/600x400/C0C0C0/000?text=Bolsa+Gris',
        category: 'Bolsas de Polipropileno',
        price: 17.49,
        inStock: true,
        featured: false,
        slug: 'bolsa-de-polipropileno-metalizada-pequena',
        specifications: {
          medida: '20x30',
          color: 'Gris',
          calibre: 'N/A',
          calidad: 'Especial'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: false,
          polipapel: true,
          compostable: false
        },
        applications: [
          "Regalos",
          "Joyería",
          "Cosméticos"
        ],
        benefits: [
          "Elegante",
          "Protectora",
          "Atractiva"
        ],
        relatedProductIds: ['13', '14']
      },
      {
        id: '16',
        name: 'Bolsa de Papel Kraft con Asa Rizada Grande',
        description: 'Bolsas de papel kraft con asa rizada para tiendas y eventos.',
        image: 'https://placehold.co/600x400/F5DEB3/000?text=Bolsa+Cafe',
        category: 'Bolsas de Papel Kraft',
        price: 19.99,
        inStock: true,
        featured: true,
        slug: 'bolsa-de-papel-kraft-con-asa-rizada-grande',
        specifications: {
          medida: '30x40',
          color: 'Café',
          calibre: 'N/A',
          calidad: 'Estándar'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: false,
          polipapel: false,
          compostable: true
        },
        applications: [
          "Tiendas",
          "Eventos",
          "Regalos"
        ],
        benefits: [
          "Ecológica",
          "Resistente",
          "Atractiva"
        ],
        relatedProductIds: ['17', '18']
      },
      {
        id: '17',
        name: 'Bolsa de Papel Kraft Impresa Mediana',
        description: 'Bolsas de papel kraft impresas para publicidad y promociones.',
        image: 'https://placehold.co/600x400/FFFFFF/000?text=Bolsa+Blanca',
        category: 'Bolsas de Papel Kraft',
        price: 22.49,
        inStock: true,
        featured: false,
        slug: 'bolsa-de-papel-kraft-impresa-mediana',
        specifications: {
          medida: '25x35',
          color: 'Blanco',
          calibre: 'N/A',
          calidad: 'Estándar'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: false,
          polipapel: true,
          compostable: true
        },
        applications: [
          "Publicidad",
          "Promociones",
          "Eventos"
        ],
        benefits: [
          "Publicitaria",
          "Ecológica",
          "Atractiva"
        ],
        relatedProductIds: ['16', '18']
      },
      {
        id: '18',
        name: 'Bolsa de Papel Kraft con Ventana Pequeña',
        description: 'Bolsas de papel kraft con ventana para mostrar productos.',
        image: 'https://placehold.co/600x400/F5DEB3/000?text=Bolsa+Cafe',
        category: 'Bolsas de Papel Kraft',
        price: 20.99,
        inStock: true,
        featured: false,
        slug: 'bolsa-de-papel-kraft-con-ventana-pequena',
        specifications: {
          medida: '20x30',
          color: 'Café',
          calibre: 'N/A',
          calidad: 'Especial'
        },
        technical: {
          tipoCamiseta: false,
          suajeReforzado: false,
          polipapel: false,
          compostable: true
        },
        applications: [
          "Panaderías",
          "Cafeterías",
          "Tiendas de regalos"
        ],
        benefits: [
          "Atractiva",
          "Ecológica",
          "Muestra el producto"
        ],
        relatedProductIds: ['16', '17']
      },
];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("descripcion");
  const { addItem } = useCart();
  
  const product = productsData.find(p => p.slug === slug);
  
  const relatedProducts = product?.relatedProductIds 
    ? productsData.filter(p => product.relatedProductIds?.includes(p.id)).slice(0, 3)
    : productsData.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <p className="mb-8">Lo sentimos, el producto que estás buscando no existe o ha sido eliminado.</p>
        <Link to="/categoria/bolsas-para-basura">
          <Button className="bg-wem-blue hover:bg-wem-darkblue">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Productos
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.price !== undefined && product.inStock) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image,
        slug: product.slug
      }, quantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm breadcrumbs mb-6">
        <ul className="flex items-center space-x-2">
          <li><Link to="/" className="text-wem-blue hover:underline">Inicio</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to="/productos" className="text-wem-blue hover:underline">Productos</Link></li>
          <li><span className="mx-2">/</span></li>
          <li>
            <Link 
              to={`/categoria/${product.category.toLowerCase().replace(/\s+/g, '-')}`} 
              className="text-wem-blue hover:underline"
            >
              {product.category}
            </Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-600">{product.name}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductImageGallery 
          images={product.images || [product.image]} 
          productName={product.name} 
        />
        
        <div className="product-info">
          <div className="mb-2">
            <Badge variant="outline" className="text-wem-blue">
              {product.category}
            </Badge>
            {product.featured && (
              <Badge className="ml-2 bg-wem-green text-white">
                Destacado
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive" className="ml-2">
                Agotado
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {product.price && (
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold text-wem-blue">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 ml-2">+ IVA / unidad</span>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {product.specifications && Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-wem-blue" />
                <span className="text-sm">
                  <span className="font-semibold capitalize">{key}: </span>
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Cantidad:</h3>
            <div className="flex items-center w-32 border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="flex-grow text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={incrementQuantity}
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-0">
              <QuantityCalculator 
                productId={product.id}
                productName={product.name}
                basePrice={product.price}
              />
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <Button 
              onClick={handleAddToCart}
              className="bg-wem-green hover:bg-wem-darkgreen flex-grow sm:flex-grow-0"
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agregar al Carrito
            </Button>
            
            <Link to="/cotizar" className="flex-grow sm:flex-grow-0">
              <Button 
                variant="outline" 
                className="border-wem-blue text-wem-blue hover:bg-wem-lightblue w-full"
              >
                <FileText className="mr-2 h-4 w-4" />
                Solicitar Cotización
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <Tabs defaultValue="descripcion" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto md:inline-flex">
            <TabsTrigger value="descripcion">Descripción</TabsTrigger>
            <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
            <TabsTrigger value="aplicaciones">Aplicaciones</TabsTrigger>
            <TabsTrigger value="beneficios">Beneficios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="descripcion" className="p-4 bg-white rounded-md border mt-2">
            <h3 className="text-xl font-semibold mb-4">Descripción Detallada</h3>
            <div className="whitespace-pre-line">
              {product.description}
            </div>
          </TabsContent>
          
          <TabsContent value="especificaciones" className="p-4 bg-white rounded-md border mt-2">
            <h3 className="text-xl font-semibold mb-4">Especificaciones Técnicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductSpecifications 
                title="Especificaciones Básicas"
                icon={<Package className="h-5 w-5 text-wem-blue" />}
                specs={product.specifications}
              />
              
              <ProductSpecifications 
                title="Información Técnica"
                icon={<Box className="h-5 w-5 text-wem-blue" />}
                specs={product.technical}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="aplicaciones" className="p-4 bg-white rounded-md border mt-2">
            <h3 className="text-xl font-semibold mb-4">Aplicaciones Sugeridas</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(product.applications || [
                "Uso Comercial",
                "Uso Industrial",
                "Uso Doméstico",
                "Hospitalario",
                "Centros Educativos"
              ]).map((app, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-md">
                  <CheckCircle2 className="h-5 w-5 text-wem-green" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="beneficios" className="p-4 bg-white rounded-md border mt-2">
            <h3 className="text-xl font-semibold mb-4">Beneficios del Producto</h3>
            
            <div className="space-y-4">
              {(product.benefits || [
                "Resistencia superior",
                "Fácil uso y manejo",
                "Material de calidad",
                "Cumple con normas ambientales",
                "Excelente relación precio-calidad"
              ]).map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-md">
                  <CheckCircle2 className="h-5 w-5 text-wem-green" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </div>
  );
};

export default ProductDetail;
