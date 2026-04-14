import { useState, useEffect, useCallback } from 'react';
import yaml from 'js-yaml';
import { 
  ArrowLeftRight, 
  Copy, 
  Trash2, 
  Columns, 
  Rows, 
  Check, 
  AlertCircle,
  FileJson,
  FileText
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Mode = 'yaml-to-json' | 'json-to-yaml';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('yaml-to-json');
  const [isVertical, setIsVertical] = useState(false);
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
    }
  }, []);

  useEffect(() => {
    convert(input, mode, indent);
  }, [input, mode, indent, convert]);

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

  const toggleMode = () => {
    setMode(prev => prev === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json');
    setInput(output);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <ArrowLeftRight className="w-6 h-6 text-primary-500" />
              YAML ↔ JSON Converter
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              Convert between YAML and JSON with ease
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-white dark:bg-neutral-900 rounded-lg p-1 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <button
                onClick={() => setIsVertical(false)}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  !isVertical ? "bg-neutral-100 dark:bg-neutral-800 text-primary-500" : "text-neutral-500"
                )}
                title="Horizontal Layout"
              >
                <Columns className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsVertical(true)}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  isVertical ? "bg-neutral-100 dark:bg-neutral-800 text-primary-500" : "text-neutral-500"
                )}
                title="Vertical Layout"
              >
                <Rows className="w-5 h-5" />
              </button>
            </div>

            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
            </select>

            <button
              onClick={handleClear}
              className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shadow-sm"
              title="Clear All"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Workspace */}
        <div className={cn(
          "grid gap-6 transition-all duration-300",
          isVertical ? "grid-cols-1" : "lg:grid-cols-[1fr,auto,1fr]"
        )}>
          {/* Input Panel */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                {mode === 'yaml-to-json' ? <FileText className="w-4 h-4" /> : <FileJson className="w-4 h-4" />}
                {mode === 'yaml-to-json' ? 'YAML' : 'JSON'} Input
              </span>
            </div>
            <div className="relative flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Paste your ${mode === 'yaml-to-json' ? 'YAML' : 'JSON'} here...`}
                className={cn(
                  "w-full min-h-[400px] lg:min-h-[600px] p-4 font-mono text-sm bg-white dark:bg-neutral-900 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all resize-none shadow-sm dark:text-white",
                  error ? "border-red-300 dark:border-red-900 ring-red-100" : "border-neutral-200 dark:border-neutral-800"
                )}
              />
              {error && (
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-400 whitespace-pre-wrap break-words overflow-hidden max-h-32 overflow-y-auto">
                    {error}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Transform Button */}
          <div className={cn(
            "flex items-center justify-center",
            isVertical ? "py-0" : "lg:py-12"
          )}>
            <button
              onClick={toggleMode}
              className="p-4 rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:scale-110 active:scale-95 transition-all group"
              title="Switch Direction"
            >
              <ArrowLeftRight className={cn(
                "w-6 h-6 transition-transform group-hover:rotate-180",
                isVertical ? "rotate-90" : ""
              )} />
            </button>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                {mode === 'yaml-to-json' ? <FileJson className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                {mode === 'yaml-to-json' ? 'JSON' : 'YAML'} Result
              </span>
              <button
                onClick={handleCopy}
                disabled={!output}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  copied 
                    ? "bg-green-500 text-white" 
                    : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
            </div>
            <div className="relative flex-1">
              <pre className="w-full min-h-[400px] lg:min-h-[600px] p-4 font-mono text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-auto shadow-sm dark:text-white">
                {output || <span className="text-neutral-400 dark:text-neutral-600">Result will appear here...</span>}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
