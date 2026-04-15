import { useState, useEffect } from 'react';
import { 
  Copy, 
  Download, 
  Eraser, 
  AlignLeft,
  Check,
  AlertCircle,
  Table
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const jsonToMarkdownTable = (data: any[]): string => {
  if (!Array.isArray(data) || data.length === 0) return 'Invalid JSON array';
  const headers = Object.keys(data[0]);
  const headerRow = `| ${headers.join(' | ')} |`;
  const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
  const dataRows = data.map(row => {
    return `| ${headers.map(header => String(row[header] ?? '')).join(' | ')} |`;
  });
  return [headerRow, separatorRow, ...dataRows].join('\n');
};

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (!value.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) {
          throw new Error('Please provide a JSON array');
      }
      setOutput(jsonToMarkdownTable(parsed));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
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
            <Table size={16} className="text-accent" />
            JSON to Markdown
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
                onClick={handleClear}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-[#ff3e00]"
                title="Clear"
              >
                <Eraser size={16} />
              </button>
            </div>
          </div>
           <div className="flex-1 relative group overflow-hidden">
             <textarea
               value={input}
               onChange={handleInputChange}
               spellCheck={false}
               className="w-full h-full min-h-[700px] bg-bg p-8 font-mono text-[15px] resize-none focus:outline-none placeholder:text-white/10 leading-[1.6] transition-all focus:bg-[#080808]"
              placeholder='Paste your JSON array here...
[
  { "id": 1, "name": "Tool 1" },
  { "id": 2, "name": "Tool 2" }
]'
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-500/90 leading-normal">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col h-full bg-[#080808]">
          <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Markdown</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={handleCopy}
                disabled={!output}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20 flex items-center gap-2 px-3"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                <span className="text-[10px] uppercase tracking-wider font-bold">{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button 
                onClick={handleDownload}
                disabled={!output}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20"
                title="Download Markdown"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6 scroll-smooth">
            {!output ? (
              <div className="h-full flex flex-col items-center justify-center text-white/10 gap-4">
                <Table size={48} strokeWidth={1} />
                <p className="text-sm font-display tracking-widest uppercase">Waiting for input</p>
              </div>
            ) : (
              <pre className="font-mono text-sm text-white/80 whitespace-pre-wrap">{output}</pre>
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
