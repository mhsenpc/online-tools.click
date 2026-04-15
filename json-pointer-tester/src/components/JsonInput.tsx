import React from 'react';
import { FileJson, AlertCircle } from 'lucide-react';

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  error: string;
}

const JsonInput: React.FC<JsonInputProps> = ({ value, onChange, isValid, error }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <FileJson className="w-4 h-4 text-emerald-500" />
        <label className="text-sm font-medium text-zinc-300">JSON Input</label>
        {!isValid && (
          <div className="flex items-center gap-1.5 text-rose-400 text-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </div>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your JSON here..."
        className={`flex-grow min-h-[300px] w-full bg-zinc-900/50 border ${
          isValid ? 'border-zinc-800' : 'border-rose-500/50'
        } rounded-lg p-4 font-mono text-sm leading-6 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all resize-y`}
        spellCheck={false}
      />
    </div>
  );
};

export default JsonInput;
