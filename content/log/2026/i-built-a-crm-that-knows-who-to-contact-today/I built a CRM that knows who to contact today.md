---
# --- Obsidian-internal (site ignores all of these) ---
type: work journal
created: 2026-08-19
project: "[[UO Outreach]]"
people: []
aliases:
  - "LOG 014"
  - "Outreach CRM"
  - "Trade partner outreach console"   # the title until 2026-09-15; kept so the old name still finds the note

# --- web-* namespace (the ONLY fields the site reads) ---
web-status: published
web-title: "I built a custom CRM with AI. It's a folder of text files, and it knows who to write to today."
web-pub-date: 2026-09-15
web-snippet: "A small bicycle-component maker needed dealers in the US. Four weeks with an AI coding agent produced a research console, a queue, a mail archive and a graph of everyone the business knows, all in plain text files. The AI does the research. A person presses Send."
web-type: log
web-number: 14
web-stage: SHIPPED
web-tags: [CLIENT-WORK, AI, CRM, AUTOMATION, OBSIDIAN]
web-thumb: "./assets/thumb.webp"   # built from the post's own artwork, the console's US coverage map; source at assets/thumb.svg
web-thumb-alt: "Cover reading CUSTOM CRM, built with AI, beside the console's US coverage map: a tile grid with one square per state laid out in the shape of the country, shaded from pale to dark green by how many shops are on file in each, with dashed outlines on the states targeted but not yet swept."
---

A small company that makes bicycle components wants more customers in the US, and the practical way to get them is through partners: independent bike shops that already sell to the riders who'd buy these parts, and could put a few of them on the shelf. Find those shops. Work out which ones are worth an email. Write to them one at a time. Remember everything that happens next. That's the job.

The company isn't named here, and the niche has been changed, by agreement. Everything else is as built.

What I built for them is a custom CRM for that one job. In essence, it's a folder of text files. One file per shop holds who they are, why they're worth writing to, who to write to, every email that went out and every reply that came back. A console reads the folder and says who to write to today. A mail sync reads the mailbox over IMAP, so the record stays true without anyone retyping anything. And because the files link to each other, the whole record is a graph you can walk: people, places, product lines, and the brands each shop already carries. The wikilink approach is borrowed from Andrej Karpathy: keep the knowledge in plain markdown that links to itself, so a person and an agent can both walk it. A script rebuilds the links from the notes on every run.

Four weeks. Built with Claude Code. The research runs through the same agent. Nothing sends by itself, and a person presses Send on every message.

This is the screen it opens on. It answers one question at a glance: is there something to do today, and how much of it. Under the counts sits a funnel from researched to stocking dealer, and a coverage table by product line for the duller job of noticing where the research is getting thin, before it becomes a gap you find by accident six months from now.

![The Overview screen: a row of stat tiles (to write, top priority, follow-ups due, dealers, shops, areas covered), a horizontal funnel chart narrowing from researched through written to, replied, interested, demo kit sent and stocking, and a small coverage table by product line below.](./assets/overview.svg)

*Recreated for this post. The layout is real; the figures are illustrative, not the client's actual numbers.*

## What eats the time isn't writing the email

The list started at eight shops on day one. It's a few hundred now and it's heading into the thousands. Every email is read and sent by a person, because a cold email that reads as a person beats one that reads as marketing, to someone who deletes forty of them a week. The LLM assists with the research on each lead, so there's real context behind the first approach.

At that scale the writing isn't the problem. Remembering is. Who we wrote to, when, from which address. What they said. Who owes whom a reply, which follow-up is due, who asked us to stop. A spreadsheet holds the first three of those for about a week. After that, every session starts with twenty minutes of reconstructing what you already knew.

**So the one thing here that genuinely needed to be a system is memory.** Everything else that could have been automated deliberately wasn't.

TAKEAWAY: the expensive part of outreach isn't sending. It's knowing, on any given morning, what the next actionable steps are.

## A CRM made of text files, on purpose

Every shop is one markdown file. The top half is structured: name, area, which of our product lines they could sell, the contacts they publish, a dated list of signals, and a status that runs from prospect to queued to sent to replied to interested to dealer, with declined and bounced as the exits. The bottom half is prose: a paragraph on why we're writing to *this* shop and not the next one on the list, then the email as it actually left, then each reply, in order. The record, the draft and the touch log, in one place.

There's no database. I considered SQLite and a spreadsheet on day one and rejected both, for a reason that's easy to state: the review mechanism is `git diff`, and both of those are binary. **Every change to the record is plain text a person can read and check, because a mistake in a prospect list is a mistake in a stranger's inbox.**

## The AI does the sweeps. A person decides.

The research is the product. Anyone can list bike shops in a region. A note without a specific, sourced reason we're writing to that one is worth nothing, and that's the rule the whole sweep runs on.

A sweep goes one area at a time, a town or a small region, worked to completion before the next one starts, because twenty half-finished areas is worse than four finished ones. The agent reads each shop's own site, decides whether they could ever care, pulls the contacts they publish, and writes the reason in the note with the source beside it. What it rules out gets filed too, with a category, because a no in September isn't a no in January. A person reads the batch and decides who we actually write to.

The rule I hold the code to is the one I'd hold a team to. ==Plain deterministic code everywhere, and a model only where a person would genuinely have had to think.== It also cuts token usage, which is always welcome.

| Plain code | A model |
|---|---|
| Fetching a page, parsing it, deduping | Reading a shop's site and judging whether they could ever care |
| Checking the do-not-contact list | Writing the paragraph on why them |
| Sorting the queue by signal age | Judging whether a newsletter item is a real signal |
| Stamping dates, computing decay | |

Cost is the cheap reason. The real one is failure mode: a sort that breaks throws an error, and a model that drifts writes the wrong thing about a real shop, quietly, and nobody notices until it's in front of them.

## A queue that rebuilds itself

Most of what you research is quiet. What's worth an email is a shop doing something now: opening a second store, announcing a demo day, hiring a new service manager. So every shop can carry a signal, dated to when it happened, and the queue is ranked by signal age. A signal decays. After 180 days it stops setting priority and the shop drops back to the steady list.

The test for what counts as a signal: could you have written the same sentence twelve months ago? If yes, it's a description, and it goes in the note as a standing fact. "They opened a second store in March" goes in as a signal, with a date.

**The queue is never edited by hand.** It's rebuilt from the files every time, so the order reflects what's true today, not who sorted it last. Three tiers, a hard daily cap, and a fourth list above all of them for the only people actually waiting on us: the ones who replied.

![The Queue screen: filter chips for each product line along the top, then three tiered sections, "write these this week," "then these" and "the background list," each row showing a shop, its area and product-line tags, and a colored signal tag with an age in days.](./assets/queue.svg)

*Recreated for this post. The layout and the tiering logic are real; the shop names, tags and counts are placeholders.*

## A map of where the research is happening

![The Map screen: a tile grid with one square per state, laid out in the shape of the US, shaded by how many shops are tracked in each, dashed outlines marking states that are on the target list but not yet swept, with a legend running from none through 6-plus and a note on the online retailers that have no state.](./assets/map.svg)

*Recreated for this post. The tile layout is the console's own; the shading is illustrative and does not show where the real research is.*

The map page is a tile grid, one square per state, laid out roughly where the state sits but with every tile the same size, so a small state is as findable as a big one. Filled means swept, shaded by how many shops are on file. A dashed outline means it's on the target list and nobody has been there yet. Click a state and the roster filters to it.

It reads slower than a real map for about three seconds, then faster every session after that, because what you're asking it is how much is left.

## The inbox automation, always fresh

Nobody should have to type "they replied" into a second system after reading the email. So the record reads the mail.

A sync pulls the outreach mailbox, read-only, into a local archive, and every message gets threaded to the shop it belongs to. Then a script stamps the notes with what the mail proves: status moves to sent when a message left, to replied when one came back, to bounced when the server rejected it, and the note records the date and the address the first email actually went to. It writes nothing else, ever, and it prints every line it writes.

![The five steps of one Sync press, left to right: pull the mailbox read-only, thread every message to its shop, stamp the notes with what the mail proves, compare each draft with what actually left, rebuild the queue. Under them, one line: git diff is the review.](./assets/sync.svg)

*Automation flowchart. The five steps are the real ones, in the real order.*

**Follow-ups are counted from the archive, not from a calendar field someone forgets to set.** The first delivered email, then every message sent since that wasn't a reply, due at 14 and then 28 days. After two, the shop moves to "owed a decision" and a person decides. The `due` command prints the list and exits non-zero while anything is on it, so a shell profile or a timer can nag, and only when it should.

==Nothing in the record says an email went out because someone remembered to type it. The mail server says so, and the record is stamped from that.==

Zoomed in on one shop, the whole loop looks like this:

![A vertical logic flowchart: research, signal found, queued and email sent run straight down the middle, each writing into the same shop file, shown as two mock snapshots on the right, one after research (shop, area, product lines, why) and one after the first email (status, signal, last touch, thread, next step). A "replied?" decision loops back to queued on no, or continues to "thread read" and "interested?" on yes, which either branches off to a dashed-outline "rejected, filed and kept" box or continues to "demo kit sent" and a dashed, not-yet-built "first order logged?" step, ending on the orange "dealer" node.](./assets/logic.svg)

*Mock data throughout. The shape of the logic and the record's fields are real; the shop, the numbers and the thread ID are placeholders.*

## Everything links, so the record is a graph

Every note lives in one **Obsidian vault**, and there are eight kinds of them: shops, areas, events, people, product lines, regions, brands, and the competing parts a shop already stocks. They point at each other with wikilinks. A note's identity is a frozen id in its header, never its filename, so a rename can't break a link, and a checker walks every file and fails on a link that stops resolving.

The people notes are generated. The roster in a shop's header (the owner, the mechanics, whoever their site names) becomes one note per person, rebuilt wholesale on every run and never edited by hand. That's a few hundred people already, each one a node the graph can follow sideways.

Which is what the Connections page is for. It answers three questions no list can. Bridge people: a person on two shops' rosters is an introduction that already exists, and a row spanning two states is a route into a town nobody has swept. Brand overlap: who already carries which brands, which tells you who needs nothing explained about the category or the price point. Displacement: who already stocks a competing part, and which one. ==Ruled-out shops are in there on purpose, because a rejection is often exactly where an introduction starts.==

![The Connections view, redrawn as a graph: shop nodes in two regions linked to people, brands and competing parts; one mechanic sits on two shops' rosters and bridges the two regions; three shops carry the same brand; two stock the same competing part. Three counts on the right name the questions: bridge people, brand overlap, displacement.](./assets/graph.svg)

*Redrawn for this post. The three questions and the note types are real; every name is a placeholder.*

## Four weeks in

The first emails went out ten days after the first commit. Two addresses bounced on that first day, and nothing has bounced since. Of the first two dozen shops written to, three have replied and two of those were a yes, both inside two weeks of the first send. A few hundred shops are on file, the roster is heading into the thousands, and the record knows what's true about every one of them without anyone having to remember it.

What's next is folding the direct-sales side of the business into the same vault, so one graph holds everyone the business knows, and closing the loop so a dealer's first order shows up on the sales side by itself instead of somebody retyping a code. Nine phases are planned and three have shipped.

## The decisions, on the record

| DEC | Decision | Status |
|---|---|---|
| DEC 001 | Build it myself with Claude Code, not with a dev team or a multi-month engagement | SETTLED |
| DEC 002 | Markdown files in git, not a database; `git diff` is the review | SETTLED |
| DEC 003 | A written trigger for re-asking the database question, and a disposable index as the answer, never a migration | SETTLED |
| DEC 004 | The AI runs the research sweeps; deterministic code does everything that isn't judgment | SETTLED |
| DEC 005 | Priority comes from dated signals that decay; a standing fact is never a signal | SETTLED |
| DEC 006 | Decay window 180 days, changed from 90 after the best prospect turned up buried | REVISED |
| DEC 007 | Status, dates and follow-ups are stamped from the mail archive, never typed | SETTLED |
| DEC 008 | A tile grid instead of a literal map | SETTLED |
| DEC 009 | No open or click tracking on the emails | SETTLED |
| DEC 010 | Fold the direct-sales side of the business into the same vault, one graph for everyone it knows | TESTING |

## What carries over

None of this is really about bike shops. Any time the job is deciding who's worth your limited attention today, out of a list that keeps growing, the shape is the same: track a dated signal, let it decay, and rebuild the ranking from the record instead of asking a person to re-sort a spreadsheet from memory.

And the smaller lesson, which is the one I'd put on a slide. **Build the boring, auditable version first.** A folder of text files and a git log won't impress anyone in a demo, but they're why this can be handed over, or extended, without anyone having to trust that a black box got it right.

The thing I keep coming back to is that none of it would have been worth building at this size if building it still cost what it used to. That's the power of AI and large language models, and that's the actual shift. Not that the tool is clever. That a problem this size was ever worth fixing at all.

The dead link here was memory. A folder of text files solved it.
