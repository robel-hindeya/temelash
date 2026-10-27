# Temelash Card

Digital loyalty stamp cards for shops in Ethiopia. `frontend/` is Next.js 16 (JavaScript, App Router);
`backend/` is NestJS 11 + Prisma + PostgreSQL. The frontend reaches the backend only through `/api/v1`
(proxied to `TC_API_BASE_URL`); all real data lives in the backend.

## How to find code (read this before opening files)

Narrow down in order: area → folder → file → symbol. Open the area map first (`frontend/CLAUDE.md`,
`backend/CLAUDE.md`), then `Grep` for the symbol or visible text and `Read` with `offset`/`limit`.
Do not read whole folders or whole screen files; screen markup lives in separate `*.view.jsx` files.

| To change… | Frontend | Backend module |
| --- | --- | --- |
| Customer card, landing page, join, PIN sign-in | `components/screens/customer/` | `memberships` |
| Telegram Mini App (sign-in, shared phone, bot) | `screens/customer/TelegramEntry.jsx`, `lib/api/telegram.js` | `telegram`, `memberships` |
| Staff scanner, stamping, redeeming, staff onboarding | `components/screens/staff/` | `stamps`, `redemptions`, `staff` |
| Merchant dashboard (card design, rewards, customers, staff, branches, analytics) | `components/screens/merchant/` | `merchants`, `loyalty-programs`, `customers`, `branches`, `staff`, `analytics` |
| Platform admin | `components/screens/admin/` | `merchants` (platform), `audit-viewer`, `jobs` |
| Home page | `components/screens/marketing/` | — |
| Sign-in, roles, route guards | `lib/api/staff-session.js`, `components/AuthGuard.jsx` | `auth` |
| Any backend call from the UI | `lib/api/endpoints/<area>.js` | — |
| Database tables | — | `prisma/schema.prisma` + a new migration |

## Run locally

- Postgres (no Docker): `cd backend && PGPORT=5433 node scripts/local-postgres.mjs`
- Backend: `backend/.env` (gitignored) sets `PORT=3100`, `DATABASE_URL=…127.0.0.1:5433/temelashcard`,
  `JWT_ACCESS_SECRET`, `WALLET_BARCODE_SECRET`. Then `npx prisma migrate deploy`, `npx prisma db seed`
  (test logins in `backend/.seed-output.json`), `npx nest start`.
- Frontend: `cd frontend && TC_API_BASE_URL=http://localhost:3100/api/v1 npx next dev -p 3011`
  (port 3001 is often taken on this machine).

## Rules

- Never keep server data in `localStorage` or add mock `/api/v1` routes in the frontend.
- Production build must pass `node frontend/scripts/check-bundle.mjs` (no demo credentials in bundles).
- `core.autocrlf=true`: files are CRLF on disk; scripts that match text must normalise `\r\n` first.
- Commit messages end with the co-author line given by the session.
