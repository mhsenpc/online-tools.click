import React, { useState } from 'react';
import tinycolor from 'tinycolor2';

function App() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');

  const colorFg = tinycolor(fg);
  const colorBg = tinycolor(bg);
  const ratio = tinycolor.readability(colorFg, colorBg);

  const getStatus = (r: number) => {
    return {
      normalAA: r >= 4.5,
      normalAAA: r >= 7,
      largeAA: r >= 3,
      largeAAA: r >= 4.5,
    };
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
        <p>Ratio: {ratio.toFixed(2)}:1</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <strong>Normal Text</strong>
            <p style={{ color: status.normalAA ? 'green' : 'red', fontWeight: 'bold' }}>AA: {status.normalAA ? 'Pass' : 'Fail'}</p>
            <p style={{ color: status.normalAAA ? 'green' : 'red', fontWeight: 'bold' }}>AAA: {status.normalAAA ? 'Pass' : 'Fail'}</p>
          </div>
          <div>
            <strong>Large Text</strong>
            <p style={{ color: status.largeAA ? 'green' : 'red', fontWeight: 'bold' }}>AA: {status.largeAA ? 'Pass' : 'Fail'}</p>
            <p style={{ color: status.largeAAA ? 'green' : 'red', fontWeight: 'bold' }}>AAA: {status.largeAAA ? 'Pass' : 'Fail'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
