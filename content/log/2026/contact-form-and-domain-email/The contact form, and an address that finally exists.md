---
# --- Obsidian-internal (site ignores all of these) ---
type: work journal
created: 2026-08-11
project: "[[DLL Web]]"
people: []
aliases:
  - "LOG 002"
  - "Contact form and email"
  - "Two pipes, one inbox"

# --- web-* namespace (the ONLY fields the site reads) ---
web-status: draft
web-title: "The contact form, and an address that finally exists"
web-pub-date: 2026-08-11
web-snippet: "The footer had advertised hello@deadlinklabs.com since launch, and the domain had no MX record, so the address went nowhere. One serverless route for sending, Cloudflare for receiving, and both pipes landing in the same inbox."
web-type: log
web-number: 2
web-stage: IN PROGRESS
web-tags: [ASTRO, RESEND, CLOUDFLARE, EMAIL, DNS]
web-thumb: "./assets/thumb.webp"   # the post's own artwork, not a generated tile; source at assets/thumb.svg
web-thumb-alt: "Cover artwork: the address hello@deadlinklabs.com set large in mono, with two hairlines entering from the left and converging at 45 degrees into a single orange node. Two paths, one inbox."
---

This site opens with a claim. The About page ends on "Nothing 404s anymore," and
the footer has carried a link to `hello@deadlinklabs.com` since the day it went
live. I checked the domain before starting this episode.

```terminal
$ dig +short NS deadlinklabs.com
tani.ns.cloudflare.com.
wells.ns.cloudflare.com.
$ dig +short MX deadlinklabs.com
$ dig +short TXT deadlinklabs.com
$ dig +short TXT _dmarc.deadlinklabs.com
$
```

Nameservers, fine. Mail records, none. Not a misconfiguration, an absence: no MX
means no server anywhere has been told what to do with mail for this domain, so
anything sent to that address bounces. The site whose whole argument is that the
work now has a URL was shipping a dead email address in its own footer.

So this record is about closing that, and about a second thing that turns out to
be the same shape: making the contact form on the About page actually send.

## Two pipes that people conflate

**Sending and receiving are separate systems.** They use different services, they
break for different reasons, and mixing them up is why "set up email on my
domain" feels harder than it is.

![Two pipes converging on one inbox. The upper row, SENDING, runs FORM to ENDPOINT to RESEND. The lower row, RECEIVING, is a single node marked ANYONE. Both turn 45 degrees and merge on a node marked HELLO@, which passes through CLOUDFLARE and arrives at an orange node marked INBOX.](./assets/two-pipes.svg)

Sending is the form. Someone types into the About page, the site hands the
message to an email API, and the API delivers it. Receiving is the ordinary
thing: someone puts `hello@deadlinklabs.com` in their mail client and presses
send.

The part worth drawing is where they meet. The endpoint does not deliver to my
personal Gmail. It delivers to `hello@`, the same address strangers use, and
Cloudflare forwards from there. One door, two ways of knocking. That choice
costs nothing and buys two things: the personal address never appears in a
public repo, and the destination inbox can change in a dashboard instead of in
a deploy.

## One server route on a site with no server

This site is a content archive. It builds to plain HTML and there's nothing
running behind it, which is the whole point. A form that sends mail needs
somewhere for the request to land.

==I went looking for how Resend says to do this in Astro before writing anything,
and the answer is that you don't write an endpoint at all.== You write an Astro
Action: a function in `src/actions/index.ts` that declares what input it accepts
and what it does with it. The framework generates the route, the client call, and
the types. Resend's own guide is about fifteen lines of code.

That matters more than the line count. An action validates its input from a
schema you declare once, so there's no hand-rolled trimming and no regex I have
to keep in sync between the browser and the server. It hands back a plain
`{ data, error }`. No fetch to write, no JSON to parse, no status codes to map.

`output` stays `'static'`. The adapter goes in, the action endpoint becomes the
one function in the build, and every page stays prerendered HTML.

%% TO CAPTURE ON CAMERA: the build output block goes here (page count + the single
   .func). Do not write the numbers until the build has actually run. %%

One pin worth recording. `@astrojs/vercel` is at version 11, which requires
Astro 7. Version 10 requires Astro 6. The newest major that works with the Astro
5 this site runs is 9.0.5, and `npm install @astrojs/vercel` without a version
fails on the peer dependency rather than picking the right one.

## Reading a secret without baking it into the bundle

The obvious way to read an API key in Astro is `import.meta.env.RESEND_API_KEY`,
which is what most examples show. **It works, and it's the wrong tool.**
Environment variables that aren't prefixed `PUBLIC_` still get statically
replaced at build time, which means the key stops being a runtime lookup and
becomes a string compiled into the bundle.

`astro:env` exists for this. The key is declared in the config as a server
secret, imported as a normal binding, and read at runtime with validation
attached, so a missing key fails loudly instead of sending mail as `undefined`.

## The failure that looks like success

I tested the handler with a deliberately invalid API key, expecting an exception
to catch. Resend doesn't throw on a rejected send. It resolves, and puts the
failure in the response payload.

A handler with only a `try/catch` around that call sees no error, falls through
to the success branch, and tells the visitor their message is on its way. The
message is gone and nothing anywhere says so. The fix is four lines, checking
`error` on the result as well as catching, and it's what Resend's own example
does for exactly this reason.

==A failure that resolves quietly is worse than one that throws, because every
test you write will pass.==

## What the visitor sees when it breaks

Reading the existing markup before wiring it up: the form collected a name, a
company, and "What's eating your time?" It did not collect an email address.
Every submission would have arrived with a problem to solve and no way to answer
it. The field is in now, required, and the action sets it as the message's
`Reply-To`, so hitting Reply in Gmail answers the person who wrote in rather than
the mailbox the form sends from.

The harder question is what happens when the send fails. The first version
redirected to an error anchor on the About page, which meant the visitor landed
back on an empty form. Someone who'd just written three paragraphs about their
business would have to type them again.

**This is the one page on the site that asks for anything, so a failure here has
to keep what the person wrote.** The form submits from a small script, the action
hands back an error, and that error gets written above the button with every
field still filled in. Fix the address, press the button again. Field-level
problems come back from the same schema that validates them, so a bad email says
so under the email box instead of blaming the server.

The error copy hands over the direct address too. An error message that only
apologises is a second dead end for someone who was trying to reach me.

## Two mail services, one domain

Here's the part that sounds like it shouldn't work. A domain has one set of MX
records and one SPF record per name. Cloudflare wants MX for receiving. Resend
wants MX and SPF for sending. That reads like a collision.

**It's not, because they claim different names.**

![Three groups of DNS records. Cloudflare, for receiving, owns the apex: MX and TXT SPF. Resend, for sending, owns send with MX and TXT SPF, and resend._domainkey with TXT DKIM. A third group, policy, applies to both: an orange-marked _dmarc TXT record to start at p equals none.](./assets/dns-map.svg)

Cloudflare takes the apex. Resend puts its records on `send.` and
`resend._domainkey`. Nothing overlaps, so nothing has to be merged, and the
common advice to give Resend its own subdomain is already how Resend sets itself
up when you verify a root domain.

The orange record is the one you add by hand, and it carries a trap. DMARC
reports go to whatever address you put in `rua`. Point that at a Gmail address
and most reporters will refuse to send, because reporting across domains
requires an authorization record published by the receiving domain, and
`gmail.com` hasn't published one for mine. ==The address in `rua` has to be on
the domain the report is about, which is the opposite of where you'd want to
read it.== Mine is `dmarc@deadlinklabs.com`, forwarded like everything else.

One more: leave DMARC alignment relaxed. Resend signs from the `send.`
subdomain, and turning on strict alignment would start bouncing the site's own
form mail.

## Replying from an address that has no mailbox

Cloudflare Email Routing forwards. It doesn't give you a mailbox, so by default
you read mail at `hello@` and reply from your personal Gmail, which shows the
personal address to every client who writes in.

Gmail's "Send mail as" fixes it, and it works on a free consumer account with no
Google Workspace. It needs an SMTP server, and Resend provides one, so the same
account already doing the sending becomes the relay for the replies. The
verification code Google sends goes to `hello@`, which is why the forwarding has
to work before this step rather than after.

## Honest note

**This is the plan, written before the build.** No DNS records exist as of this
writing, no Resend domain is verified, and no message has travelled the whole
pipe. The decisions above are settled and the reading is done. The wiring happens
on camera, and the `dig` output at the top of this post is the "before" shot.

Whether mail arrives is the next thing to find out, in public.

%% BEFORE PUBLISHING: update this section to past tense once the episode is shot,
   fill the build-output block above with real numbers, and flip web-status to
   published + web-stage to SETTLED (ROADMAP LOG 002). %%

## Decision Register

| DEC | Decision | Status |
|---|---|---|
| DEC 001 | Astro Actions for the form, following Resend's own Astro guide, rather than a hand-written API route | SETTLED |
| DEC 002 | `output` stays `'static'`; the action endpoint is the only function, and every page stays prerendered | SETTLED |
| DEC 003 | The form calls the action from a script, so the About page keeps its prerendered HTML | SETTLED |
| DEC 004 | Input validated from one declared schema, so the browser and the server cannot disagree | SETTLED |
| DEC 005 | A failed send keeps everything the visitor typed, and the error names the field | SETTLED |
| DEC 006 | Secret read through `astro:env/server`, not `import.meta.env`, so it is not compiled into the bundle | SETTLED |
| DEC 007 | Mail body sent as plain text, not HTML, so a stranger's input is never interpolated into markup | SETTLED |
| DEC 008 | The endpoint delivers to `hello@`, not to a personal inbox, so the destination lives in a dashboard and not in the repo | SETTLED |
| DEC 009 | `@astrojs/vercel` pinned to `^9.0.5`, the newest major that peers with Astro 5 | SETTLED |
| DEC 010 | Resend verifies the root domain; its records land on `send.` and do not touch the apex Cloudflare needs | SETTLED |
| DEC 011 | DMARC `rua` points at an address on this domain, and starts at `p=none` | TESTING |
| DEC 012 | No analytics or tracking on the form. Sends are already counted in the Resend dashboard | SETTLED |
| DEC 013 | Spam handling deferred to its own episode. It must land before the site opens to search | TESTING |

## Log timeline

- [[building-deadlinklabs-with-ai-in-public]] (the site this address belongs to)

TAKEAWAY: check what your own site already promises before you build the next
thing. The footer had been advertising an address for weeks, and no amount of
new work would have been worth as much as making the old claim true.
