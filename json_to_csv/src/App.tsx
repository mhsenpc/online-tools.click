import { useState } from 'react'

function App() {
  const [jsonInput, setJsonInput] = useState('')
  const [csvOutput, setCsvOutput] = useState('')
  const [error, setError] = useState('')

  const [delimiter, setDelimiter] = useState(',')
  const [arraySeparator, setArraySeparator] = useState(';')
  const [maxDepth, setMaxDepth] = useState<number | null>(null) // null = infinite

  const [columnMap, setColumnMap] = useState<Record<string, string>>({})
  const [headers, setHeaders] = useState<string[]>([])

  const flattenObject = (obj: any, prefix = '', currentDepth = 0): any => {
    return Object.keys(obj).reduce((acc: any, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      const isObject = typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k]);
      const isArray = Array.isArray(obj[k]);

      if (isObject && (maxDepth === null || currentDepth < maxDepth)) {
        Object.assign(acc, flattenObject(obj[k], pre + k, currentDepth + 1));
      } else if (isArray) {
        acc[pre + k] = obj[k].join(arraySeparator);
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  };

  const convertToCSV = (useMapping = true) => {
    try {
      const data = JSON.parse(jsonInput)
      if (!Array.isArray(data)) {
        setError('JSON must be an array of objects')
        return
      }

      const flattenedData = data.map((item) => flattenObject(item))
      const allHeaders = Array.from(new Set(flattenedData.flatMap((item) => Object.keys(item))))
      
      setHeaders(allHeaders)

      const csvHeaders = allHeaders.map(h => useMapping ? (columnMap[h] || h) : h)

      const csv = [
        csvHeaders.join(delimiter),
        ...flattenedData.map((item) => 
          allHeaders.map((h) => {
            const val = item[h] ?? '';
            // Escape double quotes and wrap in quotes
            const stringVal = typeof val === 'string' ? val : JSON.stringify(val);
            return `"${stringVal.replace(/"/g, '""')}"`;
          }).join(delimiter)
        )
      ].join('\n')

      setCsvOutput(csv)
      setError('')
    } catch (e) {
      setError('Invalid JSON')
    }
  }

  const downloadCSV = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.csv'
    a.click()
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>JSON to CSV Converter</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Paste JSON array here, e.g. [{"name": "John", "age": 30}]'
      />
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <label>
          Delimiter: 
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
          </select>
        </label>
        <label>
          Array Separator: 
          <input 
            type="text" 
            value={arraySeparator} 
            onChange={(e) => setArraySeparator(e.target.value)} 
            style={{ width: '40px' }}
          />
        </label>
        <label>
          Max Depth: 
          <input 
            type="number" 
            value={maxDepth ?? ''} 
            onChange={(e) => setMaxDepth(e.target.value ? parseInt(e.target.value) : null)} 
            style={{ width: '40px' }}
            placeholder="∞"
          />
        </label>
      </div>
      {headers.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Column Mapping</h3>
          {headers.map(h => (
            <div key={h} style={{ marginBottom: '0.5rem' }}>
              <label>
                {h}: 
                <input 
                  type="text" 
                  value={columnMap[h] || h} 
                  onChange={(e) => setColumnMap({...columnMap, [h]: e.target.value})} 
                />
              </label>
            </div>
          ))}
          <button onClick={() => convertToCSV(true)}>Apply Mapping & Convert</button>
        </div>
      )}
      <button onClick={() => convertToCSV(false)}>Convert to CSV</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {csvOutput && (
        <div style={{ marginTop: '1rem' }}>
          <textarea 
            style={{ width: '100%', height: '200px' }}
            value={csvOutput}
            readOnly
          />
          <button onClick={downloadCSV}>Download CSV</button>
        </div>
      )}
    </div>
  )
}

export default App
