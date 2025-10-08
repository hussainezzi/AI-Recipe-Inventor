import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { WorkflowGuide } from './components/WorkflowGuide';
import { ApiKeyInput } from './components/ApiKeyInput';
import { RecipeInputForm } from './components/RecipeInputForm';
import { SuggestionsBox } from './components/SuggestionsBox';
import { RecipeDisplay } from './components/RecipeDisplay';
import { ImageGallery } from './components/ImageGallery';
import { Alert } from './components/Alert';
import type { Suggestions, Recipe } from './types';
import { generateSuggestionsAndName, generateRecipe, generateImagesAndCaption, initializeGemini } from './services/geminiService';

const App: React.FC = () => {
  const [userApiKey, setUserApiKey] = useState<string>(() => localStorage.getItem('gemini-api-key') || '');
  const [ingredients, setIngredients] = useState<string>('');
  const [cuisine, setCuisine] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>('');

  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState<boolean>(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState<boolean>(false);
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (userApiKey) {
      initializeGemini(userApiKey);
    }
  }, [userApiKey]);

  const handleSaveApiKey = (key: string) => {
    setUserApiKey(key);
    localStorage.setItem('gemini-api-key', key);
  };

  const handleGenerateSuggestions = useCallback(async () => {
    if (!ingredients.trim() || !cuisine.trim()) {
      setError('Please provide both ingredients and a cuisine style.');
      return;
    }
    setError(null);
    setIsLoadingSuggestions(true);
    setSuggestions(null);
    setRecipe(null);
    setImages([]);
    setCaption('');
    try {
      const result = await generateSuggestionsAndName(ingredients, cuisine);
      setSuggestions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating suggestions.');
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [ingredients, cuisine]);

  const handleGenerateRecipe = useCallback(async () => {
    if (!suggestions) return;
    setError(null);
    setIsLoadingRecipe(true);
    setRecipe(null);
    setImages([]);
    setCaption('');
    try {
      const result = await generateRecipe(ingredients, cuisine, suggestions.recipeName);
      setRecipe(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the recipe.');
    } finally {
      setIsLoadingRecipe(false);
    }
  }, [ingredients, cuisine, suggestions]);

  const handleGenerateImagesAndCaption = useCallback(async () => {
    if (!recipe) return;
    setError(null);
    setIsLoadingImages(true);
    setImages([]);
    setCaption('');
    try {
      const { images: generatedImages, caption: generatedCaption } = await generateImagesAndCaption(recipe.recipeName, recipe.instructions.join(' '));
      setImages(generatedImages);
      setCaption(generatedCaption);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating images and caption.');
    } finally {
      setIsLoadingImages(false);
    }
  }, [recipe]);

  return (
    <div className="min-h-screen container mx-auto p-4 md:p-8">
      <Header />
      <WorkflowGuide />
      <div className="my-12">
        <ApiKeyInput userApiKey={userApiKey} onSave={handleSaveApiKey} />
      </div>
      <main className="space-y-12">
        {error && <Alert message={error} onClose={() => setError(null)} />}
        
        <RecipeInputForm
          ingredients={ingredients}
          cuisine={cuisine}
          setIngredients={setIngredients}
          setCuisine={setCuisine}
          onSubmit={handleGenerateSuggestions}
          isLoading={isLoadingSuggestions}
        />

        {suggestions && (
          <SuggestionsBox
            suggestions={suggestions}
            onGenerateRecipe={handleGenerateRecipe}
            isLoading={isLoadingRecipe}
          />
        )}

        {recipe && (
          <RecipeDisplay
            recipe={recipe}
            onGenerateImages={handleGenerateImagesAndCaption}
            isLoading={isLoadingImages}
          />
        )}

        {(isLoadingImages || images.length > 0) && (
          <ImageGallery
            images={images}
            caption={caption}
            isLoading={isLoadingImages}
            recipeName={recipe?.recipeName || 'your delicious dish'}
          />
        )}
      </main>
    </div>
  );
};

export default App;