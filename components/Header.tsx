
import React from 'react';
import { SparklesIcon, GoogleIcon } from './Icons';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onSignIn, onSignOut }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-1/3"></div> {/* Left spacer */}
          
          <div className="w-1/3 flex items-center justify-center">
            <SparklesIcon className="w-8 h-8 text-brand-light" />
            <h1 className="ml-3 text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-white to-brand-primary">
              Gemini Style Shifter
            </h1>
          </div>
          
          <div className="w-1/3 flex items-center justify-end">
            {user ? (
              <div className="flex items-center gap-3">
                <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full border-2 border-brand-light" />
                <span className="text-sm font-medium text-gray-300 hidden sm:block">{user.name}</span>
                <button
                  onClick={onSignOut}
                  className="bg-gray-700/50 hover:bg-gray-700 text-gray-200 text-sm font-semibold py-1.5 px-3 rounded-lg transition-colors border border-gray-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors border border-gray-600"
              >
                <GoogleIcon />
                <span className="text-sm hidden sm:block">Sign in with Google</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
