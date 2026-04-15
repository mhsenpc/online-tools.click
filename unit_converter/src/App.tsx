import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState<number | string>(1);
  const [category, setCategory] = useState('data');
  const [from, setFrom] = useState('b');
  const [to, setTo] = useState('kb');
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [isBinary, setIsBinary] = useState(true);

  const categories = {
    data: {
      getUnits: (binary: boolean) => {
        const base = binary ? 1024 : 1000;
        return {
          b: 1,
          kb: base,
          mb: Math.pow(base, 2),
          gb: Math.pow(base, 3),
          tb: Math.pow(base, 4)
        };
      },
      labels: {
        b: 'Bytes',
        kb: (binary: boolean) => binary ? 'KiB' : 'KB',
        mb: (binary: boolean) => binary ? 'MiB' : 'MB',
        gb: (binary: boolean) => binary ? 'GiB' : 'GB',
        tb: (binary: boolean) => binary ? 'TiB' : 'TB'
      }
    },
    css: {
      units: { px: 1, rem: 'rem', em: 'em' },
      labels: { px: 'Pixels (px)', rem: 'REM', em: 'EM' }
    }
  };

  const convert = () => {
    if (category === 'css') {
      const val = parseFloat(value.toString());
      if (isNaN(val)) return 0;
      if (from === 'px' && to === 'rem') return val / baseFontSize;
      if (from === 'px' && to === 'em') return val / baseFontSize;
      if (from === 'rem' && to === 'px') return val * baseFontSize;
      if (from === 'em' && to === 'px') return val * baseFontSize;
      return val;
    }
    const units = categories.data.getUnits(isBinary);
    const val = parseFloat(value.toString());
    if (isNaN(val)) return 0;
    
    const fromVal = (units as any)[from];
    const toVal = (units as any)[to];
    return (val * fromVal) / toVal;
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value;
    setCategory(cat);
    if (cat === 'data') {
      setFrom('b');
      setTo('kb');
    } else {
      setFrom('px');
      setTo('rem');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Unit Converter</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Category: </label>
        <select onChange={handleCategoryChange} value={category} style={{ padding: '0.5rem' }}>
          <option value="data">Data Size</option>
          <option value="css">CSS Units</option>
        </select>
      </div>

      {category === 'data' && (
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input type="checkbox" checked={isBinary} onChange={(e) => setIsBinary(e.target.checked)} />
            Use Binary (Base-2 / KiB, MiB)
          </label>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input 
          type="number" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          style={{ padding: '0.5rem', width: '100px' }}
        />
        <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ padding: '0.5rem' }}>
          {category === 'data' 
            ? Object.keys(categories.data.getUnits(isBinary)).map(u => 
                <option value={u} key={u}>{u === 'b' ? 'Bytes' : (categories.data.labels as any)[u](isBinary)}</option>
              )
            : Object.keys(categories.css.units).map(u => 
                <option value={u} key={u}>{(categories.css.labels as any)[u]}</option>
              )
          }
        </select>
        <span>to</span>
        <select value={to} onChange={(e) => setTo(e.target.value)} style={{ padding: '0.5rem' }}>
          {category === 'data' 
            ? Object.keys(categories.data.getUnits(isBinary)).map(u => 
                <option value={u} key={u}>{u === 'b' ? 'Bytes' : (categories.data.labels as any)[u](isBinary)}</option>
              )
            : Object.keys(categories.css.units).map(u => 
                <option value={u} key={u}>{(categories.css.labels as any)[u]}</option>
              )
          }
        </select>
      </div>
      
      {category === 'css' && (
        <div style={{ marginTop: '1rem' }}>
          <label>Base Font Size (px): </label>
          <input type="number" value={baseFontSize} onChange={(e) => setBaseFontSize(Number(e.target.value))} style={{ padding: '0.5rem' }} />
        </div>
      )}
      
      <p style={{ marginTop: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Result: {convert().toLocaleString(undefined, { maximumFractionDigits: 4 })}
      </p>
    </div>
  );
}

export default App;
