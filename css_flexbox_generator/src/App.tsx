import React, { useState } from 'react';

type Item = { id: number; flexGrow: number; alignSelf: string };

function App() {
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('flex-start');
  const [align, setAlign] = useState('stretch');
  const [gap, setGap] = useState(10);
  const [items, setItems] = useState<Item[]>([
    { id: 1, flexGrow: 0, alignSelf: 'auto' },
    { id: 2, flexGrow: 0, alignSelf: 'auto' },
    { id: 3, flexGrow: 0, alignSelf: 'auto' }
  ]);
  const [selectedItem, setSelectedItem] = useState<number>(items[0].id);

  const css = `/* Container */
.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  gap: ${gap}px;
}

/* Item styling examples */
.item {
  /* Customize per item */
}`;

  const html = `<div class="container">
  ${items.map(item => `  <div style="flex-grow: ${item.flexGrow}; align-self: ${item.alignSelf}; background-color: #ff3e00; padding: 1rem;">Item ${item.id}</div>`).join('\n')}
</div>`;

  const updateItem = (id: number, field: keyof Item, value: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const currentItem = items.find(i => i.id === selectedItem);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>CSS Flexbox Layout Generator</h1>
      
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <h3>Container Properties</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <label>Direction: <select value={direction} onChange={(e) => setDirection(e.target.value)}><option>row</option><option>column</option><option>row-reverse</option><option>column-reverse</option></select></label>
            <label>Justify: <select value={justify} onChange={(e) => setJustify(e.target.value)}><option>flex-start</option><option>center</option><option>flex-end</option><option>space-between</option><option>space-around</option></select></label>
            <label>Align: <select value={align} onChange={(e) => setAlign(e.target.value)}><option>stretch</option><option>center</option><option>flex-start</option><option>flex-end</option></select></label>
            <label>Gap (px): <input type="number" value={gap} onChange={(e) => setGap(Number(e.target.value))} /></label>
          </div>
        </div>

        <div>
          <h3>Item Properties (Selected: Item {selectedItem})</h3>
          {currentItem && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <label>Select Item: <select value={selectedItem} onChange={(e) => setSelectedItem(Number(e.target.value))}>{items.map(i => <option key={i.id} value={i.id}>Item {i.id}</option>)}</select></label>
              <label>Flex Grow: <input type="number" min="0" value={currentItem.flexGrow} onChange={(e) => updateItem(selectedItem, 'flexGrow', Number(e.target.value))} /></label>
              <label>Align Self: <select value={currentItem.alignSelf} onChange={(e) => updateItem(selectedItem, 'alignSelf', e.target.value)}><option>auto</option><option>stretch</option><option>center</option><option>flex-start</option><option>flex-end</option></select></label>
            </div>
          )}
        </div>
      </section>

      <div style={{ display: 'flex', flexDirection: direction as any, justifyContent: justify as any, alignItems: align as any, gap: `${gap}px`, backgroundColor: '#333', padding: '1rem', minHeight: '200px', border: '2px solid #555' }}>
        {items.map(i => <div key={i.id} style={{ backgroundColor: '#ff3e00', padding: '1rem', flexGrow: i.flexGrow, alignSelf: i.alignSelf as any, color: 'white' }}>Item {i.id}</div>)}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Generated Code</h3>
        <pre style={{ backgroundColor: '#222', padding: '1rem', color: '#fff', borderRadius: '4px' }}>{css + '\n\n' + html}</pre>
        <button onClick={() => navigator.clipboard.writeText(css + '\n\n' + html)} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Copy CSS & HTML</button>
      </div>
    </div>
  );
}

export default App;
