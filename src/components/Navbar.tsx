"use client";

import Link from "next/link";
import { ChefHat, Bookmark, PlusCircle, Search } from "lucide-react";
import { useRecipes } from "@/context/RecipeContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { searchQuery, setSearchQuery, savedRecipeIds } = useRecipes();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090d16]/90 border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <ChefHat className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tight text-white group-hover:text-orange-400 transition-colors">
            CINE<span className="text-orange-500">COOKBOOK</span>
          </span>
        </Link>

        {/* Global Live Search Input */}
        <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-full px-4 py-2 w-full sm:w-80 text-sm text-slate-300 focus-within:border-orange-500/85 transition-all">
          <Search className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (pathname !== "/") {
                router.push("/");
              }
            }}
            placeholder="Search recipes, chefs, ingredients..." 
            className="bg-transparent outline-none w-full text-slate-200 placeholder-slate-500"
          />
        </div>

        {/* Action Links */}
        <nav className="flex items-center space-x-5 text-sm font-semibold">
          <Link 
            href="/upload" 
            className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white px-4 py-2 rounded-full shadow-md shadow-orange-600/20 transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Recipe</span>
          </Link>

          <Link 
            href="/saved" 
            className="flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-full"
          >
            <Bookmark className="w-4 h-4 text-orange-400" />
            <span>Saved</span>
            {savedRecipeIds.length > 0 && (
              <span className="ml-1 text-xs font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded-full">
                {savedRecipeIds.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
