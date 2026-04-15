import React, { useState } from 'react';

function App() {
  const [html, setHtml] = useState('<h1>Hello World</h1>');

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>HTML Previewer</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        placeholder="Paste your HTML here..."
      />
      <iframe
        title="preview"
        srcDoc={html}
        style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}
        sandbox="allow-scripts"
      />
    </div>
  );
}

export default App;
