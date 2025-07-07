
import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

const WholesaleCalculator = () => {
  const [quantity, setQuantity] = useState<number>(100);
  const [productType, setProductType] = useState<string>("bolsas-basura");
  const [unit, setUnit] = useState<string>("kg");
  const navigate = useNavigate();
  
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to quote form with prefilled data
    navigate(`/cotizar?producto=${productType}&cantidad=${quantity}&unidad=${unit}`);
  };
  
  // Pricing data - in a real app this would come from an API
  const discountTiers = [
    { min: 0, max: 99, discount: 0 },
    { min: 100, max: 499, discount: 10 },
    { min: 500, max: 999, discount: 15 },
    { min: 1000, max: 4999, discount: 20 },
    { min: 5000, max: Infinity, discount: 25 },
  ];
  
  // Calculate current discount tier
  const currentTier = discountTiers.find(
    tier => quantity >= tier.min && quantity <= tier.max
  );
  
  const discountPercentage = currentTier?.discount || 0;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-wem-blue p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">
                <Calculator className="h-7 w-7 mr-3" />
                Calculadora de Descuentos
              </h2>
              <p className="mb-6 opacity-90">
                Calcula tu descuento por volumen instantáneamente y solicita una cotización personalizada.
              </p>
              
              <div className="bg-white/10 p-5 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Niveles de Descuento</h3>
                <div className="space-y-3">
                  {discountTiers.map((tier, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between p-2 rounded ${
                        currentTier === tier ? 'bg-white/20 font-semibold' : ''
                      }`}
                    >
                      <span>
                        {tier.max === Infinity 
                          ? `${tier.min}+ ${unit}` 
                          : `${tier.min} - ${tier.max} ${unit}`}
                      </span>
                      <span className="text-wem-green">{tier.discount}% descuento</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-sm opacity-80">
                <p>* Los descuentos son aproximados y pueden variar según el producto específico y condiciones del mercado.</p>
                <p>* Para pedidos muy grandes, contacta directamente con nuestro equipo de ventas para ofertas especiales.</p>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Calcula tu Cotización</h3>
              <form onSubmit={handleCalculate} className="space-y-5">
                <div>
                  <Label htmlFor="productType">Tipo de Producto</Label>
                  <select
                    id="productType"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="bolsas-basura">Bolsas para Basura</option>
                    <option value="bolsas-plastico">Bolsas de Plástico</option>
                    <option value="polietileno-rollo">Polietileno en Rollo</option>
                    <option value="playo-stretch">Playo y Stretch</option>
                    <option value="material-empaque">Material de Empaque</option>
                  </select>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-grow">
                    <Label htmlFor="quantity">Cantidad</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="w-24">
                    <Label htmlFor="unit">Unidad</Label>
                    <select
                      id="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="kg">kg</option>
                      <option value="piezas">piezas</option>
                      <option value="rollos">rollos</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Cantidad:</span>
                    <span>{quantity} {unit}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Descuento Aproximado:</span>
                    <span className="text-wem-green font-bold">{discountPercentage}%</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Para un precio exacto, solicita una cotización personalizada.
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-wem-green hover:bg-wem-darkgreen flex items-center justify-center gap-2"
                >
                  Solicitar Cotización Personalizada
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleCalculator;
