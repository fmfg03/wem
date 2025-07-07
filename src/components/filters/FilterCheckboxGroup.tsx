
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Updated interface to support both string[] and objects with value/label
interface FilterCheckboxGroupProps {
  options: string[] | { value: string; label: string }[];
  selectedValues: string[];
  filterType?: string;
  onFilterChange?: (type: string, value: string) => void;
  onChange?: (values: string[]) => void;
  title?: string;
}

const FilterCheckboxGroup = ({ 
  options, 
  selectedValues, 
  filterType, 
  onFilterChange,
  onChange,
  title
}: FilterCheckboxGroupProps) => {
  const handleChange = (value: string, checked: boolean) => {
    if (filterType && onFilterChange) {
      onFilterChange(filterType, value);
    } else if (onChange) {
      const newValues = checked 
        ? [...selectedValues, value]
        : selectedValues.filter(v => v !== value);
      onChange(newValues);
    }
  };

  return (
    <div className="space-y-3">
      {title && <h3 className="text-sm font-medium">{title}</h3>}
      <div className="grid grid-cols-2 gap-2">
        {options.map(option => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          
          return (
            <div key={optionValue} className="flex items-center space-x-2 group">
              <Checkbox 
                id={`${filterType || 'option'}-${optionValue}`} 
                checked={selectedValues.includes(optionValue)}
                onCheckedChange={(checked) => {
                  handleChange(optionValue, checked === true);
                }}
                className="data-[state=checked]:bg-primary"
              />
              <Label 
                htmlFor={`${filterType || 'option'}-${optionValue}`}
                className="text-sm cursor-pointer flex items-center justify-between w-full"
              >
                {optionLabel}
                {selectedValues.includes(optionValue) && (
                  <Badge variant="outline" className="ml-1 text-xs h-4 px-1">
                    ✓
                  </Badge>
                )}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterCheckboxGroup;
