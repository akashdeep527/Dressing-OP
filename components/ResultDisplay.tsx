import React from 'react';
import { DownloadIcon } from './Icons';

interface ResultDisplayProps {
  originalImage: string | undefined;
  generatedImage: string | null;
  isLoading: boolean;
}

const ImagePanel: React.FC<{
  title: string;
  imageUrl?: string | null;
  isLoading?: boolean;
  onDownload?: () => void;
}> = ({ title, imageUrl, isLoading, onDownload }) => (
  <div className="w-full flex flex-col">
    <div className="w-full flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
        {onDownload && imageUrl && !isLoading && (
          <button
            onClick={onDownload}
            className="flex items-center gap-2 bg-gray-700/50 hover:bg-brand-primary text-gray-200 text-sm font-semibold py-1.5 px-3 rounded-lg transition-colors border border-gray-600 hover:border-brand-primary"
            aria-label="Download generated image"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Download</span>
          </button>
        )}
    </div>
    <div className="w-full aspect-square rounded-lg bg-gray-800 border-2 border-gray-700 flex items-center justify-center overflow-hidden">
      {isLoading ? (
        <div className="flex flex-col items-center text-gray-400">
            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="mt-2 text-sm">Generating...</span>
        </div>
      ) : imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
      ) : (
        <span className="text-gray-500">Image will appear here</span>
      )}
    </div>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading }) => {
  if (!originalImage) {
    return null;
  }
  
  if (!generatedImage && !isLoading) {
    return null;
  }

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'gemini-styled-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImagePanel title="Original" imageUrl={originalImage} />
        <ImagePanel 
            title="Generated" 
            imageUrl={generatedImage} 
            isLoading={isLoading} 
            onDownload={handleDownload}
        />
      </div>
    </div>
  );
};