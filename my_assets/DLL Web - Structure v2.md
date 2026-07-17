---
type: work journal
created: 2026-07-14
project: "[[DLL Web]]"
area:
people: []
sort:
source:
url:
---
# DEADLINK LABS




# Deadlink Labs — Website Structure (v2)

> Authoritative build spec. Supersedes the prior website-structure draft. Every section here is internally consistent: one source of truth per concern, no transform step, no duplicate content on disk. Written to be handed directly to Claude Code.

---

## 1. Philosophy (unchanged)

Deadlink Labs is a living creative laboratory, not a startup site or portfolio. The work speaks before the person.

**The Log is the laboratory.** Everything begins as an experiment; some experiments become products. The site reflects that natural evolution. Visitors discover the work first, the artifacts second, the person last.

Guiding line: _Build to understand. Document to remember. Share so others can build further._

Design register: editorial over corporate, calm over loud, thoughtful over trendy. Intentional white space, subtle motion, typography carries hierarchy. The work is always more important than the interface.

---

## 2. Navigation

Intentionally minimal:

```
Home   Log   Products   About
```

Do not add sections unless they serve a fundamentally different purpose.

---

## 3. Content model

### 3.1 Structure

The vault contains a folder — `dll-website-content/` — whose internal structure **is** the site's `content/` folder, one-to-one.

```
content/
    log/
        2026/
            building-deadlink-labs-website/
                building-deadlink-labs-website.md
                assets/
                    graph.webp
    products/
        cassette-mixtapes/
            cassette-mixtapes.md
            assets/
                hero.webp
                ui-01.webp
    about/
    privacy/
```

### 3.2 Rules

- **Type = the section folder.** First path segment under `content/` is the type: `log` or `products`. The site derives type from the folder and nothing else.
- **Log nests by year** (`log/<year>/…`); **products stay flat** (`products/…`). The year folder is filesystem organization only — never parsed for dates or URLs.
- **Each post is its own folder; the folder name is the slug.**
- **Files are plain `.md`** (not `.mdx`). Obsidian treats `.md` as native notes; `.mdx` opens as inert plain text and breaks wikilinks/preview. The `.md` file is named after its folder (`<slug>/<slug>.md`), not `index.md`, so note names stay meaningful in Obsidian. The redundancy is intentional. Interactive components use the fenced-block convention (§3.5), never raw inline JSX — which keeps every note valid markdown in Obsidian.
- **Assets are co-located** in a sibling `assets/`, referenced with standard relative markdown: `![alt](./assets/hero.webp)`. The framework optimizes these at build; subfolders cost nothing.
- URLs: `/log/<slug>` and `/products/<slug>`. The year never appears in the URL.
- Sorting **always** uses the `web-pub-date` frontmatter field.

### 3.3 Frontmatter — the "DLL Web Expanded" template

Posts are authored from the DLL Web Expanded Obsidian template: the original Universal Note fields (internal to the vault) plus a `web-*` namespace (the site's input). Example:

```yaml
---
# --- Obsidian-internal (site ignores all of these) ---
type: work journal
created: 2026-07-14
project: "[[DLL Web]]"
area:
people: []
sort:
source:
url:

# --- web-* namespace (the ONLY fields the site reads) ---
web-type: log                 # OPTIONAL, authoring-only (Obsidian Bases). Validated vs folder.
web-status: published         # ONLY "published" renders (see §3.4).
web-title: "Building the Deadlink Labs Website"
web-pub-date: 2026-01-14      # ISO 8601. For products: "entered the lab" date.
web-snippet: "Short summary for cards and meta."   # optional
---
```

**The namespace contract (critical):**

- The build reads **only** the `web-*` fields. Every unprefixed field (`type`, `created`, `project`, `area`, `people`, `sort`, `source`, `url`, and any future template field) is invisible to the site.
- **No frontmatter passthrough.** The build whitelist-extracts the `web-*` fields into a typed object and works from that object alone. Raw frontmatter is **never** serialized into output — not into the page body, not into `<meta>` tags, not into structured data. "Not rendered" means "not present in the served HTML," so internal fields (e.g. `people`, `project`, private `source`/`url`) cannot leak into page source.

**Field roles within `web-*`:**

- `web-title` → rendered as the page heading and `<title>`. (So the note body should not also open with an `#` H1, or the title appears twice.)
- `web-snippet` → cards and the meta description. Optional.
- `web-status` → visibility gate (§3.4). Behavioral only.
- `web-type` → Obsidian Bases only; the site derives type from the folder, never from this field. Validated against the folder (§7). Behavioral/authoring only.
- `web-pub-date` → sorting and displayed date. Behavioral.

**Deliberately absent:**

- No `web-slug` — the folder name is the slug, so a title can change without breaking the URL.
- No `homepage` / `featured` / `order` — curation lives in `site.config.json` (§5).

> Hyphenated YAML keys (`web-pub-date`) are valid and map cleanly into a typed schema (e.g. Astro content collections / Zod with quoted keys); the build aliases them into a clean internal object.

### 3.4 Visibility rule (strict)

Content is public **if and only if** its frontmatter contains exactly `web-status: published`.

Everything else is invisible — `unpublished`, `draft`, any other value, a typo, or a **missing field**. Rationale: the vault is the source, so an untagged note must resolve to invisible or it leaks the moment a tag is forgotten. Only `published` is a pass.

### 3.5 Framework — Astro (content collections)

The site is built with **Astro**, deployed on **Vercel** (official adapter). Astro is chosen because this is a content archive, not an app: it ships zero JavaScript by default, hydrates only the components explicitly marked interactive, and provides two built-ins we already require — schema validation and image optimization.

Define one Astro **content collection** whose schema is the `web-*` rulebook. The schema validates every post at build and **fails the build** on any violation (this is the §7 validation, provided natively rather than hand-written). Keys are quoted because they are hyphenated; aliased to clean names internally.

```ts
// src/content.config.ts (illustrative)
import { defineCollection, z } from 'astro:content';

const post = z.object({
  'web-status': z.enum(['published']).or(z.string()), // only "published" renders (§3.4)
  'web-title': z.string(),
  'web-pub-date': z.coerce.date(),
  'web-snippet': z.string().optional(),
  'web-type': z.enum(['log', 'product']).optional(), // validated vs folder in §7
}).passthrough(); // tolerate unknown Obsidian-internal fields; they are ignored, never emitted
```

`.passthrough()` lets the Obsidian-internal fields exist on the note without error, while the build only ever reads the `web-*` keys above — satisfying the no-passthrough-to-output rule in §3.3 (unknown fields are ignored, never serialized).

Co-located images referenced relatively (`./assets/hero.webp`) are optimized by Astro's image pipeline automatically — no per-image setup.

### 3.6 Interactive components — the fenced-block convention

Interactivity is embedded with a **custom code-fence**, never raw inline JSX. A build-time remark plugin recognizes a reserved fence label and swaps the block for the matching Astro/React component; the block's contents are the component's config.

Author writes (valid markdown, works everywhere):

````
```visualizer
pack: cyberpunk-glitch
````

- **In Obsidian:** renders as an ordinary labeled code block. Readable, never broken.
- **On the built site:** the remark plugin replaces it with the live component (e.g. a HEXCAST preview), hydrated as an island.

This is build-time rendering logic, not a content transform — no duplicate content, no extra file on disk. It keeps every note pure `.md` and Obsidian-clean while still allowing live widgets exactly where wanted. Reserve one label per component (`visualizer`, `aspect-toggle`, `pack-card`, etc.); an unrecognized label simply renders as a normal code block.

Most interactivity is better placed at the **layout level** (driven by `web-type`, frontmatter, or position) so note bodies stay pure prose. Use fenced blocks only when a live element must sit at a specific point mid-prose.

---

## 4. Pages

### 4.1 Home (auto-generated, never hand-edited)

```
Header / Cover
    ↓
Featured (Hero) Log Entries
    ↓
Recent Log Entries
    ↓
Featured Products (optional)
    ↓
Footer
```

- **Cover:** minimal, editorial, quiet. Large negative space. One abstract geometric mark. No hero marketing, no welcome copy, no CTA. The visitor scrolls naturally into the first Log entry.
- **Featured Log Entries:** large, visual, editorial. 1–3 entries. Chosen via `site.config.json`, not frontmatter.
- **Recent Log Entries:** chronological, compact, ~5–10 entries. The living archive.

### 4.2 Log

The heart of the lab — a notebook, not a blog. Build logs, technical research, AI workflows, design iterations, videos, hardware mods, music tools, lessons, failed experiments, architectural decisions. Grows indefinitely, newest first.

### 4.3 Products

Mature artifacts. May be commercial, free, open source, or private beta. A page may include overview, purpose, features, status, screenshots, downloads, external links, related log entries. Products are destinations; logs tell their story.

### 4.4 About

Context, not marketing: what Deadlink Labs is, a concise "Build to Understand" manifesto, a brief intro to the person, working principles, and a colophon (stack, design system, workflow, credits). The full manifesto may live here as a secondary section rather than a top-level nav item.

---

## 5. Editorial curation — `site.config.json`

Lives at the repo root. Contains only homepage placement.

```json
{
  "homepage": {
    "heroPosts": ["building-deadlink-labs-website", "hazefield-devlog-01"],
    "recentPostsCount": 8,
    "featuredProducts": ["cassette-mixtapes", "hexcast"]
  }
}
```

|Field|Type|Meaning|
|---|---|---|
|`heroPosts`|ordered `string[]`|Log slugs in the featured section. **Array order = display order.**|
|`recentPostsCount`|`number`|How many chronological log entries below the hero section.|
|`featuredProducts`|ordered `string[]`|Product slugs, ordered. May be empty or omitted.|

Convention: **arrays are curation, numbers are automatic slices.** Reordering the homepage = moving array lines; no content file is touched.

---

## 6. Homepage generation (deterministic)

```
1. HERO: for each slug in heroPosts (array order) → render the published log entry.
2. RECENT: all published log entries, EXCLUDING heroPosts slugs,
   sorted by web-pub-date desc, take the first recentPostsCount.
3. FEATURED PRODUCTS: for each slug in featuredProducts (array order) →
   render the published product. Omit the section if empty/absent.
```

Step 2's exclusion stops a hero post from also appearing in recent. "Published" means the §3.4 rule throughout.

---

## 7. Build-time validation (required)

Fail the build with a message naming the offending file/slug on any violation. The last live deploy stays up.

- Only `web-status: published` content is included anywhere.
- Published content has the required web fields: `web-title` and `web-pub-date` (`web-snippet` and `web-type` are optional). Missing a required field fails the build.
- Every `heroPosts` slug resolves to a published `log/` entry.
- Every `featuredProducts` slug resolves to a published `products/` entry.
- `recentPostsCount` is a non-negative integer.
- **Slugs are globally unique.** (Obsidian only blocks duplicate names _within_ a folder, so `log/2026/foo` and `log/2027/foo` could both map to `/log/foo`.)
- **`web-type` matches its folder** where present (`log/…` → `log`, `products/…` → `product`). Mismatch fails the build. This lets the property exist for Obsidian Bases while guaranteeing it can never silently disagree with the real (folder-derived) type.
- Optional lint: each post's `.md` filename matches its folder name.

---

## 8. Publishing pipeline

Design goal: committing from Obsidian is the only action required to publish. No export, no transform, no duplicate copy of any post on disk.

### 8.1 Two repositories

- **Content repo** = `dll-website-content/`, a git repo initialized **inside** that folder (never at the vault root — that would push private notes). Contains only `.md` posts + co-located `assets/` + `site.config.json`. Pushed from Obsidian.
- **Site repo** = the Astro project (framework code), elsewhere on disk, never inside the vault. Pulls the content repo at build time.

Do **not** link them with a git submodule — that forces the site repo to bump a pointer on every content change, breaking frictionless publishing. Instead:

- The site repo **gitignores** `content/`; content never lives in it.
- A prebuild step populates it: shallow-clone the content repo into `content/` (`git clone --depth 1 <content-repo-url> content`). On Vercel this runs during the build using a stored **read token** (a GitHub token as a Vercel env var), since the content repo is private.
- A **Vercel Deploy Hook** on the content repo triggers a site rebuild on every push.
- **Local previews:** symlink the vault folder into the site project so `npm run dev` reads your real notes live — `ln -s <vault>/dll-website-content <site>/content`. The symlink is local-only and gitignored; it never travels to Vercel. This is the bridge between "edit in vault" and "preview in site" with no duplication.

### 8.2 Publish flow

```
1. Author sets web-status: published on a post in the vault.
2. Obsidian Git commits + pushes dll-website-content.
3. Push fires the Vercel Deploy Hook.
4. Vercel builds in a throwaway container: pulls content, compiles markdown + images
   into static HTML/assets, validates (§7).
5. The compiled output is distributed to Vercel's edge network as an immutable
   snapshot. GitHub is not touched at runtime.
6. Only published posts are live.
```

Unpublishing is symmetric: change/remove `web-status: published`, push, next build drops it.

### 8.3 Key properties

- **No realtime ingestion, GitHub is never a CDN.** Source is read once at build time and compiled to frozen static files; visitors are served the edge snapshot.
- **No duplicate content on disk.** The post exists once, in the vault. The build container's copy is throwaway.
- **Privacy:** keep the content repo private (draft source lives there even though it never renders) and scoped to `dll-website-content/` only.

### 8.4 Authoring conventions this pipeline requires

- **Images: standard markdown only** — `![alt](./assets/x.webp)`, not Obsidian's `![[x.webp]]` embed (which would need a build-time resolver). Standard markdown previews fine in Obsidian.
- **Wikilinks** `[[...]]` are allowed. v1 renders them as plain text while preserving the relationship (remark plugin) for the future "Connections" work.

---

## 9. Future roadmap (preserve, don't build in v1)

- Author with standard Obsidian wikilinks from day one; v1 renders them as plain text but preserves the relationships internally — no future content rewrite needed.
- **Connections:** a later visual exploration interface over accumulated relationships (not a clone of Obsidian's graph view). Emerges once the archive is rich enough to make it worthwhile.
- **Related Connections:** per-article footer surfacing related experiments, referenced concepts, and backlinks, generated automatically from preserved wikilinks.

The archive should compound: every new document may connect to prior ideas, and those relationships grow more valuable over time. v1 hides this complexity while preserving everything needed to reveal it later.