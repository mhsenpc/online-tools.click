import React, { useState } from 'react';
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';
import { Copy, RefreshCw, Check, Hash } from 'lucide-react';

function App() {
  const [version, setVersion] = useState<'v1' | 'v4'>('v4');
  const [count, setCount] = useState(1);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(version === 'v1' ? uuidv1() : uuidv4());
    }
    setOutput(list.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-accent/30 p-6">
      <nav className="max-w-4xl mx-auto flex items-center justify-between py-6 border-b border-border mb-8">
        <a href="/" className="text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">
            Online Tools
        </a>
        <h1 className="text-xl font-bold flex items-center gap-2">
           <Hash className="text-accent" />
           UUID Generator
        </h1>
      </nav>
      
      <main className="max-w-4xl mx-auto bg-[#121212] border border-border rounded-xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Version</label>
            <select 
                value={version} 
                onChange={(e) => setVersion(e.target.value as 'v1' | 'v4')}
                className="w-full bg-bg border border-border rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="v4">UUID v4 (Random)</option>
              <option value="v1">UUID v1 (Time-based)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Count</label>
            <input 
                type="number" 
                value={count} 
                onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))} 
                min="1" 
                max="100" 
                className="w-full bg-bg border border-border rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
        
        <button 
            onClick={generate}
            className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw size={18} />
          Generate
        </button>

        {output && (
            <div className="space-y-2 mt-6">
                <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Output</label>
                    <button 
                        onClick={handleCopy}
                        className="text-white/60 hover:text-white flex items-center gap-2 text-xs uppercase tracking-wider font-bold"
                    >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
                <textarea 
                    style={{ width: '100%', height: '200px' }}
                    className="w-full bg-bg border border-border rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    value={output}
                    readOnly
                />
            </div>
        )}
      </main>
    </div>
  );
}

export default App;
