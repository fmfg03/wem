
import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Eye, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllOrders, OrderStatus } from '@/data/orders';
import { Order } from '@/types/order';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Badge
} from "@/components/ui/badge";

const statusColors: Record<OrderStatus, { bg: string, text: string, icon: React.ReactNode }> = {
  'pending': { 
    bg: 'bg-yellow-100', 
    text: 'text-yellow-800',
    icon: <Clock className="h-3 w-3" />
  },
  'processing': { 
    bg: 'bg-blue-100', 
    text: 'text-blue-800',
    icon: <Clock className="h-3 w-3" />
  },
  'shipped': { 
    bg: 'bg-purple-100', 
    text: 'text-purple-800',
    icon: <Truck className="h-3 w-3" />
  },
  'delivered': { 
    bg: 'bg-green-100', 
    text: 'text-green-800',
    icon: <CheckCircle className="h-3 w-3" />
  },
  'cancelled': { 
    bg: 'bg-red-100', 
    text: 'text-red-800',
    icon: <XCircle className="h-3 w-3" />
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  
  // Get all orders
  const orders = getAllOrders();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter orders by search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customerEmail && order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <AdminLayout title="Gestión de Pedidos">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center border-b gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Buscar por ID o email..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="w-full md:w-48">
              <Select 
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="processing">Procesando</SelectItem>
                  <SelectItem value="shipped">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
              <Filter className="h-4 w-4" />
              Más Filtros
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Fecha
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{order.customerEmail || "Usuario anónimo"}</TableCell>
                    <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${statusColors[order.status].bg} ${statusColors[order.status].text} flex w-fit items-center gap-1`}
                      >
                        {statusColors[order.status].icon}
                        {order.status === 'pending' ? 'Pendiente' :
                         order.status === 'processing' ? 'Procesando' :
                         order.status === 'shipped' ? 'Enviado' :
                         order.status === 'delivered' ? 'Entregado' : 'Cancelado'}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.items.length}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/pedidos/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No se encontraron pedidos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Mostrando {filteredOrders.length} de {orders.length} pedidos
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm">Siguiente</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
