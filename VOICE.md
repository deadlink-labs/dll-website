# VOICE.md — how a Deadlink Labs post sounds

Source of truth for the **writing voice** of every published post (Log, Products,
About) and every video script. CLAUDE.md §6 states the rules; this file makes them
reproducible by adding the *moves*, the *lexicon*, and **before/after examples**.
Rules tell you what not to do; examples teach the voice.

**Read this before drafting or editing any post.** It is consumed by the
`/log-post` skill and is meant to be equally usable by a human writing in Obsidian.

Mined from: the LOG 001 video script (Marcelo's spoken voice), CLAUDE.md §3/§6,
and LOG 001 (the first fully in-voice written post).

---

## 1. Two layers

The voice is not one setting. It is a fixed set of rules plus a dial.

**Layer 1 (§2) is the discipline** and it never moves. Numbers carry every claim,
no adjectives about Marcelo, no startup vocabulary, no em dashes, no exclamation
marks. This is why a recruiter, a CEO, or a paying customer believes anything on
this site.

**Layer 2 (§3) is the register** and it is set per surface. A teleprompter script,
a log entry, and a product page are read by different people in different postures,
and pretending they are one register is what made earlier drafts read like a manual.

*Build to understand. Document to remember. Share so others can build further.*

> **Correction, settled 2026-08-07.** The old version of this file told every
> surface to "prefer full words over contractions", and gave "full words read
> cleaner aloud" as the reason. That reason is real, but it is a **teleprompter
> production constraint** (fewer elisions to trip on while reading and improvising),
> not a writing rule. It got promoted into a site-wide rule and made written posts
> read like a EULA. Contraction-free English is nobody's speaking voice and nobody's
> blog voice. The constraint stays where it belongs, in the script row of §3.

---

## 2. Layer 1 — non-negotiable, every surface

- **First person, plain US English, short sentences.** Specific beats clever.
- **Numbers and artifacts carry every claim. Zero adjectives about Marcelo.** Do
  not write "creative", "detail-oriented", "passionate", "experienced". Show the
  decision, the number, the shipped thing, and let the reader conclude.
- **Warmth is never evidence.** This is the rule that survives the register
  loosening, and it is the one that breaks first. "I'm excited about this", "this
  thing is awesome", "I'm really proud of it" are banned in every register.
  Friendly sentences *around* ruthless numbers make the numbers land harder.
  Friendly sentences *instead of* numbers are a press release.
- **Questions as titles for experiments** ("Can X become Y?"). Other logs may use
  a plain, concrete noun-phrase title.
- **No em dashes.** Use a period, a comma, or parentheses.
- **No exclamation marks.** Ever.
- **No startup vocabulary:** leverage, journey, empower, unlock, seamless,
  transformative, cutting-edge, robust, game-changer, revolutionize, elevate.
- **Honest asides stay honest.** Nothing unfinished gets spun as done.
- **UI / CTA copy is active and says what it does:** "Join the waitlist", not
  "Submit". "Step into the log", not "Learn more".

---

## 3. Layer 2 — the register dial, per surface

| Surface | Register | Contractions | Address | Rhythm |
|---|---|---|---|---|
| Video script (narrated) | Teleprompter | **Avoid.** Not a style choice: full words have fewer elisions to trip on while reading aloud and improvising | First person | Spoken. Asides and "so, yeah" are fine. Stage directions live here and nowhere else |
| Log post | Notebook | **Natural.** Use them where you would say them | Mostly first person | Measured. The page is tighter than the mouth |
| Product page, About Work-with-me | Human and direct | **Yes** | Second person, direct | Faster. May be funny. The reader is deciding whether to give you money or time |

**Why the product register is different.** A log entry is read by someone who
already arrived and wants to follow the thinking. A product page is read by someone
deciding whether this solves a problem they have right now. Same discipline, warmer
front door: "Hey, from the lab, here is what I built and here is why I built it."
It is still not a landing page, because Layer 1 is still in force. There is no hype
available to you. All you have is the pain, stated plainly, and the numbers.

**Transcripts.** A transcript pasted into a post gets cleaned to the log-post row:
punctuated, de-ummed, stage directions stripped. It stays a transcript (spoken
phrasing is fine) but reads like prose.

---

## 4. Signature moves (the voice's DNA)

- **The question-title.** Frame an experiment as the open question it answers:
  *"Can a house quietly run its own systems without anyone tending them?"*
- **The takeaway.** End a beat with a distilled, transferable lesson, often literally
  labeled: *"TAKEAWAY: the thinking is the expensive part."* One sharp line, not a
  summary paragraph.
- **The honest aside.** Name the unfinished or imperfect thing plainly, without
  apology or spin: *"One honest note. Most of those posts are placeholders."* This
  is what makes the lab credible.
- **The confession that proves the rule.** On a product page, the strongest thing
  you own is a story where the tool caught *you*. "It found an error in two of my
  own finished masters" buys more trust than any claim you could make instead.
  Admitting the bug is the proof that the fix is real.
- **Plain teaching for newcomers.** When a term might lose a reader, define it in
  one plain sentence, then move on: *"Git saves snapshots of the project, like an
  undo button for the whole thing."* Short, never condescending. (See the "newbie
  blurbs" preference: short, plain, cut the fluff.)
- **The through-line motif.** The recurring image is *the dead link resolves*. Work
  that had no URL now has one, nothing 404s anymore. Use it sparingly, at real
  turning points, never as a slogan.
- **Present tense for live action, past only for genuine backstory.**
- **Cadence.** Let short fragments land after a longer sentence: *"Live. Online.
  Real."* / *"v1. It is real."* Used rarely, they carry weight.

---

## 5. Lexicon

**Reach for:** build, ship, document, decision, decide, the fix, the work, run,
wire, plain, tracked, snapshot, the record, on the bench, resolve.

**Avoid:** the startup list in §2, plus: solution (as a noun for your work),
utilize (say "use"), in order to (say "to"), simply/just as filler, "I'm excited
to", "thrilled", "delighted", "world-class", "best-in-class", "passionate about".

---

## 6. Before / after (the heart of this file)

Each pair is a generic-AI sentence next to the Deadlink Labs rewrite.

### 6.1 Every surface

**Self-description → artifacts.**
- BAD: "I'm a passionate, detail-oriented builder with a proven track record of
  delivering innovative solutions."
- GOOD: "20+ years turning messy operations into systems that run themselves:
  post-production teams, pipeline automation, data and dashboards, AI workflows,
  and the occasional website. When someone asked where they could see the work,
  there was no link to send."

**Hype → plain fact.**
- BAD: "This project leverages cutting-edge AI to unlock a seamless, transformative
  web experience."
- GOOD: "The site is built with Astro and ships almost no JavaScript. The pages are
  plain, fast HTML."

**Vague claim → number / artifact.**
- BAD: "The build process was incredibly fast and efficient."
- GOOD: "A whole site from one prompt, because every decision was already written
  down."

**Exclamation → weighted fragments.**
- BAD: "And just like that, the site was live. Amazing!"
- GOOD: "I typed the real address and it loaded. Live. Online. Real."

**Em dash → clean stops.**
- BAD: "The brief does the heavy lifting — I'm just pointing at it — and that's the
  whole trick."
- GOOD: "The brief does the heavy lifting. I'm just pointing at it. That's the
  whole trick."

**Abstract advice → the takeaway.**
- BAD: "It is important to plan before you build."
- GOOD: "TAKEAWAY: the thinking is the expensive part. Once the premise, the design,
  and the structure are locked, the code basically writes itself."

**Marketing title → question-title.**
- BAD: "How I Built a Beautiful Personal Website with AI"
- GOOD: "Can I design and ship my own website with AI, in public?"

**Spin → honest aside.**
- BAD: (quietly omit that the posts are placeholders and imply it is all finished)
- GOOD: "One honest note. Most of those posts are placeholders, just so the layout
  has something to hold. I will write the real ones later."

**Jargon → plain teaching.**
- BAD: "Initialize version control to enable atomic, revertible commits."
- GOOD: "I get git running locally, so every change is tracked. Git saves snapshots
  of the project, like an undo button for the whole thing."

**Passive UI copy → active control.**
- BAD: "Submit" / "Click here to sign up for updates."
- GOOD: "Join the waitlist."

### 6.2 The product register specifically

**Stiff → human.** The contraction fix, in one line.
- BAD: "It is still rough around the edges. It does not do everything yet."
- GOOD: "It's still rough. Come help me sand it down."

**Category label → the transformation.** Nobody feels a category.
- BAD: "A preparation studio for digital mixtapes."
- GOOD: "Check your release on your own laptop, before you upload it, and see the
  same numbers your distributor is going to see."

**Feature → the pain it ends.** Lead with what currently goes wrong.
- BAD: "Includes accurate LUFS and true-peak measurement with per-platform targets."
- GOOD: "Right now you upload and then wait to find out from a stranger that your
  master was too quiet. This tells you before you upload."

**Enthusiasm as evidence → the receipt.** The Layer 1 rule, in its most tempting
context.
- BAD: "I'm really proud of the loudness meter. It's incredibly accurate."
- GOOD: "It agrees with ffmpeg's ebur128 within 0.05 LU across seven real masters.
  Here are the seven, and here's the command to check me."

---

## 7. Self-check (run before publishing — the skill runs this too)

**Layer 1, every time:**

- [ ] First person, plain US English, short sentences.
- [ ] No adjective describes Marcelo anywhere.
- [ ] Every claim is carried by a number, a decision, or a shipped artifact.
- [ ] No enthusiasm doing the job of evidence.
- [ ] No em dashes. No exclamation marks.
- [ ] No word from the startup/avoid lists (§2, §5).
- [ ] Title is a question (experiment) or a plain concrete noun-phrase.
- [ ] At least one takeaway or decision the reader can carry away.
- [ ] Any UI/CTA copy is active and says what it does.
- [ ] The honest asides are honest. Nothing unfinished is being spun as done.

**Layer 2, matched to the surface (§3):**

- [ ] Named the surface before drafting, and used its row.
- [ ] Contractions match the row (avoided in a script, natural in a post, yes on a
      product page).
- [ ] Address matches the row (a product page may say "you" and mean it).
- [ ] No stage directions outside a script.

**Frontmatter:**

- [ ] `web-status`, `web-title`, `web-pub-date`, plus `web-number` / `web-stage` /
      `web-tags` for the stamp. (See the template.)

---

## 8. Structure

Voice is this file's job; structure is the template's. Start every post from
[my_assets/templates/log-post-template.md](my_assets/templates/log-post-template.md)
and write into it in the voice above.
