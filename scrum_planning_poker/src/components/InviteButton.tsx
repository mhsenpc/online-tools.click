import { useState } from 'react'
import { Link2 } from 'lucide-react'

interface InviteButtonProps {
  url: string
  onCopied?: () => void
  onError?: (message: string) => void
}

export default function InviteButton({ url, onCopied, onError }: InviteButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      onCopied?.()
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      onError?.('The invite link could not be copied.')
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      className="inline-flex items-center gap-2 rounded-full border border-orange-200/30 bg-orange-200/12 px-4 py-2 text-sm font-medium text-orange-100 transition hover:bg-orange-200/20"
    >
      <Link2 className="h-4 w-4" />
      {copied ? 'Invite copied' : 'Copy invite link'}
    </button>
  )
}
