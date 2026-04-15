import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState(1);
  const [category, setCategory] = useState('data');
  const [from, setFrom] = useState('b');
  const [to, setTo] = useState('kb');
  const [baseFontSize, setBaseFontSize] = useState(16);

  const categories = {
    data: {
      units: { b: 1, kb: 1024, mb: 1024 * 1024, gb: 1024 * 1024 * 1024, tb: 1024 * 1024 * 1024 * 1024 },
      labels: { b: 'Bytes', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' }
    },
    css: {
      units: { px: 1, rem: 'rem', em: 'em' },
      labels: { px: 'Pixels (px)', rem: 'REM', em: 'EM' }
    }
  };

  const convert = () => {
    if (category === 'css') {
      const val = parseFloat(value.toString());
      if (from === 'px' && to === 'rem') return val / baseFontSize;
      if (from === 'px' && to === 'em') return val / baseFontSize;
      if (from === 'rem' && to === 'px') return val * baseFontSize;
      if (from === 'em' && to === 'px') return val * baseFontSize;
      return val;
    }
    const units = categories[category as keyof typeof categories].units as any;
    const fromVal = units[from];
    const toVal = units[to];
    return (value * fromVal) / toVal;
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value;
    setCategory(cat);
    const keys = Object.keys(categories[cat as keyof typeof categories].units);
    setFrom(keys[0]);
    setTo(keys[1]);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Unit Converter</h1>
      <select onChange={handleCategoryChange} value={category}>
        <option value="data">Data Size</option>
        <option value="css">CSS Units</option>
      </select>
      <div style={{ marginTop: '1rem' }}>
        <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {Object.keys(categories[category as keyof typeof categories].units).map(u => 
            <option value={u} key={u}>{(categories[category as keyof typeof categories].labels as any)[u]}</option>
          )}
        </select>
        <span>to</span>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {Object.keys(categories[category as keyof typeof categories].units).map(u => 
            <option value={u} key={u}>{(categories[category as keyof typeof categories].labels as any)[u]}</option>
          )}
        </select>
      </div>
      {category === 'css' && (
        <div style={{ marginTop: '1rem' }}>
          <label>Base Font Size (px): </label>
          <input type="number" value={baseFontSize} onChange={(e) => setBaseFontSize(Number(e.target.value))} />
        </div>
      )}
      <p>Result: {convert().toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
    </div>
  );
}

export default App;
