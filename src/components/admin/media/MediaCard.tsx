
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MediaFile } from '@/components/admin/MediaUpload';
import { Eye, Edit, Download, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MediaCardProps {
  file: MediaFile;
  onView: (url: string) => void;
  onEdit: (id: string) => void;
  onDownload: (url: string, fileName: string) => void;
  onDelete: (id: string) => void;
  formatFileSize: (bytes: number) => string;
  formatDate: (dateString: string) => string;
}

const MediaCard: React.FC<MediaCardProps> = ({
  file,
  onView,
  onEdit,
  onDownload,
  onDelete,
  formatFileSize,
  formatDate,
}) => {
  return (
    <Card key={file.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative group">
          <img 
            src={file.url} 
            alt={file.altText || file.name} 
            className="aspect-square object-cover w-full"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity flex items-center justify-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => onView(file.url)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => onEdit(file.id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => onDownload(file.url, file.name)}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => onDelete(file.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onView(file.url)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Ver
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(file.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDownload(file.url, file.name)}>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-500 focus:text-red-500"
                  onClick={() => onDelete(file.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatFileSize(file.size)}</span>
            <span>{formatDate(file.uploadDate)}</span>
          </div>
          {file.altText && (
            <div className="text-xs text-gray-500 mt-1 truncate">
              <span className="font-medium">Alt:</span> {file.altText}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
