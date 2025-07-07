
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, ShoppingCart, FileText } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import FreightCalculator from "@/components/shipping/FreightCalculator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingTier {
  name: string;
  range: [number, number];
  priceModifier: number;
  action: 'marketplace' | 'checkout' | 'quote';
  actionUrl?: string;
}

interface ProductPricingCalculatorProps {
  productId: string;
  productName: string;
  basePrice: number;
  isCompact?: boolean;
  productWeight?: number; // Weight per unit in kg
}

const ProductPricingCalculator = ({
  productId,
  productName,
  basePrice,
  isCompact = false,
  productWeight = 0.1 // Default weight if not provided
}: ProductPricingCalculatorProps) => {
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
      actionUrl: 'https://www.amazon.com.mx/s?k=WEM+plastic'
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
  const totalPrice = calculatedPrice * quantity;
  
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
        toast.info(`Redirigiendo al marketplace para compras menores a 100 ${unit}`);
        break;
        
      case 'checkout':
        // Add to cart and redirect to checkout
        toast.success("Producto agregado al carrito", {
          description: `${quantity} ${unit} de ${productName}`
        });
        navigate('/carrito');
        break;
        
      case 'quote':
        // Redirect to quote form with prefilled product info
        navigate(`/cotizar?producto=${productId}&cantidad=${quantity}&unidad=${unit}`);
        break;
    }
  };

  if (isCompact) {
    return (
      <div className="p-4 border rounded-lg shadow-sm space-y-3">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Calculadora de Cantidad
        </h3>
        
        <div className="flex items-end gap-2">
          <div className="flex-grow">
            <Label htmlFor="quantity-compact" className="text-xs mb-1 block">Cantidad</Label>
            <Input
              id="quantity-compact"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 text-sm"
            />
          </div>
          
          <div className="w-16">
            <Label htmlFor="unit-compact" className="text-xs mb-1 block">Unidad</Label>
            <select 
              id="unit-compact"
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'kg' | 'piezas')}
              className="w-full h-8 px-2 text-sm rounded-md border border-input"
            >
              <option value="kg">kg</option>
              <option value="piezas">pzas</option>
            </select>
          </div>
        </div>
        
        <FreightCalculator 
          productWeight={productWeight}
          quantity={quantity}
          unit={unit}
          channel={currentTier.action}
          showDetails={false}
        />
        
        <Button 
          onClick={handleProceed} 
          className="w-full text-sm py-1 h-8"
          variant="default"
        >
          {currentTier.action === 'marketplace' && "Comprar en Marketplace"}
          {currentTier.action === 'checkout' && "Agregar al Carrito"}
          {currentTier.action === 'quote' && "Solicitar Cotización"}
        </Button>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Calculadora de Precio por Cantidad
        </CardTitle>
        <CardDescription>
          Ingresa la cantidad que necesitas para obtener el mejor precio o una cotización personalizada.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-4">
          <div className="flex-grow">
            <Label htmlFor="quantity" className="mb-2 block">Cantidad</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full"
            />
          </div>
          
          <div className="w-1/3">
            <Label htmlFor="unit" className="mb-2 block">Unidad</Label>
            <select 
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'kg' | 'piezas')}
              className="w-full h-10 px-3 py-2 rounded-md border border-input"
            >
              <option value="kg">kg</option>
              <option value="piezas">piezas</option>
            </select>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
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
          <div className="flex justify-between text-sm">
            <span>Precio calculado:</span>
            <span>${calculatedPrice.toFixed(2)} MXN / {unit}</span>
          </div>
          <div className="flex justify-between font-bold border-t border-gray-200 pt-2 mt-2">
            <span>Precio total ({quantity} {unit}):</span>
            <span>${totalPrice.toFixed(2)} MXN</span>
          </div>
        </div>
        
        <FreightCalculator
          productWeight={productWeight}
          quantity={quantity}
          unit={unit}
          channel={currentTier.action}
        />
        
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="font-medium mb-1">Información de Compra</h4>
          <p className="text-sm text-blue-700 mb-2">
            <strong>{currentTier.name}</strong>
          </p>
          <ul className="text-sm text-gray-600 space-y-1 mb-3">
            {currentTier.action === 'marketplace' && (
              <li>• Para cantidades entre {currentTier.range[0]} y {currentTier.range[1]} {unit}, te recomendamos comprar a través de nuestro marketplace.</li>
            )}
            {currentTier.action === 'checkout' && (
              <li>• Para cantidades entre {currentTier.range[0]} y {currentTier.range[1]} {unit}, puedes realizar tu compra directamente en nuestra tienda.</li>
            )}
            {currentTier.action === 'quote' && (
              <li>• Para cantidades mayores a {currentTier.range[0]} {unit}, te ofrecemos precios especiales con cotización personalizada.</li>
            )}
          </ul>
          
          <Button 
            onClick={handleProceed} 
            className="w-full flex items-center justify-center gap-2"
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
      </CardContent>
    </Card>
  );
};

export default ProductPricingCalculator;
