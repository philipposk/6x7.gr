// Tiny in-memory rate limiter for the public API routes.
//
// On Vercel each serverless instance gets its own Map, so this is a damper,
// not a hard guarantee — an attacker spread across instances can exceed the
// nominal limit. Good enough to stop casual abuse of free endpoints (TTS,
// mascots, contact). Swap for Upstash/Redis if real enforcement is needed.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Periodically drop expired buckets so long-lived instances don't grow.
const SWEEP_EVERY = 5 * 60_000;
let lastSweep = Date.now();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();

  if (now - lastSweep > SWEEP_EVERY) {
    lastSweep = now;
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
  }

  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }

  b.count += 1;
  if (b.count > limit) {
    return { ok: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}

export function clientIp(req: Request): string {
  // Vercel sets x-forwarded-for; first hop is the client.
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

export function tooMany(retryAfterSec: number): Response {
  return new Response(JSON.stringify({ ok: false, error: "rate limited" }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(Math.max(retryAfterSec, 1)),
    },
  });
}
