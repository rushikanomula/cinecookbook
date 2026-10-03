"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Recipe, Comment } from "@/types/recipe";

const INITIAL_RECIPES: Recipe[] = [
  {
    id: "pizza-napoletana",
    title: "Artisanal Neapolitan Pizza with Wood-Fired Crust",
    chef: "Marco Rossi",
    chefRole: "Master Pizzaiolo, Naples",
    category: "Italian",
    duration: "45 mins",
    servings: 2,
    difficulty: "Intermediate",
    calories: "680 kcal",
    videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    posterUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    description: "Learn extended cold fermentation, manual dough stretching, and high-heat leopard spotting for authentic Neapolitan pizza.",
    likes: 342,
    dislikes: 8,
    ingredients: [
      { item: "Caputo Tipo 00 Flour", amount: 250, unit: "g" },
      { item: "Warm Water (65% Hydration)", amount: 160, unit: "ml" },
      { item: "San Marzano Whole Tomatoes", amount: 120, unit: "g" },
      { item: "Fresh Mozzarella di Bufala", amount: 100, unit: "g" },
      { item: "Sea Salt", amount: 7, unit: "g" },
      { item: "Fresh Basil Leaves", amount: 6, unit: "leaves" }
    ],
    steps: [
      { time: 0, title: "Fermentation & Yeast Activation", description: "Dissolve sea salt and fresh yeast into warm water before adding Tipo 00 flour.", durationText: "10 mins" },
      { time: 15, title: "Kneading & Elasticity Test", description: "Work dough manually on marble surface until gluten develops smooth elasticity.", durationText: "15 mins" },
      { time: 35, title: "Hand Stretching & Saucing", description: "Push air out toward crust edge (cornicione) and apply crushed tomatoes.", durationText: "10 mins" },
      { time: 55, title: "High Heat Bake & Finish", description: "Bake at maximum oven temp until leopard spotting appears; garnish with fresh basil.", durationText: "10 mins" }
    ],
    comments: [
      { id: "c1", author: "Chef Antonio", text: "The hydrations ratio on this crust is absolute perfection!", createdAt: "2 hours ago" },
      { id: "c2", author: "Elena Vance", text: "Tried this over the weekend and the leopard spotting turned out amazing.", createdAt: "1 day ago" }
    ]
  }
];

interface RecipeContextType {
  recipes: Recipe[];
  savedRecipeIds: string[];
  searchQuery: string;
  selectedCategory: string;
  userVotes: Record<string, "like" | "dislike" | null>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  addRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipeId: string) => void;
  toggleSaveRecipe: (recipeId: string) => void;
  voteRecipe: (recipeId: string, type: "like" | "dislike") => void;
  addComment: (recipeId: string, commentText: string, authorName: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [userVotes, setUserVotes] = useState<Record<string, "like" | "dislike" | null>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cinecookbook_saved");
      if (saved) setSavedRecipeIds(JSON.parse(saved));

      const votes = localStorage.getItem("cinecookbook_votes");
      if (votes) setUserVotes(JSON.parse(votes));

      const storedRecipes = localStorage.getItem("cinecookbook_user_recipes");
      if (storedRecipes) {
        const parsedUserRecipes: Recipe[] = JSON.parse(storedRecipes);
        if (parsedUserRecipes.length > 0) {
          setRecipes(prev => {
            const existingIds = new Set(prev.map(r => r.id));
            const newOnes = parsedUserRecipes.filter(r => !existingIds.has(r.id));
            return [...newOnes, ...prev];
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleSaveRecipe = (recipeId: string) => {
    setSavedRecipeIds(prev => {
      const updated = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      try {
        if (updated.length > 0) {
          localStorage.setItem("cinecookbook_saved", JSON.stringify(updated));
        } else {
          localStorage.removeItem("cinecookbook_saved");
        }
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const voteRecipe = (recipeId: string, type: "like" | "dislike") => {
    setUserVotes(prevVotes => {
      const currentVote = prevVotes[recipeId] || null;
      let newVote: "like" | "dislike" | null = type;

      if (currentVote === type) {
        newVote = null; // Toggle off if clicked again
      }

      const updatedVotes = { ...prevVotes, [recipeId]: newVote };
      try {
        localStorage.setItem("cinecookbook_votes", JSON.stringify(updatedVotes));
      } catch (err) {
        console.error(err);
      }

      // Update recipes precisely using functional state update
      setRecipes(prevRecipes =>
        prevRecipes.map(r => {
          if (r.id !== recipeId) return r;
          let likesChange = 0;
          let dislikesChange = 0;

          if (currentVote === "like") likesChange--;
          if (currentVote === "dislike") dislikesChange--;

          if (newVote === "like") likesChange++;
          if (newVote === "dislike") dislikesChange++;

          return {
            ...r,
            likes: Math.max(0, r.likes + likesChange),
            dislikes: Math.max(0, r.dislikes + dislikesChange)
          };
        })
      );

      return updatedVotes;
    });
  };

  const addComment = (recipeId: string, commentText: string, authorName: string) => {
    const newComment: Comment = {
      id: "c_" + Date.now(),
      author: authorName || "Culinary Enthusiast",
      text: commentText,
      createdAt: "Just now"
    };

    setRecipes(prev => {
      const updated = prev.map(r => r.id === recipeId ? { ...r, comments: [newComment, ...r.comments] } : r);
      const userUploaded = updated.filter(r => r.id !== "pizza-napoletana");
      try {
        if (userUploaded.length > 0) {
          localStorage.setItem("cinecookbook_user_recipes", JSON.stringify(userUploaded));
        } else {
          localStorage.removeItem("cinecookbook_user_recipes");
        }
      } catch (err) {
        console.error("Storage quota exceeded", err);
      }
      return updated;
    });
  };

  const addRecipe = (newRecipe: Recipe) => {
    setRecipes(prev => {
      const updated = [newRecipe, ...prev];
      const userUploaded = updated.filter(r => r.id !== "pizza-napoletana");
      
      try {
        localStorage.setItem("cinecookbook_user_recipes", JSON.stringify(userUploaded));
      } catch (err) {
        console.warn("localStorage quota exceeded.");
      }
      return updated;
    });
  };

  const deleteRecipe = (recipeId: string) => {
    setRecipes(prev => {
      const updated = prev.filter(r => r.id !== recipeId);
      const userUploaded = updated.filter(r => r.id !== "pizza-napoletana");
      try {
        if (userUploaded.length > 0) {
          localStorage.setItem("cinecookbook_user_recipes", JSON.stringify(userUploaded));
        } else {
          localStorage.removeItem("cinecookbook_user_recipes");
        }
      } catch (err) {
        console.error(err);
      }
      return updated;
    });

    setSavedRecipeIds(prev => {
      const updated = prev.filter(id => id !== recipeId);
      try {
        if (updated.length > 0) {
          localStorage.setItem("cinecookbook_saved", JSON.stringify(updated));
        } else {
          localStorage.removeItem("cinecookbook_saved");
        }
      } catch (err) {
        console.error(err);
      }
      return updated;
    });

    setUserVotes(prev => {
      if (!(recipeId in prev)) return prev;
      const updated = { ...prev };
      delete updated[recipeId];
      try {
        localStorage.setItem("cinecookbook_votes", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const getRecipeById = (id: string) => recipes.find(r => r.id === id);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        savedRecipeIds,
        searchQuery,
        selectedCategory,
        userVotes,
        setSearchQuery,
        setSelectedCategory,
        addRecipe,
        deleteRecipe,
        toggleSaveRecipe,
        voteRecipe,
        addComment,
        getRecipeById
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) throw new Error("useRecipes must be used within a RecipeProvider");
  return context;
};
