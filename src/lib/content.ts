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
    // Off-nav "Client work" proof list (§5.1 band 4). Curation, not
    // frontmatter (§4): name + status label are display; an optional slug links
    // the row to a published log case study.
    clientWork?: { name: string; status: string; slug?: string }[];
    // Off-nav "Throwback" band (§5.1 band 7): pre-lab projects written up from
    // the archive. Curation is just an ordered list of slugs plus the year the
    // work happened; the THROWBACK / 001 label and everything else on the row
    // come from the post's own frontmatter, because the series number is a
    // permanent identifier and must not live in a reorderable array (§4).
    throwbacks?: { status: string; slug: string }[];
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

// LOG feed order (CLAUDE.md §4): highest web-number first (settled 2026-08-10).
// The record number is the log's spine — it is what the stamp prints, what other
// records cite, and what the reader actually scans down the feed — so a feed that
// runs 013, 012, 006, 010, 011 reads as broken even when every date is correct.
// Ordering by number makes the sequence legible; the cost is that dates run out
// of order wherever web-number and web-pub-date disagree. They currently do —
// the archive is being seeded quickly and the dates are placeholders until the
// Obsidian pipeline lands. Known tradeoff (§4), not something to fix here.
//
// web-number is optional (§4), so numberless posts have nothing to sort by. They
// fall to the bottom (-Infinity in a descending compare) and order among
// themselves by date, then slug. Ties MUST resolve deterministically: a bare
// compare returning 0 would, since Array.sort is stable, fall through to the
// glob's read order — effectively the filesystem, which nothing should depend on.
// Numbers are unique among published entries (assertUniqueNumbers), so the
// primary key never ties for a numbered post.
const byRecordNumber = (a: LogEntry, b: LogEntry) => {
  const an = a.data.number ?? -Infinity;
  const bn = b.data.number ?? -Infinity;
  if (an !== bn) return bn - an;
  const byDate = b.data.pubDate.getTime() - a.data.pubDate.getTime();
  if (byDate !== 0) return byDate;
  return a.id.localeCompare(b.id);
};

// PRODUCTS keep date order: newest "entered the lab" first (§4). They carry no
// record number to sort by — the LOG NNN spine is a log thing.
const byRecency = (a: ProductEntry, b: ProductEntry) => {
  const byDate = b.data.pubDate.getTime() - a.data.pubDate.getTime();
  if (byDate !== 0) return byDate;
  return a.id.localeCompare(b.id);
};

export async function getPublishedLog(): Promise<LogEntry[]> {
  const entries = (await getCollection('log')).filter(isPublished);
  validateTypeMatchesFolder(entries, 'log');
  assertUniqueNumbers(entries);
  assertUniqueSeriesNumbers(entries);
  return entries.sort(byRecordNumber);
}

export async function getPublishedProducts(): Promise<ProductEntry[]> {
  const entries = (await getCollection('products')).filter(isPublished);
  validateTypeMatchesFolder(entries, 'products');
  return entries.sort(byRecency);
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

// web-series-number is the same kind of identifier as web-number, one level down:
// "THROWBACK / 001" is printed on the homepage band, stamped on the record, and
// cited from other records, so it must be unique WITHIN ITS SERIES and stable.
// Numbering is per series, so THROWBACK / 001 and (some future) FIELD NOTE / 001
// coexist happily. Published entries only, same reasoning as assertUniqueNumbers.
function assertUniqueSeriesNumbers(entries: LogEntry[]) {
  const seen = new Map<string, string>(); // "SERIES#N" -> slug
  const maxBySeries = new Map<string, number>();
  const dups: string[] = [];
  for (const e of entries) {
    const { series, seriesNumber: n } = e.data;
    if (!series || n == null) continue;
    maxBySeries.set(series, Math.max(maxBySeries.get(series) ?? 0, n));
    const key = `${series}#${n}`;
    const prev = seen.get(key);
    if (prev) {
      const label = `${series} / ${String(n).padStart(3, '0')}`;
      dups.push(
        `${label} is used by "${prev}" and "${e.id}" (next free in ${series}: ${
          (maxBySeries.get(series) ?? 0) + 1
        })`,
      );
    } else seen.set(key, e.id);
  }
  if (dups.length) {
    throw new Error(
      `[content] Duplicate web-series-number among published log entries: ${dups.join('; ')}. ` +
        `Series numbers must be unique within their series and stable (§7).`,
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
  // §5.1 band 4. When linked to a case study, the row also carries that post's
  // title + snippet so the homepage sells the work without a click.
  clientWork: {
    name: string;
    status: string;
    href?: string;
    thumb?: ImageMetadata;
    title?: string;
    snippet?: string;
    record?: string; // "LOG 002" — the linked case study's stamp number (§3)
    tags?: string[]; // domain keywords, band-name tag stripped (see CLIENT_WORK_TAGS)
  }[];
  // §5.1 band 7. Same stamped-list shape as clientWork, but every row links to a
  // real post, and the label comes from the post's own web-series frontmatter.
  throwbacks: {
    label: string; // "THROWBACK / 001"
    status: string; // the year the work happened, e.g. "2006"
    href: string;
    thumb?: ImageMetadata;
    title: string;
    snippet?: string;
    record?: string; // "LOG 013"
    tags?: string[]; // domain keywords, band-name tag stripped (see rowTags)
  }[];
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

  // 4. CLIENT WORK — off-nav proof list (§5.1 band 4). A given slug must resolve
  //    to a published log case study (fail the build on a typo, like heroPosts);
  //    an entry with no slug renders as plain text (client with no post yet).
  const clientWork = (config.homepage.clientWork ?? []).map((c) => {
    if (c.slug) {
      const entry = logBySlug.get(c.slug);
      if (!entry) throw new Error(`[content] clientWork slug "${c.slug}" is not a published log entry (§7).`);
      // Reuse the linked case study's own web-thumb (no separate asset to manage).
      return {
        name: c.name,
        status: c.status,
        href: `/log/${entry.id}`,
        thumb: entry.data.thumb,
        title: entry.data.title,
        snippet: entry.data.snippet,
        // Stamp the row with the case study's record number, like every other
        // record surface (§3). Omitted if the entry carries no web-number.
        record: entry.data.number != null ? recordLabel(entry) : undefined,
        tags: rowTags(entry.data.tags),
      };
    }
    return { name: c.name, status: c.status };
  });

  // 5. THROWBACK — pre-lab records from the archive (§5.1 band 7). Unlike
  //    clientWork every row must resolve, and the post must carry the series
  //    frontmatter that produces its label: a row whose label came from the
  //    config would be a second, drifting source of truth for a permanent number.
  const throwbacks = (config.homepage.throwbacks ?? []).map((t) => {
    const entry = logBySlug.get(t.slug);
    if (!entry) throw new Error(`[content] throwbacks slug "${t.slug}" is not a published log entry (§7).`);
    const label = seriesLabel(entry);
    if (!label) {
      throw new Error(
        `[content] throwbacks slug "${t.slug}" is missing web-series / web-series-number, ` +
          `so it has no series label to stamp (§5.2).`,
      );
    }
    return {
      label,
      status: t.status,
      href: `/log/${entry.id}`,
      thumb: entry.data.thumb,
      title: entry.data.title,
      snippet: entry.data.snippet,
      record: entry.data.number != null ? recordLabel(entry) : undefined,
      tags: rowTags(entry.data.tags),
    };
  });

  return { hero, recent, featuredProducts, clientWork, throwbacks };
}

// --- display helpers ---------------------------------------------------------
// Record label for the stamp: "LOG 001", "EXP 002"… Log entries default to LOG.
export function recordLabel(entry: LogEntry, prefix = 'LOG'): string {
  const n = entry.data.number;
  return n === undefined ? prefix : `${prefix} ${String(n).padStart(3, '0')}`;
}

// Tags that name the band they would be printed in. Every client-work post
// carries one, so printing it on the row says "Client work" twice, and on the
// Crehana row it collided with its own CASE STUDY status label. THROWBACK is
// here for the same reason: the row already stamps THROWBACK / 001.
const BAND_NAME_TAGS = new Set(['CLIENT-WORK', 'CASE-STUDY', 'THROWBACK']);
/** Max tags on a homepage row. LOG 012 carries five, which wrapped to three lines. */
const ROW_TAG_LIMIT = 3;

// Domain keywords for a stamped-list row: the post's own web-tags, minus the
// band-name tag, capped so the meta line stays two lines. Shared by clientWork
// and throwbacks, which are deliberately the same row component (§5.1). The
// full, unfiltered set still renders on the record itself via Stamp.astro, so
// authoring order in web-tags is what decides which three surface here.
function rowTags(tags: string[] = []): string[] | undefined {
  const kept = tags.filter((t) => !BAND_NAME_TAGS.has(t.toUpperCase())).slice(0, ROW_TAG_LIMIT);
  return kept.length > 0 ? kept : undefined;
}

// Series label for the stamp: "THROWBACK / 001". Independent of recordLabel — a
// record can carry both (LOG 013 is also THROWBACK / 001). Undefined unless the
// post declares both halves, so a partially-tagged post renders without a label
// rather than something like "THROWBACK / undefined".
export function seriesLabel(entry: LogEntry): string | undefined {
  const { series, seriesNumber } = entry.data;
  if (!series || seriesNumber == null) return undefined;
  return `${series} / ${String(seriesNumber).padStart(3, '0')}`;
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
