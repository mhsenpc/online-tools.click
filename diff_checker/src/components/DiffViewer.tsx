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
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="p-3 rounded-full bg-emerald-500/10">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            No Differences Found
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Both texts are identical.
          </p>
        </div>
      </div>
    );
  }

  if (view === "side-by-side") {
    return <SideBySideView lines={result.lines} />;
  }

  return <UnifiedView lines={result.lines} />;
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
    <div className="grid grid-cols-2 divide-x divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        {paired.map((pair, i) => (
          <DiffLineRow
            key={`l-${i}`}
            line={pair.left}
            side="left"
            pairedLine={pair.right}
          />
        ))}
      </div>
      <div className="overflow-x-auto">
        {paired.map((pair, i) => (
          <DiffLineRow
            key={`r-${i}`}
            line={pair.right}
            side="right"
            pairedLine={pair.left}
          />
        ))}
      </div>
    </div>
  );
}

function UnifiedView({ lines }: { lines: DiffLine[] }) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-x-auto">
      {lines.map((line, i) => (
        <DiffLineRow key={i} line={line} side="unified" />
      ))}
    </div>
  );
}

function DiffLineRow({
  line,
  side,
}: {
  line: DiffLine | null;
  side: "left" | "right" | "unified";
  pairedLine?: DiffLine | null;
}) {
  const renderContent = useCallback(
    (l: DiffLine) => {
      if (!l.wordHighlights || l.wordHighlights.length === 0) {
        return l.content;
      }

      let result: React.ReactNode[] = [];
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
          <span
            key={`h-${hl.start}`}
            className={cn(
              l.type === "removed"
                ? "bg-rose-500/20 text-rose-600 dark:text-rose-300"
                : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"
            )}
          >
            {l.content.slice(hl.start, hl.end)}
          </span>
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
      <div className="flex min-h-[22px]">
        <LineNum num={undefined} />
        <LineNum num={undefined} />
        <span className="flex-1 px-3 py-px font-mono text-[13px] leading-relaxed text-zinc-300 dark:text-zinc-700">
          {"\u00A0"}
        </span>
      </div>
    );
  }

  const isRemoved = line.type === "removed";
  const isAdded = line.type === "added";

  return (
    <div
      className={cn(
        "flex min-h-[22px]",
        isRemoved && "bg-rose-500/8 dark:bg-rose-500/10",
        isAdded && "bg-emerald-500/8 dark:bg-emerald-500/10"
      )}
    >
      {side === "unified" ? (
        <>
          <LineNum num={line.leftNum} />
          <LineNum num={line.rightNum} />
          <SignBadge type={line.type} />
          <span
            className={cn(
              "flex-1 px-2 py-px font-mono text-[13px] leading-relaxed whitespace-pre",
              isRemoved && "text-rose-700 dark:text-rose-300",
              isAdded && "text-emerald-700 dark:text-emerald-300",
              line.type === "unchanged" &&
                "text-zinc-700 dark:text-zinc-300"
            )}
          >
            {line.wordHighlights ? renderContent(line) : line.content}
          </span>
        </>
      ) : (
        <>
          <LineNum num={side === "left" ? line.leftNum : line.rightNum} />
          <span
            className={cn(
              "flex-1 px-3 py-px font-mono text-[13px] leading-relaxed whitespace-pre",
              isRemoved && "text-rose-700 dark:text-rose-300",
              isAdded && "text-emerald-700 dark:text-emerald-300",
              line.type === "unchanged" &&
                "text-zinc-700 dark:text-zinc-300"
            )}
          >
            {line.wordHighlights ? renderContent(line) : line.content}
          </span>
        </>
      )}
    </div>
  );
}

function LineNum({ num }: { num: number | undefined }) {
  return (
    <span className="w-10 shrink-0 text-right pr-2 py-px select-none font-mono text-[11px] leading-relaxed text-zinc-400/60 dark:text-zinc-600/60 bg-zinc-50/50 dark:bg-zinc-900/50">
      {num ?? ""}
    </span>
  );
}

function SignBadge({ type }: { type: DiffLine["type"] }) {
  return (
    <span
      className={cn(
        "w-5 shrink-0 text-center py-px select-none font-mono text-[13px] font-bold leading-relaxed",
        type === "removed" && "text-rose-500",
        type === "added" && "text-emerald-500",
        type === "unchanged" && "text-zinc-300 dark:text-zinc-700"
      )}
    >
      {type === "removed" ? "-" : type === "added" ? "+" : " "}
    </span>
  );
}
