export interface Ingredient {
  item: string;
  amount: number;
  unit: string;
}

export interface Step {
  time: number;
  title: string;
  description: string;
  durationText: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  chef: string;
  chefRole: string;
  category: string;
  duration: string;
  servings: number;
  difficulty: string;
  calories: string;
  videoUrl: string;
  posterUrl: string;
  description: string;
  likes: number;
  dislikes: number;
  ingredients: Ingredient[];
  steps: Step[];
  comments: Comment[];
}
