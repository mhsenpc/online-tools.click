import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    try {
      const lines = input.trim().split('\n').filter(line => line.trim() !== '');
      if (lines.length < 2) {
        setOutput('Error: Invalid table format. Expecting at least header and one data row.');
        return;
      }

      // Detect delimiter
      const firstLine = lines[0];
      let delimiter = /\t+/;
      if (firstLine.includes('|')) {
        delimiter = /\|/;
      } else if (firstLine.includes('\t')) {
        delimiter = /\t+/;
      } else {
        // Fallback to 2+ spaces
        delimiter = /\s{2,}/;
      }

      const headers = firstLine.split(delimiter).map(h => h.trim()).filter(h => h !== '');
      const data = lines.slice(1).map(line => {
        const values = line.split(delimiter).map(v => v.trim());
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index] ?? '';
          return obj;
        }, {} as any);
      });
      setOutput(JSON.stringify(data, null, 2));
    } catch (e) {
      setOutput('Error: Could not parse input. Please ensure it follows a valid table format.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>SQL Result to JSON</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '8px', border: '1px solid #333', background: '#111', color: '#eee', boxSizing: 'border-box' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste SQL result set here (tab, pipe, or space separated)..."
        />
        <button 
          style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', background: '#0070f3', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={convert}
        >
          Convert to JSON
        </button>
        <div style={{ marginTop: '1rem' }}>
          <textarea 
            style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '8px', border: '1px solid #333', background: '#111', color: '#eee', boxSizing: 'border-box' }}
            value={output}
            readOnly
            placeholder="JSON output will appear here..."
          />
          <button 
            style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff', cursor: 'pointer' }}
            onClick={() => navigator.clipboard.writeText(output)}
          >
            Copy JSON
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
