import { useState, useCallback, useEffect } from "react";
import { Moon, Sun, GitCompare } from "lucide-react";
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
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
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
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
        <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-blue-600 text-white">
              <GitCompare className="w-4 h-4" />
            </div>
            <h1 className="text-base font-semibold tracking-tight">
              Diff Checker
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setDark(!dark)}
            className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </header>

        <main className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col" style={{ height: "calc(100svh - 57px)" }}>
          {mode === "input" ? (
            <form
              onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
              className="flex flex-col flex-1 gap-4 min-h-0"
            >
              <InputPanel
                left={left}
                right={right}
                onLeftChange={setLeft}
                onRightChange={setRight}
                onSwap={handleSwap}
                onClear={handleClear}
              />
              <button
                type="submit"
                className="self-center px-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
              >
                Compare
              </button>
            </form>
          ) : (
            <div className="flex flex-col flex-1 gap-4 min-h-0">
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
              <div className="flex-1 overflow-auto rounded-lg">
                <DiffViewer result={diffResult} view={view} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
