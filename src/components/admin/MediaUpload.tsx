
import React, { useState, useRef } from 'react';
import { UploadCloud, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { uploadMediaFile, uploadMultipleMediaFiles } from '@/services/media';

interface MediaUploadProps {
  onUploadComplete: (file: MediaFile) => void;
  onMultipleUploadsComplete?: (files: MediaFile[]) => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

export interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadDate: string;
  altText?: string;
  width?: number;
  height?: number;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ 
  onUploadComplete, 
  onMultipleUploadsComplete,
  isUploading, 
  setIsUploading 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedMediaFiles, setUploadedMediaFiles] = useState<MediaFile[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelect(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelect(Array.from(e.target.files));
    }
  };

  const handleFilesSelect = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name}: Solo se permiten archivos de imagen`);
        return false;
      }
      
      if (file.size > 10 * 1024 * 1024) { // Increased to 10MB
        toast.error(`${file.name}: El archivo es demasiado grande. Máximo 10MB`);
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      if (validFiles.length > 1) {
        toast.info(`${validFiles.length} archivos seleccionados`);
      }
    }
  };

  const handleCancelSelection = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsUploading(true);
    setCurrentFileIndex(0);
    setUploadedMediaFiles([]);
    
    try {
      if (selectedFiles.length === 1) {
        await uploadSingleFile();
      } else {
        await uploadMultipleFiles();
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error al subir archivos");
      setIsUploading(false);
    }
  };
  
  const uploadSingleFile = async () => {
    setUploadProgress(0);
    const currentFile = selectedFiles[0];
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 5;
        return newProgress > 95 ? 95 : newProgress;
      });
    }, 300);
    
    try {
      const mediaFile = await uploadMediaFile(currentFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (mediaFile) {
        onUploadComplete(mediaFile);
        
        setTimeout(() => {
          finishUploads();
        }, 500);
      } else {
        toast.error(`Error al subir ${currentFile.name}`);
        handleCancelSelection();
        setIsUploading(false);
      }
    } catch (error) {
      clearInterval(progressInterval);
      throw error;
    }
  };
  
  const uploadMultipleFiles = async () => {
    setUploadProgress(0);
    
    // Start progress simulation
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = Math.min(95, prev + 1);
        return newProgress;
      });
    }, 200);
    
    try {
      // Use the batch upload function
      const mediaFiles = await uploadMultipleMediaFiles(selectedFiles);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (mediaFiles.length > 0) {
        setUploadedMediaFiles(mediaFiles);
        
        // Handle the uploaded files
        if (onMultipleUploadsComplete) {
          onMultipleUploadsComplete(mediaFiles);
        }
        
        setTimeout(() => {
          finishUploads();
        }, 500);
      } else {
        toast.error("No se pudieron subir los archivos");
        handleCancelSelection();
        setIsUploading(false);
      }
    } catch (error) {
      clearInterval(progressInterval);
      throw error;
    }
  };

  const finishUploads = () => {
    setIsUploading(false);
    setSelectedFiles([]);
    setUploadProgress(0);
    setCurrentFileIndex(0);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {selectedFiles.length === 0 ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-wem-green bg-wem-green/5' : 'border-gray-300 hover:border-wem-green/60'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            Arrastrar archivos o hacer clic para subir
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Soporta: JPG, PNG, SVG, WEBP (Máx. 10MB)
          </p>
          <Button variant="outline" type="button" className="mx-auto" onClick={(e) => {
            e.stopPropagation();
            triggerFileInput();
          }}>
            Seleccionar archivos
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileInputChange}
            multiple
          />
        </div>
      ) : (
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="mb-4">
            <h3 className="font-medium mb-2">
              {selectedFiles.length} {selectedFiles.length === 1 ? 'archivo seleccionado' : 'archivos seleccionados'}
            </h3>
            <div className="max-h-52 overflow-y-auto border rounded p-2 bg-white mb-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between py-1 border-b last:border-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      <img src={URL.createObjectURL(file)} alt="Preview" className="h-full object-cover" />
                    </div>
                    <span className="text-sm truncate max-w-[180px]">{file.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              ))}
            </div>
          </div>

          {isUploading ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm mb-1">
                <span>
                  {selectedFiles.length > 1 
                    ? `Subiendo ${selectedFiles.length} archivos...` 
                    : `Subiendo archivo: ${selectedFiles[0]?.name}`}
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleUpload} className="w-full bg-wem-green hover:bg-wem-green/90">
                Subir {selectedFiles.length > 1 ? `${selectedFiles.length} archivos` : 'archivo'}
              </Button>
              <Button variant="outline" onClick={handleCancelSelection}>
                Cancelar
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
