export const VOTING_VALUES = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'] as const

export type VoteValue = (typeof VOTING_VALUES)[number]
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

export interface LocalSession {
  userId: string
  name: string
  gameId: string
}

export interface RevealedVote {
  userId: string
  value: VoteValue
}

export type ClientMsg =
  | { type: 'join'; name: string }
  | { type: 'vote'; value: VoteValue }
  | { type: 'reveal' | 'reset' | 'ping' }
  | { type: 'setStory'; title: string }

export type ServerMsg =
  | { type: 'state'; state: GameState }
  | { type: 'userJoined' | 'userLeft'; user?: User; userId?: string }
  | { type: 'userVoted'; userId: string }
  | { type: 'revealed'; votes: RevealedVote[]; average: number | null }
  | { type: 'storyChanged'; title: string }
  | { type: 'error'; message: string }
