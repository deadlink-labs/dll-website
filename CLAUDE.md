# CLAUDE.md — Deadlink Labs Website

Project brief and source of truth for building **deadlinklabs.com**.
Read this file in full before writing any code. When in doubt, this file wins over assumptions.

Two companion documents in `my_assets/` are the authorities this brief is reconciled against:
- **`Deadlink Labs Design Brief-handoff.zip`** — the final visual handoff (Claude Design). The settled direction is **design 8A ("Bridge Truss")**; §3 below is derived from it.
- **`DLL Web - Structure v2.md`** — the authoritative information-architecture and build spec. §2, §4, §5 below are derived from it.

`my_assets/video-scripts/` holds scripts for videos documenting the build process (e.g. the LOG 001 video). These are reference material only — never site content (see §8). When editing a script, check that every technical step it describes still matches this brief (stack, folder names, versioning, build order).

---

## 1. What this is

The personal laboratory and professional home of **Marcelo Brouard**: 20+ years of making operations run better with technology (post-production teams, pipeline automation, data and dashboards, AI workflows, home automation, web). It is first a **creative laboratory** — a living, growing archive where the work speaks before the person — and, through that lab, a **proof-of-work archive** that also serves as a consulting funnel and, eventually, a small product storefront.

Register (from Structure v2): a working lab, not a startup site or portfolio. Visitors discover the work first, the artifacts second, the person last. *Build to understand. Document to remember. Share so others can build further.*

**Primary goals, in order:**
1. Attract consulting clients (small businesses, ops leads, founders) — surfaced *through* the lab (a "Work with me" destination, reachable off the main nav; see §5).
2. Give recruiters and collaborators a fast, undeniable picture of how Marcelo thinks and what he ships.
3. Host Deadlink Labs products (Cassette Mixtapes, Hazefield) with waitlists until purchasable.

**The 90-second test:** a recruiter landing cold must, within 90 seconds, learn who Marcelo is, the arc from sound post to AI-assisted building, 2–3 concrete shipped things, and how to contact him.

**Tone rule (non-negotiable):** the site never describes Marcelo with adjectives ("creative", "detail-oriented", "passionate"). It shows artifacts, decisions, and numbers, and lets the reader conclude. Exactly ONE thing on the site *asks* for anything (Work with me). No CTAs mid-article, no popups, no floating buttons. One sanctioned exception: the footer carries a single quiet availability **signal** — a warm `Let's make something together →` line that routes to the About Work-with-me section — for recruiters and collaborators (goal #2, and the 90-second "how to contact him" test). It is a signal, not a second ask: no new page, no button, no interruption, and it funnels to the one ask.

---

## 2. Brand architecture

- **Domain:** deadlinklabs.com (canonical). Site masthead = Deadlink Labs.
- **Person-first content:** "Marcelo Brouard" appears in the masthead running head and in the site `<title>` template (e.g. `Deadlink Labs — Marcelo Brouard` on home; `{Page} · Deadlink Labs` elsewhere, with Marcelo's name in meta description and JSON-LD Person schema). Googling "Marcelo Brouard" must find this site.
- Deadlink Labs is Marcelo's laboratory. The lab is the format; Marcelo is the subject.
- **Brand mark:** the **network mark** (see §3) — a growth graph of ink nodes and hairlines resolving onto one live orange node. The dead link resolves. This is the logo and the cover device.

### Navigation
Intentionally minimal (Structure v2 §2):

```
Home   Log   Products   About
```

Do not add sections unless they serve a fundamentally different purpose. The consulting funnel (Work with me, client case studies) lives *off* this nav — surfaced on Home and About and reached by CTA, not as a top-level item.

---

## 3. Design system

Derived from design **8A** in the handoff. The brief confirms most of what follows; the specifics below are locked.

### Feel
A working **lab notebook**, presented as a **sheet of paper on a desk**. Warm paper, ink, instrument-panel labels. Calm, timeless, precise, editorial. Influences: Teenage Engineering (light, industrial, mono labels), Swiss editorial, research notebooks. NOT: dark-mode dev portfolio, AI glow, gradients, startup landing page. The work is always more important than the interface.

### Signature elements (two)

**1. The network mark (the "growth graph" — engineered, evolved from 8A "Bridge Truss").** Twelve nodes on a square modular grid (module 44), three angle families only (horizontal, vertical, 45°) — engineered precision, Rams/TE, never organic jitter and never a literal bridge truss. Each node is a thought; the structure records how they connect and grow. **Completeness decreases as it rises** (the growth gradient): a fully braced 2×2 fabric at the lower-left → an open spanning triangle → one bare reach hairline → the **live node** at the top-right frontier. Hidden ordering device: the **growth axis** — one straight 45° line from the fabric's origin corner (0,0) through its far corner (2,2), along the span's hypotenuse to (4,4), up the bare reach to the live node at (6,6); the fabric's other diagonals are parallel to it. The live node is signal orange (`#F04A00`, r≈6.5); settled nodes are ink (r≈3.6); segments are 1px ink hairlines at ~0.85 opacity. It reads as *the dead link resolves — at the end of the through-line*. This is the mark for the homepage cover and the logo (small-size variant to be derived later; cover is the reference). Motion: the structure is present at first paint; a small orange **spark travels the growth axis** (~1.1s), axis nodes bump as it passes, the reach hairline draws under it, and the live node ignites on arrival. After the entrance, a quiet **ambient echo**: every ~12s a much fainter spark repeats the journey and the halo swells once as it arrives; otherwise the mark is still. The pulse is a sanctioned exception to the "respond, don't perform" motion rule, confined to the cover mark.

**2. The lab-record stamp.** Every content record (log entry, product) opens with a monospace metadata block, like an entry in a research log:

```
LOG 012 · IN PROGRESS · TESTING · LOCAL-LLM / HOME-ASSISTANT / PYTHON
```

Stamps use Plex Mono, uppercase, letter-spaced, small size, ink at ~60% opacity, with the status token in signal orange when active. Records are numbered (LOG 012, EXP 002, DEC 014…). This system is the site's identity: it appears consistently on every record and in list items (feeds show number + status dot + title + date).

### Cover / title page (per 8A)
The homepage opens with a quiet cover above the fold:
- The **8A truss mark**, centered, large negative space around it.
- Below it: `Deadlink Labs` (Plex Mono, ~15px, `letter-spacing: 0.34em`, uppercase) and `Build to Understand.` (Plex Mono, ~11.5px, `letter-spacing: 0.16em`, uppercase, ink-60).
- A dashed **viewport-fold marker**; the first experiment peeks below the fold so the visitor scrolls naturally into it.
- No hero marketing, no welcome copy, no CTA on the cover (matches Structure v2 §4.1).

### Masthead / running head (the 8A header)
A hairline-topped-and-bottomed band, Plex Mono, uppercase, letter-spaced:
- **Left:** `Deadlink Labs · A working laboratory · Marcelo Brouard · Buenos Aires` — the `Deadlink Labs` token slightly bolder (`weight 500`, `letter-spacing: 0.22em`); the rest ink-60.
- **Right:** `Last updated MM.YYYY` (ink at ~50%).

This is a running head (identity + provenance), distinct from the four-item nav.

### Color tokens
Deliberately NOT the cream-and-terracotta AI default. The desk is neutral-warm, the paper sheet sits on it, and the accent is a saturated **instrument/safety orange**, not clay.

| Token | Hex | Use |
|---|---|---|
| `--desk` | `#E7E4DE` | Outer canvas behind the sheet (body background) |
| `--paper` | `#F7F5F1` | The paper sheet — page/content surface |
| `--paper-raised` | `#FFFFFF` | Cards, decision-register tables, code-panel frames |
| `--ink` | `#191714` | Body text, headlines, settled nodes |
| `--ink-60` | `rgba(25,23,20,0.62)` | Stamps, metadata, captions |
| `--ink-15` | `rgba(25,23,20,0.15)` | Hairline rules, borders, sheet edge |
| `--signal` | `#F04A00` | Live node, status dots, links on hover, active stamps, focus rings |
| `--panel` | `#14120F` | Dark panels ONLY: code blocks, terminal captures, video frames |
| `--panel-deep` | `#0E0C0A` | Deeper terminal inset (a specimen inside a dark panel) |

**The paper-sheet-on-desk pattern:** content sits on a paper sheet floated over the desk — `background: var(--paper)`, `border: 1px solid var(--ink-15)`, `box-shadow: 0 30px 80px -40px rgba(25,23,20,0.35)`. The sheet is divided into **stamped bands by hairline rules** (`--ink-15`, 1px), not by gaps between cards.

Orange is scarce by design: the live node, status dots, link hover/underline accents, the occasional active stamp token. If a screen has more than ~3 orange elements visible, remove some.

### Typography
- **IBM Plex Sans** — headlines and body. Headlines: weight 600, tight leading. Body: weight 400, 17px/1.65 on desktop, max measure ~68ch.
- **IBM Plex Mono** — stamps, labels, dates, status tokens, masthead, code. Uppercase + `letter-spacing: 0.10–0.18em` for labels; normal case for code.
- **Type scale (desktop):** 60 / 44 / 30 / 24 / 20 / 17 / 15 / 14 / 12.5 / 11. Mobile scales down one step.
  - `60` — homepage hero (the current experiment's question), line-height 1.06.
  - `44` — page/record titles, line-height 1.1.
- **Headline tracking:** large headlines use tight **negative** letter-spacing (−0.02em to −0.025em). (This supersedes any earlier "no letter-spacing tricks" guidance — the negative tracking on big Plex Sans headlines is intentional and part of the 8A look.)
- No decorative or serif faces anywhere.

### Layout
- The sheet is ~**1120px** wide for the homepage and index pages; long-form record pages are narrower (~**920px**) with wide gutters. Generous margins; the sheet floats on the desk.
- **64px** horizontal gutters inside the sheet. Lab-sheet blocks use a **150px mono label column** + content column (`grid-template-columns: 150px 1fr`).
- Prose measure ~640–720px. Long-form pages read like documents: continuous prose with embedded images/video where they earn it. NO alternating image/text marketing blocks. NO full-bleed hero images.
- Hairline rules (`--ink-15`, 1px) separate sections. Zero border-radius on rules and stamps; 4px max on cards/thumbnails.
- Dark panels (`--panel`) frame code blocks, terminal output, and video embeds — specimens in the notebook. Everything else stays on paper.

### Status system (single source of truth)
- Statuses render as a dot + mono token: `● IN PROGRESS`.
- **Status vocabulary** (from 8A): `IN PROGRESS`, `TESTING`, `SETTLED`, `ROUGH`, `RESEARCH`, `PRIVATE BETA`, `REVISED`, `SHIPPED`. Decision-register entries use `SETTLED` / `TESTING` / `REVISED`.
- **Dot styles:** active / on-the-bench (in-progress, testing) = signal orange, **pulsing**; shipped / private-beta = filled ink; research = ink outline; archived / muted = ink-15; coming-soon = signal orange (static).
- **Products page rule:** an item appears under Products ONLY if it is a mature artifact — purchasable, waitlist-ready, or a released/documented tool. Everything else is a log entry.

### Motion
**CSS-first** (Astro ships zero JS by default; the 8A animations are pure CSS keyframes). The test for every animation: does it RESPOND to the visitor's action, or PERFORM at them? Respond stays, perform goes.
Allowed: the cover-mark signal pulse on load and its rare ambient echo (see §3 signature element 1), micro-interactions (hover states on feed items/cards, link transitions, status-dot pulse on in-progress), ONE subtle staggered entrance on feed lists, smooth layout transitions when filtering the Log. Damped, precise, instrument-like — Teenage Engineering feel.
Framer Motion is NOT a baseline dependency; use it only inside an explicitly hydrated island if a specific interaction genuinely needs it.
Banned: scroll-triggered reveals on prose, parallax, hero choreography, anything that moves while the visitor is reading.

**This list is a default, not a gate** (settled 2026-08-06). A post gets the motion that post needs. When movement genuinely adds to the experience — a workflow a recruiter can watch run, a diagram whose whole subject is flow — build it, in the house register, and update this section. What does not change: the taste, the three colours, and the ban on anything that moves under prose the visitor is reading. The earlier framing that made the cover mark "the one sanctioned performing motion" was too tight and is retired; treat each case on whether it earns its place.

**Animating a specimen tile.** `remark-svg-specimen` inlines tiles as real vectors and strips only `width`, `height` and `font-family`, so a `class` on an element survives into the page and CSS in [`src/pages/log/[slug].astro`](src/pages/log/[slug].astro) can drive it. Keep the static form in the `.svg` itself (a `stroke-dasharray`, say) so the file still reads as a finished diagram opened anywhere else, and put only the movement in CSS. Guard it with `prefers-reduced-motion`. Reference: the `.flow` marching dashes on LOG 011's `pipeline.svg` and the `@keyframes specimen-flow` rule. Cover tiles get no animation: they are rasterized to `.webp`.

### Imagery
Almost none. YouTube thumbnails carry visuals in log feeds. One portrait of Marcelo on the About page. No stock, no 3D renders, no AI-generated imagery.

**Every record carries a header image.** Each post opens with contained header media (record width, 16:9, rounded — never a full-bleed hero): the video facade when `web-video` is set, otherwise the `web-thumb`. When a post has no photograph to earn the slot, generate an **on-brand graphite specimen tile** in the house style (mono labels, a scarce orange live node — see LOG 001's network-mark tile and LOG 003's pipeline tile) rather than reaching for stock or AI imagery. The same `web-thumb` is reused on the homepage feed card and the Shipped-for-clients band.

**A cover never carries its record number** (settled 2026-08-06). The feed row, the clients band and the record stamp all print `LOG 0NN` right beside the image, so putting it in the image says it twice and, worse, freezes it: renumber the record and the artwork is wrong, in a raster, in the OG card, in whatever social already cached it. The stamp line on a cover carries status and kind only (`SHIPPED · CASE STUDY`), never the number. This applies to `npm run cover --stamp` too.

**A cover is a poster, not a slide.** Two elements is usually the ceiling at feed-card size. If the artwork can carry it, let the artwork carry it alone and drop the headline: LOG 011's cover is a phone and a flow diagram with no words of its own, and it reads at 310px better than the version that had a three-line headline above it.

**Redraw in English; quote in the original.** An artifact rebuilt for the site is site content and reads in the site's language, even when the source was Spanish. An artifact brought in *verbatim* — a screen capture, an export, the client's own canvas — keeps its language, because it is evidence and translating it makes it a reconstruction. LOG 011 has both: `pipeline.svg` is the deck's own n8n canvas and stays in Spanish; every other artifact in that post was redrawn and is in English. Say which is which in the caption.

**When the post already has artwork, use the artwork** (settled 2026-08-06, LOG 011). A client deck, a real dashboard, a tool's own canvas: bring it in at full fidelity, colour and motion included, and let it sit on the paper as a specimen. The site's palette is narrow because most posts have nothing to show, not because colour is banned — a source with its own considered design system usually sits on the paper without a fight (the LOG 011 deck's `#F1EFEA` paper and `#C0451A` accent are within a hair of `--paper` and `--signal`). **`npm run cover` is for posts with no artwork of their own.** It draws one staircase and swaps the words, so two posts generated from it look like the same image — which is exactly what happened to LOG 010 and LOG 011 before this rule existed. If the post ships with something worth looking at, build the cover out of that instead. Two covers that differ only in wording is a failure of the cover, not a success of the system.

### Specimen tiles (the settled system)

The graphite tiles are the site's only house-made imagery. Their alignment is
**computed, not drawn** — station positions derive from label widths, which is how
a legend row lands flush on both margins. The constants and the arithmetic live in
[`src/lib/tile-system.mjs`](src/lib/tile-system.mjs); import it rather than
retyping numbers. Nudging a tile in a visual editor breaks the derivation silently,
which is why Canva/Figma round-trips are not part of this workflow.

**Canvas and rail.** 1280×720, 64px margin, content box x 64 → 1216 (1152 wide).
Three colours only: `--panel #23201b`, `--on-panel #ece8e1` (modulated by opacity),
`--signal #f04a00`.

**Instrument-panel type scale.** Hierarchy comes from big jumps, not gentle steps —
hero-to-eyebrow is roughly **5:1**. One hero per tile, and it must be a *fact*, not
a label; if the title outranks the number, the tile has no focal point.

| Role | Size | Opacity | Contrast on panel |
|---|---|---|---|
| Eyebrow | 24 | 0.45 | 3.79:1 |
| Micro | 22 | 0.45 | 3.79:1 |
| Support label | 28 | 0.55 | 4.98:1 |
| Secondary value | 56–96 | 0.55–0.75 | ≥4.98:1 |
| Hero | 110–130 | 0.95 | 10.99:1 |

**Contrast floor: nothing carrying words below 0.45.** The 0.32 tier used early on
computed to 2.59:1 and failed every WCAG threshold.

**Cover tiles — four zones** (`assets/thumb.svg`, one per post): stamp baseline
100 · optional modular client mark 152–230 · wordmark 222 · subtitle 272 · graphic
320–590 · legend 660. Generate with `npm run cover` (see
[`scripts/generate-cover.mjs`](scripts/generate-cover.mjs)); it derives the
staircase stations from the legend widths and **fails naming the offending label**
if anything would cross the rail or collide.

**Hard rules for every tile:**
- **Exactly one orange live node**, as a faint halo plus a solid dot. If a tile
  has two, one is wrong.
- **No separator hairlines.** Only chart elements may be lines: axes, target
  lines, gauge tracks, timeline spines, meter ticks. Rules that merely divide were
  removed on purpose — they added nothing and read as clutter.
- Labels sized so the tile survives its smallest render. A tile shows at **310
  CSS px on a phone**, a 0.242 scale: a 120px hero lands at ~29px (unmistakable),
  a 22px micro label at ~5px (decorative). Put nothing load-bearing in the micro tier.

**Delivery split.** In-post tiles are referenced as plain `![alt](./assets/x.svg)`
and **inlined as vectors** by [`remark-svg-specimen.mjs`](src/plugins/remark-svg-specimen.mjs)
— inlined rather than `<img src>` because an SVG behind `<img>` is sandboxed from
the page's fonts and would lose IBM Plex Mono. Covers stay **raster**, rendered at
2× by `npm run tiles`, because `web-thumb` feeds the homepage card, the
Shipped-for-clients band and OG cards, and social platforms will not accept SVG.

> **Build caveat.** The `.svg` files the remark plugin reads are build inputs Astro
> does not track. Editing a tile without touching its `.md` replays a cached render
> from `node_modules/.astro/data-store.json` (which survives `rm -rf .astro`) and the
> change silently does not ship. `npm run build` and `npm run dev` therefore pass
> `--force`. Do not remove it.

**Excalidraw** is sanctioned for *loose* diagrams — architecture sketches, rough
flows — kept in the vault, in a deliberately different register from these tiles.
Do not use it for specimen tiles: its hand-drawn styling fights the system, its SVG
export is machine output rather than hand-editable, and dragging cannot hold the rail.

### Accessibility floor
Semantic HTML, visible keyboard focus (signal orange ring), contrast AA minimum everywhere (check orange on paper for text — use it for accents, not body text), alt text on all images.

### Colophon line
`Astro · IBM Plex · Vercel · Updated MM.YYYY` — an owned stack line. (Supersedes
the earlier `Set in IBM Plex · Built with Astro`, which read like a free-website-
builder badge and cheapened the site; the stack list reads as an engineer stating
their tools.)

---

## 4. Tech stack

Per Structure v2 §3.5 / §8. This is a **content archive, not an app**.

- **Astro** (content collections) + **TypeScript** + **Tailwind CSS**. Ships zero JavaScript by default; hydrates only components explicitly marked interactive (islands). Astro's built-in schema validation and image optimization are load-bearing (see below).
- **Vercel** deploy (official Astro adapter), **Cloudflare** DNS.
- **RSS feed** for the Log from day one (`/rss.xml`).
- OG image generation per page (simple: paper background, stamp line, title in Plex Sans).
- Motion is CSS-first (see §3). No Framer Motion baseline.
- Analytics: NONE at launch (deliberate — the site ships clean; GA4 gets added later as a documented episode). Do not add tracking scripts, cookie banners, or consent tooling in v1.
- Forms: contact + waitlists via Resend (server action / endpoint → Resend API; waitlist signups to Resend Audiences). SPF/DKIM records on Cloudflare DNS.
- YouTube embeds: use a lightweight facade (e.g. lite-youtube-embed pattern) — no third-party scripts load until the visitor clicks play.

### Content model (Structure v2 §3)
The site's content lives in a `content/` folder whose structure **is** the source of truth. It is authored in an Obsidian vault (see the publishing pipeline below).

```
content/
  log/
    <year>/                         # filesystem organization only — never parsed for dates/URLs
      <slug>/
        <title>.md                  # the .md is named for the post TITLE (readable in Obsidian), not the folder
        assets/
          graph.webp
  products/
    <slug>/                         # products stay flat (no year nesting)
      <title>.md                    # named for the post TITLE, not the folder
      assets/
        hero.webp
```

Rules:
- **Type = the section folder.** First segment under `content/` is the type: `log` or `products`. Type is derived from the folder and nothing else.
- **Log nests by year** (`log/<year>/…`); **products stay flat**. The year folder is filesystem organization — it never appears in the URL.
- **Each post is its own folder; the folder name is the slug.** URLs: `/log/<slug>` and `/products/<slug>`.
- **Files are plain `.md`** (not `.mdx`) so Obsidian treats them as native notes. **The folder name is the slug; the `.md` inside is named for the post's TITLE** (e.g. `building-deadlinklabs-with-ai-in-public/Building the Deadlink Labs website with AI, in public.md`), not the folder and not `index.md` — so the note reads with its real title everywhere in Obsidian (quick-switcher, graph, backlinks). The filename is free-form and never reaches the URL; the folder does. Vault navigation: find a post by its title (the filename) or by its number/nickname via `aliases` (an Obsidian-internal field the site ignores — see §4 frontmatter), and browse the ordered index with an Obsidian **Base** over the `log` folder sorted by `web-number`. Do NOT number folders to fake an order — order lives in `web-pub-date`/`web-number`, never in the folder name. Interactive components use the fenced-block convention (below), never raw inline JSX.
- **Assets are co-located** in a sibling `assets/`, referenced with standard relative markdown: `![alt](./assets/hero.webp)`. Astro's image pipeline optimizes them at build — no per-image setup. (Obsidian `![[embed]]` syntax is NOT used.)
- Sorting **always** uses the `web-pub-date` frontmatter field (newest first).
  Equal dates break deterministically so feed order never depends on filesystem
  read order: higher `web-number` first (numbers ascend as you publish, so the
  higher number is the more recent record), then slug. Assigning `web-number` in
  publish order keeps the feed intuitive — LOG 001 is the oldest, at the bottom.
  This tiebreaker is a refinement of the pub-date rule, not a second sort key: the
  author still controls order entirely through `web-pub-date`.

### Frontmatter — the `web-*` namespace (Structure v2 §3.3)
Posts are authored from an Obsidian template that mixes vault-internal fields with a `web-*` namespace. **The build reads ONLY the `web-*` fields.** Every unprefixed field (`type`, `created`, `project`, `people`, `source`, `url`, …) is invisible to the site.

```yaml
---
# --- Obsidian-internal (site ignores all of these) ---
type: work journal
created: 2026-07-14
project: "[[DLL Web]]"
people: []
aliases:                      # Obsidian-only nav handles (site ignores); the .md filename already gives the title
  - "LOG 012"                 #   jump by number; add a nickname if useful

# --- web-* namespace (the ONLY fields the site reads) ---
web-status: published         # ONLY "published" renders (visibility gate)
web-title: "Building the Deadlink Labs Website"
web-pub-date: 2026-01-14      # ISO 8601. For products: "entered the lab" date.
web-snippet: "Short summary for cards and meta."   # optional
web-type: log                 # OPTIONAL, authoring-only; validated against the folder
web-number: 12                # stamp record number → "LOG 012" (optional)
web-stage: IN PROGRESS        # stamp status token, §3 vocabulary (optional)
web-tags: [LOCAL-LLM, PYTHON] # stamp thread tags (optional)
web-video: "https://youtu.be/…"   # optional; top-of-post video facade
web-thumb: "./assets/thumb.webp"  # optional; feed-card thumbnail + video poster
---
```

- `aliases` (Obsidian-internal; site ignores) → nav handles for the note in Obsidian's quick-switcher / graph / backlinks. The `.md` filename already provides the title, so `aliases` just adds extras like `LOG 012` or a nickname. Not required, never read by the build.
- `web-title` → page heading + `<title>` (so the note body should not also open with an `#` H1).
- `web-snippet` → cards + meta description. Optional.
- `web-status` → visibility gate. **Public if and only if `web-status: published`.** Anything else — `draft`, a typo, or a missing field — is invisible. An untagged note must resolve to invisible, so a forgotten tag never leaks.
- `web-pub-date` → sorting + displayed date.
- `web-type` → Obsidian Bases only; the site derives type from the folder. Validated against the folder; a mismatch fails the build.
- `web-number` / `web-stage` / `web-tags` → the lab-record stamp inputs (§3): record number, status token, thread tags. All optional; a post without them still renders (no number, no dot, no tags). **`web-number` is a permanent, stable identifier** — the "LOG 003" stamp is cited from other records (backlinks, "this thread continues"), the videos, and external links, so once published it must never change and must be unique (enforced at build — see §7). It is authored by hand, **never derived from date order** (date-ordering would silently renumber later records when a backdated entry is added). Numbers need not be contiguous.
- `web-video` → optional YouTube URL **or** bare ID. Renders a privacy-first facade at the top of the post — nothing loads from YouTube until the visitor clicks play (§4 embeds). A set-but-unparseable value fails the build. Absent → no embed.
- `web-thumb` → optional self-hosted poster in the post's `assets/`, run through Astro's image pipeline. Used as the homepage feed-card thumbnail and the video-facade poster. Absent → no image.
- Products also accept `web-waitlist: true` (§5.3).
- **No frontmatter passthrough.** The build whitelist-extracts the `web-*` fields into a typed object; raw frontmatter is never serialized into output (not the body, not `<meta>`, not structured data). Internal fields cannot leak into page source.
- **Deliberately absent:** no `web-slug` (folder name is the slug), no `homepage`/`featured`/`order` (curation lives in `site.config.json`).

Define one Astro **content collection** whose schema is the `web-*` rulebook (quoted hyphenated keys, aliased to clean internal names, `.passthrough()` to tolerate Obsidian-internal fields). The schema validates every post at build and **fails the build** on any violation — this is the required validation, provided natively.

### Editorial curation — `site.config.json` (Structure v2 §5)
Lives at the content-repo root. Homepage placement only:

```json
{
  "homepage": {
    "heroPosts": ["building-deadlinklabs-with-ai-in-public", "hazefield-devlog-01"],
    "recentPostsCount": 8,
    "featuredProducts": ["cassette-mixtapes", "hexcast"],
    "clientWork": [
      { "name": "Uruguay Outfitters", "status": "SHIPPED · 2026", "slug": "uruguay-outfitters-website" },
      { "name": "Crehana", "status": "CASE STUDY", "slug": "crehana-post-production" }
    ]
  }
} 
```

- `heroPosts` — ordered log slugs in the featured section; **array order = display order**.
- `recentPostsCount` — how many chronological log entries below the hero.
- `featuredProducts` — ordered product slugs; may be empty or omitted.
- `clientWork` — ordered entries for the off-nav "Shipped for clients" band (§5.1 band 6). Each has a display `name` and `status` label; an optional `slug` links the row to a published log case study. Omit `slug` for a client with no post yet (renders as plain text). Array order = display order; may be empty or omitted.

Convention: **arrays are curation, numbers are automatic slices.** Reordering the homepage = moving array lines; no content file is touched.

### Homepage generation (deterministic, Structure v2 §6)
```
1. HERO: for each slug in heroPosts (array order) → render the published log entry.
2. RECENT: all published log entries, EXCLUDING heroPosts, sorted by web-pub-date desc,
   take the first recentPostsCount.
3. FEATURED PRODUCTS: for each slug in featuredProducts (array order) → render the
   published product. Omit the section if empty/absent.
```

### Build-time validation (required, Structure v2 §7)
Fail the build with a message naming the offending file/slug on any violation. The last live deploy stays up.
- Only `web-status: published` content is included anywhere.
- Published content has `web-title` and `web-pub-date` (`web-snippet`, `web-type` optional).
- Every `heroPosts` slug resolves to a published `log/` entry; every `featuredProducts` slug to a published `products/` entry; every `clientWork` `slug` (when present) to a published `log/` entry.
- `recentPostsCount` is a non-negative integer.
- **Slugs are globally unique** (Obsidian only blocks duplicates within a folder).
- **`web-number` is unique among published log entries.** Drafts are exempt (invisible; a collision surfaces when a draft is republished). Only defined numbers are checked. On a duplicate the build fails, naming the two offending slugs and the next free number.
- `web-type` matches its folder where present.
- Optional lint: each post folder holds exactly one `.md`. Its filename is the post's TITLE (readable in Obsidian), deliberately NOT the folder name — the slug comes from the folder, so the filename is free-form (see §4 content model). The loader derives the slug from the folder and does not read the filename.

### Interactive components — the fenced-block convention (Structure v2 §3.6)
Interactivity is embedded with a **custom code-fence**, never raw inline JSX. A build-time remark plugin recognizes a reserved fence label and swaps the block for the matching Astro/React component (hydrated as an island); the block's contents are the component's config.

    ```visualizer
    pack: cyberpunk-glitch
    ```

- **In Obsidian:** renders as an ordinary labeled code block — readable, never broken.
- **On the built site:** replaced with the live component.

Reserve one label per component (`visualizer`, `aspect-toggle`, `pack-card`, …); an unrecognized label renders as a normal code block. **Implemented so far:** `terminal` — a ```terminal fence becomes the dark specimen panel on the site (dim `$`/`#` lines, orange URLs) and stays a plain code block in Obsidian (`src/plugins/remark-terminal.mjs`). Prefer placing interactivity at the **layout level** (driven by type/frontmatter/position) so note bodies stay pure prose; use fenced blocks only when a live element must sit mid-prose. **Wikilinks** `[[…]]` are allowed and preserved (v1 renders them as plain text; the relationship is kept for the future "Connections" work).

### Publishing pipeline (Structure v2 §8)
Committing from Obsidian is the only action required to publish. No export, no transform, no duplicate copy on disk.
- **Two repositories.** Content repo = `dll-website-content/`, a git repo initialized **inside** that vault subfolder (never at the vault root). Contains only `.md` posts + co-located `assets/` + `site.config.json`. Site repo = the Astro project, elsewhere on disk, never inside the vault.
- **No git submodule.** The site repo **gitignores** `content/`. A prebuild step shallow-clones the content repo into `content/` (`git clone --depth 1 <content-repo-url> content`); on Vercel this uses a stored read token (the content repo is private).
- A **Vercel Deploy Hook** on the content repo triggers a site rebuild on every push.
- **Local preview:** symlink the vault subfolder into the site project (`ln -s <vault>/dll-website-content <site>/content`) so `npm run dev` reads real notes live. The symlink is local-only and gitignored.
- **Key properties:** source is read once at build time and compiled to frozen static files (GitHub is never a CDN); no duplicate content on disk; keep the content repo private so draft source never leaks.

There is **no CMS** in v1. (A Sanity migration may be revisited later as a documented experiment, but it is not planned into this architecture — the Obsidian-vault-as-source pipeline is the content backend.)

---

## 5. Pages & locked copy

Nav is **Home · Log · Products · About**. Copy below is approved; don't rewrite it, extend in the same voice (plain, specific, first person, zero self-praising adjectives).

### 5.1 Home `/` — follows design 8A, auto-generated
Structure v2 §4.1 / §6. The page is generated from `site.config.json` + published content, not hand-authored. Band order:

1. **Cover** (8A truss mark + `Deadlink Labs` / `Build to Understand.`, viewport fold). See §3.
2. **Masthead / running head** (8A header). See §3.
3. **Hero — the current experiment's question.** Eyebrow: `● Currently on the bench · EXP NNN` (pulsing orange dot). H1 = the live experiment's **question** at 60px (e.g. *"Can a house quietly run its own systems without anyone tending them?"*). Below it the lab-record stamp (`LOG NNN · IN PROGRESS · … `), a short overview paragraph, one dark specimen panel (e.g. a `tail -f` log), and a "Step into the log →" link. The hero is the current experiment's question — NOT a hand-written personal positioning H1.
4. **Featured log entries** (from `heroPosts`) → **Recent log entries** (chronological slice). The living archive.
5. **Featured products** (from `featuredProducts`, optional).
6. **Shipped for clients** (off-nav consulting surface): stamped list — **Uruguay Outfitters** · `SHIPPED · 2026`, **Crehana** · `CASE STUDY`. Driven by `site.config.json` → `homepage.clientWork` (§4); each entry may link to its log case study via an optional `slug`.
7. **Who runs this:** one paragraph — "Marcelo Brouard, Buenos Aires. 20+ years turning messy operations into systems that run themselves: post-production teams, pipeline automation, data and dashboards, AI workflows, and the occasional website." + **one** button, `See the work →`. This is the canonical positioning line: it is reused verbatim on About (as a two-line opening) and in both meta descriptions (`BaseLayout.astro`, `about.astro`). Change it in all four places or not at all.

   *A second `Work with me` button here was specified originally and deliberately dropped (2026-08-05). Band 7 is the last content band, so the footer's orange `Let's make something together →` sits directly below it pointing at the same `/about#work-with-me`. Two CTAs one scroll apart is asking twice, and it would put two orange elements on one screen. Do not re-add it.*
8. **Footer / colophon.** A warm invitation leads the footer: `Let's make something together →` (sentence case among the mono chrome, routes to the About Work-with-me section — the availability signal, see §1). Then the manifesto line in mono: `BUILD TO UNDERSTAND · DOCUMENT TO REMEMBER · SHARE SO OTHERS CAN BUILD FURTHER`. Contact email, YouTube, LinkedIn, GitHub, RSS. Colophon: `Astro · IBM Plex · Vercel · Updated MM.YYYY` (see §3).

### 5.2 Log `/log`
The heart of the lab — a notebook, not a blog. Build logs, technical research, AI workflows, design iterations, videos, hardware mods, music tools, lessons, failed experiments, architectural decisions. Chronological, newest first, grows indefinitely. Feed items: number + status dot + title + date (+ thumbnail if the entry has a video).

**Experiments are log entries, not a separate collection.** A long-running experiment is a log entry that accumulates a record. The 8A **record template** (flexible — not all sections required):
- Lab-record stamp (`EXP 002 · IN PROGRESS · TESTING · Started MM.YYYY`) + thread tags.
- **Question as title** (e.g. "Can a house quietly run its own systems without anyone tending them?").
- Short overview.
- **Decision Register** — the crown jewel: a table of numbered decisions (`DEC 014`, statement, status token `SETTLED`/`TESTING`/`REVISED`).
- **Log timeline** — related entries (number, title, status · date).
- **Series** — related video parts, if any.
- **Backlinks + "This thread continues"** — related records, next-in-series, referenced-by (built from preserved wikilinks in future; plain links in v1).

First entry ever: **LOG 001** — *Designing and building deadlinklabs.com with AI, in public* — documents this site being planned and built, and links the YouTube video when published.

### 5.3 Products `/products`
Header: "Deadlink Labs / Products". Mature artifacts — may be commercial, free, open source, or private beta. A product page may include overview, purpose, features, status, screenshots, downloads, external links, and related log entries. Products are destinations; logs tell their story.

**"Mature artifact" is an internal qualification rule, not page copy.** It defines what earns a slot here (§3 Products page rule); it must never be printed on the site — it reads as a museum label, and "mature" claims quality where the site states facts. The approved page lede is:

> Tools and artifacts that made it to the shelf. For sale, free, open source, or private beta. Each one has a page; the log entries tell how it got built.

The shelf/bench pair is system vocabulary: the Log is the bench (`● Currently on the bench` on Home, "on the bench" in the VOICE.md lexicon), and Products is what left it. Keep both metaphors pointing the same way. "Tools and artifacts" is deliberately wider than "tools" so a future pack, font, sample library, or track still fits the page without a rewrite.

**Rejected for this lede: "went public"** (and any public/private framing). Every log entry is public too, so the axis does not separate Products from Log, and it contradicts `private beta` in the very next sentence. The dead-link motif it reaches for belongs in a log entry where something genuinely crosses from private to public.
- **Cassette Mixtapes** · COMING SOON — A preparation studio for digital mixtapes: playlists, metadata, streaming-spec validation, loudness analysis. Waitlist form.
- **Hazefield** · COMING SOON — A generative drone/ambient music engine for long-form evolving soundscapes. Waitlist form.
- **HEXCAST** — a music visualizer product; surface here when it reaches product maturity, otherwise it stays a log/research thread.

No prices until purchasable. When live: buy button (payment provider TBD — do not build checkout in v1). Client case studies (Uruguay Outfitters, Crehana) may surface here as well as on Home, per the off-nav consulting decision.

### 5.4 About `/about`
Replaces the former "The Lab" page. Context, not marketing: what Deadlink Labs is, a concise "Build to Understand" manifesto (short version, not the full Blueprint), a brief intro to the person, working principles, and a colophon (stack, design system, workflow, credits). JSON-LD `Person` schema lives here and on Home.

**The page is deliberately lean.** Its job is to say who runs this, explain the name, and get to the one commercial ask fast — not to recite a career. Band order: opening → tools → Work with me → contact form. Nothing else.

**Opens with who runs this, then the name's origin story (locked copy — refine wording with Marcelo but keep the beat):**
Marcelo Brouard. Buenos Aires, Argentina.
20+ years turning messy operations into systems that run themselves: post-production teams, pipeline automation, data and dashboards, AI workflows, and the occasional website.
When someone asked where they could see the work, there was no link to send. The work was real. The URL did not exist. I was the dead link.
This lab is the fix. Everything I build now gets documented, numbered, and archived here. Nothing 404s anymore.

Then **tools he actually uses** (Obsidian, Claude, VS Code, GitHub, Suno, Google AI Studio) — a mono chip row, no commentary. The build stack is already stated in the footer colophon, so it is not repeated here. Portrait photo still to come.

**Deliberately absent, do not re-add without a reason:** a "Now" section (it goes stale the moment it is written, and the Log feed *is* the now) and a career-arc / "The pattern" section (it read as résumé recitation; the arc belongs in log entries, where it is carried by artifacts).

**Work with me (off-nav consulting home).** A short section on the About page (and the "Work with me" CTA from Home routes here), in the approved voice:

> **Work with me.** I help small businesses work better with AI and automation. I find what's eating your time and money, then I build the fix: automated workflows, dashboards, internal tools, or your complete web presence. From understanding the problem to shipping the solution.
>
> **What an engagement looks like:**
> 1. A conversation. You tell me how the work actually happens today. I ask a lot of questions.
> 2. A plan. I map what to automate, build, or simplify, with clear scope and a fixed price.
> 3. The build. I ship, document everything, and hand it over working. You own all of it.

**Proof:** a single `Shipped for clients →` link to the Home band (`/#clients`), which already carries the thumbnails, stamps and snippets for Uruguay Outfitters and Crehana. One surface for client proof, not two — do not duplicate the case-study list here. **Contact:** direct email + a short form (name, company, "what's eating your time?"). No calendars, no pricing tables in v1. This is the ONE commercial ask on the site.

---

## 6. Voice & writing rules

The rules below are the summary. The full, example-driven voice guide is
**`VOICE.md`** at the repo root (moves, lexicon, before/after pairs, self-check);
read it before drafting or editing any post. The `/log-post` skill applies it.

- First person, plain US English, short sentences. Specific beats clever.
- Numbers and artifacts, never self-describing adjectives.
- Questions as titles for experiments ("Can X become Y?").
- UI copy: active voice, controls say what they do ("Join the waitlist", not "Submit").
- No exclamation marks. No em dashes. No startup vocabulary (leverage, journey, empower, unlock).

## 7. Build order

**Moved to [ROADMAP.md](ROADMAP.md).** This file holds the rules; the roadmap
holds the sequence — dated episodes, checkboxes, owners, and a decisions log.
Check it before starting work, and tick the boxes as you go.

## 8. Don'ts (hard rules)

- No dark theme (dark panels for code/video/specimens only). No gradients. No stock photos. No AI-generated imagery. No scroll animations. No popups or floating CTAs. No cookie banner (don't add tracking that needs one). No adjectives about Marcelo. No prices on unreleased products. No second commercial page (Work-with-me is the one ask, off-nav).
- No CMS in v1 — the Obsidian-vault content pipeline is the backend (§4).
- No `.mdx`, no raw inline JSX in content, no frontmatter passthrough to output, no Obsidian `![[embed]]` image syntax — plain `.md`, `web-*` fields only, relative-markdown images, fenced-block components.
- Don't render unpublished content: `web-status: published` is the only pass.
- Don't put the year in a URL; don't derive type from anything but the folder.
- `my_assets/video-scripts/` is never published, never pulled into the build, and never a content collection entry.

## 9. Versioning

All commits follow this convention.

- **Format:** `vMAJOR.MINOR.PATCH`, following Semantic Versioning, with **zero-padded MINOR (two digits)** and **PATCH (three digits)**. Example: `v1.02.014`.
- **MAJOR:** `0` = in development, `1` = site is live and confirmed online. Increment to `1` only at confirmed launch, then continue the same logic.
- **MINOR:** bumps **only when Marcelo explicitly says so**, or when PATCH runs out of numbers (`999` → next MINOR, PATCH restarts at `001`). Nothing else moves it — not an episode, not a redesign, not a new page. **Current line: `v1.02.xxx`. Stay here until told otherwise.**
- **PATCH:** increment once per commit. It does not reset at an episode, a feature, or a page; it just keeps counting inside the current MINOR.
- **Versions are NOT tied to LOG or video episode numbers.** (Episode-linked MINOR retired 2026-08-05.) Log numbers count published records and climb forever on their own schedule; a version describes the state of the software. Coupling them meant LOG 037 would force `v1.37` — it does not scale, and it makes the version say nothing about the site. Episodes are tracked in [ROADMAP.md](ROADMAP.md); versions are tracked here. Do not reintroduce the mapping.
- **Historical note:** `v1.00` was the launch (the `0 → 1` moment). `v1.01` was never used. `v1.02` was opened under the retired episode rule; it stays as the current line rather than being renumbered, since `v1.02.001` and `v1.02.002` are already pushed.
- **Commit messages** begin with the version number, followed by an em dash and a short description. Example: `v1.02.003 — Products lede`.

---

*// BUILD TO UNDERSTAND · DOCUMENT TO REMEMBER · SHARE SO OTHERS CAN BUILD FURTHER*
