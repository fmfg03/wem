
import React from 'react';
import { MediaFile } from '@/components/admin/MediaUpload';
import MediaCard from './MediaCard';

interface MediaGridProps {
  mediaFiles: MediaFile[];
  onViewImage: (url: string) => void;
  onEditImage: (id: string) => void;
  onDownloadImage: (url: string, fileName: string) => void;
  onDeleteMedia: (id: string) => void;
  formatFileSize: (bytes: number) => string;
  formatDate: (dateString: string) => string;
}

const MediaGrid: React.FC<MediaGridProps> = ({
  mediaFiles,
  onViewImage,
  onEditImage,
  onDownloadImage,
  onDeleteMedia,
  formatFileSize,
  formatDate,
}) => {
  if (mediaFiles.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
        <p className="text-gray-500 mb-2">No se encontraron archivos</p>
        <p className="text-sm text-gray-400">
          Sube tus imágenes usando la pestaña "Subir Nuevo"
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mediaFiles.map((file) => (
        <MediaCard
          key={file.id}
          file={file}
          onView={onViewImage}
          onEdit={onEditImage}
          onDownload={onDownloadImage}
          onDelete={onDeleteMedia}
          formatFileSize={formatFileSize}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
};

export default MediaGrid;
