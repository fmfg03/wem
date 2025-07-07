
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Search, X, Filter as FilterIcon, RefreshCw } from "lucide-react";
import StockFilter from './filters/StockFilter';
import PriceRangeFilter from './filters/PriceRangeFilter';
import FilterCheckboxGroup from './filters/FilterCheckboxGroup';
import TechnicalFilters from './filters/TechnicalFilters';

interface FiltersState {
  inStock: boolean;
  priceRange: [number, number];
  specifications: {
    medida: string[];
    color: string[];
    calibre: string[];
    calidad: string[];
  };
  technical: {
    tipoCamiseta: boolean;
    suajeReforzado: boolean;
    polipapel: boolean;
    compostable: boolean;
  };
}

interface ProductFiltersProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  onResetFilters?: () => void;
}

// Filter options from product tables
const FILTER_OPTIONS = {
  medida: [
    // Popular Sizes
    "15x25", "18x25", "20x30", "25x35", "30x40", "30x50", "40x60", "50x70", "60x90", "70x90", "90x120",
    // Small Bags
    "6x10", "8x12", "10x15", "10x20", "12x20"
  ],
  color: ["Natural", "Negro", "Blanco", "Verde", "Azul"],
  calibre: ["125", "150", "200", "300", "400", "500", "600", "800", "PCM"],
  calidad: ["Alta Densidad", "Media Densidad", "Baja Densidad", "Estándar"]
};

const ProductFilters = ({ filters, setFilters, onResetFilters }: ProductFiltersProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>("all");
  
  const handleStockChange = (checked: boolean) => {
    setFilters(prev => ({ ...prev, inStock: checked }));
  };

  const handlePriceChange = (value: number[]) => {
    // Ensure value has exactly two elements for the tuple type
    const safeValue: [number, number] = value.length >= 2 
      ? [value[0], value[1]] 
      : [filters.priceRange[0], filters.priceRange[1]];
      
    setFilters(prev => ({ ...prev, priceRange: safeValue }));
  };

  const handleSpecificationChange = (type: keyof FiltersState['specifications'], value: string) => {
    setFilters(prev => {
      const currentValues = [...prev.specifications[type]];
      const valueIndex = currentValues.indexOf(value);
      
      if (valueIndex === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(valueIndex, 1);
      }
      
      return {
        ...prev,
        specifications: {
          ...prev.specifications,
          [type]: currentValues
        }
      };
    });
  };

  const handleTechnicalChange = (type: keyof FiltersState['technical'], checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      technical: {
        ...prev.technical,
        [type]: checked
      }
    }));
  };

  const resetFilters = () => {
    if (onResetFilters) {
      onResetFilters();
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const isFilterActive = () => {
    return filters.inStock || 
           filters.priceRange[0] > 0 || 
           filters.priceRange[1] < 200 ||
           Object.values(filters.specifications).some(arr => arr.length > 0) ||
           Object.values(filters.technical).some(value => value === true);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.inStock) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) count++;
    
    // Count specification filters
    Object.values(filters.specifications).forEach(arr => {
      count += arr.length;
    });
    
    // Count technical filters
    Object.values(filters.technical).forEach(value => {
      if (value) count++;
    });
    
    return count;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filtros
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {getActiveFilterCount()}
              </span>
            )}
          </CardTitle>
          {isFilterActive() && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center text-xs h-8" 
              onClick={resetFilters}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Reiniciar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <StockFilter 
          inStock={filters.inStock} 
          onStockChange={handleStockChange} 
        />
        
        <Separator />
        
        <PriceRangeFilter 
          priceRange={filters.priceRange} 
          onPriceChange={handlePriceChange} 
        />
        
        <Separator />
        
        {/* Specifications filters */}
        <div className="space-y-4">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('medida')}
          >
            <h3 className="text-sm font-medium">Medida</h3>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              {expandedSection === 'medida' || expandedSection === 'all' ? <X className="h-3 w-3" /> : <Search className="h-3 w-3" />}
            </Button>
          </div>
          
          {(expandedSection === 'medida' || expandedSection === 'all') && (
            <FilterCheckboxGroup 
              options={FILTER_OPTIONS.medida} 
              selectedValues={filters.specifications.medida} 
              filterType="medida" 
              onFilterChange={handleSpecificationChange} 
            />
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('color')}
          >
            <h3 className="text-sm font-medium">Color</h3>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              {expandedSection === 'color' || expandedSection === 'all' ? <X className="h-3 w-3" /> : <Search className="h-3 w-3" />}
            </Button>
          </div>
          
          {(expandedSection === 'color' || expandedSection === 'all') && (
            <FilterCheckboxGroup 
              options={FILTER_OPTIONS.color} 
              selectedValues={filters.specifications.color} 
              filterType="color" 
              onFilterChange={handleSpecificationChange} 
            />
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('calibre')}
          >
            <h3 className="text-sm font-medium">Calibre</h3>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              {expandedSection === 'calibre' || expandedSection === 'all' ? <X className="h-3 w-3" /> : <Search className="h-3 w-3" />}
            </Button>
          </div>
          
          {(expandedSection === 'calibre' || expandedSection === 'all') && (
            <FilterCheckboxGroup 
              options={FILTER_OPTIONS.calibre} 
              selectedValues={filters.specifications.calibre} 
              filterType="calibre" 
              onFilterChange={handleSpecificationChange} 
            />
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('calidad')}
          >
            <h3 className="text-sm font-medium">Calidad</h3>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              {expandedSection === 'calidad' || expandedSection === 'all' ? <X className="h-3 w-3" /> : <Search className="h-3 w-3" />}
            </Button>
          </div>
          
          {(expandedSection === 'calidad' || expandedSection === 'all') && (
            <FilterCheckboxGroup 
              options={FILTER_OPTIONS.calidad} 
              selectedValues={filters.specifications.calidad} 
              filterType="calidad" 
              onFilterChange={handleSpecificationChange} 
            />
          )}
        </div>
        
        <Separator />
        
        {/* Technical Details */}
        <div className="space-y-4">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('technical')}
          >
            <h3 className="text-sm font-medium">Detalles Técnicos</h3>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              {expandedSection === 'technical' || expandedSection === 'all' ? <X className="h-3 w-3" /> : <Search className="h-3 w-3" />}
            </Button>
          </div>
          
          {(expandedSection === 'technical' || expandedSection === 'all') && (
            <TechnicalFilters 
              technical={filters.technical}
              onTechnicalChange={handleTechnicalChange}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
