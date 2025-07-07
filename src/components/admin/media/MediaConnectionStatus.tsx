
import React from 'react';
import { DatabaseIcon, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { testMediaConnection } from '@/services/media/mediaQueries';

interface MediaConnectionStatusProps {
  connectionStatus: 'testing' | 'connected' | 'disconnected' | 'unknown';
  lastConnectionTest: Date | null;
  setConnectionStatus: (status: 'testing' | 'connected' | 'disconnected' | 'unknown') => void;
  setLastConnectionTest: (date: Date) => void;
}

const MediaConnectionStatus: React.FC<MediaConnectionStatusProps> = ({
  connectionStatus,
  lastConnectionTest,
  setConnectionStatus,
  setLastConnectionTest
}) => {
  const testDatabaseConnection = async () => {
    setConnectionStatus('testing');
    try {
      console.log("🧪 Testing database connection from MediaConnectionStatus...");
      
      const isConnected = await testMediaConnection();
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      setLastConnectionTest(new Date());
      
      if (!isConnected) {
        toast.error("Error de conexión a la base de datos", {
          description: "No se pudo conectar con la base de datos de medios. Mostrando datos en caché."
        });
      } else {
        toast.success("Conexión exitosa a la base de datos", {
          description: "La conexión a la base de datos de medios se ha establecido correctamente."
        });
      }
    } catch (err) {
      console.error("❌ Error testing connection:", err);
      setConnectionStatus('disconnected');
      setLastConnectionTest(new Date());
      
      toast.error("Error al probar la conexión", {
        description: "Se produjo un error inesperado al probar la conexión con la base de datos."
      });
    }
  };

  return (
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
                  ? "Conectado a la base de datos de medios" 
                  : connectionStatus === 'disconnected'
                  ? "No hay conexión con la base de datos de medios"
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
                  Revise la conexión de red y la configuración de Supabase para la tabla media_files. 
                  Operando en modo offline con datos en caché.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaConnectionStatus;
