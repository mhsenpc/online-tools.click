import React, { useState, useEffect } from 'react';

function App() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [result, setResult] = useState('');
  const [entropy, setEntropy] = useState(0);

  const calculateEntropy = (len: number, pool: number) => {
    if (pool === 0) return 0;
    return Math.floor(len * Math.log2(pool));
  };

  const generate = () => {
    let charset = '';
    let pool = 0;
    if (useUpper) { charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; pool += 26; }
    if (useLower) { charset += 'abcdefghijklmnopqrstuvwxyz'; pool += 26; }
    if (useNumbers) { charset += '0123456789'; pool += 10; }
    if (useSymbols) { charset += '!@#$%^&*()_+~`|}{[]:;?><,./-='; pool += 32; }

    if (charset === '') {
      setResult('Select at least one character set');
      setEntropy(0);
      return;
    }

    let retVal = '';
    for (let i = 0; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setResult(retVal);
    setEntropy(calculateEntropy(length, pool));
  };

  useEffect(() => {
    generate();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Random String Generator</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Length: {length}</label>
        <input type="range" min="1" max="128" value={length} onChange={(e) => setLength(Number(e.target.value))} style={{ width: '100%' }} />
      </div>
      <div style={{ margin: '1rem 0' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <label><input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} /> Uppercase</label>
          <label><input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} /> Lowercase</label>
          <label><input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} /> Numbers</label>
          <label><input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} /> Symbols</label>
        </div>
      </div>
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <input type="text" value={result} readOnly style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', fontSize: '1.2rem', fontFamily: 'monospace' }} />
        <button onClick={generate} style={{ marginRight: '0.5rem' }}>Regenerate</button>
        <button onClick={() => navigator.clipboard.writeText(result)}>Copy</button>
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
          Entropy: <strong>{entropy} bits</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
