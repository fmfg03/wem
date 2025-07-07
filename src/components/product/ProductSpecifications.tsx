
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface ProductSpecificationsProps {
  title: string;
  icon: React.ReactNode;
  specs: Record<string, any> | undefined;
}

const ProductSpecifications = ({ title, icon, specs }: ProductSpecificationsProps) => {
  if (!specs || Object.keys(specs).length === 0) {
    return null;
  }
  
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center space-x-2 mb-3">
        {icon}
        <h4 className="font-semibold">{title}</h4>
      </div>
      
      <Separator className="mb-3" />
      
      <div className="space-y-2">
        {Object.entries(specs).map(([key, value]) => {
          // Handle boolean values
          if (typeof value === 'boolean') {
            return (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm capitalize">{formatKey(key)}:</span>
                <span className={`text-sm font-medium ${value ? 'text-green-600' : 'text-gray-500'}`}>
                  {value ? 'Sí' : 'No'}
                </span>
              </div>
            );
          }
          
          // Special formatting for caliber
          if (key === 'calibre') {
            return (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm capitalize">{formatKey(key)}:</span>
                <span className="text-sm font-medium">
                  {value === 'PCM' ? 'PCM (Por Ciento de Material)' : value}
                </span>
              </div>
            );
          }
          
          // Special formatting for presentation
          if (key === 'presentacion') {
            return (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm capitalize">{formatKey(key)}:</span>
                <span className="text-sm font-medium text-wem-blue">{value}</span>
              </div>
            );
          }
          
          // Handle medida with formatting
          if (key === 'medida' && typeof value === 'string') {
            return (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm capitalize">{formatKey(key)}:</span>
                <span className="text-sm font-medium">
                  {value.includes('x') ? `${value} cm` : value}
                </span>
              </div>
            );
          }
          
          // Handle regular string/number values
          return (
            <div key={key} className="flex justify-between items-center">
              <span className="text-sm capitalize">{formatKey(key)}:</span>
              <span className="text-sm font-medium">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to format specification keys for display
const formatKey = (key: string): string => {
  const specialCases: Record<string, string> = {
    'medida': 'Dimensiones',
    'calibre': 'Calibre',
    'presentacion': 'Presentación',
    'capacidad': 'Capacidad',
    'grosor': 'Grosor',
    'impresion': 'Impresión',
    'embalaje': 'Embalaje'
  };
  
  if (specialCases[key]) {
    return specialCases[key];
  }
  
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between camelCase words
};

export default ProductSpecifications;
