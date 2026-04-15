import React, { useState, useEffect } from 'react';

const App = () => {
  const [shadow, setShadow] = useState({
    x: 10,
    y: 10,
    blur: 5,
    spread: 0,
    color: '#000000',
    opacity: 0.5
  });

  const [boxShadow, setBoxShadow] = useState('');

  useEffect(() => {
    const alpha = Math.round(shadow.opacity * 255).toString(16).padStart(2, '0');
    const colorWithAlpha = `${shadow.color}${alpha}`;
    const value = `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${colorWithAlpha}`;
    setBoxShadow(value);
  }, [shadow]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`box-shadow: ${boxShadow};`);
    alert('Copied to clipboard!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CSS Shadow Generator</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          {['x', 'y', 'blur', 'spread'].map(key => (
            <div key={key}>
              <label>{key}: {shadow[key as keyof typeof shadow]}</label>
              <input 
                type="range" 
                min="-50" 
                max="50" 
                value={shadow[key as keyof typeof shadow]} 
                onChange={(e) => setShadow({...shadow, [key]: parseInt(e.target.value)})}
              />
            </div>
          ))}
          <div>
            <label>Color:</label>
            <input 
              type="color" 
              value={shadow.color} 
              onChange={(e) => setShadow({...shadow, color: e.target.value})}
            />
          </div>
          <div>
            <label>Opacity:</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={shadow.opacity} 
              onChange={(e) => setShadow({...shadow, opacity: parseFloat(e.target.value)})}
            />
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div 
            id="preview-box" 
            style={{ 
              width: '100px', 
              height: '100px', 
              backgroundColor: '#3498db', 
              boxShadow: boxShadow 
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <input type="text" value={`box-shadow: ${boxShadow};`} readOnly style={{ width: '300px' }} />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
    </div>
  );
};

export default App;
