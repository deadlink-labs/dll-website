// Content collections — the web-* rulebook (CLAUDE.md §4).
//
// The build reads ONLY the web-* namespace; every unprefixed Obsidian field is
// tolerated via .passthrough() and ignored. The schema validates every post at
// build time and FAILS THE BUILD on any violation (required validation, §7).
//
// Type is derived from the folder (log | products), never from frontmatter.
// Log nests by year (log/<year>/<slug>/<title>.md); products stay flat
// (products/<slug>/<title>.md). The slug is ALWAYS the post's folder name — the
// year segment and the filename never reach the URL. The .md file is named for
// the post's TITLE (readable in Obsidian — switcher, graph, backlinks), not the
// folder, so the filename is intentionally free-form.
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
      // Products only: a short lead shown above the waitlist/beta form. When
      // present, the page splits lead -> form -> full Content (below the form)
      // instead of the default Content -> form order. Paragraphs separated by a
      // blank line, plain text (not parsed as markdown).
      'web-lead': z.string().optional(),
      // Products only: a display price ("USD 97"). When present the page renders
      // a buy block in place of the waitlist. The button is a placeholder until a
      // payment provider is chosen (CLAUDE.md §5.3: no checkout in v1), and the
      // rule "no prices until purchasable" means this stays unset on a published
      // product until the thing can actually be bought.
      'web-price': z.string().optional(),
      // Products only, with web-price: where the button goes (a Whop / checkout
      // URL). Absent -> the button is a labelled placeholder. And the one-
      // paragraph fulfilment note under the button (plain text), because how a
      // buyer gets access differs per product and per provider.
      'web-buy-url': z.string().url().optional(),
      'web-buy-note': z.string().optional(),
      // Authoring-only; validated against the folder in src/lib/content.ts.
      'web-type': z.enum(['log', 'products']).optional(),
      // --- stamp inputs (flagged decision, see header) ---
      'web-number': z.number().int().nonnegative().optional(),
      'web-stage': z.enum(STATUSES).optional(),
      'web-tags': z.array(z.string()).optional(),
      // --- series membership (CLAUDE.md §5.2) ---
      // A record may also belong to a named series that numbers independently of
      // web-number: THROWBACK / 001 is LOG 013. Like web-number, the pair is a
      // PERMANENT public identifier and is authored by hand, never derived from
      // the curation array in site.config.json (a mutable array would silently
      // renumber records). Uniqueness is enforced per series in src/lib/content.ts.
      'web-series': z.string().optional(),
      'web-series-number': z.number().int().positive().optional(),
      // Products only: render a waitlist form on the product page (§5.3).
      'web-waitlist': z.boolean().optional(),
      // --- optional media (both omit gracefully when absent) ---
      // YouTube share URL or bare ID; renders the top-of-post facade + a
      // ▶ marker on the feed card. Parsed to an ID at build (see transform).
      'web-video': z.string().optional(),
      // Self-hosted poster in the post's assets/. Feed-card thumbnail AND the
      // video-facade poster, so no request hits YouTube until play.
      'web-thumb': image().optional(),
      // Alt text and caption for the header image. Separate on purpose: alt
      // DESCRIBES the image for someone who cannot see it, the caption ADDS
      // something for everyone (provenance, what you are looking at). A
      // generated tile restating the post title wants alt and no caption; a
      // photograph that is evidence wants both. Absent alt leaves the header
      // decorative, which is correct for a tile and wrong for a photograph.
      'web-thumb-alt': z.string().optional(),
      'web-thumb-caption': z.string().optional(),
      // Products only: the real UI capture that replaces ProductCard's
      // "Capture pending" placeholder once a screen exists to show.
      'web-image': image().optional(),
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
      lead: data['web-lead'],
      price: data['web-price'],
      buyUrl: data['web-buy-url'],
      buyNote: data['web-buy-note'],
      declaredType: data['web-type'],
      number: data['web-number'],
      stage: data['web-stage'],
      tags: data['web-tags'] ?? [],
      series: data['web-series'],
      seriesNumber: data['web-series-number'],
      waitlist: data['web-waitlist'] ?? false,
      videoId: parseYouTubeId(data['web-video']),
      thumb: data['web-thumb'],
      thumbAlt: data['web-thumb-alt'],
      thumbCaption: data['web-thumb-caption'],
      image: data['web-image'],
    }));

// Slug = the post's own folder name. The .md inside is named for the post's TITLE
// (readable in Obsidian), NOT the folder, so the filename is free-form and never
// reaches the URL. Enforces only the depth of each tree (log is year-nested,
// products flat); assumes one .md per post folder.
const slugFromFolder = (collection: 'log' | 'products') => ({ entry }: { entry: string }) => {
  const parts = entry.split('/');
  const expectedDepth = collection === 'log' ? 3 : 2; // year/slug/file vs slug/file
  if (parts.length !== expectedDepth) {
    throw new Error(
      `[content] ${collection}/${entry}: expected ${
        collection === 'log' ? '<year>/<slug>/<title>.md' : '<slug>/<title>.md'
      }`,
    );
  }
  return parts[parts.length - 2]!; // the folder name = the slug
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
