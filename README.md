# JobPilot (frontend)

Next.js app for JobPilot: authentication flows, job listing, and creating jobs. It talks to a separate API server using cookie-based credentials (`credentials: "include"`) and automatic refresh via `POST /users/refresh` when requests return 401.

## Stack

- **Next.js** 16 (App Router)
- **React** 19
- **Tailwind CSS** 4
- **ESLint** (`eslint-config-next`)

## Prerequisites

- Node.js (LTS recommended)
- Backend running and reachable. By default the app uses `http://localhost:8000`. Override with `NEXT_PUBLIC_API_URL` (see `src/lib/api-base.js`). Production builds read `.env.production`.

## Setup

```bash
npm install
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Dev server (default port 3000) |
| `npm run build` | Production build        |
| `npm run start` | Serve production build  |
| `npm run lint`  | Run ESLint              |

Open [http://localhost:3000](http://localhost:3000) after starting the dev server.

## App routes (high level)

- **`/`** — Home
- **`/login`**, **`/register`**, **`/forgot-password`**, **`/reset-password`**, **`/verify`** — Auth
- **`/jobs`** — Jobs list
- **`/create-job`** — Create a job

Shared UI includes the navbar, forms, and a `CurrentUserProvider` for session-aware behavior (`src/lib/current-user-context.js`).

## Configuration

- **`next.config.mjs`** — Next.js config (e.g. React Compiler enabled)

Set `NEXT_PUBLIC_API_URL` (no trailing slash), for example in `.env.local` for development or `.env.production` for releases. All API calls go through `apiUrl()` from `src/lib/api-base.js`.

## Deploy

You can deploy like any Next.js app (for example [Vercel](https://vercel.com/docs/frameworks/nextjs)). Ensure the production API origin supports cross-origin cookies or adjust auth to match your hosting setup.
