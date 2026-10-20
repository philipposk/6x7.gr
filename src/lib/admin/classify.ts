export type EmailClass = "owner" | "real" | "test" | "throwaway";

const THROWAWAY = [
  "atomicmail.io", "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com",
  "temp-mail.org", "yopmail.com", "sharklasers.com", "trashmail.com", "dispostable.com",
  "maildrop.cc", "getnada.com", "mail.tm", "emailondeck.com", "fakeinbox.com",
];
const TEST_TLDS = [".local", ".demo", ".test", ".invalid", ".example", ".localhost"];

export function classifyEmail(email: string | null | undefined, opts: { owners?: string[]; isDemo?: boolean } = {}): EmailClass {
  const e = (email ?? "").trim().toLowerCase();
  if (!e) return "test";
  if (opts.owners?.includes(e)) return "owner";
  const [local, domain = ""] = e.split("@");
  if (THROWAWAY.some((d) => domain === d || domain.endsWith("." + d))) return "throwaway";
  if (opts.isDemo) return "test";
  if (TEST_TLDS.some((t) => domain.endsWith(t))) return "test";
  if (/^example\.(com|org|net)$/.test(domain)) return "test";
  if (/(^|[+._-])(test|demo|fake|dummy)([+._-]|\d|$)/.test(local)) return "test";
  return "real";
}
