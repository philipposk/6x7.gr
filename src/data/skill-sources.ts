// Repos whose skills/*/SKILL.md files feed the /skills library.
// Add a repo here, run `pnpm generate:skills`, and its skills show up.

export type AgentId =
  | "claude-code"
  | "cursor"
  | "codex"
  | "openclaw"
  | "hermes"
  | "skills-sh";

export interface InstallCommand {
  agent: AgentId;
  label: string;
  command: string;
  /** true = listing not published yet; shown greyed with a note. */
  planned?: boolean;
}

export interface SkillSource {
  /** owner/name on GitHub */
  repo: string;
  /** Branch or tag to read from. */
  ref: string;
  /** Plugin name shown on cards. */
  plugin: string;
  /** Folder that contains one sub-folder per skill. */
  skillsDir: string;
  /** Optional local checkout, used first when it exists (faster, offline). */
  localPath?: string;
  installs: InstallCommand[];
}

export const AGENT_LABELS: Record<AgentId, string> = {
  "claude-code": "Claude Code",
  cursor: "Cursor",
  codex: "Codex",
  openclaw: "OpenClaw",
  hermes: "Hermes",
  "skills-sh": "skills.sh",
};

export const SKILL_SOURCES: SkillSource[] = [
  {
    repo: "philipposk/shipyard",
    ref: "main",
    plugin: "Shipyard",
    skillsDir: "skills",
    localPath: "../shipyard",
    installs: [
      { agent: "skills-sh", label: "Any agent (skills.sh)", command: "npx skills add philipposk/shipyard" },
      {
        agent: "claude-code",
        label: "Claude Code",
        command: "/plugin marketplace add philipposk/shipyard\n/plugin install shipyard@shipyard",
      },
      {
        agent: "codex",
        label: "Codex",
        command:
          'D="$HOME/.local/share/shipyard"; { git -C "$D" pull --ff-only 2>/dev/null || git clone --depth 1 https://github.com/philipposk/shipyard.git "$D"; } && node "$D/scripts/install-agents.mjs" --agent codex --yes',
      },
      {
        agent: "cursor",
        label: "Cursor",
        command:
          'D="$HOME/.local/share/shipyard"; { git -C "$D" pull --ff-only 2>/dev/null || git clone --depth 1 https://github.com/philipposk/shipyard.git "$D"; } && node "$D/scripts/install-agents.mjs" --agent cursor --yes',
      },
      { agent: "openclaw", label: "OpenClaw (ClawHub)", command: "clawhub install shipyard", planned: true },
      { agent: "hermes", label: "Hermes", command: "hermes skills tap add philipposk/shipyard", planned: true },
    ],
  },
];
