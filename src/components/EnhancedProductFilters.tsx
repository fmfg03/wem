
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilterX } from 'lucide-react';
import PriceRangeFilter from './filters/PriceRangeFilter';
import StockFilter from './filters/StockFilter';
import TechnicalFilters from './filters/TechnicalFilters';
import FilterCheckboxGroup from './filters/FilterCheckboxGroup';
import ProductTypeFilter from './filters/ProductTypeFilter';
import { COLOR_OPTIONS, CALIBRE_OPTIONS, CALIDAD_OPTIONS } from '@/data/productData';

interface EnhancedProductFiltersProps {
  filters: {
    priceRange: [number, number];
    inStock: boolean | null;
    productType: string | null;
    colors: string[];
    calibre: string[];
    calidad: string[];
    technical: {
      tipoCamiseta: boolean;
      suajeReforzado: boolean;
      polipapel: boolean;
      compostable: boolean;
    };
  };
  updateFilters: (key: string, value: any) => void;
  resetFilters: () => void;
  colorOptions?: { value: string; label: string }[];
  calibreOptions?: { value: string; label: string }[];
  calidadOptions?: { value: string; label: string }[];
}

const EnhancedProductFilters = ({
  filters,
  updateFilters,
  resetFilters,
  colorOptions = COLOR_OPTIONS,
  calibreOptions = CALIBRE_OPTIONS,
  calidadOptions = CALIDAD_OPTIONS,
}: EnhancedProductFiltersProps) => {
  const handleProductTypeChange = (type: string | null) => {
    updateFilters("productType", type);
  };

  return (
    <div className="product-filters bg-white rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Filtros</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={resetFilters}
          className="text-gray-500 hover:text-red-500"
        >
          <FilterX className="h-4 w-4 mr-1" />
          Limpiar
        </Button>
      </div>
      
      <Separator />
      
      {/* Product Type Filter */}
      <ProductTypeFilter 
        selectedType={filters.productType}
        onTypeChange={handleProductTypeChange}
      />
      
      <Separator />
      
      <PriceRangeFilter 
        priceRange={filters.priceRange}
        onPriceChange={(value) => updateFilters("priceRange", value)}
      />
      
      <Separator />
      
      <StockFilter 
        inStock={filters.inStock !== null ? filters.inStock : false}
        onStockChange={(value) => updateFilters("inStock", value)}
      />
      
      <Separator />
      
      <FilterCheckboxGroup
        title="Color"
        options={colorOptions}
        selectedValues={filters.colors}
        onChange={(values) => updateFilters("colors", values)}
      />
      
      <Separator />
      
      <FilterCheckboxGroup
        title="Calibre"
        options={calibreOptions}
        selectedValues={filters.calibre}
        onChange={(values) => updateFilters("calibre", values)}
      />
      
      <Separator />
      
      <FilterCheckboxGroup
        title="Calidad"
        options={calidadOptions}
        selectedValues={filters.calidad}
        onChange={(values) => updateFilters("calidad", values)}
      />
      
      <Separator />
      
      <TechnicalFilters
        technical={filters.technical}
        onChange={(key, value) => {
          updateFilters("technical", {
            ...filters.technical,
            [key]: value,
          });
        }}
      />
    </div>
  );
};

export default EnhancedProductFilters;
