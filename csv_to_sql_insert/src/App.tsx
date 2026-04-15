import React, { useState } from 'react';

function App() {
  const [csvInput, setCsvInput] = useState('');
  const [tableName, setTableName] = useState('my_table');
  const [sqlOutput, setSqlOutput] = useState('');

  const generateSQL = () => {
    try {
      const lines = csvInput.trim().split('\n');
      if (lines.length < 2) {
        setSqlOutput('Error: Invalid CSV. Need headers and data.');
        return;
      }
      
      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(',');
        return `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values.map(v => `'${v.trim()}'`).join(', ')});`;
      });
      
      setSqlOutput(data.join('\n'));
    } catch (e) {
      setSqlOutput('Error: Invalid format');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>CSV to SQL Insert Generator</h1>
      <input type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} placeholder="Table Name" style={{ width: '100%', marginBottom: '1rem' }} />
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={csvInput}
        onChange={(e) => setCsvInput(e.target.value)}
        placeholder="Paste CSV here (first line as headers)..."
      />
      <button onClick={generateSQL}>Generate SQL</button>
      <div style={{ marginTop: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '200px' }}
          value={sqlOutput}
          readOnly
        />
        <button onClick={() => navigator.clipboard.writeText(sqlOutput)}>Copy SQL</button>
      </div>
    </div>
  );
}

export default App;
