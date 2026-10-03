"use client";

import { Minus, Plus, Utensils } from "lucide-react";
import { Ingredient } from "@/types/recipe";

interface IngredientScalerProps {
  baseServings: number;
  currentServings: number;
  onServingsChange: (servings: number) => void;
  ingredients: Ingredient[];
}

export default function IngredientScaler({
  baseServings,
  currentServings,
  onServingsChange,
  ingredients,
}: IngredientScalerProps) {
  const scale = currentServings / baseServings;

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-5 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center space-x-2">
          <Utensils className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">Scaled Ingredients</h2>
        </div>

        <div className="flex items-center space-x-3 bg-slate-800/80 border border-slate-700/60 rounded-full px-3 py-1">
          <button
            onClick={() => onServingsChange(Math.max(1, currentServings - 1))}
            className="p-1 text-slate-300 hover:text-white transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-bold text-orange-400 min-w-[70px] text-center font-mono">
            {currentServings} {currentServings === 1 ? "Serving" : "Servings"}
          </span>
          <button
            onClick={() => onServingsChange(currentServings + 1)}
            className="p-1 text-slate-300 hover:text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ingredients.map((ing, idx) => {
          const scaledAmount = Number((ing.amount * scale).toFixed(1));
          return (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50 text-xs">
              <span className="text-slate-300 font-medium">{ing.item}</span>
              <span className="font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                {scaledAmount} {ing.unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
