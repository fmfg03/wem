
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface StockFilterProps {
  inStock: boolean | null;
  onStockChange: (checked: boolean) => void;
}

const StockFilter = ({ inStock, onStockChange }: StockFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="in-stock" className="font-medium">Solo productos en existencia</Label>
        <Switch 
          id="in-stock" 
          checked={inStock === true}
          onCheckedChange={onStockChange}
        />
      </div>
    </div>
  );
};

export default StockFilter;
