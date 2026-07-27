---
# --- Obsidian-internal (site ignores all of these) ---
type: work journal
created: 2026-07-20
project: "[[Hazefield]]"
people: []

# --- web-* namespace (the ONLY fields the site reads) ---
web-status: published
web-title: "Designing Hazefield before writing any code"
web-pub-date: 2026-07-20
web-snippet: "The pre-production behind Hazefield: a full written blueprint, a clickable mockup, and an audit that caught eleven real problems before any code existed."
web-type: log
web-number: 6
web-stage: IN PROGRESS
web-tags: [HAZEFIELD, BLUEPRINT, PRE-PRODUCTION, AI-ASSISTED]
# web-video: "https://youtu.be/XXXXXXXXXXX"   # add when the build video is up
web-thumb: "./assets/thumb.webp"              # screenshot of the Hazefield v3 interface mockup (16:9)
---

Hazefield is a generative engine for long-form drone and ambient music. Eight
layers of sound, each evolving on its own, rendered out to files that can run for
hours. This entry is not about the sound. It is about everything that happens
before the first line of code.

I have not written any code for Hazefield yet. That is on purpose. The whole
design exists first, as a document, the same way a film is storyboarded before a
camera rolls. Call it pre-production for software.

## Write the blueprint first

Before any code, I wrote the full specification with Claude: what every strip
does, how a source turns into sound, how the slow modulators move, how a session
renders to a file. It went through three revisions and landed at 2708 lines.

Two companions grew next to it. A clickable HTML mockup of the whole interface, so
I could test the layout by using it instead of imagining it. And a signal-flow
diagram, tracing one strip from its source to the master bus, so the audio path
was drawn before it was built.

TAKEAWAY: a mockup you can click is worth more than a paragraph describing a
screen. You find the awkward parts by touching them.

## Then audit it, hard

A finished-looking document is not a correct one. So I read the blueprint back
against itself, hunting for anything that contradicted, would not build, or was
sold in the prose but never actually specified. That pass found nine real
problems. A second pass found two more the first one missed. Eleven, all sitting
in a document, none of them in code.

A few of them, in plain terms.

- **The render would not have matched the preview.** Hazefield promises that a
  file rendered offline sounds identical to what you hear live. But as written, the
  live path updated its slow modulators about twenty-three times a second, and the
  render updated them once a second. The file would have come out stuttered and
  wrong, and the project's own test would have failed on the very first render.
  Caught before the code that would have failed it existed.
- **The document disagreed with itself.** One section said Drift moves pitch.
  Everywhere else it moves harmonic balance only. The single worked example in the
  whole spec would have failed the spec's own validation rules. A control the prose
  kept selling, an LFO "shape," was never in the actual design.
- **One trap was structural.** Opening an external plugin's own window could freeze
  the entire app, because the plugin's interface and Hazefield's interface would
  fight over the same thread. The fix is to run plugins in a separate process. That
  is a large decision, and it is far cheaper to make it now, in a document, than
  after the audio engine has been built around the wrong shape.

## The decisions, on the record

Every record in this lab keeps a decision register: the calls that were made, and
where each one stands. Here is where Hazefield's core decisions landed after the
audit.

| DEC | Decision | Status |
|---|---|---|
| DEC 001 | Write the full blueprint before any code | SETTLED |
| DEC 002 | Build a clickable mockup to test the interface first | SETTLED |
| DEC 003 | Render output is identical to preview, down to the sample | SETTLED |
| DEC 004 | Slow modulators tick on the same clock in preview and render | SETTLED |
| DEC 005 | Drift moves harmonic balance only; pitch wobble uses varispeed | REVISED |
| DEC 006 | External VST and AU plugins run in a separate process | SETTLED |
| DEC 007 | LFO rate runs from 0.01 to 0.5 Hz | SETTLED |

## Why do it this way

Honest note. Hazefield is on the fourth revision of its blueprint and still has
zero lines of code. From the outside that can look like avoiding the work.

It is the opposite. The audit found eleven real problems in a document I thought
was done. Every one of them would have been a bug in the build, and some were the
kind you only find after building the wrong thing around them. Finding them cost a
careful read. Fixing them cost a few edits.

TAKEAWAY: the cheapest place to fix a bug is in a sentence. The next cheapest is a
mockup. Code is the most expensive place of all, so I spend the thinking there
first and the typing there last.

## This thread continues

- [Hazefield](/products/hazefield) — what it becomes when it ships.
- [Can I design and ship my own website with AI, in public?](/log/building-deadlinklabs-with-ai-in-public) — the same idea on a different project: think first, then build.

The code is not written yet. The hard part mostly is.

Build to understand.
