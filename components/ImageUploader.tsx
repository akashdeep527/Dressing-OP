
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  originalImageUrl: string | undefined;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImageUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      onImageUpload(files[0]);
    }
  };
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      {originalImageUrl ? (
        <div className="w-full aspect-square max-h-[400px] mx-auto rounded-lg overflow-hidden border-2 border-dashed border-gray-600">
            <img src={originalImageUrl} alt="Original upload" className="w-full h-full object-contain" />
        </div>
      ) : (
        <label
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`w-full aspect-video md:aspect-[2/1] max-h-[300px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${isDragging ? 'border-brand-primary bg-gray-800/50' : 'border-gray-600 hover:border-brand-light hover:bg-gray-800/30'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold text-brand-light">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => handleFileChange(e.target.files)} 
          />
        </label>
      )}
    </div>
  );
};
