import React, { useState, useEffect } from 'react';
import { Copy, Trash2, ArrowRightLeft, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const jsonToCSV = (json: any[], selectedFields: string[] = []): string => {
  if (!json || json.length === 0) return '';
  const allHeaders = Object.keys(json[0]);
  const headers = selectedFields.length > 0 ? selectedFields : allHeaders;
  const csv = [
    headers.join(','),
    ...json.map(obj => headers.map(h => JSON.stringify(obj[h] || '')).join(','))
  ];
  return csv.join('\n');
};

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = (inputData: string, fields = selectedFields) => {
    try {
      const json = JSON.parse(inputData);
      const data = Array.isArray(json) ? json : [json];
      const headers = data.length > 0 ? Object.keys(data[0]) : [];
      setAvailableFields(headers);
      
      const activeFields = fields.length > 0 ? fields : headers;
      setOutput(jsonToCSV(data, activeFields));
      setError(null);
    } catch (e) {
      setOutput('');
      setError('Invalid JSON format');
    }
  };

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setAvailableFields([]);
      setSelectedFields([]);
      setError(null);
      return;
    }
    handleConvert(input);
  }, [input, selectedFields]);

  const toggleField = (field: string) => {
    setSelectedFields(prev => 
        prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-display text-white mb-2">JSON CSV Converter</h1>
        <p className="text-white/50">Convert JSON arrays to CSV with field filtering.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] p-6 rounded-lg border border-white/10 space-y-4">
          <label className="block text-sm font-medium text-white/70">Input JSON</label>
          <textarea
            className="w-full h-96 bg-[#050505] border border-white/10 p-4 rounded focus:outline-none focus:border-[#ff3e00] font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
          />
          {availableFields.length > 0 && (
            <div className="mt-4">
                <label className="block text-sm font-medium text-white/70 mb-2">Select Columns to Include</label>
                <div className="flex flex-wrap gap-2">
                    {availableFields.map(field => (
                        <button 
                            key={field}
                            onClick={() => toggleField(field)}
                            className={cn(
                                "px-3 py-1 rounded-full text-sm font-medium",
                                selectedFields.includes(field) || selectedFields.length === 0 ? "bg-[#ff3e00] text-white" : "bg-white/10 text-white/50"
                            )}
                        >
                            {field}
                        </button>
                    ))}
                </div>
            </div>
          )}
        </div>
        <div className="bg-[#111111] p-6 rounded-lg border border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">CSV Output</h2>
                <button 
                    onClick={() => navigator.clipboard.writeText(output)}
                    className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded text-sm hover:bg-white/20"
                >
                    <Copy size={14} /> Copy
                </button>
            </div>
            <textarea
                className="w-full h-96 bg-[#050505] border border-white/10 p-4 rounded font-mono text-sm"
                value={output}
                readOnly
            />
            {error && (
                <div className="mt-4 bg-red-500/10 border border-red-500/20 p-3 rounded flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={16} /> {error}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
