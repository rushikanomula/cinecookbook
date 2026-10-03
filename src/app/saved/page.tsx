"use client";

import { useRecipes } from "@/context/RecipeContext";
import RecipeCard from "@/components/RecipeCard";
import { Bookmark, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SavedPage() {
  const { recipes, savedRecipeIds } = useRecipes();
  const savedRecipes = recipes.filter(r => savedRecipeIds.includes(r.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <Link href="/" className="p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-800">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-orange-500 fill-current" />
              Saved Collection
            </h1>
            <p className="text-xs text-slate-400">
              {savedRecipes.length} bookmark{savedRecipes.length === 1 ? "" : "s"} stored in your personal kitchen library
            </p>
          </div>
        </div>
      </div>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
          <h2 className="text-lg font-bold text-white">Your collection is empty</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any recipe card to save it here for quick access while cooking.
          </p>
          <Link href="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors">
            Browse Masterclasses
          </Link>
        </div>
      )}
    </div>
  );
}
