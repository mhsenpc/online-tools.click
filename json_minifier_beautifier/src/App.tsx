import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const process = (beautify: boolean) => {
    try {
      const data = JSON.parse(input);
      setOutput(JSON.stringify(data, null, beautify ? 2 : undefined));
    } catch (e) {
      setOutput('Error: Invalid JSON');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>JSON Minifier & Beautifier</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON here..."
      />
      <div>
        <button onClick={() => process(true)}>Beautify</button>
        <button onClick={() => process(false)}>Minify</button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '200px' }}
          value={output}
          readOnly
        />
        <button onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
      </div>
    </div>
  );
}

export default App;
