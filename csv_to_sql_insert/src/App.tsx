import React, { useState } from 'react';
import { Copy, Trash2, Table, AlertCircle, FileCode } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [csv, setCsv] = useState('');
  const [tableName, setTableName] = useState('my_table');
  const [sql, setSql] = useState('');
  const [error, setError] = useState<string | null>(null);

  const generateSQL = (csvData: string, table: string) => {
    if (!csvData.trim()) {
      setSql('');
      setError(null);
      return;
    }

    try {
      const lines = csvData.trim().split('\n');
      if (lines.length < 2) throw new Error('CSV must have at least a header row and one data row.');
      
      const headers = lines[0].split(',').map(h => h.trim());
      const dataRows = lines.slice(1);

      const insertStatements = dataRows.map(row => {
        const values = row.split(',').map(v => {
          const trimmed = v.trim();
          return isNaN(Number(trimmed)) ? `'${trimmed.replace(/'/g, "''")}'` : trimmed;
        });
        return `INSERT INTO ${table} (${headers.join(', ')}) VALUES (${values.join(', ')});`;
      });

      setSql(insertStatements.join('\n'));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setSql('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-display text-white mb-2">CSV to SQL Insert</h1>
        <p className="text-white/50">Generate SQL INSERT statements from CSV data.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] p-6 rounded-lg border border-white/10 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Table Name</label>
            <input 
                type="text"
                className="w-full bg-[#050505] border border-white/10 p-2 rounded focus:outline-none focus:border-[#ff3e00]"
                value={tableName}
                onChange={(e) => { setTableName(e.target.value); generateSQL(csv, e.target.value); }}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">CSV Data</label>
            <textarea
              className="w-full h-96 bg-[#050505] border border-white/10 p-4 rounded focus:outline-none focus:border-[#ff3e00] font-mono"
              value={csv}
              onChange={(e) => { setCsv(e.target.value); generateSQL(e.target.value, tableName); }}
              placeholder="id, name, age
1, John Doe, 30
2, Jane Doe, 25"
            />
          </div>
        </div>

        <div className="bg-[#111111] p-6 rounded-lg border border-white/10 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">SQL Output</h2>
            <button 
                onClick={() => navigator.clipboard.writeText(sql)}
                className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded text-sm hover:bg-white/20"
            >
                <Copy size={14} /> Copy
            </button>
          </div>
          <textarea
            className="w-full h-96 bg-[#050505] border border-white/10 p-4 rounded font-mono text-sm"
            value={sql}
            readOnly
          />
          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-500/20 p-3 rounded flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle size={16} /> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
