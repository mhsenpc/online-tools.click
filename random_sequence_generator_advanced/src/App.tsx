import React, { useState } from 'react';

function App() {
  const [mode, setMode] = useState<'range' | 'list'>('range');
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('10');
  const [list, setList] = useState<string>('');
  const [length, setLength] = useState<string>('5');
  const [result, setResult] = useState<string[]>([]);

  const generate = () => {
    let pool: string[] = [];
    const len = parseInt(length);

    if (mode === 'range') {
      const minVal = parseInt(min);
      const maxVal = parseInt(max);
      if (isNaN(minVal) || isNaN(maxVal) || minVal > maxVal) {
        alert('Invalid range');
        return;
      }
      for (let i = minVal; i <= maxVal; i++) {
        pool.push(i.toString());
      }
    } else {
      pool = list.split(/[,\n]/).map(s => s.trim()).filter(s => s !== '');
    }

    if (len > pool.length) {
      alert('Sequence length exceeds pool size');
      return;
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setResult(shuffled.slice(0, len));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.join(', '));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Random Sequence Generator</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setMode('range')}>Range</button>
        <button onClick={() => setMode('list')}>List</button>
      </div>

      {mode === 'range' ? (
        <div style={{ marginBottom: '1rem' }}>
          <input type="number" value={min} onChange={(e) => setMin(e.target.value)} placeholder="Min" />
          <input type="number" value={max} onChange={(e) => setMax(e.target.value)} placeholder="Max" />
        </div>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <textarea 
            style={{ width: '100%', height: '100px' }}
            value={list} 
            onChange={(e) => setList(e.target.value)} 
            placeholder="Items (comma or newline separated)" 
          />
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Sequence Length" />
      </div>

      <button onClick={generate} style={{ marginRight: '1rem' }}>Generate</button>
      <button onClick={copyToClipboard} disabled={result.length === 0}>Copy Result</button>

      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
        <strong>Result:</strong>
        <p>{result.join(', ')}</p>
      </div>
    </div>
  );
}

export default App;
