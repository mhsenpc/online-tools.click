import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Copy, Download, RefreshCw, LayoutGrid, FileJson, Package } from 'lucide-react';
import { Field, DataType, MockDataConfig } from './types';
import { generateMockData } from './lib/generator';
import { nanoid } from 'nanoid';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DATA_TYPES: { value: DataType; label: string; isPreset?: boolean }[] = [
  { value: 'string', label: 'String' },
  { value: 'number', label: 'Number' },
  { value: 'integer', label: 'Integer' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'uuid', label: 'UUID', isPreset: true },
  { value: 'name', label: 'Name', isPreset: true },
  { value: 'email', label: 'Email', isPreset: true },
  { value: 'date', label: 'Date', isPreset: true },
  { value: 'object', label: 'Object' },
  { value: 'array', label: 'Array' },
];

export default function App() {
  const [fields, setFields] = useState<Field[]>([
    { id: nanoid(), name: 'id', type: 'uuid' },
    { id: nanoid(), name: 'name', type: 'name' },
    { id: nanoid(), name: 'email', type: 'email' },
    { id: nanoid(), name: 'isActive', type: 'boolean' },
    { id: nanoid(), name: 'createdAt', type: 'date' },
  ]);

  const [config, setConfig] = useState<MockDataConfig>({
    rootType: 'object',
    arrayLength: 10,
  });

  const [generatedJson, setGeneratedJson] = useState<string>('');

  useEffect(() => {
    handleGenerate();
  }, [fields, config]);

  const handleGenerate = () => {
    const data = generateMockData(fields, config);
    setGeneratedJson(JSON.stringify(data, null, 2));
  };

  const addField = (parentId?: string) => {
    const newField: Field = {
      id: nanoid(),
      name: 'newField',
      type: 'string',
      parentId,
    };

    if (parentId) {
      setFields(prev => {
        const updateRecursive = (list: Field[]): Field[] => {
          return list.map(f => {
            if (f.id === parentId) {
              return { ...f, children: [...(f.children || []), newField] };
            }
            if (f.children) {
              return { ...f, children: updateRecursive(f.children) };
            }
            return f;
          });
        };
        return updateRecursive(prev);
      });
    } else {
      setFields(prev => [...prev, newField]);
    }
  };

  const removeField = (id: string) => {
    setFields(prev => {
      const removeRecursive = (list: Field[]): Field[] => {
        return list
          .filter(f => f.id !== id)
          .map(f => ({
            ...f,
            children: f.children ? removeRecursive(f.children) : undefined,
          }));
      };
      return removeRecursive(prev);
    });
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(prev => {
      const updateRecursive = (list: Field[]): Field[] => {
        return list.map(f => {
          if (f.id === id) {
            const updated = { ...f, ...updates };
            if (updates.type && (updates.type === 'object' || updates.type === 'array') && !updated.children) {
              updated.children = [];
              if (updates.type === 'array') {
                 updated.children = [{ id: nanoid(), name: 'item', type: 'string', parentId: f.id }];
              }
            }
            return updated;
          }
          if (f.children) {
            return { ...f, children: updateRecursive(f.children) };
          }
          return f;
        });
      };
      return updateRecursive(prev);
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedJson);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mock-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const FieldRow = ({ field, level = 0 }: { field: Field; level?: number }) => (
    <div className="space-y-2">
      <div className={cn(
        "flex items-center gap-2 p-2 bg-white border border-border rounded-lg group transition-all hover:border-primary/50",
        level > 0 && "ml-6 border-l-2"
      )}>
        <input
          value={field.name}
          onChange={e => updateField(field.id, { name: e.target.value })}
          className="bg-transparent border-none focus:ring-0 text-sm font-medium w-32"
          placeholder="field_name"
        />
        <select
          value={field.type}
          onChange={e => updateField(field.id, { type: e.target.value as DataType })}
          className="bg-slate-50 border-none rounded text-xs p-1 focus:ring-1 focus:ring-primary w-24"
        >
          {DATA_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <div className="flex-1" />

        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
          {(field.type === 'object' || field.type === 'array') && (
            <button
              onClick={() => addField(field.id)}
              className="p-1 hover:bg-primary/10 text-primary rounded"
              title="Add child field"
            >
              <Plus size={14} />
            </button>
          )}
          <button
            onClick={() => removeField(field.id)}
            className="p-1 hover:bg-red-50 text-red-500 rounded"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      {field.children?.map(child => (
        <FieldRow key={child.id} field={child} level={level + 1} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto p-4 md:p-8 gap-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Package className="text-primary" />
            Mock API Generator
          </h1>
          <p className="text-slate-500 mt-1">Design your API structure and generate mock data instantly.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
          >
            <RefreshCw size={16} />
            Regenerate
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Download
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium shadow-sm shadow-primary/20"
          >
            <Copy size={16} />
            Copy JSON
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        <section className="flex flex-col gap-6 bg-white p-6 rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <LayoutGrid size={18} className="text-primary" />
              Structure Definition
            </h2>
            <div className="flex items-center gap-4 bg-slate-50 p-1 rounded-lg border border-border">
              <div className="flex items-center gap-2 px-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Root:</span>
                <select
                  value={config.rootType}
                  onChange={e => setConfig(prev => ({ ...prev, rootType: e.target.value as 'object' | 'array' }))}
                  className="bg-transparent border-none text-xs font-bold focus:ring-0 p-0"
                >
                  <option value="object">Object</option>
                  <option value="array">Array</option>
                </select>
              </div>
              {config.rootType === 'array' && (
                <div className="flex items-center gap-2 px-2 border-l border-border">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Count:</span>
                  <input
                    type="number"
                    value={config.arrayLength}
                    onChange={e => setConfig(prev => ({ ...prev, arrayLength: parseInt(e.target.value) || 1 }))}
                    className="bg-transparent border-none text-xs font-bold focus:ring-0 p-0 w-8"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {fields.map(field => (
              <FieldRow key={field.id} field={field} />
            ))}
            <button
              onClick={() => addField()}
              className="w-full py-3 border-2 border-dashed border-border rounded-xl text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm font-medium mt-4"
            >
              <Plus size={16} />
              Add Top-level Field
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-4 bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 border-b border-slate-800">
            <h2 className="text-slate-200 text-sm font-medium flex items-center gap-2">
              <FileJson size={16} className="text-blue-400" />
              Live Preview
            </h2>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
            </div>
          </div>
          <pre className="flex-1 p-6 overflow-auto text-blue-300 font-mono text-sm selection:bg-blue-500/30 custom-scrollbar">
            <code>{generatedJson}</code>
          </pre>
        </section>
      </main>

      <footer className="text-center py-4 text-slate-400 text-xs border-t border-border mt-auto">
        Mock API Generator &copy; {new Date().getFullYear()} &bull; Built with React & Tailwind
      </footer>
    </div>
  );
}
