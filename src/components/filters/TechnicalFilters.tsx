
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TechnicalFiltersProps {
  technical: {
    tipoCamiseta: boolean;
    suajeReforzado: boolean;
    polipapel: boolean;
    compostable: boolean;
  };
  onChange?: (key: string, checked: boolean) => void;
  onTechnicalChange?: (key: string, checked: boolean) => void;
}

const TechnicalFilters = ({ technical, onChange, onTechnicalChange }: TechnicalFiltersProps) => {
  const handleChange = (key: string, checked: boolean) => {
    if (onTechnicalChange) {
      onTechnicalChange(key, checked);
    } else if (onChange) {
      onChange(key, checked);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Detalles Técnicos</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="tipo-camiseta" 
            checked={technical.tipoCamiseta}
            onCheckedChange={(checked) => 
              handleChange('tipoCamiseta', checked === true)
            }
          />
          <Label 
            htmlFor="tipo-camiseta"
            className="text-sm"
          >
            Tipo Camiseta
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="suaje-reforzado" 
            checked={technical.suajeReforzado}
            onCheckedChange={(checked) => 
              handleChange('suajeReforzado', checked === true)
            }
          />
          <Label 
            htmlFor="suaje-reforzado"
            className="text-sm"
          >
            Suaje Reforzado
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="polipapel" 
            checked={technical.polipapel}
            onCheckedChange={(checked) => 
              handleChange('polipapel', checked === true)
            }
          />
          <Label 
            htmlFor="polipapel"
            className="text-sm"
          >
            Polipapel
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="compostable" 
            checked={technical.compostable}
            onCheckedChange={(checked) => 
              handleChange('compostable', checked === true)
            }
          />
          <Label 
            htmlFor="compostable"
            className="text-sm"
          >
            Compostable
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TechnicalFilters;
