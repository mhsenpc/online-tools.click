import React, { useState } from 'react';
import CubicBezierEditor from './CubicBezierEditor';

function App() {
  const [easing, setEasing] = useState('cubic-bezier(0.4, 0, 0.2, 1)');
  const [running, setRunning] = useState(false);

  const presets = {
    'Ease': 'ease',
    'Linear': 'linear',
    'Ease-In': 'ease-in',
    'Ease-Out': 'ease-out',
    'Ease-In-Out': 'ease-in-out',
    'Cubic-Bezier (Smooth)': 'cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const startAnimation = () => {
    setRunning(false);
    setTimeout(() => setRunning(true), 10);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>CSS Transition Visualizer</h1>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Preset Easing: </label>
            <select value={easing} onChange={(e) => setEasing(e.target.value)}>
              {Object.entries(presets).map(([name, val]) => <option value={val} key={name}>{name}</option>)}
            </select>
            <input style={{ width: '100%', marginTop: '0.5rem' }} value={easing} onChange={(e) => setEasing(e.target.value)} />
          </div>

          <CubicBezierEditor value={easing} onChange={setEasing} />
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <button onClick={startAnimation}>Play Animation</button>

          <div style={{ marginTop: '2rem', border: '1px solid #444', padding: '1rem', backgroundColor: '#1a1a1a', height: '150px', position: 'relative' }}>
            <div 
              className="box" 
              style={{ 
                animation: running ? `animate 2s ${easing} infinite` : 'none',
                position: 'absolute'
              }}
            ></div>
          </div>
        </div>
      </div>

      <pre style={{ backgroundColor: '#222', padding: '1rem', marginTop: '1rem' }}>{`transition-timing-function: ${easing};`}</pre>
      <button onClick={() => navigator.clipboard.writeText(`transition-timing-function: ${easing};`)}>Copy CSS</button>
    </div>
  );
}

export default App;
