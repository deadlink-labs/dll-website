// Status system — single source of truth (CLAUDE.md §3).
// Statuses render as a dot + mono token: "● IN PROGRESS".

export const STATUSES = [
  'IN PROGRESS',
  'TESTING',
  'SETTLED',
  'ROUGH',
  'RESEARCH',
  'PRIVATE BETA',
  'REVISED',
  'SHIPPED',
  'COMING SOON',
] as const;

export type Status = (typeof STATUSES)[number];

export type DotKind =
  | 'pulse' // active / on the bench: signal orange, pulsing
  | 'coming' // coming soon: signal orange, static
  | 'filled' // shipped / private beta / settled: filled ink
  | 'outline'; // research / rough: ink outline

export function dotKind(status: Status): DotKind {
  switch (status) {
    case 'IN PROGRESS':
    case 'TESTING':
      return 'pulse';
    case 'COMING SOON':
      return 'coming';
    case 'SHIPPED':
    case 'PRIVATE BETA':
    case 'SETTLED':
    case 'REVISED':
      return 'filled';
    case 'RESEARCH':
    case 'ROUGH':
      return 'outline';
  }
}

/** Active statuses get their stamp token in signal orange (§3). */
export function isActiveStatus(status: Status): boolean {
  const kind = dotKind(status);
  return kind === 'pulse' || kind === 'coming';
}

/** Display date as MM.YYYY, the stamp convention (§3). */
export function stampDate(d: Date): string {
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${mm}.${d.getUTCFullYear()}`;
}
