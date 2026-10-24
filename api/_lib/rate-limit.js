/**
 * In-memory sliding window rate limiter for Serverless Function invocations.
 */
const attemptsMap = new Map();
const CLEANUP_INTERVAL_MS = 60 * 1000;
let lastCleanup = Date.now();

/**
 * Checks if the identifier has exceeded the max allowed attempts in the time window.
 * @param {string} key - Unique identifier (e.g. IP + action)
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} windowSeconds - Duration of window in seconds
 * @returns {{ allowed: boolean, remaining: number, retryAfter: number }}
 */
export function checkRateLimit(key, maxAttempts = 6, windowSeconds = 60) {
  const now = Date.now();

  // Periodic cleanup of stale entries
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    lastCleanup = now;
    for (const [k, v] of attemptsMap.entries()) {
      if (now - v.startTime > windowSeconds * 1000) {
        attemptsMap.delete(k);
      }
    }
  }

  let record = attemptsMap.get(key);
  if (!record || now - record.startTime > windowSeconds * 1000) {
    record = { count: 1, startTime: now };
    attemptsMap.set(key, record);
    return { allowed: true, remaining: maxAttempts - 1, retryAfter: 0 };
  }

  if (record.count >= maxAttempts) {
    const elapsedSeconds = Math.floor((now - record.startTime) / 1000);
    const retryAfter = Math.max(1, windowSeconds - elapsedSeconds);
    return { allowed: false, remaining: 0, retryAfter };
  }

  record.count += 1;
  return { allowed: true, remaining: maxAttempts - record.count, retryAfter: 0 };
}

/**
 * Extracts client IP from standard request headers.
 */
export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
}
