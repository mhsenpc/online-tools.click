import React, { useRef, useState, useEffect } from 'react';

interface Point { x: number; y: number; }

interface CubicBezierEditorProps {
  value: string; // e.g., "cubic-bezier(0.4, 0, 0.2, 1)"
  onChange: (value: string) => void;
}

const CubicBezierEditor: React.FC<CubicBezierEditorProps> = ({ value, onChange }) => {
  const [p1, setP1] = useState<Point>({ x: 0.4, y: 0 });
  const [p2, setP2] = useState<Point>({ x: 0.2, y: 1 });
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<'p1' | 'p2' | null>(null);

  useEffect(() => {
    // Parse value if possible, simplified for now
    const match = value.match(/cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
    if (match) {
      setP1({ x: parseFloat(match[1]), y: parseFloat(match[2]) });
      setP2({ x: parseFloat(match[3]), y: parseFloat(match[4]) });
    }
  }, [value]);

  const updateEasing = (newP1: Point, newP2: Point) => {
    onChange(`cubic-bezier(${newP1.x.toFixed(2)}, ${newP1.y.toFixed(2)}, ${newP2.x.toFixed(2)}, ${newP2.y.toFixed(2)})`);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(-0.5, Math.min(1.5, 1 - (e.clientY - rect.top) / rect.height));

    if (dragging === 'p1') {
      const newP1 = { x, y };
      setP1(newP1);
      updateEasing(newP1, p2);
    } else {
      const newP2 = { x, y };
      setP2(newP2);
      updateEasing(p1, newP2);
    }
  };

  const size = 200;

  return (
    <svg 
      ref={svgRef}
      width={size} 
      height={size} 
      viewBox="-50 -50 300 300" 
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDragging(null)}
      onMouseLeave={() => setDragging(null)}
      style={{ border: '1px solid #444', cursor: 'crosshair', background: '#222' }}
    >
      {/* Grid lines */}
      <line x1="0" y1="0" x2="0" y2="200" stroke="#444" />
      <line x1="0" y1="200" x2="200" y2="200" stroke="#444" />
      <line x1="200" y1="200" x2="200" y2="0" stroke="#444" />
      <line x1="200" y1="0" x2="0" y2="0" stroke="#444" />
      
      {/* Curve */}
      <path 
        d={`M 0 200 C ${p1.x * 200} ${(1 - p1.y) * 200}, ${p2.x * 200} ${(1 - p2.y) * 200}, 200 0`} 
        fill="transparent" stroke="#ff3e00" strokeWidth="4" 
      />
      
      {/* Handle lines */}
      <line x1="0" y1="200" x2={p1.x * 200} y2={(1 - p1.y) * 200} stroke="#888" strokeDasharray="4" />
      <line x1="200" y1="0" x2={p2.x * 200} y2={(1 - p2.y) * 200} stroke="#888" strokeDasharray="4" />

      {/* Handles */}
      <circle cx={p1.x * 200} cy={(1 - p1.y) * 200} r="8" fill="#fff" onMouseDown={() => setDragging('p1')} style={{ cursor: 'pointer' }} />
      <circle cx={p2.x * 200} cy={(1 - p2.y) * 200} r="8" fill="#fff" onMouseDown={() => setDragging('p2')} style={{ cursor: 'pointer' }} />
    </svg>
  );
};

export default CubicBezierEditor;
