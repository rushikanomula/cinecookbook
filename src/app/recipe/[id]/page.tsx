"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useRecipes } from "@/context/RecipeContext";
import VideoPlayer, { VideoPlayerRef } from "@/components/VideoPlayer";
import RecipeSteps from "@/components/RecipeSteps";
import IngredientScaler from "@/components/IngredientScaler";
import { ThumbsUp, ThumbsDown, Bookmark, Clock, Flame, Users, Send, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = params.id as string;
  const { getRecipeById, voteRecipe, userVotes, savedRecipeIds, toggleSaveRecipe, addComment } = useRecipes();

  const recipe = getRecipeById(recipeId);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [servings, setServings] = useState(recipe?.servings || 2);
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const videoPlayerRef = useRef<VideoPlayerRef>(null);

  if (!recipe) {
    return (
      <div className="text-center py-20 space-y-4">
        <h1 className="text-2xl font-bold text-white">Recipe Not Found</h1>
        <Link href="/" className="inline-block bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full">
          Return to Studio Homepage
        </Link>
      </div>
    );
  }

  const userVote = userVotes[recipe.id];
  const isSaved = savedRecipeIds.includes(recipe.id);

  const handleSeekToStep = (time: number, index: number) => {
    setActiveStepIndex(index);
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(time);
      videoPlayerRef.current.play();
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(recipe.id, commentText, authorName);
    setCommentText("");
  };

  return (
    <div className="space-y-8">
      
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <Link href="/" className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-orange-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Masterclasses</span>
        </Link>
        <span className="text-xs text-slate-500 font-mono">ID: {recipe.id}</span>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {recipe.title}
        </h1>

        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {recipe.chef.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-200">{recipe.chef}</p>
              <p className="text-xs text-slate-400">{recipe.chefRole}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden p-1">
              <button 
                onClick={() => voteRecipe(recipe.id, "like")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  userVote === "like" 
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{recipe.likes}</span>
              </button>
              <div className="h-4 w-px bg-slate-800 my-auto" />
              <button 
                onClick={() => voteRecipe(recipe.id, "dislike")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  userVote === "dislike" 
                    ? "bg-slate-700 text-white" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>{recipe.dislikes}</span>
              </button>
            </div>

            <button 
              onClick={() => toggleSaveRecipe(recipe.id)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-2xl text-xs font-bold border transition-all ${
                isSaved 
                  ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20" 
                  : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
              <span>{isSaved ? "Saved" : "Bookmark"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <VideoPlayer 
            ref={videoPlayerRef} 
            src={recipe.videoUrl} 
            poster={recipe.posterUrl}
            onTimeUpdate={(t) => {
              const currentStepIdx = recipe.steps.reduce((acc, step, idx) => t >= step.time ? idx : acc, 0);
              if (currentStepIdx !== activeStepIndex) setActiveStepIndex(currentStepIdx);
            }}
          />

          <IngredientScaler 
            baseServings={recipe.servings} 
            currentServings={servings} 
            onServingsChange={setServings} 
            ingredients={recipe.ingredients}
          />

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 space-y-6 backdrop-blur-md">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
              <MessageSquare className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-bold text-white">Community Discussion ({recipe.comments.length})</h2>
            </div>

            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <input 
                type="text" 
                placeholder="Your Name / Handle" 
                value={authorName} 
                onChange={(e) => setAuthorName(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 outline-none focus:border-orange-500"
              />
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Share cooking tips or feedback..." 
                  value={commentText} 
                  onChange={(e) => setCommentText(e.target.value)} 
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-orange-500"
                />
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-xl text-xs font-bold flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="space-y-3 pt-2">
              {recipe.comments.map((comment) => (
                <div key={comment.id} className="p-3.5 rounded-2xl bg-slate-800/30 border border-slate-800/60 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-orange-400">{comment.author}</span>
                    <span className="text-slate-500 font-mono text-[10px]">{comment.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl sticky top-24">
          <RecipeSteps 
            steps={recipe.steps} 
            activeStepIndex={activeStepIndex}
            onSelectStep={handleSeekToStep}
          />
        </div>
      </div>
    </div>
  );
}
