import React, { useState, useMemo } from 'react';
import tinycolor from 'tinycolor2';
import './index.css';

function getLuminance(color) {
  const rgb = tinycolor(color).toRgb();
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function getContrastRatio(color1, color2) {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export default function App() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');

  const ratio = useMemo(() => getContrastRatio(fg, bg), [fg, bg]);
  const aa = ratio >= 4.5;
  const aaa = ratio >= 7;
  const aaLarge = ratio >= 3;
  const aaaLarge = ratio >= 4.5;

  return (
    <div style={{ backgroundColor: bg, color: fg, minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Color Contrast Analyzer</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <label>Foreground:</label>
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
          <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} />
        </div>
        <div>
          <label>Background:</label>
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
          <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} />
        </div>
      </div>
      <h2>Ratio: {ratio.toFixed(2)}:1</h2>
      <div>
        <p>WCAG AA: {aa ? 'Pass' : 'Fail'}</p>
        <p>WCAG AAA: {aaa ? 'Pass' : 'Fail'}</p>
        <p>WCAG AA (Large): {aaLarge ? 'Pass' : 'Fail'}</p>
        <p>WCAG AAA (Large): {aaaLarge ? 'Pass' : 'Fail'}</p>
      </div>
    </div>
  );
}
