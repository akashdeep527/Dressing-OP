import React, { useState, useCallback } from 'react';
import { Header } from './Header';
import { ImageUploader } from './ImageUploader';
import { StyleSelector } from './StyleSelector';
import { ResultDisplay } from './ResultDisplay';
import { Loader } from './Loader';
import { SparklesIcon } from './Icons';
import { editImageWithPrompt } from '../services/geminiService';
import type { UploadedImage, User } from '../types';

interface EditorPageProps {
  user: User;
  onSignOut: () => void;
}

export const EditorPage: React.FC<EditorPageProps> = ({ user, onSignOut }) => {
  const [originalImage, setOriginalImage] = useState<UploadedImage | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage({
      file,
      url: URL.createObjectURL(file),
    });
    setGeneratedImage(null);
    setError(null);
  };

  const handlePromptSelect = useCallback((selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  }, []);
  
  const fileToBase64 = (file: File): Promise<{ data: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const mimeType = result.split(';')[0].split(':')[1];
        const base64Data = result.split(',')[1];
        resolve({ data: base64Data, mimeType });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleGenerate = async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and select a style or enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const { data: base64Data, mimeType } = await fileToBase64(originalImage.file);
      const generatedData = await editImageWithPrompt(base64Data, mimeType, prompt);
      setGeneratedImage(`data:image/png;base64,${generatedData}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // A dummy onSignIn prop is passed to Header since sign-in is handled by the parent App component.
  // This could be improved in a real app with context or a more robust routing solution.
  const handleDummySignIn = () => {};

  return (
    <>
      <Header user={user} onSignIn={handleDummySignIn} onSignOut={onSignOut} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <ImageUploader onImageUpload={handleImageUpload} originalImageUrl={originalImage?.url} />
          
          {originalImage && (
            <>
              <StyleSelector onPromptSelect={handlePromptSelect} currentPrompt={prompt} />
              
              <div>
                <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-400 mb-2">Or enter your own edit prompt:</label>
                <input
                  id="custom-prompt"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Add a retro filter"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                />
              </div>

              <div className="flex justify-center">
                 <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-transform duration-300 ease-in-out"
                 >
                    {isLoading ? (
                      <>
                        <Loader />
                        Generating...
                      </>
                    ) : (
                      <>
                        <SparklesIcon />
                        Generate Style
                      </>
                    )}
                 </button>
              </div>
            </>
          )}

          {error && <div className="text-center bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg">{error}</div>}

          <ResultDisplay originalImage={originalImage?.url} generatedImage={generatedImage} isLoading={isLoading} />
        </div>
      </main>
    </>
  );
};