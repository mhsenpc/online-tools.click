import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'text-to-binary' | 'binary-to-text'>('text-to-binary');

  const convert = (val: string, currentMode: 'text-to-binary' | 'binary-to-text') => {
    try {
      if (currentMode === 'text-to-binary') {
        const binary = val.split('').map(char => {
          return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
        setOutput(binary);
      } else {
        const text = val.trim().split(/\s+/).map(bin => {
          return String.fromCharCode(parseInt(bin, 2));
        }).join('');
        setOutput(text);
      }
    } catch (e) {
      setOutput('Error: Invalid format');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Binary ↔ Text Converter</h1>
      <button onClick={() => { setMode('text-to-binary'); setOutput(''); setInput(''); }}>Text to Binary</button>
      <button onClick={() => { setMode('binary-to-text'); setOutput(''); setInput(''); }}>Binary to Text</button>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          convert(e.target.value, mode);
        }}
        placeholder={mode === 'text-to-binary' ? 'Enter text to convert to binary...' : 'Enter binary (e.g. 01000001)...'}
      />
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
