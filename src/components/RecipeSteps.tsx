"use client";

import { Play, CheckCircle2, Clock } from "lucide-react";
import { Step } from "@/types/recipe";
import { formatTime } from "@/lib/utils";

interface RecipeStepsProps {
  steps: Step[];
  activeStepIndex: number;
  onSelectStep: (time: number, index: number) => void;
}

export default function RecipeSteps({ steps, activeStepIndex, onSelectStep }: RecipeStepsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">Timeline & Steps</h2>
        <span className="text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full font-medium">
          {steps.length} Key Steps
        </span>
      </div>

      <div className="space-y-2.5">
        {steps.map((step, idx) => {
          const isActive = activeStepIndex === idx;
          const isPassed = activeStepIndex > idx;

          return (
            <div
              key={idx}
              onClick={() => onSelectStep(step.time, idx)}
              className={`group flex items-start space-x-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-orange-950/40 to-slate-900 border-orange-500/60 shadow-lg shadow-orange-500/10"
                  : isPassed
                  ? "bg-slate-900/30 border-slate-800/50 opacity-70 hover:opacity-100"
                  : "bg-slate-900/40 border-slate-800/60 hover:bg-slate-800/60 hover:border-slate-700"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isPassed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? "bg-orange-500 text-white" : "bg-slate-800 text-slate-400"
                  }`}>
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xs font-bold truncate ${isActive ? "text-orange-400" : "text-slate-200"}`}>
                    {step.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {formatTime(step.time)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
