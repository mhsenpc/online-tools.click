import {
  Columns2,
  Rows3,
  CaseSensitive,
  Space,
  Copy,
  Check,
} from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "../lib/cn";
import type { DiffView, DiffOptions, DiffResult } from "../hooks/useDiff";
import { generateUnifiedDiffString } from "../hooks/useDiff";

interface ToolbarProps {
  view: DiffView;
  onViewChange: (view: DiffView) => void;
  options: DiffOptions;
  onOptionsChange: (options: DiffOptions) => void;
  diffResult: DiffResult | null;
  left: string;
  right: string;
  onBack: () => void;
}

export function Toolbar({
  view,
  onViewChange,
  options,
  onOptionsChange,
  diffResult,
  left,
  right,
  onBack,
}: ToolbarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const unified = generateUnifiedDiffString(left, right);
    await navigator.clipboard.writeText(unified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [left, right]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          &larr; Edit Inputs
        </button>

        {diffResult && !diffResult.isIdentical && (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              +{diffResult.additions}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400">
              -{diffResult.deletions}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-1">
          <ViewToggle
            active={view === "side-by-side"}
            onClick={() => onViewChange("side-by-side")}
            icon={<Columns2 className="w-3.5 h-3.5" />}
            label="Side by side"
          />
          <ViewToggle
            active={view === "unified"}
            onClick={() => onViewChange("unified")}
            icon={<Rows3 className="w-3.5 h-3.5" />}
            label="Unified"
          />

          <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1.5" />

          <OptionToggle
            active={options.ignoreCase}
            onClick={() =>
              onOptionsChange({ ...options, ignoreCase: !options.ignoreCase })
            }
            icon={<CaseSensitive className="w-3.5 h-3.5" />}
            label="Ignore case"
          />
          <OptionToggle
            active={options.ignoreWhitespace}
            onClick={() =>
              onOptionsChange({
                ...options,
                ignoreWhitespace: !options.ignoreWhitespace,
              })
            }
            icon={<Space className="w-3.5 h-3.5" />}
            label="Ignore whitespace"
          />
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md border border-zinc-200 dark:border-zinc-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy Diff
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ViewToggle({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors",
        active
          ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
          : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function OptionToggle({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors",
        active
          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
          : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
