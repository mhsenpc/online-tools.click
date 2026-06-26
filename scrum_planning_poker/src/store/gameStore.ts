import { create } from 'zustand'
import type { GameState, LocalSession } from '../types/game'

interface GameStore {
  gameState: GameState | null
  session: LocalSession | null
  setGameState: (gameState: GameState | null) => void
  setSession: (session: LocalSession | null) => void
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: null,
  session: null,
  setGameState: (gameState) => set({ gameState }),
  setSession: (session) => set({ session }),
}))
