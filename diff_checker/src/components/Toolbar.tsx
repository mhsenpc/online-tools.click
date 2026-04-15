import React from 'react';
import { 
  ArrowLeftRight, 
  Eraser, 
  Play, 
  ChevronLeft, 
  Split, 
  LayoutList, 
  Settings2,
  Check
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ToolbarProps {
  showDiff: boolean;
  onReset: () => void;
  onDiff: () => void;
  onSwap: () => void;
  onClear: () => void;
  viewMode: 'side-by-side' | 'unified';
  setViewMode: (mode: 'side-by-side' | 'unified') => void;
  options: {
    ignoreWhitespace: boolean;
    ignoreCase: boolean;
  };
  setOptions: React.Dispatch<React.SetStateAction<{
    ignoreWhitespace: boolean;
    ignoreCase: boolean;
  }>>;
  summary: { additions: number; deletions: number };
}

const Toolbar: React.FC<ToolbarProps> = ({
  showDiff,
  onReset,
  onDiff,
  onSwap,
  onClear,
  viewMode,
  setViewMode,
  options,
  setOptions,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm sticky top-20 z-40">
      <div className="flex items-center gap-2">
        {!showDiff ? (
          <>
            <button
              onClick={onDiff}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all shadow-lg shadow-emerald-500/10 active:scale-95 group"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              Compare
            </button>
            <button
              onClick={onSwap}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Swap original and modified text"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClear}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-rose-950/30 hover:text-rose-400 text-zinc-400 transition-all"
              title="Clear all"
            >
              <Eraser className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to edit
          </button>
        )}
      </div>

      <div className="flex items-center gap-6 divide-x divide-zinc-800">
        {/* Settings Toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-zinc-500 cursor-pointer hover:text-zinc-300 select-none">
            <input
              type="checkbox"
              className="hidden peer"
              checked={options.ignoreWhitespace}
              onChange={(e) => setOptions(o => ({ ...o, ignoreWhitespace: e.target.checked }))}
            />
            <div className="w-4 h-4 rounded border border-zinc-700 flex items-center justify-center peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors">
              <Check className="w-3 h-3 text-zinc-950 hidden peer-checked:block" />
            </div>
            Ignore Whitespace
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-zinc-500 cursor-pointer hover:text-zinc-300 select-none">
            <input
              type="checkbox"
              className="hidden peer"
              checked={options.ignoreCase}
              onChange={(e) => setOptions(o => ({ ...o, ignoreCase: e.target.checked }))}
            />
            <div className="w-4 h-4 rounded border border-zinc-700 flex items-center justify-center peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors">
              <Check className="w-3 h-3 text-zinc-950 hidden peer-checked:block" />
            </div>
            Ignore Case
          </label>
        </div>

        {/* View Mode Switcher */}
        <div className="pl-6 flex items-center gap-1 bg-zinc-950/50 p-1 rounded-xl border border-zinc-800/50">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={twMerge(
              clsx(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                viewMode === 'side-by-side' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
              )
            )}
          >
            <Split className="w-3.5 h-3.5" />
            Side-by-side
          </button>
          <button
            onClick={() => setViewMode('unified')}
            className={twMerge(
              clsx(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                viewMode === 'unified' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
              )
            )}
          >
            <LayoutList className="w-3.5 h-3.5" />
            Unified
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
