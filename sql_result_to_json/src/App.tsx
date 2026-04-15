import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const parseValue = (val: string) => {
    const trimmed = val.trim();
    if (trimmed.toLowerCase() === 'true') return true;
    if (trimmed.toLowerCase() === 'false') return false;
    const num = Number(trimmed);
    if (!isNaN(num) && trimmed !== '') return num;
    return trimmed;
  };

  const convert = () => {
    try {
      const lines = input.trim().split('\n').filter(line => line.trim() !== '');
      if (lines.length < 2) {
        setOutput('Error: Invalid format. Please provide headers and data.');
        return;
      }

      let headers: string[] = [];
      let data: any[] = [];

      // Detect if piped table
      if (lines[0].includes('|')) {
        headers = lines[0].split('|').map(h => h.trim()).filter(h => h !== '');
        data = lines.slice(1).map(line => {
          return headers.reduce((obj, header, index) => {
             const val = line.split('|').filter(s => s.trim() !== '')[index];
             obj[header] = parseValue(val ? val.trim() : '');
             return obj;
          }, {} as any);
        });
      } else {
        // CSV/TSV
        const separator = lines[0].includes('\t') ? '\t' : ',';
        headers = lines[0].split(separator).map(h => h.trim());
        data = lines.slice(1).map(line => {
          const values = line.split(separator);
          return headers.reduce((obj, header, index) => {
            obj[header] = parseValue(values[index] ? values[index].trim() : '');
            return obj;
          }, {} as any);
        });
      }
      
      setOutput(JSON.stringify(data, null, 2));
    } catch (e) {
      setOutput('Error: Invalid format');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>SQL Result Set to JSON</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem', padding: '0.5rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste SQL result table here..."
      />
      <button 
        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        onClick={convert}
      >
        Convert to JSON
      </button>
      <div style={{ marginTop: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '200px', padding: '0.5rem', marginBottom: '0.5rem' }}
          value={output}
          readOnly
        />
        <button 
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
          onClick={() => navigator.clipboard.writeText(output)}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

export default App;
