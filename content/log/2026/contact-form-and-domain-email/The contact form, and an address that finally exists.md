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
web-thumb: "./assets/thumb.webp"
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

Sending and receiving are separate systems. They use different services, they
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

## A static site with one server route

The blocker was structural. This site is a content archive, and it builds to
plain HTML with no server at all. A form that sends mail needs somewhere for the
request to land.

The roadmap had this written down as "install the Vercel adapter and switch
output mode off pure-static," and that turned out to be wrong for Astro 5.
`output` stays `'static'`. The adapter goes in, and exactly one file opts out:

```terminal
$ grep prerender src/pages/api/contact.ts
export const prerender = false;
$ ls .vercel/output/functions/
_render.func
$ find .vercel/output/static -name index.html | wc -l
      13
```

Thirteen pages of prerendered HTML, one function, and the routing table sends
only `/api/contact` to it. The archive is still an archive. There is a single
door in the wall of it.

One pin worth recording. `@astrojs/vercel` is at version 11, which requires
Astro 7. Version 10 requires Astro 6. The newest major that works with the Astro
5 this site runs is **9.0.5**, and `npm install @astrojs/vercel` without a
version fails on the peer dependency rather than picking the right one.

## Reading a secret without baking it into the bundle

The obvious way to read an API key in Astro is `import.meta.env.RESEND_API_KEY`.
It works, and it is the wrong tool. Environment variables that are not prefixed
`PUBLIC_` still get statically replaced at build time, which means the key stops
being a runtime lookup and becomes a string compiled into the function bundle.

`astro:env` exists for this. The key is declared in the config as a server
secret, imported as a normal binding, and read at runtime with validation
attached, so a missing key fails loudly instead of sending mail as `undefined`.

## The finding that would have eaten messages

I tested the handler with a deliberately invalid API key, expecting an exception
to catch. Resend does not throw on a rejected send. It resolves, and puts the
failure in the response payload:

```terminal
$ curl -s -i -X POST localhost:4399/api/contact \
    --data "name=Test&email=test@example.com&problem=Everything"
HTTP/1.1 303 See Other
location: /about/#contact-error

[contact] Resend rejected the send: {
  name: 'validation_error',
```

A handler with only a `try/catch` around that call sees no error, falls through
to the success branch, and redirects the visitor to a thank-you page. The
message is gone and nothing anywhere says so. The fix is four lines, checking
`error` on the result as well as catching. Worth writing down because ==the failure
mode is silent and looks exactly like success==.

## The form was missing the reply

Reading the existing markup before wiring it up: the form collected a name, a
company, and "What's eating your time?" It did not collect an email address.

==Every submission would have arrived with a problem to solve and no way to answer
it.== The field is in now, required, and the endpoint sets it as the message's
`Reply-To`, so hitting Reply in Gmail answers the person who wrote in rather than
the mailbox the form sends from.

## Failing without JavaScript

The site ships no client JavaScript, and a form that reports its own errors
usually wants some. This one does not. On failure the endpoint redirects to
`/about/#contact-error`, and a `:target` rule reveals a block that is otherwise
hidden. The browser does the work.

What that block says matters more than how it appears. It names whose fault it
is, and it hands over the direct address, because an error message that only
apologises is a second dead end for someone who was trying to reach me.

Both redirects are `303`, not `302`, so the browser follows with GET and a
refresh on the thank-you page cannot resubmit the form.

## Two mail services, one domain

Here is the part that sounds like it should not work. A domain has one set of MX
records and one SPF record per name. Cloudflare wants MX for receiving. Resend
wants MX and SPF for sending. That reads like a collision.

It is not, because they claim different names.

![Three groups of DNS records. Cloudflare, for receiving, owns the apex: MX and TXT SPF. Resend, for sending, owns send with MX and TXT SPF, and resend._domainkey with TXT DKIM. A third group, policy, applies to both: an orange-marked _dmarc TXT record to start at p equals none.](./assets/dns-map.svg)

Cloudflare takes the apex. Resend puts its records on `send.` and
`resend._domainkey`. Nothing overlaps, so nothing has to be merged, and the
common advice to give Resend its own subdomain is already how Resend sets itself
up when you verify a root domain.

The orange record is the one you add by hand, and it carries a trap. DMARC
reports go to whatever address you put in `rua`. Point that at a Gmail address
and most reporters will refuse to send, because reporting across domains
requires an authorization record published by the receiving domain, and
`gmail.com` has not published one for mine. The address has to be on the domain
itself. Mine is `dmarc@deadlinklabs.com`, forwarded like everything else.

One more: leave DMARC alignment relaxed. Resend signs from the `send.`
subdomain, and turning on strict alignment would start bouncing the site's own
form mail.

## Replying from an address that has no mailbox

Cloudflare Email Routing forwards. It does not give you a mailbox, so by default
you read mail at `hello@` and reply from your personal Gmail, which shows the
personal address to every client who writes in.

Gmail's "Send mail as" fixes it, and it works on a free consumer account with no
Google Workspace. It needs an SMTP server, and Resend provides one, so the same
account already doing the sending becomes the relay for the replies. The
verification code Google sends goes to `hello@`, which is why the forwarding has
to work before this step rather than after.

## Honest note

The code is in and the failure paths are tested. The DNS is not done yet. No
records exist as of this writing, no Resend domain is verified, and no message
has travelled the whole pipe. That half happens on camera, and the `dig` output
at the top of this post is the "before" shot.

So: the form posts, validates, and handles a rejected send correctly. Whether
mail arrives is the next thing to find out, in public.

## Decision Register

| DEC | Decision | Status |
|---|---|---|
| DEC 001 | `output` stays `'static'`; one route opts out with `prerender = false` rather than switching the site to server rendering | SETTLED |
| DEC 002 | `@astrojs/vercel` pinned to `^9.0.5`, the newest major that peers with Astro 5 | SETTLED |
| DEC 003 | Secret read through `astro:env/server`, not `import.meta.env`, so it is not compiled into the bundle | SETTLED |
| DEC 004 | The endpoint delivers to `hello@`, not to a personal inbox, so the destination lives in a dashboard and not in the repo | SETTLED |
| DEC 005 | Resend verifies the **root** domain; its records land on `send.` and do not touch the apex Cloudflare needs | SETTLED |
| DEC 006 | DMARC `rua` points at an address on this domain, and starts at `p=none` | TESTING |
| DEC 007 | Error state is a `:target` block, so the About page stays prerendered and ships no JavaScript | SETTLED |
| DEC 008 | Spam handling deferred to its own episode. It must land before the site opens to search | TESTING |

## Log timeline

- [[building-deadlinklabs-with-ai-in-public]] (the site this address belongs to)

TAKEAWAY: check what your own site already promises before you build the next
thing. The footer had been advertising an address for weeks, and no amount of
new work would have been worth as much as making the old claim true.
