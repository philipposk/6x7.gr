# Admin panel — HANDOFF

Branch `admin-panel` (not merged, not deployed). Plan: `docs/admin-panel-plan.md`.
Pick up from any tool: `git checkout admin-panel && pnpm i && pnpm test && pnpm dev` → http://localhost:3000/admin

## Status (2026-10-20)
- [x] Plan (`docs/admin-panel-plan.md`)
- [x] `/admin` guard: `src/lib/admin/auth.ts` → `requireAdmin()` in layout, every page that loads data, and the server action. Allowlist = env `ADMIN_EMAILS`, email must be verified. `/admin` is noindex + robots-disallowed.
- [x] Login keeps `?next=/admin`; `/auth/callback` now rejects off-site `next` (open-redirect fix).
- [x] Email classifier (`classify.ts`) owner / real / test / throwaway + unit tests (`pnpm test`).
- [x] Users directory (`/admin/users`): every auth user of the 6x7 + daybook Supabase projects, class, provider, apps used (derived from rows in ~130 `user_id` tables, mapped via `src/lib/admin/config.ts`), first/last activity per app, signup + last sign-in. Filters: class (default "non-throwaway" = the "non-atomic" ones), app, search.
- [x] Overview (`/admin`): counts, signups/week, latest real users, deploy failures, unmapped tables.
- [x] Apps (`/admin/apps`): every app (DB adapters + all live sites in `src/data/projects.ts`), live probe status/latency, users/real/active-30d, weekly new users, last Vercel deploy.
- [x] Deploys (`/admin/deploys`): latest 100 Vercel deployments, failures highlighted.
- [x] Sparks (`/admin/sparks`): projects via Sparks interop v1 (`GET /api/interop/v1/projects`, owner's own session token, no extra secret) + "Send to Sparks" form (`POST /api/interop/v1/notes`, source_app `6x7-admin`, idempotent external_id).
- [x] Health (`/admin/health`): Supabase project status (optional token) + 24h/7d counts of `*error_log*`, `*health_runs*`, `*source_runs*`, `*webhook_events*` tables.
- [x] Contact (`/admin/contact`): reads `public.contact_messages` once it exists. Contact API stores into it only if `SUPABASE_SERVICE_ROLE_KEY` is set.
- [x] `next build` + eslint on new code green.

Verified with real data: the users×apps SQL (`src/lib/admin/usage-sql.ts`) was run read-only against the prod 6x7 DB (via Supabase MCP, counts only) — works; 12 apps have user rows. Sparks interop endpoints are live (manifest 200, projects 401 without token = correct).
Not yet verified end-to-end in a browser with real env (needs env vars below).

## Signup source (2026-10-20 PM)
- Each app's middleware/proxy now upserts `public.app_access(user_id, app, last_seen)` for the signed-in user (helper `app-access.ts`, throttled by a 6h host-only cookie `x6_seen_<app>`, 1.5s cap, never throws). Uses the EXISTING table + RLS → no migration needed.
- Branch `signup-source` (not merged/deployed) in: sparks, recall, greenpert, babi-english, translator, catchy, topia, samos-companion, eventnow, CommitR, skinscan, psycscope, Digestive-Diary, LifeHub, postbox, 6x7-demo-platform, app-factory, shipyard-pilot.
- Not covered (no Supabase middleware): PaperAssistant, riffscribe, smoking-app, valuer-todo, tiny-erp-todo, TimeGift, appmaker-studio, BeenThere, JournalApp; templates 6x7-app-factory/template and shipyard/template.
- Panel: "Came from" column + filter `?from=`, overview "Where accounts came from". Origin = `raw_user_meta_data.signup_app` if set, else earliest `app_access.first_seen`. Accounts that never sign in after tracking ships stay "unknown".
- Optional, NOT applied: `docs/sql/signup_source.sql` (trigger for signup_app metadata, index, revoke anon grants on app_access).
- Applied (approved): `docs/sql/contact_messages.sql` on project 6x7.

## Vercel (project 6x7.gr, team filippos-projects)
Set: `ADMIN_EMAILS` (preview+production), `VERCEL_TEAM_ID` (preview+production), `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` for **preview** (previews were all failing at /login prerender without them).
Also set (sensitive, prod+preview): `ADMIN_DB_URL_6X7` = read-only `admin_ro` login via pooler aws-1-eu-central-1:6543 (role applied 2026-10-20; verified SELECT ok, INSERT blocked). auth.users is read through private view `admin_ro_api.auth_users` (Supabase doesn't allow granting the auth schema).
`VERCEL_TOKEN` was set from the bot env but that token gets 403 on the team API — replace it with a real Vercel token (Account → Tokens) or delete it.
Still missing: `SUPABASE_ACCESS_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY` (contact storage).

## Env vars (set in Vercel → 6x7.gr project; never commit)
| var | required | what |
|---|---|---|
| `ADMIN_EMAILS` | yes | comma-separated owner emails allowed into /admin |
| `ADMIN_DB_URL_6X7` | yes | Postgres URL for Supabase project `6x7` (prefer the read-only role from `docs/sql/admin_readonly_role.sql`; pooler URL, port 6543). Sessions are forced read-only by the app anyway. |
| `ADMIN_DB_URL_DAYBOOK` | optional | same for the `daybook` project |
| `VERCEL_TOKEN` | optional | Vercel token (read) for Deploys/Apps |
| `VERCEL_TEAM_ID` | optional | if projects are under a team |
| `SUPABASE_ACCESS_TOKEN` | optional | Supabase personal access token for project status on Health |
| `SUPABASE_SERVICE_ROLE_KEY` | optional | lets `/api/contact` store messages (after applying `docs/sql/contact_messages.sql`) |
| `SPARKS_URL` | optional | default `https://sparks.6x7.gr` (must be *.6x7.gr) |

Supabase Auth → URL config must allow `https://6x7.gr/auth/callback?next=*` (a `https://6x7.gr/**` wildcard covers it).

## Sparks integration
- Sparks already ships interop v1 (`sparks` repo, `docs/INTEROP.md`, `src/lib/interop/contract.ts`): read projects, write notes. The panel uses both → read + write-notes works today.
- Missing on the Sparks side for full two-way management (ask whoever works on Sparks):
  1. `PATCH /api/interop/v1/projects/:id` — `{ status?, name?, description?, url?, hidden? }` (Bearer, RLS as user).
  2. `GET /api/interop/v1/notes?project_id=&since=&limit=` — recent notes/updates per project so the panel can show an activity feed.
  3. Optional `POST /api/interop/v1/projects` to create a project from the panel.
  Once they exist: add functions in `src/lib/admin/sparks.ts` + controls on `/admin/sparks`.

## Next steps
1. Set env vars on a **Preview** deploy of this branch, sign in, check every page.
2. Decide on contact storage (apply SQL) and the read-only role.
3. Add `vercelProject` names in `config.ts` where Vercel project name ≠ slug; map the remaining unmapped tables (`public.chat_sessions`, `public.assistant_chats`, `public.subscriptions` are shared/ambiguous).
4. Ideas: Stripe MRR/subs card (Stripe key), uptime history via cron, CSV export of users, "where did this user sign up" (needs apps to write `public.app_access` on login — currently almost unused), Supabase advisors.
