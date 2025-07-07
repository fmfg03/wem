
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShoppingCart, ArrowLeft, Trash2, LogIn, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CartItem from '@/components/cart/CartItem';
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';
import { createOrder } from '@/data/orders';
import { Order } from '@/types/order';

const Cart = () => {
  const { items, clearCart, subtotal, tax, total, itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      toast.info("Inicia sesión para continuar con tu compra", {
        action: {
          label: "Iniciar sesión",
          onClick: () => navigate('/login')
        },
      });
      return;
    }
    
    if (items.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Prepare order data
      const orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
        userId: user.id,
        items: items.map(item => ({
          id: `item_${Date.now()}_${item.id}`,
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl || item.image // Use imageUrl if available, otherwise fall back to image
        })),
        status: 'pending',
        totalAmount: total,
        shippingAddress: {
          // In a real app, this would come from user input or saved addresses
          street: 'Av. Principal 123',
          city: 'Ciudad de México',
          state: 'CDMX',
          zipCode: '04500',
          country: 'México',
        },
        paymentMethod: 'Tarjeta de crédito',
        customerEmail: user.email
      };
      
      // In a real app, this would be an API call
      const newOrder = createOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Show success message
      toast.success("¡Pedido realizado con éxito! Recibirás un correo de confirmación.", {
        duration: 5000
      });
      
      // Navigate to order detail
      navigate(`/pedidos/${newOrder.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error("Error al procesar el pedido. Inténtalo de nuevo.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <ShoppingCart className="h-8 w-8" />
            Carrito de Compras
          </h1>
          
          {items.length > 0 ? (
            <div className="space-y-6">
              <div className="bg-white shadow-sm rounded-lg p-6">
                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                
                {/* Cart Actions */}
                <div className="flex justify-between items-center mt-6">
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={clearCart}
                    disabled={isProcessing}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Vaciar Carrito
                  </Button>
                  
                  <Link to="/">
                    <Button variant="ghost" className="flex items-center gap-2" disabled={isProcessing}>
                      <ArrowLeft className="h-4 w-4" />
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Resumen del Pedido</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'producto' : 'productos'}):</span>
                    <span>${subtotal.toFixed(2)} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (16%):</span>
                    <span>${tax.toFixed(2)} MXN</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between text-xl font-semibold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)} MXN</span>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
                  <Link to="/cotizar" className="w-full sm:w-auto">
                    <Button 
                      variant="outline"
                      className="border-wem-blue text-wem-blue hover:bg-wem-lightblue w-full"
                      disabled={isProcessing}
                    >
                      Solicitar Cotización
                    </Button>
                  </Link>
                  <Button 
                    className="bg-wem-green hover:bg-wem-darkgreen w-full sm:w-auto"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : isAuthenticated ? (
                      "Proceder al Pago"
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Iniciar Sesión para Comprar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-medium mb-2">Tu carrito está vacío</h2>
              <p className="text-gray-600 mb-6">
                Agrega productos a tu carrito para continuar con tu compra
              </p>
              <Link to="/">
                <Button className="bg-wem-green hover:bg-wem-darkgreen flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
