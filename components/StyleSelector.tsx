import React, { useState } from 'react';
import { MEN_STYLES, WOMEN_STYLES } from '../constants';
import type { Style } from '../types';

interface StyleSelectorProps {
  onPromptSelect: (prompt: string) => void;
  currentPrompt: string;
}

type Gender = 'men' | 'women';
type Category = 'indian' | 'western';

const StyleButton: React.FC<{style: Style, isSelected: boolean, onSelect: (prompt: string) => void}> = ({ style, isSelected, onSelect }) => (
    <button
      onClick={() => onSelect(style.prompt)}
      className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ease-in-out border
        ${isSelected
          ? 'bg-brand-primary border-brand-primary text-white font-semibold shadow-md'
          : 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-gray-300'
        }`}
    >
      {style.name}
    </button>
);

// FIX: The 'children' prop is made optional to resolve a TypeScript error where JSX children were not being correctly inferred as props.
interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const TabButton = ({ active, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
      active ? 'bg-brand-primary text-white' : 'text-gray-400 hover:bg-gray-700'
    }`}
  >
    {children}
  </button>
);

export const StyleSelector: React.FC<StyleSelectorProps> = ({ onPromptSelect, currentPrompt }) => {
  const [gender, setGender] = useState<Gender>('men');
  const [category, setCategory] = useState<Category>('indian');

  const styles = gender === 'men' ? MEN_STYLES : WOMEN_STYLES;
  const currentStyles = styles[category];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex bg-gray-900/50 p-1 rounded-lg border border-gray-700">
          <TabButton active={gender === 'men'} onClick={() => setGender('men')}>Men</TabButton>
          <TabButton active={gender === 'women'} onClick={() => setGender('women')}>Women</TabButton>
        </div>
        <div className="flex bg-gray-900/50 p-1 rounded-lg border border-gray-700">
          <TabButton active={category === 'indian'} onClick={() => setCategory('indian')}>Indian</TabButton>
          <TabButton active={category === 'western'} onClick={() => setCategory('western')}>Western</TabButton>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {currentStyles.map((style) => (
          <StyleButton 
            key={style.name} 
            style={style} 
            isSelected={currentPrompt === style.prompt} 
            onSelect={onPromptSelect} 
          />
        ))}
      </div>
    </div>
  );
};