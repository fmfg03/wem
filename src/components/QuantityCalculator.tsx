
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, ShoppingCart, FileText } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import FreightCalculator from './shipping/FreightCalculator';

interface QuantityCalculatorProps {
  productId: string;
  productName: string;
  basePrice?: number;
  productWeight?: number;
  isCompact?: boolean;
  onClose?: () => void;
}

interface PricingTier {
  name: string;
  range: [number, number];
  priceModifier: number;
  action: 'marketplace' | 'checkout' | 'quote';
  actionUrl?: string;
}

const QuantityCalculator = ({ 
  productId, 
  productName, 
  basePrice = 0,
  productWeight = 0.1, 
  isCompact = false,
  onClose
}: QuantityCalculatorProps) => {
  const [quantity, setQuantity] = useState<number>(50);
  const [unit, setUnit] = useState<'kg' | 'piezas'>('kg');
  const navigate = useNavigate();
  
  // Pricing tiers configuration
  const pricingTiers: PricingTier[] = [
    { 
      name: 'Pequeña cantidad', 
      range: [0, 100], 
      priceModifier: 1.3, // 30% markup for small quantities
      action: 'marketplace',
      actionUrl: 'https://www.mercadolibre.com.mx/vendedor/wemplastic'
    },
    { 
      name: 'Cantidad media', 
      range: [101, 300], 
      priceModifier: 1.1, // 10% markup for medium quantities
      action: 'checkout'
    },
    { 
      name: 'Mayoreo', 
      range: [301, Infinity], 
      priceModifier: 1, // Base price for large quantities
      action: 'quote'
    }
  ];
  
  // Get the current tier based on quantity
  const getCurrentTier = (): PricingTier => {
    return pricingTiers.find(tier => 
      quantity >= tier.range[0] && quantity <= tier.range[1]
    ) || pricingTiers[0];
  };
  
  const currentTier = getCurrentTier();
  const calculatedPrice = basePrice * currentTier.priceModifier;
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) ? 0 : value);
  };
  
  const handleProceed = () => {
    const tier = getCurrentTier();
    
    switch(tier.action) {
      case 'marketplace':
        // Open marketplace in new tab
        window.open(tier.actionUrl, '_blank');
        break;
        
      case 'checkout':
        // Add to cart and redirect to checkout
        toast.success("Producto agregado al carrito", {
          description: `${quantity} ${unit} de ${productName}`
        });
        // This would typically add to cart via context/state management
        // For now just show a toast
        break;
        
      case 'quote':
        // Redirect to quote form with prefilled product info
        navigate(`/cotizar?producto=${productId}&cantidad=${quantity}&unidad=${unit}`);
        break;
    }
    
    if (onClose) onClose();
  };
  
  return (
    <div className={`quantity-calculator ${isCompact ? 'p-4' : 'p-6 border rounded-lg shadow-sm'}`}>
      <div className={`${isCompact ? '' : 'mb-4'}`}>
        <h3 className={`font-bold ${isCompact ? 'text-sm mb-2' : 'text-lg mb-3'} flex items-center gap-2`}>
          <Calculator className="h-4 w-4" />
          Calculadora de Cantidad
        </h3>
        
        {!isCompact && (
          <p className="text-sm text-gray-600 mb-4">
            Ingresa la cantidad que necesitas para obtener el mejor precio o una cotización personalizada.
          </p>
        )}
      </div>
      
      <div className="flex items-end gap-3 mb-4">
        <div className="flex-grow">
          <Label htmlFor="quantity" className="text-sm mb-1 block">Cantidad</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full"
          />
        </div>
        
        <div className="w-24">
          <Label htmlFor="unit" className="text-sm mb-1 block">Unidad</Label>
          <select 
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'kg' | 'piezas')}
            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="kg">kg</option>
            <option value="piezas">piezas</option>
          </select>
        </div>
      </div>
      
      {basePrice > 0 && !isCompact && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between text-sm">
            <span>Precio base:</span>
            <span>${basePrice.toFixed(2)} MXN / {unit}</span>
          </div>
          {currentTier.priceModifier !== 1 && (
            <div className="flex justify-between text-sm">
              <span>Modificador de precio:</span>
              <span>x{currentTier.priceModifier}</span>
            </div>
          )}
          <div className="flex justify-between font-bold mt-1 pt-1 border-t border-gray-200">
            <span>Precio calculado:</span>
            <span>${calculatedPrice.toFixed(2)} MXN / {unit}</span>
          </div>
        </div>
      )}
      
      {!isCompact && (
        <FreightCalculator
          productWeight={productWeight}
          quantity={quantity}
          unit={unit}
          channel={currentTier.action}
        />
      )}
      
      <div className={`${isCompact ? 'mt-3' : 'mt-4'}`}>
        <div className="bg-blue-50 p-3 rounded-md mb-3">
          <p className="text-sm text-blue-700">
            <strong>{currentTier.name}:</strong> {' '}
            {currentTier.action === 'marketplace' && 'Compra a través de nuestro marketplace'}
            {currentTier.action === 'checkout' && 'Compra directa en nuestra tienda'}
            {currentTier.action === 'quote' && 'Solicita una cotización personalizada'}
          </p>
        </div>
        
        <Button 
          onClick={handleProceed} 
          className={`${isCompact ? 'w-full text-sm py-1 h-8' : 'w-full'} bg-wem-blue hover:bg-wem-darkblue flex items-center gap-2`}
        >
          {currentTier.action === 'marketplace' && (
            <>Comprar en Marketplace <ShoppingCart className="h-4 w-4" /></>
          )}
          {currentTier.action === 'checkout' && (
            <>Agregar al Carrito <ShoppingCart className="h-4 w-4" /></>
          )}
          {currentTier.action === 'quote' && (
            <>Solicitar Cotización <FileText className="h-4 w-4" /></>
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuantityCalculator;
