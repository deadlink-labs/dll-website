---
type: product
created: 2026-05-11
project: "[[Hazefield]]"
people: []

web-status: published
web-title: "Hazefield"
web-pub-date: 2026-05-11
web-snippet: "A generative drone and ambient engine for long-form evolving soundscapes."
web-type: products
web-number: 2
web-stage: COMING SOON
web-tags: [GENERATIVE, AMBIENT, AUDIO]
---

A generative engine for long-form drone and ambient music. It runs on macOS and
builds evolving soundscapes that move slowly and never quite repeat. You set it
up, press play, and it keeps going for hours.

## How it is built

Hazefield is eight vertical strips feeding one master bus. Think of a strip as a
single layer of the sound.

Each strip starts with a source: an internal synth, an audio sample, a noise bed,
or an external plugin (VST or AU) you already own. On top of the audio it carries
the parts that make a layer move on its own.

- Two LFOs. An LFO is a slow wave that nudges a value up and down over time. Here
  they run between 0.01 and 0.5 Hz, so one full cycle takes seconds to minutes,
  not a wobble you would notice.
- Drift. A slow random walk that reshapes the harmonic balance of a strip over
  hours, so the texture keeps shifting and never lands back exactly where it
  started.
- An arpeggiator slot, for the strips that play notes.

Then comes the audio pipeline: varispeed (tape-style pitch), filters, pan, and
volume, with insert effects after that. All eight strips sum into a master bus
with EQ and a limiter.

## The one rule that shapes everything

Hazefield can render a session offline to a WAV file, up to several hours long.
That rendered file has to be identical to what preview plays. Not close.
Identical, down to the sample, and it is tested on every build.

TAKEAWAY: what you hear in preview is exactly what you get in the file. That
single rule decides most of the engineering underneath it, from how the slow
modulators tick to how external plugins are hosted.

## Where it stands

Honest status. Hazefield is a blueprint, not a build. The full design is written
down and now on its fourth revision, but no code exists yet. That is deliberate.
Decide the hard parts on paper, catch the contradictions there, and then build
against a plan instead of guessing.

Not purchasable yet. Join the waitlist and you get told when it opens.
