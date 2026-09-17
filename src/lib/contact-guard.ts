// Basic bot friction, not rate limiting or authentication. Both values can be
// forged by a determined sender. Check before creating any email side effects.
export const MIN_FORM_TIME_MS = 2_000;

export function contactGuard(website: unknown, elapsedMs: unknown): string | null {
  const fallback = "We couldn't send this message. Email hello@deadlinklabs.com instead.";
  if (typeof website !== 'string' || website !== '') return fallback;
  if (typeof elapsedMs !== 'string' || !/^\d+$/.test(elapsedMs)) return fallback;
  const elapsed = Number(elapsedMs);
  if (!Number.isSafeInteger(elapsed)) return fallback;
  if (elapsed < MIN_FORM_TIME_MS) return 'Please wait a moment, then try sending again.';
  return null;
}
