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
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Base64 URL Safe Encoder/Decoder</h1>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        This tool encodes text to URL-safe Base64 (using - and _) or decodes it back. 
        Everything happens in your browser for maximum privacy.
      </p>
      
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label>
          <input type="radio" name="mode" checked={mode === 'encode'} onChange={() => { setMode('encode'); setOutput(''); setInput(''); }} />
          Encode (Text → URL-Safe Base64)
        </label>
        <label>
          <input type="radio" name="mode" checked={mode === 'decode'} onChange={() => { setMode('decode'); setOutput(''); setInput(''); }} />
          Decode (URL-Safe Base64 → Text)
        </label>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input type="checkbox" checked={stripPadding} onChange={(e) => {
             const val = e.target.checked;
             setStripPadding(val);
             processBase64(input, mode, val);
          }} />
          Strip Padding (=)
        </label>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>{mode === 'encode' ? 'Input Text' : 'Input URL-Safe Base64'}</label>
        <textarea 
          style={{ width: '100%', height: '150px', padding: '0.5rem' }}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            processBase64(e.target.value, mode, stripPadding);
          }}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL-safe Base64...'}
        />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Output</label>
        <textarea 
          style={{ width: '100%', height: '150px', padding: '0.5rem', backgroundColor: '#f0f0f0' }}
          value={output}
          readOnly
        />
      </div>
    </div>
  );
}

export default App;
