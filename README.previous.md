# 6x7.gr

Filippos Ktistakis's personal hub for 30+ apps. Modern, animated, slightly alive (Pako & Pipo say hi).

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind v4**
- **react-three-fiber** + `@react-three/drei` for the animated 3D background
- **framer-motion** for the UI motion
- **Groq** (free tier) for the mascot dialogue, via `/api/pako` and `/api/pipo`
- **Resend** for the contact form, via `/api/contact`
- Static apps still served under `/minigames/*`, `/weeknumber/`, `/AppBlueprints/` (rewrites in `next.config.ts`)
- Legacy vanilla HTML site archived in `/legacy/`

## Local dev

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # serve production build
pnpm lint         # eslint
```

No env vars are required to run locally — both mascot APIs fall back to canned lines, and the contact form runs in dry-run mode (logs to server console).

## Files of interest

- `src/data/projects.ts` — every app + tagline. Edit here to update cards.
- `src/content/mascots/{pako,pipo}.md` — mascot system prompts (edit to change personality).
- `src/components/Hero.tsx` + `src/components/scene/HeroScene.tsx` — hero + 3D scene.
- `src/components/cards/ProjectGalaxy.tsx` + `ProjectCard.tsx` — grouped grid + hover.
- `src/components/mascot/*` — Pako, Pipo, speech bubbles, mute zipper, adopt prompt.
- `src/components/Contact.tsx` — contact section.
- `public/llms.txt` — agent-readable manifest. Edit to update what AI agents read.
- `src/app/layout.tsx` — JSON-LD `Person` + `ItemList` schemas in `<head>`.

## Environment variables (production)

Set these in the Vercel dashboard → Project → Settings → Environment Variables.

| Name | Purpose | Required? |
| --- | --- | --- |
| `GROQ_API_KEY` | Powers Pako + Pipo mascot replies. Get one free at https://console.groq.com. | Optional. Without it, mascots use canned fallback lines. |
| `RESEND_API_KEY` | Sends contact-form messages to `phktistakis@gmail.com`. Get one at https://resend.com. | Optional. Without it, submissions are logged to the server and return `{dryRun: true}`. |

## Deploy to Vercel

1. Push the `rebuild-nextjs` branch:
   ```bash
   git push -u origin rebuild-nextjs
   ```
2. Go to https://vercel.com/new and import `philipposk/6x7.gr`. Pick the `rebuild-nextjs` branch as the production branch (you can merge to `main` once you're happy).
3. Vercel auto-detects Next.js — accept defaults.
4. Add the env vars above in **Settings → Environment Variables**.
5. Redeploy after adding env vars (Vercel does this automatically the first time).

## Cut DNS over from GitHub Pages

When ready to flip `6x7.gr` from GitHub Pages to Vercel:

1. In the Vercel project → **Settings → Domains** → add `6x7.gr` and `www.6x7.gr`.
2. Vercel will show the exact A / CNAME records to add at your registrar (typically: A `76.76.21.21` for the apex, and CNAME `cname.vercel-dns.com` for `www`).
3. At your domain registrar, remove the old GitHub-Pages A records (`185.199.108-111.153`) and add the Vercel records.
4. Wait 5–60 minutes for DNS to propagate.
5. Vercel auto-issues an SSL cert.

## What changed vs. the old site

- Single Vanilla HTML page → Next.js app with sections.
- 15 hardcoded cards → 30+ apps grouped by category, hover-reveals taglines.
- No animation → animated 3D background (react-three-fiber), Framer Motion transitions.
- No contact form → `/api/contact` + Resend + LinkedIn + email-copy.
- No LLM metadata → `/llms.txt` + JSON-LD schema in `<head>`.
- New: **Pako** (guide) and **Pipo** (analyst) mascots. Speech bubbles, mute zipper, reward at 10 opened projects, 30s "adopt as companion" prompt.
- Old site preserved under `/legacy/` for reference.

## Phase 2 (not built yet)

- Cross-site Pako companion — a small Chrome/Firefox extension that hosts the mascot in a side panel and talks to the same `/api/pako` endpoint. Browser security prevents one website from following users across other sites, so this needs to ship as an extension.
- Per-project detail pages.
- Cloudflare Turnstile on the contact form (currently honeypot-only).
