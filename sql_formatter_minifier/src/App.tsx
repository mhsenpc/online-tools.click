import React, { useState } from 'react';
import { format, SqlLanguage } from 'sql-formatter';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [dialect, setDialect] = useState<SqlLanguage>('sql');

  const formatSQL = () => {
    try {
      const result = format(input, { language: dialect });
      setOutput(result);
    } catch (e) {
      setOutput('Error: Invalid SQL');
    }
  };

  const minifySQL = () => {
    try {
      const result = format(input, { language: dialect, keywordCase: 'upper' });
      setOutput(result.replace(/\s+/g, ' ').trim());
    } catch (e) {
      setOutput('Error: Invalid SQL');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SQL Formatter & Minifier</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste SQL query here..."
      />
      <div style={{ marginBottom: '1rem' }}>
        <label>Dialect: </label>
        <select value={dialect} onChange={(e) => setDialect(e.target.value as SqlLanguage)}>
          <option value="sql">Standard SQL</option>
          <option value="mysql">MySQL</option>
          <option value="postgresql">PostgreSQL</option>
          <option value="sqlite">SQLite</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={formatSQL}>Format (Beautify)</button>
        <button onClick={minifySQL}>Minify</button>
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
