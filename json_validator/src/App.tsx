import React, { useState } from 'react';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [schemaInput, setSchemaInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validate = () => {
    try {
      const data = JSON.parse(jsonInput);
      if (schemaInput.trim()) {
        try {
          const schema = JSON.parse(schemaInput);
          const validate = ajv.compile(schema);
          const valid = validate(data);
          setIsValid(valid);
          setResult(valid ? 'JSON is valid against the schema.' : JSON.stringify(validate.errors, null, 2));
        } catch (e: any) {
          setIsValid(false);
          setResult('Invalid Schema: ' + e.message);
        }
      } else {
        setIsValid(true);
        setResult('JSON syntax is valid.');
      }
    } catch (e: any) {
      setIsValid(false);
      let errorMessage = 'Invalid JSON: ' + e.message;
      
      // Try to find line and column if position is in the error message
      const positionMatch = e.message.match(/position (\d+)/);
      if (positionMatch) {
        const position = parseInt(positionMatch[1], 10);
        const lines = jsonInput.substring(0, position).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        errorMessage = `Invalid JSON: ${e.message} (Line ${line}, Column ${column})`;
      }
      
      setResult(errorMessage);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>JSON Validator & Schema Checker</h1>
      <textarea
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste JSON here..."
      />
      <textarea
        style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
        value={schemaInput}
        onChange={(e) => setSchemaInput(e.target.value)}
        placeholder="Optional JSON Schema..."
      />
      <button onClick={validate}>Validate</button>
      {result && (
        <div style={{ marginTop: '1rem', color: isValid ? 'green' : 'red' }}>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
