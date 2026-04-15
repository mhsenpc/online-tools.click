import { useState, useEffect, useCallback } from 'react'

function App() {
  const [csvInput, setCsvInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [error, setError] = useState('')

  const parseCSV = useCallback((csv: string) => {
    const lines = csv.trim().split('\n')
    if (lines.length < 2) return []

    // Improved parser to handle quotes
    const parseLine = (line: string) => {
      const result: string[] = []
      let current = ''
      let inQuotes = false
      for (let char of line) {
        if (char === '"') inQuotes = !inQuotes
        else if (char === ',' && !inQuotes) {
          result.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      result.push(current.trim())
      return result
    }

    const headers = parseLine(lines[0])
    return lines.slice(1).map(line => {
      const values = parseLine(line)
      return headers.reduce((obj, header, index) => {
        let val: any = values[index] !== undefined ? values[index] : ''
        // Try to infer numbers
        if (!isNaN(Number(val)) && val !== '') val = Number(val)
        // Try to infer booleans
        if (val.toLowerCase() === 'true') val = true
        else if (val.toLowerCase() === 'false') val = false
        obj[header] = val
        return obj
      }, {} as any)
    })
  }, [])

  useEffect(() => {
    if (!csvInput.trim()) {
      setJsonOutput('')
      setError('')
      return
    }
    try {
      const data = parseCSV(csvInput)
      if (data.length === 0) {
        setError('CSV must have at least a header row and one data row')
        setJsonOutput('')
      } else {
        setJsonOutput(JSON.stringify(data, null, 2))
        setError('')
      }
    } catch (e) {
      setError('Invalid CSV format')
    }
  }, [csvInput, parseCSV])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput)
      .then(() => alert('Copied to clipboard'))
      .catch(() => alert('Failed to copy'))
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>CSV to JSON Converter</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={csvInput}
        onChange={(e) => setCsvInput(e.target.value)}
        placeholder='Paste CSV here, e.g. name,age\n"John Doe",30'
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {jsonOutput && (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>JSON Output</h3>
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
          </div>
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
