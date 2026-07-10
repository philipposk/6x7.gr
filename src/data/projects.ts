export type ProjectGroup =
  | "headline"
  | "productivity"
  | "creator"
  | "health"
  | "games"
  | "wip"
  | "infra"
  | "this";

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
}

export const GROUPS: { id: ProjectGroup; label: string; blurb: string }[] = [
  { id: "headline", label: "Headliners", blurb: "The ones I keep iterating on." },
  { id: "productivity", label: "Life & productivity", blurb: "Calm tools for messy days." },
  { id: "creator", label: "Creator tools", blurb: "For people who make things." },
  { id: "health", label: "Health & learning", blurb: "Quiet help for body and mind." },
  { id: "games", label: "Games", blurb: "Made because it was fun." },
  { id: "wip", label: "Work in progress", blurb: "Half-built, but real." },
  { id: "infra", label: "Libraries & infra", blurb: "Small tools other apps lean on." },
  { id: "this", label: "Meta", blurb: "This site." },
];

export const PROJECTS: Project[] = [
  // Headliners
  {
    slug: "lifehub",
    name: "LifeHub",
    tagline:
      "A dashboard above your life and your tools — so you stop losing things.",
    group: "headline",
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
    group: "headline",
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
    group: "headline",
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
    group: "headline",
    status: "beta",
    live: "https://aios.6x7.gr",
    repo: "https://github.com/philipposk/AI-OS",
    glyph: "◇",
  },
  {
    slug: "praiser",
    name: "Praiser",
    tagline: "Free, multilingual hype machine for the people you love.",
    group: "headline",
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
    group: "productivity",
    status: "beta",
    live: "https://postbox.6x7.gr",
    repo: "https://github.com/philipposk/postbox",
    glyph: "✉",
  },

  // Creator tools
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
    slug: "transcriber",
    name: "Transcriber",
    tagline:
      "Drop in a meeting recording — get a speaker-labeled transcript, notes split by project, and editable tickets. Click any word to hear it.",
    group: "creator",
    status: "live",
    live: "https://transcriber.6x7.gr",
    repo: "https://github.com/philipposk/transcriber",
    glyph: "◖",
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
    slug: "vibecoders-studio",
    name: "Vibecoders Studio",
    tagline: "Full AI app builder — streaming codegen, live preview, tests, export.",
    group: "creator",
    status: "beta",
    live: "https://studio.6x7.gr",
    repo: "https://github.com/philipposk/appmaker-studio",
    glyph: "◳",
  },
  {
    slug: "appblueprints",
    name: "AppBlueprints",
    tagline: "create-react-app, but for your AI coding setup.",
    group: "creator",
    status: "beta",
    live: "https://appblueprints.6x7.gr",
    repo: "https://github.com/philipposk/harness-forge",
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

  // Games
  {
    slug: "minigames",
    name: "MiniGames",
    tagline: "Seven offline-friendly browser games. No ads, no tracking.",
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
    slug: "dimitris-site",
    name: "Pharmacist Calendar",
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
    slug: "page-assistant",
    name: "Page Assistant",
    tagline:
      "A talking, grounded assistant you drop into any web app — it reads the page, runs real actions, never hallucinates, and publishes an llm.txt so other agents can use your app too.",
    group: "infra",
    status: "live",
    live: "https://pageassistant.6x7.gr",
    repo: "https://github.com/philipposk/page-assistant",
    glyph: "◉",
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
    group: "creator",
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
    return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
  });
}

export function projectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
