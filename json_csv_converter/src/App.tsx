import React, { useState, useMemo } from 'react';

// Flatten nested objects and arrays
const flattenObject = (obj: any, prefix = '', res: Record<string, any> = {}): Record<string, any> => {
  for (const key in obj) {
    const propName = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key], propName, res);
    } else if (Array.isArray(obj[key])) {
      // Handle arrays by converting to string representation
      res[propName] = JSON.stringify(obj[key]);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

// Get all unique keys from flattened objects
const getAllKeys = (objects: Record<string, any>[]): string[] => {
  const keys = new Set<string>();
  objects.forEach(obj => {
    Object.keys(obj).forEach(key => keys.add(key));
  });
  return Array.from(keys);
};

// Convert JSON to CSV
const jsonToCSV = (json: string, delimiter: string): string => {
  try {
    const parsed = JSON.parse(json);

    // Handle different input types
    let data: any[];
    if (Array.isArray(parsed)) {
      data = parsed;
    } else if (typeof parsed === 'object' && parsed !== null) {
      data = [parsed];
    } else {
      throw new Error('Input must be a JSON object or array of objects');
    }

    // Filter out non-object items
    data = data.filter(item => typeof item === 'object' && item !== null);

    if (data.length === 0) {
      throw new Error('No valid objects found in JSON');
    }

    // Flatten all objects
    const flattened = data.map(item => flattenObject(item));

    // Get all unique keys
    const keys = getAllKeys(flattened);

    // Escape CSV values
    const escapeCSV = (val: any): string => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      // Escape quotes and wrap in quotes if contains delimiter, quote, or newline
      if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    // Build CSV
    const header = keys.map(escapeCSV).join(delimiter);
    const rows = flattened.map(obj =>
      keys.map(key => escapeCSV(obj[key])).join(delimiter)
    );

    return [header, ...rows].join('\n');
  } catch (e) {
    throw new Error(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
};

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [error, setError] = useState('');
  const [delimiter, setDelimiter] = useState<',' | '\t' | ';'>(',');

  const delimiterName = useMemo(() => {
    switch (delimiter) {
      case ',': return 'Comma (,)';
      case '\t': return 'Tab';
      case ';': return 'Semicolon (;)';
    }
  }, [delimiter]);

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    setError('');

    if (!value.trim()) {
      setCsvOutput('');
      return;
    }

    try {
      const csv = jsonToCSV(value, delimiter);
      setCsvOutput(csv);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to convert JSON to CSV');
      setCsvOutput('');
    }
  };

  const handleDelimiterChange = (newDelimiter: ',' | '\t' | ';') => {
    setDelimiter(newDelimiter);
    if (jsonInput.trim()) {
      try {
        const csv = jsonToCSV(jsonInput, newDelimiter);
        setCsvOutput(csv);
        setError('');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to convert JSON to CSV');
        setCsvOutput('');
      }
    }
  };

  const downloadCSV = () => {
    if (!csvOutput) return;

    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'output.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadSample = () => {
    const sample = [
      {
        "name": "John Doe",
        "age": 30,
        "address": {
          "street": "123 Main St",
          "city": "New York",
          "country": "USA"
        },
        "hobbies": ["reading", "swimming", "coding"]
      },
      {
        "name": "Jane Smith",
        "age": 25,
        "address": {
          "street": "456 Oak Ave",
          "city": "Los Angeles",
          "country": "USA"
        },
        "hobbies": ["painting", "dancing"]
      }
    ];
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      color: '#ffffff'
    }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          JSON to CSV Converter
        </h1>
        <p style={{ color: '#a0aec0', fontSize: '1.1rem' }}>
          Convert JSON arrays to CSV format with automatic nested object flattening
        </p>
      </div>

      {/* Delimiter Selection */}
      <div style={{
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        border: '1px solid #333'
      }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#e0e0e0'
        }}>
          Delimiter:
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => handleDelimiterChange(',')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: delimiter === ',' ? '#667eea' : '#2d2d2d',
              color: '#ffffff',
              border: '1px solid #444',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Comma (,)
          </button>
          <button
            onClick={() => handleDelimiterChange('\t')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: delimiter === '\t' ? '#667eea' : '#2d2d2d',
              color: '#ffffff',
              border: '1px solid #444',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Tab
          </button>
          <button
            onClick={() => handleDelimiterChange(';')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: delimiter === ';' ? '#667eea' : '#2d2d2d',
              color: '#ffffff',
              border: '1px solid #444',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Semicolon (;)
          </button>
        </div>
      </div>

      {/* Sample Data Button */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={loadSample}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4a5568',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Load Sample Data
        </button>
      </div>

      {/* Input and Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* JSON Input */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#e0e0e0'
          }}>
            JSON Input:
          </label>
          <textarea
            style={{
              width: '100%',
              height: '400px',
              padding: '1rem',
              backgroundColor: '#1a1a1a',
              color: '#e0e0e0',
              border: '1px solid #333',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              resize: 'vertical'
            }}
            value={jsonInput}
            onChange={(e) => handleJsonChange(e.target.value)}
            placeholder={`Enter JSON array or object, e.g.:
[
  {
    "name": "John",
    "age": 30,
    "address": {
      "city": "New York"
    }
  }
]`}
          />
        </div>

        {/* CSV Output */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{
              fontWeight: '600',
              color: '#e0e0e0'
            }}>
              CSV Output ({delimiterName}):
            </label>
            <button
              onClick={downloadCSV}
              disabled={!csvOutput}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: csvOutput ? '#48bb78' : '#4a5568',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                cursor: csvOutput ? 'pointer' : 'not-allowed',
                fontSize: '0.9rem',
                opacity: csvOutput ? 1 : 0.5
              }}
            >
              Download CSV
            </button>
          </div>
          <textarea
            style={{
              width: '100%',
              height: '400px',
              padding: '1rem',
              backgroundColor: '#1a1a1a',
              color: '#e0e0e0',
              border: '1px solid #333',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              resize: 'vertical'
            }}
            value={csvOutput}
            readOnly
            placeholder="CSV output will appear here..."
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#c53030',
          color: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #9b2c2c'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Info Section */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        border: '1px solid #333'
      }}>
        <h3 style={{ marginTop: 0, color: '#e0e0e0' }}>Features:</h3>
        <ul style={{ color: '#a0aec0', lineHeight: '1.8' }}>
          <li><strong>Flattening:</strong> Nested objects are automatically flattened using dot notation (e.g., <code>address.city</code>)</li>
          <li><strong>Arrays:</strong> Array values are converted to JSON strings</li>
          <li><strong>Custom Delimiters:</strong> Choose between comma, tab, or semicolon</li>
          <li><strong>Export:</strong> Download your CSV file with one click</li>
          <li><strong>100% Client-Side:</strong> All processing happens in your browser - no data is sent to any server</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
