export function Card({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-neutral-800 bg-neutral-900 p-4 ${className}`}>
      {title && <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">{title}</h2>}
      {children}
    </section>
  );
}
export function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <div className="text-xs text-neutral-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {hint && <div className="mt-1 text-xs text-neutral-500">{hint}</div>}
    </div>
  );
}
export function Notice({ children }: { children: React.ReactNode }) {
  return <div className="rounded border border-amber-700/50 bg-amber-950/40 px-3 py-2 text-amber-200">{children}</div>;
}
const CLS: Record<string, string> = {
  real: "bg-emerald-900 text-emerald-200", owner: "bg-sky-900 text-sky-200",
  test: "bg-neutral-700 text-neutral-200", throwaway: "bg-rose-950 text-rose-300",
};
export function Badge({ v }: { v: string }) {
  return <span className={`rounded px-1.5 py-0.5 text-xs ${CLS[v] ?? "bg-neutral-800 text-neutral-300"}`}>{v}</span>;
}
export function Dot({ ok }: { ok: boolean | null }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${ok == null ? "bg-neutral-600" : ok ? "bg-emerald-400" : "bg-rose-500"}`} />;
}
export const fmt = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleString("en-GB", { timeZone: "Europe/Copenhagen", dateStyle: "short", timeStyle: "short" }) : "—";
export function ago(iso: string | number | null | undefined) {
  if (!iso) return "—";
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}
/** Tiny inline bar chart. */
export function Bars({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  return (
    <div className="flex h-8 items-end gap-px">
      {values.map((v, i) => <div key={i} title={String(v)} className="w-1.5 bg-sky-500/70" style={{ height: `${(v / max) * 100}%`, minHeight: v ? 2 : 0 }} />)}
    </div>
  );
}
export function weekly(dates: string[], weeks = 12) {
  const now = Date.now(); const out = Array(weeks).fill(0);
  for (const d of dates) { const w = Math.floor((now - new Date(d).getTime()) / (7 * 86400e3)); if (w >= 0 && w < weeks) out[weeks - 1 - w]++; }
  return out;
}
/** Days since an ISO date (module-level so render stays lint-pure). */
export function ageDays(iso: string | null | undefined) {
  return iso ? (Date.now() - new Date(iso).getTime()) / 86400e3 : Infinity;
}
