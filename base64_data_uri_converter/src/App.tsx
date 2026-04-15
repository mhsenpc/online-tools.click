import React, { useState } from 'react';

function App() {
  const [base64, setBase64] = useState('');
  const [mimeType, setMimeType] = useState('image/png');
  const [dataUri, setDataUri] = useState('');

  const generateDataUri = () => {
    setDataUri(`data:${mimeType};base64,${base64}`);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Base64 to Data URI Converter</h1>
      <input type="text" placeholder="MIME Type (e.g. image/png)" value={mimeType} onChange={(e) => setMimeType(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={base64}
        onChange={(e) => setBase64(e.target.value)}
        placeholder="Paste Base64 string..."
      />
      <button onClick={generateDataUri}>Generate Data URI</button>
      {dataUri && (
        <div style={{ marginTop: '1rem' }}>
          <textarea 
            style={{ width: '100%', height: '200px' }}
            value={dataUri}
            readOnly
          />
          <button onClick={() => navigator.clipboard.writeText(dataUri)}>Copy Data URI</button>
        </div>
      )}
    </div>
  );
}

export default App;
