import React, { useState, useMemo } from 'react';
import './index.css';

const getLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

function App() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');

  const ratio = useMemo(() => {
    const rgb1 = hexToRgb(fg);
    const rgb2 = hexToRgb(bg);
    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }, [fg, bg]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Color Contrast Checker</h1>
      </header>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white', flex: 1, minWidth: '300px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Foreground:</label>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} style={{ display: 'block', width: '100%', height: '40px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Background:</label>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} style={{ display: 'block', width: '100%', height: '40px' }} />
          </div>
        </div>
        <div style={{ padding: '2rem', borderRadius: '8px', flex: 1, minWidth: '300px', backgroundColor: bg, color: fg }}>
          <h2 style={{ margin: 0 }}>Contrast Ratio: {ratio.toFixed(2)}:1</h2>
          <div style={{ marginTop: '1rem' }}>
            <p>AA Normal: {ratio >= 4.5 ? 'Pass' : 'Fail'}</p>
            <p>AA Large: {ratio >= 3 ? 'Pass' : 'Fail'}</p>
            <p>AAA Normal: {ratio >= 7 ? 'Pass' : 'Fail'}</p>
            <p>AAA Large: {ratio >= 4.5 ? 'Pass' : 'Fail'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
