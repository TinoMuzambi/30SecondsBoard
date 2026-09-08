# 30 Seconds Board

A local-first team scorekeeper and round timer for playing the 30 Seconds party game. Bring your own cards, create two to six teams, and track progress around a responsive shared board.

**Live app:** [30-seconds-board.vercel.app](https://30-seconds-board.vercel.app)

## Highlights

- Accessible 30-second start, pause, resume, and reset controls
- Two to six custom teams with colour-coded tokens
- Responsive 35-space game track and live rankings
- Safe local-storage persistence with corrupt-data recovery
- No accounts, backend, analytics, or remote image dependencies

## Develop

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

## Verify

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
```

This is an unofficial scorekeeping companion and is not affiliated with the publishers of 30 Seconds.
