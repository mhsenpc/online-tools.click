import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState(1);
  const [category, setCategory] = useState('data');
  const [from, setFrom] = useState('b');
  const [to, setTo] = useState('kb');

  const categories = {
    data: {
      units: { b: 1, kb: 1024, mb: 1024 * 1024, gb: 1024 * 1024 * 1024, tb: 1024 * 1024 * 1024 * 1024 },
      labels: { b: 'Bytes', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' }
    },
    time: {
      units: { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 },
      labels: { ms: 'ms', s: 's', m: 'm', h: 'h', d: 'd' }
    }
  };

  const convert = () => {
    const units = categories[category as keyof typeof categories].units;
    const fromVal = units[from as keyof typeof units];
    const toVal = units[to as keyof typeof units];
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
        <option value="time">Time</option>
      </select>
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
      <p>Result: {convert().toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
    </div>
  );
}

export default App;
