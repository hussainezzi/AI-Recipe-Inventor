
import React from 'react';
import type { Suggestions } from '../types';
import { Button } from './Button';
import { Card } from './Card';

interface SuggestionsBoxProps {
  suggestions: Suggestions;
  onGenerateRecipe: () => void;
  isLoading: boolean;
}

export const SuggestionsBox: React.FC<SuggestionsBoxProps> = ({ suggestions, onGenerateRecipe, isLoading }) => {
  return (
    <Card title="2. Your New Recipe Idea">
      <div className="border-2 border-dashed border-warm-orange p-6 rounded-lg bg-warm-orange/10">
        <h3 className="text-3xl font-bold font-sans text-earthy-brown text-center">"{suggestions.recipeName}"</h3>
        <div className="mt-6">
          <h4 className="text-xl font-semibold font-sans mb-2">Ingredient Suggestions:</h4>
          <ul className="list-disc list-inside space-y-1 text-lg">
            {suggestions.alternativeIngredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <Button onClick={onGenerateRecipe} isLoading={isLoading} disabled={isLoading}>
          {isLoading ? 'Writing Recipe...' : 'Generate Full Recipe'}
        </Button>
      </div>
    </Card>
  );
};
