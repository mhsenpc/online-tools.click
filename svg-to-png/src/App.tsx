import { useState, useRef } from 'react'
import './index.css'

function App() {
  const [svgCode, setSvgCode] = useState<string>('')
  const [width, setWidth] = useState<number>(500)
  const [height, setHeight] = useState<number>(500)
  const [scaleFactor, setScaleFactor] = useState<number>(1)
  const [mode, setMode] = useState<'dimensions' | 'scale'>('dimensions')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setSvgCode(content)
      setError(null)
    }
    reader.readAsText(file)
  }

  const convertToPng = () => {
    if (!svgCode) return

    const canvas = canvasRef.current
    if (!canvas) return

    const img = new Image()
    const blob = new Blob([svgCode], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    img.onload = () => {
      let finalWidth = width
      let finalHeight = height

      if (mode === 'scale') {
        finalWidth = img.naturalWidth * scaleFactor
        finalHeight = img.naturalHeight * scaleFactor
      }

      canvas.width = finalWidth
      canvas.height = finalHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, finalWidth, finalHeight)
        ctx.drawImage(img, 0, 0, finalWidth, finalHeight)
        setPreviewUrl(canvas.toDataURL('image/png'))
      }
      URL.revokeObjectURL(url)
    }
    img.onerror = () => {
      setError('Invalid SVG file')
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  const download = () => {
    if (!previewUrl) return
    const link = document.createElement('a')
    link.href = previewUrl
    link.download = 'converted.png'
    link.click()
  }

  return (
    <div className="container">
      <h1>SVG to PNG Converter</h1>
      <input type="file" accept=".svg" onChange={handleFileChange} />
      <div className="controls">
        <label>
          Mode:
          <select value={mode} onChange={(e) => setMode(e.target.value as 'dimensions' | 'scale')}>
            <option value="dimensions">Custom Dimensions</option>
            <option value="scale">Scale Factor</option>
          </select>
        </label>
        {mode === 'dimensions' ? (
          <>
            <label>
              Width:
              <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
            </label>
            <label>
              Height:
              <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
            </label>
          </>
        ) : (
          <label>
            Scale Factor:
            <select value={scaleFactor} onChange={(e) => setScaleFactor(Number(e.target.value))}>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={4}>4x</option>
            </select>
          </label>
        )}
        <button onClick={convertToPng}>Convert</button>
      </div>
      {error && <p className="error">{error}</p>}
      {previewUrl && (
        <div className="preview">
          <img src={previewUrl} alt="Preview" />
          <button onClick={download}>Download PNG</button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default App
