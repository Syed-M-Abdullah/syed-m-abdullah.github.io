/**
 * Small in-memory fixed-window rate limiter. Good enough for a contact form on one server or
 * serverless instance; counters reset when the process restarts.
 */
export function createRateLimiter({ windowMs, max }) {
  const hits = new Map();

  return function check(key) {
    const now = Date.now();
    let entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }
    entry.count += 1;

    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }

    return {
      allowed: entry.count <= max,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  };
}
