import React, { useState } from 'react';

const wordList = ["apple", "banana", "cherry", "dragon", "eagle", "forest", "galaxy", "harbor", "island", "jungle", "knight", "lemon", "mountain", "nebula", "ocean", "planet", "quartz", "river", "shadow", "tiger", "umbra", "valley", "wizard", "xenon", "yacht", "zebra"];

function App() {
  const [count, setCount] = useState(1);
  const [output, setOutput] = useState('');

  const generate = () => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    setOutput(result.join(', '));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Random Word Generator (Browser Edition)</h1>
      <label>
        Count:
        <input type="number" value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value)))} min="1" max="100" />
      </label>
      <button onClick={generate}>Generate</button>
      <div style={{ marginTop: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '100px' }}
          value={output}
          readOnly
        />
        <button onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
      </div>
    </div>
  );
}

export default App;
