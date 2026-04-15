import React, { useState } from 'react';

const wordList = ["apple", "banana", "cherry", "dragon", "eagle", "forest", "galaxy", "harbor", "island", "jungle", "knight", "lemon", "mountain", "nebula", "ocean", "planet", "quartz", "river", "shadow", "tiger", "umbra", "valley", "wizard", "xenon", "yacht", "zebra"];

function App() {
  const [count, setCount] = useState(1);
  const [minLen, setMinLen] = useState(0);
  const [maxLen, setMaxLen] = useState(20);
  const [output, setOutput] = useState('');

  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (minLen > maxLen) {
      setError('Min length cannot be greater than Max length');
      return;
    }
    setError('');
    const filteredWords = wordList.filter(w => w.length >= minLen && w.length <= maxLen);
    
    if (filteredWords.length === 0) {
        setOutput('No words match criteria.');
        return;
    }

    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(filteredWords[Math.floor(Math.random() * filteredWords.length)]);
    }
    setOutput(result.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <h1>Random Word Generator</h1>
      
      <div className="controls">
        <div className="input-group">
          <label>Count:</label>
          <input type="number" value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))} min="1" max="100" />
        </div>
        <div className="input-group">
          <label>Min Length:</label>
          <input type="number" value={minLen} onChange={(e) => setMinLen(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label>Max Length:</label>
          <input type="number" value={maxLen} onChange={(e) => setMaxLen(Number(e.target.value))} />
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      
      <button className="generate-btn" onClick={generate}>Generate</button>
      
      <textarea 
        value={output}
        readOnly
      />
      
      <button className="copy-btn" onClick={copyToClipboard} disabled={!output}>
        {copied ? 'Copied!' : 'Copy All'}
      </button>
    </div>
  );
}

export default App;
