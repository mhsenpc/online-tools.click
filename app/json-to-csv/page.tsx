
'use client';

import { useState } from 'react';

export default function JsonToCsvConverter() {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [error, setError] = useState('');
  const [delimiter, setDelimiter] = useState(',');

  const flattenObject = (obj: Record<string, unknown>, prefix = ''): Record<string, unknown> => {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      const val = obj[k];
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        Object.assign(acc, flattenObject(val as Record<string, unknown>, pre + k));
      } else {
        acc[pre + k] = val;
      }
      return acc;
    }, {} as Record<string, unknown>);
  };

  const handleConvert = () => {
    try {
      const data: unknown = JSON.parse(jsonInput);
      if (!Array.isArray(data)) {
        throw new Error('Input must be an array of objects');
      }
      
      const flattenedData = data.map(item => flattenObject(item as Record<string, unknown>));
      const headers = Array.from(new Set(flattenedData.flatMap(obj => Object.keys(obj))));
      const csv = [
        headers.join(delimiter),
        ...flattenedData.map(obj => headers.map(header => {
            const val = obj[header];
            return typeof val === 'string' && val.includes(delimiter) ? `"${val}"` : val || '';
        }).join(delimiter))
      ].join('\n');
      
      setCsvOutput(csv);
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleExport = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">JSON to CSV Converter</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste JSON array here..."
      />
      <div className="mb-4">
        <label className="mr-2">Delimiter:</label>
        <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
          <option value=",">Comma (,)</option>
          <option value="\t">Tab (\t)</option>
          <option value=";">Semicolon (;)</option>
        </select>
      </div>
      <div className="mb-4 space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleConvert}
        >
          Convert
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleExport}
          disabled={!csvOutput}
        >
          Export CSV
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={csvOutput}
        readOnly
        placeholder="CSV output..."
      />
    </div>
  );
}
