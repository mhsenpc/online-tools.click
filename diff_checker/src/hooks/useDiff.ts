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
    // This is a bit complex for a basic diff, but we can do it line-by-line if we find pairs.
    // For simplicity, we'll keep it to line level first, and maybe add word highlighting later.
    
    const summary = {
      additions: changes.filter(c => c.added).reduce((acc, c) => acc + (c.count || 0), 0),
      deletions: changes.filter(c => c.removed).reduce((acc, c) => acc + (c.count || 0), 0),
    };

    return {
      diffLines: diffLinesArray,
      summary,
    };
  }, [original, modified, options]);
};
