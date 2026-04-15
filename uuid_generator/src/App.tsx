import React, { useState } from 'react';
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';

function App() {
  const [version, setVersion] = useState<'v1' | 'v4'>('v4');
  const [count, setCount] = useState(1);
  const [output, setOutput] = useState('');

  const generate = () => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(version === 'v1' ? uuidv1() : uuidv4());
    }
    setOutput(list.join('\n'));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>UUID Generator</h1>
      <select value={version} onChange={(e) => setVersion(e.target.value as 'v1' | 'v4')}>
        <option value="v4">UUID v4 (Random)</option>
        <option value="v1">UUID v1 (Time-based)</option>
      </select>
      <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} min="1" max="100" />
      <button onClick={generate}>Generate</button>
      <textarea 
        style={{ width: '100%', height: '200px', marginTop: '1rem' }}
        value={output}
        readOnly
      />
      <button onClick={() => navigator.clipboard.writeText(output)}>Copy All</button>
    </div>
  );
}

export default App;
