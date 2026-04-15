import React, { useState } from 'react';
import tinycolor from 'tinycolor2';

function App() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');

  const colorFg = tinycolor(fg);
  const colorBg = tinycolor(bg);
  const ratio = tinycolor.readability(colorFg, colorBg);

  const getStatus = (r: number) => {
    if (r >= 7) return { text: 'Pass (AAA)', color: 'green' };
    if (r >= 4.5) return { text: 'Pass (AA)', color: 'green' };
    return { text: 'Fail', color: 'red' };
  };

  const status = getStatus(ratio);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Color Contrast Analyzer</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <label>Foreground: <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} /></label>
        <label>Background: <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} /></label>
      </div>
      <div style={{ padding: '2rem', backgroundColor: bg, color: fg, border: '1px solid #ccc' }}>
        <h2>Contrast Preview</h2>
        <p>Ratio: {ratio.toFixed(2)}</p>
        <p style={{ color: status.color, fontWeight: 'bold' }}>{status.text}</p>
      </div>
    </div>
  );
}

export default App;
