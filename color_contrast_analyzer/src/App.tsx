import { useState } from 'react';
import { getContrastRatio, getWCAGRating } from './logic';

export default function App() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');
  
  const ratio = getContrastRatio(fg, bg);
  const rating = getWCAGRating(ratio);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Contrast Analyzer</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Foreground</label>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Background</label>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded" />
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg text-center" style={{ backgroundColor: bg, color: fg }}>
          <p className="text-xl font-bold">Contrast Ratio: {ratio.toFixed(2)}:1</p>
          <p className="text-lg font-semibold mt-2">Level: {rating}</p>
        </div>

        <div className="mt-6 text-sm text-gray-600 text-center">
            <p className="font-medium">WCAG 2.1 Compliance</p>
            <p>AA: 4.5:1 (Normal) | AAA: 7:1 (Normal)</p>
        </div>
      </div>
    </div>
  );
}
