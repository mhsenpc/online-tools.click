import React, { useState } from 'react';

function App() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [result, setResult] = useState('');

  const generate = () => {
    let charset = '';
    if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setResult('Select at least one character set');
      return;
    }

    let retVal = '';
    for (let i = 0; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setResult(retVal);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Random String Generator</h1>
      <label>Length: {length}</label>
      <input type="range" min="1" max="128" value={length} onChange={(e) => setLength(Number(e.target.value))} />
      <div style={{ margin: '1rem 0' }}>
        <label><input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} /> Uppercase</label>
        <label><input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} /> Lowercase</label>
        <label><input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} /> Numbers</label>
        <label><input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} /> Symbols</label>
      </div>
      <button onClick={generate}>Generate</button>
      <div style={{ marginTop: '1rem' }}>
        <input type="text" value={result} readOnly style={{ width: '100%', marginBottom: '0.5rem' }} />
        <button onClick={() => navigator.clipboard.writeText(result)}>Copy</button>
      </div>
    </div>
  );
}

export default App;
