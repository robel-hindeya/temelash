# Backend map

NestJS 11, Prisma 6, PostgreSQL. Global prefix `/api/v1`. Design notes per topic live in `docs/`.

## Modules (`src/modules/<name>/`)

| Module | Owns | Routes |
| --- | --- | --- |
| `memberships` | join page, enrollment, phone + PIN and Telegram card sign-in, web card, card reissue | `join/*`, `card/*`, `merchant/memberships/*` |
| `telegram` | Mini App initData verification, bot webhook (verified phone), bot command registry, Bot API client | `telegram/webhook` |
| `notifications` | Telegram messages (stamp, reward unlocked, expiry reminder), promotions, /stop opt-out | `merchant/promotions` |
| `customers` | customer records, consent, card PIN rules | `merchant/customers` |
| `stamps` | scan validation, stamping, cooldowns | `scanner/validate`, `scanner/stamps` |
| `redemptions` | reward lookup, redemption, reversals | `scanner/redemptions`, `merchant/.../reverse` |
| `rewards` | reward unlocks (no routes) | — |
| `loyalty-programs` | programs and reward definitions | `merchant/programs` |
| `merchants` | merchant profile, public directory, platform merchant admin | `merchant/profile`, `platform/merchants` |
| `branches`, `staff` | branches; staff, roles, invitations | `merchant/branches`, `merchant/staff`, `auth/invitations` |
| `auth` | login, tokens, permissions guard, password hashing | `auth/*`, `platform/users` |
| `platform-admin` | business applications (public form → approve creates the merchant + owner invitation, or reject), platform overview numbers | `merchant-applications`, `platform/overview`, `platform/applications/*` |
| `analytics`, `fraud`, `privacy`, `audit`, `audit-viewer` | reporting (overview includes stamps by day / weekday / hour), fraud flags, export/anonymise, audit log | `merchant/analytics`, `merchant/fraud`, `merchant/*` |
| `wallet`, `jobs`, `tenancy`, `health` | wallet passes, outbox worker, tenant scoping, health | `wallet/*`, `platform/outbox`, `health` |

Each module: `api/` (controllers + DTOs) → `application/` (services) → `domain/` (pure rules, `*.spec.ts`)
→ `infrastructure/` (repositories). Other modules import only from `index.ts` and application code
never imports `api/` (`src/architecture.spec.ts` enforces this). Shared code: `src/common/`
(errors, rate limiting in `http/app-throttler.guard.ts`, phone parsing), config in `src/config/env.schema.ts`.

## Telegram

Off unless `TELEGRAM_BOT_TOKEN` is set; then `TELEGRAM_WEBHOOK_SECRET` (16+ chars) is required, and
`TELEGRAM_MINI_APP_URL` gives the bot's "Open" button. Register the webhook with Telegram's `setWebhook`
(`url=<api>/api/v1/telegram/webhook`, `secret_token=<secret>`). `signInitData` (exported from the module)
builds valid initData for tests and local simulation.

Customer messages go through the outbox: the scanner queues `notify.card_event` (only when the bot
token is set), an hourly task queues the expiry scan, and promotions queue `notify.promotion` batches.
`notification_deliveries.key` makes every message at-most-once. Promotions: opted-in Telegram
customers only, one per merchant per 24 h, `{first name}` is filled in, `/stop` withdraws consent.

## Adding an endpoint

DTO + route in `api/*.controller.ts` (`@Public()` or `@Permissions('x:y')`), logic in an
`application/` service, queries in the repository, errors as `DomainError(code, message, status)`,
audit with `AuditService.record`. Schema change: edit `prisma/schema.prisma`, add
`prisma/migrations/<timestamp>_<name>/migration.sql`, run `npx prisma generate`.

## Tests

- Unit: `npx jest --selectProjects unit` (no database).
- E2E: needs Postgres and a gitignored `.env.test` pointing at a `*_test` database; then
  `node scripts/test-db.mjs deploy` and `npx jest --selectProjects e2e --runInBand <file>`.
- Config reads `.env.test` and then `.env`, so a real `TELEGRAM_BOT_TOKEN` in `.env` makes scanner,
  rewards, wallet and notification tests fail: run with `TELEGRAM_BOT_TOKEN= TELEGRAM_WEBHOOK_SECRET=`.
- Known: 20 e2e tests fail on `main`; 13 of them in `test/e2e/enrollment.e2e-spec.ts` fail on `main` because enrollment matches an
  existing customer by email and those tests reuse one email.
- Typecheck `npx tsc --noEmit -p tsconfig.json`; lint `npx eslint <paths>`.
