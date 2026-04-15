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
      <h1>CSS Flexbox Layout Visualizer</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <label>Flex Direction: <select value={direction} onChange={(e) => setDirection(e.target.value)}><option>row</option><option>column</option><option>row-reverse</option><option>column-reverse</option></select></label>
        <label>Justify Content: <select value={justify} onChange={(e) => setJustify(e.target.value)}><option>flex-start</option><option>center</option><option>flex-end</option><option>space-between</option><option>space-around</option></select></label>
        <label>Align Items: <select value={align} onChange={(e) => setAlign(e.target.value)}><option>stretch</option><option>center</option><option>flex-start</option><option>flex-end</option></select></label>
        <label>Gap (px): <input type="number" value={gap} onChange={(e) => setGap(Number(e.target.value))} /></label>
      </div>
      <button onClick={() => setItems([...items, items.length + 1])}>Add Item</button>
      <div style={{ display: 'flex', flexDirection: direction as any, justifyContent: justify as any, alignItems: align as any, gap: `${gap}px`, backgroundColor: '#333', padding: '1rem', minHeight: '200px', marginTop: '1rem' }}>
        {items.map(i => <div key={i} style={{ backgroundColor: '#ff3e00', padding: '1rem' }}>Item {i}</div>)}
      </div>
      <pre style={{ backgroundColor: '#222', padding: '1rem', marginTop: '1rem' }}>{css}</pre>
      <button onClick={() => navigator.clipboard.writeText(css)}>Copy CSS</button>
    </div>
  );
}

export default App;
