import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { clsx } from 'clsx'

interface ToastProps {
  kind: 'success' | 'error' | 'info'
  message: string
}

export default function Toast({ kind, message }: ToastProps) {
  const icon = kind === 'success' ? CheckCircle2 : kind === 'error' ? AlertCircle : Info
  const Icon = icon

  return (
    <div
      className={clsx(
        'fixed bottom-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-3xl border px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl',
        kind === 'success' && 'border-emerald-200/20 bg-emerald-300/12 text-emerald-50',
        kind === 'error' && 'border-rose-200/20 bg-rose-300/12 text-rose-50',
        kind === 'info' && 'border-orange-200/20 bg-slate-950/85 text-stone-100',
      )}
      role="status"
      aria-live="polite"
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="text-sm leading-6">{message}</p>
    </div>
  )
}
