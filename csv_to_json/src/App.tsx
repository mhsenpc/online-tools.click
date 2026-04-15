import { useState } from 'react'

function App() {
  const [csvInput, setCsvInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [error, setError] = useState('')

  const convertToJSON = () => {
    try {
      const lines = csvInput.trim().split('\n')
      if (lines.length < 2) {
        setError('CSV must have at least a header row and one data row')
        return
      }

      const headers = lines[0].split(',').map(h => h.trim())
      const data = lines.slice(1).map(line => {
        const values = line.split(',')
        return headers.reduce((obj, header, index) => {
          let val: any = values[index] ? values[index].trim() : ''
          // Try to infer numbers
          if (!isNaN(Number(val)) && val !== '') val = Number(val)
          // Try to infer booleans
          if (val === 'true') val = true
          if (val === 'false') val = false
          obj[header] = val
          return obj
        }, {} as any)
      })

      setJsonOutput(JSON.stringify(data, null, 2))
      setError('')
    } catch (e) {
      setError('Invalid CSV format')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>CSV to JSON Converter</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={csvInput}
        onChange={(e) => setCsvInput(e.target.value)}
        placeholder='Paste CSV here, e.g. name,age\nJohn,30'
      />
      <button onClick={convertToJSON}>Convert to JSON</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {jsonOutput && (
        <div style={{ marginTop: '1rem' }}>
          <textarea 
            style={{ width: '100%', height: '200px' }}
            value={jsonOutput}
            readOnly
          />
        </div>
      )}
    </div>
  )
}

export default App
