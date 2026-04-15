import { useState, useEffect, useMemo } from 'react'
import './App.css'

function App() {
  const [jsonInput, setJsonInput] = useState('')
  const [csvOutput, setCsvOutput] = useState('')
  const [error, setError] = useState('')

  const [delimiter, setDelimiter] = useState(',')
  const [arraySeparator, setArraySeparator] = useState(';')
  const [maxDepth, setMaxDepth] = useState<number | null>(null)

  const [columnMap, setColumnMap] = useState<Record<string, string>>({})
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({})
  const [headers, setHeaders] = useState<string[]>([])

  const [previewMode, setPreviewMode] = useState(false)

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
  }

  const parseAndFlattenJSON = () => {
    try {
      const data = JSON.parse(jsonInput)
      if (!Array.isArray(data)) {
        setError('JSON must be an array of objects')
        return { flattenedData: [], headers: [] }
      }

      const flattenedData = data.map((item) => flattenObject(item))
      const allHeaders = Array.from(new Set(flattenedData.flatMap((item) => Object.keys(item))))

      return { flattenedData, headers: allHeaders }
    } catch (e) {
      setError('Invalid JSON')
      return { flattenedData: [], headers: [] }
    }
  }

  const generateCSV = (useMapping = true, useVisibility = true) => {
    const { flattenedData, headers: newHeaders } = parseAndFlattenJSON()

    if (newHeaders.length === 0) return

    const visibleHeaders = useVisibility
      ? newHeaders.filter(h => columnVisibility[h] !== false)
      : newHeaders

    const csvHeaders = visibleHeaders.map(h => useMapping ? (columnMap[h] || h) : h)

    const csv = [
      csvHeaders.join(delimiter),
      ...flattenedData.map((item) =>
        visibleHeaders.map((h) => {
          const val = item[h] ?? '';
          const stringVal = typeof val === 'string' ? val : JSON.stringify(val);
          return `"${stringVal.replace(/"/g, '""')}"`;
        }).join(delimiter)
      )
    ].join('\n')

    setCsvOutput(csv)
    setError('')
  }

  // Auto-update preview when inputs change
  useEffect(() => {
    if (previewMode && jsonInput && headers.length > 0) {
      generateCSV(true, true)
    }
  }, [columnMap, columnVisibility, delimiter, previewMode])

  const handleConvert = () => {
    setHeaders([])
    const { headers: newHeaders } = parseAndFlattenJSON()

    if (newHeaders.length === 0) return

    setHeaders(newHeaders)

    // Initialize column visibility to all true
    const initialVisibility: Record<string, boolean> = {}
    newHeaders.forEach(h => {
      initialVisibility[h] = columnVisibility[h] !== undefined ? columnVisibility[h] : true
    })
    setColumnVisibility(initialVisibility)

    generateCSV(false, false)
  }

  const downloadCSV = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.csv'
    a.click()
  }

  const resetMapping = () => {
    setColumnMap({})
    setColumnVisibility({})
    setHeaders([])
    setCsvOutput('')
  }

  return (
    <div className="container">
      <h1>JSON to CSV Converter</h1>
      <p className="subtitle">Convert JSON arrays to CSV with column mapping and preview</p>

      <div className="input-section">
        <label className="input-label">JSON Input</label>
        <textarea
          className="json-input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Paste JSON array here, e.g. [{"name": "John", "age": 30, "city": "NYC"}]'
        />
      </div>

      <div className="options-section">
        <div className="option-group">
          <label>Delimiter:</label>
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
          </select>
        </div>

        <div className="option-group">
          <label>Array Separator:</label>
          <input
            type="text"
            value={arraySeparator}
            onChange={(e) => setArraySeparator(e.target.value)}
            className="small-input"
          />
        </div>

        <div className="option-group">
          <label>Max Depth:</label>
          <input
            type="number"
            value={maxDepth ?? ''}
            onChange={(e) => setMaxDepth(e.target.value ? parseInt(e.target.value) : null)}
            className="small-input"
            placeholder="∞"
          />
        </div>

        <div className="option-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={previewMode}
              onChange={(e) => setPreviewMode(e.target.checked)}
            />
            Live Preview
          </label>
        </div>
      </div>

      <div className="button-group">
        <button onClick={handleConvert} className="btn btn-primary">
          Parse JSON
        </button>
        {headers.length > 0 && (
          <>
            <button onClick={() => generateCSV(true, true)} className="btn btn-secondary">
              Apply & Convert
            </button>
            <button onClick={resetMapping} className="btn btn-tertiary">
              Reset
            </button>
          </>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {headers.length > 0 && (
        <div className="mapping-section">
          <h2>Column Mapping</h2>
          <p className="section-hint">Rename columns and toggle visibility</p>

          <div className="column-list">
            {headers.map(h => (
              <div key={h} className="column-item">
                <div className="column-info">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={columnVisibility[h] !== false}
                      onChange={(e) => setColumnVisibility({...columnVisibility, [h]: e.target.checked})}
                    />
                    <span className="column-name">{h}</span>
                  </label>
                </div>
                <div className="column-rename">
                  <span className="arrow">→</span>
                  <input
                    type="text"
                    value={columnMap[h] || ''}
                    onChange={(e) => setColumnMap({...columnMap, [h]: e.target.value})}
                    placeholder="New name (optional)"
                    className="rename-input"
                  />
                </div>
              </div>
            ))}
          </div>

          {previewMode && (
            <div className="preview-info">
              <span className="preview-badge">Live Preview Active</span>
            </div>
          )}
        </div>
      )}

      {csvOutput && (
        <div className="output-section">
          <div className="output-header">
            <h2>CSV Output</h2>
            <button onClick={downloadCSV} className="btn btn-download">
              Download CSV
            </button>
          </div>
          <textarea
            className="csv-output"
            value={csvOutput}
            readOnly
          />
        </div>
      )}
    </div>
  )
}

export default App
