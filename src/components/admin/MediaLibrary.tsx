
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MediaFile } from './MediaUpload';
import ImageEditModal from './ImageEditModal';
import MediaGrid from './media/MediaGrid';

interface MediaLibraryProps {
  mediaFiles: MediaFile[];
  onDeleteMedia: (id: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onUpdateMedia?: (updatedFile: MediaFile) => void;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  mediaFiles,
  onDeleteMedia,
  searchTerm,
  onSearchChange,
  onUpdateMedia
}) => {
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Handle view image in new tab
  const handleViewImage = (url: string) => {
    window.open(url, '_blank');
  };

  // Handle download image
  const handleDownloadImage = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle edit image
  const handleEditImage = (id: string) => {
    const fileToEdit = mediaFiles.find(file => file.id === id);
    if (fileToEdit) {
      setSelectedFile(fileToEdit);
      setIsEditModalOpen(true);
    }
  };

  // Handle saving edited image
  const handleSaveEditedImage = (updatedFile: MediaFile) => {
    if (onUpdateMedia) {
      onUpdateMedia(updatedFile);
    }
  };

  const filteredMediaFiles = mediaFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          placeholder="Buscar archivos..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <MediaGrid
        mediaFiles={filteredMediaFiles}
        onViewImage={handleViewImage}
        onEditImage={handleEditImage}
        onDownloadImage={handleDownloadImage}
        onDeleteMedia={onDeleteMedia}
        formatFileSize={formatFileSize}
        formatDate={formatDate}
      />

      <ImageEditModal
        file={selectedFile}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleSaveEditedImage}
      />
    </div>
  );
};

export default MediaLibrary;
