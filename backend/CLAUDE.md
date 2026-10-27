# Backend map

NestJS 11, Prisma 6, PostgreSQL. Global prefix `/api/v1`. Design notes per topic live in `docs/`.

## Modules (`src/modules/<name>/`)

| Module | Owns | Routes |
| --- | --- | --- |
| `memberships` | join page, enrollment, phone + PIN card sign-in, web card, card reissue | `join/*`, `card/*`, `merchant/memberships/*` |
| `customers` | customer records, consent, card PIN rules | `merchant/customers` |
| `stamps` | scan validation, stamping, cooldowns | `scanner/validate`, `scanner/stamps` |
| `redemptions` | reward lookup, redemption, reversals | `scanner/redemptions`, `merchant/.../reverse` |
| `rewards` | reward unlocks (no routes) | — |
| `loyalty-programs` | programs and reward definitions | `merchant/programs` |
| `merchants` | merchant profile, public directory, platform merchant admin | `merchant/profile`, `platform/merchants` |
| `branches`, `staff` | branches; staff, roles, invitations | `merchant/branches`, `merchant/staff`, `auth/invitations` |
| `auth` | login, tokens, permissions guard, password hashing | `auth/*`, `platform/users` |
| `analytics`, `fraud`, `privacy`, `audit`, `audit-viewer` | reporting, fraud flags, export/anonymise, audit log | `merchant/analytics`, `merchant/fraud`, `merchant/*` |
| `wallet`, `jobs`, `tenancy`, `health` | wallet passes, outbox worker, tenant scoping, health | `wallet/*`, `platform/outbox`, `health` |

Each module: `api/` (controllers + DTOs) → `application/` (services) → `domain/` (pure rules, `*.spec.ts`)
→ `infrastructure/` (repositories). Other modules import only from `index.ts` and application code
never imports `api/` (`src/architecture.spec.ts` enforces this). Shared code: `src/common/`
(errors, rate limiting in `http/app-throttler.guard.ts`, phone parsing), config in `src/config/env.schema.ts`.

## Adding an endpoint

DTO + route in `api/*.controller.ts` (`@Public()` or `@Permissions('x:y')`), logic in an
`application/` service, queries in the repository, errors as `DomainError(code, message, status)`,
audit with `AuditService.record`. Schema change: edit `prisma/schema.prisma`, add
`prisma/migrations/<timestamp>_<name>/migration.sql`, run `npx prisma generate`.

## Tests

- Unit: `npx jest --selectProjects unit` (no database).
- E2E: needs Postgres and a gitignored `.env.test` pointing at a `*_test` database; then
  `node scripts/test-db.mjs deploy` and `npx jest --selectProjects e2e --runInBand <file>`.
- Known: 13 tests in `test/e2e/enrollment.e2e-spec.ts` fail on `main` because enrollment matches an
  existing customer by email and those tests reuse one email.
- Typecheck `npx tsc --noEmit -p tsconfig.json`; lint `npx eslint <paths>`.
