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

### LOG 013 · Rural Point, and the Throwback format
`v1.02.033` – `v1.02.034` · **written 2026-08-09 → 2026-08-10**

The first record of pre-lab work, and the format that will carry the rest of it.

- [x] LOG 013 written: a 2006 wireless ISP, told in the new throwback register
- [x] **First photographs ever shipped in a post body.** CLAUDE.md §3 *Imagery*
      rewritten: "almost none" was a defense against stock photography that had
      been mistaken for a house style
- [x] `web-series` / `web-series-number` on the content schema — a permanent
      identifier that numbers independently of `web-number` (LOG 013 is also
      THROWBACK / 001), with a per-series uniqueness guard that fails the build
- [x] Throwback band on Home (band 7), curated from `homepage.throwbacks`
- [x] `.clients*` CSS renamed `.stamplist*` and shared by both stamped-list bands
      rather than copied
- [x] `Stamp.astro` takes an optional `series`, so the record stamps both numbers
- [x] VOICE.md §3: a fourth register row, plus a before/after pair retiring the
      one-line-paragraph tic

**The voice finding behind this episode.** VOICE.md was corrected on 2026-08-07 to
allow natural contractions in log posts. A grep of all nine posts then in `content/`
returned **zero** — every apostrophe on the site was a possessive. The correction
had been made in the doc and never applied to prose, which is exactly what "too
clinical, too sanitized" was describing. LOG 013 is the first post written after it.

**`v1.02.034` then applied it to everything already published.** All six published
log posts plus the Hazefield product page were rewritten into the current register,
and their H2 headings reworked to carry the method rather than label the section,
so the heading spine alone shows the thinking to someone who only skims.

- [x] LOG 001, 006, 010, 011, 012 rewritten in register; H2 spines reworked
- [x] Hazefield product page moved from the notebook register to the product row
- [x] LOG 011's CMS call promoted out of a bullet into its own section: who gets
      to change what without calling a developer is the sharpest call in that job
- [x] LOG 001 transcript said "thirty years", now twenty. It contradicted the
      settled positioning and the post's own opening two screens above it
- [x] Atucha hop confirmed as **Gendarmería Nacional**, not Prefectura Naval
- [x] Four photographs placed by section, and `remark-photo-figure` added so a
      photograph and its caption share one `<figure>`. A portrait photo's real
      width is resolved at build (`CAP_H × w/h`) and set on the figure, which is
      what stops a tall picture drifting out of alignment with its own caption
- [x] `web-thumb-alt` / `web-thumb-caption` on the schema. Every header image on
      the site now carries alt text; before this the header rendered with no alt
      attribute at all, which was survivable while every thumb was a generated
      tile and not once they became photographs
- [x] Client-side install shown with a **reference** image of the antenna type.
      The originals are lost, so CLAUDE.md §3 gained its one exception: a
      stand-in is allowed when captioned as representative in words a skimmer
      cannot miss, and when its filename does not claim a provenance it lacks
- [x] Antenna corrected from "the size of a car door" to 60 by 45 cm, from the
      real 24 by 18 in spec
- [ ] `ME` Remaining Rural Point photographs (the Falcon, the laptop on the 12 V
      outlet, the Pentium II, a real client install) if they turn up
- [x] D-Link vs MikroTik settled: MikroTik routing at the base of the tower,
      D-Link access points at the subscriber houses
- [ ] `AI` THROWBACK / 002 (Game Boy screen retrofit) and / 003 (home thermostat)
- [ ] The four placeholder stubs were deliberately skipped in the voice pass. They
      are 86 to 130 words each and slated for replacement, so polishing them is
      work that gets thrown away. Three of them (`local-llm-home-assistant`,
      `hexcast-visualizer`, `og-image-pipeline`) **gave up their `web-number` on
      2026-08-11** — they were squatting 2, 3 and 4 while numbering nothing that
      exists. Each takes a fresh unique number when it is actually written.
      `obsidian-pipeline-notes` keeps 5: it is the visibility-gate fixture, not a
      stub, and must never publish

---

## LOG 002 · Contact form + real domain email `[~] IN PROGRESS`

**Working title:** *My Website Can Now Email Me* · **Target: 2026-08-11**

Two separate pipes, easy to conflate: **sending** (form → Resend → inbox) and
**receiving** (`hello@deadlinklabs.com` → Cloudflare routing → Gmail).

**Why this one leads.** [Footer.astro:20](src/components/Footer.astro#L20) has
advertised `hello@deadlinklabs.com` on a live site since launch, and as of
2026-08-11 the domain carried **no MX, SPF, DKIM or DMARC at all** — the address
went nowhere. A site whose About page ends on "Nothing 404s anymore" was shipping
a dead email address in its own footer.

**Shape of the work.** The project had **no Vercel adapter** and built pure
static. A form that sends mail needs a server endpoint. In Astro 5 that does
*not* mean changing output mode: `output` stays `'static'` and one endpoint opts
out with `export const prerender = false`. The whole site stays static except a
single function. (The earlier note here said "switch output mode off pure-static"
— wrong for Astro 5, and corrected 2026-08-11.)

**Receiving**
- [ ] `ME` Cloudflare Email Routing → `hello@` and `dmarc@` forward to Gmail
- [ ] `ME` SPF, DKIM, DMARC on Cloudflare DNS — every mail record **DNS-only (grey cloud)**
- [ ] `ME` DMARC starts at `p=none`, `rua=mailto:dmarc@deadlinklabs.com`. **Not** a
      Gmail address: cross-domain reporting needs an authorization record at the
      receiving domain, which for `gmail.com` cannot exist, so most reporters
      silently refuse. No `adkim=s` / `aspf=s` either — Resend signs from the
      `send.` subdomain and strict alignment would bounce the site's own form mail
- [ ] `BOTH` Verify the address actually receives, before any code is trusted

**Sending**
- [ ] `ME` Resend account, verify the **root** domain, generate an API key
- [ ] `ME` Add `RESEND_API_KEY` to Vercel env vars — Production *and* Preview.
      Key on the laptop but not on Vercel means the form works locally and 500s live
- [x] `AI` Install `@astrojs/vercel`; `output` stays `'static'`, one route opts out `2026-08-11`
- [x] `AI` Server endpoint `src/pages/api/contact.ts`, reading the key via `astro:env` `2026-08-11`
- [x] `AI` Wire the About contact form — was `action="#"` ([about.astro:108](src/pages/about.astro#L108)) `2026-08-11`
- [x] `AI` **Add the missing email field** — the form collected a name and a problem and no way to reply `2026-08-11`
- [x] `AI` Success / error states, honest failure copy that hands over the mailto fallback `2026-08-11`
- [x] `AI` Remove the `data-placeholder="not wired to Resend yet"` marker `2026-08-11`
- [ ] `ME` Gmail **Send-As** over Resend SMTP, so replies leave *from* `hello@`
      (free consumer Gmail; no Workspace needed)

**The record**
- [x] `AI` Two-pipes flow chart, DNS-records tile, cover `2026-08-11`
- [x] `AI` The post — `web-number: 2` `2026-08-11` — **written as a draft on purpose.**
      No DNS record exists yet, so no message has travelled the whole pipe. Flip
      `web-status` to `published` and `web-stage` to `SETTLED` once the `ME` boxes
      above are green and the live test passes
- [x] `AI` Revise [the script](my_assets/video-scripts/log002-contact-form-and-email.md) `2026-08-11`
- [ ] `AI` Commit the episode (CLAUDE.md §9)

> **Deferred on purpose, not forgotten** (2026-08-11). This note used to read
> *"Two forms, not one — do not wire one and call the episode done."* That is no
> longer the plan. The **product waitlist**
> ([WaitlistForm.astro:20](src/components/WaitlistForm.astro#L20)) goes to a
> different Resend surface (Audiences, not the send API) and gets its own
> episode, as does **spam handling**. Splitting them is deliberate: smaller
> chunks, more to document. **The honeypot is a hard prerequisite of LOG 004: it
> lands before `ALLOW_INDEXING` flips, never after.** Deferring it past this
> episode is only acceptable while that ordering holds.

---

## LOG 003 · Obsidian publishing pipeline `[~] IN PROGRESS`

**Working title:** *I Push a Note in Obsidian. Site Rebuilds Itself.* ·
**Target: TBD**

> **Renumbered 2026-08-11.** This was LOG 002. The contact-form episode overtook
> it — that work was unblocked and this one is not — so the two swapped, and the
> video scripts swapped filenames with them. LOG 004 and 005 are unaffected.
> `web-number: 3` is reserved for this record.

Goal: the site repo contains **zero posts**. Writing a note in Obsidian and
pushing it is the entire act of publishing.

**The vault**
- [x] `ME` Obsidian installed, vault exists — written `<vault>` throughout this file; the real path stays local
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
> It matters most once the pipeline is live, when a half-written note reaches the
> build directly. Mitigated for now by commenting `web-thumb` out in the template
> — write the post, add the image, *then* uncomment.
>
> - [ ] `AI` Consider a real fix so a draft can never break the build (validate
>   thumbs only for published posts, or resolve the path outside the schema)

---

## LOG 004 · Going public + analytics `[ ]`

**Working title:** *Opening the Doors* · **Target: TBD**

Prerequisite: enough **real** posts that opening to search is not embarrassing.
Do not flip the switch over a wall of placeholders.

- [ ] `AI` **Spam-guard the contact form before anything else here** — honeypot +
      timing check, deferred out of LOG 002 on purpose. No third-party captcha; it
      would break the no-tracking rule. This is a hard gate, and it leads this list
      on purpose: the guard ships before `ALLOW_INDEXING` flips, never after
- [ ] `AI` `@astrojs/sitemap`
- [ ] `AI` `robots.txt` pointing at the sitemap
- [ ] `AI` **Flip `ALLOW_INDEXING` to `true`** ([BaseLayout.astro:90](src/layouts/BaseLayout.astro#L90)) — the single switch, site-wide
- [ ] `AI` Confirm `/thank-you/` stays out of the index on its own `noindex` prop
- [ ] `ME` Google Search Console: verify the property, submit the sitemap
- [ ] `ME` **Cloudflare** Web Analytics (cookieless — no banner, no consent tooling).
      Settled 2026-08-11 over Vercel: free with no cap, 6-month retention against
      Vercel Hobby's 1 month, Core Web Vitals included rather than a separate
      product, and custom events are unavailable on both free tiers so Vercel's one
      possible edge is not on the table. Form conversions are already counted in
      the Resend dashboard. **Pick one, not both**
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

- [ ] **Product waitlists → Resend Audiences** — split out of LOG 002 on 2026-08-11.
      [WaitlistForm.astro:20](src/components/WaitlistForm.astro#L20) is still
      `action="#"` on both product pages. Different Resend surface (Audiences, not
      the send API), so it is its own episode rather than a footnote to the contact
      form. Ships with the dead `web-waitlist` field cleanup below
- [ ] Dead schema field: `web-waitlist` is defined and mapped
      ([content.config.ts:63](src/content.config.ts#L63), :114) but nothing reads
      `data.waitlist` — `products/[slug].astro` derives visibility from `web-stage`
      instead, and no content file sets it. Remove it or wire it
- [ ] Replace the remaining placeholder posts with real write-ups
- [ ] Uruguay Outfitters case study — real post (currently a placeholder the Home band links to)
- [x] Crehana case study — real post (LOG 010, six specimen tiles, `npm run tiles`)
- [x] Portrait photo on About — 150px round beside a `Marcelo Brouard` H1, and 104px on Home band 06 (`avatar-2024-mb.jpeg`, the same asset the record byline uses)
- [ ] `[~]` Cover mark identity work — **uncommitted WIP** on branch `identity-dropout-cover`: modified `src/components/Cover.astro`, untracked `src/components/DropoutMark.astro`
- [ ] **Astro major upgrade (5 → 7).** Surfaced 2026-08-11 while adding the Vercel
      adapter. Astro 5.18.2 is the newest 5.x, and **every open advisory against
      `astro` has a fix range in 6.x or 7.x only** — there is no patched Astro 5.
      Same for the adapter: the `x-astro-path` unauthenticated path override is
      fixed in `@astrojs/vercel` ≥ 10.0.2, which requires Astro 6, so every
      adapter version compatible with Astro 5 carries it. Real exposure here is
      low (the XSS advisories cover `define:vars`, slot names, spread props and
      view transitions, none of which this site uses; it ships zero JS and the
      content is ours; the path override has no private route to reach), but it
      does not go away on its own. Its own episode: the remark plugins, content
      collections and image pipeline all need re-verifying
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
| 2026-08-09 | **Throwback** is a format, not a schedule. Pre-lab projects get written up when Marcelo remembers one and the evidence survives. Explicitly not weekly, explicitly not "Throwback Thursday" — cadence pressure turns an archive into content. |
| 2026-08-09 | Series numbers (`THROWBACK / 001`) live in **frontmatter**, not in `site.config.json`. Same argument as `web-number`: a permanent, externally-cited identifier must not come from a reorderable array. |
| 2026-08-09 | **Real photographs are welcome, and a post uses as many as the story earns.** The old "almost none" rule was a defense against stock photography written when the archive was empty; it was never a house style. Still banned: stock, AI-generated, 3D renders, and any illustrative photo of hardware that is not the actual hardware. |
| 2026-08-10 | The client band **leads the archive**: it moves directly under the hero, opened by a full-ink chapter-break rule with extra air, plus a lede naming what the rows are. It is the only proof surface for goals #1 and #2 and it was the quietest band on the page. Rejected: bolding or orange-ing the rail label, and enlarging the section number — chrome nobody reads at scan distance, and orange there would spend the §3 scarcity budget. Emphasis comes from position, a rule, or air. |
| 2026-08-10 | **The paper is the design.** A warm `--color-surface-2` tint plate for the client band was built and rejected on sight. Products earns graphite because it showcases screens on a dark surface; a coloured plate mid-sheet just stains the paper. No band gets a background. Do not re-propose it. |
| 2026-08-10 | **One size per role** (§3). The homepage had drifted to eight sans sizes because each component picked its own; all card/row titles are now 20, all snippets 15, all paragraphs 18, and the `.stamplist--lead` modifier that had bumped the client rows is gone. Adding a size to make something louder is the wrong lever. |
| 2026-08-10 | **Section numbers are derived, never hand-written.** Bands are conditional (Products and Throwback need non-empty arrays), so literal `num` props drift silently — the rail shipped starting at `03` with no `01` on the page. `index.astro` now builds the list of rendering bands and indexes into it. |
| 2026-08-10 | **Three numbering systems, kept apart.** CLAUDE.md §5.1's band index counts the masthead and footer; the rail's `01`…`06` counts only labelled bands; a record number (`LOG 001`) says which post this is. The hero gutter was printing an oversized record number right above the section numbers, so the rail read as two systems in one column. The record number moved into the eyebrow stamp (`FEATURED ON THE BENCH · LOG 001`) and the rail now carries section numbers only. |
| 2026-08-10 | **The hero is the Featured band, at rail 01.** The separate Featured-cards band was merged into it: it carried the same label, so a second `heroPost` would have produced two bands both called "Featured" with two numbers. Extra `heroPosts` now render as cards inside the hero's band. Its rail number is the one sanctioned `size="lead"` exception to uniform rail sizing. |
| 2026-08-10 | **Log feeds sort by `web-number` descending**, not `web-pub-date` (§4). The date-sorted feed read 013, 012, 006, 010, 011 — correct, and visibly broken to anyone scanning the numbers. The record number is the spine the reader follows, so the feed agrees with it. Applies everywhere the log is listed: homepage Recent, `/log`, RSS, prev/next. Products keep date order. The cost: dates run out of order where `web-number` and `web-pub-date` disagree, which they currently do — the archive is being seeded fast to have real work on the page, and the dates are placeholders until the Obsidian pipeline lands (LOG 003, renumbered from 002 on 2026-08-11). Accepted tradeoff, not a defect. |
| 2026-08-10 | Band renamed **"Client work"**, not "Shipped for clients". It now carries a `PROPOSAL · 2026` row, so a heading claiming "shipped" is contradicted by the row under it. The `#clients` id and `/#clients` anchor are unchanged. |
| 2026-08-10 | **Home band 06 gets a face**, 104px and round, beside the positioning line. The band is labelled "Who runs this" and was answering with text alone. Byline scale (28px) was considered and rejected: next to an 18px paragraph it reads as a mark, not a person. The paragraph itself is untouched — it is the canonical line in four places, and only the layout around it moved. |
| 2026-08-10 | **Band 06's button says `About me →` and points at `/about`**, not `See the work →` at `/log`. A reader who reaches band 06 has scrolled past five bands of work, so the old button pointed at the thing they had just done and changed the subject away from the person the band had introduced. Still one button: the 2026-08-05 decision against a second CTA here holds, and this is ink chrome landing on the top of About, not the `#work-with-me` anchor the footer owns. |
| 2026-08-10 | **About opens as a person's page.** `About` drops to the eyebrow, `Marcelo Brouard` becomes the H1 with a 150px portrait beside it and the city as a mono dateline. §5.4's locked beat is intact — its first line moved from the prose into the header — and the origin section now ledes on the positioning line. Bonus: the name is an H1 on the page carrying the `Person` schema, which is what §2's search goal wants. The `Deadlink Labs` eyebrow went because the nav wordmark sits directly above it. |
| 2026-08-11 | **LOG 002 and LOG 003 swapped.** The contact-form episode overtook the Obsidian pipeline: its work was unblocked and the pipeline's remaining beats are all gated behind a live recording. Safe because neither had published a post, so no number was cited outside the repo. Both video scripts renamed with them; LOG 004 and 005 untouched. Three retired scaffold stubs gave up `web-number` 2, 3 and 4, which they were squatting while numbering nothing that exists. |
| 2026-08-11 | **`output` stays unset (`'static'`); one route opts out.** The Vercel adapter does not require switching to server rendering, and the earlier roadmap note saying "switch output mode off pure-static" was wrong for Astro 5. Build proves it: 13 static HTML pages, one function, routed only for `/api/contact`. `@astrojs/vercel` pinned to `^9.0.5`, the last major peering with Astro 5. |
| 2026-08-11 | **Secrets read via `astro:env/server`, not `import.meta.env`.** Non-`PUBLIC_` vars are statically replaced at build time, compiling the key into the function bundle instead of reading it at runtime. `astro:env` also validates, so a missing key fails loudly. |
| 2026-08-11 | **The contact endpoint sends to `hello@`, not to a personal inbox.** The destination lives in a Cloudflare forwarding rule rather than in code, so it changes without a deploy, and the personal address never appears in public source. Both pipes therefore converge on one address, which is what the post's diagram is about. |
| 2026-08-11 | **Resend reports a rejected send in the payload, not by throwing.** Found by testing with a deliberately invalid key. A handler with only `try/catch` falls through to success and loses the message silently. The handler checks `error` as well as catching. Recorded because the failure looks exactly like success. |
| 2026-08-11 | **Contact-form failure is reported with CSS `:target`, zero JavaScript**, so the About page stays prerendered. Redirects are `303` so a refresh cannot resubmit. The error copy hands over the direct mailto, because an error that only apologises is a second dead end. |
| 2026-08-11 | **Spam protection and the product waitlists are deferred to their own episodes**, at Marcelo's call, for smaller and better-explained chunks. This retires the old "two forms, not one, do not wire one and call the episode done" note. The honeypot is a hard gate before `ALLOW_INDEXING` flips at LOG 004: `noindex` is currently the only thing keeping scrapers off a public unguarded endpoint. |
| 2026-08-11 | **Analytics will be Cloudflare Web Analytics, not Vercel and not GA4.** Free with no cap, 6-month retention against Vercel Hobby's 1 month, Core Web Vitals included rather than a separate product. Custom events are unavailable on both free tiers, so Vercel's only possible edge is off the table, and form conversions are already counted in Resend. CLAUDE.md §4 said GA4 and has been corrected. Pick one, not both. |
| 2026-08-11 | **DMARC `rua` must be an address on the domain**, not a Gmail. Cross-domain reporting requires an authorization record published by the receiving domain, which `gmail.com` has not published and will not, so most reporters silently refuse. Alignment stays relaxed: Resend signs from `send.`, and strict alignment would bounce the site's own form mail. |
| 2026-08-11 | **CLAUDE.md §3's specimen-animation paragraph described a mechanism that was never built** (a `class` driven by CSS in `[slug].astro`, a `@keyframes specimen-flow`). What ships is self-contained: each animated `.svg` carries its own keyframes and reduced-motion guard, so it animates identically opened anywhere. Corrected in place. Marching dashes are ambient and may ship in a post; a step reveal is a performance and belongs in a video. |
