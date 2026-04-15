import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Copy, Trash2, FileJson, Table } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Simple CSV parser
const parseCSV = (csv: string): any[] => {
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {} as any);
  });
};

// Simple JSON to CSV
const jsonToCSV = (json: any[]): string => {
  if (!json || json.length === 0) return '';
  const headers = Object.keys(json[0]);
  const csv = [
    headers.join(','),
    ...json.map(obj => headers.map(h => JSON.stringify(obj[h] || '')).join(','))
  ];
  return csv.join('\n');
};

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv');

  const handleConvert = (inputData: string) => {
    try {
      if (mode === 'json-to-csv') {
        const json = JSON.parse(inputData);
        setOutput(jsonToCSV(Array.isArray(json) ? json : [json]));
      } else {
        const csv = parseCSV(inputData);
        setOutput(JSON.stringify(csv, null, 2));
      }
    } catch (e) {
      setOutput('Error: Invalid format');
    }
  };

  useEffect(() => {
    if (input.trim() === '') {
      setOutput('');
      return;
    }
    // Simple detection
    const isJson = input.trim().startsWith('{') || input.trim().startsWith('[');
    setMode(isJson ? 'json-to-csv' : 'csv-to-json');
    handleConvert(input);
  }, [input]);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-display text-white mb-2">JSON CSV Converter</h1>
        <p className="text-white/50">Convert between JSON and CSV formats instantly.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-white/70">Input</label>
          <textarea
            className="w-full h-96 p-4 bg-[#111111] border border-white/10 rounded-lg focus:outline-none focus:border-[#ff3e00] font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste JSON or CSV here..."
          />
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-white/70">Output ({mode})</label>
          <textarea
            className="w-full h-96 p-4 bg-[#111111] border border-white/10 rounded-lg focus:outline-none focus:border-[#ff3e00] font-mono"
            value={output}
            readOnly
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
