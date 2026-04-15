import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatSQL = () => {
    let result = input
      .replace(/\s+/g, ' ')
      .replace(/(\bSELECT\b|\bFROM\b|\bWHERE\b|\bAND\b|\bOR\b|\bINSERT\b|\bINTO\b|\bVALUES\b|\bUPDATE\b|\bSET\b|\bDELETE\b|\bJOIN\b|\bON\b|\bGROUP\s+BY\b|\bORDER\s+BY\b|\bLIMIT\b|\bHAVING\b)/gi, '\n$1\n')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '')
      .join('\n')
      .toUpperCase();
    setOutput(result);
  };

  const minifySQL = () => {
    const result = input
      .replace(/\s+/g, ' ')
      .replace(/--.*|(\/\*[\s\S]*?\*\/)/g, '')
      .trim();
    setOutput(result);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SQL Formatter & Minifier</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste SQL query here..."
      />
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={formatSQL}>Format (Beautify)</button>
        <button onClick={minifySQL}>Minify</button>
      </div>
      <textarea 
        style={{ width: '100%', height: '200px' }}
        value={output}
        readOnly
      />
      <button onClick={() => navigator.clipboard.writeText(output)}>Copy Result</button>
    </div>
  );
}

export default App;
