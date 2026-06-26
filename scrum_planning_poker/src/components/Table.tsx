import type { User, VoteValue } from '../types/game'

interface TableProps {
  users: User[]
  storyTitle: string
  currentUserId?: string
  isRevealed?: boolean
  votes?: Record<string, VoteValue>
}

export default function Table({ users, storyTitle, currentUserId, isRevealed = false, votes = {} }: TableProps) {
  const positions = [
    'left-1/2 top-0 -translate-x-1/2',
    'right-6 top-12',
    'right-0 top-1/2 -translate-y-1/2',
    'right-8 bottom-12',
    'left-1/2 bottom-0 -translate-x-1/2',
    'left-8 bottom-12',
    'left-0 top-1/2 -translate-y-1/2',
    'left-6 top-12',
  ]

  return (
    <section className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(242,232,216,0.08),_transparent_32%),linear-gradient(180deg,_rgba(13,18,31,0.96)_0%,_rgba(7,10,18,0.96)_100%)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_32%,transparent_68%,rgba(255,255,255,0.03))]" />
      <div className="relative space-y-6 md:hidden">
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-orange-200/20 bg-orange-100/8 px-6 py-8 text-center shadow-[inset_0_0_60px_rgba(242,232,216,0.06)]">
          <p className="px-2 font-display text-3xl text-orange-50">{storyTitle}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.34em] text-stone-400">Voting table</p>
        </div>

        {users.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-stone-400">
            Join the room to claim the first seat and become host.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {users.map((user) => (
              <div key={user.id} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-stone-100">{user.name}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-stone-500">
                      {user.isHost ? 'Host' : user.id === currentUserId ? 'You' : 'Player'}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-sm font-semibold text-stone-100">
                    {isRevealed ? votes[user.id] ?? '-' : user.hasVoted ? '✓' : '·'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative hidden min-h-[360px] md:block">
        <div className="absolute left-1/2 top-1/2 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-orange-200/20 bg-orange-100/8 text-center shadow-[inset_0_0_60px_rgba(242,232,216,0.06)]">
          <p className="px-6 font-display text-3xl text-orange-50">{storyTitle}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.34em] text-stone-400">Voting table</p>
        </div>

        {users.slice(0, positions.length).map((user, index) => (
          <div
            key={user.id}
            className={`absolute ${positions[index]} flex min-w-28 flex-col items-center rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-center`}
          >
            <span className="text-sm font-medium text-stone-100">{user.name}</span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.24em] text-stone-500">{user.isHost ? 'Host' : user.id === currentUserId ? 'You' : 'Seat'}</span>
            <span className="mt-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-sm font-semibold text-stone-100">
              {isRevealed ? votes[user.id] ?? '-' : user.hasVoted ? '✓' : '·'}
            </span>
          </div>
        ))}

        {users.length === 0 ? (
          <div className="absolute inset-x-0 bottom-6 text-center text-sm text-stone-400">
            Join the room to claim the first seat and become host.
          </div>
        ) : null}
      </div>
    </section>
  )
}
