import { useEffect, useRef, useState } from 'react'

type ConnectionStatus = 'idle' | 'connecting' | 'open' | 'closed' | 'error'

interface UseWebSocketOptions {
  enabled?: boolean
  onMessage?: (event: MessageEvent<string>) => void
  onOpen?: () => void
  onClose?: () => void
}

export function useWebSocket(url: string | null, options: UseWebSocketOptions = {}) {
  const { enabled = true, onMessage, onOpen, onClose } = options
  const [status, setStatus] = useState<ConnectionStatus>('idle')
  const socketRef = useRef<WebSocket | null>(null)
  const reconnectTimerRef = useRef<number | null>(null)
  const attemptRef = useRef(0)
  const onMessageRef = useRef(onMessage)
  const onOpenRef = useRef(onOpen)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onMessageRef.current = onMessage
    onOpenRef.current = onOpen
    onCloseRef.current = onClose
  }, [onClose, onMessage, onOpen])

  useEffect(() => {
    if (!enabled || !url) {
      setStatus('idle')
      return
    }

    let active = true

    const connect = () => {
      setStatus('connecting')

      const socket = new WebSocket(url)
      socketRef.current = socket

      socket.addEventListener('open', () => {
        if (!active) {
          socket.close()
          return
        }

        attemptRef.current = 0
        setStatus('open')
        onOpenRef.current?.()
      })

      socket.addEventListener('message', (event) => {
        onMessageRef.current?.(event as MessageEvent<string>)
      })

      socket.addEventListener('close', () => {
        if (!active) {
          return
        }

        setStatus('closed')
        onCloseRef.current?.()

        const delay = Math.min(1000 * 2 ** attemptRef.current, 30000)
        attemptRef.current += 1
        reconnectTimerRef.current = window.setTimeout(connect, delay)
      })

      socket.addEventListener('error', () => {
        setStatus('error')
      })
    }

    connect()

    return () => {
      active = false

      if (reconnectTimerRef.current !== null) {
        window.clearTimeout(reconnectTimerRef.current)
      }

      socketRef.current?.close()
      socketRef.current = null
    }
  }, [enabled, url])

  return {
    status,
    send: (payload: string) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(payload)
        return true
      }

      return false
    },
  }
}
