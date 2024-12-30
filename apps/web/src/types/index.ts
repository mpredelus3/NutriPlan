export interface User {
  id: string;
  email: string;
  name: string;
  preferences?: {
    dietaryRestrictions: string[];
    allergies: string[];
    calorieGoal?: number;
    macroGoals?: {
      protein: number;
      carbs: number;
      fats: number;
    };
  };
}

export interface Recipe {
  id: string;
  name: string;
  creator: User;
  description?: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: {
    step: number;
    text: string;
  }[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
  image?: string;
}

export interface MealPlan {
  id: string;
  user: User;
  date: string;
  meals: {
    breakfast: MealItem[];
    lunch: MealItem[];
    dinner: MealItem[];
    snacks: MealItem[];
  };
  nutritionTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface MealItem {
  recipe: Recipe;
  servings: number;
}
