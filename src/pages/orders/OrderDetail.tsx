
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  MapPin, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle,
  FileText,
  Mail,
  AlertCircle
} from 'lucide-react';
import { getOrderById, updateOrderStatus } from '@/data/orders';
import { Order, OrderStatus, OrderNotification } from '@/types/order';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const getStatusDetails = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return {
        icon: <Clock className="h-5 w-5 text-yellow-500" />,
        badge: <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>,
        text: 'Tu pedido está pendiente de procesamiento'
      };
    case 'processing':
      return {
        icon: <Package className="h-5 w-5 text-blue-500" />,
        badge: <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En Proceso</Badge>,
        text: 'Tu pedido está siendo preparado'
      };
    case 'shipped':
      return {
        icon: <Truck className="h-5 w-5 text-purple-500" />,
        badge: <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Enviado</Badge>,
        text: 'Tu pedido está en camino'
      };
    case 'delivered':
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        badge: <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Entregado</Badge>,
        text: 'Tu pedido ha sido entregado'
      };
    case 'cancelled':
      return {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        badge: <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelado</Badge>,
        text: 'Este pedido ha sido cancelado'
      };
  }
};

const getNotificationStatusBadge = (status: 'sent' | 'failed' | 'pending') => {
  switch (status) {
    case 'sent':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Enviado</Badge>;
    case 'failed':
      return <Badge variant="destructive">Fallido</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pendiente</Badge>;
  }
};

const getNotificationTypeLabel = (type: string) => {
  switch (type) {
    case 'order_confirmation':
      return 'Confirmación de pedido';
    case 'shipment_update':
      return 'Actualización de envío';
    case 'delivery_confirmation':
      return 'Confirmación de entrega';
    case 'order_cancelled':
      return 'Cancelación de pedido';
    default:
      return 'Notificación';
  }
};

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch order details
    if (orderId) {
      const orderData = getOrderById(orderId);
      if (orderData) {
        // Check if the order belongs to the logged-in user
        if (user && orderData.userId === user.id) {
          setOrder(orderData);
        } else {
          // If order doesn't belong to user, redirect
          navigate('/pedidos');
        }
      } else {
        // If order not found, redirect
        navigate('/pedidos');
      }
    }
    setLoading(false);
  }, [orderId, isAuthenticated, user, navigate]);

  const handleStatusUpdate = (newStatus: OrderStatus) => {
    if (!order || !orderId) return;
    
    setUpdatingStatus(true);
    
    // In a real app, this would be an API call
    const updatedOrder = updateOrderStatus(orderId, newStatus);
    
    if (updatedOrder) {
      setOrder(updatedOrder);
      toast.success(`Estado del pedido actualizado a: ${getStatusDetails(newStatus).badge}`);
    } else {
      toast.error('Error al actualizar el estado del pedido');
    }
    
    setUpdatingStatus(false);
  };

  if (loading || !order) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  const statusDetails = getStatusDetails(order.status);
  const notifications = order.notifications || [];
  
  // Admin would typically determine this, we'll just simulate
  const canChangeStatus = user?.role === 'admin' || user?.email === 'admin@wem.com.mx';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/pedidos" className="text-wem-blue hover:underline flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Volver a mis pedidos
            </Link>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Imprimir Detalle
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    Pedido {order.id}
                    {statusDetails.badge}
                  </CardTitle>
                  <CardDescription>
                    Realizado el {new Date(order.createdAt).toLocaleDateString()} a las {new Date(order.createdAt).toLocaleTimeString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                  {statusDetails.icon}
                  <span>{statusDetails.text}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {order.trackingNumber && (
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <div className="flex items-center gap-2 font-medium text-blue-700">
                    <Truck className="h-5 w-5" />
                    Número de seguimiento: {order.trackingNumber}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    Dirección de Envío
                  </h3>
                  <div className="text-gray-600">
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    Método de Pago
                  </h3>
                  <p className="text-gray-600">{order.paymentMethod}</p>
                </div>
              </div>

              <h3 className="font-medium mb-4">Productos</h3>
              <div className="rounded-md border overflow-hidden">
                <div className="space-y-4 divide-y">
                  {order.items.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          {item.imageUrl ? (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gray-200">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="text-sm text-gray-500">
                            Cantidad: {item.quantity}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                          <div className="text-sm text-gray-500">${item.price.toFixed(2)} / unidad</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío:</span>
                  <span>Gratis</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span>${order.totalAmount.toFixed(2)} MXN</span>
                </div>
              </div>
              
              {/* Notifications section */}
              {notifications.length > 0 && (
                <div className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="notifications">
                      <AccordionTrigger className="flex items-center">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>Notificaciones enviadas ({notifications.length})</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 mt-2">
                          {notifications.map((notification: OrderNotification) => (
                            <div key={notification.id} className="border rounded-md p-3 bg-gray-50">
                              <div className="flex justify-between mb-1">
                                <div className="font-medium flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-gray-500" />
                                  {getNotificationTypeLabel(notification.type)}
                                </div>
                                {getNotificationStatusBadge(notification.status)}
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>Enviado: {new Date(notification.sentAt).toLocaleString()}</p>
                                <p>Destinatario: {notification.emailTo}</p>
                                <p>Asunto: {notification.subject}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
              
              {/* Status update section (admin only) */}
              {canChangeStatus && (
                <div className="mt-6 p-4 border rounded-md bg-gray-50">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Actualizar Estado del Pedido
                  </h3>
                  <div className="flex gap-4 items-center">
                    <Select
                      onValueChange={(value) => handleStatusUpdate(value as OrderStatus)}
                      defaultValue={order.status}
                      disabled={updatingStatus}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="processing">En Proceso</SelectItem>
                        <SelectItem value="shipped">Enviado</SelectItem>
                        <SelectItem value="delivered">Entregado</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500">
                      Esto enviará una notificación automática al cliente
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="/pedidos">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a mis pedidos
              </Button>
            </Link>
            <Button variant="default" className="bg-wem-blue hover:bg-wem-darkblue">
              Solicitar Ayuda
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetail;
