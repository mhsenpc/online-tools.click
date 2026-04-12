import { useState, useCallback } from "react";
import { ArrowLeftRight, X } from "lucide-react";
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
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full transition-colors",
            focused === "left" ? "bg-blue-500" : "bg-zinc-300 dark:bg-zinc-600"
          )} />
          <div className={cn(
            "w-2 h-2 rounded-full transition-colors",
            focused === "right" ? "bg-blue-500" : "bg-zinc-300 dark:bg-zinc-600"
          )} />
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={onSwap}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Swap
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        <div className="relative flex flex-col">
          <label className="absolute top-2.5 left-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 pointer-events-none z-10">
            Original
          </label>
          <textarea
            value={left}
            onChange={(e) => onLeftChange(e.target.value)}
            onFocus={() => setFocused("left")}
            onBlur={() => setFocused(null)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="w-full flex-1 resize-none rounded-lg border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 p-3 pt-8 font-mono text-[13px] leading-relaxed text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-shadow"
            placeholder="Paste original text here..."
          />
        </div>
        <div className="relative flex flex-col">
          <label className="absolute top-2.5 left-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 pointer-events-none z-10">
            Modified
          </label>
          <textarea
            value={right}
            onChange={(e) => onRightChange(e.target.value)}
            onFocus={() => setFocused("right")}
            onBlur={() => setFocused(null)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="w-full flex-1 resize-none rounded-lg border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 p-3 pt-8 font-mono text-[13px] leading-relaxed text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-shadow"
            placeholder="Paste modified text here..."
          />
        </div>
      </div>
    </div>
  );
}
