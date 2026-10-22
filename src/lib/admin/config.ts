/**
 * App registry: how to recognise each app's data in its Supabase DB.
 * Adding an app = one entry. Tables that match nothing show up as "unmapped".
 * No secrets here: connection strings come from env (see HANDOFF).
 */
export type DbProject = "6x7" | "daybook";

export interface AppAdapter {
  slug: string;
  name: string;
  db: DbProject;
  /** whole schema belongs to the app */
  schema?: string;
  /** public tables with this prefix belong to the app */
  prefixes?: string[];
  /** extra exact public table names */
  tables?: string[];
  live?: string;
  vercelProject?: string;
}

export const DB_ENV: Record<DbProject, string> = {
  "6x7": "ADMIN_DB_URL_6X7",
  daybook: "ADMIN_DB_URL_DAYBOOK",
};

export const APPS: AppAdapter[] = [
  { slug: "sparks", name: "Sparks", db: "6x7", schema: "sparks", live: "https://sparks.6x7.gr" },
  { slug: "recall", name: "Recall", db: "6x7", schema: "recall", live: "https://recall.6x7.gr" },
  { slug: "greenpert", name: "Greenpert", db: "6x7", schema: "greenpert" },
  { slug: "babi-english", name: "Babi English", db: "6x7", schema: "babi_english" },
  { slug: "paperassistant", name: "PaperAssistant", db: "6x7", schema: "paperassistant" },
  { slug: "appmaker", name: "AppMaker Studio", db: "6x7", schema: "appmaker" },
  { slug: "app-factory", name: "App Factory", db: "6x7", schema: "app_factory" },
  { slug: "shipyard-pilot", name: "Shipyard pilot", db: "6x7", schema: "app_shipyard_pilot" },
  { slug: "journal-find", name: "Journal Find", db: "6x7", schema: "journal_find" },
  { slug: "demo-platform", name: "Demo platform", db: "6x7", schema: "demo" },
  { slug: "translator", name: "Translator", db: "6x7", schema: "translator", prefixes: ["translator_"] },
  { slug: "catchy", name: "Catchy", db: "6x7", prefixes: ["transcriber_"], live: "https://catchy.6x7.gr" },
  { slug: "riffscribe", name: "Riffscribe", db: "6x7", prefixes: ["riffscribe_"] },
  { slug: "topia", name: "Topia", db: "6x7", prefixes: ["topia_"] },
  { slug: "samos", name: "Samos companion", db: "6x7", prefixes: ["samos_"] },
  { slug: "eventnow", name: "EventNow", db: "6x7", prefixes: ["now_"] },
  { slug: "commitr", name: "CommitR", db: "6x7", prefixes: ["commitr_"] },
  { slug: "skinscan", name: "SkinScan", db: "6x7", prefixes: ["skinscan_"] },
  { slug: "psycscope", name: "PsycScope", db: "6x7", prefixes: ["psyc_"] },
  { slug: "smoking", name: "Smoking app", db: "6x7", prefixes: ["smoking_"] },
  { slug: "beenthere", name: "BeenThere", db: "6x7", prefixes: ["beenthere_"] },
  {
    slug: "digestive-diary", name: "Digestive Diary", db: "6x7", prefixes: ["diary_"],
    tables: ["food_logs", "symptoms", "contexts", "experiments", "experiment_logs", "realizations",
      "medications", "medication_logs", "custom_factors", "custom_factor_logs"],
  },
  { slug: "lifehub", name: "LifeHub", db: "6x7", tables: ["lifehub_records"], live: "https://lifehub.6x7.gr" },
  { slug: "postbox", name: "Postbox", db: "6x7", schema: "postbox", live: "https://postbox.6x7.gr" },
  { slug: "timegift", name: "TimeGift", db: "6x7", schema: "timegift", live: "https://timegift.6x7.gr" },
  { slug: "daybook", name: "Daybook", db: "daybook", schema: "public" },
];

/** Tables that exist for every user (auto-created) and so say nothing about usage. */
export const IGNORE_TABLES = new Set(["public.app_access", "public.profiles"]);

export function appForTable(db: DbProject, schema: string, table: string): AppAdapter | undefined {
  return APPS.find((a) => {
    if (a.db !== db) return false;
    if (a.schema && a.schema === schema && (schema !== "public" || a.db !== "6x7")) return true;
    if (schema !== "public") return false;
    return (a.prefixes ?? []).some((p) => table.startsWith(p)) || (a.tables ?? []).includes(table);
  });
}

/** Apps with their own users table (not Supabase auth). Shown as extra accounts in the directory. */
export const EXTERNAL_USER_TABLES: { app: string; table: string }[] = [
  { app: "smoking", table: "public.smoking_users" },
];
