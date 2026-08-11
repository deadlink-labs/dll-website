# VOICE-POSTS.md — how a Deadlink Labs post sounds

Source of truth for the **written** voice: log posts, throwbacks, product pages,
and the About page copy. Anything a person reads off the screen.

**Narration scripts are a different document.** They are read out loud from a
teleprompter, which changes the rules, and mixing the two is what caused the
drift this file was split to end. Writing a video script? Use
[VOICE-SCRIPTS.md](VOICE-SCRIPTS.md).

The reference specimen for this voice is **LOG 001**
(`content/log/2026/building-deadlinklabs-with-ai-in-public/`). When a rule here
is ambiguous, go read that post and match it.

*Build to understand. Document to remember. Share so others can build further.*

> **Split from `VOICE.md` on 2026-08-11.** One file tried to serve both written
> posts and spoken scripts through a "register dial", and the dial kept getting
> read wrong in both directions: posts came out stiff and formal because they
> inherited a teleprompter constraint, and scripts drifted casual because the
> post rules were the ones people actually read. Two surfaces, two documents.

---

## 1. The non-negotiables

> **This section is identical in [VOICE-SCRIPTS.md](VOICE-SCRIPTS.md) §1.**
> It is the part that does not change between writing and speaking. Change it in
> both files or in neither.

- **First person, plain US English, short sentences.** Specific beats clever.
- **Numbers and artifacts carry every claim. Zero adjectives about Marcelo.** Do
  not write "creative", "detail-oriented", "passionate", "experienced". Show the
  decision, the number, the shipped thing, and let the audience conclude.
- **Warmth is never evidence.** This is the rule that breaks first. "I'm excited
  about this", "this thing is awesome", "I'm really proud of it" are banned
  everywhere. Friendly sentences *around* ruthless numbers make the numbers land
  harder. Friendly sentences *instead of* numbers are a press release.
- **No em dashes.** Use a period, a comma, or parentheses. This includes copy
  that ships in code: button labels, email subject lines, error messages.
- **No exclamation marks.** Ever.
- **No startup vocabulary:** leverage, journey, empower, unlock, seamless,
  transformative, cutting-edge, robust, game-changer, revolutionize, elevate.
- **Honest asides stay honest.** Nothing unfinished gets spun as done.
- **UI and CTA copy is active and says what it does:** "Join the waitlist", not
  "Submit". "Step into the log", not "Learn more".

---

## 2. The register: informal, and actually mine

Write the way you talk to someone who already gets it. Relaxed, direct, a bit
dry. The page is tighter than the mouth, so it is not a transcript, but it is
nowhere near a manual either.

**Contractions are on.** Use them wherever you would say them. "It's live now"
beats "It is live now" every time, and a page with no contractions in it reads
like terms and conditions.

> **This is the opposite of the script rule, on purpose.** Scripts avoid
> contractions because full words have fewer elisions to trip on when you are
> reading aloud and improvising. That is a production constraint for a person
> holding a camera. It has nothing to do with writing, and when it leaked into
> posts it made every one of them read like a EULA. A grep of all nine published
> posts on 2026-08-07 returned **zero** contractions. Every apostrophe on the
> site was a possessive. That is the failure this file exists to prevent.

**Real paragraphs.** The standalone one-line beat is a weapon and it only works
because it is rare. Eight to ten in a two-thousand-word post is plenty. A draft
where every paragraph is one sentence has no rhythm, just a uniform stutter, and
the beats that were meant to land have nothing to land against.

**Second person is allowed when you mean it.** Mostly these posts are first
person, but a product page is read by someone deciding whether to give you money,
and talking to them directly is the point.

---

## 3. Three flavors, same voice

| Surface | What changes | Rhythm |
|---|---|---|
| **Log post** | The default. Notebook: you are showing the work and the thinking | Measured. Prose with artifacts in it |
| **Throwback / field story** | Told, not reported. A scene is allowed to be a scene | Story rhythm. Longer paragraphs, the gravel road left in |
| **Product page, About Work-with-me** | Second person, direct, faster, may be funny | A warmer front door. The reader is deciding |

**Why the throwback is looser** (LOG 013). A throwback records work from years
before the lab existed, and the evidence is photographs and memory rather than a
repo. It is the one surface where a scene is load-bearing: the reader believes
the engineering because they believe the afternoon. What does not loosen is §1.
A throwback that is only a good story is a blog post. A throwback is a good story
wrapped around a decision table.

**Why the product page is warmer.** A log entry is read by someone who already
arrived and wants to follow the thinking. A product page is read by someone
deciding whether this solves a problem they have right now. Same discipline,
warmer front door. There is still no hype available to you. All you have is the
pain, stated plainly, and the numbers.

**Transcripts** pasted into a post get cleaned to the log-post flavor:
punctuated, de-ummed, stage directions stripped. Spoken phrasing is fine, but it
should read as prose.

---

## 4. Signature moves

- **The question-title, for experiments only.** Frame an open question the
  experiment answers: *"Can a house quietly run its own systems without anyone
  tending them?"* A process write-up gets a plain concrete noun-phrase instead.
  Do not default every title to a question.
- **The takeaway.** End a beat with a distilled, transferable lesson, often
  literally labeled: *"TAKEAWAY: the thinking is the expensive part."* One sharp
  line, not a summary paragraph.
- **The honest aside.** Name the unfinished thing plainly, without apology or
  spin: *"One honest note. Most of those posts are placeholders."* This is what
  makes the lab credible.
- **The confession that proves the rule.** On a product page, the strongest thing
  you own is a story where the tool caught *you*. Admitting the bug is the proof
  that the fix is real.
- **Plain teaching.** When a term might lose a reader, define it in one plain
  sentence and move on: *"Git saves snapshots of the project, like an undo button
  for the whole thing."* Short, never condescending.
- **The through-line motif.** The recurring image is *the dead link resolves*.
  Use it sparingly, at real turning points, never as a slogan.
- **Present tense for live action**, past only for genuine backstory.
- **Cadence.** Let short fragments land after a longer sentence: *"Live. Online.
  Real."* Rare, so they carry weight.

---

## 5. Lexicon

**Reach for:** build, ship, document, decision, decide, the fix, the work, run,
wire, plain, tracked, snapshot, the record, on the bench, resolve.

**Avoid:** the startup list in §1, plus: solution (as a noun for your work),
utilize (say "use"), in order to (say "to"), simply and just as filler, "I'm
excited to", "thrilled", "delighted", "world-class", "best-in-class",
"passionate about".

---

## 6. Before and after

**Self-description → artifacts.**
- BAD: "I'm a passionate, detail-oriented builder with a proven track record of
  delivering innovative solutions."
- GOOD: "20+ years turning messy operations into systems that run themselves:
  post-production teams, pipeline automation, data and dashboards, AI workflows,
  and the occasional website. When someone asked where they could see the work,
  there was no link to send."

**Hype → plain fact.**
- BAD: "This project leverages cutting-edge AI to unlock a seamless,
  transformative web experience."
- GOOD: "The site is built with Astro and ships almost no JavaScript. The pages
  are plain, fast HTML."

**Stiff → spoken** (the contraction fix, the whole reason for this file).
- BAD: "It is still rough around the edges. It does not do everything yet."
- GOOD: "It's still rough. Come help me sand it down."

**Vague claim → number or artifact.**
- BAD: "The build process was incredibly fast and efficient."
- GOOD: "A whole site from one prompt, because every decision was already written
  down."

**Exclamation → weighted fragments.**
- BAD: "And just like that, the site was live. Amazing!"
- GOOD: "I typed the real address and it loaded. Live. Online. Real."

**Em dash → clean stops.**
- BAD: "The brief does the heavy lifting — I'm just pointing at it — and that's
  the whole trick."
- GOOD: "The brief does the heavy lifting. I'm just pointing at it. That's the
  whole trick."

**Abstract advice → the takeaway.**
- BAD: "It is important to plan before you build."
- GOOD: "TAKEAWAY: the thinking is the expensive part. Once the premise, the
  design, and the structure are locked, the code basically writes itself."

**Marketing title → the real one.**
- BAD: "How I Built a Beautiful Personal Website with AI"
- GOOD: "Can I design and ship my own website with AI, in public?"

**Spin → honest aside.**
- BAD: (quietly omit that the posts are placeholders, and imply it is finished)
- GOOD: "One honest note. Most of those posts are placeholders, just so the
  layout has something to hold. I will write the real ones later."

**Jargon → plain teaching.**
- BAD: "Initialize version control to enable atomic, revertible commits."
- GOOD: "I get git running locally, so every change is tracked. Git saves
  snapshots of the project, like an undo button for the whole thing."

**Category label → the transformation** (product pages). Nobody feels a category.
- BAD: "A preparation studio for digital mixtapes."
- GOOD: "Check your release on your own laptop, before you upload it, and see the
  same numbers your distributor is going to see."

**Feature → the pain it ends** (product pages).
- BAD: "Includes accurate LUFS and true-peak measurement with per-platform
  targets."
- GOOD: "Right now you upload and then wait to find out from a stranger that your
  master was too quiet. This tells you before you upload."

**Enthusiasm as evidence → the receipt.**
- BAD: "I'm really proud of the loudness meter. It's incredibly accurate."
- GOOD: "It agrees with ffmpeg's ebur128 within 0.05 LU across seven real
  masters. Here are the seven, and here's the command to check me."

**Drum-solo paragraphs → real ones.**
- BAD: "It was 2006. / There was no 3G. / We were living in the countryside. /
  And getting online was not easy. / The nearest city was Zárate."
- GOOD: "In 2006 there was no 3G, no 4G, and no way to get online where we lived.
  The nearest connection was in Zárate, about 15 kilometers away across the
  Buenos Aires countryside. So I climbed a 35-meter radio tower and bolted an
  access point to the top of it."

---

## 7. Self-check

Run this before publishing. The `/log-post` skill runs it too.

- [ ] First person, plain US English, short sentences.
- [ ] No adjective describes Marcelo anywhere.
- [ ] Every claim is carried by a number, a decision, or a shipped artifact.
- [ ] No enthusiasm doing the job of evidence.
- [ ] No em dashes. No exclamation marks.
- [ ] No word from the startup or avoid lists (§1, §5).
- [ ] **Contractions are present and natural.** If a grep for `'s`, `n't` and
      `'re` finds only possessives, the post is too stiff. This is the check that
      failed silently for nine posts.
- [ ] Title is a question (experiment) or a plain concrete noun-phrase (write-up).
- [ ] At least one takeaway or decision the reader can carry away.
- [ ] Paragraphs are paragraphs. Standalone beats are rare enough to land.
- [ ] Any UI or CTA copy is active and says what it does.
- [ ] The honest asides are honest. Nothing unfinished is spun as done.
- [ ] No stage directions. Those belong in a script.
- [ ] Frontmatter: `web-status`, `web-title`, `web-pub-date`, plus `web-number`,
      `web-stage` and `web-tags` for the stamp. See the template.

---

## 8. Structure

Voice is this file's job; structure is the template's. Start every post from
[my_assets/templates/log-post-template.md](my_assets/templates/log-post-template.md)
and write into it in the voice above.
