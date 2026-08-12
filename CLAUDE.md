# CLAUDE.md — Deadlink Labs Website

Project brief and source of truth for building **deadlinklabs.com**.
Read this file in full before writing any code. When in doubt, this file wins over assumptions.

Two companion documents in `my_assets/` are the authorities this brief is reconciled against:
- **`Deadlink Labs Design Brief-handoff.zip`** — the final visual handoff (Claude Design). The settled direction is **design 8A ("Bridge Truss")**; §3 below is derived from it.
- **`DLL Web - Structure v2.md`** — the authoritative information-architecture and build spec. §2, §4, §5 below are derived from it.

**"Script" means two different things in this repo. Say which one.** The word is
overloaded and the two folders have nothing to do with each other:

| Say this | Path | What it is | Tracked? |
|---|---|---|---|
| **video script** | Obsidian vault, `DLL-CONTENT/dll video scripts/` | Episode narration, read off a teleprompter | **outside this repo** |
| **build script** | `scripts/` | Node tooling run via `npm run` (`cover`, `tiles`, `emphasis`, `favicon`) | tracked |

Never write "the script" unqualified in a doc, a commit message, or a roadmap
box. "Update the script" has meant both, and the ambiguity has already cost a
round trip.

The narration for videos documenting the build process (e.g. the LOG 001 video) lives in the Obsidian vault, at `DLL-CONTENT/dll video scripts/` — **outside this repo entirely** (moved 2026-08-12, so Marcelo can read along in Obsidian while recording). It sits *beside* `dll-website-content/`, never inside it, which is what keeps it out of the content clone and out of the build. These are reference material only — never site content (see §8), and they are written to `.local/voice/VOICE-SCRIPTS.md`, not `.local/voice/VOICE-POSTS.md` (§6). When editing a video script, check that every technical step it describes still matches this brief (stack, folder names, versioning, build order); [ROADMAP.md](ROADMAP.md) outranks it when they disagree.

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
| `--color-highlight` | `rgba(255,240,0,0.5)` | The highlighter marker in prose. Over paper it composites to `#fdf57c` |
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
- **The emphasis ladder — one device, one role** (settled 2026-08-11). The direct sibling of "one size per role" below, and it was fixed for the same reason. Three tiers in prose: `==text==` is a **yellow highlight, rendered bold**, and marks *the finding*, the line a skimmer must not miss; `**bold**` is *structural emphasis*, a thesis sentence or a bullet lead-in; plain text is everything else, **including product and tool names**. Before this, bold did all three jobs at once and its usage ranged from 14 marks in LOG 001 to zero across LOG 013's 3,540 words, so it signalled nothing. Eleven of LOG 001's fourteen were term first-mentions (`**Astro**`, `**Vercel**`, `**premise**`), which are labels, not emphasis; they are now plain.
  - **The budget is one highlight per H2 section, three per post — guidance, reported as a build warning**, not a gate (changed 2026-08-12). [`remark-mark.mjs`](src/plugins/remark-mark.mjs) prints the counts naming the file and each section over budget, and the build continues. Same argument as "exactly one orange live node" on a tile: a mark that appears four times marks nothing. **It is still a rule for whoever is drafting — including any agent — and it is not a rule the author has to obey.** It threw until 2026-08-12, which meant Marcelo could not overrule his own style guide without editing a plugin, and a fourth highlight halted a deploy. Encoding an editorial guideline as a thrown error is the wrong tool: `assertFits` and the `web-number` check throw because their failures produce a *broken page*; a fourth highlight produces a page someone might merely disagree with. **What still fails the build** is an unclosed `==` (it would render as a literal `==` nobody notices) and an empty `====`.
  - **The scarcity budget now covers two accents.** Orange means **live** (status dot, live node, working URL). Yellow means **read this**. They are different hues so the two systems cannot blur, and reaching for signal orange as a highlight would collapse both.
  - **The syntax is Obsidian's own**, so a note previews as a highlight in the vault and ships as one, with no export step (§4). The site additionally renders it bold; Obsidian does not, which is the one accepted delta.
  - **The marked lines are written for a CEO or recruiter who will not read the post** (settled 2026-08-11). They scroll, the yellow catches, they read four lines and decide whether this person thinks well — so the marks carry the **decisions and the reasoning**: what was chosen, what was rejected, and why. This is §1 goal #2 in one device, and the 90-second test applied to a single page. **Mark judgment, not mechanics:** "Vercel builds and hosts" is true, necessary, and worth nothing to a skimmer. A marked line that would read the same in anyone else's post is the wrong line.
  - **Read the whole post before marking anything, and rank candidates across the post rather than accepting them in reading order.** Marking while reading is what spends the budget on the first three sections and leaves the back half bare; the first pass over the archive did exactly that and was redone the same week. Two further rules came out of that redo: a highlight is a **complete self-contained sentence**, never a clipped phrase (LOG 001's best runs 28 words because the payload is the last clause), and where a paragraph explains an idea and then lands it, **mark the landing** — echoing the section heading is a feature, not a redundancy.
  - **Distribution is a rule, and the build cannot see it.** No two marks within ~10% of each other, none past ~85% of the post, and **at most one bold per H2 section**. Both archive extremes failed the last one: LOG 013 ran 3,300 words and nine sections with zero bold, LOG 012 ran thirteen bolds in nine sections. `npm run emphasis` ([`scripts/emphasis-report.mjs`](scripts/emphasis-report.mjs)) reports positions and flags all of it; `remark-mark.mjs` only ever sees the caps.
  - Authoring rules live in `.local/voice/VOICE-POSTS.md` §4, and the `/log-post` skill's EMPHASIS mode runs them. Never highlight inside a dark panel; the plugin will not allow it.
- **One size per role** (settled 2026-08-10). The ladder is not a menu to pick from per component. Every list/card **title** on a surface is the same size, every **snippet** is the same size, every **paragraph** is the same size — so a reader learns the hierarchy once. The homepage drifted to eight sans sizes (56 / 22 / 20 / 19 / 18 / 17 / 15 / 14.5) by each component choosing its own, and read as noise: `.stamplist__title`, `.card__title` and `.product__title` are now all **20**; `.stamplist__snippet`, `.card__snippet` and `.product__snippet` are all **15**; `.band-lede`, `.hero__overview` and `.who__text` are all **18**. `.feed-item__title` stays **17** — the Recent feed is a compact index row (number, status, title, date on one line), lighter than a thumbnail row by design, not by drift. **Adding a size to make one thing louder is the wrong lever** — use position, a rule, or air.
  - *Known drift, deliberately not reconciled:* body ships at **18px** (`global.css`) where this ladder says 17, and the mono chrome runs 11 / 11.5 / 12 / 12.5. Both are their own decision, not something to fix incidentally mid-task.
  - *The feed rows do not ladder, and a screenshot will say they do* (settled 2026-08-10). Every row in the Recent band is one size — `.feed-item__title` at 17px, set once in [`FeedItem.astro`](src/components/FeedItem.astro), no `nth-child`, no index-driven scale, no override at either call site. What reads as a descending ramp is the titles **tapering in length**: the slice on the page ran 62 / 66 / 54 / 50 / 43 characters, the top two wrapped and the bottom three did not, and double the ink reads as bigger type. Check the component before believing the picture.
  - *Uniform row height was proposed against this and rejected* (2026-08-10). The rows sit at three heights (~68 / 68 / 44) so the hairlines land on an uneven beat, and reserving two lines per title would even it. The repeated-unit argument is real — a Braun spec sheet and a TE panel hold the module constant and fit the content inside it — but here the content is the title, and the title is the row's entire payload, so the row yields to it, not the reverse. The cost is permanent (~24px of hanging air under every one-line row, a taller band) and the taper it corrects is an artifact of whichever posts happen to be in the slice. Do not re-propose it, and do not reach for the other version either: **never truncate a title to square up a row.** `align-items: baseline` is deliberate for the same reason — the mono number, status and date align to the title's first baseline, which is what makes them read as one printed line.
- **Headline tracking:** large headlines use tight **negative** letter-spacing (−0.02em to −0.025em). (This supersedes any earlier "no letter-spacing tricks" guidance — the negative tracking on big Plex Sans headlines is intentional and part of the 8A look.)
- No decorative or serif faces anywhere.

### Layout
- The sheet is ~**1120px** wide for the homepage and index pages; long-form record pages are narrower (~**920px**) with wide gutters. Generous margins; the sheet floats on the desk.
- **64px** horizontal gutters inside the sheet. Lab-sheet blocks use a **150px mono label column** + content column (`grid-template-columns: 150px 1fr`).
- Prose measure ~640–720px. Long-form pages read like documents: continuous prose with embedded images/video where they earn it. NO alternating image/text marketing blocks. NO full-bleed hero images.
- Hairline rules (`--ink-15`, 1px) separate sections. Zero border-radius on rules and stamps; 4px max on cards/thumbnails.
- **Row hairlines go between rows, never after the last one** (settled 2026-08-10). A divider with nothing under it to divide is clutter, and it doubles against the section rule that follows: the homepage's one-row Throwback band drew a line under its only post, and `/log` closed on a 2px stack of the last row's `ink-08` against the feed's own `ink-15` terminator. Use the adjacent-sibling idiom (`.row + .row { border-top }`), the way `.card-grid` already does, rather than `border-bottom` on every row — it costs nothing, and it stays correct when a list has exactly one row. A **section** rule is a different thing: `.band`'s `border-top`, the clients chapter break, and the `/log` feed's closing `ink-15` all stay.
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

**Animating a specimen tile.** *Corrected 2026-08-11: the previous version of this paragraph described a mechanism that was never built. It said the animation was driven by a `class` plus CSS in `src/pages/log/[slug].astro`, and named a `@keyframes specimen-flow` rule. There is no such rule, `pipeline.svg` carries no `class` attributes, and `[slug].astro` drives no tile animation. What actually ships is better, and is written below.*

**The animation lives inside the `.svg`, self-contained.** Each animated tile carries its own `<style>` block holding its keyframes and its own `prefers-reduced-motion` guard, and applies the animation through an inline `style` attribute on the elements that move. Nothing on the page is involved, which is the point: the file animates identically when opened in a browser, a design tool, or a pull request. Real examples, both in LOG 012 (`content/log/2026/nobody-fills-in-the-form/assets/`): `flow.svg` uses `@keyframes flowdash`, `pipeline.svg` uses `@keyframes n8nflow`, and both guard with `[style*="<name>"] { animation: none !important; }`. Keep the static form in the file too (a `stroke-dasharray`, say) so it still reads as a finished diagram when nothing is moving.

**Marching dashes are ambient; a step reveal is a performance.** A connector whose dashes drift is texture, and it may ship in a post. A diagram that builds itself one step at a time demands attention and belongs in a video, not under prose someone is reading (§3 Motion). LOG 002's `two-pipes.svg` does both jobs from one file: it ships static, and it carries inert `class="step step--N"` groups that only a gitignored local harness (`.local/two-pipes-reveal.html`, written by the same generator) ever styles. `remark-svg-specimen.mjs` strips only `width` and `height` from the root plus one narrow `font-family`, so classes survive inlining and cost nothing when unused.

Cover tiles get no animation: they are rasterized to `.webp`.

### Imagery

**If the work has real pictures, use them, and use as many as the story earns** (settled 2026-08-09, LOG 013). This supersedes the old rule, which read "Almost none." That rule was written when the archive was empty and every candidate image would have been decoration; it was a defense against stock photography, and it got mistaken for a house style. It is not one. A photograph of the actual thing, taken at the time, is the strongest evidence this site can carry. LOG 013 is the first post to ship photographs in the body, and it uses every one that survives, because each of them is proof the work happened.

Still banned, and this part does not move: **no stock photography, no AI-generated imagery, no 3D renders, no illustrative photograph of hardware that is not the hardware in question.** That last one is the trap. When LOG 013 needed to show a grid parabolic and no photograph of the actual dish survived, the answer was to describe it in prose and draw the geometry as a house specimen tile, not to reach for a picture of a similar antenna. An image on this site is evidence or it is a diagram. It is never an illustration.

The test: *would this image still be true if the reader knew exactly where it came from?* A 2006 snapshot of the real tower passes. A clean product shot of someone else's identical hardware, captioned to imply it is yours, does not.

**The one exception: a reference image, when the evidence is lost** (added 2026-08-10, LOG 013). Sometimes the work happened, was photographed, and the photographs are gone. A representative image of the *type* of equipment may stand in, on two conditions, both load-bearing. It is captioned as representative in the caption itself, in words a skimming reader cannot miss ("like this one", "not one of ours"). And its filename does not claim a provenance it lacks: LOG 013's is `rural-point-client-AP-24dBi-antenna-reference.jpeg`, deliberately without the `2006` the real photographs carry. What is still banned is the quiet version, where a catalog photo sits in the flow of real ones and the caption lets you assume. The point was never that stand-ins are dishonest. It is that an unlabelled one spends the credibility the real photographs earned.

Where photographs do not exist, the fallback is unchanged: an **on-brand graphite specimen tile** (see Specimen tiles, below). Captions carry provenance — original, redrawn, or reconstructed — per "Redraw in English" below.

**Every record carries a header image.** Each post opens with contained header media (record width, 16:9, rounded — never a full-bleed hero): the video facade when `web-video` is set, otherwise the `web-thumb`. When a post has no photograph to earn the slot, generate an **on-brand graphite specimen tile** in the house style (mono labels, a scarce orange live node — see LOG 001's network-mark tile and LOG 012's pipeline tile) rather than reaching for stock or AI imagery. The same `web-thumb` is reused on the homepage feed card and the Shipped-for-clients band.

**A cover never carries its record number** (settled 2026-08-06). The feed row, the clients band and the record stamp all print `LOG 0NN` right beside the image, so putting it in the image says it twice and, worse, freezes it: renumber the record and the artwork is wrong, in a raster, in the OG card, in whatever social already cached it. The stamp line on a cover carries status and kind only (`SHIPPED · CASE STUDY`), never the number. This applies to `npm run cover --stamp` too.

**A cover is a poster, not a slide.** Two elements is usually the ceiling at feed-card size. If the artwork can carry it, let the artwork carry it alone and drop the headline: LOG 011's cover is a phone and a flow diagram with no words of its own, and it reads at 310px better than the version that had a three-line headline above it.

**Redraw in English; quote in the original.** An artifact rebuilt for the site is site content and reads in the site's language, even when the source was Spanish. An artifact brought in *verbatim* — a screen capture, an export, the client's own canvas — keeps its language, because it is evidence and translating it makes it a reconstruction. LOG 011 has both: `pipeline.svg` is the deck's own n8n canvas and stays in Spanish; every other artifact in that post was redrawn and is in English. Say which is which in the caption.

**When the post already has artwork, use the artwork** (settled 2026-08-06, LOG 011). A client deck, a real dashboard, a tool's own canvas: bring it in at full fidelity, colour and motion included, and let it sit on the paper as a specimen. The site's palette is narrow because most posts have nothing to show, not because colour is banned — a source with its own considered design system usually sits on the paper without a fight (the LOG 011 deck's `#F1EFEA` paper and `#C0451A` accent are within a hair of `--paper` and `--signal`). **`npm run cover` is for posts with no artwork of their own.** It draws one staircase and swaps the words, so two posts generated from it look like the same image — which is exactly what happened to LOG 010 and LOG 011 before this rule existed. If the post ships with something worth looking at, build the cover out of that instead. Two covers that differ only in wording is a failure of the cover, not a success of the system.

### Specimen tiles (the settled system)

The graphite tiles are the site's house-made imagery, and the fallback whenever a
post has no photograph or artifact of its own. Their alignment is
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
>
> **Its sibling: editing a remark plugin needs a dev-server RESTART, and `--force`
> does not cover it.** Astro restarts on `astro.config.mjs` changes, but the
> plugins are modules *imported by* that config — editing
> `src/plugins/*.mjs` does not invalidate Node's module cache, so a running
> `npm run dev` keeps transforming content with the old code indefinitely. It
> looks exactly like a fix that did not work: `npm run build` is correct, the file
> on disk is correct, and localhost is stale. This cost a round trip on the canvas
> renderer. **After touching a plugin, restart `npm run dev` before judging the
> output** — or check `dist/` (the build always reloads).

**Excalidraw** is sanctioned for *loose* diagrams — architecture sketches, rough
flows — kept in the vault, in a deliberately different register from these tiles.
Do not use it for specimen tiles: its hand-drawn styling fights the system, its SVG
export is machine output rather than hand-editable, and dragging cannot hold the rail.

### Obsidian canvases (added 2026-08-12, LOG 001)

An Obsidian canvas embeds into a post and renders **as is** — the real planning
artifact on the page, not a redraw of it. It is the third kind of imagery here,
after photographs and specimen tiles, and the one that costs nothing to make
because the work already happened in the vault.

**Syntax is Obsidian's own embed**, and it is the single exception to §8's
`![[…]]` ban:

```markdown
![[DLL Web Premise Canvas.canvas|alt text describing the diagram]]

*Caption. Say plainly that this is the original artifact.*
```

- **WYSIWYG is the whole point.** In the vault this previews as a live, pannable
  canvas; on the site it is an inlined SVG. A ```canvas fence was specified first
  and rejected on sight: it shows a *code block* while you write, which defeats
  vault-first authoring. The text after `|` is the alt; absent, the figure is
  decorative. The caption is the italic paragraph below, styled by the rule the
  photographs already use — same convention, no new device.
- **The ban it breaks is narrower than it looked.** §8 forbids `![[embed]]`
  because Astro's image pipeline cannot resolve a wikilink.
  [`remark-canvas.mjs`](src/plugins/remark-canvas.mjs) reads the JSON off disk
  and emits vector markup, so it never touches that pipeline. The rule stands
  for images; a canvas is not one.
- **Conformance: JSON Canvas 1.0** — <https://jsoncanvas.org/spec/1.0/>. The
  **format** is open source (MIT), released by Obsidian in 2024; the **app is
  not**, so there is no reference renderer and this is written to the published
  spec. All node types are recognized and all edge attributes honoured, including
  the spec defaults `fromEnd: none` / `toEnd: arrow`, and both `canvasColor`
  forms (hex, or presets `1`–`6` = red, orange, yellow, green, cyan, purple).
- **`text`, `link` and `group` render. `file` nodes and group `background`
  images fail the build, named.** Not a spec gap: those paths are
  vault-absolute, and the build only has `content/`. Failing beats shipping a
  canvas with a hole in it.
- **A canvas is quoted, so it keeps its own colours** — the LOG 011 exemption,
  one level on. It may therefore show more than one orange, which the one-live-
  node rule forbids on hand-authored tiles. It keeps Obsidian's dot grid and 8px
  card radius for the same reason. **This exemption is for imported canvases
  only**; nothing here loosens the rules for house artwork.
- **Card text lives in `<foreignObject>`** so the browser lays it out with the
  real proportional font and real wrapping — which is what makes the page match
  the vault. The first pass set it in `<text>` with Plex Mono and wrapped it by
  hand against mono's 0.6em advance; that needed a markdown parser, a line
  breaker and a shrink-to-fit search, and it still could not look like Obsidian,
  which sets canvas cards in its sans UI font. Every bug in it came from doing
  by hand what the layout engine does for free. **Cost, worth knowing:**
  `foreignObject` does not rasterize under sharp/resvg, so a local `npm`-side
  preview of one of these SVGs shows empty cards — screenshot the real page.
- **Overflow spills, it does not clip.** Obsidian scrolls an overfull card and a
  static page cannot, so the choice was spill or clip. Clipping silently deleted
  the last line of four cards in the first pass. A spill is loud and means the
  card wants resizing in Obsidian — fix it at the source.
- **Inside a `foreignObject`, only `<div>` and `<span>` may be emitted, styled
  inline.** Its contents are real HTML sitting inside `.prose`, so *every* prose
  rule cascades in. This is not theoretical: `<p><em>WHY</em> the website
  exists</p>` was caught by the caption rule
  `.prose p:has(> em:only-child) { font-size: 13px; color: ink-60 }`, because
  `:only-child` counts element siblings only and the trailing text node does not
  count — ink at 62% on a dark panel, so the line simply vanished. The sibling
  card survived by luck: `***HOW***` emits `<strong><em>`, whose only element
  child is the `<strong>`. Adding a `<p>`, `<ul>`, `<li>`, `<strong>` or `<em>`
  back into that markup re-opens the hole.
- **Verify a canvas on the real page, never in an isolated harness.** The bug
  above shipped through a screenshot harness that reproduced the figure without a
  `.prose` ancestor, which is precisely the context that caused it. Same lesson
  as the tile cache: the convenient check was checking the wrong thing.
- **A canvas is co-located** in the post's `assets/`, like every other asset. The
  build resolves `assets/<name>` then `<name>` beside the note and fails naming
  both; Obsidian's vault-wide resolution is not available, because the build only
  clones `content/`.
- **Known limit: a wide canvas gets small on a phone.** Measured on LOG 001's:
  11.0px card text at a 1440 viewport, 6.0px at 500. That is the decorative tier
  by this file's own yardstick. Acceptable while the caption and surrounding
  prose carry the meaning — but a canvas is not the place to put a load-bearing
  fact, and a *tall* canvas suffers far less than a wide one.

The `--force` build caveat above applies verbatim: a `.canvas` is an untracked
build input exactly like a `.svg`.

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

- **Astro** (content collections) + **TypeScript** + **Tailwind CSS**. Astro's built-in schema validation and image optimization are load-bearing (see below).
  - **"Zero JavaScript by default" means zero *framework* JavaScript** (clarified 2026-08-12). No UI framework is installed, no component is hydrated, and there is not one `client:*` directive in `src/`. It has never meant zero `<script>` tags, and reading it that way caused a real defect: LOG 002's draft claimed "the site ships no client JavaScript" while `about/index.html` shipped Nav's scroll listener and the homepage shipped [NetworkMark.astro](src/components/NetworkMark.astro)'s `requestAnimationFrame` loop. The constraint then got enforced on the *contact form* alone, the one place it cost a conversion.
  - **A hand-written inline `<script>` is in-idiom; a hydrated island is the thing to justify.** Four exist and each is small and self-contained: [Nav.astro](src/components/Nav.astro) (scroll hairline), [VideoEmbed.astro](src/components/VideoEmbed.astro) (the YouTube facade), `NetworkMark.astro` (the cover mark), and the About contact form. Adding a fifth needs a reason; adding a framework needs a much better one (§3 Motion says the same about Framer Motion).
- **Vercel** deploy (official Astro adapter), **Cloudflare** DNS.
  - **`output` is not set, and must stay unset** (settled 2026-08-11, LOG 002). Astro's default is `'static'`, and `@astrojs/vercel` does not change that: the adapter only unlocks per-route opt-out. `src/pages/api/contact.ts` is the one file carrying `export const prerender = false`, and the build produces 13 static HTML pages plus one function. Switching to `output: 'server'` would make every page on-demand and throw away the point of a static archive. An earlier roadmap note said "switch output mode off pure-static"; that is wrong for Astro 5 and has been corrected.
  - **`@astrojs/vercel` is pinned to `^9.0.5`** — the newest major that peers with Astro 5. Version 10 requires Astro 6, version 11 requires Astro 7, and a bare `npm install @astrojs/vercel` fails on the peer range rather than resolving to the right one. Do not reach for `--force` or `--legacy-peer-deps`; that installs an adapter built for a different Astro.
  - **Secrets are read through `astro:env/server`, never `import.meta.env`.** Non-`PUBLIC_` vars are statically replaced at build time, which compiles the value into the function bundle instead of looking it up at runtime. The schema lives in `astro.config.mjs` and validates on access, so a missing key fails loudly.
- **RSS feed** for the Log from day one (`/rss.xml`).
- OG image generation per page (simple: paper background, stamp line, title in Plex Sans).
- Motion is CSS-first (see §3). No Framer Motion baseline.
- Analytics: NONE at launch (deliberate — the site ships clean). Do not add tracking scripts, cookie banners, or consent tooling in v1.
  - **When it lands, it is Cloudflare Web Analytics** (settled 2026-08-11, ships with LOG 004). This supersedes the earlier "GA4 gets added later", which contradicted both ROADMAP.md and the LOG 004 script and would have dragged a cookie banner back in against §8. Cloudflare is free with no traffic cap, keeps 6 months against Vercel Hobby's 1, and includes Core Web Vitals rather than billing them as a separate product. Custom events are unavailable on *both* free tiers, so Vercel's only possible edge is not on the table, and form conversions are already counted in the Resend dashboard. **Pick one, not both.** Vercel Web Analytics was considered and rejected; do not re-propose it without a new reason.
- Forms: contact + waitlists via Resend (server action / endpoint → Resend API; waitlist signups to Resend Audiences). SPF/DKIM records on Cloudflare DNS.
  - **Contact form shipped in LOG 002, as an Astro Action** (`src/actions/index.ts` → Resend → `hello@deadlinklabs.com`). This follows [Resend's own Astro guide](https://resend.com/docs/send-with-astro), which uses `defineAction({ accept: 'form' })` rather than a hand-written API route: validation is a declared zod `input` schema instead of hand-rolled trimming and a regex, and the call returns `{ data, error }` with no fetch, JSON parsing or status mapping to write. It sends to the public alias rather than a personal inbox, so the destination lives in a Cloudflare forwarding rule instead of in the repo, and the personal address never appears in public source. `replyTo` carries the visitor's address. **Resend reports a rejected send in the response payload rather than by throwing**, so the handler checks `error` as well as catching; without that check a failed send is indistinguishable from a successful one and the message is silently lost. Resend's own example checks it for the same reason.
    - **Two deliberate departures from that guide.** The key is read via `astro:env/server`, not `import.meta.env` (which would compile it into the bundle — see the secrets bullet above). The mail body is `text:`, not `html:`, so a stranger's input is never interpolated into markup.
  - **The form calls the action from a script, which is what keeps `/about` prerendered.** Astro requires the *page* to be on-demand rendered when a form uses `action={actions.x}`; using that form would force `prerender = false` on About and turn the archive's most important page into a function. Client-side RPC does not, because only the action endpoint runs server-side.
  - **A failed send never destroys what the visitor typed.** The first version redirected every failure to `/about/#contact-error` and revealed a block with a CSS `:target` rule, which meant the visitor landed on an *empty* form reading "something broke on my end" even when the real problem was a typo in their own address. On the one page that asks for anything (§1), that is the whole funnel. Errors now render in place with the fields intact, and field-level messages come back from the same schema that validates them. The error copy still hands over the direct mailto: an error that only apologises is a second dead end. `/thank-you/` and the `:target` block went away with the redirect.
  - **Waitlist forms are still unwired** (`WaitlistForm.astro`), and **the contact form has no spam protection yet**. Both are deliberately deferred to their own episodes; the honeypot is a hard gate before `ALLOW_INDEXING` flips (ROADMAP LOG 004).
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
- **Assets are co-located** in a sibling `assets/`, referenced either as standard relative markdown `![alt](./assets/hero.webp)` or as an Obsidian embed `![[hero.webp]]`, which [`remark-obsidian.mjs`](src/plugins/remark-obsidian.mjs) resolves to the former. Astro's image pipeline optimizes both at build — no per-image setup. Prefer the relative form when you want real alt text, since an embed can only derive alt from the filename.
- **Obsidian canvases live in `assets/` too**, and embed with `![[Name.canvas]]` (§3). Two properties follow from the format and are worth knowing before planning around it: a `.canvas` is pure JSON with exactly two top-level keys, so it **carries no frontmatter** — no `web-*` fields, no tags, no aliases — and it can therefore **never appear in an Obsidian Base**, which queries markdown only. Every canvas needs a companion note to hold its metadata; here that note is the post, which supplies the alt text and caption. Wikilinks typed *inside* canvas text nodes are still real outgoing links, so backlinks and the graph keep working.
- **Log feeds sort by `web-number`, highest first** (settled 2026-08-10). This
  supersedes the earlier "sorting always uses `web-pub-date`" rule, which shipped
  a feed reading 013, 012, 006, 010, 011 — correct by date and visibly broken to
  anyone scanning it. The record number is the log's spine: it is what the stamp
  prints, what other records cite, and what a reader actually follows down the
  page, so the feed has to agree with it. One order everywhere the log is listed —
  the homepage Recent band, `/log`, `/rss.xml`, and prev/next on record pages.
  - **The cost, stated plainly:** where `web-number` and `web-pub-date` disagree,
    the dates run out of order instead. As of 2026-08-10 they do disagree, and
    that is expected: the archive is being seeded quickly so the site has real
    work to show, and the dates are placeholders. They get set by hand when the
    Obsidian pipeline lands (ROADMAP LOG 003) — a small, known tradeoff, not a
    defect to design around. From then on, **assign `web-number` in publish
    order** and the two agree by themselves: LOG 001 oldest, at the bottom.
  - `web-number` is optional, so numberless posts have nothing to sort by: they
    fall to the bottom of the feed and order among themselves by `web-pub-date`,
    then slug. Ties must always break deterministically, or order falls through to
    the content glob's read order — effectively the filesystem, which nothing
    should depend on. Numbers are unique among published entries (§7), so the
    primary key never ties for a numbered post.
- **Products still sort by `web-pub-date`** (newest "entered the lab" first, then
  slug). They carry no record number — the `LOG NNN` spine is a log thing.

### Obsidian syntax parity (the pipeline's actual promise)

**A note must look the same in the vault and on the site.** That is not a nicety;
it is the premise the whole vault-to-web pipeline rests on (§8). Every construct
Obsidian renders and the site prints raw is a crack in it, so the standard is
parity, and a gap is a bug — not a house rule the author has to work around.

Astro ships **GFM** by default, which already matches Obsidian on bold, italic,
bold-italic, `~~strikethrough~~`, inline code, code fences, blockquotes, tables,
task lists, footnotes, nested lists, autolinks, escapes, headings, rules and
inline HTML. The rest is ours:

| Syntax | Handled by | Renders as |
|---|---|---|
| `==highlight==`, incl. wrapping bold/links/code | [`remark-mark.mjs`](src/plugins/remark-mark.mjs) | `<mark>`, also bold |
| `%%comment%%` (inline and block) | [`remark-obsidian.mjs`](src/plugins/remark-obsidian.mjs) | **removed**, as Obsidian hides it |
| `[[Note]]` / `[[Note\|alias]]` | `remark-obsidian.mjs` | the display text |
| `![[image.png]]` | `remark-obsidian.mjs` | a real image, through Astro's pipeline |
| `![[Name.canvas]]` | [`remark-canvas.mjs`](src/plugins/remark-canvas.mjs) | the canvas, inline SVG (§3) |
| ```` ```terminal ```` | [`remark-terminal.mjs`](src/plugins/remark-terminal.mjs) | the dark specimen panel |

- **`%%comments%%` were a content leak, not a formatting gap** (found 2026-08-12).
  Obsidian hides them; the site printed them verbatim, so a `%%TODO: check this
  number%%` left in a draft would have published. They are stripped **first**,
  before every other plugin, because a comment may legally contain an unclosed
  `==` or a stray bracket that would otherwise fail the build or be counted.
- **A wikilink renders as its display text, not as a link.** The target may not
  be a published page, and a link to a 404 is the one thing this site cannot
  ship. The prose is preserved so the future "Connections" work can still find it.
- **Still not at parity, both needing a decision rather than a parser:**
  **callouts** (`> [!NOTE]`) render as a plain blockquote with a literal
  `[!NOTE]` — thirteen types each with an icon and a colour is a design-system
  question (§3), not a transform; and **math** (`$…$`, `$$…$$`) renders
  literally, needing `remark-math` plus a KaTeX stylesheet. Do not use either in
  a post until it is built.
- **When adding a construct, test it through Astro's own processor**
  (`createMarkdownProcessor` from `@astrojs/markdown-remark`) with the real
  plugin chain, not a hand-rolled `unified()` pipeline. Astro's defaults (GFM,
  smartypants) are part of the answer, and a bare pipeline will tell you
  something false.

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
web-series: THROWBACK         # OPTIONAL series membership (§5.2)
web-series-number: 1          # → "THROWBACK / 001"; permanent, unique per series
web-video: "https://youtu.be/…"   # optional; top-of-post video facade
web-thumb: "./assets/thumb.webp"  # optional; feed-card thumbnail + video poster
web-thumb-alt: "..."              # optional; alt text for the header image
web-thumb-caption: "..."          # optional; caption under the header image
---
```

- `aliases` (Obsidian-internal; site ignores) → nav handles for the note in Obsidian's quick-switcher / graph / backlinks. The `.md` filename already provides the title, so `aliases` just adds extras like `LOG 012` or a nickname. Not required, never read by the build.
- `web-title` → page heading + `<title>` (so the note body should not also open with an `#` H1).
- `web-snippet` → cards + meta description. Optional.
- `web-status` → visibility gate. **Public if and only if `web-status: published`.** Anything else — `draft`, a typo, or a missing field — is invisible. An untagged note must resolve to invisible, so a forgotten tag never leaks.
- `web-pub-date` → sorting + displayed date.
- `web-type` → Obsidian Bases only; the site derives type from the folder. Validated against the folder; a mismatch fails the build.
- `web-number` / `web-stage` / `web-tags` → the lab-record stamp inputs (§3): record number, status token, thread tags. All optional; a post without them still renders (no number, no dot, no tags). **`web-number` is a permanent, stable identifier** — the "LOG 003" stamp is cited from other records (backlinks, "this thread continues"), the videos, and external links, so once published it must never change and must be unique (enforced at build — see §7). It is authored by hand, **never derived from date order** (date-ordering would silently renumber later records when a backdated entry is added). Numbers need not be contiguous.
- `web-series` / `web-series-number` → optional membership in a named series that numbers **independently of `web-number`**: LOG 013 is also `THROWBACK / 001`. Both halves are required for the label to render (a post with only one renders no label, rather than "THROWBACK / undefined"). Like `web-number`, the pair is a **permanent public identifier** — it is printed on the homepage band and stamped on the record — so it is authored by hand, must never change once published, and must be **unique within its series** (enforced at build; numbering is per series, so a future `FIELD NOTE / 001` coexists with `THROWBACK / 001`). It is deliberately NOT derived from `site.config.json`: a reorderable curation array would silently renumber records.
- `web-video` → optional YouTube URL **or** bare ID. Renders a privacy-first facade at the top of the post — nothing loads from YouTube until the visitor clicks play (§4 embeds). A set-but-unparseable value fails the build. Absent → no embed.
- `web-thumb` → optional self-hosted poster in the post's `assets/`, run through Astro's image pipeline. Used as the homepage feed-card thumbnail and the video-facade poster. Absent → no image.
- `web-thumb-alt` / `web-thumb-caption` → optional, and separate on purpose. **Alt DESCRIBES** the image for someone who cannot see it; the **caption ADDS** something for everyone (provenance, what you are looking at). A generated tile that restates the post title wants alt and no caption. A photograph that is evidence wants both. Absent alt leaves the header image decorative, which is right for a tile and wrong for a photograph, so any post whose `web-thumb` is a real photograph must set it (§3 accessibility floor).
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
    ],
    "throwbacks": [
      { "status": "2006", "slug": "rural-point" }
    ]
  }
} 
```

- `heroPosts` — ordered log slugs in the featured section; **array order = display order**.
- `recentPostsCount` — how many chronological log entries below the hero.
- `featuredProducts` — ordered product slugs; may be empty or omitted.
- `clientWork` — ordered entries for the off-nav "Client work" band (§5.1 band 4). Each has a display `name` and `status` label; an optional `slug` links the row to a published log case study. Omit `slug` for a client with no post yet (renders as plain text). Array order = display order; may be empty or omitted.
- `throwbacks` — ordered entries for the "Throwback" band (§5.1 band 7, §5.2). Each is `{ status, slug }`, where `status` is the year the work happened ("2006") and `slug` **must** resolve to a published log entry carrying `web-series` / `web-series-number`. Unlike `clientWork` there is no unlinked form: a throwback row is always a real post, and everything else on the row (the `THROWBACK / NNN` label, the record number, title, snippet, thumbnail) is read from that post rather than restated here. Array order = display order; may be empty or omitted.

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
- Every `heroPosts` slug resolves to a published `log/` entry; every `featuredProducts` slug to a published `products/` entry; every `clientWork` `slug` (when present) to a published `log/` entry; every `throwbacks` `slug` to a published `log/` entry **that carries both `web-series` and `web-series-number`**.
- **`web-series-number` is unique within its series among published log entries** (same rule and reasoning as `web-number`, one level down). Numbering is per series name, so `THROWBACK / 001` and a future `FIELD NOTE / 001` do not collide. On a duplicate the build fails, naming both slugs and the next free number in that series.
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

Reserve one label per component (`visualizer`, `aspect-toggle`, `pack-card`, …); an unrecognized label renders as a normal code block. **Implemented so far:** `terminal` — a ```terminal fence becomes the dark specimen panel on the site (dim `$`/`#` lines, orange URLs) and stays a plain code block in Obsidian (`src/plugins/remark-terminal.mjs`). Prefer placing interactivity at the **layout level** (driven by type/frontmatter/position) so note bodies stay pure prose; use fenced blocks only when a live element must sit mid-prose. **Wikilinks** `[[…]]` are allowed and render as their display text — the alias when there is one, otherwise the note name (`remark-obsidian.mjs`, §4 "Obsidian syntax parity"). Not linked: the target may not be a published page. The prose is preserved for the future "Connections" work.

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

**Two numbering systems, kept apart** (settled 2026-08-10). The band numbers in *this list* count every band including the masthead and footer, which carry no rail label. The **rail numbers** (`01`…`06` in the left gutter) count only the labelled bands and are **derived at build time** from the bands that actually render — never hand-written, because bands are conditional (Products and Throwback vanish with an empty config array) and literal numbers drift silently the moment one flips. They did: the rail shipped starting at `03`, with no `01` anywhere on the page. A **record number** (`LOG 001`) is a third thing again — it says which post this is, not where you are on the page, and it belongs in a stamp. The hero gutter carried an oversized record number for a while and the rail read as two numbering systems in one column; the record number moved into the eyebrow stamp and the rail now carries section numbers only.

1. **Cover** (8A truss mark + `Deadlink Labs` / `Build to Understand.`, viewport fold). See §3. Unnumbered.
2. **Masthead / running head** (8A header). See §3. Unnumbered.
3. **Featured** — rail `01`, the band that opens the page. `heroPosts[0]` renders as the bench **hero**: eyebrow `FEATURED ON THE BENCH · LOG NNN`, H1 = the live experiment's **question** at 60px (e.g. *"Can a house quietly run its own systems without anyone tending them?"*), a short overview paragraph, one dark specimen panel (e.g. a `tail -f` log), and a "Step into the log →" link. The status token (`● IN PROGRESS`) sits in the rail under the label. The hero is the current experiment's question — NOT a hand-written personal positioning H1.

   *Any further `heroPosts` render as rich cards inside this same band*, under a hairline. They were a separate band once; it carried the same label, so the moment a second `heroPost` was added the page would have shown two bands both called "Featured", with two rail numbers. One band, one number.

   *This band's rail number is the one exception to uniform rail sizing* (`size="lead"` on `SectionLabel`): `01` renders a step larger than the other bands' numbers. That is a deliberate hierarchy for the band that opens the page, and it is the only such exception — see §3's "one size per role".
4. **Client work** — rail `02`, off-nav consulting surface: stamped list — **Heat exchanger manufacturer** · `PROPOSAL · 2026`, **Uruguay Outfitters** · `SHIPPED · 2026`, **Crehana** · `CASE STUDY`. Driven by `site.config.json` → `homepage.clientWork` (§4); each entry may link to its log case study via an optional `slug`.

   *This band leads the archive and the products (settled 2026-08-10).* It is the site's only proof surface for goals #1 and #2 (§1), and it was reading as the quietest thing on the page: fourth scroll, the smallest row titles of any card band, and not one word of prose naming what the rows were. What fixed it: **position** — it sits directly after the hero, so an experiment still opens the page (the lab leads, per §1) but client proof arrives on the second scroll instead of the fourth; a **chapter-break rule** (`border-top: 1px solid var(--color-ink)`, following the footer) and **more air** (`padding-block: 3rem`); and a **lede** naming what the rows are. The emphasis is entirely monochrome and entirely structural.

   *A warm `--color-surface-2` tint plate was built and rejected on sight (2026-08-10).* The argument for it was symmetry — the light sibling of the dark Products band. The argument is wrong: Products earns graphite because it showcases screens on a dark surface, and a coloured plate mid-sheet just stains the paper. **The paper is the design.** If a band needs weight, it gets a rule, air, or position, never a background. Do not re-propose the tint.

   *The rows are the SAME component as Throwback's, deliberately.* An earlier `.stamplist--lead` modifier bumped this band's title, snippet and thumbnail one step up; it was removed with the type normalization (§3), because a page carrying eight sans sizes does not need a ninth to say "this matters". If the band ever reads too quiet, the thumbnail width is the lever — it costs no font size and no colour.

   *What was rejected: making the rail label bold, or bold and orange.* All the band labels come from one `SectionLabel` rule; an 11px letter-spaced mono word in the gutter is not what a scanning reader reads, orange there would break §3's scarcity budget and compete with the status dots that carry real meaning, and once one label is orange every band wants one. Enlarging the section number was rejected for the same class of reason: it is a meaningless index, and blowing it up creates a second focal point against the hero. **Enlarge the content, not the chrome.**

   *The label is "Client work", not "Shipped for clients" (settled 2026-08-10).* The band now carries proposals as well as shipped work, and a heading claiming "shipped" over a `PROPOSAL · 2026` row is a small lie the row itself contradicts. It also fits the 150px rail on one line. The `#clients` id and the `/#clients` anchor are unchanged.
5. **Recent log entries** — rail `03`. A chronological slice of the published log, excluding `heroPosts` (which are already shown in band 3). The living archive.
6. **Featured products** (from `featuredProducts`, optional) — rail `04`.
7. **Throwback** — rail `05`, off-nav archive surface: a stamped list of pre-lab projects written up from the archive, driven by `site.config.json` → `homepage.throwbacks` (§4). Each row prints `THROWBACK / NNN · LOG NNN · <year>`, the post title, snippet and thumbnail, and links to the record. It shares the stamped-list markup with band 4; the dark Products band sits between the two so they never read as one list. Rows appear only for posts that exist — the format is **not a schedule** (§5.2).
8. **Who runs this** — rail `06`. A **104px round portrait**, one paragraph beside it — "Marcelo Brouard, Buenos Aires. 20+ years turning messy operations into systems that run themselves: post-production teams, pipeline automation, data and dashboards, AI workflows, and the occasional website." — and **one** button, `About me →`, pointing at `/about`. This is the canonical positioning line: it is reused verbatim on About (as the opening lede) and in both meta descriptions (`BaseLayout.astro`, `about.astro`). Change it in all four places or not at all.

   *The portrait runs at 104px, not the record byline's 28px* (settled 2026-08-10). The band is labelled "Who runs this" and was answering with text alone; the face is the answer. At byline scale beside an 18px paragraph it reads as a small mark, not a person. It is round, like the byline avatar — the one round thing on a site with 0–4px radii, and the exception is the point (§3). It stacks above the paragraph under 600px. The asset is the same `src/assets/avatar-2024-mb.jpeg` the record byline uses; there is one portrait on this site, in three sizes.

   *The button says `About me →` and points at `/about`, not `See the work →` at `/log`* (settled 2026-08-10). By the time a reader reaches band 06 they have scrolled past five bands of work, so `See the work` pointed at the one thing they had already done, and it changed the subject away from the person the band had just introduced. About continues this exact paragraph and then delivers the beat this band withholds (the dead link). Still **one** button — see below.

   *A second `Work with me` button here was specified originally and deliberately dropped (2026-08-05), and that still holds.* Band 8 is the last content band, so the footer's orange `Let's make something together →` sits directly below it pointing at `/about#work-with-me`. Two CTAs one scroll apart is asking twice, and it would put two orange elements on one screen. Do not re-add it. The `About me →` retarget is the same single button given an honest destination, not a second ask: it is ink chrome, not orange, and it lands on the top of About rather than the anchor.
9. **Footer / colophon.** A warm invitation leads the footer: `Let's make something together →` (sentence case among the mono chrome, routes to the About Work-with-me section — the availability signal, see §1). Then the manifesto line in mono: `BUILD TO UNDERSTAND · DOCUMENT TO REMEMBER · SHARE SO OTHERS CAN BUILD FURTHER`. Contact email, YouTube, LinkedIn, GitHub, RSS. Colophon: `Astro · IBM Plex · Vercel · Updated MM.YYYY` (see §3).

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

**Throwback — the archive format** (added 2026-08-09, LOG 013 / THROWBACK 001). Twenty years of work happened before this lab had a URL, and none of it was written down. A throwback is a log entry that recovers one of those projects from memory and surviving photographs. It is an ordinary log entry in every mechanical sense (same folder, same collection, its own `web-number`) and additionally carries `web-series: THROWBACK` plus a `web-series-number` (§4), which stamps `THROWBACK / 001` on the record and drives the homepage band.

- **What qualifies:** a real project, built and used, that predates the lab, and for which some evidence survives — photographs, files, hardware, anything. No evidence, no throwback. The photographs are the reason the format works.
- **It is not a schedule.** Explicitly not Throwback Thursday and explicitly not weekly. A throwback gets written when Marcelo remembers a project and finds the material for it. Cadence pressure is what turns an archive into content.
- **The number is permanent** and independent of `web-number`. LOG 013 is THROWBACK / 001, and neither number is derived from the other.
- **Register:** the throwback flavor of VOICE-POSTS.md §3, which is the site's loosest narrative setting. A scene is allowed to be a scene. Layer 1 still holds, and the post still ends in a decision register — a throwback is a good story wrapped around a decision table, not a good story instead of one.
- **The homepage band is curated, not automatic**: a throwback appears there only if its slug is listed in `site.config.json` → `homepage.throwbacks` (§4). Writing one does not put it on the homepage.

### 5.3 Products `/products`
Header: "Deadlink Labs / Products". Mature artifacts — may be commercial, free, open source, or private beta. A product page may include overview, purpose, features, status, screenshots, downloads, external links, and related log entries. Products are destinations; logs tell their story.

**"Mature artifact" is an internal qualification rule, not page copy.** It defines what earns a slot here (§3 Products page rule); it must never be printed on the site — it reads as a museum label, and "mature" claims quality where the site states facts. The approved page lede is:

> Tools and artifacts that made it to the shelf. For sale, free, open source, or private beta. Each one has a page; the log entries tell how it got built.

The shelf/bench pair is system vocabulary: the Log is the bench (`● Currently on the bench` on Home, "on the bench" in the VOICE-POSTS.md lexicon), and Products is what left it. Keep both metaphors pointing the same way. "Tools and artifacts" is deliberately wider than "tools" so a future pack, font, sample library, or track still fits the page without a rewrite.

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

**The first line is the header, not a paragraph** (settled 2026-08-10). The page reads as a person's page rather than a filing label: `About` is the eyebrow, **`Marcelo Brouard` is the H1**, `Buenos Aires, Argentina` is a dateline under it in the record byline's treatment (mono, sentence case, 12px, ink-60), and a **150px round portrait** sits beside the pair. The beat above is unchanged — who runs this, then the origin of the name — its first line just moved out of the prose and into the header, so the origin section now opens on the canonical positioning line as its 20px lede. The name in an H1 on the page that carries the `Person` schema is also what §2's "Googling Marcelo Brouard must find this site" actually wants. The `Deadlink Labs` eyebrow was not lost so much as freed: the nav wordmark sits directly above it on every page, so it was saying the brand twice. Portrait stacks above the name and drops to 112px under 600px. `<title>` stays `About · Deadlink Labs` and the nav item stays "About".

Then **tools he actually uses** (Obsidian, Claude, VS Code, GitHub, Suno, Google AI Studio) — a mono chip row, no commentary. The build stack is already stated in the footer colophon, so it is not repeated here.

**Deliberately absent, do not re-add without a reason:** a "Now" section (it goes stale the moment it is written, and the Log feed *is* the now) and a career-arc / "The pattern" section (it read as résumé recitation; the arc belongs in log entries, where it is carried by artifacts).

**Work with me (off-nav consulting home).** A short section on the About page (and the "Work with me" CTA from Home routes here), in the approved voice:

> **Work with me.** I help small businesses work better with AI and automation. I find what's eating your time and money, then I build the fix: automated workflows, dashboards, internal tools, or your complete web presence. From understanding the problem to shipping the solution.
>
> **What an engagement looks like:**
> 1. A conversation. You tell me how the work actually happens today. I ask a lot of questions.
> 2. A plan. I map what to automate, build, or simplify, with clear scope and a fixed price.
> 3. The build. I ship, document everything, and hand it over working. You own all of it.

**Proof:** a single `Client work →` link to the Home band (`/#clients`), which already carries the thumbnails, stamps and snippets for every engagement. One surface for client proof, not two — do not duplicate the case-study list here. **Contact:** direct email + a short form (name, company, "what's eating your time?"). No calendars, no pricing tables in v1. This is the ONE commercial ask on the site.

---

## 6. Voice & writing rules

The rules below are the summary. The full, example-driven guides live in
`.local/voice/`, and **there are two of them** (split 2026-08-11):

| Writing this | Read |
|---|---|
| Log post, throwback, product page, About copy | **`.local/voice/VOICE-POSTS.md`** |
| Video narration (see §Script, above) | **`.local/voice/VOICE-SCRIPTS.md`** |

Read the matching one before drafting or editing. The `/log-post` skill routes to
the right one and applies it.

**Both are gitignored, local only** (moved out of the repo root 2026-08-12). They
are Marcelo's own voice, worked out against real published posts, and that is not
something anyone building from this repo should inherit — write in yours. `.local/`
is the convention for that here: never committed, not part of the deliverable, one
rule in `.gitignore`.

**What stays public is this section.** The shared discipline below is what an agent
needs in order to build the site, and it is a summary rather than an ear, so
publishing it costs nothing. If neither guide is on disk, **say so and stop** —
do not reconstruct the voice from this summary, and do not write from memory.

**Why two files.** There used to be one `VOICE.md` with a "register dial" set per
surface, and the dial was read wrong in both directions. Posts inherited a
teleprompter constraint and came out reading like terms and conditions: a grep of
all nine published posts on 2026-08-07 found **zero** contractions, every
apostrophe a possessive. Meanwhile the scripts drifted casual, because the post
rules were the ones people actually read, and the LOG 002 script reached 78
contractions against LOG 001's 12. One document could not hold both. Two can.

**The one real difference is contractions.** Posts use them freely. Scripts avoid
them, because full words have fewer elisions to trip on when reading aloud from a
prompter, which is a production constraint for a person holding a camera and not
a writing rule. Everything else is shared, and §1 of both files is byte-identical
on purpose: change it in both or in neither.

**The shared discipline, everywhere:**
- First person, plain US English, short sentences. Specific beats clever.
- Numbers and artifacts, never self-describing adjectives.
- Warmth is never evidence. No "I'm excited about this", no enthusiasm standing in
  for a number.
- Questions as titles for experiments ("Can X become Y?").
- UI copy: active voice, controls say what they do ("Join the waitlist", not "Submit").
- No exclamation marks. No em dashes. No startup vocabulary (leverage, journey, empower, unlock).

**Within posts** (VOICE-POSTS.md §3) there are three flavors of the same voice: a
**log post** reads as a notebook, a **throwback** is told rather than reported and
may let a scene be a scene, and a **product page** (with the About Work-with-me
section) is human and direct, second person, faster. A product page is read by
someone deciding whether to give you money or time, so it gets a warmer front
door. The shared discipline still holds, which means there is no hype available:
only the pain, stated plainly, and the numbers.

**Within scripts** (VOICE-SCRIPTS.md §2) the trap to know is that full words are
not permission to be choppy. The LOG 001 wrap was flagged as stiff and the
contraction rule got blamed, but the actual cause was strings of short fragments.
Write long, connected, breathing lines and just spell the words out.

*Do not reapply the no-contractions rule to posts.* It is a teleprompter
production constraint and it belongs only to scripts. Applying it site-wide is
what made every written post read like a manual, and it is the reason the voice
guide is now two files.

## 7. Build order

**Moved to [ROADMAP.md](ROADMAP.md).** This file holds the rules; the roadmap
holds the sequence — dated episodes, checkboxes, owners, and a decisions log.
Check it before starting work, and tick the boxes as you go.

## 8. Don'ts (hard rules)

- No dark theme (dark panels for code/video/specimens only). No gradients. No stock photos. No AI-generated imagery. No scroll animations. No popups or floating CTAs. No cookie banner (don't add tracking that needs one). No adjectives about Marcelo. No prices on unreleased products. No second commercial page (Work-with-me is the one ask, off-nav).
- No CMS in v1 — the Obsidian-vault content pipeline is the backend (§4).
- No `.mdx`, no raw inline JSX in content, no frontmatter passthrough to output — plain `.md`, `web-*` fields only, fenced-block components. **The `![[embed]]` ban is retired** (2026-08-12): it existed because Astro's image pipeline cannot resolve a wikilink, and [`remark-obsidian.mjs`](src/plugins/remark-obsidian.mjs) now resolves one to a real relative path before the pipeline ever sees it. Both forms work; write whichever previews correctly in the vault. See §4 "Obsidian syntax parity".
- Don't render unpublished content: `web-status: published` is the only pass.
- Don't put the year in a URL; don't derive type from anything but the folder.
- Video scripts are never published, never pulled into the build, and never a content collection entry. They now live in the Obsidian vault at `DLL-CONTENT/dll video scripts/`, a **sibling** of `dll-website-content/` and never inside it — the build clones only the content repo, so the separation is structural rather than a rule to remember.
- `.local/` is never committed and never read by the build. Nothing in it may become load-bearing for a deploy.

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
