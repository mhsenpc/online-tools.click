import React, { useState, useMemo } from 'react';

const CSVFormatter = () => {
  const [input, setInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [formatted, setFormatted] = useState('');

  const formatCSV = () => {
    if (!input.trim()) return;
    
    // Simple split by delimiter, assuming no quoted commas
    const lines = input.split(/\r?\n/);
    const rows = lines.map(line => line.split(delimiter === '\\t' ? '\t' : delimiter));
    
    // Find max columns
    let maxCols = 0;
    rows.forEach(row => { if (row.length > maxCols) maxCols = row.length; });
    
    // Normalize and calculate column widths
    const normalizedRows = rows.map(row => {
      while(row.length < maxCols) row.push('');
      return row;
    });

    const colWidths = new Array(maxCols).fill(0);
    normalizedRows.forEach(row => {
      row.forEach((cell, i) => {
        const len = cell.length;
        if (len > colWidths[i]) colWidths[i] = len;
      });
    });

    // Generate ASCII table
    const header = normalizedRows.map(row => {
      return '| ' + row.map((cell, i) => cell.padEnd(colWidths[i], ' ')).join(' | ') + ' |';
    }).join('\n');
    
    // Add separator
    const separator = '+' + colWidths.map(w => '-'.repeat(w + 2)).join('+') + '+';
    const result = [
        separator,
        header,
        separator
    ].join('\n');

    setFormatted(result);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">CSV Formatter & Beautifier</h1>
        <textarea 
          className="w-full h-64 p-4 bg-[#141414] border border-[#333] rounded-lg mb-6 font-mono text-sm focus:border-blue-500 outline-none" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your CSV content here..."
        />
        <div className="flex gap-4 mb-6">
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)} className="bg-[#141414] border border-[#333] p-2 rounded-lg">
            <option value=",">Comma (,)</option>
            <option value="\t">Tab</option>
            <option value=";">Semicolon (;)</option>
            <option value="|">Pipe (|)</option>
          </select>
          <button onClick={formatCSV} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition">Format CSV</button>
        </div>
        {formatted && (
            <pre className="bg-[#1a1a1a] p-6 border border-[#333] rounded-lg overflow-x-auto font-mono text-sm">{formatted}</pre>
        )}
      </div>
    </div>
  );
};

export default CSVFormatter;
