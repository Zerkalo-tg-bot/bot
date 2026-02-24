const userRequests = new Map<number, number[]>();
const LIMIT = 10;
const WINDOW_MS = 60_000;

export function canRequest(userId: number) {
  const now = Date.now();
  const timestamps = userRequests.get(userId) || [];

  const recent = timestamps.filter((ts) => now - ts <= WINDOW_MS);

  if (recent.length >= LIMIT) return false;

  recent.push(now);
  userRequests.set(userId, recent);
  return true;
}
