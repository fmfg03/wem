
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdminHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <Link to="/admin" className="text-xl font-bold text-wem-green">
                        WEM Admin
                      </Link>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Cerrar</span>
                          </Button>
                        </SheetTrigger>
                      </Sheet>
                    </div>
                  </div>
                  <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                      <li>
                        <Link 
                          to="/admin" 
                          className="block py-2 px-4 rounded-md hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/admin/productos" 
                          className="block py-2 px-4 rounded-md hover:bg-gray-100"
                        >
                          Productos
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/admin/contenido" 
                          className="block py-2 px-4 rounded-md hover:bg-gray-100"
                        >
                          Contenido
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/admin/pedidos" 
                          className="block py-2 px-4 rounded-md hover:bg-gray-100"
                        >
                          Pedidos
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/admin/clientes" 
                          className="block py-2 px-4 rounded-md hover:bg-gray-100"
                        >
                          Clientes
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/admin/ajustes" 
                          className="block py-2 px-4 rounded-md hover:bg-gray-100"
                        >
                          Ajustes
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/admin/analiticas" 
                          className="block py-2 px-4 rounded-md hover:bg-gray-100"
                        >
                          Analíticas
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/admin" className="text-xl font-bold text-wem-green mx-4">
              WEM Admin
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/admin" 
                className="text-gray-600 hover:text-wem-green text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/productos" 
                className="text-gray-600 hover:text-wem-green text-sm font-medium"
              >
                Productos
              </Link>
              <Link 
                to="/admin/contenido" 
                className="text-gray-600 hover:text-wem-green text-sm font-medium"
              >
                Contenido
              </Link>
              <Link 
                to="/admin/pedidos" 
                className="text-gray-600 hover:text-wem-green text-sm font-medium"
              >
                Pedidos
              </Link>
              <Link 
                to="/admin/clientes" 
                className="text-gray-600 hover:text-wem-green text-sm font-medium"
              >
                Clientes
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notificaciones</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Perfil</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Ajustes</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
