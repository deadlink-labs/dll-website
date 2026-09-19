// Basic bot friction, not rate limiting or authentication. Both values can be
// forged by a determined sender. Check before creating any email side effects.
export const MIN_FORM_TIME_MS = 2_000;

export function contactGuard(website: unknown, elapsedMs: unknown): string | null {
  const fallback = "We couldn't send this message. Email hello@deadlinklabs.com instead.";
  // The honeypot. An honest visitor never sees the field, so it arrives empty,
  // and Astro's form parsing turns an empty optional string into `undefined`
  // before the action sees it. Both mean "left alone". Anything else means a
  // bot filled every field it found. (Found 2026-09-19: `typeof website !==
  // 'string'` rejected every honest submission for two days.)
  if (website !== undefined && website !== '') return fallback;
  if (typeof elapsedMs !== 'string' || !/^\d+$/.test(elapsedMs)) return fallback;
  const elapsed = Number(elapsedMs);
  if (!Number.isSafeInteger(elapsed)) return fallback;
  if (elapsed < MIN_FORM_TIME_MS) return 'Please wait a moment, then try sending again.';
  return null;
}
