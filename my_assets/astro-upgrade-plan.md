# Astro upgrade strategy, and whether Sätteri replaces our Obsidian work

> **Reference note, researched 2026-08-12. Not scheduled — no rush to upgrade.**
> Written after the Obsidian Canvas work shipped in `v1.02.057`–`v1.02.060`.
>
> **Everything below is a snapshot of versions as of 2026-08-12** — Astro
> **5.18.2** installed, **7.2.1** latest, `@astrojs/vercel` **9.0.5** installed,
> **11.0.5** latest. Re-check these before acting on any of it; the *reasoning*
> ages better than the *numbers*, and the Sätteri plugin API in particular was
> new and still filling in.
>
> The question that prompted it: *if Astro 7 replaces remark/rehype with a native
> engine, can we just upgrade and let it handle Obsidian and Canvas for us?*

## Context

We are on **Astro 5.18.2**; latest is **7.2.1**. Astro 7 replaces the
remark/rehype pipeline with **Sätteri**, a Rust Markdown engine, and Sätteri
ships several things natively that we hand-built. The question was whether
upgrading would let Sätteri do the Obsidian work for us, so our five bespoke
plugins could be deleted.

**Answer: no.** It closes one real gap and hands us a large porting bill for
everything else. Recommendation below is to upgrade eventually and **keep the
unified pipeline**, which is an officially supported path, not a hack.

There is no urgency: 5.18.2 is current-supported, and nothing we need is gated
behind 6 or 7.

---

## What Sätteri actually gives us

Sources: [Astro 7 release](https://astro.build/blog/astro-7/) ·
[Sätteri plugin docs](https://satteri.bruits.org/docs/plugins/) ·
[Markdown in Astro](https://docs.astro.build/en/guides/markdown-content/) ·
[a real 6→7 migration keeping remark](https://lilting.ch/en/articles/astro-6-to-7-upgrade)

| Our concern | Sätteri native? | Consequence |
|---|---|---|
| GFM (tables, footnotes, strikethrough, tasks) | yes | already works today |
| Math `$…$` | **yes** | our gap #2 closes for free |
| Wikilinks `[[…]]` | **yes** | we already solved this |
| Superscript / subscript | yes | small bonus |
| `==highlight==` | **no** | `remark-mark.mjs` still needed |
| `%%comment%%` | **no** | `remark-obsidian.mjs` still needed |
| Callouts `> [!NOTE]` | **no** | community plugin on either path |
| **Obsidian Canvas** | **no, and never** | `remark-canvas.mjs` is permanent |

**Canvas was never going to be covered.** A `.canvas` is a JSON file, not
Markdown. No Markdown engine will ever render one. Neither will the specimen-tile
inliner, the terminal panel, or the photo-figure width resolver — those are this
site's design system, not Markdown features.

## Why porting is the wrong trade

Sätteri **runs no remark plugins at all** — different AST, different plugin
model. Porting means rewriting, and the local numbers say what that costs:

```
remark-canvas.mjs         480 lines   raw-html: YES   file-io: YES
remark-mark.mjs           233 lines   raw-html: no    file-io: no
remark-obsidian.mjs       155 lines   raw-html: no    file-io: YES
remark-svg-specimen.mjs   138 lines   raw-html: YES   file-io: YES
remark-photo-figure.mjs    79 lines   raw-html: YES   file-io: YES
remark-terminal.mjs        62 lines   raw-html: YES   file-io: no
                        1,147 lines
```

Three specific blockers, in order of severity:

1. **Four of six plugins emit raw HTML, and Sätteri's plugin docs do not
   document raw-HTML emission.** That is the mechanism the canvas, the specimen
   tiles, the terminal panel and the photo figure all depend on.
2. **Four of six read files at build time**, also undocumented. The canvas
   renderer reads JSON off disk; the specimen inliner reads `.svg`;
   `remark-photo-figure` runs `sharp` for real pixel dimensions.
3. **The visitor model is per-node** (`defineMdastPlugin({ [nodeType](node, ctx) })`).
   Our hardest-won fix — pairing `==` markers **across sibling nodes** so
   `==**bold**==` works — is a children-array operation. A per-node visitor makes
   it materially harder, and that bug already cost us one broken deploy.

**And the payoff does not exist here.** Sätteri's win is build time at scale —
"over a minute" off the Astro docs, which is thousands of pages. This site is
**13 pages and builds in 5.7 seconds**, most of which is `astro check`. There is
no speed to buy.

---

## Recommendation

**Upgrade when convenient; stay on unified. Do not port.**

`@astrojs/markdown-remark` remains officially available for exactly this. A real
1,558-post migration installed `@astrojs/markdown-remark@7.x`, changed **no
config**, and every custom remark plugin kept working unchanged. The one wrinkle:
`markdown.remarkPlugins` prints a **deprecation warning** — the config *option*
is deprecated, not the pipeline. The forward path is passing plugins to
`unified({…})` via `markdown.processor`.

Revisit Sätteri only if build time becomes a real problem. At 13 pages, that is
years away, and by then its plugin API will have documented raw HTML and file I/O
or it will not — either way the decision gets easier, not harder.

## Upgrade path, when we do it

Two separate episodes. Do not combine them.

### Stage 1 — Astro 5 → 6 (expected near-free)

Checked against our code; we already use every modern API v6 requires:

| v6 breaking change | our status |
|---|---|
| Legacy collections removed | already Content Layer `glob()` ✓ |
| `entry.render()` → `render(entry)` | already `render(entry)` ✓ |
| `entry.slug` → `entry.id` | zero hits ✓ |
| `getEntryBySlug` / `getDataEntryById` | zero hits ✓ |

- Bump `@astrojs/vercel` **9 → 10** in the same step (peer-locked; CLAUDE.md §4).
- Eyeball two cosmetic changes: heading-ID slugging for headings ending in
  special characters, and responsive image styles moving to build-time classes.

### Stage 2 — Astro 6 → 7 (deliberate)

- Install `@astrojs/markdown-remark@7.x`; expect the plugin chain in
  [`astro.config.mjs`](astro.config.mjs) to keep working as-is.
- Bump `@astrojs/vercel` **10 → 11**.
- Accept (or silence) the `remarkPlugins` deprecation warning; migrating to
  `markdown.processor: unified({…})` can be its own later commit.
- `compressHTML` default changes to `'jsx'` — whitespace between inline elements
  can shift. Check the emphasis ladder and the record byline, which sit on
  adjacent inline spans.
- The new Rust compiler errors on unclosed tags in `.astro` files and no longer
  auto-corrects invalid HTML.
- Known unrelated gotcha from the field: `middleware.ts` JSON import attributes
  can break the esbuild bundle. We have no middleware, so this should not apply.

## The real risk, and the guard

If the remark chain ever silently stops running, most breakage is *visible* —
literal `==` and `[[brackets]]` on the page. **One failure is invisible:
`%%comments%%` start publishing.** That is a content leak with nothing to signal
it, and an upgrade is exactly when it would happen.

**Build `npm run parity` before Stage 1**, not after — it is the instrument that
makes both upgrades a two-second check instead of a manual review:

- New `scripts/parity-check.mjs`, modelled on
  [`scripts/emphasis-report.mjs`](scripts/emphasis-report.mjs) for CLI shape.
- Drive **Astro's own** `createMarkdownProcessor` from `@astrojs/markdown-remark`
  with the real plugin chain imported from the same modules `astro.config.mjs`
  uses. Do not hand-roll a `unified()` pipeline — Astro's GFM and smartypants
  defaults are part of the behaviour under test, and a bare pipeline reports
  something false.
- Assert the matrix already measured and recorded in CLAUDE.md §4 "Obsidian
  syntax parity": the 16 GFM constructs, plus `==highlight==` (including
  wrapping bold, links and inline code), `%%comment%%` stripping (including a
  comment containing an unclosed `==`), `[[Note]]` / `[[Note|alias]]`,
  `![[image.png]]`, `![[Name.canvas]]`, and a ```` ```terminal ```` fence.
- Exit non-zero naming each construct that changed, the way the tile system and
  the content schema already fail.

## Optional, independent of any upgrade

- **Math** could be added now with `remark-math` + a KaTeX stylesheet, closing
  gap #2 years before Sätteri would. Small, and no runtime JS (KaTeX renders at
  build). Worth doing only if a post actually needs an equation.
- **Callouts** have plugins on both paths (`remark-callout` for unified,
  `satteri-callouts` for Sätteri), so the parser is not the problem. Thirteen
  types each wanting an icon and a colour, in a three-colour palette, is a
  design decision (§3) — still yours to make, still not blocking.

## Verification, when the upgrade happens

1. `npm run parity` — must pass unchanged; it is the whole point of building it.
2. `npm run build` — check the **exit code**, and read every `[ERROR]`/`[WARN]`
   line. Page count and `astro check` both pass while a content render fails;
   that is how `v1.02.057` shipped broken.
3. Scan rendered output for leaked `%%`, `[[` and `==` in prose, excluding
   `<svg>` blocks and HTML comments (the specimen tiles carry `<!-- ==== -->`
   banners and will false-positive).
4. Open `/log/building-deadlinklabs-with-ai-in-public` and confirm the canvas
   renders **on the real page**, not in an isolated harness — a harness without
   the `.prose` ancestor is what hid the last canvas bug.
5. `npm run emphasis` — highlight counts and positions unchanged.
6. Restart `npm run dev` before judging anything: editing a plugin does not
   invalidate Node's module cache, and `--force` does not cover it.
