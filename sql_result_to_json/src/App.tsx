import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    try {
      const lines = input.trim().split('\n');
      if (lines.length < 2) {
        setOutput('Error: Invalid CSV/Table format');
        return;
      }
      const headers = lines[0].split(/\t|,/).map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(/\t|,/);
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index] ? values[index].trim() : '';
          return obj;
        }, {} as any);
      });
      setOutput(JSON.stringify(data, null, 2));
    } catch (e) {
      setOutput('Error: Invalid format');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SQL Result Set to JSON</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste SQL result table here..."
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
