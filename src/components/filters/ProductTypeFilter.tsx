
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PRODUCT_TYPES } from '@/data/productData';

interface ProductTypeFilterProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

const ProductTypeFilter = ({ selectedType, onTypeChange }: ProductTypeFilterProps) => {
  const handleChange = (value: string) => {
    if (value === 'all') {
      onTypeChange(null);
    } else {
      onTypeChange(value);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium mb-2">Tipo de Producto</h3>
      <RadioGroup 
        value={selectedType || 'all'} 
        onValueChange={handleChange}
        className="flex flex-col space-y-1.5"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all" className="text-sm">Todos</Label>
        </div>
        
        {PRODUCT_TYPES.map(type => (
          <div key={type.id} className="flex items-center space-x-2">
            <RadioGroupItem value={type.id} id={type.id} />
            <Label htmlFor={type.id} className="text-sm">{type.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ProductTypeFilter;
