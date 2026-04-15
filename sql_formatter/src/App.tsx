import React, { useState } from 'react';

function App() {
  const [sql, setSql] = useState('');
  const [formatted, setFormatted] = useState('');

  const formatSQL = () => {
    // Simple basic formatter: uppercase keywords and basic indentation
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP BY', 'ORDER BY', 'LIMIT', 'HAVING'];
    let formattedSql = sql.toUpperCase();
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      formattedSql = formattedSql.replace(regex, `\n${keyword}`);
    });

    setFormatted(formattedSql.trim());
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SQL Query Formatter</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        placeholder="Paste SQL here..."
      />
      <button onClick={formatSQL}>Format SQL</button>
      <div style={{ marginTop: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '200px' }}
          value={formatted}
          readOnly
        />
        <button onClick={() => navigator.clipboard.writeText(formatted)}>Copy</button>
      </div>
    </div>
  );
}

export default App;
