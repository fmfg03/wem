
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogOut, ShoppingBag, Settings, Heart } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AccountPage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-1/3">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-2">
                    <AvatarFallback className="bg-wem-blue text-white text-xl">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full mb-4"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:w-2/3">
              <Tabs defaultValue="orders">
                <TabsList className="w-full">
                  <TabsTrigger value="orders" className="flex-1">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Mis Pedidos
                  </TabsTrigger>
                  <TabsTrigger value="info" className="flex-1">
                    <User className="mr-2 h-4 w-4" />
                    Información Personal
                  </TabsTrigger>
                  <TabsTrigger value="wishlist" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Favoritos
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mis Pedidos</CardTitle>
                      <CardDescription>
                        Historial y seguimiento de tus pedidos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No tienes pedidos aún</h3>
                        <p className="text-gray-500 mb-4">
                          Cuando realices un pedido, aparecerá aquí
                        </p>
                        <Link to="/productos">
                          <Button>Ver Productos</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="info">
                  <Card>
                    <CardHeader>
                      <CardTitle>Información Personal</CardTitle>
                      <CardDescription>
                        Administra tus datos personales y direcciones
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-sm text-gray-500">Nombre</h3>
                          <p>{user.name}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-gray-500">Correo Electrónico</h3>
                          <p>{user.email}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-gray-500">Miembro desde</h3>
                          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="pt-4">
                          <Button variant="outline" className="w-full">
                            <Settings className="mr-2 h-4 w-4" />
                            Editar Información
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="wishlist">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mis Favoritos</CardTitle>
                      <CardDescription>
                        Productos que has marcado como favoritos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No tienes favoritos aún</h3>
                        <p className="text-gray-500 mb-4">
                          Marca productos como favoritos para acceder rápidamente a ellos
                        </p>
                        <Link to="/productos">
                          <Button>Explorar Productos</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
