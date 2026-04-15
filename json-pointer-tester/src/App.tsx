import React from 'react';
import { useJsonPathTester } from './hooks/useJsonPathTester';
import Toolbar from './components/Toolbar';
import JsonInput from './components/JsonInput';
import ExpressionInput from './components/ExpressionInput';
import ResultViewer from './components/ResultViewer';
import { Globe, Code2 } from 'lucide-react';

const App: React.FC = () => {
  const {
    jsonInput,
    setJsonInput,
    expression,
    setExpression,
    syntaxMode,
    setSyntaxMode,
    pathSyntax,
    setPathSyntax,
    result,
    explanation,
    isValidJson,
    jsonError
  } = useJsonPathTester();

  const handleClear = () => {
    setJsonInput('');
    setExpression('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      {/* Navbar */}
      <nav className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="https://online-tools.click" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Globe className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-zinc-100">Online Tools</span>
            </a>
            <span className="text-zinc-700">/</span>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-zinc-400" />
              <span className="font-bold text-zinc-100">JSON Pointer / Path Tester</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col max-w-[1600px] mx-auto w-full px-4 py-8 gap-8">
        {/* Header Section */}
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">JSON Pointer / Path Tester</h1>
          <p className="text-zinc-500 max-w-2xl">
            Test and debug JSON Pointers (RFC 6901) and JSONPath expressions against JSON objects with live matching and detailed explanations.
          </p>
        </header>

        {/* Toolbar */}
        <Toolbar onClear={handleClear} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
          {/* Left Panel - Input */}
          <div className="flex flex-col gap-6">
            {/* JSON Input */}
            <JsonInput
              value={jsonInput}
              onChange={setJsonInput}
              isValid={isValidJson}
              error={jsonError}
            />

            {/* Expression Input */}
            <ExpressionInput
              expression={expression}
              onChange={setExpression}
              syntaxMode={syntaxMode}
              onSyntaxModeChange={setSyntaxMode}
              pathSyntax={pathSyntax}
              onPathSyntaxChange={setPathSyntax}
            />
          </div>

          {/* Right Panel - Results */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6 min-h-[600px]">
            <ResultViewer
              result={result}
              expression={expression}
              explanation={explanation}
              syntaxMode={syntaxMode}
            />
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-zinc-900 bg-zinc-950/50">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <p className="text-zinc-600 text-sm">© 2026 Online Tools Click. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
