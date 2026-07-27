---
name: log-post
description: Draft or voice-check a Deadlink Labs blog/log post in Marcelo Brouard's brand voice. Use when the user wants to write a new log or product post, turn rough notes into a post, clean a video transcript into a post, or check/rewrite a draft against the DLL voice. Reads VOICE.md and the post template as the source of truth.
---

# /log-post — write in the Deadlink Labs voice

This skill produces posts that sound coherent with every other Deadlink Labs
post. It never re-encodes the voice rules here; it **reads them from the source of
truth** so nothing drifts.

## Step 0 — always load the source of truth first

Before drafting or checking anything, read, in this order:
1. `VOICE.md` (repo root) — the voice: rules, moves, lexicon, before/after pairs,
   and the self-check list.
2. `my_assets/templates/log-post-template.md` — the structure and frontmatter.
3. `CLAUDE.md` §5 (page/copy rules) and §4 (content model, `web-*` frontmatter,
   folder/slug rules) if placing a file.

If `VOICE.md` or the template has changed, those changes win over anything
remembered from a previous run.

## Modes

Pick the mode from what the user asked for.

### DRAFT — notes/topic → a finished post
1. Confirm the essentials if missing: is this a `log` or a `products` post? the
   record number, status (`web-stage`), and tags? the title (a question for an
   experiment)? Do not invent a fake video, thumbnail, numbers, or outcomes — ask
   or leave a clearly marked placeholder.
2. Copy the template structure. Write the body in the VOICE.md voice. Use the
   signature moves (question-title, a takeaway, an honest aside where true, plain
   teaching for any jargon). Keep only the sections that earn their place.
3. Fill the `web-*` frontmatter. `web-status: draft` unless the user says publish.
   `web-video` is optional (leave commented if none). **Every post should carry a
   `web-thumb`** — it opens the post as a 16:9 header image and is the homepage
   thumbnail. If there is no photograph to use, generate an on-brand graphite
   specimen tile (mono labels, a scarce orange live node; see LOG 001's
   network-mark tile and LOG 003's pipeline tile) rather than stock/AI imagery.
   Confirm what the tile should depict before generating it.
4. Place the file per CLAUDE.md §4: `content/log/<year>/<slug>/<title>.md` (log) or
   `content/products/<slug>/<title>.md` (products). The folder name is the slug
   (= URL); the `.md` inside is named for the post's TITLE (readable in Obsidian),
   not the folder. Optionally add an Obsidian-internal `aliases` entry (e.g. the log
   number) for quick-switcher jumps. Remember `content/` is gitignored here
   (separate content repo) — say so if the user expects it committed by the site repo.

### CHECK — an existing draft → flagged + rewritten
1. Read the draft.
2. Run the VOICE.md §7 self-check against it. Report each violation as a short
   list: the offending text, which rule, and the fix.
3. Offer a clean rewritten version that keeps the author's meaning and any real
   numbers/artifacts. Never soften an honest aside into spin. Never add adjectives
   about Marcelo to "improve" it.

### TRANSCRIPT — raw captions → clean transcript block
Clean to the "written post" column of VOICE.md §6: punctuate, remove ums and stage
directions, keep spoken phrasing. Wrap in a `<details><summary>Video transcript</summary>`
block with blank lines between paragraphs (so they render as real paragraphs).

## Always end with the self-check

Before handing back a draft, silently run VOICE.md §7 and fix your own misses.
Then state briefly which checks you verified (em dashes, exclamation marks,
adjectives-about-Marcelo, startup words, question-title, takeaway present).

## Guardrails

- Voice rules live in `VOICE.md`, not here. If asked to change the voice, edit
  `VOICE.md`, not this skill.
- No em dashes, no exclamation marks, no adjectives about Marcelo, no startup
  vocabulary — but these are enforced by reading VOICE.md, not from memory.
- Do not fabricate outcomes, metrics, dates, or shipped things. Placeholder,
  clearly marked, or ask.
