import React, { useState } from 'react';
import './index.css';

function App() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState(10);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: `${gap}px`,
    width: '100%',
    height: '400px',
    backgroundColor: '#ddd',
    padding: '10px',
  };

  const gridItemStyle: React.CSSProperties = {
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
  };

  const code = `.grid-container {
  display: grid;
  grid-template-rows: repeat(${rows}, 1fr);
  grid-template-columns: repeat(${cols}, 1fr);
  gap: ${gap}px;
}`;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>CSS Grid Layout Generator</h1>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <label>Rows: {rows}</label>
          <input type="range" min="1" max="10" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
        </div>
        <div>
          <label>Columns: {cols}</label>
          <input type="range" min="1" max="10" value={cols} onChange={(e) => setCols(Number(e.target.value))} />
        </div>
        <div>
          <label>Gap: {gap}px</label>
          <input type="range" min="0" max="50" value={gap} onChange={(e) => setGap(Number(e.target.value))} />
        </div>
      </div>
      <div style={gridStyle}>
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div key={i} style={gridItemStyle}>{i + 1}</div>
        ))}
      </div>
      <pre style={{ background: '#333', color: '#fff', padding: '1rem', marginTop: '2rem', borderRadius: '4px' }}>
        {code}
      </pre>
    </div>
  );
}

export default App;
