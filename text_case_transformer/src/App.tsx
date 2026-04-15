import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const transform = (type: string) => {
    let result = input;
    switch (type) {
      case 'upper':
        result = input.toUpperCase();
        break;
      case 'lower':
        result = input.toLowerCase();
        break;
      case 'title':
        result = input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
        break;
      case 'sentence':
        result = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        break;
    }
    setOutput(result);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Text Case Transformer</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text..."
      />
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => transform('upper')}>UPPERCASE</button>
        <button onClick={() => transform('lower')}>lowercase</button>
        <button onClick={() => transform('title')}>Title Case</button>
        <button onClick={() => transform('sentence')}>Sentence case</button>
      </div>
      <textarea 
        style={{ width: '100%', height: '200px' }}
        value={output}
        readOnly
      />
      <button onClick={() => navigator.clipboard.writeText(output)}>Copy Result</button>
    </div>
  );
}

export default App;
