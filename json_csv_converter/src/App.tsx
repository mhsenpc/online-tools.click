import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json' | 'auto'>('auto')

  const detectFormat = (str: string) => {
    const trimmed = str.trim();
    if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
      return 'json';
    }
    return 'csv';
  };

  const flattenObject = (obj: any, prefix = ''): any => {
    return Object.keys(obj).reduce((acc: any, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  };

  const convert = () => {
    const format = mode === 'auto' ? detectFormat(input) : (mode === 'json-to-csv' ? 'json' : 'csv');
    if (format === 'json') {
      convertToCSV();
    } else {
      convertToJSON();
    }
  };

  const convertToCSV = () => {
    try {
      const data = JSON.parse(input)
      if (!Array.isArray(data)) {
        setError('JSON must be an array of objects')
        return
      }

      const flattenedData = data.map((item) => flattenObject(item))
      const headers = Array.from(new Set(flattenedData.flatMap((item) => Object.keys(item))))
      
      const csv = [
        headers.join(delimiter),
        ...flattenedData.map((item) => 
          headers.map((h) => {
            const val = item[h] ?? '';
            const stringVal = typeof val === 'string' ? val : JSON.stringify(val);
            return `"${stringVal.replace(/"/g, '""')}"`;
          }).join(delimiter)
        )
      ].join('\n')

      setOutput(csv)
      setError('')
    } catch (e) {
      setError('Invalid JSON')
    }
  }

  const convertToJSON = () => {
    try {
      const lines = input.trim().split('\n');
      if (lines.length < 2) {
        setError('CSV must have headers and at least one data row');
        return;
      }
      const headers = lines[0].split(delimiter).map(h => h.replace(/^"|"$/g, '').trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(delimiter).map(v => v.replace(/^"|"$/g, '').trim());
        return headers.reduce((obj: any, header, index) => {
          obj[header] = values[index] || '';
          return obj;
        }, {} as any);
      });
      setOutput(JSON.stringify(data, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid CSV');
    }
  }

  const download = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>JSON ↔ CSV Converter</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Paste JSON or CSV here...'
      />
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          Mode:
          <select value={mode} onChange={(e) => setMode(e.target.value as any)}>
            <option value="auto">Auto-Detect</option>
            <option value="json-to-csv">JSON to CSV</option>
            <option value="csv-to-json">CSV to JSON</option>
          </select>
        </label>
        <label>
          Delimiter: 
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
          </select>
        </label>
      </div>
      <button onClick={convert}>Convert</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {output && (
        <div style={{ marginTop: '1rem' }}>
          <textarea 
            style={{ width: '100%', height: '200px' }}
            value={output}
            readOnly
          />
          <button onClick={() => download(output, 'data.txt')}>Download</button>
        </div>
      )}
    </div>
  )
}

export default App
