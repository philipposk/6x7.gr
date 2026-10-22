# 6x7 Admin Control Panel — Implementation Plan

> Written with superpowers:brainstorming → writing-plans; executed with executing-plans.
> Branch: `admin-panel`. Status/next steps live in `docs/admin-panel-HANDOFF.md`.

**Goal:** one private place (only the owner) to see every 6x7 app, who uses it, how it's doing, and the Sparks project board.

**Architecture:** `/admin` route inside this Next.js app (not a separate `admin.6x7.gr` app). All data is fetched
server-side (React Server Components + route handlers, `runtime = "nodejs"`), never shipped to the browser beyond
what the page renders for the authenticated owner.

**Tech:** Next 16 App Router, `@supabase/ssr` (existing login), `postgres` (read-only SQL to each Supabase DB),
Vercel REST API, Sparks interop v1.

## 1. Brainstorm outcome (decisions)

### Route vs separate app → `/admin` in 6x7.gr
- Login already exists here (`/login`, Google + magic link, cookie `sb-6x7-auth` on `.6x7.gr`); reusing it means no new
  OAuth app, no second deploy, no extra domain.
- The Sparks interop contract authenticates with the *same* Supabase access token, so the panel can call Sparks as the
  owner with zero extra secrets.
- Risk: the repo is public and the site is public. Mitigated by: every admin page/handler calls `requireAdmin()`
  server-side (allowlist from env `ADMIN_EMAILS`, verified email required), `/admin` is `noindex` + disallowed in
  robots, and all credentials are server-only env vars. If the panel ever needs write access to prod DBs or grows big,
  split to `admin.6x7.gr` — the code is self-contained under `src/app/admin` + `src/lib/admin` to make that a move.

### Data access
Exploration (read-only, aggregates only) found:
- Supabase project **6x7** holds most apps: one shared `auth.users` (~537 users, mostly `atomicmail.io`
  throwaways, plus `test.local`, `commitr.demo`, `demo.greenpert.local`, real gmail/hotmail/etc), ~130 tables with a
  `user_id` column spread across schemas (`greenpert`, `recall`, `sparks`, `babi_english`, `paperassistant`, …) and
  prefixed tables in `public` (`commitr_*`, `topia_*`, `now_*`, `samos_*`, `skinscan_*`, `transcriber_*`, …).
  `public.app_access` exists but is almost unused → we **derive** "which apps a user used" from table rows.
- Supabase project **daybook** has its own auth (9 users).
- Other Supabase projects are paused (INACTIVE) — shown as such, not queried.

So "users × apps" is computed by: discover every table with `user_id uuid` (information_schema), map table → app via
schema name or table prefix (config), `select user_id, min/max(created_at)` per table, union. Done with a direct
**read-only Postgres connection** (`ADMIN_DB_URL_<PROJECT>`), because PostgREST can't introspect or union across schemas.
Recommended: a dedicated read-only Postgres role (SQL in HANDOFF), not the service role.

### Test/throwaway classification (heuristic, configurable)
`throwaway` = disposable domains (atomicmail.io, mailinator, …) ; `test` = `*.local`, `*.demo`, `example.*`,
`+test`, `is_demo` metadata ; `owner` = in ADMIN_EMAILS ; else `real`. Shown as a filter; "non-atomic" = everything but
throwaway.

## 2. Sections (v1)
1. **Overview** — totals: users (real/test/throwaway), signups 7d/30d, active 30d, apps live/down, last deploys.
2. **Users** — cross-app directory: email, class, apps used, first/last seen, provider. Filter by class / app, search.
   Click → user detail (apps + per-table row counts).
3. **Apps** — per app: users, signups by week (sparkline), last activity, live URL uptime (HEAD, ms), Vercel last
   deploy state.
4. **Deploys** — latest Vercel deployments across projects, failures highlighted.
5. **Sparks** — projects from `sparks.6x7.gr/api/interop/v1/projects`; "send note" form → `POST /notes` (two-way: write
   ideas into Sparks from the panel).
6. **Contact** — contact-form submissions. Today they are only emailed (Resend); plan adds an optional insert into
   `public.contact_messages` (migration file in `docs/sql/`, NOT applied without approval).
7. **Health** — Supabase project status, error-log tables (`*_error_log`, `*_health_runs`) recent counts.

Later: cost/usage (Stripe MRR via Stripe API key), Supabase advisors, uptime history (cron), app_access backfill.

## 3. File structure
- `src/lib/admin/auth.ts` — `requireAdmin()`; reads `ADMIN_EMAILS`.
- `src/lib/admin/config.ts` — app registry: Supabase project → schema/prefix → app slug, plus live URLs from `src/data/projects.ts`.
- `src/lib/admin/classify.ts` — email classification (pure, unit-tested).
- `src/lib/admin/db.ts` — lazy `postgres` clients per project from env.
- `src/lib/admin/users.ts` — directory + per-app usage queries.
- `src/lib/admin/vercel.ts`, `uptime.ts`, `sparks.ts` — adapters, each returns `{ok:false, reason}` when unconfigured.
- `src/app/admin/layout.tsx` (+ nav, guard), `page.tsx`, `users/`, `apps/`, `deploys/`, `sparks/`, `health/`, `contact/`.
- `src/app/admin/sparks/actions.ts` — server action to post a note.

## 4. Tasks
1. Plan + handoff docs (this). Commit.
2. Auth guard + layout + robots/noindex. Test: non-admin redirected. Commit.
3. classify.ts + node:test unit tests. Commit.
4. db.ts + users.ts + Users page + Overview. Verify SQL against real DB via MCP. Commit.
5. Apps page (+ uptime). Commit.
6. Vercel adapter + Deploys page. Commit.
7. Sparks adapter + page + send-note action. Commit.
8. Health + Contact (+ migration SQL file). Commit.
9. `pnpm build` + lint green; update HANDOFF. Open PR (draft), do not merge.

## 5. Adapter contract (per app)
```ts
type AppAdapter = { slug: string; name: string; project: "6x7" | "daybook"; match: { schema?: string; prefix?: string }; live?: string; vercelProject?: string }
```
Adding an app = one entry in `config.ts`. Unknown schemas/prefixes show up under "unmapped" so nothing is hidden.
