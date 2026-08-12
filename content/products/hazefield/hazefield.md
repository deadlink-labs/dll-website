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
web-image: "./assets/screen.png"
---

You've had this happen. You leave a generative patch running, something genuinely
beautiful goes by around minute forty, and it's gone. You can't get back to it,
you can't render it, and you can't prove it ever happened.

Hazefield is a generative engine for long-form drone and ambient music on macOS.
You set it up, press play, and it builds a soundscape that moves slowly and never
quite repeats. ==Then it renders the whole thing to a file that is identical to what
you heard.== Not close to it. Identical.

**Fair warning before you read further: it's designed, not built.** Full status at the
bottom, and the waitlist is honest about it.

## Eight strips, and every one drifts on its own

Hazefield is eight vertical strips feeding one master bus. Think of a strip as a
single layer of the sound.

Each strip starts with a source: an internal synth, an audio sample, a noise bed,
or an external plugin (VST or AU) you already own. On top of the audio it carries
the parts that make a layer move by itself.

- **Two LFOs.** An LFO is a slow wave that nudges a value up and down over time.
  Here they run between 0.01 and 0.5 Hz, so one full cycle takes seconds to
  minutes. Not a wobble you'd notice. A tide.
- **Drift.** A slow random walk that reshapes the harmonic balance of a strip over
  hours, so the texture keeps shifting and never lands back exactly where it
  started.
- **An arpeggiator slot**, for the strips that play notes.

Then comes the audio pipeline: varispeed (tape-style pitch), filters, pan, and
volume, with insert effects after that. All eight strips sum into a master bus
with EQ and a limiter.

==Eight layers each wandering on their own clocks is why it doesn't loop. There's no
loop to return to.==

## What you hear in preview is the file, down to the sample

Hazefield renders a session offline to a WAV, up to several hours long. That
rendered file has to be bit-identical to what preview played. Not close. Identical,
and it's tested on every build.

This is the rule the whole engine is bent around, and it's the reason for the
awkward engineering underneath: why the slow modulators tick on one shared clock,
why external plugins run in their own process. ==Every one of those choices exists so
that the thing you liked at minute forty is the thing that comes out of the render.==

TAKEAWAY: a generative tool you can't reproduce is a toy. The render matching the
preview is the difference between a happy accident and a master.

## Honest status: a blueprint, not a build

**Hazefield is on the fourth revision of its design document and has zero lines of
code. That's deliberate, not stalled.** An audit of the blueprint caught eleven real
problems while they were still sentences, including one that would have broken the
render-matches-preview promise on the very first render. [Here's that whole
process](/log/designing-hazefield-before-the-code), including the bugs.

So: nothing to download, nothing to buy, and no date I'm willing to promise. If
that's fine with you, get on the list and I'll tell you when it opens.

Join the waitlist.
