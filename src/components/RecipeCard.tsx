"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ThumbsUp, Bookmark, Play, Trash2 } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { useRecipes } from "@/context/RecipeContext";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { savedRecipeIds, toggleSaveRecipe, deleteRecipe } = useRecipes();
  const isSaved = savedRecipeIds.includes(recipe.id);

  // Allow deletion for any uploaded recipe (keeping default Neapolitan pizza persistent)
  const isUserUploaded = recipe.id !== "pizza-napoletana";

  return (
    <div className="group bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col">
      
      {/* Thumbnail Header */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
        <Image 
          src={recipe.posterUrl} 
          alt={recipe.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-orange-400 border border-orange-500/30 text-xs px-3 py-1 rounded-full font-bold">
          {recipe.category}
        </span>

        {/* Action Buttons Top Right */}
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          {/* Delete Button */}
          {isUserUploaded && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
                  deleteRecipe(recipe.id);
                }
              }}
              className="p-2.5 rounded-full backdrop-blur-md bg-black/50 text-slate-300 hover:text-red-400 hover:bg-black/80 transition-all"
              title="Delete Recipe"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Save Bookmark Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleSaveRecipe(recipe.id);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              isSaved 
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" 
                : "bg-black/50 text-slate-300 hover:text-white hover:bg-black/80"
            }`}
            title={isSaved ? "Remove from Saved" : "Save Recipe"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Play Overlay Button */}
        <Link 
          href={`/recipe/${recipe.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="p-4 rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/40 transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </Link>
      </div>

      {/* Card Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link href={`/recipe/${recipe.id}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
              {recipe.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Card Footer Info */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
          <span className="font-semibold text-slate-300 truncate max-w-[120px]">
            By {recipe.chef}
          </span>

          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1 font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              {recipe.duration}
            </span>
            <span className="flex items-center gap-1 font-mono text-slate-300">
              <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
              {recipe.likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
