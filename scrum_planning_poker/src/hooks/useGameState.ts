import { useGameStore } from '../store/gameStore'

export function useGameState() {
  return useGameStore((state) => ({
    gameState: state.gameState,
    session: state.session,
    setGameState: state.setGameState,
    setSession: state.setSession,
  }))
}
