import { useState } from 'react'

function App() {
  const [jsonInput, setJsonInput] = useState('')
  const [csvOutput, setCsvOutput] = useState('')
  const [flattenedData, setFlattenedData] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])

  const updateCSV = (data: any[], headers: string[]) => {
    const csv = [
        headers.join(delimiter),
        ...data.map((item) => 
          headers.map((h) => {
            const val = item[h] ?? '';
            const stringVal = typeof val === 'string' ? val : JSON.stringify(val);
            return `"${stringVal.replace(/"/g, '""')}"`;
          }).join(delimiter)
        )
      ].join('\n')

      setCsvOutput(csv)
  }

  const convertToCSV = () => {
    try {
      const data = JSON.parse(jsonInput)
      if (!Array.isArray(data)) {
        setError('JSON must be an array of objects')
        return
      }

      const flattened = data.map((item) => flattenObject(item, '', 0, maxDepth, arraySeparator))
      setFlattenedData(flattened)
      
      const allHeaders = Array.from(new Set(flattened.flatMap((item) => Object.keys(item)))) as string[]
      setColumns(allHeaders)
      setSelectedColumns(allHeaders)
      
      updateCSV(flattened, allHeaders)
      setError('')
    } catch (e) {
      setError('Invalid JSON')
    }
  }
    return Object.keys(obj).reduce((acc: any, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (Array.isArray(obj[k])) {
        acc[pre + k] = obj[k].join(arraySeparator);
      } else if (typeof obj[k] === 'object' && obj[k] !== null) {
        Object.assign(acc, flattenObject(obj[k], pre + k, depth + 1, maxDepth, arraySeparator));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  };

  const convertToCSV = () => {
    try {
      const data = JSON.parse(jsonInput)
      if (!Array.isArray(data)) {
        setError('JSON must be an array of objects')
        return
      }

      const flattenedData = data.map((item) => flattenObject(item, '', 0, maxDepth, arraySeparator))
      const allHeaders = Array.from(new Set(flattenedData.flatMap((item) => Object.keys(item))))
      setColumns(allHeaders)
      setSelectedColumns(allHeaders)
      
      const headers = allHeaders
      const csv = [
        headers.join(delimiter),
        ...flattenedData.map((item) => 
          headers.map((h) => {
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
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Delimiter: 
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
          </select>
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Max Depth:
          <input type="number" value={maxDepth} onChange={(e) => setMaxDepth(parseInt(e.target.value))} />
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Array Separator:
          <input type="text" value={arraySeparator} onChange={(e) => setArraySeparator(e.target.value)} />
        </label>
      </div>
      <button onClick={convertToCSV}>Convert to CSV</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {csvOutput && (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3>Columns:</h3>
            {columns.map(col => (
              <label key={col} style={{ marginRight: '1rem', display: 'inline-block' }}>
                <input 
                  type="checkbox" 
                  checked={selectedColumns.includes(col)}
                  onChange={(e) => {
                    const newSelected = e.target.checked 
                      ? [...selectedColumns, col]
                      : selectedColumns.filter(c => c !== col);
                    setSelectedColumns(newSelected);
                    updateCSV(flattenedData, newSelected);
                  }}
                />
                {col}
              </label>
            ))}
          </div>
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
