import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Trash2, ArrowLeftRight, Check, AlertCircle, Layout, Maximize2, Minimize2 } from 'lucide-react';
import yaml from 'js-yaml';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STORAGE_KEY = 'yaml-json-converter-data';

export default function App() {
  const [yamlInput, setYamlInput] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState<{ message: string; line?: number } | null>(null);
  const [isVertical, setIsVertical] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { yaml: savedYaml, json: savedJson } = JSON.parse(saved);
        setYamlInput(savedYaml || '');
        setJsonInput(savedJson || '');
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ yaml: yamlInput, json: jsonInput }));
  }, [yamlInput, jsonInput]);

  const handleYamlChange = useCallback((value: string) => {
    setYamlInput(value);
    if (!value.trim()) {
      setJsonInput('');
      setError(null);
      return;
    }
    try {
      const obj = yaml.load(value);
      setJsonInput(JSON.stringify(obj, null, indent));
      setError(null);
    } catch (e: any) {
      setError({ message: e.message, line: e.mark?.line + 1 });
    }
  }, [indent]);

  const handleJsonChange = useCallback((value: string) => {
    setJsonInput(value);
    if (!value.trim()) {
      setYamlInput('');
      setError(null);
      return;
    }
    try {
      const obj = JSON.parse(value);
      setYamlInput(yaml.dump(obj, { indent }));
      setError(null);
    } catch (e: any) {
      setError({ message: e.message });
    }
  }, [indent]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClear = () => {
    setYamlInput('');
    setJsonInput('');
    setError(null);
  };

  const handleSwitchLayout = () => setIsVertical(!isVertical);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-accent">YAML ↔ JSON</h1>
          <p className="text-white/50 text-sm mt-1 uppercase tracking-widest">Two-way client-side converter</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface border border-border rounded-lg p-1">
            {[2, 4].map((i) => (
              <button
                key={i}
                onClick={() => setIndent(i)}
                className={cn(
                  "px-3 py-1 text-xs rounded-md transition-all",
                  indent === i ? "bg-accent text-white" : "text-white/40 hover:text-white"
                )}
              >
                Indent: {i}
              </button>
            ))}
          </div>

          <button
            onClick={handleSwitchLayout}
            className="p-2 bg-surface border border-border rounded-lg text-white/60 hover:text-white transition-colors"
            title="Toggle Layout"
          >
            <Layout size={18} />
          </button>

          <button
            onClick={handleClear}
            className="p-2 bg-surface border border-border rounded-lg text-white/60 hover:text-red-500 transition-colors"
            title="Clear All"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn(
        "flex-1 grid gap-4",
        isVertical ? "grid-rows-2" : "md:grid-cols-2"
      )}>
        {/* YAML Panel */}
        <div className="flex flex-col bg-surface border border-border rounded-xl overflow-hidden group">
          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-border">
            <span className="text-xs font-mono font-medium text-white/40 uppercase tracking-widest">YAML</span>
            <button
              onClick={() => handleCopy(yamlInput, 'yaml')}
              className="p-1.5 text-white/40 hover:text-accent transition-colors"
            >
              {copied === 'yaml' ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <textarea
            value={yamlInput}
            onChange={(e) => handleYamlChange(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 font-mono text-sm resize-none focus:outline-none placeholder:text-white/10"
            placeholder="Paste or type YAML here..."
            spellCheck={false}
          />
        </div>

        {/* JSON Panel */}
        <div className="flex flex-col bg-surface border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-border">
            <span className="text-xs font-mono font-medium text-white/40 uppercase tracking-widest">JSON</span>
            <button
              onClick={() => handleCopy(jsonInput, 'json')}
              className="p-1.5 text-white/40 hover:text-accent transition-colors"
            >
              {copied === 'json' ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => handleJsonChange(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 font-mono text-sm resize-none focus:outline-none placeholder:text-white/10"
            placeholder="Paste or type JSON here..."
            spellCheck={false}
          />
        </div>
      </main>

      {/* Footer / Error Bar */}
      <footer className="mt-4 h-8 flex items-center">
        {error ? (
          <div className="flex items-center gap-2 text-red-500 text-sm animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle size={16} />
            <span>{error.message}</span>
            {error.line && <span className="px-1.5 py-0.5 bg-red-500/10 rounded border border-red-500/20 text-[10px] uppercase font-bold">Line {error.line}</span>}
          </div>
        ) : (
          <div className="text-white/20 text-xs uppercase tracking-widest font-medium">
            Ready to convert
          </div>
        )}
      </footer>
    </div>
  );
}
