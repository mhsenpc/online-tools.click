import { Sparkles } from 'lucide-react'

interface HostControlsProps {
  storyTitle: string
  onStoryTitleChange: (value: string) => void
  canManage: boolean
  canReveal: boolean
  canReset: boolean
  onReveal: () => void
  onReset: () => void
  onSyncStory: () => void
}

export default function HostControls({
  storyTitle,
  onStoryTitleChange,
  canManage,
  canReveal,
  canReset,
  onReveal,
  onReset,
  onSyncStory,
}: HostControlsProps) {
  const buttonClassName = canManage
    ? 'rounded-2xl border border-orange-200/20 bg-orange-200/10 px-4 py-3 text-sm text-orange-100 transition hover:bg-orange-200/18'
    : 'rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-400'

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full border border-orange-200/20 bg-orange-200/10 p-2 text-orange-100">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-stone-400">Host console</p>
          <h2 className="text-lg font-semibold text-stone-100">Round controls</h2>
        </div>
      </div>

      <label className="mb-4 block text-sm text-stone-300">
        Story title
        <input
          value={storyTitle}
          onChange={(event) => onStoryTitleChange(event.target.value)}
          disabled={!canManage}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-orange-200/40"
          placeholder="Prepare the next story"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <button type="button" disabled={!canReveal} onClick={onReveal} className={buttonClassName}>
          Reveal votes
        </button>
        <button type="button" disabled={!canReset} onClick={onReset} className={buttonClassName}>
          Reset round
        </button>
        <button type="button" disabled={!canManage} onClick={onSyncStory} className={buttonClassName}>
          Sync story
        </button>
      </div>
    </section>
  )
}
