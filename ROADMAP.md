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

> Episode narration scripts live in the Obsidian vault, `DLL-CONTENT/dll video
> scripts/` — **outside this repo** (moved 2026-08-12), beside the content repo
> and never inside it. This file is the tracked version of the plan and outranks
> them when they disagree.

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
- [x] `VOICE.md` + the `/log-post` skill (`VOICE.md` split into `VOICE-POSTS.md` + `VOICE-SCRIPTS.md` on 2026-08-11)
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

### LOG 015 · Rural Point, and the Throwback format
`v1.02.033` – `v1.02.034` · **written 2026-08-09 → 2026-08-10**

The first record of pre-lab work, and the format that will carry the rest of it.

- [x] LOG 015 written: a 2006 wireless ISP, told in the new throwback register
- [x] **First photographs ever shipped in a post body.** CLAUDE.md §3 *Imagery*
      rewritten: "almost none" was a defense against stock photography that had
      been mistaken for a house style
- [x] `web-series` / `web-series-number` on the content schema — a permanent
      identifier that numbers independently of `web-number` (LOG 015 is also
      THROWBACK / 002), with a per-series uniqueness guard that fails the build
- [x] Throwback band on Home (band 7), curated from `homepage.throwbacks`
- [x] `.clients*` CSS renamed `.stamplist*` and shared by both stamped-list bands
      rather than copied
- [x] `Stamp.astro` takes an optional `series`, so the record stamps both numbers
- [x] VOICE.md §3: a fourth register row, plus a before/after pair retiring the
      one-line-paragraph tic

**The voice finding behind this episode.** VOICE.md (now VOICE-POSTS.md) was corrected on 2026-08-07 to
allow natural contractions in log posts. A grep of all nine posts then in `content/`
returned **zero** — every apostrophe on the site was a possessive. The correction
had been made in the doc and never applied to prose, which is exactly what "too
clinical, too sanitized" was describing. LOG 015 is the first post written after it.

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
- [x] `AI` THROWBACK / 001 shipped as LOG 013 (see below). / 003 (home thermostat) still open
- [ ] The four placeholder stubs were deliberately skipped in the voice pass. They
      are 86 to 130 words each and slated for replacement, so polishing them is
      work that gets thrown away. Three of them (`local-llm-home-assistant`,
      `hexcast-visualizer`, `og-image-pipeline`) **gave up their `web-number` on
      2026-08-11** — they were squatting 2, 3 and 4 while numbering nothing that
      exists. Each takes a fresh unique number when it is actually written.
      `obsidian-pipeline-notes` keeps 5: it is the visibility-gate fixture, not a
      stub, and must never publish

### LOG 013 · The DMG chiptune machine, and THROWBACK / 001
`v1.02.082` · **written 2026-08-23**

A 2017 Game Boy DMG rebuilt into an LSDj instrument: retrobrite, button pads,
backlight, bivert, pro sound. The second throwback, and the first record on the
site that is evidence of the *creative* half of the lab rather than client work.

- [x] LOG 013 written, `web-number: 13`, THROWBACK / 001, homepage band row added
- [x] Twelve photographs placed, all with EXIF-verified dates
- [x] Cover built from the post's own artwork (the retrobrite before/after), not
      `npm run cover` — CLAUDE.md §3, "when the post has artwork, use the artwork"

**The archive corrected the memory, in eight places.** The draft was written from
recollection and then checked against EXIF `DateTimeOriginal` on every photograph,
cross-referenced with the Hand Held Legend shipping mail. Retrobrite was
remembered as happening *while waiting for parts*; it happened five months after
they arrived. Shipping was remembered as "a couple of months"; it was four. The
pro sound mod was remembered as undocumented; two photographs show it. The
closing scene was remembered as the next day; it is nine months later, and that
is the better fact, because it proves the machine got used.

- [x] `DMG-03` corrected to `DMG-CPU-03`. Every original Game Boy is model
      DMG-01; the revision is the board. Confirmed on the silkscreen through the
      battery window, and it is the revision the chiptune scene tells you to skip
      for LSDj (wave-channel sample playback), which the post states plainly
- [x] One beat left deliberately open rather than guessed: whether Marcelo knew
      the CPU-03 advice at purchase. Written as an honest gap, with the note to
      himself in a `%%…%%` Obsidian comment that `remark-obsidian.mjs` strips
- [x] Two spines drafted. The shipped one runs on reversibility (do every
      undoable step before the one with no undo); the chronological alternative
      is parked at `_drafts/` inside the post folder, four levels deep so the
      loader's `*/*/*.md` glob cannot see it or collide on the slug
- [ ] `ME` Pick a spine and delete the loser. `_drafts/` must not survive to a
      commit that ships

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
*not* mean changing output mode: `output` stays `'static'` and only the action
endpoint is on-demand. The whole site stays static except a single function.
(The earlier note here said "switch output mode off pure-static" — wrong for
Astro 5, and corrected 2026-08-11.)

**Build it the way Resend documents it** (2026-08-12). Resend's Astro guide
(<https://resend.com/docs/send-with-astro>) does not use a hand-written API
route. It uses an **Astro Action**: `src/actions/index.ts`,
`defineAction({ accept: 'form' })`, a zod `input` schema, and a `{ data, error }`
return. That replaces the hand-rolled endpoint, its `clean()`/`MAX`/`EMAIL`
validation, and all the client-side fetch/JSON/status plumbing. It is also the
version a viewer can replicate straight from the official docs.

**Call the action from a script, not from `<form action={actions.contact}>`.**
Astro's docs are explicit that a form action requires the *page* to be
on-demand rendered. Using it would force `prerender = false` on `/about` and turn
the archive's most important page into a function. Client-side RPC keeps About
prerendered, because only the action endpoint runs server-side.

**A failed send must keep what the visitor typed.** The v1 endpoint redirected
every failure to `/about/#contact-error`, so the visitor landed on an empty form
reading "Something broke on my end" even when the real problem was a typo in
their address. On the one page that asks for anything, that is the whole funnel.
Errors now render in place with the fields intact, and field-level messages come
back from the same schema that validates them. `/thank-you/` and the `:target`
block both go away with the redirect.

**Receiving**
- [x] `ME` Cloudflare Email Routing → `hello@` and `dmarc@` forward to Gmail `2026-08-13`
- [x] `ME` SPF, DKIM, DMARC on Cloudflare DNS — every mail record **DNS-only (grey cloud)** `2026-09-15`
- [x] `ME` DMARC starts at `p=none`, `rua=mailto:dmarc@deadlinklabs.com`. **Not** a
      Gmail address: cross-domain reporting needs an authorization record at the
      receiving domain, which for `gmail.com` cannot exist, so most reporters
      silently refuse. No `adkim=s` / `aspf=s` either — Resend signs from the
      `send.` subdomain and strict alignment would bounce the site's own form mail `2026-09-15`
- [x] `BOTH` Verify the address actually receives, before any code is trusted `hello@ 2026-08-13 · dmarc@ 2026-09-15`

**Sending**
- [ ] `ME` Resend account, verify the **root** domain, generate an API key
- [ ] `ME` Add `RESEND_API_KEY` to Vercel env vars — Production *and* Preview.
      Key on the laptop but not on Vercel means the form works locally and 500s live
- [x] `AI` Install `@astrojs/vercel`; `output` stays `'static'` `2026-08-11`
- [x] `AI` **Add the missing email field** — the form collected a name and a problem and no way to reply `2026-08-11`
- [x] `AI` Remove the `data-placeholder="not wired to Resend yet"` marker `2026-08-11`
- [ ] `ME` Gmail **Send-As** over Resend SMTP, so replies leave *from* `hello@`
      (free consumer Gmail; no Workspace needed)

**On camera — the build itself.** Everything below is filmed, not pre-run. A v1
hand-rolled endpoint exists in the repo and gets replaced live; do not do this
work ahead of the shoot.

- [ ] `BOTH` `src/actions/index.ts` — `contact` action, zod `input` schema, key
      via `astro:env/server` (**not** `import.meta.env`, which compiles the key
      into the bundle), plain `text:` body (**not** `html:`, no interpolation
      surface), and the `if (error)` check on the Resend result
- [ ] `BOTH` Delete `src/pages/api/contact.ts` — the action endpoint replaces it
- [ ] `BOTH` Delete `src/pages/thank-you.astro` — reachable only from the redirect
      being removed
- [ ] `BOTH` About form: `maxlength` mirroring the schema, per-field error spans
      with `aria-describedby`, one `role="alert"` block, a success panel reusing
      the `.contact` card treatment, a `<noscript>` mailto. Drop the
      `.contact-error:target` CSS
- [ ] `BOTH` The submit script (~25 lines, Nav.astro idiom): `reportValidity()`,
      disabled + `Sending…` button, `actions.contact(new FormData(form))`,
      `isInputError` → per-field messages, otherwise `error.message` inline.
      **No auto-resubmit on a network throw** (the send may already have landed)
- [ ] `BOTH` Verify: `/about` still builds to static HTML, one `.func` in the
      output, and a forced failure leaves all four fields filled

**One action, two forms** (added 2026-08-14, script §14). The action is written
generic from the start — the field is `message`, not `problem`, plus a required
`source` naming the originating form — so the Cassette Mixtapes beta form reuses
it with no second endpoint. `source` builds the subject line, which is the only
thing keeping the two apart in one inbox. **Do not build this before §9 exists on
camera**; the whole beat is that the second form costs nothing.

- [ ] `BOTH` `WaitlistForm.astro`, `isPrivateBeta` branch only: add the missing
      Name field, `about` → `message`, hidden `source`, drop `action="#"` and the
      `data-placeholder` marker. **The COMING SOON branch stays untouched**
- [ ] `BOTH` `web-form-prompt` (optional string) in the products schema beside
      `web-lead`, mapped in the transform, passed from `products/[slug].astro` as
      the label prop. Already set on the Mixtapes note, tolerated by
      `.passthrough()` until the schema lands. A new product then sets its own
      question in Obsidian with no code change
- [ ] `BOTH` Extract the submit script into one shared module both pages import —
      two copies of that logic is the thing this beat exists to avoid
- [ ] `BOTH` `message` required when `source` is `contact`, optional for a beta
      request (`superRefine` on `source`, not optional for both — a required
      essay costs more beta requests than the answer is worth)
- [ ] `BOTH` Verify: still one `.func`; both forms land at `hello@` with
      distinguishable subjects; `/products/hazefield` still an inert placeholder

**The record**
- [x] `AI` Two-pipes flow chart, DNS-records tile, cover `2026-08-11`
- [x] `AI` The post — `web-number: 2` — **written as a draft on purpose**, then
      rewritten `2026-08-12` around the Actions build: 11 H2s down to 10,
      decisions-forward, no correction arc. Emphasis redistributed to 20/44/69%
      (was clumped). Flip `web-status` to `published` and `web-stage` to
      `SETTLED` once the `ME` boxes are green and the live test passes
- [ ] `AI` Post: past-tense the Honest note, fill the build-output terminal block
      with real numbers (both marked with `%%…%%` in the draft)
- [x] `AI` Revise the video script (vault, `log-002-(video-script)-…`) `2026-08-11`
- [ ] `AI` Commit the episode (CLAUDE.md §9)

> **Deferred on purpose, not forgotten** (2026-08-11, **narrowed 2026-08-14**).
> This note used to read *"Two forms, not one — do not wire one and call the
> episode done"*, then *"the product waitlist gets its own episode"*. Both were
> too broad: they treated the two product forms as one thing, and they are not.
>
> **The split is message vs mailing list, not contact vs product.** Cassette
> Mixtapes is `PRIVATE BETA` — with a name and a "what do you make" answer it is
> shaped exactly like a consulting inquiry, so it ships **here**, through the
> same action (see "One action, two forms" above). Hazefield is `COMING SOON`,
> email only, no message: that is a list signup, it wants Resend **Audiences**
> rather than the send API, and forcing it through this episode would mean an
> email per signup and no actual list to mail when the product opens. It keeps
> its own episode, as does **spam handling**.
>
> **The honeypot is a hard prerequisite of LOG 004: it lands before
> `ALLOW_INDEXING` flips, never after.** That ordering is unchanged, and now
> covers **both** wired forms.

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
- [x] `AI` Install the `web-post` template at `DATA/Templates/web-post.md` `2026-08-05` — a copy of [log-post-template.md](my_assets/templates/log-post-template.md), which stays the source of truth (VOICE-POSTS.md §8); re-copy it if the repo one changes
- [ ] `ME` Create an Obsidian **Base** over `log/`, sorted by `web-number`
- [x] `AI` **Canvas rendering** — `![[Name.canvas]]` embeds render as inline SVG `2026-08-12`
      ([`remark-canvas.mjs`](src/plugins/remark-canvas.mjs), JSON Canvas 1.0). Vault-first:
      the embed previews as a live canvas in Obsidian and ships as the same drawing.
      Note for the Base above — a `.canvas` carries no frontmatter and can never appear in one.

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
      *(The old `/thank-you/` indexing box is gone: LOG 002 replaced the redirect
      with an in-place confirmation, so the page no longer exists.)*
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
| 2026-08-11 | **Spam protection and the product waitlists are deferred to their own episodes**, at Marcelo's call, for smaller and better-explained chunks. This retires the old "two forms, not one, do not wire one and call the episode done" note. The honeypot is a hard gate before `ALLOW_INDEXING` flips at LOG 004, and the two ship in that order, never the reverse. |
| 2026-08-11 | **Analytics will be Cloudflare Web Analytics, not Vercel and not GA4.** Free with no cap, 6-month retention against Vercel Hobby's 1 month, Core Web Vitals included rather than a separate product. Custom events are unavailable on both free tiers, so Vercel's only possible edge is off the table, and form conversions are already counted in Resend. CLAUDE.md §4 said GA4 and has been corrected. Pick one, not both. |
| 2026-08-11 | **DMARC `rua` must be an address on the domain**, not a Gmail. Cross-domain reporting requires an authorization record published by the receiving domain, which `gmail.com` has not published and will not, so most reporters silently refuse. Alignment stays relaxed: Resend signs from `send.`, and strict alignment would bounce the site's own form mail. |
| 2026-08-11 | **CLAUDE.md §3's specimen-animation paragraph described a mechanism that was never built** (a `class` driven by CSS in `[slug].astro`, a `@keyframes specimen-flow`). What ships is self-contained: each animated `.svg` carries its own keyframes and reduced-motion guard, so it animates identically opened anywhere. Corrected in place. Marching dashes are ambient and may ship in a post; a step reveal is a performance and belongs in a video. |
| 2026-08-11 | **`VOICE.md` split into `VOICE-POSTS.md` and `VOICE-SCRIPTS.md`.** One file served both surfaces through a "register dial" and the dial was read wrong in both directions: posts inherited the teleprompter no-contractions constraint and read like terms and conditions (zero contractions across nine published posts), while scripts drifted casual because the post rules were the ones people read (LOG 002 at 78 contractions against LOG 001's 12). **Posts use contractions freely; scripts avoid them.** §1 of both files is byte-identical and must be changed in both or neither. The `/log-post` skill now routes by surface. |
| 2026-08-11 | **The emphasis ladder: `==highlight==`, `**bold**`, plain.** Three tiers, one job each. Prompted by wanting Ferriss-style skimmability, but the investigation found bold had no system at all: usage ran from 14 marks in LOG 001 to zero across LOG 015's 3,540 words, and where it was used it did three unrelated jobs (thesis sentence, bullet lead-in, term first-mention). Same fix as "one size per role" for type. **Term first-mentions are now plain** — eleven of LOG 001's fourteen marks were `**Astro**`-style labels, which is why that post looked emphasized while emphasizing nothing. |
| 2026-08-11 | **Highlight budget: one per H2 section, three per post, enforced at build** by `remark-mark.mjs`, which fails naming the file and the section. Same argument as "exactly one orange live node" on a tile. The syntax is Obsidian's own `==text==`, so the vault preview and the site agree with no export step; the site additionally renders it bold, which is the one accepted delta. |
| 2026-08-11 | **Yellow joins the palette as `--color-highlight`, and the accent budget now covers two colours.** Orange means LIVE (status dot, live node, working URL), yellow means READ THIS. Different hues so the systems cannot blur; never reach for signal orange as a highlight. Ink on the composited yellow measures 15.8:1, against 17.1 on bare paper, so contrast was never the constraint — scarcity is. Alpha 0.5 is a tunable dial, not a fixed value. |
| 2026-08-11 | **The highlight is a band, not a box.** Gradient hard-stops at 20/90 of the inline box, so the stroke sits on the x-height and descenders break its bottom edge the way they do under a real marker. The first pass used 14/92, swallowed the descenders, and read as a filled rectangle. `box-decoration-break: clone` so a wrapped highlight renders as separate bands per line. Verified in a headless render including a three-line wrap. |
| 2026-08-12 | **`CLAUDE.md` stays public in the public repo, deliberately.** Audited on the question of gitignoring it. It is already the subject of a published post — LOG 001 carries `DEC 005 · One brief, CLAUDE.md, as the single source of truth`, and the post's own tile resolves onto a `CLAUDE.md` node — so hiding it would build a dead link into the site named after resolving them. It also leaks nothing new: tokens are in `global.css`, the `web-*` contract in `content.config.ts`, versions in `git log`, and the client is anonymized identically in the brief, `site.config.json` and the post. (This clause originally cited the VOICE files as another public location; they went local-only later the same day, which changes nothing here — §6 keeps the summary, and the summary was always the public part.) No credentials are or ever were tracked. The stated cost is that §1 names the consulting funnel the site never names; the fix for that is rewording §1, not hiding the file. **Do not re-propose gitignoring it.** |
| 2026-08-12 | **Operational holes are not documented in prose; the ordering gate is.** Three separate places had written down that the contact endpoint is unguarded and that `noindex` was the only thing keeping scrapers off it — the LOG 002 note, the LOG 004 checkbox, and the decisions log, the last one rewritten fresh after the first two were fixed. All now state the gate (honeypot ships before `ALLOW_INDEXING` flips, never the reverse) without naming the last line of defense. `CLAUDE.md` §4's "no spam protection yet" stays: it is load-bearing, and it stops the next agent assuming a honeypot exists. The real control is the ordering, not the wording — the public source discloses the missing honeypot regardless. |
| 2026-08-12 | **Obsidian canvases render on the site, as is** ([`remark-canvas.mjs`](src/plugins/remark-canvas.mjs)). Implements **JSON Canvas 1.0** (<https://jsoncanvas.org/spec/1.0/>) — the *format* is MIT and was open-sourced by Obsidian in 2024, the *app* is not, so this is written to the published spec rather than copied from a reference renderer. All node types recognized, all edge attributes honoured including the `fromEnd: none` / `toEnd: arrow` defaults, both `canvasColor` forms. `file` nodes and group `background` images fail the build by name: those paths are vault-absolute and the build only clones `content/`. |
| 2026-08-12 | **`![[Name.canvas]]` is the one sanctioned wikilink embed**, narrowing CLAUDE.md §8's ban to images. The ban exists because Astro's image pipeline cannot resolve a wikilink; a canvas never touches that pipeline. A ```` ```canvas ```` fence was specified first and rejected: it shows a code block in Obsidian, and **WYSIWYG in the vault is the requirement**, not a preference. Alt rides the pipe; the caption is the italic paragraph below, reusing the photograph convention rather than inventing a device. |
| 2026-08-12 | **Canvas card text is laid out by the browser, in `<foreignObject>`, not by hand in `<text>`.** The first pass set it in Plex Mono and wrapped it against mono's 0.6em advance, which required a markdown parser, a line breaker and a shrink-to-fit search — and still could not match Obsidian, which uses its sans UI font. Both of its bugs came from that: `**WEBSITE PREMISE**` printed its asterisks when a bold span wrapped, and three cards in one drawing rendered at 17/15/14px. **Overflow spills rather than clips** — clipping silently deleted the last line of four cards. Cost: `foreignObject` does not rasterize under sharp, so preview the real page. |
| 2026-08-12 | **A wide canvas is small on a phone, and that is accepted, not fixed.** Measured on LOG 001's: 11.0px card text at a 1440 viewport, 6.0px at 500 — the decorative tier by CLAUDE.md §3's own yardstick. A breakout-width figure and a scroll container were both available and neither was built: the caption and surrounding prose carry the meaning, and inventing a layout device for one artifact is how a design system rots. The rule that follows is editorial — **never put a load-bearing fact only inside a canvas.** |
| 2026-08-12 | **Prose CSS cascades into `<foreignObject>`, and it made a canvas line invisible.** BLUEPRINT's `<p><em>WHY</em> the website exists</p>` was matched by the caption rule `.prose p:has(> em:only-child)` — `:only-child` counts element siblings only, so a trailing text node does not save you — and rendered at 13px in ink-60 on a dark panel. The neighbouring card survived by accident, because `***HOW***` emits `<strong><em>`. Fix is structural, not a specificity fight: **the renderer emits only `div` and `span`, styled inline**, so no prose selector can match. Caught by Marcelo on the real page; the screenshot harness had missed it by reproducing the figure *without* its `.prose` ancestor — the exact context that caused it. **Verify canvases on the real page.** |
| 2026-08-12 | **Editing a remark plugin requires a dev-server restart; `--force` does not cover it.** Astro restarts on `astro.config.mjs` changes, but plugins are modules imported *by* the config, so editing `src/plugins/*.mjs` leaves Node's module cache untouched and a running `npm run dev` keeps using the old code. The failure mode is nasty because it mimics a fix that did not work: the build is correct and localhost is stale. Recorded next to the `--force` data-store caveat in CLAUDE.md §3 — same family, different cache. |
| 2026-08-12 | **A highlight may wrap inline formatting; `remark-mark` was too naive.** `==**bold**==` is valid Obsidian and renders there, but the plugin only ever split a single text node, so the `**` pushed the two `==` into separate nodes, they never paired, and the build died on "2 stray ==". Pairing now happens across the children array — open marker, next marker at the same level, wrap everything between — so marks spanning bold, italic, links and inline code all work. Unit-checked on ten cases including nesting and two-marks-per-line. **The vault and the site disagreeing is the one thing the `==` convention exists to prevent.** |
| 2026-08-12 | **The emphasis budget warns instead of failing** (Marcelo's call). One-per-section / three-per-post is guidance for whoever drafts, including an agent; it is not a rule the author must obey, and encoding it as a thrown error meant he could not overrule his own style guide without editing a plugin. Still fatal: an unclosed `==`, which renders as a literal `==` nobody notices, and an empty `====` — those break the page rather than invite disagreement. |
| 2026-08-12 | **Obsidian syntax parity is the pipeline's actual promise, and it was measured rather than assumed.** All 24 constructs of Obsidian Flavored Markdown were run through Astro's own `createMarkdownProcessor` with the real plugin chain: 16 already matched on GFM alone (strikethrough, tables, footnotes, task lists, nested lists, escapes, inline HTML). [`remark-obsidian.mjs`](src/plugins/remark-obsidian.mjs) closes four more. **Test through Astro's processor, not a hand-rolled `unified()` pipeline** — Astro's GFM and smartypants defaults are part of the answer. |
| 2026-08-12 | **`%%comments%%` were a content leak, not a formatting gap.** Obsidian hides them; the site printed them verbatim, so `%%TODO: verify this number%%` left in a draft would have published to the live site. Stripped first, before every other plugin, because a comment may legally hold an unclosed `==` or a stray bracket that would otherwise fail the build or be counted against the emphasis budget. Verified on a comment containing both. |
| 2026-08-12 | **The `![[embed]]` ban is retired; `[[wikilinks]]` render as display text.** The ban existed only because Astro's image pipeline cannot resolve a wikilink — `remark-obsidian.mjs` now rewrites one to a real relative path before the pipeline sees it, so both forms work and the author writes whichever previews in the vault. A wikilink renders as its alias or note name, deliberately NOT as a link: the target may not be a published page, and a link to a 404 is the one thing this site cannot ship. |
| 2026-08-12 | **Callouts and math are the two remaining parity gaps, deferred as decisions rather than bugs.** `> [!NOTE]` renders as a plain blockquote with a literal `[!NOTE]`; thirteen callout types each with an icon and colour is a design-system question, not a transform. `$…$` needs `remark-math` plus a KaTeX stylesheet. Recorded in CLAUDE.md §4 with an instruction not to use either in a post until built. |
| 2026-08-12 | **The voice guides go local-only, into a gitignored `.local/voice/`.** They encode how Marcelo writes and speaks, which is a personal instrument rather than shared tooling: anyone cloning this repo should write in their own voice. Moving them alone would have achieved nothing, because `my_assets/` is itself **tracked** — only `video-scripts` was ignored, so "my assets" never actually meant private. Hence a move plus a `git rm --cached`. **`.local/` is now the convention** for anything local-only: hidden, one `.gitignore` rule, nothing added to the visible root. Two earlier layouts were built and rejected — pointer stubs at the repo root (clutter) and `my_assets/voice/` with a tracked README (same tracked/private confusion, one level down). CLAUDE.md §6 keeps the summary and carries the explanation, so no new file exists to hold a note. **History is left intact:** the guides were public until today, no credential was ever involved, and a `filter-repo` force-push would rewrite every hash from `v0.04.001` on to hide something that was never secret. The cost is that they now have no version control. |
| 2026-08-12 | **Video scripts leave the repo entirely, for the Obsidian vault** (`DLL-CONTENT/dll video scripts/`), so Marcelo can read along in Obsidian while recording. They land **beside** `dll-website-content/` and never inside it, which keeps them out of the content clone structurally rather than by a rule someone has to remember (CLAUDE.md §8). Renamed on the way to `log-NNN-(video-script)-Title.md`, one per episode. **A first pass mislabelled 002 to 005 as build logs and was reverted the same day:** their H1s read "Compiled Process Reference", inherited from LOG 001's format, and that was misread as a different kind of document. They are the scripts. Each carries `*[SCREEN:]*` directions, `> **Prompt:**` blocks and `**TAKEAWAY:**` lines, and VOICE-SCRIPTS.md §4 and §7 call them scripts throughout. **Only LOG 001 has two cuts** — a working teleprompter and a reference cut with the countdown padding stripped, the latter being the specimen the voice guide points at. Two stale things surfaced and were fixed in passing: the LOG 003 script was still titled "LOG 002" from before the 2026-08-11 episode swap, and an early LOG 001 draft written against a **Next.js** stack was marked `SUPERSEDED` rather than deleted. **`two-pipes-reveal.html` did not go with them** — it is generated output, and [generate-two-pipes.mjs](scripts/generate-two-pipes.mjs) hard-codes its path, so a tracked build script would have had to name an absolute path inside someone's vault. It writes to `.local/` instead. |
| 2026-08-12 | **All four unshot video scripts converted to the teleprompter register, and given a §3 pass.** LOG 003, 004 and 005 went from 59, 36 and 31 contractions to zero; LOG 002 was already converted and got the newbie-explanation pass it had never had. **The register was the smallest problem.** Three defects surfaced that no amount of reading for voice would have caught: LOG 004 and LOG 005 both credited the pipeline to LOG 002 and the contact form to LOG 003, the pre-2026-08-11 order, and LOG 003 still called itself LOG 002 in its own wrap while speaking a version number that VOICE-SCRIPTS §6 bans; LOG 004's on-screen note offered **Vercel Web Analytics** as a swap, which CLAUDE.md §4 had settled *against* the day before; and LOG 005 staged a Lighthouse result it has not measured ("near-100 across the board"), now rewritten to read out the real numbers and keep a low one in. **A script drifts out of date faster than it drifts out of register** — run §6 against ROADMAP.md and CLAUDE.md, not just against the voice guide. The §3 pass found the same shape every time: the undefined term is never the exotic one. DKIM, symlink and serverless function were all carefully explained, while **"API" ran unexplained through an entire episode about an API.** |
| 2026-09-15 | **The two throwbacks swap records.** Rural Point becomes LOG 015 / THROWBACK 002 (pub 2026-08-23) and the Game Boy becomes LOG 013 / THROWBACK 001 (pub 2026-08-09), every identity field moving together so the log keeps date order. A deliberate one-time exception to CLAUDE.md §4's permanence rule; slugs and URLs unchanged. The homepage Throwback band now lists newest first. |
| 2026-09-15 | **The receiving pipe is verified from outside.** All five mail records (root MX and SPF, `_dmarc`, `send` MX and SPF) were read through the public resolver `1.1.1.1` with `+short`, so no local cache and no `SERVER:` line to blur, and they match the dashboard row for row, every one DNS-only. The `rua=` on `_dmarc` was already on the domain and needed no fix. Receiving is proven for both aliases, `hello@` on 2026-08-13 (TEST 001) and `dmarc@` on 2026-09-15 (TEST 002, inbox in under a minute, sent from an account other than the destination), and a message to an unrouted address bounced with `550 5.1.1`, so the disabled catch-all holds. |
