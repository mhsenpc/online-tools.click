import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    try {
      const lines = input.trim().split('\n');
      if (lines.length < 2) {
        setOutput('Error: Invalid table format. Expecting header and data rows.');
        return;
      }
      
      const headers = lines[0].split(/\t+| +(?=[A-Z])/).filter(h => h.trim() !== '').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(/\t+| +(?=[A-Z])/).filter(v => v.trim() !== '').map(v => v.trim());
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index] ?? '';
          return obj;
        }, {} as any);
      });
      setOutput(JSON.stringify(data, null, 2));
    } catch (e) {
      setOutput('Error: Could not parse input');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SQL Result to JSON</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste SQL result set here..."
      />
      <button onClick={convert}>Convert to JSON</button>
      <div style={{ marginTop: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '200px' }}
          value={output}
          readOnly
        />
        <button onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
      </div>
    </div>
  );
}

export default App;
