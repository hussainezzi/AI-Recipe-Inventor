import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';

interface ApiKeyInputProps {
  userApiKey: string;
  onSave: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ userApiKey, onSave }) => {
  const [localApiKey, setLocalApiKey] = useState(userApiKey);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localApiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold font-sans text-earthy-brown">Your Gemini API Key</h2>
        <p className="text-sm text-earthy-brown/70 !mt-2">
          Enter your Gemini API key below. The key will be saved in your browser's local storage for future visits.
          If you leave this blank, the application will attempt to use a pre-configured key (if available).
        </p>
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          <input
            id="apiKey"
            type="password"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            placeholder="Paste your Gemini API key here"
            className="flex-grow p-3 rounded-md border-2 border-earthy-brown bg-cream/50 focus:outline-none focus:ring-2 focus:ring-warm-orange w-full"
            aria-label="Gemini API Key"
          />
          <Button type="submit" className="w-full sm:w-auto" disabled={isSaved}>
            {isSaved ? 'Saved!' : 'Save Key'}
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <button 
          onClick={() => setIsGuideOpen(!isGuideOpen)} 
          className="text-warm-orange hover:underline font-sans font-semibold flex items-center gap-2"
          aria-expanded={isGuideOpen}
        >
          <span className="transition-transform" style={{ transform: isGuideOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>►</span> How do I get a Gemini API key?
        </button>
        {isGuideOpen && (
          <div className="mt-4 p-4 bg-cream/50 border-2 border-dashed border-earthy-brown/50 rounded-lg space-y-2 text-earthy-brown/90">
            <p>Getting a key is free and easy. Here’s how:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to the <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-warm-orange font-bold hover:underline">Google AI Studio</a> website.</li>
              <li>Click on the <strong>"Get API key"</strong> button (you might need to sign in with your Google account).</li>
              <li>Click <strong>"Create API key in new project"</strong>.</li>
              <li>Your new API key will be generated. Copy it.</li>
              <li>Paste the copied key into the input field above and click "Save Key".</li>
            </ol>
          </div>
        )}
      </div>
    </Card>
  );
};
