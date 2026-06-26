import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Orbit, TimerReset, Users } from 'lucide-react'
import { createGame } from '../lib/api'

export default function Home() {
  const navigate = useNavigate()
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  const handleCreateGame = async () => {
    try {
      setIsCreating(true)
      setError('')
      const response = await createGame()
      navigate(`/game/${response.gameId}`)
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Failed to create a game room.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-orange-200/80">Distributed estimation room</p>
          <h1 className="mt-4 max-w-4xl font-display text-6xl leading-none text-stone-50 sm:text-7xl">
            Planning poker with a sharper table presence.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
            Spin up a room in one click, drop a link into Slack, and guide estimation without logins,
            installs, or spreadsheet sprawl.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => void handleCreateGame()}
              disabled={isCreating}
              className="inline-flex items-center gap-2 rounded-full bg-orange-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-100 disabled:cursor-wait disabled:opacity-70"
            >
              {isCreating ? 'Opening room...' : 'Create game'}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#foundation"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-medium text-stone-100 transition hover:bg-white/10"
            >
              See foundation scope
            </a>
          </div>

          {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

          <div id="foundation" className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5">
              <Orbit className="h-5 w-5 text-orange-200" />
              <h2 className="mt-4 text-lg font-semibold text-stone-100">Room-first</h2>
              <p className="mt-2 text-sm leading-6 text-stone-400">Unique 8-character game ids with shareable URLs and server-backed room state.</p>
            </div>
            <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5">
              <Users className="h-5 w-5 text-orange-200" />
              <h2 className="mt-4 text-lg font-semibold text-stone-100">No accounts</h2>
              <p className="mt-2 text-sm leading-6 text-stone-400">Local identity keeps the join flow light so teams can start estimating immediately.</p>
            </div>
            <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5">
              <TimerReset className="h-5 w-5 text-orange-200" />
              <h2 className="mt-4 text-lg font-semibold text-stone-100">Realtime-ready</h2>
              <p className="mt-2 text-sm leading-6 text-stone-400">The WebSocket hook and Durable Object skeleton are wired for the next implementation pass.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2.6rem] border border-white/10 bg-slate-950/65 p-6 shadow-[0_26px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-8">
          <div className="rounded-[2rem] border border-orange-200/14 bg-[linear-gradient(180deg,_rgba(196,93,58,0.12)_0%,_rgba(255,255,255,0.03)_100%)] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-orange-100/80">Current build slice</p>
            <h2 className="mt-3 font-display text-4xl text-stone-50">Phase 1 foundation</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-stone-300">
              <li>Room creation API with Durable Object persistence</li>
              <li>Routeable home and game views for `/` and `/game/:id`</li>
              <li>Game shell with participant roster, host controls, and Fibonacci deck preview</li>
              <li>Local dev proxy from Vite to the Worker API</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
