
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { getOrdersByUserId } from '@/data/orders';
import { Order } from '@/types/order';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Package, ArrowRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'processing':
      return <Package className="h-4 w-4 text-blue-500" />;
    case 'shipped':
      return <Truck className="h-4 w-4 text-purple-500" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>;
    case 'processing':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En Proceso</Badge>;
    case 'shipped':
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Enviado</Badge>;
    case 'delivered':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Entregado</Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelado</Badge>;
    default:
      return <Badge variant="outline">Desconocido</Badge>;
  }
};

const Orders = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch orders
    if (user) {
      const userOrders = getOrdersByUserId(user.id);
      setOrders(userOrders);
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center">
              <ShoppingBag className="mr-2 h-6 w-6" />
              Mis Pedidos
            </h1>
            <Link to="/cuenta">
              <Button variant="outline">Volver a mi cuenta</Button>
            </Link>
          </div>

          {orders.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Historial de Pedidos</CardTitle>
                <CardDescription>
                  Consulta y da seguimiento a tus compras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pedido</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            {getStatusBadge(order.status)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link to={`/pedidos/${order.id}`}>
                            <Button variant="ghost" size="sm">
                              Ver detalles
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-medium mb-2">No tienes pedidos aún</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Cuando realices un pedido, podrás ver su estado y detalles aquí
                </p>
                <Link to="/productos">
                  <Button className="bg-wem-blue hover:bg-wem-darkblue">
                    Explorar Productos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
