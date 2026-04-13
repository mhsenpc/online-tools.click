import { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  Braces, 
  ChevronRight, 
  ChevronDown, 
  Copy, 
  Download, 
  Search, 
  Eraser, 
  Maximize2, 
  Minimize2, 
  AlignLeft,
  Check,
  AlertCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];

interface JsonTreeNodeProps {
  label?: string;
  value: JsonValue;
  isLast?: boolean;
  depth?: number;
}

const JsonTreeNode = ({ label, value, isLast = true, depth = 0 }: JsonTreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);

  const toggleOpen = () => setIsOpen(!isOpen);

  const renderValue = () => {
    if (value === null) return <span className="text-[#ff3e00]/60 italic">null</span>;
    if (typeof value === 'string') return <span className="text-[#ff3e00]">"{value}"</span>;
    if (typeof value === 'number') return <span className="text-blue-400">{value}</span>;
    if (typeof value === 'boolean') return <span className="text-purple-400 font-medium">{String(value)}</span>;
    return null;
  };

  if (!isObject) {
    return (
      <div className="flex gap-2 py-0.5 group">
        {label && (
          <span className="text-white/40 font-mono text-sm leading-6">
            "{label}":
          </span>
        )}
        <span className="font-mono text-sm leading-6">
          {renderValue()}
          {!isLast && <span className="text-white/20">,</span>}
        </span>
      </div>
    );
  }

  const entries = isArray ? value : Object.entries(value);
  const isEmpty = entries.length === 0;

  return (
    <div className="flex flex-col py-0.5">
      <div 
        className="flex items-center gap-1 cursor-pointer group hover:bg-white/5 rounded px-1 -ml-1"
        onClick={toggleOpen}
      >
        {!isEmpty ? (
          isOpen ? <ChevronDown size={14} className="text-white/40" /> : <ChevronRight size={14} className="text-white/40" />
        ) : (
          <span className="w-[14px]" />
        )}
        {label && (
          <span className="text-white/40 font-mono text-sm leading-6 group-hover:text-white/60 transition-colors">
            "{label}":
          </span>
        )}
        <span className="text-white/20 font-mono text-sm">
          {isArray ? '[' : '{'}
          {!isOpen && !isEmpty && <span className="mx-1 italic">... {entries.length} items</span>}
          {!isOpen || isEmpty ? (isArray ? ']' : '}') : ''}
          {!isOpen && !isLast && <span>,</span>}
        </span>
      </div>

      {isOpen && !isEmpty && (
        <div className="json-tree-node ml-2">
          {isArray ? (
            value.map((v, i) => (
              <JsonTreeNode key={i} value={v} isLast={i === value.length - 1} depth={depth + 1} />
            ))
          ) : (
            Object.entries(value).map(([k, v], i) => (
              <JsonTreeNode key={k} label={k} value={v} isLast={i === entries.length - 1} depth={depth + 1} />
            ))
          )}
        </div>
      )}

      {isOpen && !isEmpty && (
        <div className="text-white/20 font-mono text-sm leading-6">
          {isArray ? ']' : '}'}
          {!isLast && <span>,</span>}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [input, setInput] = useState('');
  const [parsedData, setParsedData] = useState<JsonValue>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (!value.trim()) {
      setParsedData(null);
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      setParsedData(parsed);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setParsedData(null);
    }
  };

  const handlePrettify = () => {
    if (!parsedData) return;
    setInput(JSON.stringify(parsedData, null, 2));
  };

  const handleMinify = () => {
    if (!parsedData) return;
    setInput(JSON.stringify(parsedData));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!parsedData) return;
    const blob = new Blob([JSON.stringify(parsedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
    setParsedData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-accent/30 selection:text-white">
      {/* Navigation */}
      <nav className="h-16 border-b border-border flex items-center justify-between px-6 bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <a href="/" className="text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest font-display font-bold">
            Online Tools
          </a>
          <div className="w-1 h-1 bg-white/20 rounded-full" />
          <div className="flex items-center gap-2 text-white/80 font-display uppercase tracking-widest text-sm font-bold">
            <Braces size={16} className="text-accent" />
            JSON Viewer
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row h-auto md:h-[calc(100vh-64px)] overflow-hidden">
        {/* Input Panel */}
        <div className="flex-1 flex flex-col border-r border-border h-full min-h-[500px] md:min-h-0">
          <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Input JSON</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={handlePrettify}
                disabled={!parsedData}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                title="Format JSON"
              >
                <AlignLeft size={16} />
              </button>
              <button 
                onClick={handleMinify}
                disabled={!parsedData}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                title="Minify JSON"
              >
                <Minimize2 size={16} />
              </button>
              <div className="w-px h-4 bg-white/10 mx-1" />
              <button 
                onClick={handleClear}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-[#ff3e00]"
                title="Clear"
              >
                <Eraser size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 relative group">
            <textarea
              value={input}
              onChange={handleInputChange}
              spellCheck={false}
              className="w-full h-full bg-bg p-8 font-mono text-[15px] resize-none focus:outline-none placeholder:text-white/10 leading-[1.6] transition-all focus:bg-[#080808]"
              placeholder='Paste your JSON here...
{
  "project": "Online Tools",
  "feature": "JSON Viewer",
  "status": "Production"
}'
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-500/90 leading-normal">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 flex flex-col h-full bg-[#080808]">
          <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Tree View</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={handleCopy}
                disabled={!input}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20 flex items-center gap-2 px-3"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                <span className="text-[10px] uppercase tracking-wider font-bold">{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button 
                onClick={handleDownload}
                disabled={!parsedData}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20"
                title="Download JSON"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6 scroll-smooth">
            {!parsedData ? (
              <div className="h-full flex flex-col items-center justify-center text-white/10 gap-4">
                <Braces size={48} strokeWidth={1} />
                <p className="text-sm font-display tracking-widest uppercase">Waiting for input</p>
              </div>
            ) : (
              <div className="max-w-2xl">
                <JsonTreeNode value={parsedData} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent blur-[120px] rounded-full opacity-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 blur-[120px] rounded-full opacity-5" />
      </div>
    </div>
  );
}
