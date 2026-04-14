import { useState } from 'react'

function App() {
  const [jsonInput, setJsonInput] = useState('')
  const [csvOutput, setCsvOutput] = useState('')
  const [error, setError] = useState('')

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

  const convertToCSV = () => {
    try {
      const data = JSON.parse(jsonInput)
      if (!Array.isArray(data)) {
        setError('JSON must be an array of objects')
        return
      }

      const flattenedData = data.map((item) => flattenObject(item))
      const headers = Array.from(new Set(flattenedData.flatMap((item) => Object.keys(item))))
      
      const csv = [
        headers.join(','),
        ...flattenedData.map((item) => 
          headers.map((h) => JSON.stringify(item[h] ?? '')).join(',')
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
      <button onClick={convertToCSV}>Convert to CSV</button>
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
