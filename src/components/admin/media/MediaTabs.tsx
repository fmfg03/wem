
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MediaLibrary from '@/components/admin/MediaLibrary';
import MediaUpload, { MediaFile } from '@/components/admin/MediaUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react';

interface MediaTabsProps {
  mediaFiles: MediaFile[];
  isLoading: boolean;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  onDeleteMedia: (id: string) => Promise<void>;
  onUpdateMedia: (updatedFile: MediaFile) => Promise<void>;
  onUploadComplete: (file: MediaFile) => void;
  onMultipleUploadsComplete: (files: MediaFile[]) => void;
  onRefresh?: () => Promise<void>;
}

const MediaTabs: React.FC<MediaTabsProps> = ({
  mediaFiles,
  isLoading,
  isUploading,
  setIsUploading,
  onDeleteMedia,
  onUpdateMedia,
  onUploadComplete,
  onMultipleUploadsComplete,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('library');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Reset search when tabbing
  useEffect(() => {
    setSearchTerm('');
  }, [activeTab]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleRefresh = async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
  };
  
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="library">Biblioteca</TabsTrigger>
          <TabsTrigger value="upload">Subir Nuevo</TabsTrigger>
        </TabsList>
        
        {activeTab === 'library' && onRefresh && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Actualizando...' : 'Actualizar'}</span>
          </Button>
        )}
      </div>
      
      <TabsContent value="library">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Buscar archivos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p>Cargando archivos...</p>
          </div>
        ) : (
          <MediaLibrary 
            mediaFiles={mediaFiles} 
            onDeleteMedia={onDeleteMedia}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onUpdateMedia={onUpdateMedia}
          />
        )}
      </TabsContent>
      
      <TabsContent value="upload">
        <div className="max-w-2xl mx-auto">
          <MediaUpload 
            onUploadComplete={onUploadComplete}
            onMultipleUploadsComplete={onMultipleUploadsComplete}
            setIsUploading={setIsUploading}
            isUploading={isUploading}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MediaTabs;
