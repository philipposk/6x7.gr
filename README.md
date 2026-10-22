# 6x7.gr — Filippos Ktistakis's Project Hub

Personal site that lists Filippos's apps and experiments in one place. Visitors get a quiet editorial hero, a searchable card grid grouped by topic, a contact form, and optional sign-in shared with other 6x7 apps.

## What it does

- Shows projects as cards with live links, GitHub repos, and status labels
- Groups cards (Now, productivity, creator tools, and the rest) with filters
- Contact form backed by Resend when `RESEND_API_KEY` is set
- Supabase auth for a single login across participating 6x7 apps
- Publishes `public/llms.txt` from `src/data/projects.ts` at build time

## Status

Production site at [6x7.gr](https://6x7.gr). Deploys on Vercel.

---

### For developers

Built with Next.js 16 (App Router), TypeScript, and Tailwind v4. UI motion uses framer-motion. Contact mail uses Resend via `/api/contact`. Older static apps may still be served via rewrites in `next.config.ts`; the original vanilla HTML site lives in `/legacy/`.

Run locally with pnpm:

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # runs generate:llms, then next build
pnpm start    # serve production build
pnpm lint
```

Optional env vars (Vercel dashboard): `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` for contact mail; Supabase keys for auth.

Key files: `src/data/projects.ts` (card data), `src/components/Hero.tsx` (hero), `src/components/cards/*` (grid), `src/components/Contact.tsx`, `scripts/llms-template.md` + `scripts/generate-llms-txt.ts` → `public/llms.txt`.

Deploys to Vercel. MIT licensed.
