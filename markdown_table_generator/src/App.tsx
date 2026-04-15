import { useState, useMemo } from 'react';
import { Copy, Plus, Minus, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

type Cell = string;
type Row = Cell[];
type TableData = Row[];

export default function App() {
  const [data, setData] = useState<TableData>([
    ['Header 1', 'Header 2', 'Header 3'],
    ['', '', ''],
    ['', '', '']
  ]);
  const [alignments, setAlignments] = useState<('left' | 'center' | 'right')[]>(['left', 'left', 'left']);

  const markdown = useMemo(() => {
    if (data.length === 0) return '';
    
    const header = '| ' + data[0].join(' | ') + ' |';
    const separator = '| ' + alignments.map(a => {
        if (a === 'center') return ':---:';
        if (a === 'right') return '---:';
        return '---';
    }).join(' | ') + ' |';
    
    const body = data.slice(1).map(row => '| ' + row.join(' | ') + ' |').join('\n');
    
    return `${header}\n${separator}\n${body}`;
  }, [data, alignments]);

  const updateCell = (r: number, c: number, val: string) => {
    const newData = data.map((row, rowIndex) => 
        rowIndex === r ? row.map((cell, colIndex) => colIndex === c ? val : cell) : row
    );
    setData(newData);
  };

  const addRow = () => {
      setData([...data, Array(data[0].length).fill('')]);
  };

  const removeRow = () => {
      if (data.length > 1) setData(data.slice(0, -1));
  };

  const addCol = () => {
      setData(data.map(row => [...row, '']));
      setAlignments([...alignments, 'left']);
  };

  const removeCol = () => {
      if (data[0].length > 1) {
          setData(data.map(row => row.slice(0, -1)));
          setAlignments(alignments.slice(0, -1));
      }
  };

  const updateAlignment = (colIndex: number, alignment: 'left' | 'center' | 'right') => {
      const newAlignments = [...alignments];
      newAlignments[colIndex] = alignment;
      setAlignments(newAlignments);
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(markdown);
  };

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Markdown Table Generator</h1>
        <p className="text-zinc-400">Visually create tables, align columns, and get GFM code instantly.</p>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8 overflow-x-auto">
        <table className="w-full mb-4 border-collapse">
            <thead>
                <tr>
                    {data[0].map((_, colIndex) => (
                        <th key={colIndex} className="p-2 border border-zinc-700">
                            <div className="flex gap-1 justify-center mb-2">
                                <button onClick={() => updateAlignment(colIndex, 'left')} className={`p-1 rounded ${alignments[colIndex] === 'left' ? 'bg-zinc-700' : ''}`}><AlignLeft size={16}/></button>
                                <button onClick={() => updateAlignment(colIndex, 'center')} className={`p-1 rounded ${alignments[colIndex] === 'center' ? 'bg-zinc-700' : ''}`}><AlignCenter size={16}/></button>
                                <button onClick={() => updateAlignment(colIndex, 'right')} className={`p-1 rounded ${alignments[colIndex] === 'right' ? 'bg-zinc-700' : ''}`}><AlignRight size={16}/></button>
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, r) => (
                    <tr key={r}>
                        {row.map((cell, c) => (
                            <td key={c} className="p-1 border border-zinc-700">
                                <input 
                                    value={cell} 
                                    onChange={(e) => updateCell(r, c, e.target.value)}
                                    className="w-full bg-transparent p-2 outline-none text-white placeholder-zinc-600"
                                    placeholder={r === 0 ? "Header" : ""}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="flex gap-2">
            <button onClick={addRow} className="flex items-center gap-1 bg-zinc-800 px-3 py-1.5 rounded text-sm hover:bg-zinc-700"><Plus size={16}/> Add Row</button>
            <button onClick={removeRow} className="flex items-center gap-1 bg-zinc-800 px-3 py-1.5 rounded text-sm hover:bg-zinc-700"><Minus size={16}/> Remove Row</button>
            <button onClick={addCol} className="flex items-center gap-1 bg-zinc-800 px-3 py-1.5 rounded text-sm hover:bg-zinc-700"><Plus size={16}/> Add Col</button>
            <button onClick={removeCol} className="flex items-center gap-1 bg-zinc-800 px-3 py-1.5 rounded text-sm hover:bg-zinc-700"><Minus size={16}/> Remove Col</button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Result</h2>
              <button onClick={copyToClipboard} className="flex items-center gap-1 bg-emerald-600 px-4 py-2 rounded text-sm hover:bg-emerald-500 font-medium">
                  <Copy size={16}/> Copy Markdown
              </button>
          </div>
          <pre className="bg-black p-4 rounded border border-zinc-800 text-zinc-300 font-mono text-sm overflow-x-auto">
              {markdown}
          </pre>
      </div>
    </div>
  );
}
