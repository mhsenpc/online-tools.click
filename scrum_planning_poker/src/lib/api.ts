import type { GameState } from '../types/game'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? ''

function buildUrl(path: string) {
  return `${API_BASE_URL}${path}`
}

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function createGame() {
  const response = await fetch(buildUrl('/api/games'), { method: 'POST' })
  return readJson<{ gameId: string }>(response)
}

export async function getGame(gameId: string) {
  const response = await fetch(buildUrl(`/api/games/${gameId}`))
  return readJson<{ exists: boolean }>(response)
}

export async function getGameState(gameId: string) {
  const response = await fetch(buildUrl(`/api/games/${gameId}/state`))
  return readJson<{ state: GameState | null }>(response)
}
