import type { User, VoteValue } from '../types/game'

interface ParticipantListProps {
  users: User[]
  currentUserId?: string
  isRevealed?: boolean
  votes?: Record<string, VoteValue>
}

export default function ParticipantList({ users, currentUserId, isRevealed = false, votes = {} }: ParticipantListProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-stone-400">Participants</p>
          <h2 className="mt-1 text-lg font-semibold text-stone-100">Table roster</h2>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone-300">
          {users.length} seated
        </span>
      </div>

      <div className="space-y-3">
        {users.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-stone-400">
            Join the room to claim the first seat at the table.
          </p>
        ) : null}

        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
            <div>
              <p className="font-medium text-stone-100">
                {user.name}
                {user.id === currentUserId ? <span className="ml-2 text-xs uppercase tracking-[0.2em] text-orange-200">You</span> : null}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                {user.isHost ? 'Host' : 'Player'}
              </p>
            </div>
            <span className="text-xs text-stone-300">
              {isRevealed && votes[user.id] ? votes[user.id] : user.hasVoted ? 'Voted' : 'Waiting'}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
