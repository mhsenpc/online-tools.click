import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'b64-to-hex' | 'hex-to-b64'>('b64-to-hex');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = (val: string, currentMode: 'b64-to-hex' | 'hex-to-b64') => {
    if (!val) {
        setOutput('');
        setError('');
        return;
    }
    try {
      if (currentMode === 'b64-to-hex') {
        const binary = atob(val.trim());
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        setOutput(Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(' '));
      } else {
        const cleanHex = val.replace(/\s/g, '');
        if (!/^[0-9a-fA-F]*$/.test(cleanHex)) throw new Error('Invalid Hex');
        const bytes = new Uint8Array(cleanHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        setOutput(btoa(binary));
      }
      setError('');
    } catch (e) {
      setOutput('');
      setError('Invalid input format');
    }
  };

  useEffect(() => {
      convert(input, mode);
  }, [input, mode]);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Base64 ↔ Hex Converter</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button 
            style={{ marginRight: '10px', backgroundColor: mode === 'b64-to-hex' ? '#007bff' : '#f0f0f0', color: mode === 'b64-to-hex' ? 'white' : 'black', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
            onClick={() => setMode('b64-to-hex')}>Base64 to Hex</button>
        <button 
            style={{ backgroundColor: mode === 'hex-to-b64' ? '#007bff' : '#f0f0f0', color: mode === 'hex-to-b64' ? 'white' : 'black', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
            onClick={() => setMode('hex-to-b64')}>Hex to Base64</button>
      </div>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
        Input ({mode === 'b64-to-hex' ? 'Base64' : 'Hex'}):
      </label>
      <textarea 
        style={{ width: '100%', height: '150px', padding: '8px', marginBottom: '1rem', boxSizing: 'border-box' }}
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder={mode === 'b64-to-hex' ? 'Enter Base64 string...' : 'Enter Hex string...'}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Output:</p>
        <p style={{ wordBreak: 'break-all', margin: '0.5rem 0 0 0' }}>{output}</p>
      </div>
      {output && (
        <button 
            style={{ marginTop: '1rem', padding: '8px 16px', cursor: 'pointer' }}
            onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))}>
            Copy to Clipboard
        </button>
      )}
    </div>
  );
}

export default App;