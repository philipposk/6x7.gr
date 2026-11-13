import "server-only";

type Entry = { value?: unknown; at: number; pending?: Promise<unknown> };
const g = globalThis as unknown as { __adminCache?: Map<string, Entry> };
const store = (g.__adminCache ??= new Map());

/**
 * Small in-memory stale-while-revalidate cache for the admin panel (owner-only data,
 * per server instance). Fresh for `freshMs`: returned as is. Older but under `maxMs`:
 * returned at once while a refresh runs in the background. Older or missing: awaited.
 * Results for which `keep` returns false (e.g. a DB error) are not stored.
 */
export function swr<T>(key: string, load: () => Promise<T>, opts: { freshMs?: number; maxMs?: number; keep?: (v: T) => boolean } = {}): Promise<T> {
  const { freshMs = 60_000, maxMs = 10 * 60_000, keep = () => true } = opts;
  const e = store.get(key);
  const age = e ? Date.now() - e.at : Infinity;

  const refresh = () => {
    const cur = store.get(key);
    if (cur?.pending) return cur.pending as Promise<T>;
    const p = load()
      .then((v) => {
        if (keep(v)) store.set(key, { value: v, at: Date.now() });
        else { const c = store.get(key); if (c) delete c.pending; }
        return v;
      })
      .catch((err) => { const c = store.get(key); if (c) delete c.pending; throw err; });
    store.set(key, { ...(cur ?? { at: 0 }), pending: p });
    return p;
  };

  if (e && "value" in e && age < freshMs) return Promise.resolve(e.value as T);
  if (e && "value" in e && age < maxMs) {
    refresh().catch(() => {});
    return Promise.resolve(e.value as T);
  }
  return refresh();
}
