// Content collections — the web-* rulebook (CLAUDE.md §4).
//
// The build reads ONLY the web-* namespace; every unprefixed Obsidian field is
// tolerated via .passthrough() and ignored. The schema validates every post at
// build time and FAILS THE BUILD on any violation (required validation, §7).
//
// Type is derived from the folder (log | products), never from frontmatter.
// Log nests by year (log/<year>/<slug>/<slug>.md); products stay flat
// (products/<slug>/<slug>.md). The slug is ALWAYS the post's folder name — the
// year segment and the filename never reach the URL.
//
// NOTE — decision flagged for review: the lab-record stamp (CLAUDE.md §3) needs a
// record number, a lab status token, and thread tags, but §4's documented
// frontmatter only defines web-status/title/pub-date/snippet/type. These stamp
// inputs are added here as web-* fields (web-number, web-stage, web-tags), plus
// web-waitlist for products (§5.3). Confirm the naming before authoring real posts.
import { defineCollection, z, type ImageFunction } from 'astro:content';
import { glob } from 'astro/loaders';
import { STATUSES } from './lib/status';
import { parseYouTubeId } from './lib/video';

// The web-* schema, shared by both collections. Hyphenated keys are quoted and
// aliased to clean internal names; .passthrough() tolerates Obsidian-internal
// fields without letting them into output.
//
// Built as a factory so it can receive Astro's image() helper — web-thumb is a
// co-located asset that the build optimizes (used as the feed-card thumbnail and
// the video-facade poster). See CLAUDE.md §3 (imagery) / §4 (image pipeline).
//
// Draft tolerance: ONLY web-status decides visibility. A note with a missing or
// misspelled web-status, or a half-filled draft, must resolve to INVISIBLE, not
// to a build failure — so nothing is required unless the post is published.
const webSchema = (image: ImageFunction) =>
  z
    .object({
      // Visibility gate — public IF AND ONLY IF this is exactly "published" (§4).
      'web-status': z.string().optional(),
      'web-title': z.string().optional(),
      // Sorting + displayed date. For products: the "entered the lab" date.
      'web-pub-date': z.coerce.date().optional(),
      'web-snippet': z.string().optional(),
      // Authoring-only; validated against the folder in src/lib/content.ts.
      'web-type': z.enum(['log', 'products']).optional(),
      // --- stamp inputs (flagged decision, see header) ---
      'web-number': z.number().int().nonnegative().optional(),
      'web-stage': z.enum(STATUSES).optional(),
      'web-tags': z.array(z.string()).optional(),
      // Products only: render a waitlist form on the product page (§5.3).
      'web-waitlist': z.boolean().optional(),
      // --- optional media (both omit gracefully when absent) ---
      // YouTube share URL or bare ID; renders the top-of-post facade + a
      // ▶ marker on the feed card. Parsed to an ID at build (see transform).
      'web-video': z.string().optional(),
      // Self-hosted poster in the post's assets/. Feed-card thumbnail AND the
      // video-facade poster, so no request hits YouTube until play.
      'web-thumb': image().optional(),
    })
    .passthrough()
    .superRefine((data, ctx) => {
      // Published content must carry web-title and web-pub-date (§7). Drafts may
      // be partial; they are invisible anyway.
      if (data['web-status'] === 'published') {
        if (!data['web-title'])
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'published post is missing web-title' });
        if (!data['web-pub-date'])
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'published post is missing web-pub-date' });
      }
      // A set-but-unparseable web-video is an authoring mistake, not a draft —
      // fail loudly rather than silently drop the embed.
      if (data['web-video'] && !parseYouTubeId(data['web-video']))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `web-video "${data['web-video']}" is not a recognizable YouTube URL or ID`,
        });
    })
    .transform((data) => ({
      published: data['web-status'] === 'published',
      title: data['web-title'] ?? '',
      pubDate: data['web-pub-date'] ?? new Date(0),
      snippet: data['web-snippet'],
      declaredType: data['web-type'],
      number: data['web-number'],
      stage: data['web-stage'],
      tags: data['web-tags'] ?? [],
      waitlist: data['web-waitlist'] ?? false,
      videoId: parseYouTubeId(data['web-video']),
      thumb: data['web-thumb'],
    }));

// Slug = the post's own folder name. Enforces the depth of each tree (log is
// year-nested, products flat) and the "<slug>/<slug>.md" filename lint (§7).
const slugFromFolder = (collection: 'log' | 'products') => ({ entry }: { entry: string }) => {
  const parts = entry.split('/');
  const expectedDepth = collection === 'log' ? 3 : 2; // year/slug/file vs slug/file
  if (parts.length !== expectedDepth) {
    throw new Error(
      `[content] ${collection}/${entry}: expected ${
        collection === 'log' ? '<year>/<slug>/<slug>.md' : '<slug>/<slug>.md'
      }`,
    );
  }
  const file = parts[parts.length - 1]!.replace(/\.md$/, '');
  const folder = parts[parts.length - 2]!;
  if (file !== folder) {
    throw new Error(
      `[content] ${collection}/${entry}: file "${file}.md" must be named after its folder "${folder}/"`,
    );
  }
  return folder;
};

const log = defineCollection({
  loader: glob({ pattern: '*/*/*.md', base: './content/log', generateId: slugFromFolder('log') }),
  schema: ({ image }) => webSchema(image),
});

const products = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './content/products', generateId: slugFromFolder('products') }),
  schema: ({ image }) => webSchema(image),
});

export const collections = { log, products };
