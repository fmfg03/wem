
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, ShoppingCart, Home, FileText, Users, Settings, BarChart, Tag, Image } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';
import { 
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const location = useLocation();
  
  const adminMenuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: Home
    },
    {
      title: "Productos",
      path: "/admin/productos",
      icon: Package
    },
    {
      title: "Categorías",
      path: "/admin/categorias",
      icon: Tag
    },
    {
      title: "Pedidos",
      path: "/admin/pedidos",
      icon: ShoppingCart
    },
    {
      title: "Contenido",
      path: "/admin/contenido",
      icon: FileText
    },
    {
      title: "Medios",
      path: "/admin/media",
      icon: Image
    },
    {
      title: "Clientes",
      path: "/admin/clientes",
      icon: Users
    },
    {
      title: "Analíticas",
      path: "/admin/analiticas",
      icon: BarChart
    },
    {
      title: "Ajustes",
      path: "/admin/ajustes",
      icon: Settings
    }
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminHeader />
      <SidebarProvider>
        <div className="flex flex-1 w-full">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminMenuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={isActiveRoute(item.path)}
                          tooltip={item.title}
                        >
                          <Link to={item.path}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          
          <main className="flex-grow p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{title}</h1>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2">
                <Home size={16} />
                Volver al sitio
              </Link>
            </div>
            {children}
          </main>
        </div>
      </SidebarProvider>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
