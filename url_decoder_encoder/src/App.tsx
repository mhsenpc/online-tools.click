import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, AlertCircle, Link, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'decode' | 'encode'>('decode');
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<[string, string][]>([]);
  const [paramSearch, setParamSearch] = useState('');

  const filteredParams = params.filter(([key, value]) => 
    key.toLowerCase().includes(paramSearch.toLowerCase()) || 
    value.toLowerCase().includes(paramSearch.toLowerCase())
  );

  useEffect(() => {
    try {
        if (!input.trim()) {
            setOutput('');
            setParams([]);
            setError(null);
            return;
        }
        if (mode === 'decode') {
            const decoded = decodeURIComponent(input);
            setOutput(decoded);
            const parsedParams: [string, string][] = [];
            try {
                const url = new URL(decoded.startsWith('http') ? decoded : `http://example.com/${decoded}`);
                url.searchParams.forEach((value, key) => {
                    parsedParams.push([key, value]);
                });
            } catch (e) {}
            setParams(parsedParams);
        } else {
            setOutput(encodeURIComponent(input));
            setParams([]);
        }
        setError(null);
    } catch (e) {
        setError('Invalid URL format');
        setOutput('');
        setParams([]);
    }
  }, [input, mode]);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-display text-white mb-2">URL Decoder & Formatter</h1>
        <p className="text-white/50">Decode or encode URLs instantly.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] p-6 rounded-lg border border-white/10 space-y-4">
            <div className="flex gap-2">
                <button className={cn("flex-1 p-2 rounded font-bold", mode === 'decode' ? "bg-[#ff3e00]" : "bg-white/10")} onClick={() => setMode('decode')}>Decode</button>
                <button className={cn("flex-1 p-2 rounded font-bold", mode === 'encode' ? "bg-[#ff3e00]" : "bg-white/10")} onClick={() => setMode('encode')}>Encode</button>
            </div>
            <textarea
                className="w-full h-48 bg-[#050505] border border-white/10 p-4 rounded focus:outline-none focus:border-[#ff3e00] font-mono"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste URL here..."
            />
        </div>

        <div className="bg-[#111111] p-6 rounded-lg border border-white/10 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Output</h2>
                <button 
                    onClick={() => navigator.clipboard.writeText(output)}
                    className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded text-sm hover:bg-white/20"
                >
                    <Copy size={14} /> Copy
                </button>
            </div>
            <textarea
                className="w-full h-32 bg-[#050505] border border-white/10 p-4 rounded font-mono text-sm"
                value={output}
                readOnly
            />
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={16} /> {error}
                </div>
            )}
            
            {mode === 'decode' && params.length > 0 && (
                <div className="border border-white/10 rounded-lg overflow-hidden">
                    <div className="bg-white/5 p-3 border-b border-white/10 flex items-center justify-between">
                        <h3 className="text-sm font-bold">Query Parameters</h3>
                        <input 
                            type="text"
                            placeholder="Search params..."
                            className="bg-[#050505] border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#ff3e00]"
                            value={paramSearch}
                            onChange={(e) => setParamSearch(e.target.value)}
                        />
                    </div>
                    <table className="w-full text-sm font-mono">
                        <tbody>
                            {filteredParams.map(([key, value], idx) => (
                                <tr key={idx} className="border-b border-white/5 last:border-0 group">
                                    <td className="p-2 border-r border-white/5 font-semibold text-white/70">{key}</td>
                                    <td className="p-2 flex items-center justify-between">
                                        <span>{value}</span>
                                        <button 
                                            onClick={() => navigator.clipboard.writeText(value)}
                                            className="opacity-0 group-hover:opacity-100 hover:text-[#ff3e00]"
                                            title="Copy value"
                                        >
                                            <Copy size={12} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
