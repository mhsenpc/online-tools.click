# Scrum Planning Poker

This tool provides a realtime scrum planning poker app with a React frontend and a Cloudflare Worker backend.

## Project Structure

- `src/`: frontend app
- `worker/`: Cloudflare Worker backend
- `planning_poker.md`: implementation notes and project status

## Frontend Local Development

```bash
npm install
npm run dev
```

The Vite dev server proxies `/api` and `/ws` requests to `http://127.0.0.1:8787`.

## Worker Setup

The Worker is deployed manually.

See `worker/README.md` for the Cloudflare dashboard setup, Durable Object binding values, migration settings, and frontend API base URL wiring.
