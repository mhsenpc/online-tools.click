import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Globe, Rows3 } from 'lucide-react'
import Home from './pages/Home'
import Game from './pages/Game'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(196,93,58,0.22),_transparent_34%),linear-gradient(180deg,_#090d14_0%,_#101725_42%,_#0b1019_100%)] text-stone-100">
        <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative flex min-h-screen flex-col">
          <nav className="border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.26em] text-stone-300/80">
                <a href="https://online-tools.click" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                  <Globe className="h-4 w-4 text-orange-300" />
                  <span>Online Tools</span>
                </a>
                <span className="text-stone-500">/</span>
                <span className="flex items-center gap-2 text-stone-100">
                  <Rows3 className="h-4 w-4 text-amber-200" />
                  Scrum Planning Poker
                </span>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<Game />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
