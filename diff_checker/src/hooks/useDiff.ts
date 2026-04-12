import { useMemo } from "react";
import { diffLines, diffWordsWithSpace, createTwoFilesPatch } from "diff";
import type { Change } from "diff";

export type DiffView = "side-by-side" | "unified";

export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  content: string;
  leftNum?: number;
  rightNum?: number;
  wordHighlights?: { start: number; end: number }[];
}

export interface DiffResult {
  lines: DiffLine[];
  additions: number;
  deletions: number;
  isIdentical: boolean;
}

export interface DiffOptions {
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
}

export function useDiff(
  left: string,
  right: string,
  options: DiffOptions
): DiffResult {
  return useMemo(() => {
    if (left === right) {
      const lines = left.split("\n").map((content, i) => ({
        type: "unchanged" as const,
        content,
        leftNum: i + 1,
        rightNum: i + 1,
      }));
      return { lines, additions: 0, deletions: 0, isIdentical: true };
    }

    const opts = {
      ignoreWhitespace: options.ignoreWhitespace,
      ignoreCase: options.ignoreCase,
      newlineIsToken: true,
    };
    const changes = diffLines(left, right, opts);

    let leftNum = 0;
    let rightNum = 0;
    let additions = 0;
    let deletions = 0;

    const lines: DiffLine[] = [];

    for (const change of changes) {
      const contentLines = change.value.replace(/\n$/, "").split("\n");

      for (const content of contentLines) {
        if (change.added) {
          lines.push({
            type: "added",
            content,
            rightNum: ++rightNum,
          });
          additions++;
        } else if (change.removed) {
          lines.push({
            type: "removed",
            content,
            leftNum: ++leftNum,
          });
          deletions++;
        } else {
          lines.push({
            type: "unchanged",
            content,
            leftNum: ++leftNum,
            rightNum: ++rightNum,
          });
        }
      }
    }

    return { lines, additions, deletions, isIdentical: false };
  }, [left, right, options.ignoreWhitespace, options.ignoreCase]);
}

export function computeWordHighlights(
  removedContent: string,
  addedContent: string
): { removed: { start: number; end: number }[]; added: { start: number; end: number }[] } {
  const wordDiff = diffWordsWithSpace(removedContent, addedContent) as Change[];
  const removed: { start: number; end: number }[] = [];
  const added: { start: number; end: number }[] = [];

  let ri = 0;
  let ai = 0;

  for (const part of wordDiff) {
    if (part.added) {
      added.push({ start: ai, end: ai + part.value.length });
      ai += part.value.length;
    } else if (part.removed) {
      removed.push({ start: ri, end: ri + part.value.length });
      ri += part.value.length;
    } else {
      ri += part.value.length;
      ai += part.value.length;
    }
  }

  return { removed, added };
}

export function generateUnifiedDiffString(left: string, right: string): string {
  const patch = createTwoFilesPatch("Original", "Modified", left, right);
  return patch;
}
