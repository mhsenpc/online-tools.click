import { GameRoom, type WorkerEnv } from './game-room'
import { GAME_ID_LENGTH, type GameState } from './types'

const GAME_ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

function isValidGameId(value: string) {
  return new RegExp(`^[A-Za-z0-9]{${GAME_ID_LENGTH}}$`).test(value)
}

function generateGameId() {
  const bytes = new Uint8Array(GAME_ID_LENGTH)
  crypto.getRandomValues(bytes)

  return Array.from(bytes, (byte) => GAME_ID_ALPHABET[byte % GAME_ID_ALPHABET.length]).join('')
}

function getGameRoomStub(env: WorkerEnv, roomId: string) {
  return env.GAME_ROOM.getByName(roomId)
}

async function createUniqueRoom(env: WorkerEnv) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const roomId = generateGameId()
    const created = await getGameRoomStub(env, roomId).createRoom(roomId)

    if (created) {
      return roomId
    }
  }

  throw new Error('Unable to allocate a unique room id after several attempts.')
}

async function getRoomState(env: WorkerEnv, roomId: string): Promise<GameState | null> {
  return getGameRoomStub(env, roomId).getState()
}

export { GameRoom }

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url)

    try {
      if (request.method === 'POST' && url.pathname === '/api/games') {
        const gameId = await createUniqueRoom(env)
        return json({ gameId }, 201)
      }

      const gameMatch = url.pathname.match(/^\/api\/games\/([A-Za-z0-9]{8})$/)
      if (request.method === 'GET' && gameMatch) {
        const roomId = gameMatch[1]
        return json({ exists: await getGameRoomStub(env, roomId).exists() })
      }

      const stateMatch = url.pathname.match(/^\/api\/games\/([A-Za-z0-9]{8})\/state$/)
      if (request.method === 'GET' && stateMatch) {
        const roomId = stateMatch[1]
        return json({ state: await getRoomState(env, roomId) })
      }

      const wsMatch = url.pathname.match(/^\/ws\/([A-Za-z0-9]{8})$/)
      if (request.method === 'GET' && wsMatch) {
        const roomId = wsMatch[1]

        if (!isValidGameId(roomId)) {
          return json({ message: 'Invalid game id.' }, 400)
        }

        return getGameRoomStub(env, roomId).fetch(request)
      }

      return json({ message: 'Not found.' }, 404)
    } catch (error) {
      console.error(
        JSON.stringify({
          message: 'scrum planning poker request failed',
          path: url.pathname,
          error: error instanceof Error ? error.message : String(error),
        }),
      )

      return json({ message: 'Internal server error.' }, 500)
    }
  },
} satisfies ExportedHandler<WorkerEnv>
