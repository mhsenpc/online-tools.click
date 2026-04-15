import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [stripPadding, setStripPadding] = useState(false);

  const processBase64 = (val: string, currentMode: 'encode' | 'decode', strip: boolean) => {
    try {
      if (currentMode === 'encode') {
        // Base64 encoding + URL-safe transformation
        let b64 = btoa(val);
        if (strip) b64 = b64.replace(/=+$/, '');
        const urlSafe = b64.replace(/\+/g, '-').replace(/\//g, '_');
        setOutput(urlSafe);
      } else {
        // URL-safe to Standard Base64 + decoding
        let b64 = val.replace(/-/g, '+').replace(/_/g, '/');
        // Add padding if missing
        while (b64.length % 4 !== 0) b64 += '=';
        setOutput(atob(b64));
      }
    } catch (e) {
      setOutput('Error: Invalid format');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Base64 URL Safe Encoder/Decoder</h1>
      <div>
        <button onClick={() => { setMode('encode'); setOutput(''); setInput(''); }}>Encode (URL-Safe)</button>
        <button onClick={() => { setMode('decode'); setOutput(''); setInput(''); }}>Decode (URL-Safe)</button>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={stripPadding} onChange={(e) => setStripPadding(e.target.checked)} />
          Strip Padding (=)
        </label>
      </div>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          processBase64(e.target.value, mode, stripPadding);
        }}
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL-safe Base64...'}
      />
      <textarea 
        style={{ width: '100%', height: '200px' }}
        value={output}
        readOnly
      />
    </div>
  );
}

export default App;
