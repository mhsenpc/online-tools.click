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
const jsonToCSV = (json: any[], selectedFields: string[] = [], mappings: Record<string, string> = {}): string => {
  if (!json || json.length === 0) return '';
  const allHeaders = Object.keys(json[0]);
  const fields = selectedFields.length > 0 ? selectedFields : allHeaders;
  
  const headers = fields.map(f => mappings[f] || f);
  
  const csv = [
    headers.join(','),
    ...json.map(obj => fields.map(h => JSON.stringify(obj[h] || '')).join(','))
  ];
  return csv.join('\n');
};

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv');
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [columnMappings, setColumnMappings] = useState<Record<string, string>>({});

  const handleConvert = (inputData: string, fields = selectedFields, mappings = columnMappings) => {
    try {
      if (mode === 'json-to-csv') {
        const json = JSON.parse(inputData);
        setOutput(jsonToCSV(Array.isArray(json) ? json : [json], fields, mappings));
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
      setAvailableFields([]);
      setSelectedFields([]);
      return;
    }
    // Simple detection
    const isJson = input.trim().startsWith('{') || input.trim().startsWith('[');
    setMode(isJson ? 'json-to-csv' : 'csv-to-json');

    if (isJson) {
      try {
        const json = JSON.parse(input);
        const data = Array.isArray(json) ? json : [json];
        const headers = data.length > 0 ? Object.keys(data[0]) : [];
        setAvailableFields(headers);
        // Only reset selection if fields changed significantly? 
        // For now, simple reset if empty or different
        if (selectedFields.length === 0) {
            setSelectedFields(headers);
        }
        handleConvert(input, selectedFields.length > 0 ? selectedFields : headers, columnMappings);
      } catch (e) {
        setOutput('Error: Invalid format');
      }
    } else {
        handleConvert(input);
        setAvailableFields([]);
        setSelectedFields([]);
        setColumnMappings({});
    }
  }, [input, selectedFields, columnMappings]);

  const toggleField = (field: string) => {
    setSelectedFields(prev => 
        prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

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
          {mode === 'json-to-csv' && availableFields.length > 0 && (
            <div className="mt-4">
                <label className="block text-sm font-medium text-white/70 mb-2">Configure Fields</label>
                <div className="space-y-2">
                    {availableFields.map(field => (
                        <div key={field} className="flex items-center gap-2">
                            <button 
                                onClick={() => toggleField(field)}
                                className={clsx(
                                    "px-3 py-1 rounded-full text-sm",
                                    selectedFields.includes(field) ? "bg-[#ff3e00] text-white" : "bg-[#111111] text-white/50 border border-white/10"
                                )}
                            >
                                {field}
                            </button>
                            {selectedFields.includes(field) && (
                                <input 
                                    className="px-2 py-1 bg-[#111111] border border-white/10 rounded text-sm text-white"
                                    placeholder="Rename..."
                                    value={columnMappings[field] || ''}
                                    onChange={(e) => setColumnMappings(prev => ({ ...prev, [field]: e.target.value }))}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
          )}
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
