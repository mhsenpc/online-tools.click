import { useState, useMemo } from 'react'
import './App.css'

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function getRelativeLuminance(r: number, g: number, b: number) {
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;

  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function getContrastRatio(hex1: string, hex2: string) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function App() {
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')

  const contrastRatio = useMemo(() => getContrastRatio(foregroundColor, backgroundColor), [foregroundColor, backgroundColor])

  const aaPass = contrastRatio >= 4.5
  const aaaPass = contrastRatio >= 7

  return (
    <div className="container">
      <h1>WCAG Contrast Analyzer</h1>
      
      <div className="picker-container">
        <label>
          Foreground Color:
          <input type="color" value={foregroundColor} onChange={(e) => setForegroundColor(e.target.value)} />
          <span>{foregroundColor}</span>
        </label>
        <label>
          Background Color:
          <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
          <span>{backgroundColor}</span>
        </label>
      </div>

      <div className="preview" style={{ color: foregroundColor, backgroundColor: backgroundColor }}>
        This is a sample text to test contrast.
      </div>

      <div className="result">
        <h2>Contrast Ratio: {contrastRatio.toFixed(2)}:1</h2>
        <div className={`status ${aaPass ? 'pass' : 'fail'}`}>
          WCAG AA (4.5:1): {aaPass ? 'PASS' : 'FAIL'}
        </div>
        <div className={`status ${aaaPass ? 'pass' : 'fail'}`}>
          WCAG AAA (7.0:1): {aaaPass ? 'PASS' : 'FAIL'}
        </div>
      </div>
    </div>
  )
}

export default App
