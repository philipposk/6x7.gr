# Handoff: onboarding an app onto the 6x7 platform

**Audience:** the agent consolidating the portfolio apps onto 6x7.gr.
**Status:** Greenpert is the pilot — this recipe works end to end. Use it as the template for the rest.
**Source plan:** `~/.claude/plans/3-i-think-and-cozy-hejlsberg.md`

---

## Shared platform state (already exists — DO NOT recreate)

Greenpert, as the first app, created the shared foundation in the **`6x7` Supabase project**
(id `fmrnqepyyjucnfbrqawl`, region eu-central-1):

- `public.profiles(id → auth.users, display_name, avatar_url, locale, created_at)` + RLS `auth.uid() = id`
- `public.app_access(user_id, app, first_seen, last_seen)` + RLS `auth.uid() = user_id`
- Trigger `public.handle_new_user()` on `auth.users` → auto-inserts a profile row on signup

For every new app: **reuse these. Do not redefine them.**

---

## Per-app DB recipe (one migration per app)

```sql
create schema if not exists <app>;

-- each app table:
create table if not exists <app>.<thing> (
  user_id uuid not null references auth.users on delete cascade,
  -- ... app columns ...
);
alter table <app>.<thing> enable row level security;
drop policy if exists "own <thing>" on <app>.<thing>;
create policy "own <thing>" on <app>.<thing>
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

grant usage on schema <app> to authenticated, anon;
grant select, insert, update, delete on all tables in schema <app> to authenticated;
alter default privileges in schema <app>
  grant select, insert, update, delete on tables to authenticated;
```

- Static reference data (catalogues, lookup tables) → keep in app code, store only a slug/id in the DB.
  Keeps the shared 500 MB free tier tiny.
- Tables that aren't user-owned (shared/public read) need a different policy — decide per app.

---

## App code recipe (Next.js + @supabase/ssr)

Three files plus one shared cookie module:

- `src/lib/supabase/client.ts` — `createBrowserClient`
- `src/lib/supabase/server.ts` — `createServerClient` (next/headers cookie adapter)
- `src/proxy.ts` — **Next 16 renamed `middleware` → `proxy`.** Export `proxy(request)`, call
  `supabase.auth.getUser()` to refresh the session cookie on every request.

Shared cookie config (imported by all three so SSO works across `*.6x7.gr`):

```ts
const isProd = process.env.NODE_ENV === "production";
export const sharedCookieOptions = {
  name: "sb-6x7-auth",
  ...(isProd ? { domain: ".6x7.gr" } : {}), // unset on localhost
  sameSite: "lax",
  secure: isProd,
  path: "/",
};
```

- Scope the client to the app schema: `createBrowserClient(url, key, { cookieOptions, db: { schema: "<app>" } })`.
  Cross-schema reads (e.g. shared `public.profiles`) via `.schema("public")`.
- Auth callback route at `/auth/callback` → `exchangeCodeForSession(code)` → redirect.
- **Session = cookie only.** localStorage is fine for *guest* data, never for the auth session.
- Guest → cloud migration: on first sign-in, merge localStorage data into cloud (cloud wins on conflicts).

### TS gotcha
A client typed to a non-`public` schema (`db: { schema: "<app>" }`) is not assignable to the default
`SupabaseClient<…,"public",…>`. Export a `type AppSupabaseClient = ReturnType<typeof createClient>` and use
it everywhere you pass the client around.

---

## Deploy recipe (CLI — the agent can do all of this)

```bash
git init && git add -A && git commit -m "..."          # .env* already gitignored by Next
gh repo create <app> --private --source=. --push
vercel link --yes --project <app> --scope <team-scope>

# env vars — add to PRODUCTION, one at a time (chaining breaks stdin):
printf '%s' "$URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL production --scope <team-scope>
printf '%s' "$KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --scope <team-scope>

vercel deploy --prod --yes --scope <team-scope>
vercel domains add <app>.6x7.gr --scope <team-scope>   # single arg when the project is linked
```

- Team scope used for Greenpert: `filippos-projects-06f05211`.
- Shared Supabase values:
  - `NEXT_PUBLIC_SUPABASE_URL = https://fmrnqepyyjucnfbrqawl.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY = ` the **publishable** key (`sb_publishable_…`) — public-safe under RLS.
- **Never** put the secret key in a `NEXT_PUBLIC_*` var.

### CLI gotchas
- `vercel env add ... preview` prompts for a git branch → blocks non-interactive stdin. Only `production`
  is needed for the live site; skip preview/development.
- `vercel domains add <domain> <project>` errors when a project is already linked — pass the domain as a
  single argument.

---

## Manual steps (CANNOT be done via MCP/CLI — hand to the human, every app)

1. **DNS** (papaki.gr): `<app>` record → CNAME `cname.vercel-dns.com` (or A `76.76.21.21`).
2. **Vercel → project → Settings → Deployment Protection → Vercel Authentication = Disabled.**
   Otherwise the site returns **401** to the public. (This caught Greenpert.)
3. **Supabase → Settings → Data API → Exposed schemas → add `<app>`.**
   (Moved out of the "API" page in the new dashboard — it's the **Data API** page now.)
   The schema list is shared; each app appends its own. Without this the REST/JS client 404s on app tables.
4. **Supabase → Authentication → URL Configuration:**
   - Site URL: `https://6x7.gr`
   - Redirect URLs include: `http://localhost:3000/**`, `https://<app>.6x7.gr/**`, `https://*.6x7.gr/**`
   - The `*.6x7.gr` wildcard covers all future apps — set once.
   - Google provider is optional (needs Google OAuth keys). Email magic-link works without it.

---

## Blocks full SSO

The **hub at `6x7.gr`** doesn't exist yet. Until it does, login works *per-app* on each subdomain but there
is no "log in once at 6x7.gr" experience. Build the hub so the shared `sb-6x7-auth` cookie is set at the apex —
then every subdomain reads the same session.

---

## Pilot artifacts (reference implementation)

- Repo: `github.com/philipposk/greenpert`
- Live: `https://greenpert.6x7.gr` (pending the 4 manual toggles above)
- Local: `Devoloper Projects/Greenpert/` — see `src/lib/supabase/`, `src/lib/auth/`, `src/lib/store/`,
  `src/proxy.ts` for the working pattern.
