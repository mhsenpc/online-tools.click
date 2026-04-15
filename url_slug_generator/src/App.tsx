import React, { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState('-');
  const [lowercase, setLowercase] = useState(true);
  const [output, setOutput] = useState('');

  useEffect(() => {
    let slug = input
      .toString()
      .normalize('NFD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, separator); // replace spaces with separator

    if (!lowercase) {
        slug = input
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/\s+/g, separator);
    }

    setOutput(slug);
  }, [input, separator, lowercase]);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>URL Slug Generator</h1>
      <textarea 
        style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter title..."
      />
      <div>
        <label>Separator: 
            <select value={separator} onChange={(e) => setSeparator(e.target.value)}>
                <option value="-">-</option>
                <option value="_">_</option>
            </select>
        </label>
        <label>
            <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} />
            Lowercase
        </label>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <input type="text" style={{ width: '100%' }} value={output} readOnly />
        <button onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
      </div>
    </div>
  );
}

export default App;
