# 6x7.gr — Filippos Ktistakis's Project Hub

A personal website that gathers more than 30 of Filippos Ktistakis's apps and experiments in one place. Think of it as a friendly front door: visitors land on an animated home page, browse the projects grouped by topic, and can get in touch through a contact form. Two cartoon mascots, Pako and Pipo, greet you and chat as you explore.

## What it does
- Shows all of Filippos's projects as cards you can browse and click into
- Greets visitors with two talking mascot characters that react as you look around
- Has a moving, animated 3D background to make the site feel alive
- Lets visitors send a message through a contact form
- Keeps the old version of the site tucked away for reference

## Status
Working website. Built to be hosted online (for example at 6x7.gr). It runs fine even without any setup keys — the mascots fall back to pre-written lines and the contact form just logs messages instead of emailing them.

---
### For developers
Built with Next.js 16 (App Router), TypeScript, and Tailwind v4. The animated 3D background uses react-three-fiber and `@react-three/drei`; UI motion uses framer-motion. Mascot dialogue runs through Groq's free tier via `/api/pako` and `/api/pipo`; the contact form uses Resend via `/api/contact`. Older static apps are still served via rewrites in `next.config.ts`, and the original vanilla HTML site lives in `/legacy/`.

Run locally with pnpm:

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start    # serve production build
pnpm lint
```

No env vars are required for local dev. In production (set in the Vercel dashboard), `GROQ_API_KEY` powers the mascots and `RESEND_API_KEY` sends contact-form mail to phktistakis@gmail.com — both are optional, with graceful fallbacks.

Key files: `src/data/projects.ts` (the project cards), `src/content/mascots/{pako,pipo}.md` (mascot personalities), `src/components/Hero.tsx` and `src/components/scene/HeroScene.tsx` (hero + 3D scene), `src/components/cards/*` (project grid), `src/components/mascot/*` (mascots), `src/components/Contact.tsx` (contact section), `public/llms.txt` (agent-readable manifest).

Deploys to Vercel. MIT licensed.
