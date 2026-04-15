import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const shuffle = () => {
    // Split by comma or newline, trim whitespace, filter empty
    const items = input.split(/[,\n]/).map(i => i.trim()).filter(i => i !== '');
    
    // Fisher-Yates Shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    
    setOutput(items.join('\n'));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>List Shuffler & Randomizer</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter items separated by comma or newline..."
      />
      <button onClick={shuffle}>Shuffle List</button>
      <div style={{ marginTop: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '200px' }}
          value={output}
          readOnly
        />
        <button onClick={() => navigator.clipboard.writeText(output)}>Copy Result</button>
      </div>
    </div>
  );
}

export default App;
