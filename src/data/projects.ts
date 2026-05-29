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
      "The calm dashboard above your life and your tools — so you stop losing things.",
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
    glyph: "✦",
  },
  {
    slug: "daisy",
    name: "Daisy",
    tagline:
      "A polite voice assistant that lives on your Mac and gets things done without nagging.",
    group: "headline",
    status: "live",
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
    live: "https://paper_assistant.6x7.gr",
    repo: "https://github.com/philipposk/PaperAssistant",
    glyph: "▤",
  },
  {
    slug: "projecthub",
    name: "ProjectHub",
    tagline: "Your research projects, finally in one place.",
    group: "productivity",
    status: "wip",
    live: "https://projecthub.6x7.gr",
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
    status: "wip",
    live: "https://postbox.6x7.gr",
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
    glyph: "◍",
  },
  {
    slug: "mixmaster",
    name: "MixMaster AI",
    tagline: "AI that hears your tracks and knows the next transition.",
    group: "creator",
    status: "beta",
    glyph: "◊",
  },
  {
    slug: "websitecreator",
    name: "WebsiteCreator",
    tagline: "Sketch a site. Get a site.",
    group: "creator",
    status: "wip",
    live: "https://websitecreator.6x7.gr",
    glyph: "▢",
  },
  {
    slug: "appmaker",
    name: "AppMaker",
    tagline: "Vibe-code small web apps with Groq.",
    group: "creator",
    status: "beta",
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
    glyph: "▩",
  },
  {
    slug: "recordly",
    name: "Recordly",
    tagline: "Open-source screen recorder for walkthroughs and demos.",
    group: "creator",
    status: "beta",
    glyph: "●",
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
    glyph: "◉",
  },
  {
    slug: "smoking",
    name: "Smoking",
    tagline: "A worldwide map of smoke-friendly places.",
    group: "health",
    status: "beta",
    live: "https://smoking.6x7.gr",
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
    status: "live",
    glyph: "△",
  },

  // Work in progress / external
  {
    slug: "travel",
    name: "Travel",
    tagline: "An AI that actually helps you go somewhere.",
    group: "wip",
    status: "wip",
    live: "https://travel.6x7.gr",
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
    name: "Photo Ranker",
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
    live: "https://salon.6x7.gr",
    glyph: "▨",
  },
  {
    slug: "salon-marketplace",
    name: "SalonMarketplace",
    tagline: "Where clients find salons and salons find clients.",
    group: "wip",
    status: "wip",
    live: "https://salonmarketplace.6x7.gr",
    glyph: "◑",
  },
  {
    slug: "strive",
    name: "Strive (Ventures suite)",
    tagline: "Private-company intelligence. Dashboards, pipelines, alerts.",
    group: "wip",
    status: "live",
    glyph: "◭",
  },
  {
    slug: "dimitris-site",
    name: "Pharmacist Calendar",
    tagline: "Annual pharmacist calendar by Phasma Promotions.",
    group: "wip",
    status: "live",
    live: "https://phasma.6x7.gr",
    glyph: "▱",
  },

  // Infra
  {
    slug: "llm-free-rotator",
    name: "llm-free-rotator",
    tagline: "Rotate across free-tier LLMs when one rate-limits you.",
    group: "infra",
    status: "live",
    glyph: "◎",
  },
  {
    slug: "telegram-mcp",
    name: "telegram-mcp",
    tagline: "Claude ↔ Telegram, via MCP.",
    group: "infra",
    status: "live",
    repo: "https://github.com/philipposk/telegram-mcp",
    glyph: "✈",
  },
  {
    slug: "groq-agent",
    name: "groq_agent",
    tagline: "Tiny CLI agent with macOS screen + code execution.",
    group: "infra",
    status: "beta",
    glyph: "▷",
  },

  // Meta
  {
    slug: "6x7",
    name: "6x7.gr",
    tagline: "This site. Open source, animated, slightly alive.",
    group: "this",
    status: "live",
    repo: "https://github.com/philipposk/6x7.gr",
    live: "https://6x7.gr",
    glyph: "✸",
  },
];

export function projectsByGroup(group: ProjectGroup) {
  return PROJECTS.filter((p) => p.group === group);
}

export function projectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
