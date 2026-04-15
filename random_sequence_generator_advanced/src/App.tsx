import { useState } from 'react';

function App() {
  const [mode, setMode] = useState<'range' | 'custom'>('range');
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [customItems, setCustomItems] = useState('');
  const [length, setLength] = useState(5);
  const [result, setResult] = useState<string[]>([]);

  const generate = () => {
    let pool: string[] = [];
    if (mode === 'range') {
      for (let i = min; i <= max; i++) {
        pool.push(i.toString());
      }
    } else {
      pool = customItems.split(/[,\n]/).map(s => s.trim()).filter(s => s !== '');
    }

    if (pool.length < length) {
      alert('Pool size is smaller than the requested sequence length');
      return;
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setResult(shuffled.slice(0, length));
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result.join(', '));
    alert('Copied to clipboard');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Random Sequence Generator</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input type="radio" checked={mode === 'range'} onChange={() => setMode('range')} />
          Range
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input type="radio" checked={mode === 'custom'} onChange={() => setMode('custom')} />
          Custom Pool
        </label>
      </div>

      {mode === 'range' ? (
        <div style={{ marginBottom: '1rem' }}>
          <label>Min: <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} /></label>
          <label style={{ marginLeft: '1rem' }}>Max: <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} /></label>
        </div>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <textarea value={customItems} onChange={(e) => setCustomItems(e.target.value)} placeholder="Enter items separated by comma or newline" style={{ width: '100%', height: '100px' }} />
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label>Length: <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} /></label>
      </div>

      <button onClick={generate}>Generate</button>

      {result.length > 0 && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
          <h3>Result:</h3>
          <p>{result.join(', ')}</p>
          <button onClick={copyResult}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

export default App;
