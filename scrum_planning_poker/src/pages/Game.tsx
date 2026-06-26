import { FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BadgeHelp, Server, Wifi } from 'lucide-react'
import Card from '../components/Card'
import HostControls from '../components/HostControls'
import InviteButton from '../components/InviteButton'
import ParticipantList from '../components/ParticipantList'
import Table from '../components/Table'
import Toast from '../components/Toast'
import { getGame, getGameState } from '../lib/api'
import { getRememberedName, getUserId, rememberName } from '../lib/identity'
import { useGameState } from '../hooks/useGameState'
import { useWebSocket } from '../hooks/useWebSocket'
import { VOTING_VALUES, type ServerMsg, type VoteValue } from '../types/game'

interface ToastState {
  kind: 'success' | 'error' | 'info'
  message: string
}

function buildWebSocketUrl(gameId: string, userId: string) {
  const configuredBase = import.meta.env.VITE_WS_BASE_URL?.replace(/\/$/, '')
  const encodedUserId = encodeURIComponent(userId)

  if (configuredBase) {
    return `${configuredBase}/ws/${gameId}?userId=${encodedUserId}`
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${protocol}//${window.location.host}/ws/${gameId}?userId=${encodedUserId}`
}

function getNumericAverage(votes: Record<string, VoteValue>) {
  const numbers = Object.values(votes)
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value))

  if (numbers.length === 0) {
    return null
  }

  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length
}

export default function Game() {
  const { id = '' } = useParams()
  const { gameState, session, setGameState, setSession } = useGameState()
  const [name, setName] = useState(getRememberedName())
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading')
  const [storyDraft, setStoryDraft] = useState('Pick the next story')
  const [liveError, setLiveError] = useState('')
  const [toast, setToast] = useState<ToastState | null>(null)

  useEffect(() => {
    if (!toast) {
      return
    }

    const timer = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    let cancelled = false

    const loadGame = async () => {
      try {
        setStatus('loading')
        const [{ exists }, stateResponse] = await Promise.all([getGame(id), getGameState(id)])

        if (cancelled) {
          return
        }

        if (!exists) {
          setStatus('missing')
          setGameState(null)
          return
        }

        setGameState(stateResponse.state)
        setStoryDraft(stateResponse.state?.storyTitle ?? 'Pick the next story')
        setStatus('ready')
      } catch {
        if (!cancelled) {
          setStatus('error')
        }
      }
    }

    void loadGame()

    return () => {
      cancelled = true
    }
  }, [id, setGameState])

  useEffect(() => {
    setStoryDraft(gameState?.storyTitle ?? 'Pick the next story')
  }, [gameState?.storyTitle])

  const activeSession = session?.gameId === id ? session : null
  const socketUrl = activeSession ? buildWebSocketUrl(id, activeSession.userId) : null
  const roomUsers = Object.values(gameState?.users ?? {})
  const currentUser = activeSession ? gameState?.users[activeSession.userId] ?? null : null
  const isHost = Boolean(activeSession && gameState?.hostId === activeSession.userId)
  const isRevealed = gameState?.phase === 'revealed'
  const selectedVote = activeSession ? gameState?.votes[activeSession.userId] : undefined
  const average = getNumericAverage(gameState?.votes ?? {})

  const { status: socketStatus, send } = useWebSocket(socketUrl, {
    enabled: status === 'ready' && Boolean(activeSession),
    onOpen: () => {
      if (!activeSession) {
        return
      }

      setLiveError('')
      send(JSON.stringify({ type: 'join', name: activeSession.name }))
    },
    onClose: () => {
      setLiveError('Connection lost. Reconnecting...')
    },
    onMessage: (event) => {
      try {
        const message = JSON.parse(event.data) as ServerMsg

        if (message.type === 'state') {
          setGameState(message.state)
          setLiveError('')
          return
        }

        if (message.type === 'error') {
          setLiveError(message.message)
          setToast({ kind: 'error', message: message.message })
        }
      } catch {
        setLiveError('Received an invalid server message.')
      }
    },
  })

  const handleJoinRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanedName = name.trim().slice(0, 30)
    if (!cleanedName) {
      setToast({ kind: 'error', message: 'Enter a display name before joining.' })
      return
    }

    rememberName(cleanedName)
    setSession({
      userId: getUserId(),
      name: cleanedName,
      gameId: id,
    })
    setLiveError('')
    setToast({ kind: 'info', message: 'Joining the room...' })
  }

  const sendMessage = (message: object) => {
    const sent = send(JSON.stringify(message))
    if (!sent) {
      setLiveError('The room connection is not open yet.')
      setToast({ kind: 'error', message: 'The room connection is not open yet.' })
    }

    return sent
  }

  const handleVote = (value: VoteValue) => {
    if (sendMessage({ type: 'vote', value })) {
      setToast({ kind: 'success', message: `Vote ${value} sent.` })
    }
  }

  const handleReveal = () => {
    if (sendMessage({ type: 'reveal' })) {
      setToast({ kind: 'success', message: 'Reveal sent to the room.' })
    }
  }

  const handleReset = () => {
    if (sendMessage({ type: 'reset' })) {
      setToast({ kind: 'success', message: 'Round reset sent.' })
    }
  }

  const handleSyncStory = () => {
    if (sendMessage({ type: 'setStory', title: storyDraft })) {
      setToast({ kind: 'success', message: 'Story title synced.' })
    }
  }

  const inviteUrl = typeof window === 'undefined' ? '' : window.location.href
  const canManage = isHost && socketStatus === 'open'
  const canVote = Boolean(currentUser) && socketStatus === 'open' && !isRevealed
  const canReveal = canManage && !isRevealed && roomUsers.some((user) => user.hasVoted)
  const canReset = canManage && (isRevealed || roomUsers.some((user) => user.hasVoted))

  const connectionLabel =
    !activeSession
      ? 'Join to connect'
      : socketStatus === 'open'
        ? 'Live'
        : socketStatus === 'connecting'
          ? 'Connecting'
          : socketStatus === 'closed'
            ? 'Reconnecting'
            : socketStatus === 'error'
              ? 'Connection error'
              : 'Waiting'

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-stone-300 transition hover:text-stone-100">
            <ArrowLeft className="h-4 w-4" />
            Back to lobby
          </Link>
          <h1 className="mt-3 font-display text-5xl text-stone-50">Room {id}</h1>
          <p className="mt-2 text-sm text-stone-400">Live room sync is active. Join the table and the Durable Object will keep every client aligned.</p>
        </div>
        <div className="flex items-center gap-3">
          {activeSession ? (
            <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-stone-200">
              {connectionLabel}
            </span>
          ) : null}
          {status === 'ready' ? (
            <InviteButton
              url={inviteUrl}
              onCopied={() => setToast({ kind: 'success', message: 'Invite link copied.' })}
              onError={(message) => setToast({ kind: 'error', message })}
            />
          ) : null}
        </div>
      </div>

      {status === 'loading' ? (
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-8 text-stone-300 backdrop-blur-xl">
          Checking room state...
        </section>
      ) : null}

      {status === 'missing' ? (
        <section className="rounded-[2rem] border border-rose-300/20 bg-rose-400/8 p-8 text-stone-200">
          <p className="text-lg font-semibold">This room does not exist.</p>
          <p className="mt-2 text-sm text-stone-300">Create a fresh room from the lobby and share the new invite link.</p>
        </section>
      ) : null}

      {status === 'error' ? (
        <section className="rounded-[2rem] border border-rose-300/20 bg-rose-400/8 p-8 text-stone-200">
          <p className="text-lg font-semibold">The room could not be loaded.</p>
          <p className="mt-2 text-sm text-stone-300">Check whether the Worker is running locally or the API route is deployed.</p>
        </section>
      ) : null}

      {status === 'ready' ? (
        <>
          {!activeSession ? (
            <section className="mb-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.28em] text-orange-200/80">Join room</p>
                <h2 className="mt-3 font-display text-4xl text-stone-50">Claim your seat</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-stone-300">
                  Enter a display name and the room will connect you over WebSockets automatically.
                </p>

                <form onSubmit={handleJoinRoom} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-orange-200/40"
                    placeholder="Your name"
                    maxLength={30}
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-orange-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-100"
                  >
                    Join room
                  </button>
                </form>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
                <div className="flex items-start gap-3">
                  <div className="rounded-full border border-white/10 bg-white/6 p-3 text-orange-200">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-stone-100">Room state and presence are shared live</h2>
                    <p className="mt-2 text-sm leading-7 text-stone-400">
                      The first connected user becomes host, every join updates the room instantly, and reconnects reuse the same local user id.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          <section className="mb-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-4">
              <div className="flex items-center gap-2 text-stone-200">
                <BadgeHelp className="h-4 w-4 text-orange-200" />
                <span className="text-sm font-medium">Story</span>
              </div>
              <p className="mt-2 text-sm text-stone-400">{gameState?.storyTitle ?? 'Pick the next story'}</p>
            </div>
            <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-4">
              <div className="flex items-center gap-2 text-stone-200">
                <Wifi className="h-4 w-4 text-orange-200" />
                <span className="text-sm font-medium">Socket layer</span>
              </div>
              <p className="mt-2 text-sm text-stone-400">{connectionLabel}</p>
            </div>
            <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-4">
              <div className="flex items-center gap-2 text-stone-200">
                <Server className="h-4 w-4 text-orange-200" />
                <span className="text-sm font-medium">Round</span>
              </div>
              <p className="mt-2 text-sm text-stone-400">
                {isRevealed ? `Revealed${average !== null ? `, avg ${average.toFixed(1)}` : ''}` : roomUsers.length === 0 ? 'Waiting for players' : 'Voting in progress'}
              </p>
            </div>
          </section>

          {liveError ? (
            <section className="mb-6 rounded-[1.6rem] border border-amber-300/20 bg-amber-300/8 px-5 py-4 text-sm text-amber-100">
              {liveError}
            </section>
          ) : null}

          <section className="grid gap-6 xl:grid-cols-[280px_1fr_320px]">
            <ParticipantList
              users={roomUsers}
              currentUserId={activeSession?.userId}
              isRevealed={isRevealed}
              votes={gameState?.votes ?? {}}
            />

            <div className="space-y-6">
              <Table
                users={roomUsers}
                storyTitle={gameState?.storyTitle ?? storyDraft}
                currentUserId={activeSession?.userId}
                isRevealed={isRevealed}
                votes={gameState?.votes ?? {}}
              />

              <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-stone-400">Deck</p>
                    <h2 className="mt-1 text-lg font-semibold text-stone-100">Cast your estimate</h2>
                  </div>
                  <span className="text-xs text-stone-500">
                    {selectedVote ? `Selected ${selectedVote}` : canVote ? 'Choose a card' : activeSession ? 'Waiting for room sync' : 'Join to vote'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {VOTING_VALUES.map((value) => (
                    <Card key={value} label={value} active={selectedVote === value} disabled={!canVote} onClick={() => handleVote(value)} />
                  ))}
                </div>
              </section>

              {isRevealed ? (
                <section className="rounded-[2rem] border border-orange-200/16 bg-orange-200/8 p-5">
                  <p className="text-xs uppercase tracking-[0.26em] text-orange-100/80">Reveal summary</p>
                  <div className="mt-3 flex flex-wrap items-end gap-6">
                    <div>
                      <p className="text-sm text-stone-300">Average</p>
                      <p className="font-display text-4xl text-stone-50">{average === null ? 'n/a' : average.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-300">Votes shown</p>
                      <p className="text-2xl font-semibold text-stone-50">{Object.keys(gameState?.votes ?? {}).length}</p>
                    </div>
                  </div>
                </section>
              ) : null}
            </div>

            <HostControls
              storyTitle={storyDraft}
              onStoryTitleChange={setStoryDraft}
              canManage={canManage}
              canReveal={canReveal}
              canReset={canReset}
              onReveal={handleReveal}
              onReset={handleReset}
              onSyncStory={handleSyncStory}
            />
          </section>
        </>
      ) : null}

      {toast ? <Toast kind={toast.kind} message={toast.message} /> : null}
    </main>
  )
}
