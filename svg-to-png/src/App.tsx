import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [svgInput, setSvgInput] = useState('');
  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [pngData, setPngData] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleConvert = async () => {
    if (!svgInput) return;
    const blob = new Blob([svgInput], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const w = width ? parseInt(width) : img.width * scale;
      const h = height ? parseInt(height) : img.height * scale;
      
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        setPngData(canvas.toDataURL('image/png'));
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="max-w-4xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">SVG to PNG Converter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <textarea 
            className="w-full h-64 bg-[#111] border border-[#333] p-4 rounded mb-4"
            placeholder="Paste SVG code here..."
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
          />
          <div className="flex gap-4 mb-4">
             <input type="number" placeholder="Width" className="bg-[#111] border border-[#333] p-2 rounded" value={width} onChange={(e) => setWidth(e.target.value)} />
             <input type="number" placeholder="Height" className="bg-[#111] border border-[#333] p-2 rounded" value={height} onChange={(e) => setHeight(e.target.value)} />
             <select className="bg-[#111] border border-[#333] p-2 rounded" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))}>
                <option value="1">1x</option>
                <option value="2">2x</option>
                <option value="4">4x</option>
             </select>
          </div>
          <button 
            onClick={handleConvert}
            className="bg-blue-600 px-6 py-2 rounded font-semibold"
          >
            Convert to PNG
          </button>
        </div>
        <div>
          {pngData && (
            <div className="bg-[#111] p-4 rounded">
              <img src={pngData} alt="Preview" className="max-w-full" />
              <a href={pngData} download="converted.png" className="block mt-4 text-blue-400">Download PNG</a>
            </div>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
