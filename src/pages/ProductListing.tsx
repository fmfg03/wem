
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Grid3X3, 
  List, 
  ArrowUpDown, 
  Search,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductCard from '@/components/ProductCard';
import EnhancedProductFilters from '@/components/EnhancedProductFilters';
import CategoryHeader from '@/components/CategoryHeader';
import IndustryHeader from '@/components/IndustryHeader';
import Breadcrumb from '@/components/Breadcrumb';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, FrontendProduct } from '@/contexts/ProductContext';

// Sample product data with adjusted type to include inStock
const productsData = [
  {
    id: '1',
    name: 'Bolsa de Basura Negra Grande',
    description: 'Bolsas de basura resistentes para uso general.',
    image: 'https://placehold.co/600x400/000/fff?text=Bolsa+Negra',
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
];

// Define color options for filters
const colorOptions = [
  { value: 'Negro', label: 'Negro' },
  { value: 'Blanco', label: 'Blanco' },
  { value: 'Verde', label: 'Verde' },
  { value: 'Azul', label: 'Azul' },
  { value: 'Gris', label: 'Gris' },
  { value: 'Café', label: 'Café' },
  { value: 'Rosa', label: 'Rosa' },
  { value: 'Morado', label: 'Morado' },
  { value: 'Dorado', label: 'Dorado' },
  { value: 'Cyan', label: 'Cyan' },
  { value: 'Transparente', label: 'Transparente' },
];

// Define calibre options for filters
const calibreOptions = [
  { value: '200', label: '200' },
  { value: '150', label: '150' },
  { value: '120', label: '120' },
  { value: '100', label: '100' },
  { value: '80', label: '80' },
  { value: 'N/A', label: 'No Aplica' },
];

// Define calidad options for filters
const calidadOptions = [
  { value: 'Alta', label: 'Alta' },
  { value: 'Media', label: 'Media' },
  { value: 'Estándar', label: 'Estándar' },
  { value: 'Premium', label: 'Premium' },
  { value: 'Reforzada', label: 'Reforzada' },
  { value: 'Especial', label: 'Especial' },
];

// Create a type for the sample product data that includes inStock
type SampleProduct = {
  id: string;  // Changed from string | number to string
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  inStock: boolean;
  featured: boolean;
  slug: string;
  specifications: {
    medida: string;
    color: string;
    calibre: string;
    calidad: string;
  };
  technical: {
    tipoCamiseta: boolean;
    suajeReforzado: boolean;
    polipapel: boolean;
    compostable: boolean;
  };
};

const ProductListing = () => {
  const { categorySlug, industrySlug } = useParams<{ categorySlug?: string, industrySlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products: contextProducts, loading } = useProducts();
  
  // State for view mode (grid or list)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // State for sort option
  const [sortOption, setSortOption] = useState<string>('featured');
  
  // State for mobile filters visibility
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  
  // State for filters - fixed priceRange to be a tuple
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    inStock: null as boolean | null,
    productType: null as string | null,
    colors: [] as string[],
    calibre: [] as string[],
    calidad: [] as string[],
    technical: {
      tipoCamiseta: false,
      suajeReforzado: false,
      polipapel: false,
      compostable: false,
    },
  });
  
  // Determine if we're showing products by category, industry, or all products
  const isCategoryView = !!categorySlug;
  const isIndustryView = !!industrySlug;
  
  // Get products from context or use sample data if not available
  const allProducts: (SampleProduct | FrontendProduct)[] = contextProducts.length > 0 
    ? contextProducts.map(p => ({
        ...p,
        inStock: p.stock > 0 // Add inStock property based on stock
      }))
    : productsData;
  
  // Filter products based on category or industry
  let filteredProducts = allProducts;
  
  if (isCategoryView) {
    filteredProducts = allProducts.filter(product => 
      product.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
    );
  } else if (isIndustryView) {
    // This would filter by industry if we had that data
    // For now, just show all products
    filteredProducts = allProducts;
  }
  
  // Apply filters
  filteredProducts = filteredProducts.filter(product => {
    // Filter by product type
    if (filters.productType && 
        product.category.toLowerCase().replace(/\s+/g, '-') !== filters.productType) {
      return false;
    }
    
    // Filter by price range
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    // Filter by stock
    if (filters.inStock !== null) {
      const productInStock = 'inStock' in product 
        ? product.inStock 
        : (product as FrontendProduct).stock > 0;
        
      if (productInStock !== filters.inStock) {
        return false;
      }
    }
    
    // Filter by colors
    if (filters.colors.length > 0 && 
        (!product.specifications?.color || 
         !filters.colors.includes(product.specifications.color))) {
      return false;
    }
    
    // Filter by calibre
    if (filters.calibre.length > 0 && 
        (!product.specifications?.calibre || 
         !filters.calibre.includes(product.specifications.calibre))) {
      return false;
    }
    
    // Filter by calidad
    if (filters.calidad.length > 0 && 
        (!product.specifications?.calidad || 
         !filters.calidad.includes(product.specifications.calidad))) {
      return false;
    }
    
    // Filter by technical specifications
    if (filters.technical.tipoCamiseta && !product.technical?.tipoCamiseta) {
      return false;
    }
    if (filters.technical.suajeReforzado && !product.technical?.suajeReforzado) {
      return false;
    }
    if (filters.technical.polipapel && !product.technical?.polipapel) {
      return false;
    }
    if (filters.technical.compostable && !product.technical?.compostable) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  switch (sortOption) {
    case 'price-asc':
      filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case 'name-asc':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'featured':
    default:
      filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }
  
  // Update filters
  const updateFilters = (key: string, value: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      priceRange: [0, 1000] as [number, number],
      inStock: null,
      productType: null,
      colors: [],
      calibre: [],
      calidad: [],
      technical: {
        tipoCamiseta: false,
        suajeReforzado: false,
        polipapel: false,
        compostable: false,
      },
    });
    setSearchTerm('');
  };
  
  // Get category name from slug
  const getCategoryName = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Get industry name from slug
  const getIndustryName = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };
  
  // Handle view mode change
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb 
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Productos', href: '/productos' },
              ...(isCategoryView ? [{ label: getCategoryName(categorySlug!), href: `/categoria/${categorySlug}` }] : []),
              ...(isIndustryView ? [{ label: getIndustryName(industrySlug!), href: `/industria/${industrySlug}` }] : [])
            ]} 
          />
          
          {isCategoryView && (
            <CategoryHeader 
              title={getCategoryName(categorySlug!)} 
              description={`Explora nuestra selección de ${getCategoryName(categorySlug!).toLowerCase()} de alta calidad.`}
            />
          )}
          
          {isIndustryView && (
            <IndustryHeader 
              title={getIndustryName(industrySlug!)} 
              description={`Soluciones de empaque para la industria de ${getIndustryName(industrySlug!).toLowerCase()}.`}
            />
          )}
          
          {!isCategoryView && !isIndustryView && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Todos los Productos</h1>
              <p className="text-gray-600">Explora nuestra amplia gama de productos de empaque y embalaje.</p>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <EnhancedProductFilters
                filters={filters}
                updateFilters={updateFilters}
                resetFilters={resetFilters}
                colorOptions={colorOptions}
                calibreOptions={calibreOptions}
                calidadOptions={calidadOptions}
              />
            </div>
            
            <div className="flex-grow">
              {/* Search and Sort Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  {/* Mobile Filter Button */}
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filtros
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filtros</SheetTitle>
                      </SheetHeader>
                      <div className="py-4">
                        <EnhancedProductFilters
                          filters={filters}
                          updateFilters={updateFilters}
                          resetFilters={resetFilters}
                          colorOptions={colorOptions}
                          calibreOptions={calibreOptions}
                          calidadOptions={calidadOptions}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                  
                  {/* Sort Dropdown */}
                  <Select value={sortOption} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Destacados</SelectItem>
                      <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                      <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* View Mode Toggle */}
                  <Button variant="outline" size="icon" onClick={toggleViewMode}>
                    {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              {/* Active Filters */}
              {(filters.colors.length > 0 || 
                filters.calibre.length > 0 || 
                filters.calidad.length > 0 || 
                filters.inStock !== null || 
                filters.technical.tipoCamiseta || 
                filters.technical.suajeReforzado || 
                filters.technical.polipapel || 
                filters.technical.compostable ||
                filters.productType !== null) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-sm font-medium">Filtros activos:</span>
                  
                  {filters.productType && (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => updateFilters("productType", null)}
                    >
                      Tipo: {getCategoryName(filters.productType)}
                      <X className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                  
                  {filters.inStock !== null && (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => updateFilters("inStock", null)}
                    >
                      {filters.inStock ? 'En Stock' : 'Sin Stock'}
                      <X className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                  
                  {filters.colors.map(color => (
                    <Button 
                      key={color}
                      variant="secondary" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => updateFilters("colors", filters.colors.filter(c => c !== color))}
                    >
                      Color: {color}
                      <X className="ml-1 h-3 w-3" />
                    </Button>
                  ))}
                  
                  {filters.calibre.map(calibre => (
                    <Button 
                      key={calibre}
                      variant="secondary" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => updateFilters("calibre", filters.calibre.filter(c => c !== calibre))}
                    >
                      Calibre: {calibre}
                      <X className="ml-1 h-3 w-3" />
                    </Button>
                  ))}
                  
                  {filters.calidad.map(calidad => (
                    <Button 
                      key={calidad}
                      variant="secondary" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => updateFilters("calidad", filters.calidad.filter(c => c !== calidad))}
                    >
                      Calidad: {calidad}
                      <X className="ml-1 h-3 w-3" />
                    </Button>
                  ))}
                  
                  {Object.entries(filters.technical)
                    .filter(([_, value]) => value)
                    .map(([key, _]) => (
                      <Button 
                        key={key}
                        variant="secondary" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => updateFilters("technical", { ...filters.technical, [key]: false })}
                      >
                        {key === 'tipoCamiseta' ? 'Tipo Camiseta' : 
                         key === 'suajeReforzado' ? 'Suaje Reforzado' : 
                         key === 'polipapel' ? 'Polipapel' : 'Compostable'}
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={resetFilters}
                  >
                    Limpiar Filtros
                    <X className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {/* Results Count */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>
              
              {/* Products Grid/List */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No se encontraron productos</h3>
                  <p className="text-gray-600 mb-4">Intenta con otros filtros o términos de búsqueda.</p>
                  <Button onClick={resetFilters}>Limpiar Filtros</Button>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                }>
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id}
                      {...product}
                      className={viewMode === 'list' ? 'list-view' : ''}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListing;
