
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceChange: (value: number[]) => void;
}

const PriceRangeFilter = ({ priceRange, onPriceChange }: PriceRangeFilterProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Rango de precio</h3>
        <Slider 
          defaultValue={[priceRange[0], priceRange[1]]} 
          max={200} 
          step={10}
          onValueChange={onPriceChange}
          className="my-6"
        />
        <div className="flex justify-between text-sm mt-1">
          <span className="font-medium">${priceRange[0]}</span>
          <span className="font-medium">${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
