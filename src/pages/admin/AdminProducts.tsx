import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/admin/columns/productColumns";
import { useProducts, Product } from "@/contexts/ProductContext";
import { Plus, RefreshCw, AlertTriangle, DatabaseIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import ProductFormModal from "@/components/admin/product-form/ProductFormModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { testSupabaseConnection } from "@/services/product/productQueries";

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, refreshProducts, loading, error, isConnectedToDatabase } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'disconnected' | 'unknown'>('unknown');
  const [lastConnectionTest, setLastConnectionTest] = useState<Date | null>(null);

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error("Error cargando productos", {
        description: "Hubo un problema al cargar los productos desde la base de datos"
      });
    }
  }, [error]);

  const testDatabaseConnection = async () => {
    setConnectionStatus('testing');
    try {
      console.log("🧪 Testing database connection from AdminProducts...");
      console.log("🔍 Supabase client info:", {
        url: "Checking Supabase URL...",
        hasApiKey: "Checking API key..."
      });
      
      const isConnected = await testSupabaseConnection();
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      setLastConnectionTest(new Date());
      console.log(`✅ Database connection test result: ${isConnected ? 'Connected' : 'Disconnected'}`);
      
      if (!isConnected) {
        toast.error("Error de conexión a la base de datos", {
          description: "No se pudo conectar con la base de datos. Mostrando datos en caché."
        });
      } else {
        toast.success("Conexión exitosa a la base de datos", {
          description: "La conexión a la base de datos se ha establecido correctamente."
        });
      }
    } catch (err) {
      console.error("❌ Error testing connection:", err);
      console.error("Error details:", err instanceof Error ? err.stack : "Unknown error");
      setConnectionStatus('disconnected');
      setLastConnectionTest(new Date());
      
      toast.error("Error al probar la conexión", {
        description: "Se produjo un error inesperado al probar la conexión con la base de datos."
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(id);
        toast.success("Producto eliminado correctamente");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error al eliminar el producto");
      }
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      console.log("🔄 Manual refresh triggered by user");
      await refreshProducts();
      await testDatabaseConnection();
      toast.success("Productos actualizados correctamente");
    } catch (err) {
      console.error("Error refreshing products:", err);
      toast.error("Error al actualizar productos");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <AdminLayout title="Administración de Productos">
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Administración de Productos</h1>
          <div className="flex gap-3">
            <Button 
              onClick={testDatabaseConnection} 
              variant="outline"
              className="flex items-center gap-2"
              disabled={connectionStatus === 'testing'}
            >
              {connectionStatus === 'connected' || connectionStatus === 'testing' ? 
                <DatabaseIcon size={18} className="text-green-500" /> : 
                <DatabaseIcon size={18} className="text-red-500" />
              }
              <span>Probar Conexión</span>
            </Button>
            <Button 
              onClick={handleRefresh} 
              variant="outline"
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
              <span>{isRefreshing ? "Actualizando..." : "Actualizar"}</span>
            </Button>
            <Button 
              onClick={handleAdd} 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              disabled={!isConnectedToDatabase}
            >
              <Plus size={18} />
              <span>Agregar Producto</span>
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Card className={connectionStatus === 'connected' ? "bg-green-50" : connectionStatus === 'disconnected' ? "bg-red-50" : "bg-yellow-50"}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                {connectionStatus === 'connected' ? (
                  <DatabaseIcon className="h-5 w-5 text-green-500" />
                ) : connectionStatus === 'disconnected' ? (
                  <DatabaseIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                <div>
                  <h3 className="font-medium">
                    {connectionStatus === 'connected' 
                      ? "Conectado a la base de datos" 
                      : connectionStatus === 'disconnected'
                      ? "No hay conexión con la base de datos"
                      : connectionStatus === 'testing'
                      ? "Probando conexión..."
                      : "Estado de conexión desconocido"}
                  </h3>
                  {lastConnectionTest && (
                    <p className="text-sm text-gray-500">
                      Última prueba: {lastConnectionTest.toLocaleTimeString()}
                    </p>
                  )}
                  {connectionStatus === 'disconnected' && (
                    <p className="text-sm text-gray-700 mt-1">
                      Revise la conexión de red y la configuración de Supabase. 
                      Operando en modo offline con datos en caché.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {!isConnectedToDatabase && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Sin conexión a la base de datos</AlertTitle>
            <AlertDescription>
              No hay conexión con la base de datos. Operando en modo offline con datos en caché.
              Algunas funcionalidades pueden no estar disponibles.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Productos ({products.length}) {!isConnectedToDatabase && " - Modo Offline"}</CardTitle>
            <CardDescription>
              {isConnectedToDatabase 
                ? "Datos sincronizados con la base de datos" 
                : "Mostrando datos en caché local"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center">
                <p className="text-gray-500">Cargando productos...</p>
              </div>
            ) : (
              <DataTable 
                columns={columns(handleEdit, handleDelete)} 
                data={products} 
                searchColumn="name"
                searchPlaceholder="Buscar productos..."
              />
            )}
          </CardContent>
        </Card>

        <ProductFormModal
          open={isFormOpen}
          setOpen={setIsFormOpen}
          addProduct={addProduct}
          updateProduct={updateProduct}
          product={editingProduct}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
