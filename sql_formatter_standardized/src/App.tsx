import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatSQL = () => {
    // Basic formatting: uppercase keywords, some indentation
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP BY', 'ORDER BY', 'LIMIT', 'HAVING'];
    let formattedSql = input.toUpperCase();
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      formattedSql = formattedSql.replace(regex, `\n${keyword}\n`);
    });

    setOutput(formattedSql.split('\n').filter(l => l.trim() !== '').map(l => l.trim()).join('\n'));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SQL Query Formatter (Standardized)</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste SQL query here..."
      />
      <button onClick={formatSQL}>Format SQL</button>
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
