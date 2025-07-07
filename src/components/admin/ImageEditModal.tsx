
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MediaFile } from './MediaUpload';

interface ImageEditModalProps {
  file: MediaFile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedFile: MediaFile) => void;
}

const ImageEditModal: React.FC<ImageEditModalProps> = ({
  file,
  open,
  onOpenChange,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [altText, setAltText] = useState('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update form when file changes
  useEffect(() => {
    if (file) {
      setName(file.name);
      setAltText(file.altText || '');
      setDimensions({
        width: file.width || 0,
        height: file.height || 0
      });
    }
  }, [file]);

  const handleSave = () => {
    if (!file) return;

    const updatedFile = {
      ...file,
      name,
      altText
    };

    onSave(updatedFile);
    onOpenChange(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar imagen</DialogTitle>
          <DialogDescription>
            Modifica los detalles de la imagen seleccionada.
          </DialogDescription>
        </DialogHeader>
        
        {file && (
          <div className="grid gap-6 py-4">
            <div className="flex justify-center mb-2">
              <div className="w-48 h-48 border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                <img 
                  src={file.url} 
                  alt={file.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              {dimensions.width > 0 && dimensions.height > 0 && (
                <div>
                  <span className="font-medium">Dimensiones:</span> {dimensions.width} x {dimensions.height}px
                </div>
              )}
              <div>
                <span className="font-medium">Tamaño:</span> {formatFileSize(file.size)}
              </div>
              <div>
                <span className="font-medium">Tipo:</span> {file.type}
              </div>
              <div>
                <span className="font-medium">Fecha:</span> {new Date(file.uploadDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="fileName">Nombre del archivo</Label>
              <Input
                id="fileName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="altText">Texto alternativo (ALT)</Label>
              <Textarea
                id="altText"
                placeholder="Describe la imagen para accesibilidad y SEO"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="resize-none"
                rows={3}
              />
              <p className="text-sm text-gray-500">
                El texto alternativo ayuda a las personas con discapacidad visual y mejora el SEO.
              </p>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditModal;
