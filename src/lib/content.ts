// Content queries + build-time validation (CLAUDE.md §4/§6/§7).
//
// Everything the pages read about content goes through here: the published-only
// gate, chronological sorting by web-pub-date, the deterministic homepage
// composition, and the validations that FAIL THE BUILD (§7) with a message that
// names the offending file/slug. Throwing here aborts the build — the last live
// deploy stays up.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type LogEntry = CollectionEntry<'log'>;
export type ProductEntry = CollectionEntry<'products'>;

// --- site.config.json — editorial curation (CLAUDE.md §5) ---------------------
export interface SiteConfig {
  homepage: {
    heroPosts: string[];
    recentPostsCount: number;
    featuredProducts?: string[];
    // Off-nav "Shipped for clients" proof list (§5.1 band 6). Curation, not
    // frontmatter (§4): name + status label are display; an optional slug links
    // the row to a published log case study.
    clientWork?: { name: string; status: string; slug?: string }[];
  };
}

function loadSiteConfig(): SiteConfig {
  // Lives at the content-repo root (CLAUDE.md §4); locally that is ./content.
  const path = resolve(process.cwd(), 'content/site.config.json');
  let raw: string;
  try {
    raw = readFileSync(path, 'utf-8');
  } catch {
    throw new Error(`[content] Missing content/site.config.json at ${path}`);
  }
  const cfg = JSON.parse(raw) as SiteConfig;
  const count = cfg.homepage?.recentPostsCount;
  if (!Number.isInteger(count) || count < 0) {
    throw new Error(`[content] site.config.json: recentPostsCount must be a non-negative integer (got ${count}).`);
  }
  return cfg;
}

// --- published-only gate + sorting -------------------------------------------
// Public IF AND ONLY IF web-status is exactly "published" (§4). Anything else —
// draft, typo, or missing — is invisible, so a forgotten tag never leaks.
const isPublished = (entry: LogEntry | ProductEntry) => entry.data.published;
const byDateDesc = (a: LogEntry | ProductEntry, b: LogEntry | ProductEntry) =>
  b.data.pubDate.getTime() - a.data.pubDate.getTime();

export async function getPublishedLog(): Promise<LogEntry[]> {
  const entries = (await getCollection('log')).filter(isPublished);
  validateTypeMatchesFolder(entries, 'log');
  assertUniqueNumbers(entries);
  return entries.sort(byDateDesc);
}

export async function getPublishedProducts(): Promise<ProductEntry[]> {
  const entries = (await getCollection('products')).filter(isPublished);
  validateTypeMatchesFolder(entries, 'products');
  return entries.sort(byDateDesc);
}

// --- validations that fail the build (§7) ------------------------------------
function validateTypeMatchesFolder(entries: (LogEntry | ProductEntry)[], folder: 'log' | 'products') {
  for (const e of entries) {
    if (e.data.declaredType && e.data.declaredType !== folder) {
      throw new Error(
        `[content] "${e.id}": web-type "${e.data.declaredType}" does not match its folder "${folder}".`,
      );
    }
  }
}

// web-number is the PERMANENT record identifier (the "LOG 003" stamp). It is
// cited across the site — backlinks and "this thread continues" between records
// (§5.2), the build videos, external links — so it must be UNIQUE and STABLE and
// must never be derived from a mutable sort order (date-ordering would silently
// renumber every later record the moment a backdated entry is added). This guard
// enforces uniqueness among PUBLISHED log entries only: drafts are invisible, so
// a draft sharing a number is fine and the collision surfaces the moment it is
// republished. Only defined numbers are checked (web-number is optional). On a
// collision the build FAILS (§7), naming the offenders and the next free number;
// the last live deploy stays up.
function assertUniqueNumbers(entries: LogEntry[]) {
  const seen = new Map<number, string>();
  const dups: string[] = [];
  let maxNum = 0;
  for (const e of entries) {
    const n = e.data.number;
    if (n == null) continue;
    if (n > maxNum) maxNum = n;
    const prev = seen.get(n);
    if (prev) dups.push(`LOG ${String(n).padStart(3, '0')} is used by "${prev}" and "${e.id}"`);
    else seen.set(n, e.id);
  }
  if (dups.length) {
    throw new Error(
      `[content] Duplicate web-number among published log entries: ${dups.join('; ')}. ` +
        `Record numbers must be unique and stable (§7). Next free number: ${maxNum + 1}.`,
    );
  }
}

function assertGloballyUniqueSlugs(log: LogEntry[], products: ProductEntry[]) {
  const seen = new Map<string, string>();
  for (const e of [...log, ...products]) {
    const where = e.collection;
    if (seen.has(e.id)) {
      throw new Error(`[content] Duplicate slug "${e.id}" in both ${seen.get(e.id)} and ${where}. Slugs are globally unique (§7).`);
    }
    seen.set(e.id, where);
  }
}

// --- deterministic homepage composition (CLAUDE.md §6) ------------------------
export interface HomepageData {
  hero: LogEntry[]; // heroPosts, array order = display order
  recent: LogEntry[]; // chronological slice, excluding heroPosts
  featuredProducts: ProductEntry[]; // featuredProducts, array order
  clientWork: { name: string; status: string; href?: string; thumb?: ImageMetadata }[]; // §5.1 band 6
}

export async function getHomepageData(): Promise<HomepageData> {
  const config = loadSiteConfig();
  const log = await getPublishedLog();
  const products = await getPublishedProducts();
  assertGloballyUniqueSlugs(log, products);

  const logBySlug = new Map(log.map((e) => [e.id, e]));
  const productBySlug = new Map(products.map((e) => [e.id, e]));

  // 1. HERO — every heroPosts slug must resolve to a published log entry (§7).
  const heroSlugs = config.homepage.heroPosts ?? [];
  const hero = heroSlugs.map((slug) => {
    const entry = logBySlug.get(slug);
    if (!entry) throw new Error(`[content] heroPosts slug "${slug}" is not a published log entry (§7).`);
    return entry;
  });

  // 2. RECENT — published logs excluding heroPosts, newest first, first N.
  const heroSet = new Set(heroSlugs);
  const recent = log.filter((e) => !heroSet.has(e.id)).slice(0, config.homepage.recentPostsCount);

  // 3. FEATURED PRODUCTS — every slug must resolve to a published product (§7).
  const featuredProducts = (config.homepage.featuredProducts ?? []).map((slug) => {
    const entry = productBySlug.get(slug);
    if (!entry) throw new Error(`[content] featuredProducts slug "${slug}" is not a published product (§7).`);
    return entry;
  });

  // 4. CLIENT WORK — off-nav proof list (§5.1 band 6). A given slug must resolve
  //    to a published log case study (fail the build on a typo, like heroPosts);
  //    an entry with no slug renders as plain text (client with no post yet).
  const clientWork = (config.homepage.clientWork ?? []).map((c) => {
    if (c.slug) {
      const entry = logBySlug.get(c.slug);
      if (!entry) throw new Error(`[content] clientWork slug "${c.slug}" is not a published log entry (§7).`);
      // Reuse the linked case study's own web-thumb (no separate asset to manage).
      return { name: c.name, status: c.status, href: `/log/${entry.id}`, thumb: entry.data.thumb };
    }
    return { name: c.name, status: c.status };
  });

  return { hero, recent, featuredProducts, clientWork };
}

// --- display helpers ---------------------------------------------------------
// Record label for the stamp: "LOG 001", "EXP 002"… Log entries default to LOG.
export function recordLabel(entry: LogEntry, prefix = 'LOG'): string {
  const n = entry.data.number;
  return n === undefined ? prefix : `${prefix} ${String(n).padStart(3, '0')}`;
}

export function formatDate(date: Date): string {
  // UTC, so a bare ISO date (midnight UTC) never shifts a day in local time.
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date);
}
