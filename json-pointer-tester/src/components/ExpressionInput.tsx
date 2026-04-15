import React from 'react';
import { Search, Code2 } from 'lucide-react';
import type { SyntaxMode, JsonPathSyntax } from '../hooks/useJsonPathTester';

interface ExpressionInputProps {
  expression: string;
  onChange: (value: string) => void;
  syntaxMode: SyntaxMode;
  onSyntaxModeChange: (mode: SyntaxMode) => void;
  pathSyntax: JsonPathSyntax;
  onPathSyntaxChange: (syntax: JsonPathSyntax) => void;
}

const ExpressionInput: React.FC<ExpressionInputProps> = ({
  expression,
  onChange,
  syntaxMode,
  onSyntaxModeChange,
  pathSyntax,
  onPathSyntaxChange
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-emerald-500" />
        <label className="text-sm font-medium text-zinc-300">Expression</label>
      </div>

      {/* Syntax Mode Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSyntaxModeChange('pointer')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              syntaxMode === 'pointer'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700 hover:bg-zinc-800'
            }`}
          >
            JSON Pointer
          </button>
          <button
            onClick={() => onSyntaxModeChange('path')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              syntaxMode === 'path'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700 hover:bg-zinc-800'
            }`}
          >
            JSONPath
          </button>
        </div>

        {syntaxMode === 'path' && (
          <div className="flex items-center gap-2 ml-auto">
            <Code2 className="w-4 h-4 text-zinc-500" />
            <select
              value={pathSyntax}
              onChange={(e) => onPathSyntaxChange(e.target.value as JsonPathSyntax)}
              className="bg-zinc-800/50 border border-zinc-700 rounded-md px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="jayway">Jayway</option>
              <option value="goessner">Goessner</option>
            </select>
          </div>
        )}
      </div>

      {/* Expression Input */}
      <input
        type="text"
        value={expression}
        onChange={(e) => onChange(e.target.value)}
        placeholder={syntaxMode === 'pointer' ? '/users/0/name' : '$.users[0].name'}
        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
      />

      {/* Syntax Help */}
      <div className="text-xs text-zinc-500 space-y-1">
        {syntaxMode === 'pointer' ? (
          <>
            <p><strong className="text-zinc-400">JSON Pointer (RFC 6901):</strong> Start with <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-emerald-400">/</code> and use <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-emerald-400">/</code> to navigate. Array indices as numbers.</p>
            <p className="text-zinc-600">Example: <code className="px-1.5 py-0.5 bg-zinc-800 rounded">/users/0/name</code> or <code className="px-1.5 py-0.5 bg-zinc-800 rounded">/metadata/total</code></p>
          </>
        ) : (
          <>
            <p><strong className="text-zinc-400">JSONPath ({pathSyntax}):</strong> Start with <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-emerald-400">$</code> and use dot notation or brackets.</p>
            <p className="text-zinc-600">Examples: <code className="px-1.5 py-0.5 bg-zinc-800 rounded">$.users[0].name</code> or <code className="px-1.5 py-0.5 bg-zinc-800 rounded">$..name</code> (recursive)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpressionInput;
