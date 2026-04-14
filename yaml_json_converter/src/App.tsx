import { useState, useCallback, useEffect } from 'react';
import yaml from 'js-yaml';
import { Copy, Trash2, ArrowLeftRight, AlertCircle, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Mode = 'yaml-to-json' | 'json-to-yaml';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('yaml-to-json');
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const convert = useCallback((value: string, currentMode: Mode, currentIndent: number) => {
    if (!value.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (currentMode === 'yaml-to-json') {
        const obj = yaml.load(value);
        setOutput(JSON.stringify(obj, null, currentIndent));
      } else {
        const obj = JSON.parse(value);
        setOutput(yaml.dump(obj, { indent: currentIndent }));
      }
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Conversion error');
      setOutput('');
    }
  }, []);

  useEffect(() => {
    convert(input, mode, indent);
  }, [input, mode, indent, convert]);

  const handleToggleMode = () => {
    const newMode = mode === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json';
    setMode(newMode);
    setInput(output);
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
    <main className="flex-1 flex flex-col p-4 md:p-8 gap-6 max-w-6xl mx-auto w-full text-left">
      <header className="flex flex-col gap-2">
        <h1 className="!m-0">YAML ↔ JSON Converter</h1>
        <p className="text-sm opacity-70">Convert between YAML and JSON formats instantly.</p>
      </header>

      <div className="flex flex-wrap items-center gap-4 bg-[var(--code-bg)] p-4 rounded-lg border border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className={cn("px-3 py-1 rounded-md text-sm font-medium transition-colors", mode === 'yaml-to-json' ? "bg-[var(--accent)] text-white" : "opacity-50")}>YAML</span>
          <button 
            onClick={handleToggleMode}
            className="p-2 hover:bg-[var(--accent-bg)] rounded-full transition-colors"
            title="Switch Direction"
          >
            <ArrowLeftRight size={20} />
          </button>
          <span className={cn("px-3 py-1 rounded-md text-sm font-medium transition-colors", mode === 'json-to-yaml' ? "bg-[var(--accent)] text-white" : "opacity-50")}>JSON</span>
        </div>

        <div className="h-6 w-px bg-[var(--border)]" />

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Indent:</label>
          <select 
            value={indent} 
            onChange={(e) => setIndent(Number(e.target.value))}
            className="bg-[var(--bg)] border border-[var(--border)] rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
          </select>
        </div>

        <div className="ml-auto flex gap-2">
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium hover:bg-red-500/10 text-red-500 rounded-md transition-colors"
          >
            <Trash2 size={16} />
            Clear
          </button>
          <button 
            onClick={handleCopy}
            disabled={!output}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-[var(--accent)] text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Result'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[400px]">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wider opacity-60">
            Input ({mode === 'yaml-to-json' ? 'YAML' : 'JSON'})
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your ${mode === 'yaml-to-json' ? 'YAML' : 'JSON'} here...`}
            className="flex-1 w-full p-4 font-mono text-sm bg-[var(--code-bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-bold uppercase tracking-wider opacity-60">
            Output ({mode === 'yaml-to-json' ? 'JSON' : 'YAML'})
          </label>
          <div className="flex-1 relative">
            <pre className={cn(
              "absolute inset-0 w-full p-4 font-mono text-sm bg-[var(--code-bg)] border border-[var(--border)] rounded-lg overflow-auto whitespace-pre-wrap",
              error && "border-red-500/50 bg-red-500/5"
            )}>
              {output || (error ? '' : 'Result will appear here...')}
            </pre>
            {error && (
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-500 text-white rounded-md text-sm flex items-start gap-2 shadow-lg">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
