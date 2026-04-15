import React, { useState } from 'react';
import './index.css';

function App() {
  const [html, setHtml] = useState('<h1>Hello World</h1>');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>HTML Previewer</h1>
      </header>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <textarea 
          style={{ width: '50%', height: '100%', padding: '1rem', border: 'none', borderRight: '1px solid #ccc', resize: 'none', outline: 'none', fontSize: '16px' }}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="Paste your HTML here..."
        />
        <iframe
          title="preview"
          srcDoc={html}
          style={{ width: '50%', height: '100%', border: 'none' }}
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}

export default App;
