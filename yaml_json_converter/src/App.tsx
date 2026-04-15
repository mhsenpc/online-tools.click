import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Trash2, Download, Check, AlertCircle, FileJson, FileCode } from 'lucide-react';
import yaml from 'js-yaml';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STORAGE_KEY = 'yaml-json-converter-data';

type Format = 'yaml' | 'json' | 'auto';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [inputFormat, setInputFormat] = useState<Format>('auto');
  const [detectedFormat, setDetectedFormat] = useState<Format | null>(null);
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState<{ message: string; line?: number } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Auto-detect format
  const detectFormat = useCallback((text: string): Format | null => {
    if (!text.trim()) return null;

    const trimmed = text.trim();

    // Check for JSON (starts with { or [)
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        JSON.parse(text);
        return 'json';
      } catch {
        return null;
      }
    }

    // Check for YAML (has YAML-specific patterns)
    if (/^\s*[\w-]+:/.test(trimmed) || /^---\s*$/.test(trimmed)) {
      try {
        yaml.load(text);
        return 'yaml';
      } catch {
        return null;
      }
    }

    return null;
  }, []);

  // Convert based on format
  const convert = useCallback((text: string, format: Format) => {
    if (!text.trim()) {
      setOutput('');
      setError(null);
      setDetectedFormat(null);
      return;
    }

    const sourceFormat = format === 'auto' ? detectFormat(text) : format;

    if (!sourceFormat) {
      setError({ message: 'Could not detect format. Please ensure input is valid YAML or JSON.' });
      setOutput('');
      setDetectedFormat(null);
      return;
    }

    setDetectedFormat(sourceFormat);

    try {
      let obj: any;

      if (sourceFormat === 'yaml') {
        obj = yaml.load(text);
        setOutput(JSON.stringify(obj, null, indent));
      } else {
        obj = JSON.parse(text);
        setOutput(yaml.dump(obj, { indent, lineWidth: -1 }));
      }
      setError(null);
    } catch (e: any) {
      setError({ message: e.message, line: e.mark?.line + 1 });
      setOutput('');
    }
  }, [indent, detectFormat]);

  // Handle input change
  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    convert(value, inputFormat);
  }, [inputFormat, convert]);

  // Handle download
  const handleDownload = useCallback((format: Format) => {
    const content = output || input;
    if (!content) return;

    const finalFormat = format === 'auto' ? (detectedFormat || 'json') : format;
    const extension = finalFormat === 'yaml' ? 'yaml' : 'json';
    const filename = `converted.${extension}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, input, detectedFormat]);

  // Handle copy
  const handleCopy = useCallback(() => {
    const textToCopy = output || input;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output, input]);

  // Handle clear
  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
    setDetectedFormat(null);
  }, []);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setInput(data.input || '');
        setOutput(data.output || '');
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ input, output }));
  }, [input, output]);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-accent">YAML ↔ JSON</h1>
          <p className="text-white/50 text-sm mt-1 uppercase tracking-widest">Universal Converter with Auto-Detect</p>
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
            onClick={handleClear}
            className="p-2 bg-surface border border-border rounded-lg text-white/60 hover:text-red-500 transition-colors"
            title="Clear All"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      {/* Format Selector */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xs font-mono font-medium text-white/40 uppercase tracking-widest">Input Format:</span>
        <div className="flex items-center bg-surface border border-border rounded-lg p-1">
          <button
            onClick={() => setInputFormat('auto')}
            className={cn(
              "px-3 py-1 text-xs rounded-md transition-all",
              inputFormat === 'auto' ? "bg-accent text-white" : "text-white/40 hover:text-white"
            )}
          >
            Auto-Detect
          </button>
          <button
            onClick={() => setInputFormat('yaml')}
            className={cn(
              "px-3 py-1 text-xs rounded-md transition-all",
              inputFormat === 'yaml' ? "bg-accent text-white" : "text-white/40 hover:text-white"
            )}
          >
            YAML
          </button>
          <button
            onClick={() => setInputFormat('json')}
            className={cn(
              "px-3 py-1 text-xs rounded-md transition-all",
              inputFormat === 'json' ? "bg-accent text-white" : "text-white/40 hover:text-white"
            )}
          >
            JSON
          </button>
        </div>

        {detectedFormat && (
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs text-green-500 font-medium uppercase">
              Detected: {detectedFormat === 'yaml' ? 'YAML' : 'JSON'}
            </span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 grid gap-4 md:grid-cols-2">
        {/* Input Panel */}
        <div className="flex flex-col bg-surface border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-border">
            <span className="text-xs font-mono font-medium text-white/40 uppercase tracking-widest">Input</span>
            <button
              onClick={handleCopy}
              className="p-1.5 text-white/40 hover:text-accent transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 font-mono text-sm resize-none focus:outline-none placeholder:text-white/10"
            placeholder="Paste or type YAML or JSON here..."
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-surface border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-border">
            <span className="text-xs font-mono font-medium text-white/40 uppercase tracking-widest">Output</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleDownload('json')}
                className="p-1.5 text-white/40 hover:text-accent transition-colors"
                title="Download as JSON"
                disabled={!output}
              >
                <FileJson size={14} />
              </button>
              <button
                onClick={() => handleDownload('yaml')}
                className="p-1.5 text-white/40 hover:text-accent transition-colors"
                title="Download as YAML"
                disabled={!output}
              >
                <FileCode size={14} />
              </button>
            </div>
          </div>
          <div className="flex-1 w-full p-4 font-mono text-sm overflow-auto bg-surface/50">
            {output ? (
              <pre className="whitespace-pre-wrap break-words">{output}</pre>
            ) : (
              <div className="text-white/10">Converted output will appear here...</div>
            )}
          </div>
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
            {detectedFormat ? `Converted ${detectedFormat.toUpperCase()} successfully` : 'Ready to convert'}
          </div>
        )}
      </footer>
    </div>
  );
}
