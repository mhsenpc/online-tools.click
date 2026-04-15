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
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set())
  const [flattenedData, setFlattenedData] = useState<any[]>([])

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

  const convertToCSV = (useMapping = true, selectedColumns?: Set<string>) => {
    try {
      const data = JSON.parse(jsonInput)
      if (!Array.isArray(data)) {
        setError('JSON must be an array of objects')
        return
      }

      const newFlattenedData = data.map((item) => flattenObject(item))
      const allHeaders = Array.from(new Set(newFlattenedData.flatMap((item) => Object.keys(item))))

      setHeaders(allHeaders)
      setFlattenedData(newFlattenedData)

      // Initialize all columns as visible if not already set
      if (visibleColumns.size === 0) {
        setVisibleColumns(new Set(allHeaders))
      }

      // Filter columns based on visibility
      const columnsToInclude = selectedColumns || visibleColumns
      const filteredHeaders = allHeaders.filter(h => columnsToInclude.has(h))

      const csvHeaders = filteredHeaders.map(h => useMapping ? (columnMap[h] || h) : h)

      const csv = [
        csvHeaders.join(delimiter),
        ...newFlattenedData.map((item) =>
          filteredHeaders.map((h) => {
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

  // Update CSV preview when column visibility changes
  const updatePreview = (newVisibleColumns: Set<string>) => {
    if (flattenedData.length > 0) {
      const filteredHeaders = headers.filter(h => newVisibleColumns.has(h))
      const csvHeaders = filteredHeaders.map(h => columnMap[h] || h)

      const csv = [
        csvHeaders.join(delimiter),
        ...flattenedData.map((item) =>
          filteredHeaders.map((h) => {
            const val = item[h] ?? '';
            const stringVal = typeof val === 'string' ? val : JSON.stringify(val);
            return `"${stringVal.replace(/"/g, '""')}"`;
          }).join(delimiter)
        )
      ].join('\n')

      setCsvOutput(csv)
    }
  }

  const toggleColumn = (header: string) => {
    const newVisibleColumns = new Set(visibleColumns)
    if (newVisibleColumns.has(header)) {
      newVisibleColumns.delete(header)
    } else {
      newVisibleColumns.add(header)
    }
    setVisibleColumns(newVisibleColumns)
    updatePreview(newVisibleColumns)
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
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>JSON to CSV Converter</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Universal converter with advanced filtering support — select specific columns to export
      </p>
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
          <h3>Column Visibility</h3>
          <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.5rem' }}>
            Select which columns to include in the CSV export
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0.5rem',
            marginBottom: '1rem',
            maxHeight: '200px',
            overflowY: 'auto',
            padding: '0.5rem',
            backgroundColor: '#111',
            borderRadius: '4px',
            border: '1px solid #333'
          }}>
            {headers.map(h => (
              <label key={h} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                <input
                  type="checkbox"
                  checked={visibleColumns.has(h)}
                  onChange={() => toggleColumn(h)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{
                  opacity: visibleColumns.has(h) ? 1 : 0.4,
                  textDecoration: visibleColumns.has(h) ? 'none' : 'line-through'
                }}>
                  {h}
                </span>
              </label>
            ))}
          </div>

          <h3>Column Mapping (Optional)</h3>
          <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.5rem' }}>
            Rename columns for the CSV header
          </p>
          {headers.filter(h => visibleColumns.has(h)).map(h => (
            <div key={h} style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ minWidth: '150px', fontSize: '0.9rem' }}>{h}:</span>
                <input
                  type="text"
                  value={columnMap[h] || h}
                  onChange={(e) => setColumnMap({...columnMap, [h]: e.target.value})}
                  placeholder={h}
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '3px',
                    border: '1px solid #333',
                    backgroundColor: '#111',
                    color: '#fff',
                    flex: 1
                  }}
                />
              </label>
            </div>
          ))}
          <button
            onClick={() => convertToCSV(true)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ff3e00',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            Apply Mapping & Update
          </button>
        </div>
      )}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button
          onClick={() => {
            setVisibleColumns(new Set())
            convertToCSV(false)
          }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ff3e00',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Convert to CSV
        </button>
        {headers.length > 0 && (
          <button
            onClick={() => {
              const allColumns = new Set(headers)
              setVisibleColumns(allColumns)
              updatePreview(allColumns)
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Select All
          </button>
        )}
        {headers.length > 0 && (
          <button
            onClick={() => {
              setVisibleColumns(new Set())
              updatePreview(new Set())
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Deselect All
          </button>
        )}
      </div>
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
