import { GoogleGenAI, Type } from "@google/genai";
import type { Suggestions, Recipe } from '../types';

let ai: GoogleGenAI | null = null;

// Initialize with environment variable as a fallback.
// This allows the app to work out-of-the-box if the env var is set.
// A user-provided key via setApiKey will override this.
if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

/**
 * Sets or updates the Gemini API client instance with a new API key.
 * @param key The Gemini API key. If empty, the client will be cleared or reverted to the environment variable.
 */
export function setApiKey(key: string) {
  if (key) {
    ai = new GoogleGenAI({ apiKey: key });
  } else if (process.env.API_KEY) {
    // If the user clears the key, fall back to the env var if it exists.
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } else {
    // Otherwise, clear the client.
    ai = null;
  }
}

/**
 * Gets the current AI client, throwing an error if not configured.
 * @returns The configured GoogleGenAI instance.
 */
function getAiClient(): GoogleGenAI {
  if (!ai) {
    throw new Error("API Key not configured. Please enter your Gemini API key to proceed.");
  }
  return ai;
}


export async function generateSuggestionsAndName(ingredients: string, cuisine: string): Promise<Suggestions> {
  const client = getAiClient();
  const prompt = `Based on the ingredients "${ingredients}" and cuisine style "${cuisine}", invent a creative and appealing recipe name. Also, suggest 3-5 alternative or complementary ingredients.`;
  
  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recipeName: {
            type: Type.STRING,
            description: 'A creative and appealing name for the new recipe.'
          },
          alternativeIngredients: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING
            },
            description: 'A list of 3 to 5 alternative or complementary ingredients.'
          }
        },
        required: ['recipeName', 'alternativeIngredients']
      },
    },
  });

  const jsonText = response.text;
  if (!jsonText) {
    throw new Error("Failed to generate suggestions. The API returned an empty response.");
  }
  return JSON.parse(jsonText);
}

export async function generateRecipe(ingredients: string, cuisine: string, recipeName: string): Promise<Recipe> {
  const client = getAiClient();
  const prompt = `Create a full recipe for a dish called "${recipeName}". It's a ${cuisine}-style dish and should primarily use these ingredients: ${ingredients}. Provide the number of servings, total prep and cook time, a list of all necessary ingredients with quantities, and step-by-step instructions.`;

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recipeName: {
            type: Type.STRING,
            description: 'The name of the recipe.'
          },
          servings: {
            type: Type.STRING,
            description: 'The number of servings this recipe makes (e.g., "4-6 servings").'
          },
          prepTime: {
            type: Type.STRING,
            description: 'The total preparation and cooking time (e.g., "Approx. 45 minutes").'
          },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING
            },
            description: 'A list of all ingredients with specific quantities.'
          },
          instructions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING
            },
            description: 'Step-by-step instructions to prepare the dish.'
          }
        },
        required: ['recipeName', 'servings', 'prepTime', 'ingredients', 'instructions']
      },
    },
  });

  const jsonText = response.text;
  if (!jsonText) {
    throw new Error("Failed to generate the recipe. The API returned an empty response.");
  }
  return JSON.parse(jsonText);
}

export async function generateImagesAndCaption(recipeName: string, recipeInstructions: string): Promise<{ images: string[], caption: string }> {
  const client = getAiClient();
  
  // Generate images
  const imagePrompt = `Photorealistic, delicious-looking food photography of "${recipeName}". The dish is presented beautifully on a plate, with natural lighting and an inviting, warm aesthetic. It should look professionally styled for a food blog.`;

  const imageResponse = await client.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: imagePrompt,
    config: {
      numberOfImages: 4,
      aspectRatio: '4:3'
    },
  });

  const images = imageResponse.generatedImages.map(img => `data:image/png;base64,${img.image.imageBytes}`);
  
  if (images.length === 0) {
      throw new Error("Image generation failed to produce any images.");
  }

  // Generate caption
  const captionPrompt = `Write a short, engaging, and friendly social media caption for a food blog post about a new recipe called "${recipeName}". Include a couple of relevant emojis. Keep it under 280 characters.`;

  const captionResponse = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: captionPrompt,
  });

  const caption = captionResponse.text;
  
  if (!caption) {
      throw new Error("Caption generation failed to produce any text.");
  }

  return { images, caption };
}
