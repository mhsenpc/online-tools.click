import { useState, useMemo } from 'react';
import { Palette, CheckCircle, XCircle } from 'lucide-react';

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
};

const getLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrastRatio = (l1: number, l2: number) => {
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return Math.round(ratio * 100) / 100;
};

export default function App() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');

  const ratio = useMemo(() => {
    const rgb1 = hexToRgb(fg);
    const rgb2 = hexToRgb(bg);
    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    return getContrastRatio(l1, l2);
  }, [fg, bg]);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 flex flex-col items-center">
      <header className="w-full max-w-2xl mb-8">
        <h1 className="text-3xl font-bold font-['Syne'] mb-2">Color Contrast Checker</h1>
        <p className="text-gray-400">Ensure your designs are accessible with WCAG 2.1 compliance.</p>
      </header>

      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
          <label className="block text-sm text-gray-400 mb-2">Foreground Color</label>
          <input
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            className="w-full h-12 rounded cursor-pointer"
          />
          <div className="mt-2 text-center font-mono">{fg}</div>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
          <label className="block text-sm text-gray-400 mb-2">Background Color</label>
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="w-full h-12 rounded cursor-pointer"
          />
          <div className="mt-2 text-center font-mono">{bg}</div>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-[#111] p-8 rounded-xl border border-gray-800 text-center">
        <div className="text-6xl font-bold font-['Fira_Code'] mb-6">{ratio}:1</div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg flex items-center justify-center gap-2 ${ratio >= 4.5 ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
            {ratio >= 4.5 ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <span>AA Standard</span>
          </div>
          <div className={`p-4 rounded-lg flex items-center justify-center gap-2 ${ratio >= 7 ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
            {ratio >= 7 ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <span>AAA Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
