---
name: log-post
description: Draft or voice-check Deadlink Labs writing in Marcelo Brouard's voice — log posts, product pages, About copy, and video scripts. Use when the user wants to write a new post, turn rough notes into a post, clean a video transcript, draft or fix an episode script, or check a draft against the DLL voice. Reads VOICE-POSTS.md or VOICE-SCRIPTS.md as the source of truth.
---

# /log-post — write in the Deadlink Labs voice

This skill produces writing that sounds coherent with everything else Deadlink
Labs has published. It never re-encodes the voice rules here; it **reads them
from the source of truth** so nothing drifts.

## Step 0 — pick the surface, then load ITS document

There are two voice documents, and they disagree on purpose. Picking the wrong
one is the single most common failure, so do this before anything else.

| What you are writing | Read |
|---|---|
| Log post, throwback, product page, About copy, anything read off a screen | **`.local/voice/VOICE-POSTS.md`** |
| Narration for a video (see step 5 of SCRIPT mode for where those live) | **`.local/voice/VOICE-SCRIPTS.md`** |

Paths are relative to the repo root. **Both documents are gitignored, local only**
(moved there 2026-08-12), so a clone of the repo does not have them. If the one you
need is not on disk, **stop and say so** — do not reconstruct the voice from
CLAUDE.md §6, which is a summary, and do not write from memory of a previous run.
Producing plausible-sounding copy without the guide is the failure this skill
exists to prevent.

**The one difference that matters: contractions.** Posts use them freely, because
a page with none reads like terms and conditions. Scripts avoid them, because
full words have fewer elisions to trip on when reading aloud from a prompter.
Both documents share an identical §1 of non-negotiables that never changes.

Then also read:
1. `my_assets/templates/log-post-template.md` — structure and frontmatter (posts).
2. `CLAUDE.md` §5 (page/copy rules) and §4 (content model, `web-*` frontmatter,
   folder/slug rules) if placing a file.

If the voice document or the template has changed, those changes win over
anything remembered from a previous run.

**State which document you used** when you hand the draft back.

## Modes

Pick the mode from what the user asked for.

### DRAFT — notes/topic → a finished post
1. Confirm the essentials if missing: is this a `log` or a `products` post? the
   record number, status (`web-stage`), and tags? the title? Do not invent a fake
   video, thumbnail, numbers, or outcomes — ask or leave a clearly marked
   placeholder.
2. Copy the template structure. Write the body per VOICE-POSTS.md. Use the
   signature moves (question-title for experiments only, a takeaway, an honest
   aside where true, plain teaching for any jargon). Keep only the sections that
   earn their place.
2b. **Apply the emphasis ladder** (VOICE-POSTS.md §4) — but only after the draft
   is finished, using the procedure in EMPHASIS mode below. Marking as you write
   produces marks in reading order, which is the failure that mode exists for.
3. Fill the `web-*` frontmatter. `web-status: draft` unless the user says publish.
   `web-video` is optional (leave commented if none). **Every post should carry a
   `web-thumb`** — it opens the post as a 16:9 header image and is the homepage
   thumbnail. If there is no photograph to use, generate an on-brand graphite
   specimen tile (mono labels, a scarce orange live node; see LOG 001's
   network-mark tile and LOG 012's pipeline tile) rather than stock/AI imagery.
   Confirm what the tile should depict before generating it.
4. Place the file per CLAUDE.md §4: `content/log/<year>/<slug>/<title>.md` (log) or
   `content/products/<slug>/<title>.md` (products). The folder name is the slug
   (= URL); the `.md` inside is named for the post's TITLE (readable in Obsidian),
   not the folder. **DEC numbers restart at `DEC 001` in every post**, they are not
   global. Optionally add an Obsidian-internal `aliases` entry (e.g. the log
   number) for quick-switcher jumps.

### SCRIPT — an episode → a teleprompter script
1. Read VOICE-SCRIPTS.md, not VOICE-POSTS.md.
2. Follow its format: PAST / PRESENT / REFLECTION beats, `*[SCREEN: ...]*` stage
   directions, `> **Action:**` and `> **Prompt:**` blocks, `**TAKEAWAY:**` lines.
3. **No contractions in spoken lines, and no choppy fragment strings.** Those two
   go together; see VOICE-SCRIPTS.md §2.2, which is the rule that has already
   been broken once.
4. Check every technical step still matches CLAUDE.md (stack, folder names,
   versioning, build order). A script that teaches a stale step is worse than no
   script.
5. Scripts live in the Obsidian vault, `DLL-CONTENT/dll video scripts/` — **outside
   this repo**, beside the content repo and never inside it. They are named
   `log-NNN-(video-script)-Title.md` for a teleprompter script and
   `log-NNN-(compiled-process)-Title.md` for a reference cut; match the pattern.
   ROADMAP.md outranks them when they disagree.

### CHECK — an existing draft → flagged + rewritten
1. Read the draft, and establish which surface it is.
2. Run the self-check from the matching document against it. Report each
   violation as a short list: the offending text, which rule, and the fix.
3. Offer a clean rewritten version that keeps the author's meaning and any real
   numbers/artifacts. Never soften an honest aside into spin. Never add adjectives
   about Marcelo to "improve" it.

### EMPHASIS — an existing post → re-marked

Highlights and bold, on a post whose prose is already written. Read
**VOICE-POSTS.md §4 in full** before touching anything; the rules are there, not
here.

1. **Read the whole post, start to finish, marking nothing.** No exceptions, no
   marking the good line as you pass it.
2. **State the post's argument in one line, and each section's contribution in one
   line, before naming a single mark.** Hand this to the user as part of the
   report. It is the only reliable proof that step 1 actually happened, which is
   why it is a deliverable and not a private step.
3. Pick one candidate per section, rank them across the whole post, and give the
   best three the highlight (§4's procedure). Remember who the marks are for: a
   CEO or recruiter who will not read the post, looking for decisions and
   reasoning. Mark judgment, not mechanics.
4. Marks wrap existing text. If a section's point is buried mid-sentence or split
   across clauses, a light recast is allowed — but **flag every one explicitly**
   in the report, and never introduce a claim the post did not already make.
5. Verify: `npm run emphasis -- <file>` for counts and distribution, then
   `npm run build` for the hard caps. Then run the skim test by hand — read only
   the marked lines, in order. No script can do that one.
6. Report as a table: line, section, tier, the text, and **why that line**. Call
   out anything you deliberately left unmarked and why.

The user will tweak the result in Obsidian. Treat those tweaks as rule changes,
not corrections to swallow: two of them on 2026-08-11 became §4's "prefer the
punchline" and "a highlight is a complete sentence". Fold them back into
VOICE-POSTS.md.

### TRANSCRIPT — raw captions → clean transcript block
A transcript is going into a **post**, so clean it to VOICE-POSTS.md: punctuate,
remove ums and stage directions, keep spoken phrasing. Wrap in a
`<details><summary>Video transcript</summary>` block with blank lines between
paragraphs (so they render as real paragraphs).

## Always end with the self-check

Before handing back a draft, silently run the self-check section of whichever
document you used and fix your own misses. Then state briefly which checks you
verified and which document you wrote against.

Two checks worth running as an actual grep rather than by eye:
- **Posts:** if `'s`, `n't` and `'re` turn up only possessives, it is too stiff.
  That failure went unnoticed across nine published posts.
- **Scripts:** count the contractions. The LOG 001 scripts sit near 12 per 4,600
  words; anything in the dozens has drifted.

## Guardrails

- Voice rules live in `.local/voice/VOICE-POSTS.md` and `.local/voice/VOICE-SCRIPTS.md`, not here. If asked
  to change the voice, edit those, not this skill.
- Their §1 blocks are **byte-identical on purpose**. Change that section in both
  files or in neither.
- No em dashes, no exclamation marks, no adjectives about Marcelo, no startup
  vocabulary, no enthusiasm doing the job of a number. Enforced by reading the
  document, not from memory. The em dash rule covers copy that ships in code too:
  button labels, email subjects, error messages.
- **Never apply the no-contractions rule to a post.** It is a teleprompter
  production constraint and it belongs only to scripts. Applying it site-wide is
  the exact mistake that got `VOICE.md` split in two on 2026-08-11.
- Do not fabricate outcomes, metrics, dates, or shipped things. Placeholder,
  clearly marked, or ask.
