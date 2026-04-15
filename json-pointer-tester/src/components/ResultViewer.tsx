import React from 'react';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import type { MatchResult, Explanation } from '../hooks/useJsonPathTester';

interface ResultViewerProps {
  result: MatchResult | null;
  expression: string;
  explanation: Explanation[];
  syntaxMode: 'pointer' | 'path';
}

const ResultViewer: React.FC<ResultViewerProps> = ({ result, expression, explanation, syntaxMode }) => {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-zinc-500">
        <ChevronRight className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-sm">Enter an expression to see results</p>
      </div>
    );
  }

  const hasError = !!result.error;
  const hasValue = !hasError && result.value !== undefined && result.value !== null;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Status Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
        {hasError ? (
          <div className="flex items-center gap-2 text-rose-400">
            <XCircle className="w-5 h-5" />
            <span className="font-medium">Error</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">
              {result.matches} {result.matches === 1 ? 'Match' : 'Matches'}
            </span>
          </div>
        )}
      </div>

      {/* Expression Breakdown */}
      {expression && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-zinc-300">Expression Breakdown</h3>
          <div className="space-y-1.5">
            {explanation.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <div className="flex-none">
                  <ChevronRight className="w-4 h-4 text-emerald-500 mt-0.5" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm text-emerald-400">{item.segment || syntaxMode === 'pointer' ? '(root)' : '$'}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">{item.type}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {hasError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg">
          <p className="text-sm text-rose-400 font-mono">{result.error}</p>
        </div>
      )}

      {/* Matched Value */}
      {hasValue && (
        <div className="space-y-2 flex-grow flex flex-col">
          <h3 className="text-sm font-medium text-zinc-300">Matched Value</h3>
          <div className="flex-grow bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 overflow-auto">
            <pre className="text-sm">
              {formatValue(result.value, result.path)}
            </pre>
          </div>
        </div>
      )}

      {/* Match Paths */}
      {hasValue && result.path && result.path.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-zinc-300">Matched Path{result.path.length > 1 ? 's' : ''}</h3>
          <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
            {result.path.map((path, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-zinc-900/50 rounded border border-zinc-800">
                <span className="text-xs text-zinc-500 font-mono w-8">{index + 1}.</span>
                <code className="text-sm text-emerald-400 font-mono flex-grow">{path}</code>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function formatValue(value: any, path: string[]): React.ReactNode {
  if (value === null) {
    return <span className="json-null">null</span>;
  }

  if (value === undefined) {
    return <span className="json-null">undefined</span>;
  }

  if (typeof value === 'string') {
    return <span className="json-string">"{value}"</span>;
  }

  if (typeof value === 'number') {
    return <span className="json-number">{value}</span>;
  }

  if (typeof value === 'boolean') {
    return <span className="json-boolean">{value.toString()}</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span>[]</span>;
    }
    return (
      <div className="json-node">
        <span className="text-zinc-500">[</span>
        {value.map((item, index) => (
          <div key={index} className="pl-4">
            {formatValue(item, path)}
            {index < value.length - 1 && <span className="text-zinc-500">,</span>}
          </div>
        ))}
        <span className="text-zinc-500">]</span>
      </div>
    );
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return <span>{'{}'}</span>;
    }
    return (
      <div className="json-node">
        <span className="text-zinc-500">{'{'}</span>
        {keys.map((key, index) => (
          <div key={key} className="pl-4">
            <span className="json-key">"{key}"</span>
            <span className="text-zinc-500">: </span>
            {formatValue(value[key], path)}
            {index < keys.length - 1 && <span className="text-zinc-500">,</span>}
          </div>
        ))}
        <span className="text-zinc-500">{'}'}</span>
      </div>
    );
  }

  return <span>{String(value)}</span>;
}

export default ResultViewer;
