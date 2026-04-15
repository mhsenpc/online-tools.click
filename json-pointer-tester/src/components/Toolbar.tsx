import React from 'react';
import { Eraser } from 'lucide-react';

interface ToolbarProps {
  onClear: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClear }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 rounded-lg transition-colors border border-zinc-700"
        >
          <Eraser className="w-4 h-4" />
          <span className="text-sm font-medium">Clear</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
