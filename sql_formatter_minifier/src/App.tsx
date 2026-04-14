import React, { useState, useEffect } from 'react';
import { format } from 'sql-formatter';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-tomorrow.css';
import { Copy, Trash2, Maximize2, Minimize2, Check, ExternalLink } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Dialect = 'sql' | 'mysql' | 'postgresql' | 'sqlite' | 'mariadb' | 'db2' | 'oracle' | 'plsql' | 'tsql';

const dialects: { value: Dialect; label: string }[] = [
  { value: 'sql', label: 'Standard SQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'mariadb', label: 'MariaDB' },
  { value: 'db2', label: 'DB2' },
  { value: 'oracle', label: 'Oracle' },
  { value: 'plsql', label: 'PL/SQL' },
  { value: 'tsql', label: 'T-SQL' },
];

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [dialect, setDialect] = useState<Dialect>('sql');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (output) {
      Prism.highlightAll();
    }
  }, [output]);

  const handleFormat = () => {
    try {
      setError(null);
      const formatted = format(input, {
        language: dialect,
        uppercase: true,
      });
      setOutput(formatted);
    } catch (err: any) {
      setError(err.message || 'Failed to format SQL');
    }
  };

  const handleMinify = () => {
    try {
      setError(null);
      // Basic minification: remove comments, replace newlines/tabs with spaces, collapse multiple spaces
      const minified = input
        .replace(/\/\*[\s\S]*?\*\/|--.*$/gm, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .trim();
      setOutput(minified);
    } catch (err: any) {
      setError(err.message || 'Failed to minify SQL');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <Maximize2 size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SQL Formatter</h1>
              <p className="text-sm text-gray-500 text-center md:text-left">Beautify or minify your SQL queries</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as Dialect)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm outline-none ring-blue-500 focus:ring-2"
            >
              {dialects.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Input SQL</label>
              <button
                onClick={handleClear}
                className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 size={16} />
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your messy SQL here..."
              className="h-[400px] w-full rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm shadow-sm outline-none ring-blue-500 focus:ring-2"
            />
            <div className="flex gap-3">
              <button
                onClick={handleFormat}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98] shadow-md shadow-blue-100"
              >
                <Maximize2 size={18} />
                Format SQL
              </button>
              <button
                onClick={handleMinify}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98] shadow-sm"
              >
                <Minimize2 size={18} />
                Minify SQL
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Result</label>
              {output && (
                <button
                  onClick={handleCopy}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium transition-all",
                    copied ? "text-green-600 bg-green-50" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-sm">
              {error ? (
                <div className="p-4 text-red-400 font-mono text-sm">{error}</div>
              ) : output ? (
                <pre className="h-full w-full overflow-auto p-4 language-sql">
                  <code className="language-sql">{output}</code>
                </pre>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500 font-mono text-sm italic">
                  Results will appear here...
                </div>
              )}
            </div>
            <div className="mt-auto pt-4 text-center lg:text-right">
               <p className="text-xs text-gray-400">
                Supports MySQL, PostgreSQL, Oracle, and more. 100% Client-side.
               </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
