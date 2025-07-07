
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { useQuery } from '@tanstack/react-query';
import { fetchAllClients } from '@/services/client/clientQueries';

const AdminClients = () => {
  const { data: clients, isLoading, error, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchAllClients
  });

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => {
        const id = row.getValue('id');
        return <span className="text-xs text-gray-500">{id.substring(0, 8)}...</span>;
      }
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono'
    },
    {
      accessorKey: 'type',
      header: 'Tipo'
    },
    {
      accessorKey: 'last_order_date',
      header: 'Último Pedido',
      cell: ({ row }) => {
        const date = row.getValue('last_order_date');
        if (!date) return <span className="text-gray-400">Sin pedidos</span>;
        return new Date(date).toLocaleDateString('es-MX');
      }
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const client = row.original;
        return (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" title="Ver detalles">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Editar">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Eliminar">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        );
      }
    }
  ];

  if (isLoading) {
    return (
      <AdminLayout title="Clientes">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Cargando clientes...</span>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Clientes">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="text-red-500">
              Error al cargar los clientes. Por favor, inténtelo de nuevo.
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Clientes">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Listado de Clientes</h2>
            <Button className="flex gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Cliente
            </Button>
          </div>
          
          <DataTable 
            columns={columns} 
            data={clients || []} 
            searchColumn="name"
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminClients;
