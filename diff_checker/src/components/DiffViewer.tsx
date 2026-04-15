import React, { useMemo } from 'react';
import { DiffLine } from '../hooks/useDiff';
import { clsx } from 'clsx';

interface DiffViewerProps {
  diffLines: DiffLine[];
  viewMode: 'side-by-side' | 'unified';
}

const DiffViewer: React.FC<DiffViewerProps> = ({ diffLines, viewMode }) => {
  // If we're in side-by-side mode, we need to pair lines
  const pairedLines = useMemo(() => {
    if (viewMode === 'unified') return null;

    const left: (DiffLine | null)[] = [];
    const right: (DiffLine | null)[] = [];
    
    // Simple pairing logic: if we have a deletion followed by an addition,
    // they might be related. But more generally, we need to track both pointers.
    let i = 0;
    while (i < diffLines.length) {
      const current = diffLines[i];
      if (current.type === 'neutral') {
        left.push(current);
        right.push(current);
        i++;
      } else if (current.type === 'deletion') {
        // Look ahead for additions
        let j = i;
        const deletions: DiffLine[] = [];
        while (j < diffLines.length && diffLines[j].type === 'deletion') {
          deletions.push(diffLines[j]);
          j++;
        }
        
        const additions: DiffLine[] = [];
        while (j < diffLines.length && diffLines[j].type === 'addition') {
          additions.push(diffLines[j]);
          j++;
        }

        const max = Math.max(deletions.length, additions.length);
        for (let k = 0; k < max; k++) {
          left.push(deletions[k] || null);
          right.push(additions[k] || null);
        }
        i = j;
      } else if (current.type === 'addition') {
        left.push(null);
        right.push(current);
        i++;
      }
    }

    return { left, right };
  }, [diffLines, viewMode]);

  if (viewMode === 'unified') {
    return (
      <div className="w-full border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950/50">
        <div className="flex flex-col">
          {diffLines.length === 0 && (
            <div className="p-12 text-center text-zinc-600 italic">No differences found</div>
          )}
          {diffLines.map((line, idx) => (
            <div 
              key={idx} 
              className={clsx(
                "diff-line group hover:bg-zinc-900/40 transition-colors",
                line.type === 'addition' && "diff-addition",
                line.type === 'deletion' && "diff-deletion"
              )}
            >
              <div className="diff-gutter opacity-40 group-hover:opacity-100 transition-opacity">
                {line.lineNumberOriginal || ''}
              </div>
              <div className="diff-gutter opacity-40 group-hover:opacity-100 transition-opacity">
                {line.lineNumberModified || ''}
              </div>
              <div className="flex-none px-2 select-none text-zinc-700 font-bold w-6 text-center">
                {line.type === 'addition' ? '+' : line.type === 'deletion' ? '-' : ' '}
              </div>
              <div className="diff-content font-mono">
                {line.words && line.words.length > 0 ? (
                  line.words.map((word, wordIdx) => (
                    <span
                      key={wordIdx}
                      className={clsx(
                        word.added && "diff-word-addition",
                        word.removed && "diff-word-deletion"
                      )}
                    >
                      {word.value}
                    </span>
                  ))
                ) : (
                  line.content || ' '
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-zinc-800 rounded-2xl overflow-hidden flex divide-x divide-zinc-900 bg-zinc-950/50">
      {/* Left Panel (Original) */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-widest">Original</div>
        {pairedLines?.left.map((line, idx) => (
          <div 
            key={idx} 
            className={clsx(
              "diff-line group h-6 hover:bg-zinc-900/40 transition-colors",
              line?.type === 'deletion' && "diff-deletion",
              !line && "bg-zinc-900/20"
            )}
          >
            <div className="diff-gutter opacity-40 group-hover:opacity-100 transition-opacity">
              {line?.lineNumberOriginal || ''}
            </div>
            <div className="diff-content font-mono">
              {line?.words && line.words.length > 0 ? (
                line.words.map((word, wordIdx) => (
                  <span
                    key={wordIdx}
                    className={clsx(
                      word.added && "diff-word-addition",
                      word.removed && "diff-word-deletion"
                    )}
                  >
                    {word.value}
                  </span>
                ))
              ) : (
                line?.content || ' '
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right Panel (Modified) */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-widest">Modified</div>
        {pairedLines?.right.map((line, idx) => (
          <div 
            key={idx} 
            className={clsx(
              "diff-line group h-6 hover:bg-zinc-900/40 transition-colors",
              line?.type === 'addition' && "diff-addition",
              !line && "bg-zinc-900/20"
            )}
          >
            <div className="diff-gutter opacity-40 group-hover:opacity-100 transition-opacity">
              {line?.lineNumberModified || ''}
            </div>
            <div className="diff-content font-mono">
              {line?.content || ' '}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiffViewer;
