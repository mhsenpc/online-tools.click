import React, { useState } from 'react';

function App() {
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('flex-start');
  const [align, setAlign] = useState('stretch');
  const [gap, setGap] = useState(10);
  const [items, setItems] = useState([1, 2, 3]);

  const css = `display: flex;
flex-direction: ${direction};
justify-content: ${justify};
align-items: ${align};
gap: ${gap}px;`;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>CSS Flexbox Layout Generator</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <label>Flex Direction: <select value={direction} onChange={(e) => setDirection(e.target.value)}><option>row</option><option>column</option></select></label>
        <label>Justify Content: <select value={justify} onChange={(e) => setJustify(e.target.value)}><option>flex-start</option><option>center</option><option>space-between</option></select></label>
        <label>Align Items: <select value={align} onChange={(e) => setAlign(e.target.value)}><option>stretch</option><option>center</option><option>flex-start</option></select></label>
        <label>Gap: <input type="number" value={gap} onChange={(e) => setGap(Number(e.target.value))} /></label>
      </div>
      <div style={{ display: 'flex', flexDirection: direction as any, justifyContent: justify as any, alignItems: align as any, gap: `${gap}px`, backgroundColor: '#333', padding: '1rem', minHeight: '200px' }}>
        {items.map(i => <div key={i} style={{ backgroundColor: '#ff3e00', padding: '1rem' }}>Item {i}</div>)}
      </div>
      <pre style={{ backgroundColor: '#222', padding: '1rem', marginTop: '1rem' }}>{css}</pre>
      <button onClick={() => navigator.clipboard.writeText(css)}>Copy CSS</button>
    </div>
  );
}

export default App;
