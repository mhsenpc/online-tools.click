# Scrum Poker Worker Setup

This directory contains the Cloudflare Worker backend for `scrum_planning_poker`.

The worker is intended to be created and deployed manually in the Cloudflare dashboard, so this project does not keep a `wrangler.toml` file in source control.

## Files In This Directory

- `src/index.ts`: main Worker entrypoint and HTTP/WebSocket router.
- `src/game-room.ts`: `GameRoom` Durable Object implementation.
- `src/types.ts`: shared worker-side types and constants.
- `tsconfig.json`: TypeScript config for the worker sources.
- `worker-configuration.d.ts`: checked-in Cloudflare runtime types used by TypeScript.
- `package.json`: local dependency and typecheck script.

## Cloudflare Dashboard Setup

Create a new Worker manually and configure it with the values below.

1. Create a Worker.
2. Set the entrypoint module to `src/index.ts` from this folder.
3. Add the other source files from this folder as modules:
   - `src/game-room.ts`
   - `src/types.ts`
4. In compatibility settings:
   - Compatibility date: `2026-06-26`
   - Compatibility flag: `nodejs_compat`
5. In bindings, add a Durable Object binding:
   - Binding name: `GAME_ROOM`
   - Class name: `GameRoom`
6. In Durable Object migrations, create the initial migration:
   - Tag: `v1`
   - New SQLite class: `GameRoom`
7. Deploy the Worker.

Recommended Worker name: `scrum-planning-poker-api`

## Frontend Wiring

The frontend calls the Worker through `VITE_API_BASE_URL`.

If the Worker is on its own domain or route, set:

```bash
VITE_API_BASE_URL=https://your-worker-url.example.com
```

If the frontend and Worker are served from the same host, `VITE_API_BASE_URL` can stay empty and the app will use relative `/api/...` and `/ws/...` paths.

## Local Checks

Install dependencies and run the worker typecheck locally:

```bash
npm install
npm run build
```

## Smoke Test Checklist

After deployment, verify these routes against the Worker URL:

- `POST /api/games` returns `201` with a `gameId`
- `GET /api/games/:id` returns `{ "exists": true }` for a newly created room
- `GET /api/games/:id/state` returns a room state payload
- `GET /ws/:id?userId=...` upgrades to WebSocket successfully

## Notes

- The frontend dev server proxies `/api` and `/ws` to `http://127.0.0.1:8787`, which matches a typical local Worker dev port if you choose to run one separately.
- `worker-configuration.d.ts` exists only for editor and TypeScript support; it is not a deployment artifact.
