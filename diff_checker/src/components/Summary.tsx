import React from 'react';
import { Plus, Minus, Info } from 'lucide-react';

interface SummaryProps {
  summary: { additions: number; deletions: number };
  totalLines: number;
}

const Summary: React.FC<SummaryProps> = ({ summary, totalLines }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <Plus className="w-3.5 h-3.5" />
        {summary.additions} additions
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
        <Minus className="w-3.5 h-3.5" />
        {summary.deletions} deletions
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 ml-auto">
        <Info className="w-3.5 h-3.5" />
        {totalLines} total lines
      </div>
    </div>
  );
};

export default Summary;
