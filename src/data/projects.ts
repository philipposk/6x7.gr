export type ProjectGroup =
  | "headline"
  | "productivity"
  | "creator"
  | "health"
  | "games"
  | "wip"
  | "infra"
  | "this"
  | "parked";

export type ProjectStatus = "live" | "beta" | "wip" | "archived";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  group: ProjectGroup;
  status: ProjectStatus;
  repo?: string;
  live?: string;
  glyph?: string;
  comingSoon?: boolean;
  /** Lower sorts first within a group (before status). */
  rank?: number;
  /** Optional one-line caption on the card. */
  note?: string;
}

export const GROUPS: { id: ProjectGroup; label: string; blurb: string }[] = [
  { id: "headline", label: "Now", blurb: "What I'm shipping." },
  { id: "productivity", label: "Life & productivity", blurb: "Calm tools for messy days." },
  { id: "creator", label: "Creator tools", blurb: "For people who make things." },
  { id: "health", label: "Health & learning", blurb: "Quiet help for body and mind." },
  { id: "games", label: "Games", blurb: "Made because it was fun." },
  { id: "wip", label: "Work in progress", blurb: "Half-built, but real." },
  { id: "infra", label: "Libraries & infra", blurb: "Small tools other apps lean on." },
  { id: "this", label: "Meta", blurb: "This site." },
  {
    id: "parked",
    label: "Parked",
    blurb: "Not in the working set right now.",
  },
];

export const PROJECTS: Project[] = [
  // Now — explicit rank order
  {
    slug: "chatfix",
    name: "ChatFix",
    tagline:
      "Upload a WhatsApp chat. ChatFix finds the real English mistakes you made, explains them in Brazilian Portuguese, and helps you practice them.",
    group: "headline",
    status: "live",
    rank: 1,
    live: "https://chatfix.6x7.gr",
    repo: "https://github.com/philipposk/babi-english",
    glyph: "◈",
  },
  {
    slug: "journal-find",
    name: "Journal Find",
    tagline: "Paste your abstract — get an enriched journal shortlist (Excel, PDF, CSV).",
    group: "headline",
    status: "live",
    rank: 2,
    live: "https://journal-find.6x7.gr",
    glyph: "◎",
  },
  {
    slug: "daybook",
    name: "Daybook",
    tagline:
      "A shared book of the day's takings, expenses and profit — one person files the register, everyone sees it on their phone.",
    group: "headline",
    status: "live",
    rank: 3,
    live: "https://daybook.6x7.gr",
    glyph: "▥",
  },
  {
    slug: "page-assistant",
    name: "Page Assistant",
    tagline:
      "A talking, grounded assistant you drop into any web app — it reads the page, runs real actions, never hallucinates, and publishes an llm.txt so other agents can use your app too.",
    group: "headline",
    status: "live",
    rank: 4,
    live: "https://pageassistant.6x7.gr",
    repo: "https://github.com/philipposk/page-assistant",
    glyph: "◉",
  },
  {
    slug: "catchy",
    name: "Catchy",
    tagline:
      "Record a meeting on your phone or upload audio — get a speaker-labeled transcript, action notes, and an assistant that knows your projects. Click any word to hear it.",
    group: "headline",
    status: "live",
    rank: 5,
    live: "https://catchy.6x7.gr",
    repo: "https://github.com/philipposk/catchy",
    glyph: "◖",
  },
  {
    slug: "riffscribe",
    name: "Riffscribe",
    tagline:
      "Drop in a song — get the sheet music and the tab for your instrument, mute the part you are learning, slow it down without dropping the pitch, and read along as it scrolls itself. Record yourself over the top and it marks the take against the part: what was flat, what was late, which bars still need the work.",
    group: "headline",
    status: "live",
    rank: 6,
    live: "https://riffscribe.6x7.gr",
    repo: "https://github.com/philipposk/riffscribe",
    glyph: "♪",
  },
  {
    slug: "topia",
    name: "Topia",
    tagline:
      "Multilingual mobile guides to Samos, Lesbos and Copenhagen — hand-checked places, live events, and an AI day-planner grounded in the catalogue.",
    group: "headline",
    status: "live",
    rank: 7,
    live: "https://topia.6x7.gr",
    glyph: "◬",
  },
  {
    slug: "eventnow",
    name: "EventNow",
    tagline: "What's on near you, right now — events and open places within walking distance.",
    group: "wip",
    status: "beta",
    live: "https://eventnow.6x7.gr",
    repo: "https://github.com/philipposk/eventnow",
    glyph: "◷",
  },
  {
    slug: "lifehub",
    name: "LifeHub",
    tagline:
      "A dashboard above your life and your tools — so you stop losing things.",
    group: "productivity",
    status: "beta",
    live: "https://lifehub.6x7.gr",
    repo: "https://github.com/philipposk/LifeHub",
    glyph: "◐",
  },
  {
    slug: "cosmo",
    name: "Cosmo",
    tagline:
      "A quiet creative home for stories, art, and goals — AI baked in, privacy on by default.",
    group: "productivity",
    status: "beta",
    live: "https://cosmo.6x7.gr",
    repo: "https://github.com/philipposk/cosmo-frontend",
    glyph: "✦",
  },
  {
    slug: "daisy",
    name: "Daisy",
    tagline:
      "A polite voice assistant that lives on your Mac and gets things done without nagging.",
    group: "infra",
    status: "live",
    live: "https://daisy.6x7.gr",
    repo: "https://github.com/philipposk/Daisy--AI-Assistant-",
    glyph: "✿",
  },
  {
    slug: "ai-os",
    name: "AI OS",
    tagline:
      "Many AI agents, one team. Plans, writes, ships code — with you in the loop.",
    group: "infra",
    status: "beta",
    live: "https://aios.6x7.gr",
    repo: "https://github.com/philipposk/AI-OS",
    glyph: "◇",
  },
  {
    slug: "praiser",
    name: "Praiser",
    tagline: "Free, multilingual hype machine for the people you love.",
    group: "creator",
    status: "live",
    live: "https://praiser.6x7.gr",
    repo: "https://github.com/philipposk/Praiser",
    glyph: "★",
  },

  // Productivity
  {
    slug: "timegift",
    name: "TimeGift",
    tagline: "Give time, not stuff. Schedule presence with someone.",
    group: "productivity",
    status: "beta",
    live: "https://timegift.6x7.gr",
    repo: "https://github.com/philipposk/TimeGift",
    glyph: "⧗",
  },
  {
    slug: "paperassistant",
    name: "PaperAssistant",
    tagline: "A workspace for the messy middle of research papers.",
    group: "productivity",
    status: "beta",
    live: "https://paperassistant.6x7.gr",
    repo: "https://github.com/philipposk/PaperAssistant",
    glyph: "▤",
  },
  {
    slug: "projecthub",
    name: "ProjectHub",
    tagline: "Your research projects, finally in one place.",
    group: "productivity",
    status: "wip",
    comingSoon: true,
    note: "A dashboard that was planned and never built.",
    glyph: "▦",
  },
  {
    slug: "beenthere",
    name: "BeenThere",
    tagline: "Mark the world you've seen.",
    group: "productivity",
    status: "live",
    live: "https://beenthere.6x7.gr",
    repo: "https://github.com/philipposk/BeenThere",
    glyph: "◯",
  },
  {
    slug: "weeknumber",
    name: "Week Number Widget",
    tagline: "What week is it? Now you know — from your home screen.",
    group: "productivity",
    status: "live",
    live: "https://weeknumber.6x7.gr",
    repo: "https://github.com/philipposk/WeekNumber-Widget",
    glyph: "▥",
  },
  {
    slug: "postbox",
    name: "Postbox",
    tagline: "An inbox that respects you back.",
    group: "parked",
    status: "beta",
    live: "https://postbox.6x7.gr",
    repo: "https://github.com/philipposk/postbox",
    glyph: "✉",
  },

  // Creator tools
  {
    slug: "studio",
    name: "6x7 Studio",
    tagline:
      "Websites and web apps for businesses — from a taverna's menu and booking requests to a full SaaS product. I design them, build them and keep them running. In Greek and English.",
    group: "creator",
    status: "live",
    live: "https://work.6x7.gr",
    glyph: "◳",
  },
  {
    slug: "vibecoders-studio",
    name: "Vibecoders Studio",
    tagline:
      "Describe an app and watch AI write the full stack as it streams — live in-browser preview, tests, and a zip export when you're done.",
    group: "creator",
    status: "beta",
    live: "https://studio.6x7.gr",
    repo: "https://github.com/philipposk/appmaker-studio",
    glyph: "◰",
  },
  {
    slug: "translator",
    name: "Translator",
    tagline: "Speak it, get clean text in any language.",
    group: "creator",
    status: "beta",
    live: "https://translator.6x7.gr",
    repo: "https://github.com/philipposk/translator",
    glyph: "◍",
  },
  {
    slug: "divisi",
    name: "Divisi",
    tagline:
      "Split a choir recording into soprano, alto, tenor and bass practice tracks — hear your own line, slow it down without going flat, loop the bar nobody can sing yet.",
    group: "creator",
    status: "live",
    live: "https://divisi.6x7.gr",
    repo: "https://github.com/philipposk/divisi",
    glyph: "𝄞",
  },
  {
    slug: "websitecreator",
    name: "WebsiteCreator",
    tagline: "Sketch a site. Get a site.",
    group: "creator",
    status: "wip",
    live: "https://websitecreator.6x7.gr",
    repo: "https://github.com/philipposk/WebsiteCreator",
    glyph: "▢",
  },
  {
    slug: "appmaker",
    name: "AppMaker",
    tagline: "Vibe-code small web apps with Groq.",
    group: "creator",
    status: "beta",
    live: "https://appmaker.6x7.gr",
    repo: "https://github.com/philipposk/AppMaker-vibecode",
    glyph: "◰",
  },
  {
    slug: "appblueprints",
    name: "AppBlueprints",
    tagline: "create-react-app, but for your AI coding setup.",
    group: "creator",
    status: "beta",
    live: "https://appblueprints.6x7.gr",
    repo: "https://github.com/philipposk/harness-forge",
    note: "Wrote the instruction files for coding assistants. An early version of what the app factory does now.",
    glyph: "▩",
  },
  {
    slug: "harness",
    name: "Harness",
    tagline: "Generate AGENTS.md, CLAUDE.md, rules & MCP bundles for any harness.",
    group: "creator",
    status: "beta",
    live: "https://harness.6x7.gr",
    repo: "https://github.com/philipposk/harness-forge",
    glyph: "⛭",
  },

  // Health & learning
  {
    slug: "digestive-diary",
    name: "Digestive Diary",
    tagline:
      "Track digestive symptoms without judgement. Find patterns, not blame.",
    group: "health",
    status: "beta",
    live: "https://digestive.6x7.gr",
    repo: "https://github.com/philipposk/Digestive-Diary",
    glyph: "◉",
  },
  {
    slug: "smoking",
    name: "Smoking",
    tagline: "A worldwide map of smoke-friendly places.",
    group: "health",
    status: "beta",
    live: "https://smoking.6x7.gr",
    repo: "https://github.com/philipposk/smoking-app",
    glyph: "◌",
  },
  {
    slug: "greenpert",
    name: "Greenpert",
    tagline:
      "Breeding simulator and grow companion — predict cross outcomes from two strains, browse a scored library, rank pairings for a goal, and keep favourites and notes.",
    group: "health",
    status: "live",
    live: "https://greenpert.6x7.gr",
    repo: "https://github.com/philipposk/greenpert",
    glyph: "♣",
  },
  {
    slug: "shipyard",
    name: "Shipyard",
    tagline: "A Claude Code plugin to build and launch real web apps.",
    group: "creator",
    status: "live",
    live: "https://shipyard.6x7.gr",
    repo: "https://github.com/philipposk/shipyard",
    glyph: "⚓",
  },
  {
    slug: "school",
    name: "Critical Thinking School",
    tagline: "Critical thinking, course-quality.",
    group: "health",
    status: "live",
    live: "https://school.6x7.gr",
    repo: "https://github.com/philipposk/School",
    glyph: "▽",
  },
  {
    slug: "psycscope",
    name: "PsycScope",
    tagline:
      "Screen 32 well-known psychological disorders — self-report plus optional AI. Screening only, not diagnosis.",
    group: "health",
    status: "live",
    live: "https://psyc.6x7.gr",
    repo: "https://github.com/philipposk/psycscope",
    glyph: "Ψ",
  },
  {
    slug: "skinscan",
    name: "SkinScan",
    tagline:
      "Photograph a mole, pin it on a 3D body map, and see what it does over months. Records and describes — never diagnoses.",
    group: "health",
    status: "beta",
    live: "https://skinscan.6x7.gr",
    repo: "https://github.com/philipposk/skinscan",
    glyph: "◎",
  },

  // Games
  {
    slug: "minigames",
    name: "MiniGames",
    tagline: "Eight offline-friendly browser games. No ads, no tracking.",
    group: "games",
    status: "live",
    live: "https://minigames.6x7.gr",
    repo: "https://github.com/philipposk/MiniGames",
    glyph: "◆",
  },
  {
    slug: "game-of-world",
    name: "GameOfWorld",
    tagline: "First-person exploration of photoreal London, built in Unity.",
    group: "games",
    status: "wip",
    live: "https://gameoflife.6x7.gr",
    glyph: "⬢",
  },
  {
    slug: "lesvos",
    name: "Lesvos Terrain",
    tagline: "DEM terrain of Lesvos island, ready to drop into Unity.",
    group: "games",
    status: "archived",
    glyph: "△",
  },

  // Travel & local guides
  {
    slug: "samos",
    name: "Samos Companion",
    tagline:
      "A free four-language PWA for Samos visitors — places, events, day plans, and a direct channel for the local business behind it.",
    group: "productivity",
    status: "live",
    live: "https://samos.6x7.gr",
    glyph: "⛵",
  },

  // Work in progress / external
  {
    slug: "bestflight",
    name: "BestFlight",
    tagline: "AI flight search that finds connecting routes other sites miss.",
    group: "wip",
    status: "beta",
    live: "https://bestflight.6x7.gr",
    repo: "https://github.com/philipposk/BestFlight",
    glyph: "⬡",
  },
  {
    slug: "travel",
    name: "Travel",
    tagline: "An AI that actually helps you go somewhere.",
    group: "wip",
    status: "wip",
    live: "https://travel.6x7.gr",
    repo: "https://github.com/philipposk/Travel",
    glyph: "◬",
  },
  {
    slug: "thatjob",
    name: "ThatJob",
    tagline: "AI CV + cover letter, in five honest phases.",
    group: "wip",
    status: "beta",
    live: "https://thatjob.6x7.gr",
    repo: "https://github.com/philipposk/ThatJob",
    glyph: "▣",
  },
  {
    slug: "photo-ranker",
    name: "PickaPic",
    tagline: "Rank, cluster, and caption your photo library.",
    group: "wip",
    status: "wip",
    live: "https://pickapic.6x7.gr",
    glyph: "▧",
  },
  {
    slug: "salonapp",
    name: "SalonApp",
    tagline: "Booking, chat, finance — built for salon teams.",
    group: "wip",
    status: "wip",
    repo: "https://github.com/philipposk/SalonApp",
    glyph: "▨",
  },
  {
    slug: "salon-marketplace",
    name: "SalonMarketplace",
    tagline: "Where clients find salons and salons find clients.",
    group: "wip",
    status: "wip",
    repo: "https://github.com/philipposk/SalonMarketplace",
    glyph: "◑",
  },
  {
    slug: "phasma",
    name: "Phasma",
    tagline: "Annual pharmacist calendar by Phasma Promotions.",
    group: "wip",
    status: "live",
    live: "https://phasma.6x7.gr",
    repo: "https://github.com/philipposk/Phasma-Website",
    glyph: "▱",
  },

  // Infra
  {
    slug: "llm-free-rotator",
    name: "llm-free-rotator",
    tagline: "Rotate across free-tier LLMs when one rate-limits you.",
    group: "infra",
    status: "live",
    live: "https://llm-rotator.6x7.gr",
    repo: "https://github.com/philipposk/llm-free-rotator",
    glyph: "◎",
  },
  {
    slug: "agent-feedback",
    name: "agent-feedback",
    tagline:
      "A tiny universal protocol that lets LLMs, agents, and in-app assistants send improvement tickets back to the apps they use — so apps get better every time they're used.",
    group: "infra",
    status: "live",
    live: "https://agentfeedback.6x7.gr",
    repo: "https://github.com/philipposk/agent-feedback",
    glyph: "⟲",
  },
  {
    slug: "app-factory",
    name: "6x7 App Factory",
    tagline:
      "Say /new-app once in Cursor — get a deployed Next.js app on 6x7.gr with auth, SEO, mobile shell, verification, and a hub card.",
    group: "infra",
    status: "live",
    live: "https://app-factory.6x7.gr",
    repo: "https://github.com/philipposk/app-factory",
    glyph: "⬡",
  },
  {
    slug: "commitr",
    name: "CommitR",
    tagline: "Dating for people who overthink commitment.",
    group: "infra",
    status: "beta",
    live: "https://commitr.6x7.gr",
    repo: "https://github.com/philipposk/CommitR",
    glyph: "◔",
  },
  {
    slug: "demo",
    name: "6x7 Demo Studio",
    tagline:
      "Paste a live URL, get a polished demo video or screenshot grid — including two-voice product demos where an on-page assistant does the work live.",
    group: "creator",
    status: "live",
    live: "https://demo.6x7.gr",
    repo: "https://github.com/philipposk/6x7-demo-platform",
    glyph: "▶",
  },
  {
    slug: "screenshot-grid",
    name: "Screenshot Grid",
    tagline:
      "Screenshot any list of web apps and build a clickable grid. No API keys, no cost — Playwright-based and reusable.",
    group: "parked",
    status: "live",
    live: "https://screenshotgrid.6x7.gr",
    repo: "https://github.com/philipposk/screenshot-grid",
    glyph: "▦",
  },
];

const STATUS_ORDER: Record<ProjectStatus, number> = {
  live: 0,
  beta: 1,
  wip: 2,
  archived: 3,
};

export function projectsByGroup(group: ProjectGroup) {
  return PROJECTS.filter((p) => p.group === group).sort((a, b) => {
    // Coming-soon cards always sink to the bottom of their group.
    if (!!a.comingSoon !== !!b.comingSoon) return a.comingSoon ? 1 : -1;
    const rankA = a.rank ?? Number.MAX_SAFE_INTEGER;
    const rankB = b.rank ?? Number.MAX_SAFE_INTEGER;
    if (rankA !== rankB) return rankA - rankB;
    return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
  });
}

export function projectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
