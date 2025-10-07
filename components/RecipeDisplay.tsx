
import React from 'react';
import type { Recipe } from '../types';
import { Button } from './Button';
import { Card } from './Card';

interface RecipeDisplayProps {
  recipe: Recipe;
  onGenerateImages: () => void;
  isLoading: boolean;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onGenerateImages, isLoading }) => {
  return (
    <Card title="3. The Masterpiece">
      <div className="space-y-6">
        <div className="text-center">
            <h3 className="text-3xl font-bold font-sans text-earthy-brown">"{recipe.recipeName}"</h3>
            <div className="flex justify-center gap-8 mt-4 text-earthy-brown/80 text-md">
                <span><strong>Servings:</strong> {recipe.servings}</span>
                <span><strong>Time:</strong> {recipe.prepTime}</span>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="md:col-span-1">
                <h4 className="text-xl font-bold font-sans mb-3 border-b-2 border-warm-orange pb-2">Ingredients</h4>
                <ul className="space-y-2">
                    {recipe.ingredients.map((item, index) => (
                        <li key={index} className="flex items-start">
                           <span className="text-warm-orange mr-2 mt-1">&#10003;</span> {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="md:col-span-2">
                <h4 className="text-xl font-bold font-sans mb-3 border-b-2 border-warm-orange pb-2">Instructions</h4>
                <ol className="space-y-4">
                    {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex items-start">
                            <span className="bg-earthy-brown text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">{index + 1}</span>
                            <span className="mt-1">{step}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
        
        <div className="pt-4">
          <Button onClick={onGenerateImages} isLoading={isLoading} disabled={isLoading} variant="secondary">
            {isLoading ? 'Generating Content...' : 'Generate Photos & Caption'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
