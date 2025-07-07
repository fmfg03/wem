
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from 'lucide-react';

interface ProductListEmptyProps {
  searchTerm: string;
  resetSearch: () => void;
  resetFilters: () => void;
}

const ProductListEmpty = ({ searchTerm, resetSearch, resetFilters }: ProductListEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
      
      {searchTerm ? (
        <p className="text-gray-600 mb-6 max-w-md">
          No encontramos resultados para "<span className="font-medium">{searchTerm}</span>". 
          Intenta con otros términos o restablece tu búsqueda.
        </p>
      ) : (
        <p className="text-gray-600 mb-6 max-w-md">
          No encontramos productos que coincidan con los filtros seleccionados.
          Prueba a cambiar tus criterios de búsqueda.
        </p>
      )}
      
      <div className="flex flex-wrap gap-3 justify-center">
        {searchTerm && (
          <Button 
            variant="outline" 
            onClick={resetSearch}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Limpiar búsqueda
          </Button>
        )}
        
        <Button 
          variant="default" 
          onClick={resetFilters}
          className="bg-wem-blue flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Restablecer filtros
        </Button>
      </div>
    </div>
  );
};

export default ProductListEmpty;
