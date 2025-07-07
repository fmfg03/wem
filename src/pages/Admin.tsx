
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  FileText, 
  Settings, 
  Users, 
  ShoppingCart, 
  BarChart,
  Tag,
  DollarSign,
  Image
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { getAllOrders } from '@/data/orders';
import { useProducts } from '@/contexts/ProductContext';

const Admin = () => {
  const { products } = useProducts();
  const orders = getAllOrders();
  
  // Calculate summary stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalRevenue = orders
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  
  const adminModules = [
    {
      title: "Productos",
      description: "Gestionar catálogo de productos",
      icon: <Package className="h-8 w-8 text-wem-green" />,
      link: "/admin/productos"
    },
    {
      title: "Categorías",
      description: "Gestionar categorías de productos",
      icon: <Tag className="h-8 w-8 text-wem-green" />,
      link: "/admin/categorias"
    },
    {
      title: "Contenido",
      description: "Gestionar páginas y blog",
      icon: <FileText className="h-8 w-8 text-wem-green" />,
      link: "/admin/contenido"
    },
    {
      title: "Medios",
      description: "Gestionar imágenes y archivos",
      icon: <Image className="h-8 w-8 text-wem-green" />,
      link: "/admin/media"
    },
    {
      title: "Pedidos",
      description: "Ver y gestionar pedidos",
      icon: <ShoppingCart className="h-8 w-8 text-wem-green" />,
      link: "/admin/pedidos"
    },
    {
      title: "Clientes",
      description: "Administrar usuarios y clientes",
      icon: <Users className="h-8 w-8 text-wem-green" />,
      link: "/admin/clientes"
    },
    {
      title: "Ajustes",
      description: "Configuración del sitio",
      icon: <Settings className="h-8 w-8 text-wem-green" />,
      link: "/admin/ajustes"
    },
    {
      title: "Analíticas",
      description: "Estadísticas y reportes",
      icon: <BarChart className="h-8 w-8 text-wem-green" />,
      link: "/admin/analiticas"
    }
  ];

  return (
    <AdminLayout title="Panel de Administración">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-wem-green/10 border-wem-green/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-wem-green">Total de Productos</p>
                <h3 className="text-3xl font-bold mt-1">{totalProducts}</h3>
              </div>
              <div className="rounded-full bg-wem-green/20 p-3">
                <Package className="h-6 w-6 text-wem-green" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total de Pedidos</p>
                <h3 className="text-3xl font-bold mt-1">{totalOrders}</h3>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Pedidos Pendientes</p>
                <h3 className="text-3xl font-bold mt-1">{pendingOrders}</h3>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <ShoppingCart className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Ingresos Totales</p>
                <h3 className="text-3xl font-bold mt-1">${totalRevenue.toFixed(2)}</h3>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Admin Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map((module, index) => (
          <Link to={module.link} key={index}>
            <Card className="h-full transition-transform hover:scale-105 hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-2">
                  {module.icon}
                  <div>
                    <h3 className="text-xl font-medium">{module.title}</h3>
                    <p className="text-gray-500 text-sm">{module.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Admin;
