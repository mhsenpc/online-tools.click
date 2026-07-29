import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Braces,
  ChevronRight,
  ChevronDown,
  Copy,
  Download,
  Search,
  Eraser,
  Maximize2,
  Minimize2,
  AlignLeft,
  Check,
  AlertCircle,
  GitCompare,
  Code,
  Filter,
  FileJson,
  Eye,
  X,
  Shield
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];

type ViewMode = 'tree' | 'raw' | 'formatted';
type Mode = 'single' | 'compare' | 'schema';

interface JsonTreeNodeProps {
  label?: string;
  value: JsonValue;
  isLast?: boolean;
  depth?: number;
  path?: string;
  searchTerm?: string;
  onCopyPath?: (path: string) => void;
}

interface SchemaValidationError {
  path: string;
  message: string;
}

const JsonTreeNode = ({
  label,
  value,
  isLast = true,
  depth = 0,
  path = '$',
  searchTerm = '',
  onCopyPath
}: JsonTreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const [copied, setCopied] = useState(false);
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);

  const currentPath = label
    ? isArray
      ? `${path}[${label}]`
      : `${path}.${label}`
    : path;

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    onCopyPath?.(currentPath);
  };

  const matchesSearch = (val: JsonValue, key?: string): boolean => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    if (key && key.toLowerCase().includes(term)) return true;
    if (val === null || typeof val === 'object') return false;
    return String(val).toLowerCase().includes(term);
  };

  const hasMatchingChild = (val: JsonValue): boolean => {
    if (!searchTerm || !isObject) return true;
    if (isArray) {
      return value.some((v: JsonValue, i: number) =>
        matchesSearch(v, String(i)) || hasMatchingChild(v)
      );
    }
    return Object.entries(value).some(([k, v]) =>
      matchesSearch(v, k) || hasMatchingChild(v)
    );
  };

  const shouldShow = matchesSearch(value, label) || hasMatchingChild(value);

  if (!shouldShow) return null;

  const renderValue = () => {
    if (value === null) return <span className="text-[#ff3e00]/60 italic">null</span>;
    if (typeof value === 'string') return <span className="text-[#ff3e00]">"{value}"</span>;
    if (typeof value === 'number') return <span className="text-blue-400">{value}</span>;
    if (typeof value === 'boolean') return <span className="text-purple-400 font-medium">{String(value)}</span>;
    return null;
  };

  if (!isObject) {
    const isMatch = matchesSearch(value, label);
    return (
      <div className={cn(
        "flex gap-2 py-0.5 group relative",
        isMatch && searchTerm && "bg-yellow-500/10 -mx-2 px-2 rounded"
      )}>
        {label && (
          <span className="text-white/40 font-mono text-sm leading-6">
            "{label}":
          </span>
        )}
        <span className="font-mono text-sm leading-6">
          {renderValue()}
          {!isLast && <span className="text-white/20">,</span>}
        </span>
        <button
          onClick={handleCopyPath}
          className="opacity-0 group-hover:opacity-100 ml-2 text-white/30 hover:text-accent transition-all text-[10px] uppercase tracking-wider"
          title="Copy JSONPath"
        >
          {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
        </button>
      </div>
    );
  }

  const entries = isArray ? value : Object.entries(value);
  const isEmpty = entries.length === 0;

  return (
    <div className="flex flex-col py-0.5">
      <div
        className="flex items-center gap-1 cursor-pointer group hover:bg-white/5 rounded px-1 -ml-1 relative"
        onClick={toggleOpen}
      >
        {!isEmpty ? (
          isOpen ? <ChevronDown size={14} className="text-white/40" /> : <ChevronRight size={14} className="text-white/40" />
        ) : (
          <span className="w-[14px]" />
        )}
        {label && (
          <span className="text-white/40 font-mono text-sm leading-6 group-hover:text-white/60 transition-colors">
            "{label}":
          </span>
        )}
        <span className="text-white/20 font-mono text-sm">
          {isArray ? '[' : '{'}
          {!isOpen && !isEmpty && <span className="mx-1 italic">... {entries.length} items</span>}
          {!isOpen || isEmpty ? (isArray ? ']' : '}') : ''}
          {!isOpen && !isLast && <span>,</span>}
        </span>
        <button
          onClick={handleCopyPath}
          className="opacity-0 group-hover:opacity-100 ml-2 text-white/30 hover:text-accent transition-all text-[10px] uppercase tracking-wider"
          title="Copy JSONPath"
        >
          {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
        </button>
      </div>

      {isOpen && !isEmpty && (
        <div className="json-tree-node ml-2">
          {isArray ? (
            value.map((v, i) => (
              <JsonTreeNode
                key={i}
                label={String(i)}
                value={v}
                isLast={i === value.length - 1}
                depth={depth + 1}
                path={currentPath}
                searchTerm={searchTerm}
                onCopyPath={onCopyPath}
              />
            ))
          ) : (
            Object.entries(value).map(([k, v], i) => (
              <JsonTreeNode
                key={k}
                label={k}
                value={v}
                isLast={i === entries.length - 1}
                depth={depth + 1}
                path={currentPath}
                searchTerm={searchTerm}
                onCopyPath={onCopyPath}
              />
            ))
          )}
        </div>
      )}

      {isOpen && !isEmpty && (
        <div className="text-white/20 font-mono text-sm leading-6">
          {isArray ? ']' : '}'}
          {!isLast && <span>,</span>}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState<Mode>('single');
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [schemaInput, setSchemaInput] = useState('');
  const [parsedData, setParsedData] = useState<JsonValue>(null);
  const [parsedData2, setParsedData2] = useState<JsonValue>(null);
  const [parsedSchema, setParsedSchema] = useState<JsonValue>(null);
  const [error, setError] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);
  const [schemaError, setSchemaError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<SchemaValidationError[]>([]);

  const validateJsonSchema = (data: JsonValue, schema: any): SchemaValidationError[] => {
    const errors: SchemaValidationError[] = [];

    const validate = (value: JsonValue, schemaNode: any, path: string = '$') => {
      if (!schemaNode) return;

      if (schemaNode.type) {
        const actualType = Array.isArray(value) ? 'array' : value === null ? 'null' : typeof value;
        if (actualType !== schemaNode.type && !(schemaNode.type === 'null' && value === null)) {
          errors.push({ path, message: `Expected ${schemaNode.type}, got ${actualType}` });
        }
      }

      if (schemaNode.required && typeof value === 'object' && value !== null && !Array.isArray(value)) {
        schemaNode.required.forEach((key: string) => {
          if (!(key in value)) {
            errors.push({ path: `${path}.${key}`, message: `Missing required property "${key}"` });
          }
        });
      }

      if (schemaNode.properties && typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.entries(value).forEach(([key, val]) => {
          if (schemaNode.properties[key]) {
            validate(val, schemaNode.properties[key], `${path}.${key}`);
          }
        });
      }

      if (schemaNode.items && Array.isArray(value)) {
        value.forEach((item, i) => {
          validate(item, schemaNode.items, `${path}[${i}]`);
        });
      }
    };

    validate(data, schema);
    return errors;
  };

  const generateSchema = (data: JsonValue): JsonValue => {
    if (data === null) return { type: 'null' };
    if (Array.isArray(data)) {
      if (data.length === 0) return { type: 'array', items: {} };
      const itemSchema = generateSchema(data[0]);
      return { type: 'array', items: itemSchema };
    }
    if (typeof data === 'object') {
      const properties: any = {};
      const required: string[] = [];
      Object.entries(data).forEach(([key, value]) => {
        properties[key] = generateSchema(value);
        required.push(key);
      });
      return { type: 'object', properties, required };
    }
    return { type: typeof data };
  };

  const compareJson = (obj1: JsonValue, obj2: JsonValue, path: string = '$'): any => {
    if (obj1 === obj2) return null;

    const type1 = Array.isArray(obj1) ? 'array' : obj1 === null ? 'null' : typeof obj1;
    const type2 = Array.isArray(obj2) ? 'array' : obj2 === null ? 'null' : typeof obj2;

    if (type1 !== type2) {
      return { path, type: 'changed', from: obj1, to: obj2 };
    }

    if (type1 !== 'object') {
      return obj1 !== obj2 ? { path, type: 'changed', from: obj1, to: obj2 } : null;
    }

    const diffs: any[] = [];

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      const maxLen = Math.max(obj1.length, obj2.length);
      for (let i = 0; i < maxLen; i++) {
        if (i >= obj1.length) {
          diffs.push({ path: `${path}[${i}]`, type: 'added', value: obj2[i] });
        } else if (i >= obj2.length) {
          diffs.push({ path: `${path}[${i}]`, type: 'removed', value: obj1[i] });
        } else {
          const diff = compareJson(obj1[i], obj2[i], `${path}[${i}]`);
          if (diff) diffs.push(diff);
        }
      }
    } else if (obj1 && obj2) {
      const keys1 = Object.keys(obj1 as object);
      const keys2 = Object.keys(obj2 as object);
      const allKeys = new Set([...keys1, ...keys2]);

      allKeys.forEach(key => {
        const val1 = (obj1 as any)[key];
        const val2 = (obj2 as any)[key];

        if (!(key in (obj1 as object))) {
          diffs.push({ path: `${path}.${key}`, type: 'added', value: val2 });
        } else if (!(key in (obj2 as object))) {
          diffs.push({ path: `${path}.${key}`, type: 'removed', value: val1 });
        } else {
          const diff = compareJson(val1, val2, `${path}.${key}`);
          if (diff) diffs.push(diff);
        }
      });
    }

    return diffs.length > 0 ? diffs : null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    if (!value.trim()) {
      setParsedData(null);
      setError(null);
      setValidationErrors([]);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      setParsedData(parsed);
      setError(null);

      if (mode === 'schema' && parsedSchema) {
        const errors = validateJsonSchema(parsed, parsedSchema);
        setValidationErrors(errors);
      }
    } catch (err) {
      const error = err as Error;
      let errorMessage = 'JSON is invalid: ';

      // Extract line and column information from SyntaxError
      const match = error.message.match(/position (\d+)/i);
      if (match) {
        const position = parseInt(match[1]);
        const lines = value.substring(0, position).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        errorMessage += `${error.message.split(' at ')[0]} at line ${line}, column ${column}`;
      } else {
        errorMessage += error.message;
      }

      // Add helpful suggestions
      if (error.message.includes('Unexpected token')) {
        errorMessage += '. Check for missing commas, brackets, or quotes.';
      } else if (error.message.includes('Unexpected end')) {
        errorMessage += '. Check for missing closing brackets or braces.';
      }

      setError(errorMessage);
      setParsedData(null);
      setValidationErrors([]);
    }
  };

  const handleInput2Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput2(value);

    if (!value.trim()) {
      setParsedData2(null);
      setError2(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      setParsedData2(parsed);
      setError2(null);
    } catch (err) {
      setError2((err as Error).message);
      setParsedData2(null);
    }
  };

  const handleSchemaInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSchemaInput(value);

    if (!value.trim()) {
      setParsedSchema(null);
      setSchemaError(null);
      setValidationErrors([]);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      setParsedSchema(parsed);
      setSchemaError(null);

      if (parsedData) {
        const errors = validateJsonSchema(parsedData, parsed);
        setValidationErrors(errors);
      }
    } catch (err) {
      setSchemaError((err as Error).message);
      setParsedSchema(null);
      setValidationErrors([]);
    }
  };

  const handlePrettify = () => {
    if (!parsedData) return;
    setInput(JSON.stringify(parsedData, null, 2));
  };

  const handleMinify = () => {
    if (!parsedData) return;
    setInput(JSON.stringify(parsedData));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!parsedData) return;
    const blob = new Blob([JSON.stringify(parsedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
    setParsedData(null);
    setError(null);
    setValidationErrors([]);
    setSearchTerm('');
  };

  const handleGenerateSchema = () => {
    if (!parsedData) return;
    const schema = generateSchema(parsedData);
    setSchemaInput(JSON.stringify(schema, null, 2));
    setParsedSchema(schema);
  };

  const handleCopyPath = (path: string) => {
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const differences = useMemo(() => {
    if (mode !== 'compare' || !parsedData || !parsedData2) return null;
    return compareJson(parsedData, parsedData2);
  }, [mode, parsedData, parsedData2]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-accent/30 selection:text-white">
      {/* Navigation */}
      <nav className="h-16 border-b border-border flex items-center justify-between px-6 bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <a href="/" className="text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest font-display font-bold">
            Online Tools
          </a>
          <div className="w-1 h-1 bg-white/20 rounded-full" />
          <div className="flex items-center gap-2 text-white/80 font-display uppercase tracking-widest text-sm font-bold">
            <Braces size={16} className="text-accent" />
            JSON Viewer
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('single')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs uppercase tracking-wider transition-all",
              mode === 'single' ? "bg-accent text-white" : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <Eye size={14} className="inline mr-1.5" />
            Viewer
          </button>
          <button
            onClick={() => setMode('compare')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs uppercase tracking-wider transition-all",
              mode === 'compare' ? "bg-accent text-white" : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <GitCompare size={14} className="inline mr-1.5" />
            Compare
          </button>
          <button
            onClick={() => setMode('schema')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs uppercase tracking-wider transition-all",
              mode === 'schema' ? "bg-accent text-white" : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <FileJson size={14} className="inline mr-1.5" />
            Schema
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-auto md:h-[calc(100vh-64px)] overflow-hidden">
        {mode === 'single' && (
          <div className="flex-1 flex flex-col md:flex-row h-full">
            {/* Input Panel */}
            <div className="flex-1 flex flex-col border-r border-border h-full">
              <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Input JSON</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrettify}
                    disabled={!parsedData}
                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                    title="Format JSON"
                  >
                    <AlignLeft size={16} />
                  </button>
                  <button
                    onClick={handleMinify}
                    disabled={!parsedData}
                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                    title="Minify JSON"
                  >
                    <Minimize2 size={16} />
                  </button>
                  <div className="w-px h-4 bg-white/10 mx-1" />
                  <button
                    onClick={handleClear}
                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-[#ff3e00]"
                    title="Clear"
                  >
                    <Eraser size={16} />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative group overflow-hidden">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  spellCheck={false}
                  className="w-full h-full bg-bg p-8 font-mono text-[15px] resize-none focus:outline-none placeholder:text-white/10 leading-[1.6] transition-all focus:bg-[#080808]"
                  placeholder='Paste your JSON here...
{
  "project": "Online Tools",
  "feature": "JSON Viewer",
  "status": "Production"
}'
                />
                {error && (
                  <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-3">
                    <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-red-500/90 leading-normal">{error}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(error);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      className="text-[10px] font-bold text-red-500/60 hover:text-red-500 uppercase tracking-wider shrink-0"
                      title="Copy error message"
                    >
                      Copy
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Panel */}
            <div className="flex-1 flex flex-col h-full bg-[#080808]">
              <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/40 font-bold">View</span>
                  <div className="flex gap-1 bg-white/5 rounded p-0.5">
                    <button
                      onClick={() => setViewMode('tree')}
                      className={cn(
                        "px-2 py-1 rounded text-[10px] uppercase tracking-wider transition-all",
                        viewMode === 'tree' ? "bg-accent text-white" : "text-white/40 hover:text-white"
                      )}
                    >
                      Tree
                    </button>
                    <button
                      onClick={() => setViewMode('raw')}
                      className={cn(
                        "px-2 py-1 rounded text-[10px] uppercase tracking-wider transition-all",
                        viewMode === 'raw' ? "bg-accent text-white" : "text-white/40 hover:text-white"
                      )}
                    >
                      Raw
                    </button>
                    <button
                      onClick={() => setViewMode('formatted')}
                      className={cn(
                        "px-2 py-1 rounded text-[10px] uppercase tracking-wider transition-all",
                        viewMode === 'formatted' ? "bg-accent text-white" : "text-white/40 hover:text-white"
                      )}
                    >
                      Formatted
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {viewMode === 'tree' && (
                    <div className="relative mr-2">
                      <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="pl-7 pr-8 py-1 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-accent/50 w-32"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  )}
                  <button
                    onClick={handleCopy}
                    disabled={!input}
                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20 flex items-center gap-2 px-3"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    <span className="text-[10px] uppercase tracking-wider font-bold">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!parsedData}
                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20"
                    title="Download JSON"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>

              {copiedPath && (
                <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-2 flex items-center gap-2">
                  <Check size={14} className="text-green-500" />
                  <span className="text-xs text-green-500">Copied path: <code className="font-mono">{copiedPath}</code></span>
                </div>
              )}

              <div className="flex-1 overflow-auto p-6 scroll-smooth">
                {!parsedData ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/10 gap-4">
                    <Braces size={48} strokeWidth={1} />
                    <p className="text-sm font-display tracking-widest uppercase">Waiting for input</p>
                  </div>
                ) : (
                  <div className="max-w-2xl">
                    {viewMode === 'tree' && (
                      <JsonTreeNode
                        value={parsedData}
                        searchTerm={searchTerm}
                        onCopyPath={handleCopyPath}
                      />
                    )}
                    {viewMode === 'raw' && (
                      <pre className="font-mono text-sm text-white/80 whitespace-pre-wrap break-all">
                        {JSON.stringify(parsedData)}
                      </pre>
                    )}
                    {viewMode === 'formatted' && (
                      <pre className="font-mono text-sm text-white/80 whitespace-pre-wrap">
                        {JSON.stringify(parsedData, null, 2)}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {mode === 'compare' && (
          <div className="flex-1 flex flex-col md:flex-row h-full">
            {/* Left JSON */}
            <div className="flex-1 flex flex-col border-r border-border">
              <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold">JSON 1</span>
              </div>
              <div className="flex-1 relative overflow-hidden">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  spellCheck={false}
                  className="w-full h-full bg-bg p-6 font-mono text-sm resize-none focus:outline-none placeholder:text-white/10 leading-[1.6]"
                  placeholder="First JSON..."
                />
                {error && (
                  <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 p-2 rounded flex items-start gap-2">
                    <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-500/90">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right JSON */}
            <div className="flex-1 flex flex-col border-r border-border">
              <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold">JSON 2</span>
              </div>
              <div className="flex-1 relative overflow-hidden">
                <textarea
                  value={input2}
                  onChange={handleInput2Change}
                  spellCheck={false}
                  className="w-full h-full bg-bg p-6 font-mono text-sm resize-none focus:outline-none placeholder:text-white/10 leading-[1.6]"
                  placeholder="Second JSON..."
                />
                {error2 && (
                  <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 p-2 rounded flex items-start gap-2">
                    <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-500/90">{error2}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Differences Panel */}
            <div className="flex-1 flex flex-col bg-[#080808]">
              <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Differences</span>
                {differences && Array.isArray(differences) && (
                  <span className="text-xs text-white/60">{differences.flat(Infinity).length} changes</span>
                )}
              </div>
              <div className="flex-1 overflow-auto p-6">
                {!parsedData || !parsedData2 ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/10 gap-4">
                    <GitCompare size={48} strokeWidth={1} />
                    <p className="text-sm font-display tracking-widest uppercase">Add two JSONs to compare</p>
                  </div>
                ) : !differences ? (
                  <div className="h-full flex flex-col items-center justify-center text-green-500/40 gap-4">
                    <Check size={48} strokeWidth={1} />
                    <p className="text-sm font-display tracking-widest uppercase">No differences</p>
                  </div>
                ) : (
                  <div className="space-y-2 font-mono text-sm">
                    {(Array.isArray(differences) ? differences.flat(Infinity) : [differences]).map((diff: any, i: number) => (
                      <div
                        key={i}
                        className={cn(
                          "p-3 rounded-lg border",
                          diff.type === 'added' && "bg-green-500/10 border-green-500/20",
                          diff.type === 'removed' && "bg-red-500/10 border-red-500/20",
                          diff.type === 'changed' && "bg-yellow-500/10 border-yellow-500/20"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold",
                            diff.type === 'added' && "bg-green-500/20 text-green-400",
                            diff.type === 'removed' && "bg-red-500/20 text-red-400",
                            diff.type === 'changed' && "bg-yellow-500/20 text-yellow-400"
                          )}>
                            {diff.type}
                          </span>
                          <code className="text-xs text-white/60">{diff.path}</code>
                        </div>
                        {diff.type === 'changed' && (
                          <div className="space-y-1 text-xs">
                            <div className="text-red-400">- {JSON.stringify(diff.from)}</div>
                            <div className="text-green-400">+ {JSON.stringify(diff.to)}</div>
                          </div>
                        )}
                        {(diff.type === 'added' || diff.type === 'removed') && (
                          <div className="text-xs text-white/60">
                            {JSON.stringify(diff.value, null, 2)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {mode === 'schema' && (
          <div className="flex-1 flex flex-col md:flex-row h-full">
            {/* JSON Input */}
            <div className="flex-1 flex flex-col border-r border-border">
              <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold">JSON Data</span>
              </div>
              <div className="flex-1 relative overflow-hidden">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  spellCheck={false}
                  className="w-full h-full bg-bg p-6 font-mono text-sm resize-none focus:outline-none placeholder:text-white/10 leading-[1.6]"
                  placeholder="Paste JSON to validate..."
                />
                {error && (
                  <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 p-2 rounded flex items-start gap-2">
                    <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-500/90">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Schema Input */}
            <div className="flex-1 flex flex-col border-r border-border">
              <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold">JSON Schema</span>
                <button
                  onClick={handleGenerateSchema}
                  disabled={!parsedData}
                  className="px-2 py-1 bg-accent/20 hover:bg-accent/30 text-accent rounded text-[10px] uppercase tracking-wider disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  Generate
                </button>
              </div>
              <div className="flex-1 relative overflow-hidden">
                <textarea
                  value={schemaInput}
                  onChange={handleSchemaInputChange}
                  spellCheck={false}
                  className="w-full h-full bg-bg p-6 font-mono text-sm resize-none focus:outline-none placeholder:text-white/10 leading-[1.6]"
                  placeholder="Paste or generate schema..."
                />
                {schemaError && (
                  <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 p-2 rounded flex items-start gap-2">
                    <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-500/90">{schemaError}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Validation Results */}
            <div className="flex-1 flex flex-col bg-[#080808]">
              <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Validation</span>
                {validationErrors.length > 0 && (
                  <span className="text-xs text-red-400">{validationErrors.length} errors</span>
                )}
              </div>
              <div className="flex-1 overflow-auto p-6">
                {!parsedData || !parsedSchema ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/10 gap-4">
                    <FileJson size={48} strokeWidth={1} />
                    <p className="text-sm font-display tracking-widest uppercase text-center">
                      Add JSON and schema<br />to validate
                    </p>
                  </div>
                ) : validationErrors.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-green-500/40 gap-4">
                    <Check size={48} strokeWidth={1} />
                    <p className="text-sm font-display tracking-widest uppercase">Valid JSON</p>
                  </div>
                ) : (
                  <div className="space-y-2 font-mono text-sm">
                    {validationErrors.map((err, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border bg-red-500/10 border-red-500/20"
                      >
                        <code className="text-xs text-white/60 block mb-2">{err.path}</code>
                        <p className="text-xs text-red-400">{err.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent blur-[120px] rounded-full opacity-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 blur-[120px] rounded-full opacity-5" />
      </div>
    </div>
  );
}
