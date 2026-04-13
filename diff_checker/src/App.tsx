import { useState, useCallback, useEffect } from "react";
import { Moon, Sun, GitCompare, ArrowLeft } from "lucide-react";
import { InputPanel } from "./components/InputPanel";
import { DiffViewer } from "./components/DiffViewer";
import { Toolbar } from "./components/Toolbar";
import { useDiff, type DiffView, type DiffOptions } from "./hooks/useDiff";

type Mode = "input" | "diff";

function App() {
  const [mode, setMode] = useState<Mode>("input");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [view, setView] = useState<DiffView>("side-by-side");
  const [options, setOptions] = useState<DiffOptions>({
    ignoreWhitespace: false,
    ignoreCase: false,
  });
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true; // Default to dark for this project's aesthetic
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const diffResult = useDiff(left, right, options);

  const handleSubmit = useCallback(() => {
    setMode("diff");
  }, []);

  const handleBack = useCallback(() => {
    setMode("input");
  }, []);

  const handleSwap = useCallback(() => {
    setLeft(right);
    setRight(left);
  }, [left, right]);

  const handleClear = useCallback(() => {
    setLeft("");
    setRight("");
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-orange-500/30 selection:text-orange-200">
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <a 
              href="/" 
              className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-orange-500 transition-colors font-medium"
            >
              Online Tools
            </a>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded bg-orange-500/10 text-orange-500">
                <GitCompare className="w-4 h-4" />
              </div>
              <h1 className="text-sm font-bold uppercase tracking-wider text-white">
                Diff Checker
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto px-6 py-8 flex flex-col min-h-[calc(100vh-65px)]">
          {mode === "input" ? (
            <div className="flex-1 flex flex-col">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Compare Text</h2>
                <p className="text-zinc-500 text-sm">Paste two snippets of text, code, or JSON to find the differences.</p>
              </div>

              <form
                onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                className="flex flex-col flex-1 gap-6 min-h-0"
              >
                <div className="flex-1 min-h-[400px]">
                  <InputPanel
                    left={left}
                    right={right}
                    onLeftChange={setLeft}
                    onRightChange={setRight}
                    onSwap={handleSwap}
                    onClear={handleClear}
                  />
                </div>
                
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={!left && !right}
                    className="group relative px-12 py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-30 disabled:hover:bg-orange-500 text-black text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-none overflow-hidden"
                  >
                    <span className="relative z-10">Find Differences</span>
                    <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-white transition-transform duration-300 ease-out opacity-10" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col flex-1 gap-6 min-h-0">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-orange-500/50 text-zinc-400 hover:text-white transition-all text-[11px] uppercase tracking-wider"
                >
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  Back to Editor
                </button>
              </div>

              <Toolbar
                view={view}
                onViewChange={setView}
                options={options}
                onOptionsChange={setOptions}
                diffResult={diffResult}
                left={left}
                right={right}
                onBack={handleBack}
              />
              
              <div className="flex-1 min-h-0 bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden shadow-2xl shadow-black">
                <DiffViewer result={diffResult} view={view} />
              </div>
            </div>
          )}
        </main>
        
        <footer className="px-6 py-8 mt-auto border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            Built for precision • 2026
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;