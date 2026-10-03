"use client";

import { useRecipes } from "@/context/RecipeContext";
import RecipeCard from "@/components/RecipeCard";
import { Sparkles, Utensils, SearchX } from "lucide-react";

const CATEGORIES = ["All", "Italian", "Japanese", "Bakery", "Dessert", "Mexican", "Quick & Easy"];

export default function Home() {
  const { recipes, searchQuery, selectedCategory, setSelectedCategory } = useRecipes();

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === "All" || recipe.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !query ||
      recipe.title.toLowerCase().includes(query) ||
      recipe.chef.toLowerCase().includes(query) ||
      recipe.category.toLowerCase().includes(query) ||
      recipe.ingredients.some(ing => ing.item.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-950/60 via-slate-900 to-slate-950 border border-orange-500/20 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1.5 w-max">
            <Sparkles className="w-3.5 h-3.5" /> Cinema-Grade Recipe Studio
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Discover & Cook Masterclass Recipes
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Explore video culinary guides, interactive ingredient scalers, chapter timestamp navigation, and share your own kitchen creations.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <Utensils className="w-4 h-4 text-orange-400 mr-2 shrink-0" />
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recipe Grid or Empty Search State */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/30 border border-slate-800/80 rounded-3xl space-y-4">
          <SearchX className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Recipes Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn't find any recipes matching "{searchQuery}" under the "{selectedCategory}" category.
          </p>
        </div>
      )}
    </div>
  );
}
