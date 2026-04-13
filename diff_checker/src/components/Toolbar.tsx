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
}: ToolbarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const unified = generateUnifiedDiffString(left, right);
    await navigator.clipboard.writeText(unified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [left, right]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white/5 border border-white/5 rounded-xl">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-1.5 p-1 bg-black rounded-lg border border-white/5">
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
          </div>

          <div className="flex items-center gap-2">
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
        </div>

        <div className="flex items-center gap-6">
          {diffResult && !diffResult.isIdentical && (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Additions</span>
                <span className="text-sm font-mono font-bold text-emerald-500">
                  +{diffResult.additions}
                </span>
              </div>
              <div className="w-px h-6 bg-white/5" />
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Deletions</span>
                <span className="text-sm font-mono font-bold text-rose-500">
                  -{diffResult.deletions}
                </span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="group flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white bg-orange-500 hover:bg-orange-600 transition-all rounded-lg shadow-lg shadow-orange-500/20"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied Diff</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Unified Diff</span>
              </>
            )}
          </button>
        </div>
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
        "flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
        active
          ? "bg-white/10 text-white shadow-inner"
          : "text-zinc-500 hover:text-zinc-300"
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
        "flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all",
        active
          ? "bg-orange-500/10 border-orange-500/50 text-orange-500"
          : "bg-white/5 border-transparent text-zinc-500 hover:text-zinc-300"
      )}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}