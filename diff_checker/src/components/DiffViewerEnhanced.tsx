import React, { useMemo, useState } from 'react';
import { DiffLine } from '../hooks/useDiff';
import { clsx } from 'clsx';
import { highlightSyntax, detectLanguage, Language } from '../utils/syntaxHighlighter';
import { Download, Copy, Check } from 'lucide-react';

interface DiffViewerEnhancedProps {
  diffLines: DiffLine[];
  viewMode: 'side-by-side' | 'unified';
  language?: Language;
  originalText: string;
  modifiedText: string;
}

const DiffViewerEnhanced: React.FC<DiffViewerEnhancedProps> = ({
  diffLines,
  viewMode,
  language: propLanguage,
  originalText,
  modifiedText
}) => {
  const [copiedDiff, setCopiedDiff] = useState(false);

  const detectedLanguage = useMemo(() => {
    return propLanguage || detectLanguage(originalText || modifiedText);
  }, [propLanguage, originalText, modifiedText]);

  // If we're in side-by-side mode, we need to pair lines
  const pairedLines = useMemo(() => {
    if (viewMode === 'unified') return null;

    const left: (DiffLine | null)[] = [];
    const right: (DiffLine | null)[] = [];

    let i = 0;
    while (i < diffLines.length) {
      const current = diffLines[i];
      if (current.type === 'neutral') {
        left.push(current);
        right.push(current);
        i++;
      } else if (current.type === 'deletion') {
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

  const handleCopyDiff = async () => {
    const gitDiff = generateGitDiff();
    await navigator.clipboard.writeText(gitDiff);
    setCopiedDiff(true);
    setTimeout(() => setCopiedDiff(false), 2000);
  };

  const handleDownloadPatch = () => {
    const gitDiff = generateGitDiff();
    const blob = new Blob([gitDiff], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'changes.patch';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportHtml = () => {
    const html = generateHtmlReport();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diff-report.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateGitDiff = (): string => {
    let output = '--- a/original\n+++ b/modified\n';
    output += '@@ -1,' + diffLines.filter(l => l.type !== 'addition').length + ' +1,' + diffLines.filter(l => l.type !== 'deletion').length + ' @@\n';

    diffLines.forEach(line => {
      if (line.type === 'addition') {
        output += '+' + line.content + '\n';
      } else if (line.type === 'deletion') {
        output += '-' + line.content + '\n';
      } else {
        output += ' ' + line.content + '\n';
      }
    });

    return output;
  };

  const generateHtmlReport = (): string => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Diff Report</title>
  <style>
    body { font-family: 'Monaco', 'Menlo', 'Consolas', monospace; background: #0a0a0a; color: #e4e4e7; padding: 20px; }
    .diff-line { display: flex; padding: 2px 0; }
    .diff-addition { background: rgba(34, 197, 94, 0.1); }
    .diff-deletion { background: rgba(239, 68, 68, 0.1); }
    .diff-gutter { min-width: 40px; padding: 0 8px; opacity: 0.4; text-align: right; user-select: none; }
    .diff-content { flex: 1; padding: 0 12px; white-space: pre; }
  </style>
</head>
<body>
  <h1>Diff Report</h1>
  <div class="diff-viewer">
    ${diffLines.map((line, idx) => `
      <div class="diff-line ${line.type === 'addition' ? 'diff-addition' : line.type === 'deletion' ? 'diff-deletion' : ''}">
        <span class="diff-gutter">${line.lineNumberOriginal || ''}</span>
        <span class="diff-gutter">${line.lineNumberModified || ''}</span>
        <span class="diff-content">${line.content || ' '}</span>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
  };

  const renderLineWithSyntax = (line: DiffLine | null) => {
    if (!line || !line.content) return ' ';

    const highlightedContent = highlightSyntax(line.content, detectedLanguage);
    return <span dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
  };

  if (viewMode === 'unified') {
    return (
      <div className="w-full">
        {/* Export Toolbar */}
        <div className="flex items-center justify-between p-3 bg-zinc-900/50 border-b border-zinc-800 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">Language:</span>
            <span className="text-xs font-bold text-emerald-500">{detectedLanguage}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDiff}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              {copiedDiff ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedDiff ? 'Copied!' : 'Copy Diff'}
            </button>
            <button
              onClick={handleDownloadPatch}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              .patch
            </button>
            <button
              onClick={handleExportHtml}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              HTML
            </button>
          </div>
        </div>

        <div className="border border-zinc-800 border-t-0 rounded-b-2xl overflow-hidden bg-zinc-950/50">
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
                <div className="diff-content font-mono text-sm">
                  {renderLineWithSyntax(line)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Export Toolbar */}
      <div className="flex items-center justify-between p-3 bg-zinc-900/50 border-b border-zinc-800 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-zinc-500">Language:</span>
          <span className="text-xs font-bold text-emerald-500">{detectedLanguage}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyDiff}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            {copiedDiff ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedDiff ? 'Copied!' : 'Copy Diff'}
          </button>
          <button
            onClick={handleDownloadPatch}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            .patch
          </button>
          <button
            onClick={handleExportHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            HTML
          </button>
        </div>
      </div>

      <div className="border border-zinc-800 border-t-0 rounded-b-2xl overflow-hidden flex divide-x divide-zinc-900 bg-zinc-950/50">
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
              <div className="diff-content font-mono text-sm">
                {renderLineWithSyntax(line)}
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
              <div className="diff-content font-mono text-sm">
                {renderLineWithSyntax(line)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiffViewerEnhanced;
