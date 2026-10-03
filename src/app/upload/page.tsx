"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecipes } from "@/context/RecipeContext";
import { Plus, Trash2, Sparkles, ArrowLeft, Video, Image as ImageIcon, Upload } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const router = useRouter();
  const { addRecipe } = useRecipes();

  const [title, setTitle] = useState("");
  const [chef, setChef] = useState("");
  const [category, setCategory] = useState("Italian");
  const [duration, setDuration] = useState("30 mins");
  const [servings, setServings] = useState(2);
  const [videoUrl, setVideoUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedVideoName, setUploadedVideoName] = useState("");

  const [ingredients, setIngredients] = useState([
    { item: "Extra Virgin Olive Oil", amount: 15, unit: "ml" }
  ]);

  const [steps, setSteps] = useState([
    { time: 0, title: "Preparation", description: "Mise en place and ingredients setup.", durationText: "5 mins" }
  ]);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedVideoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setVideoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { item: "", amount: 1, unit: "g" }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    setSteps([...steps, { time: steps.length * 15, title: "", description: "", durationText: "10 mins" }]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !chef) return;

    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

    const finalVideoUrl = videoUrl.trim() || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
    const finalPosterUrl = posterUrl.trim() || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop";

    addRecipe({
      id,
      title,
      chef,
      chefRole: "Creator & Community Chef",
      category,
      duration,
      servings: Number(servings),
      difficulty: "Intermediate",
      calories: "550 kcal",
      videoUrl: finalVideoUrl,
      posterUrl: finalPosterUrl,
      description,
      likes: 1,
      dislikes: 0,
      ingredients,
      steps,
      comments: []
    });

    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-5">
        <Link href="/" className="p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-800">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            Upload Video & Publish Recipe
          </h1>
          <p className="text-xs text-slate-400">Upload your video file directly from your computer and share your recipe with the community.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Recipe Title *</label>
            <input 
              required 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g. Grandma's Secret Pasta" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-orange-500" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Chef Name *</label>
            <input 
              required 
              type="text" 
              value={chef} 
              onChange={e => setChef(e.target.value)} 
              placeholder="e.g. Chef Alex" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-orange-500" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Category</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-orange-500"
            >
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Bakery">Bakery</option>
              <option value="Mexican">Mexican</option>
              <option value="Dessert">Dessert</option>
              <option value="Quick & Easy">Quick & Easy</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Servings & Duration</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={duration} 
                onChange={e => setDuration(e.target.value)} 
                placeholder="30 mins" 
                className="w-1/2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-orange-500" 
              />
              <input 
                type="number" 
                min={1} 
                value={servings} 
                onChange={e => setServings(Number(e.target.value))} 
                placeholder="Servings" 
                className="w-1/2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-orange-500" 
              />
            </div>
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="space-y-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Video className="w-4 h-4 text-orange-400" /> Upload Video File (.mp4, .mov, .webm)
          </label>
          
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all">
              <Upload className="w-4 h-4" />
              <span>Choose Video File</span>
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleVideoFileChange} 
                className="hidden" 
              />
            </label>
            <span className="text-xs text-slate-400 truncate max-w-xs">
              {uploadedVideoName ? `Selected: ${uploadedVideoName}` : "No file chosen (uses default test stream if empty)"}
            </span>
          </div>

          <div className="pt-2">
            <label className="text-[11px] text-slate-400">Or Paste Direct Video URL / Stream Link:</label>
            <input 
              type="text" 
              value={videoUrl.startsWith("data:") ? "" : videoUrl} 
              onChange={e => setVideoUrl(e.target.value)} 
              placeholder="https://..." 
              className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 outline-none focus:border-orange-500" 
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-orange-400" /> Poster Cover Image URL
          </label>
          <input 
            type="text" 
            value={posterUrl} 
            onChange={e => setPosterUrl(e.target.value)} 
            placeholder="https://images.unsplash.com/..." 
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-orange-500" 
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Recipe Description *</label>
          <textarea 
            required
            rows={3} 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Describe what makes this dish special..." 
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-orange-500"
          />
        </div>

        {/* Ingredients Builder */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">Ingredients</h3>
            <button type="button" onClick={handleAddIngredient} className="text-xs text-orange-400 hover:underline flex items-center gap-1 font-bold">
              <Plus className="w-3.5 h-3.5" /> Add Ingredient
            </button>
          </div>

          {ingredients.map((ing, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Item name" 
                value={ing.item} 
                onChange={e => {
                  const copy = [...ingredients];
                  copy[idx].item = e.target.value;
                  setIngredients(copy);
                }} 
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" 
              />
              <input 
                type="number" 
                placeholder="Qty" 
                value={ing.amount} 
                onChange={e => {
                  const copy = [...ingredients];
                  copy[idx].amount = Number(e.target.value);
                  setIngredients(copy);
                }} 
                className="w-20 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" 
              />
              <input 
                type="text" 
                placeholder="Unit (g, ml)" 
                value={ing.unit} 
                onChange={e => {
                  const copy = [...ingredients];
                  copy[idx].unit = e.target.value;
                  setIngredients(copy);
                }} 
                className="w-20 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" 
              />
              {ingredients.length > 1 && (
                <button type="button" onClick={() => handleRemoveIngredient(idx)} className="text-slate-500 hover:text-red-400 p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Steps Builder */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">Video Chapters / Steps</h3>
            <button type="button" onClick={handleAddStep} className="text-xs text-orange-400 hover:underline flex items-center gap-1 font-bold">
              <Plus className="w-3.5 h-3.5" /> Add Step
            </button>
          </div>

          {steps.map((st, idx) => (
            <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Step Title" 
                  value={st.title} 
                  onChange={e => {
                    const copy = [...steps];
                    copy[idx].title = e.target.value;
                    setSteps(copy);
                  }} 
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none" 
                />
                <input 
                  type="number" 
                  placeholder="Time (sec)" 
                  value={st.time} 
                  onChange={e => {
                    const copy = [...steps];
                    copy[idx].time = Number(e.target.value);
                    setSteps(copy);
                  }} 
                  className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none" 
                />
                {steps.length > 1 && (
                  <button type="button" onClick={() => handleRemoveStep(idx)} className="text-slate-500 hover:text-red-400 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <input 
                type="text" 
                placeholder="Step instructions..." 
                value={st.description} 
                onChange={e => {
                  const copy = [...steps];
                  copy[idx].description = e.target.value;
                  setSteps(copy);
                }} 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none" 
              />
            </div>
          ))}
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3 rounded-2xl shadow-xl shadow-orange-600/20 transition-all"
        >
          Publish & Show on Homepage
        </button>
      </form>
    </div>
  );
}
