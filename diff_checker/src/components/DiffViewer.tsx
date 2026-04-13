import { useMemo, useCallback } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../lib/cn";
import type { DiffLine, DiffResult, DiffView } from "../hooks/useDiff";
import { computeWordHighlights } from "../hooks/useDiff";

interface DiffViewerProps {
  result: DiffResult;
  view: DiffView;
}

export function DiffViewer({ result, view }: DiffViewerProps) {
  if (result.isIdentical) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6 animate-in fade-in zoom-in duration-700">
        <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold tracking-tight text-white mb-2">
            Identical Content
          </h3>
          <p className="text-zinc-500 text-sm max-w-[300px] mx-auto leading-relaxed">
            No differences found between the original and modified text snippets.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#080808] font-mono selection:bg-orange-500/30">
      {view === "side-by-side" ? (
        <SideBySideView lines={result.lines} />
      ) : (
        <UnifiedView lines={result.lines} />
      )}
    </div>
  );
}

function SideBySideView({ lines }: { lines: DiffLine[] }) {
  const paired = useMemo(() => {
    const pairs: { left: DiffLine | null; right: DiffLine | null }[] = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.type === "unchanged") {
        pairs.push({ left: line, right: line });
        i++;
      } else if (line.type === "removed") {
        const removedBatch: DiffLine[] = [];
        while (i < lines.length && lines[i].type === "removed") {
          removedBatch.push(lines[i]);
          i++;
        }
        const addedBatch: DiffLine[] = [];
        while (i < lines.length && lines[i].type === "added") {
          addedBatch.push(lines[i]);
          i++;
        }
        const maxLen = Math.max(removedBatch.length, addedBatch.length);
        for (let j = 0; j < maxLen; j++) {
          const left = j < removedBatch.length ? removedBatch[j] : null;
          const right = j < addedBatch.length ? addedBatch[j] : null;

          if (left && right) {
            const highlights = computeWordHighlights(left.content, right.content);
            pairs.push({
              left: { ...left, wordHighlights: highlights.removed },
              right: { ...right, wordHighlights: highlights.added },
            });
          } else {
            pairs.push({ left, right });
          }
        }
      } else if (line.type === "added") {
        pairs.push({ left: null, right: line });
        i++;
      } else {
        i++;
      }
    }
    return pairs;
  }, [lines]);

  return (
    <div className="grid grid-cols-2 h-full divide-x divide-white/5 overflow-hidden">
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="min-w-full">
          {paired.map((pair, i) => (
            <DiffLineRow
              key={`l-${i}`}
              line={pair.left}
              side="left"
            />
          ))}
        </div>
      </div>
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="min-w-full">
          {paired.map((pair, i) => (
            <DiffLineRow
              key={`r-${i}`}
              line={pair.right}
              side="right"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function UnifiedView({ lines }: { lines: DiffLine[] }) {
  return (
    <div className="overflow-auto h-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      <div className="min-w-full">
        {lines.map((line, i) => (
          <DiffLineRow key={i} line={line} side="unified" />
        ))}
      </div>
    </div>
  );
}

function DiffLineRow({
  line,
  side,
}: {
  line: DiffLine | null;
  side: "left" | "right" | "unified";
}) {
  const renderContent = useCallback(
    (l: DiffLine) => {
      if (!l.wordHighlights || l.wordHighlights.length === 0) {
        return l.content;
      }

      const result: React.ReactNode[] = [];
      let pos = 0;

      for (const hl of l.wordHighlights) {
        if (pos < hl.start) {
          result.push(
            <span key={`t-${pos}`}>
              {l.content.slice(pos, hl.start)}
            </span>
          );
        }
        result.push(
          <mark
            key={`h-${hl.start}`}
            className={cn(
              "p-0 rounded-sm bg-transparent",
              l.type === "removed"
                ? "bg-rose-500/40 text-white"
                : "bg-emerald-500/40 text-white"
            )}
          >
            {l.content.slice(hl.start, hl.end)}
          </mark>
        );
        pos = hl.end;
      }

      if (pos < l.content.length) {
        result.push(
          <span key={`t-${pos}`}>{l.content.slice(pos)}</span>
        );
      }

      return result;
    },
    []
  );

  if (!line) {
    return (
      <div className="flex min-h-[22px] bg-white/[0.02]">
        <LineNum num={undefined} />
        <span className="flex-1 px-3 py-px font-mono text-[12px] leading-relaxed opacity-20 select-none">
          ~
        </span>
      </div>
    );
  }

  const isRemoved = line.type === "removed";
  const isAdded = line.type === "added";

  return (
    <div
      className={cn(
        "flex min-h-[22px] group transition-colors",
        isRemoved && "bg-rose-500/10 hover:bg-rose-500/15",
        isAdded && "bg-emerald-500/10 hover:bg-emerald-500/15",
        !isRemoved && !isAdded && "hover:bg-white/[0.03]"
      )}
    >
      {side === "unified" ? (
        <>
          <LineNum num={line.leftNum} className="border-r border-white/5" />
          <LineNum num={line.rightNum} className="border-r border-white/5" />
          <SignBadge type={line.type} />
          <span
            className={cn(
              "flex-1 px-3 py-px font-mono text-[12px] leading-relaxed whitespace-pre",
              isRemoved && "text-rose-400",
              isAdded && "text-emerald-400",
              line.type === "unchanged" && "text-zinc-400"
            )}
          >
            {line.wordHighlights ? renderContent(line) : line.content || " "}
          </span>
        </>
      ) : (
        <>
          <LineNum num={side === "left" ? line.leftNum : line.rightNum} className="border-r border-white/5" />
          <span
            className={cn(
              "flex-1 px-4 py-px font-mono text-[12px] leading-relaxed whitespace-pre",
              isRemoved && "text-rose-400",
              isAdded && "text-emerald-400",
              line.type === "unchanged" && "text-zinc-400"
            )}
          >
            {line.wordHighlights ? renderContent(line) : line.content || " "}
          </span>
        </>
      )}
    </div>
  );
}

function LineNum({ num, className }: { num: number | undefined; className?: string }) {
  return (
    <span className={cn(
      "w-12 shrink-0 text-right pr-3 py-px select-none font-mono text-[10px] leading-relaxed text-zinc-600 bg-black/40",
      className
    )}>
      {num ?? ""}
    </span>
  );
}

function SignBadge({ type }: { type: DiffLine["type"] }) {
  return (
    <span
      className={cn(
        "w-6 shrink-0 flex items-center justify-center py-px select-none font-mono text-[12px] font-bold leading-relaxed",
        type === "removed" && "text-rose-500 bg-rose-500/10",
        type === "added" && "text-emerald-500 bg-emerald-500/10",
        type === "unchanged" && "text-zinc-800"
      )}
    >
      {type === "removed" ? "-" : type === "added" ? "+" : " "}
    </span>
  );
}