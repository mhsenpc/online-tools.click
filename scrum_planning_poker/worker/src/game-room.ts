import { DurableObject } from 'cloudflare:workers'
import { CLEANUP_WINDOW_MS, VOTE_VALUES, type GameState, type User, type VoteValue } from './types'

const STORAGE_KEY = 'game-state'
const MAX_NAME_LENGTH = 30
const MAX_STORY_LENGTH = 120
const MAX_MESSAGE_LENGTH = 1024
const MAX_USER_ID_LENGTH = 64
const RATE_LIMIT_WINDOW_MS = 1000
const RATE_LIMIT_MAX_MESSAGES = 30

interface ConnectionAttachment {
  userId: string
  messageCount: number
  windowStartedAt: number
}

type ClientMessage =
  | { type: 'join'; name: string }
  | { type: 'vote'; value: VoteValue }
  | { type: 'reveal' | 'reset' | 'ping' }
  | { type: 'setStory'; title: string }

export interface WorkerEnv {
  GAME_ROOM: DurableObjectNamespace<GameRoom>
}

export class GameRoom extends DurableObject<WorkerEnv> {
  private gameState: GameState | null = null

  constructor(ctx: DurableObjectState, env: WorkerEnv) {
    super(ctx, env)

    ctx.blockConcurrencyWhile(async () => {
      this.gameState = (await this.ctx.storage.get<GameState>(STORAGE_KEY)) ?? null
    })
  }

  async createRoom(roomId: string): Promise<boolean> {
    if (this.gameState) {
      return false
    }

    this.gameState = {
      id: roomId,
      hostId: '',
      storyTitle: 'Pick the next story',
      phase: 'voting',
      users: {},
      votes: {},
      createdAt: Date.now(),
    }

    await this.persistState()
    return true
  }

  async exists(): Promise<boolean> {
    return this.gameState !== null
  }

  async getState(): Promise<GameState | null> {
    return this.gameState
  }

  async fetch(request: Request): Promise<Response> {
    const upgradeHeader = request.headers.get('Upgrade')
    if (upgradeHeader !== 'websocket') {
      return new Response('Expected Upgrade: websocket', { status: 426 })
    }

    if (!this.gameState) {
      return new Response('Room not found', { status: 404 })
    }

    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')?.trim()
    if (!isValidUserId(userId)) {
      return new Response('Missing userId', { status: 400 })
    }

    const pair = new WebSocketPair()
    const [client, server] = Object.values(pair)

    this.ctx.acceptWebSocket(server)
    server.serializeAttachment({ userId, messageCount: 0, windowStartedAt: Date.now() } satisfies ConnectionAttachment)
    this.sendState(server)

    return new Response(null, {
      status: 101,
      webSocket: client,
    })
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    if (!this.gameState) {
      ws.send(JSON.stringify({ type: 'error', message: 'Room not found.' }))
      return
    }

    if (typeof message !== 'string') {
      this.sendError(ws, 'Only text messages are supported.')
      return
    }

    const connection = this.getConnection(ws)
    if (!connection) {
      this.sendError(ws, 'Connection metadata is missing.')
      return
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      this.sendError(ws, 'Message payload is too large.')
      return
    }

    if (this.isRateLimited(ws, connection)) {
      this.sendError(ws, 'Rate limit exceeded. Slow down and try again.')
      return
    }

    const clientMessage = parseClientMessage(message)
    if (!clientMessage) {
      this.sendError(ws, 'Invalid message payload.')
      return
    }

    switch (clientMessage.type) {
      case 'join': {
        const name = sanitizeText(clientMessage.name, MAX_NAME_LENGTH)
        if (!name) {
          this.sendError(ws, 'Enter a valid display name.')
          return
        }

        this.upsertUser(connection.userId, name)
        await this.persistState()
        this.broadcastState()
        return
      }

      case 'vote': {
        const user = this.gameState.users[connection.userId]
        if (!user) {
          this.sendError(ws, 'Join the room before voting.')
          return
        }

        if (this.gameState.phase !== 'voting') {
          this.sendError(ws, 'Votes are already revealed for this round.')
          return
        }

        this.gameState.votes[connection.userId] = clientMessage.value
        user.hasVoted = true
        await this.persistState()
        this.broadcastState()
        return
      }

      case 'reveal': {
        if (!this.isHost(connection.userId)) {
          this.sendError(ws, 'Only the host can reveal votes.')
          return
        }

        if (Object.keys(this.gameState.votes).length === 0) {
          this.sendError(ws, 'At least one vote is required before reveal.')
          return
        }

        this.gameState.phase = 'revealed'
        await this.persistState()
        this.broadcastState()
        return
      }

      case 'reset': {
        if (!this.isHost(connection.userId)) {
          this.sendError(ws, 'Only the host can reset the round.')
          return
        }

        this.gameState.phase = 'voting'
        this.gameState.votes = {}

        for (const user of Object.values(this.gameState.users)) {
          user.hasVoted = false
        }

        await this.persistState()
        this.broadcastState()
        return
      }

      case 'setStory': {
        if (!this.isHost(connection.userId)) {
          this.sendError(ws, 'Only the host can change the story title.')
          return
        }

        this.gameState.storyTitle = sanitizeText(clientMessage.title, MAX_STORY_LENGTH) || 'Pick the next story'
        await this.persistState()
        this.broadcastState()
        return
      }

      case 'ping': {
        this.sendState(ws)
        return
      }
    }
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    if (!this.gameState) {
      return
    }

    const connection = this.getConnection(ws)
    if (!connection) {
      return
    }

    const hasAnotherConnection = this.ctx.getWebSockets().some((socket) => {
      if (socket === ws) {
        return false
      }

      const socketConnection = this.getConnection(socket)
      return socketConnection?.userId === connection.userId
    })

    if (hasAnotherConnection) {
      return
    }

    if (!this.gameState.users[connection.userId]) {
      return
    }

    delete this.gameState.users[connection.userId]
    delete this.gameState.votes[connection.userId]

    if (this.gameState.hostId === connection.userId) {
      const nextHostId = Object.keys(this.gameState.users)[0] ?? ''
      this.gameState.hostId = nextHostId
    }

    this.syncUsers()
    await this.persistState()
    this.broadcastState()
  }

  async alarm(): Promise<void> {
    this.gameState = null
    await this.ctx.storage.deleteAll()
  }

  private upsertUser(userId: string, name: string) {
    if (!this.gameState) {
      return
    }

    if (!this.gameState.hostId) {
      this.gameState.hostId = userId
    }

    const existingUser = this.gameState.users[userId]
    const user: User = {
      id: userId,
      name,
      isHost: this.gameState.hostId === userId,
      hasVoted: Boolean(this.gameState.votes[userId]),
    }

    this.gameState.users[userId] = existingUser ? { ...existingUser, ...user } : user
    this.syncUsers()
  }

  private isHost(userId: string) {
    return this.gameState?.hostId === userId
  }

  private syncUsers() {
    if (!this.gameState) {
      return
    }

    for (const user of Object.values(this.gameState.users)) {
      user.isHost = user.id === this.gameState.hostId
      user.hasVoted = Boolean(this.gameState.votes[user.id])
    }
  }

  private getConnection(ws: WebSocket) {
    return ws.deserializeAttachment() as ConnectionAttachment | null
  }

  private isRateLimited(ws: WebSocket, connection: ConnectionAttachment) {
    const now = Date.now()

    if (now - connection.windowStartedAt >= RATE_LIMIT_WINDOW_MS) {
      connection.windowStartedAt = now
      connection.messageCount = 0
    }

    connection.messageCount += 1
    ws.serializeAttachment(connection)

    return connection.messageCount > RATE_LIMIT_MAX_MESSAGES
  }

  private sendState(ws: WebSocket) {
    if (!this.gameState) {
      return
    }

    ws.send(JSON.stringify({ type: 'state', state: this.gameState }))
  }

  private sendError(ws: WebSocket, message: string) {
    ws.send(JSON.stringify({ type: 'error', message }))
  }

  private broadcastState() {
    for (const socket of this.ctx.getWebSockets()) {
      this.sendState(socket)
    }
  }

  private async persistState() {
    if (!this.gameState) {
      return
    }

    await this.ctx.storage.put(STORAGE_KEY, this.gameState)
    await this.ctx.storage.setAlarm(Date.now() + CLEANUP_WINDOW_MS)
  }
}

function sanitizeText(value: string, maxLength: number) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

function isVoteValue(value: unknown): value is VoteValue {
  return typeof value === 'string' && VOTE_VALUES.includes(value as VoteValue)
}

function isValidUserId(value: string | undefined): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9-]+$/.test(value) && value.length > 0 && value.length <= MAX_USER_ID_LENGTH
}

function parseClientMessage(message: string): ClientMessage | null {
  let payload: unknown

  try {
    payload = JSON.parse(message)
  } catch {
    return null
  }

  if (!payload || typeof payload !== 'object' || !('type' in payload)) {
    return null
  }

  const candidate = payload as Record<string, unknown>
  if (candidate.type === 'join' && typeof candidate.name === 'string') {
    return { type: 'join', name: candidate.name }
  }

  if (candidate.type === 'vote' && isVoteValue(candidate.value)) {
    return { type: 'vote', value: candidate.value }
  }

  if ((candidate.type === 'reveal' || candidate.type === 'reset' || candidate.type === 'ping') && Object.keys(candidate).length === 1) {
    return { type: candidate.type }
  }

  if (candidate.type === 'setStory' && typeof candidate.title === 'string') {
    return { type: 'setStory', title: candidate.title }
  }

  return null
}
