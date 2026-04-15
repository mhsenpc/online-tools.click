import { useState } from 'react';
import './App.css';

function App() {
  const [offsetX, setOffsetX] = useState(10);
  const [offsetY, setOffsetY] = useState(10);
  const [blur, setBlur] = useState(15);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [inset, setInset] = useState(false);
  const [opacity, setOpacity] = useState(0.5);

  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadow = `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`box-shadow: ${shadow};`);
    alert('Copied to clipboard!');
  };

  return (
    <div className="container">
      <h1>CSS Shadow Generator</h1>
      <div className="preview-container">
        <div 
          className="preview-box"
          style={{ boxShadow: shadow }}
        >
          Preview
        </div>
      </div>
      <div className="controls">
        <label>Offset X: {offsetX}px
          <input type="range" min="-100" max="100" value={offsetX} onChange={(e) => setOffsetX(Number(e.target.value))} />
        </label>
        <label>Offset Y: {offsetY}px
          <input type="range" min="-100" max="100" value={offsetY} onChange={(e) => setOffsetY(Number(e.target.value))} />
        </label>
        <label>Blur: {blur}px
          <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(Number(e.target.value))} />
        </label>
        <label>Spread: {spread}px
          <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(Number(e.target.value))} />
        </label>
        <label>Color:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label>Opacity: {opacity}
          <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />
        </label>
        <label>
          <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} />
          Inset
        </label>
        <button onClick={copyToClipboard}>Copy CSS</button>
      </div>
      <div className="code-output">
        <code>box-shadow: {shadow};</code>
      </div>
    </div>
  );
}

export default App;
