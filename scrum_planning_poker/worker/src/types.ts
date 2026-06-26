export const GAME_ID_LENGTH = 8
export const CLEANUP_WINDOW_MS = 24 * 60 * 60 * 1000
export const VOTE_VALUES = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'] as const

export type VoteValue = (typeof VOTE_VALUES)[number]
export type GamePhase = 'voting' | 'revealed'

export interface User {
  id: string
  name: string
  isHost: boolean
  hasVoted: boolean
}

export interface GameState {
  id: string
  hostId: string
  storyTitle: string
  phase: GamePhase
  users: Record<string, User>
  votes: Record<string, VoteValue>
  createdAt: number
}
