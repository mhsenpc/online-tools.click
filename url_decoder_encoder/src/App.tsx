import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('decode');

  const processUrl = (val: string, currentMode: 'encode' | 'decode') => {
    try {
      if (currentMode === 'decode') {
        setOutput(decodeURIComponent(val));
      } else {
        setOutput(encodeURIComponent(val));
      }
    } catch (e) {
      setOutput('Error: Invalid format');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>URL Decoder & Formatter</h1>
      <div>
        <button onClick={() => { setMode('encode'); setOutput(''); setInput(''); }}>Encode</button>
        <button onClick={() => { setMode('decode'); setOutput(''); setInput(''); }}>Decode</button>
      </div>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          processUrl(e.target.value, mode);
        }}
        placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter URL to decode...'}
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
