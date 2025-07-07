
import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { MediaFile } from '@/components/admin/MediaUpload';
import { toast } from 'sonner';
import { 
  fetchMediaFiles,
  deleteMediaFile,
  updateMediaFile,
  testMediaConnection
} from '@/services/media';

// Import the components
import MediaConnectionStatus from '@/components/admin/media/MediaConnectionStatus';
import MediaActions from '@/components/admin/media/MediaActions';
import MediaTabs from '@/components/admin/media/MediaTabs';

const AdminMedia = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'disconnected' | 'unknown'>('unknown');
  const [lastConnectionTest, setLastConnectionTest] = useState<Date | null>(null);
  
  // Load media files from Supabase database
  const loadMediaFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const files = await fetchMediaFiles();
      // Sort files by upload date (newest first)
      setMediaFiles(files.sort((a, b) => 
        new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      ));
      console.log("Loaded media files from database:", files);
    } catch (err) {
      console.error("Error fetching media files:", err);
      toast.error("Error al cargar los archivos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMediaFiles();
    testDatabaseConnection();
  }, [loadMediaFiles]);

  const testDatabaseConnection = async () => {
    setConnectionStatus('testing');
    try {
      console.log("🧪 Testing database connection from AdminMedia...");
      
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

  const handleUploadComplete = (file: MediaFile) => {
    setMediaFiles(prevFiles => {
      // Add new file at the beginning of the array
      const newFiles = [file, ...prevFiles];
      console.log("Updating media files after single upload:", newFiles);
      return newFiles;
    });
    toast.success('Archivo subido correctamente');
  };

  const handleMultipleUploadsComplete = (files: MediaFile[]) => {
    setMediaFiles(prevFiles => {
      // Add new files at the beginning of the array
      const newFiles = [...files, ...prevFiles];
      console.log("Updating media files after multiple uploads:", newFiles);
      return newFiles;
    });
    toast.success(`${files.length} archivos subidos correctamente`);
  };

  const handleDeleteMedia = async (id: string) => {
    try {
      await deleteMediaFile(id);
      
      // Update state
      setMediaFiles(prevFiles => {
        const newFiles = prevFiles.filter(file => file.id !== id);
        console.log("Updating media files after delete:", newFiles);
        return newFiles;
      });
      
      toast.success('Archivo eliminado correctamente');
    } catch (err) {
      console.error("Error deleting file:", err);
      toast.error("Error al eliminar el archivo");
    }
  };
  
  const handleUpdateMedia = async (updatedFile: MediaFile) => {
    try {
      await updateMediaFile(updatedFile);
      
      // Update in local state
      setMediaFiles(prevFiles => {
        const newFiles = prevFiles.map(file => file.id === updatedFile.id ? updatedFile : file);
        console.log("Updating media files after edit:", newFiles);
        return newFiles;
      });
      toast.success('Imagen actualizada correctamente');
    } catch (err) {
      console.error("Error updating file:", err);
      toast.error("Error al actualizar la imagen");
    }
  };

  const handleSyncWithStorage = async () => {
    setIsSyncing(true);
    toast.info('Sincronizando con almacenamiento...');
    try {
      await loadMediaFiles();
      await testDatabaseConnection();
      toast.success('Sincronización completada');
    } catch (error) {
      console.error("Error during sync:", error);
      toast.error("Error durante la sincronización");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <AdminLayout title="Biblioteca de Medios">
      <div className="mb-6 space-y-4">
        <MediaConnectionStatus 
          connectionStatus={connectionStatus}
          lastConnectionTest={lastConnectionTest}
          setConnectionStatus={setConnectionStatus}
          setLastConnectionTest={setLastConnectionTest}
        />
        
        <div className="flex justify-end">
          <MediaActions 
            connectionStatus={connectionStatus}
            isSyncing={isSyncing}
            onSyncWithStorage={handleSyncWithStorage}
            onTestConnection={testDatabaseConnection}
          />
        </div>
      </div>
      
      <MediaTabs 
        mediaFiles={mediaFiles}
        isLoading={isLoading}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        onDeleteMedia={handleDeleteMedia}
        onUpdateMedia={handleUpdateMedia}
        onUploadComplete={handleUploadComplete}
        onMultipleUploadsComplete={handleMultipleUploadsComplete}
        onRefresh={loadMediaFiles}
      />
    </AdminLayout>
  );
};

export default AdminMedia;
