import React from 'react';
import { FileText, Plus } from 'lucide-react';

interface InputPanelProps {
  original: string;
  setOriginal: (v: string) => void;
  modified: string;
  setModified: (v: string) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({
  original,
  setOriginal,
  modified,
  setModified,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* Original Text */}
      <div className="flex flex-col gap-3 group">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-zinc-400 group-focus-within:text-emerald-400 transition-colors">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Original text</span>
          </div>
          <span className="text-xs text-zinc-600 font-mono">{original.length} chars</span>
        </div>
        <div className="relative flex-grow min-h-[500px] rounded-2xl border border-zinc-800 bg-zinc-900/30 group-focus-within:border-emerald-500/50 group-focus-within:bg-zinc-900/50 transition-all shadow-inner">
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className="w-full h-full p-6 bg-transparent outline-none text-zinc-200 font-mono text-sm leading-relaxed resize-none scrollbar-thin scrollbar-thumb-zinc-800 placeholder:text-zinc-700"
            placeholder="Paste your original text here..."
            spellCheck="false"
          />
        </div>
      </div>

      {/* Modified Text */}
      <div className="flex flex-col gap-3 group">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-zinc-400 group-focus-within:text-emerald-400 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Modified text</span>
          </div>
          <span className="text-xs text-zinc-600 font-mono">{modified.length} chars</span>
        </div>
        <div className="relative flex-grow min-h-[500px] rounded-2xl border border-zinc-800 bg-zinc-900/30 group-focus-within:border-emerald-500/50 group-focus-within:bg-zinc-900/50 transition-all shadow-inner">
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            className="w-full h-full p-6 bg-transparent outline-none text-zinc-200 font-mono text-sm leading-relaxed resize-none scrollbar-thin scrollbar-thumb-zinc-800 placeholder:text-zinc-700"
            placeholder="Paste your modified text here..."
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
