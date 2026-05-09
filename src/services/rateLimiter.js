const requestTracker = new Map();

const WINDOW_SIZE_MS = process.env.WINDOW_SIZE_MS || 60 * 1000;
const MAX_REQUESTS = process.env.MAX_REQUESTS || 20;

export const isRateLimited = (ip) => {
  const currentTime = Date.now();

  if (!requestTracker.has(ip)) {
    requestTracker.set(ip, []);
  }

  const timestamps = requestTracker.get(ip);
  const validTimestamps =
    timestamps.filter(
      (time) =>
        currentTime - time <
        WINDOW_SIZE_MS
    );

  validTimestamps.push(currentTime);
  requestTracker.set(ip, validTimestamps);

  return (
    validTimestamps.length >
    MAX_REQUESTS
  );
}