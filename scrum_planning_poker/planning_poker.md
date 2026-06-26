# Scrum Planning Poker

Real-time browser-based planning poker: create room → share URL → vote on estimates (no auth needed).

**Frontend:** `online-tools.click/scrum_planning_poker` (Cloudflare Pages)  
**Backend:** WebSocket API (Cloudflare Workers + Durable Objects)

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + TypeScript, Vite, TailwindCSS, Zustand, Router v6 |
| Backend | Cloudflare Workers, Durable Objects (Storage + WebSocket Hibernation) |
| Deploy | Wrangler CLI, Cloudflare Pages |
| Package | npm |

## 📁 Directory Structure

```
scrum/
├── package.json                  # Frontend (React)
├── vite.config.ts
├── tsconfig.json
├── index.html
├── .nvmrc
├── public/
│   ├── _redirects
│   └── favicon.svg
├── src/                          # React app source
│   ├── main.tsx
│   ├── App.tsx
│   ├── vite-env.d.ts
│   ├── pages/
│   │   ├── Home.tsx              # Landing: create game
│   │   └── Game.tsx              # Main game room
│   ├── components/
│   │   ├── Card.tsx              # Voting card
│   │   ├── Table.tsx             # Circular participant layout
│   │   ├── ParticipantList.tsx
│   │   ├── HostControls.tsx      # Reveal, Reset, Set Story
│   │   ├── InviteButton.tsx
│   │   └── Toast.tsx
│   ├── hooks/
│   │   ├── useWebSocket.ts       # WS connection + auto-reconnect
│   │   └── useGameState.ts       # State sync
│   ├── store/
│   │   └── gameStore.ts          # Zustand store
│   ├── types/
│   │   └── game.ts               # Shared TS types
│   ├── lib/
│   │   ├── api.ts                # HTTP calls to worker
│   │   └── identity.ts           # userId localStorage helper
│   └── styles/
│       └── globals.css
│
└── worker/                       # Cloudflare Worker backend
    ├── package.json
    ├── README.md               # Manual Cloudflare Worker setup
    ├── tsconfig.json
    ├── worker-configuration.d.ts
    └── src/
        ├── index.ts              # Main worker entry (router)
        ├── game-room.ts          # GameRoom Durable Object
        └── types.ts              # Shared types
```

---

## Features (MVP)

- **Create room** → unique shareable URL (8-char nanoid)
- **Join** by entering name (no auth)
- **Host** controls: reveal votes, reset round, set story title
- **Voters** select from Fibonacci deck: `0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, ☕`
- **Live updates:** join/leave, vote indicators (hidden until reveal)
- **Reveal:** show all votes + average
- **Auto-reconnect** on disconnect (exponential backoff)

## WebSocket Messages

**Client → Server:**
```typescript
type ClientMsg = 
  | { type: 'join'; name: string }
  | { type: 'vote'; value: string }
  | { type: 'reveal' | 'reset' | 'ping' }
  | { type: 'setStory'; title: string };
```

**Server → Client:**
```typescript
type ServerMsg =
  | { type: 'state'; state: GameState }
  | { type: 'error'; message: string };
```

Current implementation note: the server currently broadcasts canonical `state` snapshots after join/leave/vote/reveal/reset/story updates instead of granular event messages.

## Data Model

```typescript
interface GameState {
  id: string;                      // 8-char nanoid
  hostId: string;
  storyTitle: string;
  phase: 'voting' | 'revealed';
  users: Record<string, User>;
  votes: Record<string, string>;   // userId → value
  createdAt: number;
}

interface User {
  id: string;                      // UUID from localStorage
  name: string;
  isHost: boolean;
  hasVoted: boolean;
}
```

## API Endpoints

| Method | Path | Response |
|--------|------|----------|
| `POST` | `/api/games` | `{ gameId: string }` |
| `GET` | `/api/games/:id` | `{ exists: boolean }` |
| `GET` | `/api/games/:id/state` | `{ state: GameState | null }` |
| `GET` | `/ws/:gameId` | WebSocket upgrade |

## Persistence & Cleanup

- **Storage:** Durable Object Storage API (transactional KV)
- **Auto-cleanup:** Alarm scheduled 24h after last activity → delete all data
- **Reschedule:** Restart alarm on every state change

## Implementation Phases

**Phase 1: Foundation**
- [x] Monorepo setup: React + Vite + Tailwind
- [x] Workers project + manual setup guide
- [x] GameRoom DO skeleton
- [x] POST/GET `/api/games` endpoints
- [x] Routes: `/` (home), `/game/:id`
- [x] Landing page + "Create Game" button

**Phase 2: Real-time**
- [x] WebSocket handler (Hibernation API)
- [x] useWebSocket hook (auto-reconnect, exponential backoff)
- [x] Join flow: name entry → connect
- [x] Broadcast state updates for join/leave/vote/reveal/reset/story changes
- [x] Persist state on every change

**Phase 3: Voting**
- [x] Card deck UI (Fibonacci fixed)
- [x] Cast vote → broadcast updated room state
- [x] Host reveal action
- [x] Display votes + calculate average
- [x] Reset round

**Phase 4: Polish**
- [x] Copy invite link + toast
- [x] Mobile responsive layout
- [x] 24h auto-cleanup alarm
- [x] Error handling
- [ ] Deploy

## Current Status

- Implemented: room creation, room existence/state APIs, WebSocket join flow, host assignment, live voting, reveal/reset, story sync, reconnect handling, mobile layout, invite copy, toast feedback, 24h cleanup alarm, and WS rate limiting.
- Remaining before launch: deployment wiring, smoke testing in a deployed environment, and any final UX tweaks.

## Future Implementation (Post-MVP)

**Features:** Multiple decks (T-Shirt, Powers of 2, custom), spectator mode, host controls (kick, transfer), story queue, voting history, round timer, voting stats (agreement %, distribution)

**UX:** Dark mode, animations, emoji reactions, export to CSV

**Analytics:** Plausible integration, performance tracking, error tracking (Sentry)

**Advanced:** Host auto-transfer, rate limiting, custom domains, session persistence

Implemented so far: host auto-transfer on disconnect and WebSocket rate limiting.

## Design Decisions (MVP)

- **First joiner → Host** (auto-promoted)
- **Host controls:** Reveal, reset, set story title (no kick/transfer)
- **Reconnect:** Exponential backoff 1s → 2s → 4s → 8s (max 30s)
- **Identity:** UUID from `localStorage`, persists across sessions
- **Game ID:** 8-char nanoid (e.g., `xK7mP2qR`)
- **Validation:** Server-side checks; sanitize names (30 chars, strip HTML)
- **Rate limit:** 30 WS messages/sec per connection
- **Cleanup:** 24h inactivity alarm → delete game state

## Costs & Pre-Launch

**Cloudflare Pricing:**
- Workers: Free (100k req/day)
- Durable Objects: $0.15M requests + storage
- Pages: Free
- Expected: ~$0–5/month (low traffic)

**Before start:**
- [x] Package manager: npm
- [x] Node version (.nvmrc)
- [ ] Cloudflare account + API tokens
- [ ] DNS setup
- [x] UI color palette

---

**References:** [DO Docs](https://developers.cloudflare.com/durable-objects/) | [WS Hibernation](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api) | [Pages](https://developers.cloudflare.com/pages/) | [Inspiration](https://planningpokeronline.com/)
