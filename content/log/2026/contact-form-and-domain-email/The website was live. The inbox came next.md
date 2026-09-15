---
type: work journal
created: 2026-08-11
project: "[[DLL Web]]"
people: []
aliases:
  - LOG 002
  - Contact form and email
  - Two pipes, one inbox
web-status: published
web-title: The website was live. The inbox came next
web-pub-date: 2026-08-13
web-snippet: LOG 001 got the MVP live, placeholders included. LOG 002 added a real address, recorded the first form failure, and split sending and receiving into two paths that meet in one inbox.
web-type: log
web-number: 2
web-stage: IN PROGRESS
web-tags:
  - ASTRO
  - RESEND
  - CLOUDFLARE
  - EMAIL
  - DNS
web-thumb: ./assets/thumb.webp
web-thumb-alt: "Cover artwork: the address hello@deadlinklabs.com set large in mono, with two hairlines entering from the left and converging at 45 degrees into a single orange node. Two paths, one inbox."
---

LOG 001 ended exactly where I wanted it to: a working website on the real
domain, built in five days and 29 commits. Most of the structure was there. Some
of the posts were placeholders. Contact was one too.

I shipped it that way on purpose. The first job was proving the whole path
worked: an idea in Obsidian, a change in Git, a build in Vercel, and a page at
the real address.

The footer already showed `hello@deadlinklabs.com`, and the About page already
had the shape of a contact form. Neither was wired yet. That wasn't an
oversight. It was the next item on the list.

When I started LOG 002, the website's DNS was already working. Email was the
part I hadn't configured yet, so I checked the MX record, the part that tells
mail servers where to deliver a message.

![A terminal query for the MX record of deadlinklabs.com on August 13, 2026. The lookup returns NOERROR and ANSWER 0, showing that no MX record was configured yet. The local resolver address is blurred.](./assets/mx-before-email-routing.png)

*The lookup worked. `ANSWER: 0` meant there was no MX record yet. Riveting television, but useful.*

==The MVP was finished at its own scope. Contact was the next build, not
something I forgot in the first one.==

## Two ways into the same inbox

There are two parts to this job.

The contact form needs to send through Resend. Regular email sent to
`hello@deadlinklabs.com` needs to come in through Cloudflare. Both end up in the
same inbox.

![Two pipes converging on one inbox. The upper row, SENDING, runs FORM to ENDPOINT to RESEND. The lower row, RECEIVING, starts with ANYONE writing to HELLO@ and passes through CLOUDFLARE. Both arrive at one orange node marked INBOX.](./assets/two-pipes.svg)

One door, two ways of knocking.

**That keeps my personal address out of the website and lets me change the
destination inbox without changing the code.**

## The first version didn't work

On August 11, I tried the obvious version: a handwritten API endpoint, a
thank-you page, and 103 lines of code behind a very small form.

It compiled. It didn't work end to end.

While debugging it, I found that Resend's Astro guide uses Astro Actions, which
covered most of the validation and request plumbing I'd written by hand. So I
deleted the first pass, put the form back to placeholder, and left the cleaner
rebuild for the camera.

AI helped write the first version quickly. Deciding that it wasn't worth
keeping was still my job.

Annoying, yes. Still better than keeping the wrong approach because I'd already
spent time on it.

==The first version failed, but it showed me what the second one didn't need.==

## The form shouldn't lie or eat the message

Testing the first version exposed two problems. A failed send could still look
successful, and an error sent the visitor back to an empty form.

Someone could write three paragraphs about their business, press the button,
hit an error, and lose the whole thing. That's a fairly rude way to introduce
yourself.

The rebuild fixes both. If a message doesn't go through, the form says so and
keeps everything the visitor typed. The API key stays on the server. The rest
belongs in the code.

The placeholder form also needed one more field: an email address. The original
layout collected a name, a company, and a problem, which was enough for the MVP.
A working contact form needs somewhere to send the reply.

The error message includes the direct `hello@` address too. If the form breaks,
there should still be another way through.

==Don't say "sent" when it wasn't, and don't make someone write the same
message twice.==

## Two services, one address

Cloudflare handles incoming mail. Resend handles messages sent by the website.

They can use the same domain without fighting over it because their DNS records
live in different places. Cloudflare uses the main domain. Resend uses a
separate `send.` address underneath it.

![Three groups of DNS records. Cloudflare owns the main domain for receiving. Resend owns the send subdomain and a DKIM signing record. A DMARC policy sits across both.](./assets/dns-map.svg)

**That's the useful part of the DNS story: the two services share the domain
without sharing the same records.**

Resend verified its side on August 14. The dashboard went from waiting for DNS
to a green “Domain verified” in ten minutes.

![A cropped Resend dashboard showing deadlinklabs.com verified and ready to send email. The timeline shows the domain added at 12:20 PM, DNS verified at 12:28 PM, and the domain verified at 12:30 PM.](./assets/resend-domain-verified.png)

*Sending was configured. The website form still had to be finished.*

Cloudflare got two forwarding rules: one for `hello@` and one for DMARC reports.
The private destination addresses stay private.

![A cropped Cloudflare routing table showing active rules for dmarc@deadlinklabs.com and hello@deadlinklabs.com. The private forwarding destinations are blurred.](./assets/cloudflare-email-routes.png)

*Two public addresses, two active routes, one private inbox behind them.*

## The first half is real now

Cloudflare doesn't provide another mailbox. It receives the mail and forwards
it into the Gmail inbox I already use.

I sent a real test from my personal account to `hello@deadlinklabs.com` on
August 13.

It arrived.

![A test email addressed to hello, received in Gmail with the message “Hello, world!” The date and unrelated Gmail controls have been cropped out.](./assets/email-received-hello.png)

*The receiving path works. A real message sent to `hello@deadlinklabs.com`
reached my inbox.*

That screenshot proves receiving. It doesn't prove the website form yet, and it
doesn't prove that a reply can leave Gmail showing `hello@` instead of my
personal address. Gmail's “Send mail as” setting will handle that last part
through Resend, but it still needs the same treatment as everything else here: a
real test.

## Where this stands

The receiving side works. Resend has verified the domain for sending. The first
form implementation is preserved in Git history, including the version that
didn't work.

The form itself is currently back in placeholder state while I rebuild it with
Astro Actions. I still need to send a real message through the live website,
force a failure without losing the form, and reply from `hello@`.

Until those three things pass, this record stays `IN PROGRESS`.

**Done means a person can write once, press the button once, and get a real
answer.**

## Decisions on the record

- **01 · Keep the release boundary honest.** LOG 001 shipped the working MVP.
  Contact is the planned next layer.
- **02 · Use Resend for sending and Cloudflare for receiving.** Both paths meet
  at `hello@`.
- **03 · Keep the website static.** Only the contact form needs a server
  function.
- **04 · Replace the handwritten endpoint with an Astro Action.** Less code, one
  place for validation and errors.
- **05 · Never clear the form after a failed send.** The visitor's writing
  belongs to them.

## Log timeline

- [[building-deadlinklabs-with-ai-in-public]] (the MVP this work follows)

TAKEAWAY: LOG 001 got the website online. LOG 002 gives people a way to reach me
when they get there.
