
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck } from "lucide-react";

interface FreightCalculatorProps {
  productWeight: number; // Weight per unit in kg
  quantity: number;
  unit: 'kg' | 'piezas';
  channel: 'marketplace' | 'checkout' | 'quote';
  destination?: string;
  showDetails?: boolean;
}

interface ShippingZone {
  id: string;
  name: string;
  states: string[];
  baseCost: number;
  costPerKg: number;
}

// Simplified shipping zones for Mexico
const shippingZones: ShippingZone[] = [
  {
    id: 'cdmx-metro',
    name: 'CDMX y Área Metropolitana',
    states: ['Ciudad de México', 'Estado de México'],
    baseCost: 150,
    costPerKg: 2.5
  },
  {
    id: 'centro',
    name: 'Centro',
    states: ['Querétaro', 'Hidalgo', 'Puebla', 'Tlaxcala', 'Morelos'],
    baseCost: 250,
    costPerKg: 3.5
  },
  {
    id: 'norte',
    name: 'Norte',
    states: ['Nuevo León', 'Coahuila', 'Tamaulipas', 'Chihuahua', 'Durango', 'Zacatecas', 'San Luis Potosí'],
    baseCost: 350,
    costPerKg: 4.5
  },
  {
    id: 'sur',
    name: 'Sur y Sureste',
    states: ['Guerrero', 'Oaxaca', 'Chiapas', 'Tabasco', 'Veracruz', 'Campeche', 'Yucatán', 'Quintana Roo'],
    baseCost: 400,
    costPerKg: 5
  },
  {
    id: 'occidente',
    name: 'Occidente',
    states: ['Jalisco', 'Colima', 'Michoacán', 'Guanajuato', 'Aguascalientes', 'Nayarit'],
    baseCost: 300,
    costPerKg: 4
  },
  {
    id: 'noroeste',
    name: 'Noroeste',
    states: ['Baja California', 'Baja California Sur', 'Sonora', 'Sinaloa'],
    baseCost: 450,
    costPerKg: 6
  }
];

const FreightCalculator = ({
  productWeight,
  quantity,
  unit,
  channel,
  destination = '',
  showDetails = true
}: FreightCalculatorProps) => {
  const [selectedZone, setSelectedZone] = useState<string>('cdmx-metro');
  const [shippingCost, setShippingCost] = useState<number>(0);

  // Calculate total weight based on quantity and unit
  const calculateTotalWeight = (): number => {
    if (unit === 'kg') {
      return quantity;
    } else {
      // If unit is 'piezas', calculate weight based on product weight per unit
      return quantity * productWeight;
    }
  };

  // Calculate shipping cost
  useEffect(() => {
    // If marketplace, shipping is included in price
    if (channel === 'marketplace') {
      setShippingCost(0);
      return;
    }

    // For quote requests above certain quantity, shipping may be negotiated
    if (channel === 'quote') {
      const totalWeight = calculateTotalWeight();
      if (totalWeight > 500) {
        setShippingCost(0); // Will be calculated in custom quote
        return;
      }
    }

    // Calculate shipping for direct channels
    const zone = shippingZones.find(z => z.id === selectedZone);
    if (zone) {
      const totalWeight = calculateTotalWeight();
      const weightCost = totalWeight * zone.costPerKg;
      
      // Apply base cost and potential discounts for larger volumes
      let calculatedCost = zone.baseCost + weightCost;
      
      // Volume discounts
      if (totalWeight > 100 && totalWeight <= 300) {
        calculatedCost *= 0.9; // 10% discount
      } else if (totalWeight > 300) {
        calculatedCost *= 0.75; // 25% discount
      }

      setShippingCost(Math.round(calculatedCost));
    }
  }, [selectedZone, quantity, unit, channel, productWeight]);

  // If marketplace channel or it's a quote request with large quantity
  if (channel === 'marketplace' || (channel === 'quote' && calculateTotalWeight() > 500)) {
    return (
      <div className="mt-3 text-sm text-gray-600">
        {channel === 'marketplace' ? (
          <p className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Envío incluido en el precio de Marketplace
          </p>
        ) : (
          <p className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Envío a cotizar (incluido en la solicitud de cotización)
          </p>
        )}
      </div>
    );
  }

  return (
    <Card className={showDetails ? "mt-4" : "mt-3 border-0 shadow-none p-0"}>
      {showDetails && (
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Costo de Envío
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className={showDetails ? "" : "p-0"}>
        <div className="space-y-3">
          <div>
            <Label htmlFor="shipping-zone" className={`${showDetails ? 'mb-2' : 'mb-1 text-sm'} block`}>
              Destino
            </Label>
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger id="shipping-zone" className={showDetails ? "" : "h-8 text-sm"}>
                <SelectValue placeholder="Selecciona zona" />
              </SelectTrigger>
              <SelectContent>
                {shippingZones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className={`${showDetails ? 'bg-gray-50 rounded-md p-3' : 'text-sm mt-2'}`}>
            {showDetails ? (
              <>
                <div className="flex justify-between text-sm">
                  <span>Peso total:</span>
                  <span>{calculateTotalWeight().toFixed(2)} kg</span>
                </div>
                <div className="flex justify-between font-medium pt-2 mt-2 border-t border-gray-200">
                  <span>Costo de envío:</span>
                  <span>${shippingCost.toFixed(2)} MXN</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span>Costo de envío:</span>
                <span className="font-medium">${shippingCost.toFixed(2)} MXN</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreightCalculator;
