# VOICE-SCRIPTS.md — how a Deadlink Labs video script sounds

Source of truth for **narration read aloud on camera**: everything in
`my_assets/video-scripts/`. These are spoken, from a teleprompter, often while
improvising around a live screen recording.

**Written posts are a different document.** They are read silently off a page,
which changes the rules in one specific and important way. Writing a log post, a
product page, or About copy? Use [VOICE-POSTS.md](VOICE-POSTS.md).

The reference specimen for this voice is **`log001-compiled-process.md`**. When a
rule here is ambiguous, go read that script and match it.

*Build to understand. Document to remember. Share so others can build further.*

> **Split from `VOICE.md` on 2026-08-11.** One file tried to serve both surfaces
> through a "register dial", and the dial kept getting read wrong in both
> directions. Two surfaces, two documents.

---

## 1. The non-negotiables

> **This section is identical in [VOICE-POSTS.md](VOICE-POSTS.md) §1.**
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

## 2. The register: teleprompter

### 2.1 No contractions

Write "it is", not "it's". "I will", not "I'll". "There is", not "there's".

This is **a production constraint, not a style preference.** Full words have
fewer elisions to trip on when you are reading off a prompter and improvising at
the same time. A contraction is a small speed bump you have to hit exactly right;
across a twenty-minute take, they are where the retakes come from.

The teleprompter text is a floor, not a cage. If a full word comes out as a
contraction while you are actually speaking, that is fine, that is you talking.
The point is that the *written* line never forces one.

### 2.2 The trap: full words are not permission to be choppy

This is the failure mode, and it has already happened once. The LOG 001 wrap got
flagged as stiff and "hard chocked": choppy strings of short fragments that are
hard to say out loud. The contraction rule got blamed, but it was not the cause.
**The cause was fragments.**

Full words and flowing sentences are not in tension. Write long, connected,
breathing lines and just spell the words out.

- BAD: "Share images. Analytics. The store. One video at a time."
- GOOD: "Then it is share images, then analytics, and then eventually the store,
  but one video at a time."

- BAD: "It is live. It is real. It works. No JavaScript."
- GOOD: "It is live, it is real, and the whole thing runs without a single line
  of JavaScript."

Connective tissue is your friend here: "so", "and then", "honestly", "which
means", "the thing is". Real speech runs sentences into each other. Let it.

If you want a checklist on screen, put the bullets in the edit and read a
flowing version over them. Never read the bullets.

### 2.3 Say it out loud

The only real test. Read every line aloud before it goes on the prompter. If it
feels clipped, formal, or like something nobody would say, rewrite it looser. A
sentence that reads fine and speaks badly is a bad sentence here.

---

## 3. Newbie explanations

The audience includes people who have never done this. When a term would lose
them, define it in one plain sentence and move on.

- GOOD: "A serverless function is a tiny program that wakes up only when someone
  hits submit, does its job, and goes back to sleep."
- GOOD: "An API key is just a password that lets my code talk to their service."

Keep them **short and plain, and cut the fluff.** One sentence, no analogy stack,
no apologizing for the explanation. Never condescending. Then keep moving, the
people who already knew are still watching.

---

## 4. Script format

Every beat follows **PAST → PRESENT → REFLECTION**, and not every beat needs all
three.

- **PAST** = voiceover over a still or b-roll. The thinking, edited tight.
  Scripted, read clean.
- **PRESENT** = live screen capture of doing the thing. These are **prompts, not
  a script**. Say them in your own words. If it breaks live, keep it.
- **REFLECTION** = a short takeaway, only where the step actually taught
  something.

Blocks that appear in a script and nowhere else:

- `*[SCREEN: ...]*` — stage directions. **These live only in scripts.** A stage
  direction in a written post is a bug.
- `> **Action:** ...` — the literal thing to do on camera. Written so it can be
  followed later by a viewer.
- `> **Prompt:** ...` — what to hand the AI, verbatim.
- `> *(On-screen note: ...)*` — a caption for the edit, not spoken.
- `**TAKEAWAY:** ...` — the transferable lesson, one sharp line.

**Keep what breaks.** A failed command on camera is worth more than a clean one.
The LOG 002 script keeps a peer-dependency error in full, because watching
someone read an error message and work it out is the actual teaching.

---

## 5. Before and after

**Contraction → full word.**
- BAD: "There's no way to actually reach me, and that's kind of the problem."
- GOOD: "There is no way to actually reach me, and that is kind of the problem."

**Choppy → breathing** (see §2.2, this is the one that matters).
- BAD: "No form. No email. Nothing. A dead end."
- GOOD: "There is no form, there is no working email on the domain, so it is
  basically a dead end."

**Reading the bullets → reading a sentence.**
- BAD: "We added the adapter. We built the form. We wired the handler. We
  verified the domain."
- GOOD: "So we added the adapter, built the form, wired up the handler, and then
  went and verified the domain so the mail would actually be trusted."

**Hype → the fact, out loud.**
- BAD: "And boom, it is live. Incredible."
- GOOD: "I typed the real address, and it loaded. Live. Online. Real."

**Jargon → one plain sentence.**
- BAD: "We are going to opt one route out of prerendering via the adapter."
- GOOD: "I am going to let exactly one page run live code, and leave everything
  else as plain files."

**Vague → the number.**
- BAD: "It is basically free."
- GOOD: "About ten dollars a year, and I will show you the bill."

---

## 6. Self-check

- [ ] Read the whole thing out loud. Actually out loud.
- [ ] **No contractions in narration lines.** Prompts, actions and on-screen
      notes are reference text and may relax, but anything spoken is full words.
- [ ] No strings of three or more fragments in a row.
- [ ] Every jargon term gets one plain sentence, once.
- [ ] No adjective describes Marcelo anywhere.
- [ ] Every claim is carried by a number, a decision, or a shipped artifact.
- [ ] No em dashes in spoken lines. No exclamation marks.
- [ ] No word from the startup list (§1).
- [ ] Stage directions are present and clear for the edit.
- [ ] The episode number in the wrap matches the filename and ROADMAP.md.
- [ ] **No version number spoken.** Versions are not tied to episodes
      (CLAUDE.md §9). "Version one-oh-three" in a LOG 002 script is wrong twice.
- [ ] Nothing unfinished is claimed as done. Deferred work is named as deferred.

---

## 7. Current compliance, honestly

Measured 2026-08-11, contractions in narration per script:

| Script | Before | After | State |
|---|---|---|---|
| `log002-contact-form-and-email.md` | 78 | **0** | Converted 2026-08-11 |
| `log001-compiled-process.md` | 12 | 12 | The original model |
| `log001-dll-web-video-script.md` | 29 | 29 | Close |
| `log004-going-public-analytics.md` | 36 | 36 | Not converted |
| `log005-presentation-layer.md` | 31 | 31 | Not converted |
| `log003-obsidian-publishing-pipeline.md` | 59 | 59 | Not converted |

The LOG 001 scripts were written under this rule and hold up. Everything after
drifted casual, because the register dial in the old single `VOICE.md` was read
as "posts are informal", and the scripts followed the posts. That is the drift
this split exists to stop.

**LOG 002 is converted** because it is the next one to be filmed. The other three
are not, and converting them is a pass of its own.

### What the conversion taught

Two things worth knowing before converting another one.

**Find-and-replace is not enough, and it introduces bugs.** `I'd` is ambiguous:
it expands to "I would" or "I had" depending on the sentence, and a blind pass
turned *"if I'd only wrapped that in a try/catch"* into *"if I would only
wrapped"*, which is not English. Check every expansion of `'d` and `'s` by hand.
Possessives (`the visitor's email`, `Gmail's dropdown`) are not contractions and
must survive untouched, as must any real UI copy being quoted, like the form
label `What's eating your time?`.

**`let's` has no good expansion.** "Let us build each piece" is not something
anybody says. Rewrite the sentence instead of expanding the word:

- "Now let's build each piece." → "That is the whole architecture, so now we build each piece."
- "Let's do it." → "So that is what we are doing next."
- "Let's go." → "Here we go."

And after any conversion pass, **check for choppiness**, because that is the
failure this register is actually prone to. A run of three or more short
sentences in a row is the signal (§2.2).
