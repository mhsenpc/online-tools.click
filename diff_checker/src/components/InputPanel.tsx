import { useState, useCallback } from "react";
import { ArrowLeftRight, Trash2 } from "lucide-react";
import { cn } from "../lib/cn";

interface InputPanelProps {
  left: string;
  right: string;
  onLeftChange: (value: string) => void;
  onRightChange: (value: string) => void;
  onSwap: () => void;
  onClear: () => void;
}

export function InputPanel({
  left,
  right,
  onLeftChange,
  onRightChange,
  onSwap,
  onClear,
}: InputPanelProps) {
  const [focused, setFocused] = useState<"left" | "right" | null>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        const form = e.currentTarget.closest("form");
        if (form) form.requestSubmit();
      }
    },
    []
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex gap-3">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full transition-all duration-300",
            focused === "left" ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" : "bg-white/10"
          )} />
          <div className={cn(
            "w-1.5 h-1.5 rounded-full transition-all duration-300",
            focused === "right" ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" : "bg-white/10"
          )} />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSwap}
            className="group flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-none border border-white/5 transition-all"
          >
            <ArrowLeftRight className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
            Swap
          </button>
          <button
            type="button"
            onClick={onClear}
            className="group flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-rose-500 bg-white/5 hover:bg-rose-500/10 rounded-none border border-white/5 transition-all"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="relative flex flex-col group">
          <div className={cn(
            "absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
            focused === "left" && "opacity-100"
          )} />
          <label className="absolute top-3 left-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 pointer-events-none z-10">
            Original Text
          </label>
          <textarea
            value={left}
            onChange={(e) => onLeftChange(e.target.value)}
            onFocus={() => setFocused("left")}
            onBlur={() => setFocused(null)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="w-full flex-1 resize-none bg-transparent border border-white/10 hover:border-white/20 p-4 pt-10 font-mono text-[13px] leading-relaxed text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-orange-500/50 transition-all"
            placeholder="Paste original content here..."
          />
        </div>
        <div className="relative flex flex-col group">
          <div className={cn(
            "absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
            focused === "right" && "opacity-100"
          )} />
          <label className="absolute top-3 left-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 pointer-events-none z-10">
            Modified Text
          </label>
          <textarea
            value={right}
            onChange={(e) => onRightChange(e.target.value)}
            onFocus={() => setFocused("right")}
            onBlur={() => setFocused(null)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="w-full flex-1 resize-none bg-transparent border border-white/10 hover:border-white/20 p-4 pt-10 font-mono text-[13px] leading-relaxed text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-orange-500/50 transition-all"
            placeholder="Paste modified content here..."
          />
        </div>
      </div>
    </div>
  );
}
