import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [markdownOutput, setMarkdownOutput] = useState('');

  const convertToMarkdown = () => {
    try {
      const data = JSON.parse(jsonInput);
      if (!Array.isArray(data) || data.length === 0) {
        setMarkdownOutput('Error: Please provide a non-empty JSON array');
        return;
      }

      const headers = Object.keys(data[0]);
      let md = `| ${headers.join(' | ')} |\n`;
      md += `| ${headers.map(() => '---').join(' | ')} |\n`;
      
      data.forEach(item => {
        md += `| ${headers.map(h => item[h] ?? '').join(' | ')} |\n`;
      });
      
      setMarkdownOutput(md);
    } catch (e) {
      setMarkdownOutput('Error: Invalid JSON');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>JSON to Markdown Table Converter</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Paste JSON array here, e.g. [{"name": "John", "age": 30}]'
      />
      <button onClick={convertToMarkdown}>Convert to Markdown</button>
      <div style={{ marginTop: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '200px' }}
          value={markdownOutput}
          readOnly
        />
        <button onClick={() => navigator.clipboard.writeText(markdownOutput)}>Copy Markdown</button>
      </div>
    </div>
  );
}

export default App;
