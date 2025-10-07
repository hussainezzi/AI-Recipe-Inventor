
export interface Suggestions {
  recipeName: string;
  alternativeIngredients: string[];
}

export interface Recipe {
  recipeName: string;
  servings: string;
  prepTime: string;
  ingredients: string[];
  instructions: string[];
}
