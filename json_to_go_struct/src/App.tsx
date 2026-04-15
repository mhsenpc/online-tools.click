import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [goStruct, setGoStruct] = useState('');

  const generateGoStruct = (obj: any, name: string): string => {
    let struct = `type ${name} struct {\n`;
    for (const key in obj) {
      const val = obj[key];
      const type = Array.isArray(val) ? `[]${typeof val[0]}` : typeof val;
      const goType = type === 'number' ? 'float64' : type.charAt(0).toUpperCase() + type.slice(1);
      struct += `  ${key.charAt(0).toUpperCase() + key.slice(1)} ${goType} \`json:"${key}"\`\n`;
    }
    struct += '}';
    return struct;
  };

  const convert = () => {
    try {
      const data = JSON.parse(jsonInput);
      setGoStruct(generateGoStruct(data, 'Result'));
    } catch (e) {
      setGoStruct('Error: Invalid JSON');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>JSON to Go Struct</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste JSON here..."
      />
      <button onClick={convert}>Convert to Go</button>
      <div style={{ marginTop: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '200px' }}
          value={goStruct}
          readOnly
        />
        <button onClick={() => navigator.clipboard.writeText(goStruct)}>Copy</button>
      </div>
    </div>
  );
}

export default App;
