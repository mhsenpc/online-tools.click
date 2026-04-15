import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Copy, Check, Upload } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function jsonToCsv(json: any[]): string {
  if (!Array.isArray(json) || json.length === 0) return '';
  const headers = Object.keys(json[0]);
  const rows = json.map(obj => headers.map(header => JSON.stringify(obj[header])).join(','));
  return [headers.join(','), ...rows].join('\n');
}

function csvToJson(csv: string): any[] {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {} as any);
  });
}

function detectFormat(input: string): 'json' | 'csv' | null {
  try {
    JSON.parse(input);
    return 'json';
  } catch (e) {
    if (input.includes(',')) return 'csv';
  }
  return null;
}

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [format, setFormat] = useState<'json' | 'csv' | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setFormat(null);
      return;
    }
    const detected = detectFormat(input);
    setFormat(detected);
    
    if (detected === 'json') {
      try {
        const data = JSON.parse(input);
        setOutput(jsonToCsv(Array.isArray(data) ? data : [data]));
      } catch (e) {
        setOutput('Invalid JSON');
      }
    } else if (detected === 'csv') {
      try {
        const data = csvToJson(input);
        setOutput(JSON.stringify(data, null, 2));
      } catch (e) {
        setOutput('Invalid CSV');
      }
    }
  }, [input]);

  return (
    <div className="min-h-screen bg-bg p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-display font-bold">JSON to CSV Converter</h1>
        <p className="text-gray-400">Convert between JSON and CSV formats.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium mb-2">Input</label>
          <textarea
            className="w-full h-96 p-4 bg-surface rounded border border-border focus:border-accent outline-none font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON or CSV here..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Output ({format === 'json' ? 'CSV' : format === 'csv' ? 'JSON' : '...'})</label>
          <textarea
            className="w-full h-96 p-4 bg-surface rounded border border-border focus:border-accent outline-none font-mono text-sm"
            value={output}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
