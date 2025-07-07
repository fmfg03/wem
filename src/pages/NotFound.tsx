
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine if this is an admin route to offer appropriate navigation
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Página no encontrada</p>
        <p className="text-gray-500 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido eliminada.
        </p>
        <div className="flex flex-col gap-3">
          {isAdminRoute ? (
            <>
              <Button asChild variant="default" className="w-full">
                <Link to="/admin">Volver al Panel de Administración</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Ir al Sitio Principal</Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="default" className="w-full">
              <Link to="/">Volver al Inicio</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
