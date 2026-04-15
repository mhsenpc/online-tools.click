import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatSQL = () => {
    try {
      const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP BY', 'ORDER BY', 'LIMIT', 'HAVING'];
      
      let formatted = input.replace(/\s+/g, ' ').trim();
      
      // Highlight keywords
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        formatted = formatted.replace(regex, `<span style="color: #ff79c6;">${keyword.toUpperCase()}</span>`);
        formatted = formatted.replace(new RegExp(`\n${keyword.toUpperCase()}`, 'gi'), `\n<span style="color: #ff79c6;">${keyword.toUpperCase()}</span>`);
      });
      
      const lines = formatted.split('\n');
      const outputLines = [];
      
      for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        if (line.match(/FROM|WHERE|AND|OR|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP BY|ORDER BY|LIMIT|HAVING/i)) {
          outputLines.push('  ' + line);
        } else {
          outputLines.push(line);
        }
      }
      
      setOutput(outputLines.join('\n'));
    } catch (e) {
      setOutput('Error: Could not format SQL. Please check syntax.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SQL Query Formatter (Standardized)</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem', background: '#1a1a1a', color: '#fff', padding: '1rem', border: '1px solid #333' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste SQL query here..."
      />
      <button onClick={formatSQL} style={{ padding: '0.5rem 1rem', background: '#50fa7b', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Format SQL</button>
      <div style={{ marginTop: '1rem' }}>
        <pre 
          style={{ width: '100%', height: '200px', background: '#1a1a1a', color: '#f8f8f2', padding: '1rem', border: '1px solid #333', overflow: 'auto', whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: output }}
        />
        <button onClick={() => navigator.clipboard.writeText(output.replace(/<[^>]*>/g, ''))} style={{ padding: '0.5rem 1rem', marginTop: '0.5rem', background: '#bd93f9', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Copy</button>
      </div>
    </div>
  );
}

export default App;
