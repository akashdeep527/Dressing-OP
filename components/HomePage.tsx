import React from 'react';
import { GoogleIcon, SparklesIcon } from './Icons';

interface HomePageProps {
  onSignIn: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSignIn }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="max-w-2xl">
        <div className="flex items-center justify-center mb-4">
          <SparklesIcon className="w-12 h-12 text-brand-light" />
          <h1 className="ml-4 text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-white to-brand-primary">
            Gemini Style Shifter
          </h1>
        </div>
        <p className="mt-4 text-lg text-gray-300">
          Transform your photos with the power of AI. Upload an image, choose from a wide variety of Indian and Western styles, or write your own prompt to instantly restyle your clothing.
        </p>
        <p className="mt-2 text-gray-400">
          Ready to see the magic? Sign in to get started.
        </p>
        <div className="mt-8">
          <button
            onClick={onSignIn}
            className="flex items-center justify-center gap-3 mx-auto bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors border border-gray-600 shadow-lg hover:scale-105 transform duration-300 ease-in-out"
          >
            <GoogleIcon />
            <span className="text-md">Sign in with Google to Get Started</span>
          </button>
        </div>
      </div>
    </div>
  );
};