import React, { useState } from 'react';

const wordList = ["apple", "banana", "cherry", "dragon", "eagle", "forest", "galaxy", "harbor", "island", "jungle", "knight", "lemon", "mountain", "nebula", "ocean", "planet", "quartz", "river", "shadow", "tiger", "umbra", "valley", "wizard", "xenon", "yacht", "zebra"];

function App() {
  const [count, setCount] = useState(1);
  const [minLen, setMinLen] = useState(0);
  const [maxLen, setMaxLen] = useState(20);
  const [output, setOutput] = useState('');

  const generate = () => {
    const filteredWords = wordList.filter(w => w.length >= minLen && w.length <= maxLen);
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(filteredWords[Math.floor(Math.random() * filteredWords.length)]);
    }
    setOutput(result.join('\n'));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Random Word Generator</h1>
      <label>
        Count:
        <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} min="1" max="100" />
      </label>
      <label>
        Min Length:
        <input type="number" value={minLen} onChange={(e) => setMinLen(Number(e.target.value))} />
      </label>
      <label>
        Max Length:
        <input type="number" value={maxLen} onChange={(e) => setMaxLen(Number(e.target.value))} />
      </label>
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
