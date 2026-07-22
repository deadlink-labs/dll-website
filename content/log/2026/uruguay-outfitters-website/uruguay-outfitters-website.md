---
# --- Obsidian-internal (site ignores all of these) ---
type: work journal
created: 2026-07-19
project: "[[UO Web]]"
people: []

# --- web-* namespace (the ONLY fields the site reads) ---
web-status: published
web-title: "Uruguay Outfitters: a hunting and fishing lodge website"
web-pub-date: 2026-07-16
web-snippet: "The complete web presence for Uruguay Outfitters, a hunting and fishing lodge: a fast, photo-heavy site for an international market, run by a small team."
web-type: log
web-number: 2
web-stage: SHIPPED
web-tags: [CLIENT-WORK, NEXT-JS, SANITY, VERCEL]
# Optional media. web-video omitted (no video); web-thumb is the site's own OG image.
# web-video: "https://youtu.be/XXXXXXXXXXX"
web-thumb: "./assets/thumb.jpg"
---

Uruguay Outfitters is a sporting lodge in Uruguay. I designed and built its
website in 2026. This is the top-level version of what it runs on and why, without
the client's private details. It is a marketing site made mostly of photographs,
run by a small team, so the interesting decisions are about speed and about who
gets to change things without calling a developer.

```terminal
$ git push origin main
vercel · building uruguayoutfitters.com
✓ ready · production
```

## One job, kept narrow

The site has one job that matters: turn an interested visitor into an enquiry. So
it stays narrow. One clear path to a contact form, no popups, nothing else
competing for the click. Everything on the page is there to support that step or
to get out of its way.

TAKEAWAY: decide the single thing a site must do before you choose anything else.
The stack is easier to pick once the job is clear.

## The stack, top level

Here is what it runs on, and the reason for each piece.

**Next.js and React** build the pages. Most of the site is generated ahead of
time as static files, so it loads fast and costs almost nothing to serve. The
parts that change, like the journal, refresh on their own on a timer without a
full rebuild. Plain version: the pages are pre-baked, and the few that go stale
re-bake themselves.

**Tailwind** handles styling. The rules live right in the markup with one shared
scale for type, color, and spacing, so the look stays consistent and there is no
separate stylesheet drifting out of sync.

**Vercel** hosts and deploys it. I push the code, Vercel builds it and puts it
online across a global network, close to whoever is loading it. Every change gets
its own preview link before it goes live.

**Sanity** holds the content the team needs to change: photo galleries, the
journal, seasonal details. They edit it in a simple studio and the site reads it
at build time. No deploy to swap a photo. As I said on my own build, a CMS is not
a technology choice. It is a decision about who is allowed to change what, without
asking anyone.

**Resend** sends the enquiry email. The form hands the message to it, and it lands
in the lodge's own inbox, where they reply as themselves.

## Where the real work hides

The homepage looks simple. Most of the decisions behind it are things you cannot
see.

**Images.** This is a site made of photographs. Left alone, a phone would download
a picture sized for a desktop screen. So every image is resized and converted to a
modern format on demand, at the exact width the device needs, then cached. Getting
that right cut the downloads hard without changing a thing the visitor sees.

**Delivery.** A contact form is worthless if the enquiry lands in spam, or if the
reply does. Getting mail to pass a domain's strict anti-spoofing checks, so a
reply reaches the guest's own inbox, was more work than the form itself.

**Reading.** The audience skews older. That set hard floors on text size and color
contrast, checked against accessibility standards rather than taste. A color that
looked right on a dark photo failed the contrast test on a light panel, so it did
not ship there.

## The decisions, on the record

| DEC | Decision | Status |
|---|---|---|
| DEC 001 | Next.js with React, mostly static pages, timed refresh for content that changes | SETTLED |
| DEC 002 | Tailwind for styling, one shared scale, no separate stylesheet | SETTLED |
| DEC 003 | Vercel for build, deploy, global delivery, and a preview per change | SETTLED |
| DEC 004 | Sanity headless CMS so the team edits content without touching code | SETTLED |
| DEC 005 | Resend for enquiry email, replied from the lodge's own inbox | SETTLED |
| DEC 006 | On-demand image optimization plus correct sizing for a photo-heavy site | SETTLED |
| DEC 007 | Accessibility floor on contrast and type size for an older audience | SETTLED |

## What carries over

If you build sites, the transferable part is this. Pick the one job first, and the
stack falls into place around it. And most of your real work will land in the
parts nobody notices: the picture that loads in time, the mail that arrives, the
photo the owner swapped without calling you.

Everything the visitor praises sits on top of the work they never see.

Build to understand.
