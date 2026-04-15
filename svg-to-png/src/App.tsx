import { useState, useRef } from 'react'
import './index.css'

function App() {
  const [svgCode, setSvgCode] = useState<string>('')
  const [width, setWidth] = useState<number>(500)
  const [height, setHeight] = useState<number>(500)
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
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
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
          Width:
          <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </label>
        <label>
          Height:
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </label>
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
