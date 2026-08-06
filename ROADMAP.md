# ROADMAP.md — what is built, what is next

The build plan for **deadlinklabs.com**, episode by episode. This file holds the
*sequence*; [CLAUDE.md](CLAUDE.md) holds the *rules*. If you are asking "what do
we do next", it is here. If you are asking "how must it be done", it is there.

**Work is organized by video episode.** Each episode is a chunk of build worth
documenting. **Episodes do not set the version** — that mapping was retired
2026-08-05. Versions live in CLAUDE.md §9: MINOR moves only when Marcelo says so
(currently `v1.02`), and PATCH ticks once per commit regardless of which episode
the work belongs to.

`[x]` done · `[ ]` not started · `[~]` in progress
**Owner:** `ME` = Marcelo, by hand (browser, GUI, account signup) · `AI` = doable
in the repo by an agent · `BOTH` = paired.

> Episode narration scripts live in `my_assets/video-scripts/` — **gitignored,
> local only**. This file is the tracked version of the plan and outranks them
> when they disagree.

---

## Shipped

### v0.01 – v0.04 · Scaffold, design system, content model
`2026-07-17 → 2026-07-22`

- [x] Astro + TypeScript + Tailwind scaffold, design tokens, base layout
- [x] Network mark (engineered growth graph) + signal pulse
- [x] Home 8A on one continuous surface, sticky masthead
- [x] Content collection + `web-*` schema + build-time validation
- [x] Log feed, record template, Products index, About
- [x] RSS feed (`/rss.xml`)
- [x] `VOICE.md` + the `/log-post` skill
- [x] Terminal specimen as a fenced-block component (`remark-terminal.mjs`)
- [x] `site.config.json` curation: hero posts, recent slice, products, client work

### LOG 001 · Designing and building deadlinklabs.com with AI, in public
`v1.00` · **live 2026-07-22**

- [x] Deployed to Vercel, DNS on Cloudflare, live at deadlinklabs.com
- [x] `ALLOW_INDEXING = false` gate shipped ([BaseLayout.astro:47](src/layouts/BaseLayout.astro#L47))
- [x] Placeholder posts committed directly into the site repo (launch shortcut)
- [x] LOG 001 written
- [x] `v1.00.002` — title-named post files, Obsidian-readable `2026-07-27`
- [x] `v1.00.003` — positioning line, footer channels, About restructure `2026-08-05`

### LOG 011 · Field service reports, a pilot proposal
`v1.02.011` – `v1.02.013` · **written 2026-08-06**

- [x] The proposal written up, anonymous to sector level
- [x] `clientWork` row labelled `PROPOSAL · 2026`, first in the band
- [x] First `prefers-reduced-motion` guards in the codebase

**`v1.02.011` shipped this wrong and `v1.02.013` fixed it.** The first pass
converted the client deck into monochrome graphite tiles on the argument that
CLAUDE.md required it. It did not, and the deck's palette turns out to be a cousin
of the site's, not an alien. The cover came out of `npm run cover` and was a near
duplicate of LOG 010's.

- [x] The deck's **n8n canvas lifted verbatim**, colour and animation intact
- [x] WhatsApp chat rebuilt as a phone, in WhatsApp's own colours
- [x] Six-step flow and both card artifacts rebuilt in the deck's palette
- [x] Cover built from the post's own artwork (phone + canvas), not generated
- [x] [remark-svg-specimen](src/plugins/remark-svg-specimen.mjs) no longer strips
      *every* `font-family`, only the graphite stack — it was flattening the
      canvas's deliberate Sans/Mono mix to all mono
- [x] Rule recorded in CLAUDE.md §3: when the post has artwork, use the artwork

- [ ] `AI` Add a reduced-motion guard to the cover mark's rAF loop
      ([NetworkMark.astro](src/components/NetworkMark.astro)) — it currently runs
      forever with no visibility check and no motion query

---

## LOG 002 · Obsidian publishing pipeline `[~] IN PROGRESS`

**Working title:** *I Push a Note in Obsidian. Site Rebuilds Itself.* ·
**Target: TBD**

Goal: the site repo contains **zero posts**. Writing a note in Obsidian and
pushing it is the entire act of publishing.

**The vault**
- [x] `ME` Obsidian installed, vault exists — `~/Documents/Obsidian Vaults/zzzzMB`
- [x] `ME` Templates core plugin enabled, folder set to `DATA/Templates`
- [x] `AI` Create `dll-website-content/` inside the vault — the one folder that becomes the site `2026-08-05`
- [x] `AI` Copy `content/` (19 files: posts, assets, `site.config.json`) into it `2026-08-05` — **copied, not moved**; the site-repo original is deleted later at the untrack step, so there are two copies until the content repo push succeeds
- [x] `AI` Install the `web-post` template at `DATA/Templates/web-post.md` `2026-08-05` — a copy of [log-post-template.md](my_assets/templates/log-post-template.md), which stays the source of truth (VOICE.md §8); re-copy it if the repo one changes
- [ ] `ME` Create an Obsidian **Base** over `log/`, sorted by `web-number`

> **⏸ Everything below this line is for the live recording** (decided
> 2026-08-05). The vault prep above is done and can be shown as already set up;
> publishing the repo, the token, the wiring and the magic moment are the beats
> that teach, so they get performed on camera rather than pre-run by an agent.
> Do not execute them ahead of the shoot.

**The private repo**
- [ ] `BOTH` Create `deadlink-labs/dll-website-content` — **private**, in the org
- [ ] `BOTH` First push of the content repo
- [ ] `ME` Fine-grained PAT: resource owner `deadlink-labs`, **only** that repo, Contents → **Read-only**
- [ ] `ME` Add `CONTENT_REPO_TOKEN` to Vercel env vars

**Wiring the site** — *do not start until the content repo push has succeeded*
- [ ] `AI` Add `content/` to `.gitignore`, `git rm -r --cached content` **(destructive — content must be safely pushed first)**
- [ ] `AI` `prebuild` script: `test -d content || git clone --depth 1 …` (token by name, never by value)
- [ ] `AI` Local symlink: `ln -s "<vault>/dll-website-content" content`

**Closing the loop**
- [ ] `ME` Vercel Deploy Hook (`content-push`, branch `main`)
- [ ] `ME` GitHub webhook on the content repo → the hook URL, push event only
- [ ] `BOTH` Verify: push a note → webhook fires → Vercel rebuilds → post is live
- [ ] `AI` Commit the episode — next PATCH in the current MINOR (CLAUDE.md §9)

> **Note:** `noindex` stays ON through this episode. The site does not open to
> search until LOG 004.

> ### ⚠ The `web-thumb` build trap — read before writing in Obsidian
> `web-thumb` runs through Astro's image pipeline, which resolves the path **at
> parse time, before `web-status` is consulted**. A thumb path pointing at a file
> that does not exist yet **fails the whole build — even in a draft.** Verified
> 2026-08-05: a `web-status: draft` note with a dangling `web-thumb` aborts
> `npm run build` with `image-not-found`.
>
> This contradicts the schema's own stated draft-tolerance contract
> ([content.config.ts](src/content.config.ts)), where `.superRefine` deliberately
> lets half-finished drafts through. `image()` bypasses it.
>
> Once the pipeline is live this is a publishing outage: push a half-written note
> and Vercel cannot build, so the last deploy stays frozen and nothing new goes
> out. Mitigated for now by commenting `web-thumb` out in the template — write
> the post, add the image, *then* uncomment.
>
> - [ ] `AI` Consider a real fix so a draft can never break the build (validate
>   thumbs only for published posts, or resolve the path outside the schema)

---

## LOG 003 · Contact form + real domain email `[ ] NEXT`

**Working title:** *My Website Can Now Email Me* ·
**Target: 2026-08-06** (email config planned for this session or the next)

Two separate pipes, easy to conflate: **sending** (form → Resend → inbox) and
**receiving** (`hello@deadlinklabs.com` → Cloudflare routing → Gmail).

**Blocker to know up front:** the project has **no Vercel adapter** and builds
pure static. A form that sends mail needs a server endpoint, so the first move
is `@astrojs/vercel` plus an output-mode change. That is the real shape of this
episode, not the form markup.

**Receiving**
- [ ] `ME` Cloudflare Email Routing → `hello@deadlinklabs.com` forwards to Gmail
- [ ] `ME` SPF, DKIM, DMARC records on Cloudflare DNS
- [ ] `BOTH` Verify the address actually receives — it is already linked in the footer on a live site

**Sending**
- [ ] `ME` Resend account, verify the domain, generate an API key
- [ ] `ME` Add `RESEND_API_KEY` to Vercel env vars
- [ ] `AI` Install `@astrojs/vercel`, switch output mode off pure-static
- [ ] `AI` Server endpoint (e.g. `src/pages/api/contact.ts`)
- [ ] `AI` Wire the About contact form — currently `action="#"` ([about.astro:81](src/pages/about.astro#L81))
- [ ] `AI` Wire the **product waitlist** form — same placeholder, different destination: Resend **Audiences** ([products/[slug].astro:39](src/pages/products/[slug].astro#L39))
- [ ] `AI` Success / error states, honest failure copy
- [ ] `AI` Spam handling (honeypot or similar — no third-party captcha, it would break the no-tracking rule)
- [ ] `AI` Remove the `data-placeholder="not wired to Resend yet"` markers
- [ ] `AI` Commit the episode (CLAUDE.md §9)

> **Two forms, not one.** The contact form and the waitlist go to different
> Resend surfaces (API vs. Audiences). Do not wire one and call the episode done.

---

## LOG 004 · Going public + analytics `[ ]`

**Working title:** *Opening the Doors* · **Target: TBD**

Prerequisite: enough **real** posts that opening to search is not embarrassing.
Do not flip the switch over a wall of placeholders.

- [ ] `AI` `@astrojs/sitemap`
- [ ] `AI` `robots.txt` pointing at the sitemap
- [ ] `AI` **Flip `ALLOW_INDEXING` to `true`** ([BaseLayout.astro:47](src/layouts/BaseLayout.astro#L47)) — the single switch, site-wide
- [ ] `ME` Google Search Console: verify the property, submit the sitemap
- [ ] `ME` Cloudflare Web Analytics (cookieless — no banner, no consent tooling)
- [ ] `AI` Commit the episode (CLAUDE.md §9)

---

## LOG 005 · The presentation layer `[ ]`

**Working title:** *Making the Link Look Alive* ·
**Target: TBD** · Season-one finale.

- [ ] `AI` `astro-og-canvas` — build-time OG share cards in the house style
- [ ] `AI` Full favicon set derived from the network mark (**the small-size logo variant the brief deferred** — CLAUDE.md §3)
- [ ] `AI` Expand JSON-LD: `sameAs` on Person, Article schema on log posts
- [ ] `AI` Custom on-brand 404
- [ ] `AI` Commit the episode (CLAUDE.md §9)

---

## Backlog (unscheduled)

Not assigned to an episode yet. Pull one up when it earns a slot.

- [ ] Replace the remaining placeholder posts with real write-ups
- [ ] Uruguay Outfitters case study — real post (currently a placeholder the Home band links to)
- [x] Crehana case study — real post (LOG 010, six specimen tiles, `npm run tiles`)
- [ ] Portrait photo on About (CLAUDE.md §5.4 calls for one; the page ships without it)
- [ ] `[~]` Cover mark identity work — **uncommitted WIP** on branch `identity-dropout-cover`: modified `src/components/Cover.astro`, untracked `src/components/DropoutMark.astro`
- [ ] Products: purchasable checkout + payment provider (explicitly **not v1** — CLAUDE.md §5.3)
- [ ] "Connections" — render preserved wikilinks as real backlinks (v1 keeps them as plain text)
- [ ] Decision Register on a real experiment record

---

## Decisions log

Short entries only. The reasoning lives in CLAUDE.md; this records *when* and
*what*, so a decision is not silently re-litigated later.

| Date | Decision |
|---|---|
| 2026-07-22 | Launch with placeholder posts + `noindex` on, rather than delay for real content. |
| 2026-08-05 | Positioning is **20+ years**, not thirty. One canonical line across Home, About, and both meta descriptions. |
| 2026-08-05 | Footer manifesto stays **"Share so others can build further."** "So you" was considered and rejected: it breaks the three-beat parallel and reads as marketing cadence. |
| 2026-08-05 | Home band 06 ships **one** button (`See the work →`), not the two CLAUDE.md originally specified. The footer invite sits ~200px below it and points at the same place; a second CTA there would ask twice on one screen. |
| 2026-08-05 | About drops the "Now" and career-arc sections. Now goes stale by design and the Log feed *is* the now; the arc read as résumé recitation. |
| 2026-08-05 | Client proof lives on **one** surface: the Home `#clients` band. About links to it rather than duplicating the list. |
