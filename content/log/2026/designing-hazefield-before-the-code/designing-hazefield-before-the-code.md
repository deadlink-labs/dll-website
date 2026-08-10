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
hours.

This entry isn't about the sound. It's about the eleven bugs I found in it before
a single line of code existed, and what that cost me: one careful read.

I haven't written any code for Hazefield yet, and that's on purpose. The whole
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

## Then audit it like it belongs to someone else

A finished-looking document isn't a correct one, and the person least able to see
that is the person who wrote it. So I read the blueprint back against itself, on
purpose looking for trouble: anything that contradicted, anything that wouldn't
build, anything the prose was selling that the spec never actually defined.

That pass found nine real problems. A second pass found two more the first one
missed. Eleven, all sitting in a document, none of them in code.

The two-pass part matters. If the first read finds nine and the second still finds
two, the honest conclusion isn't "eleven." It's that I don't know how many are
left, and one careful read is not enough on anything that matters.

## Three of the eleven, in plain terms

**The render wouldn't have matched the preview.** Hazefield promises that a file
rendered offline sounds identical to what you hear live. But as written, the live
path updated its slow modulators about twenty-three times a second, and the render
updated them once a second. The file would have come out stuttered and wrong, and
the project's own headline test would have failed on the very first render. Caught
before the code that would have failed it existed.

**The document disagreed with itself.** One section said Drift moves pitch.
Everywhere else it moves harmonic balance only. The single worked example in the
whole spec would have failed the spec's own validation rules. And a control the
prose kept selling, an LFO "shape," was never in the actual design at all.

**One trap was structural.** Opening an external plugin's own window could freeze
the entire app, because the plugin's interface and Hazefield's interface would
fight over the same thread. The fix is to run plugins in a separate process. That's
a large decision, and it's far cheaper to make now, in a document, than after the
audio engine has been built around the wrong shape.

## The decisions, on the record

Every record in this lab keeps a decision register: the calls that were made, and
where each one stands. Here's where Hazefield's core decisions landed after the
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

## Zero lines of code is not zero progress

Honest note. Hazefield is on the fourth revision of its blueprint and still has
zero lines of code. From the outside that can look like avoiding the work.

It's the opposite. The audit found eleven real problems in a document I thought was
finished. Every one of them would have been a bug in the build, and some were the
kind you only find after you've built the wrong thing around them. Finding them
cost a careful read. Fixing them cost a few edits.

TAKEAWAY: the cheapest place to fix a bug is in a sentence. The next cheapest is a
mockup. Code is the most expensive place of all, so I spend the thinking there
first and the typing there last.

## This thread continues

- [Hazefield](/products/hazefield). What it becomes when it ships.
- [Can I design and ship my own website with AI, in public?](/log/building-deadlinklabs-with-ai-in-public). The same idea on a different project: think first, then build.

The code isn't written yet. The hard part mostly is.

Build to understand.
