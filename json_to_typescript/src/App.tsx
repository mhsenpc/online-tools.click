import { useState, useEffect } from 'react';
import {
  Code,
  Copy,
  Check,
  Eraser,
  FileCode,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];

interface JsonToTsOptions {
  readonly: boolean;
  rootInterfaceName: string;
}

// Generate TypeScript interface from JSON
function jsonToTs(json: JsonValue, options: JsonToTsOptions, currentInterfaceName?: string): string {
  const { readonly, rootInterfaceName } = options;
  const interfaceName = currentInterfaceName || rootInterfaceName;

  const readonlyModifier = readonly ? 'readonly ' : '';

  if (json === null) {
    return `null`;
  }

  if (typeof json === 'string') {
    return 'string';
  }

  if (typeof json === 'number') {
    return 'number';
  }

  if (typeof json === 'boolean') {
    return 'boolean';
  }

  if (Array.isArray(json)) {
    if (json.length === 0) {
      return 'any[]';
    }

    // Analyze array elements to determine the type
    const firstElement = json[0];
    const elementType = jsonToTs(firstElement, options, `${interfaceName}Item`);

    // Check if all elements are of the same primitive type
    const allPrimitives = json.every(item =>
      typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean' || item === null
    );

    if (allPrimitives) {
      const types = json.map(item => {
        if (item === null) return 'null';
        return typeof item;
      });
      const uniqueTypes = Array.from(new Set(types));
      if (uniqueTypes.length === 1) {
        return `${uniqueTypes[0]}[]`;
      }
      return `(${uniqueTypes.join(' | ')})[]`;
    }

    return `${elementType}[]`;
  }

  if (typeof json === 'object') {
    const entries = Object.entries(json);

    if (entries.length === 0) {
      return `interface ${interfaceName} {}`;
    }

    // Collect all nested interfaces first
    const nestedInterfaces: string[] = [];
    const properties: string[] = [];

    entries.forEach(([key, value]) => {
      let typeStr: string;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const nestedInterfaceName = `${interfaceName}${key.charAt(0).toUpperCase() + key.slice(1)}`;
        const nestedInterface = jsonToTs(value, options, nestedInterfaceName);

        // Extract just the interface name for the property type
        const interfaceDeclaration = nestedInterface.split('\n')[0];
        typeStr = interfaceDeclaration.replace('interface ', '').replace('{', '').trim();

        // Store the full nested interface definition
        if (nestedInterface.trim()) {
          nestedInterfaces.push(nestedInterface);
        }
      } else if (Array.isArray(value)) {
        typeStr = jsonToTs(value, options, `${interfaceName}${key.charAt(0).toUpperCase() + key.slice(1)}`);
      } else {
        typeStr = jsonToTs(value, options);
      }

      properties.push(`  ${readonlyModifier}${key}: ${typeStr};`);
    });

    // Build the result with nested interfaces first, then the main interface
    let result = nestedInterfaces.join('\n\n');
    if (result && properties.length > 0) {
      result += '\n\n';
    }
    result += `interface ${interfaceName} {\n`;
    result += properties.join('\n');
    result += '\n}';

    return result;
  }

  return 'any';
}

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [rootInterfaceName, setRootInterfaceName] = useState('RootObject');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    if (!value.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      const tsInterface = jsonToTs(parsed, { readonly, rootInterfaceName });
      setOutput(tsInterface);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  // Update output when options change
  useEffect(() => {
    if (input.trim() && !error) {
      try {
        const parsed = JSON.parse(input);
        const tsInterface = jsonToTs(parsed, { readonly, rootInterfaceName });
        setOutput(tsInterface);
      } catch (err) {
        // Keep existing state
      }
    }
  }, [readonly, rootInterfaceName]);

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
            <FileCode size={16} className="text-accent" />
            JSON to TypeScript
          </div>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-widest text-white/60 hover:text-white bg-surface border border-border rounded-md hover:border-white/20 transition-all"
        >
          <Settings size={14} />
          Options
          {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </nav>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="border-b border-border bg-surface/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={readonly}
                  onChange={(e) => setReadonly(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-bg accent-accent"
                />
                <span className="text-sm text-white/70">Readonly properties</span>
              </label>

              <div className="flex items-center gap-2">
                <label className="text-sm text-white/70">Interface name:</label>
                <input
                  type="text"
                  value={rootInterfaceName}
                  onChange={(e) => setRootInterfaceName(e.target.value)}
                  className="px-3 py-1 text-sm bg-bg border border-border rounded focus:border-accent focus:outline-none text-white font-mono"
                  placeholder="RootObject"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row h-auto md:h-[calc(100vh-64px)] overflow-hidden">
        {/* Input Panel */}
        <div className="flex-1 flex flex-col border-r border-border h-full min-h-[500px] md:min-h-0">
          <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Input JSON</span>
            <button
              onClick={handleClear}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-[#ff3e00]"
              title="Clear"
            >
              <Eraser size={16} />
            </button>
          </div>
          <div className="flex-1 relative group overflow-hidden">
            <textarea
              value={input}
              onChange={handleInputChange}
              spellCheck={false}
              className="w-full h-full min-h-[700px] bg-bg p-8 font-mono text-[15px] resize-none focus:outline-none placeholder:text-white/10 leading-[1.6] transition-all focus:bg-[#080808]"
              placeholder='Paste your JSON here...
{
  "user": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "roles": ["admin", "user"],
    "active": true
  },
  "metadata": {
    "created": "2024-01-01",
    "updated": null
  }
}'
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                <p className="text-xs text-red-500/90 leading-normal">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col h-full bg-[#080808]">
          <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surface">
            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">TypeScript Interface</span>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 px-3"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              <span className="text-[10px] uppercase tracking-wider font-bold">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="flex-1 overflow-auto p-6 scroll-smooth">
            {!output ? (
              <div className="h-full flex flex-col items-center justify-center text-white/10 gap-4">
                <Code size={48} strokeWidth={1} />
                <p className="text-sm font-display tracking-widest uppercase">TypeScript interface will appear here</p>
              </div>
            ) : (
              <pre className="font-mono text-sm leading-[1.6] text-white/90">
                <code>{output}</code>
              </pre>
            )}
          </div>
        </div>
      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent blur-[120px] rounded-full opacity-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 blur-[120px] rounded-full opacity-5" />
      </div>
    </div>
  );
}
