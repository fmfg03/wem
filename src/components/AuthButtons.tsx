
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AuthButtons = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-wem-blue text-white text-xs">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/cuenta" className="w-full cursor-pointer">Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/pedidos" className="w-full cursor-pointer">Mis Pedidos</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 hover:text-red-600">
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link to="/login">
      <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 sm:p-2">
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">Ingresar</span>
      </Button>
    </Link>
  );
};

export default AuthButtons;
