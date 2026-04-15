import { useState } from 'react';
import { 
  Copy, 
  Eraser, 
  Check,
  AlertCircle,
  FileCode2,
  Settings2
} from 'lucide-react';
import { format } from 'sql-formatter';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<'sql' | 'postgresql' | 'mysql' | 'mariadb' | 'sqlite' | 'oracle'>('sql');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (!value.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const formatted = format(value, { language: language as any });
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <FileCode2 size={16} className="text-accent" />
            SQL Formatter
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row h-auto md:h-[calc(100vh-64px)] overflow-hidden">
        {/* Input Panel */}
        <div className="flex-1 flex flex-col border-r border-border h-full min-h-[400px] md:min-h-0">
          <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Input SQL</span>
            <div className="flex items-center gap-1">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-bg text-white/60 text-xs px-2 py-1 rounded border border-white/10 focus:outline-none focus:border-accent"
              >
                <option value="sql">Standard SQL</option>
                <option value="postgresql">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="mariadb">MariaDB</option>
                <option value="sqlite">SQLite</option>
                <option value="oracle">Oracle</option>
              </select>
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
           <div className="flex-1 relative group overflow-hidden">
             <textarea
               value={input}
               onChange={handleInputChange}
               spellCheck={false}
               className="w-full h-full min-h-[400px] bg-bg p-8 font-mono text-[15px] resize-none focus:outline-none placeholder:text-white/10 leading-[1.6] transition-all focus:bg-[#080808]"
               placeholder='Paste your messy SQL here...
SELECT * FROM users WHERE active = 1 AND created_at > "2023-01-01"'
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
            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Formatted SQL</span>
            <button 
              onClick={handleCopy}
              disabled={!output}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20 flex items-center gap-2 px-3"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              <span className="text-[10px] uppercase tracking-wider font-bold">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="flex-1 overflow-auto p-8">
            <pre className="font-mono text-[15px] leading-[1.6] text-blue-100">
              {output || <span className="text-white/10 italic">Formatted SQL will appear here...</span>}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
