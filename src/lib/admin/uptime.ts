import "server-only";

export interface Probe { url: string; ok: boolean; status: number | null; ms: number | null; error?: string }

export async function probe(url: string): Promise<Probe> {
  const t = Date.now();
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow", cache: "no-store", signal: AbortSignal.timeout(8000) });
    return { url, ok: res.status < 400, status: res.status, ms: Date.now() - t };
  } catch (e) {
    return { url, ok: false, status: null, ms: null, error: (e as Error).name };
  }
}

export async function probeAll(urls: string[]) {
  return Promise.all(Array.from(new Set(urls)).map(probe));
}
