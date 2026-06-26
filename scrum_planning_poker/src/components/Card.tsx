import { clsx } from 'clsx'

interface CardProps {
  label: string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

export default function Card({ label, active = false, disabled = false, onClick }: CardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'group relative flex h-20 w-14 items-center justify-center rounded-[1.35rem] border text-xl font-semibold shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition duration-200 sm:h-24 sm:w-16',
        active
          ? 'border-orange-300 bg-orange-200 text-slate-950'
          : 'border-white/12 bg-white/8 text-stone-100 hover:-translate-y-1 hover:border-orange-200/60 hover:bg-white/12',
        disabled && 'cursor-not-allowed opacity-80',
      )}
    >
      <span className="absolute inset-x-3 top-3 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <span>{label}</span>
    </button>
  )
}
