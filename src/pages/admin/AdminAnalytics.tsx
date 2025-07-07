
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for analytics
const salesData = [
  { month: 'Ene', ventas: 12000, pedidos: 45 },
  { month: 'Feb', ventas: 19000, pedidos: 60 },
  { month: 'Mar', ventas: 15000, pedidos: 53 },
  { month: 'Abr', ventas: 21000, pedidos: 72 },
  { month: 'May', ventas: 18000, pedidos: 65 },
  { month: 'Jun', ventas: 24000, pedidos: 80 },
];

const trafficData = [
  { day: 'Lun', visitas: 420, conversiones: 15 },
  { day: 'Mar', visitas: 380, conversiones: 12 },
  { day: 'Mié', visitas: 450, conversiones: 18 },
  { day: 'Jue', visitas: 520, conversiones: 22 },
  { day: 'Vie', visitas: 580, conversiones: 25 },
  { day: 'Sáb', visitas: 620, conversiones: 28 },
  { day: 'Dom', visitas: 350, conversiones: 10 },
];

const productData = [
  { name: 'Bolsas Bio 20x30', ventas: 2540 },
  { name: 'Bolsas Zip 10x15', ventas: 1980 },
  { name: 'Bolsas LDPE 30x40', ventas: 1750 },
  { name: 'Películas Stretch', ventas: 1430 },
  { name: 'Bolsas Boutique', ventas: 1280 },
];

const AdminAnalytics = () => {
  return (
    <AdminLayout title="Analíticas">
      <Tabs defaultValue="ventas" className="w-full mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="ventas">Ventas</TabsTrigger>
          <TabsTrigger value="trafico">Tráfico</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ventas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ventas mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Ventas']} />
                  <Legend />
                  <Bar dataKey="ventas" name="Ventas (MXN)" fill="#1976D2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pedidos vs. Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="ventas" name="Ventas (MXN)" stroke="#1976D2" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="pedidos" name="Pedidos" stroke="#34A853" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trafico" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visitas diarias</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={trafficData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visitas" name="Visitas" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tasa de Conversión</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={trafficData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="visitas" name="Visitas" stroke="#6366F1" />
                  <Line yAxisId="right" type="monotone" dataKey="conversiones" name="Conversiones" stroke="#EC4899" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="productos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Productos más vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={productData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ventas" name="Unidades vendidas" fill="#34A853" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminAnalytics;
