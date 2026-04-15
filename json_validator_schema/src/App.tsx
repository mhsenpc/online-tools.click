import React, { useState } from 'react';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [schemaInput, setSchemaInput] = useState('');
  const [result, setResult] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);

  const getErrorLine = (jsonString: string, errorMessage: string): number | null => {
    const match = errorMessage.match(/position (\d+)/);
    if (!match) return null;

    const position = parseInt(match[1]);
    let line = 1;
    for (let i = 0; i < position && i < jsonString.length; i++) {
      if (jsonString[i] === '\n') line++;
    }
    return line;
  };

  const validate = () => {
    setErrorLine(null);
    try {
      const data = JSON.parse(jsonInput);
      if (schemaInput.trim()) {
        const schema = JSON.parse(schemaInput);
        const validateFn = ajv.compile(schema);
        const valid = validateFn(data);
        setIsValid(valid);
        if (valid) {
          setResult('✅ JSON is valid against the schema.');
        } else {
          const formattedErrors = validateFn.errors?.map(err =>
            `- ${err.instancePath || 'root'}: ${err.message}`
          ).join('\n');
          setResult(`❌ Schema validation failed:\n${formattedErrors}`);
        }
      } else {
        setIsValid(true);
        setResult('✅ JSON syntax is valid.');
      }
    } catch (e: any) {
      setIsValid(false);
      const line = getErrorLine(jsonInput, e.message);
      if (line) {
        setErrorLine(line);
        setResult(`❌ Syntax error at line ${line}:\n${e.message}`);
      } else {
        setResult(`❌ Invalid JSON or Schema:\n${e.message}`);
      }
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1a1a1a' }}>
        JSON Validator & Schema Checker
      </h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem', color: '#333' }}>
          JSON Input
        </label>
        <textarea
          style={{
            width: '100%',
            height: '250px',
            marginBottom: '0.5rem',
            padding: '1rem',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontFamily: 'Monaco, Menlo, monospace',
            fontSize: '14px',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste JSON here..."
        />
        {errorLine && (
          <div style={{ fontSize: '13px', color: '#666' }}>
            Error location: line {errorLine}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem', color: '#333' }}>
          JSON Schema (optional)
        </label>
        <textarea
          style={{
            width: '100%',
            height: '150px',
            marginBottom: '0.5rem',
            padding: '1rem',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontFamily: 'Monaco, Menlo, monospace',
            fontSize: '14px',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
          value={schemaInput}
          onChange={(e) => setSchemaInput(e.target.value)}
          placeholder="Optional JSON Schema..."
        />
      </div>

      <button
        onClick={validate}
        style={{
          padding: '0.75rem 2rem',
          fontSize: '16px',
          fontWeight: '600',
          color: 'white',
          backgroundColor: '#007AFF',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0051D5'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007AFF'}
      >
        Validate
      </button>

      {result && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: isValid ? '#d4edda' : '#f8d7da',
          border: `2px solid ${isValid ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          <pre style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            color: isValid ? '#155724' : '#721c24',
            fontSize: '14px',
            fontWeight: isValid ? '500' : '400'
          }}>
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
