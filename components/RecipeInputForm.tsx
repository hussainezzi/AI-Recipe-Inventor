
import React from 'react';
import { Card } from './Card';
import { Button } from './Button';

interface RecipeInputFormProps {
  ingredients: string;
  cuisine: string;
  setIngredients: (value: string) => void;
  setCuisine: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const RecipeInputForm: React.FC<RecipeInputFormProps> = ({
  ingredients,
  cuisine,
  setIngredients,
  setCuisine,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Card title="1. Start with an Idea">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ingredients" className="block text-lg font-semibold mb-1">Ingredients</label>
          <p className="text-sm text-earthy-brown/70 mb-2">List some key ingredients you want to use, separated by commas.</p>
          <input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken, chickpeas, spinach, lemon"
            className="w-full p-3 rounded-md border-2 border-earthy-brown bg-cream/50 focus:outline-none focus:ring-2 focus:ring-warm-orange"
            required
          />
        </div>
        <div>
          <label htmlFor="cuisine" className="block text-lg font-semibold mb-1">Cuisine Style</label>
           <p className="text-sm text-earthy-brown/70 mb-2">What kind of vibe are you going for?</p>
          <input
            id="cuisine"
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="e.g., Mediterranean, Thai, Comfort Food"
            className="w-full p-3 rounded-md border-2 border-earthy-brown bg-cream/50 focus:outline-none focus:ring-2 focus:ring-warm-orange"
            required
          />
        </div>
        <div className="pt-2">
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            {isLoading ? 'Inventing...' : 'Invent Recipe Name'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
