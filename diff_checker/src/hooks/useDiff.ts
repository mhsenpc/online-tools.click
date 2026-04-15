import { useMemo } from 'react';
import { diffLines, diffWordsWithSpace, Change } from 'diff';

export interface DiffLine {
  content: string;
  type: 'addition' | 'deletion' | 'neutral';
  lineNumberOriginal?: number;
  lineNumberModified?: number;
  words?: Change[];
}

export interface DiffOptions {
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
}

export const useDiff = (
  original: string,
  modified: string,
  options: DiffOptions
) => {
  return useMemo(() => {
    const changes = diffLines(original, modified, {
      ignoreWhitespace: options.ignoreWhitespace,
      ignoreCase: options.ignoreCase,
    });

    const diffLinesArray: DiffLine[] = [];
    let originalLine = 1;
    let modifiedLine = 1;

    changes.forEach((change) => {
      const lines = change.value.split('\n');
      if (lines[lines.length - 1] === '') lines.pop();

      lines.forEach((line) => {
        if (change.added) {
          diffLinesArray.push({
            content: line,
            type: 'addition',
            lineNumberModified: modifiedLine++,
          });
        } else if (change.removed) {
          diffLinesArray.push({
            content: line,
            type: 'deletion',
            lineNumberOriginal: originalLine++,
          });
        } else {
          diffLinesArray.push({
            content: line,
            type: 'neutral',
            lineNumberOriginal: originalLine++,
            lineNumberModified: modifiedLine++,
          });
        }
      });
    });

    // Word-level diffing for additions/deletions that are paired
    // We'll pair deletion lines with addition lines and compute word diffs
    const enhancedDiffLines = diffLinesArray.map((line, idx) => {
      if (line.type === 'neutral') return line;

      // Look for the next or previous line of opposite type to pair with
      let pairLine: DiffLine | null = null;
      let pairIdx = -1;

      if (line.type === 'deletion') {
        // Look ahead for additions
        for (let i = idx + 1; i < diffLinesArray.length; i++) {
          if (diffLinesArray[i].type === 'addition') {
            pairLine = diffLinesArray[i];
            pairIdx = i;
            break;
          } else if (diffLinesArray[i].type === 'neutral') {
            break;
          }
        }
      } else if (line.type === 'addition') {
        // Look behind for deletions
        for (let i = idx - 1; i >= 0; i--) {
          if (diffLinesArray[i].type === 'deletion') {
            pairLine = diffLinesArray[i];
            pairIdx = i;
            break;
          } else if (diffLinesArray[i].type === 'neutral') {
            break;
          }
        }
      }

      if (pairLine && !line.words) {
        // Compute word-level diff
        const wordDiff = diffWordsWithSpace(
          line.type === 'deletion' ? line.content : '',
          line.type === 'addition' ? line.content : ''
        );

        // Mark both lines with word diff info
        line.words = wordDiff;
        pairLine.words = wordDiff;
      }

      return line;
    });

    const summary = {
      additions: changes.filter(c => c.added).reduce((acc, c) => acc + (c.count || 0), 0),
      deletions: changes.filter(c => c.removed).reduce((acc, c) => acc + (c.count || 0), 0),
    };

    return {
      diffLines: enhancedDiffLines,
      summary,
    };
  }, [original, modified, options]);
};
