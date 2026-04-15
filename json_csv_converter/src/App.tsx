import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv');

  const convert = () => {
    try {
      if (mode === 'json-to-csv') {
        const data = JSON.parse(input);
        const headers = Array.from(new Set(data.flatMap((i: any) => Object.keys(i)))) as string[];
        const csv = [headers.join(','), ...data.map((i: any) => headers.map(h => i[h] ?? '').join(','))].join('\n');
        setOutput(csv);
      } else {
        const lines = input.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj: any, header, index) => {
            obj[header] = values[index] ? values[index].trim() : '';
            return obj;
          }, {} as any);
        });
        setOutput(JSON.stringify(data, null, 2));
      }
    } catch (e) {
      setOutput('Error: Invalid format');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>JSON ↔ CSV Converter</h1>
      <button onClick={() => setMode('json-to-csv')}>JSON to CSV</button>
      <button onClick={() => setMode('csv-to-json')}>CSV to JSON</button>
      <textarea style={{ width: '100%', height: '200px' }} value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={convert}>Convert</button>
      <textarea style={{ width: '100%', height: '200px' }} value={output} readOnly />
    </div>
  );
}

export default App;
