import React, { useState, useMemo } from 'react';

const CSVFormatter = () => {
  const [input, setInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [formatted, setFormatted] = useState('');

  const formatCSV = () => {
    if (!input.trim()) return;
    
    const lines = input.split('\n');
    const rows = lines.map(line => line.split(delimiter));
    
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
        if (cell.length > colWidths[i]) colWidths[i] = cell.length;
      });
    });

    // Generate ASCII table
    const result = normalizedRows.map(row => {
      return '| ' + row.map((cell, i) => cell.padEnd(colWidths[i], ' ')).join(' | ') + ' |';
    }).join('\n');

    setFormatted(result);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">CSV Formatter & Beautifier</h1>
      <textarea 
        className="w-full h-64 p-2 border mb-4" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste CSV here..."
      />
      <div className="flex gap-4 mb-4">
        <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)} className="border p-2">
          <option value=",">Comma (,)</option>
          <option value="\t">Tab</option>
          <option value=";">Semicolon (;)</option>
        </select>
        <button onClick={formatCSV} className="bg-blue-500 text-white p-2 rounded">Format</button>
      </div>
      <pre className="bg-white p-4 border whitespace-pre overflow-x-auto">{formatted}</pre>
    </div>
  );
};

export default CSVFormatter;
