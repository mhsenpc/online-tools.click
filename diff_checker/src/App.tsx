import React, { useState, useMemo } from 'react';
import { useDiff } from './hooks/useDiff';
import Toolbar from './components/Toolbar';
import InputPanel from './components/InputPanel';
import DiffViewer from './components/DiffViewer';
import Summary from './components/Summary';
import { ArrowLeftRight, Github, Code2, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');
  const [showDiff, setShowDiff] = useState(false);
  const [options, setOptions] = useState({
    ignoreWhitespace: false,
    ignoreCase: false,
  });

  const { diffLines, summary } = useDiff(original, modified, options);

  const handleDiff = () => {
    setShowDiff(true);
  };

  const handleReset = () => {
    setShowDiff(false);
  };

  const handleSwap = () => {
    setOriginal(modified);
    setModified(original);
  };

  const handleClear = () => {
    setOriginal('');
    setModified('');
    setShowDiff(false);
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
              <span className="font-bold text-zinc-100">Diff Checker</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/mohsenshamohammadi" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col max-w-[1600px] mx-auto w-full px-4 py-8 gap-8">
        {/* Header Section */}
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">Compare documents</h1>
          <p className="text-zinc-500 max-w-2xl">A premium, client-side text diffing tool. Your data never leaves your browser.</p>
        </header>

        {/* Action Toolbar */}
        <Toolbar 
          showDiff={showDiff}
          onReset={handleReset}
          onDiff={handleDiff}
          onSwap={handleSwap}
          onClear={handleClear}
          viewMode={viewMode}
          setViewMode={setViewMode}
          options={options}
          setOptions={setOptions}
          summary={summary}
        />

        {/* Content Area */}
        <div className="flex-grow min-h-[500px] relative">
          {!showDiff ? (
            <InputPanel 
              original={original}
              setOriginal={setOriginal}
              modified={modified}
              setModified={setModified}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <Summary summary={summary} totalLines={diffLines.length} />
              <DiffViewer 
                diffLines={diffLines} 
                viewMode={viewMode}
              />
            </div>
          )}
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
