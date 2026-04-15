import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('decode');

  const [params, setParams] = useState<[string, string][]>([]);

  const processUrl = (val: string, currentMode: 'encode' | 'decode') => {
    try {
      if (currentMode === 'decode') {
        // Try parsing as full URL
        try {
          const url = new URL(val);
          const p = Array.from(url.searchParams.entries());
          setParams(p);
          setOutput(decodeURIComponent(val));
        } catch {
          // If not a full URL, treat as encoded string
          setParams([]);
          setOutput(decodeURIComponent(val));
        }
      } else {
        setParams([]);
        setOutput(encodeURIComponent(val));
      }
    } catch (e) {
      setParams([]);
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
        style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          processUrl(e.target.value, mode);
        }}
        placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter URL to decode...'}
      />
      
      {params.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Key</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Value</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {params.map(([key, val], idx) => (
              <tr key={idx}>
                <td style={{ borderBottom: '1px solid #eee' }}>{key}</td>
                <td style={{ borderBottom: '1px solid #eee' }}>{val}</td>
                <td style={{ borderBottom: '1px solid #eee' }}>
                  <button onClick={() => navigator.clipboard.writeText(val)}>Copy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <textarea 
        style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
        value={output}
        readOnly
      />
      <button onClick={() => navigator.clipboard.writeText(output)}>Copy Result</button>
    </div>
  );
}

export default App;
