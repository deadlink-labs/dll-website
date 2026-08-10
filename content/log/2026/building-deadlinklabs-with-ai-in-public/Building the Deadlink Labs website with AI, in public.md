---
# --- Obsidian-internal (site ignores all of these) ---
type: work journal
created: 2026-07-14
project: "[[DLL Web]]"
people: []
aliases:
  - "LOG 001"   # the filename already gives me the title + graph in Obsidian; this just lets me jump by number

# --- web-* namespace (the ONLY fields the site reads) ---
web-status: published
web-title: "Building the Deadlink Labs website with AI, in public"
web-pub-date: 2026-07-14
web-snippet: "AI can build a website. What decides the result is everything you settle before it starts. The brief, the stack, the hosting, and why each call was made."
web-type: log
web-number: 1
web-stage: IN PROGRESS
web-tags: [ASTRO, DESIGN, AI-ASSISTED, WORKFLOW]
# web-video: "https://youtu.be/XXXXXXXXXXX"   # YouTube share link or bare ID -> renders the video facade at the top. Omit and no embed shows.
web-thumb: "./assets/the-wiring.webp"   # the wiring chain, rasterized from assets/the-wiring.svg via `npm run tiles -- <path>`. Was the network-mark tile (assets/thumb.svg/.webp, still on disk): that cover restated the wordmark already in the nav and the manifesto already in the footer, and spent the whole first screen saying nothing about the work. This one shows the stack above the fold, and makes a better share card.
web-thumb-alt: "A horizontal chain of five stations on a dark ground: VS Code and Git, then GitHub, Vercel, Cloudflare, and the domain, which is a glowing orange node with deadlinklabs.com written beneath it. Above the chain, a dashed node labelled Obsidian Vault, next, joined to the Vercel station by a dashed diagonal line to show that link is not built yet."
---
The interesting thing about building a website with AI isn't that AI can build a website. Of course it can. It's what happens when you bring an actual idea to the machine, think everything through first, and only then let AI do the building.

So I ran the experiment in public: I started with a long walk by the riverside, with an LLM capturing the outline as I talked. Back at home, I went from an empty folder to designing and building the site with Claude, while documenting every decision and shipping the result.

The reason for this project goes back more than 20 years. I built things and had no link to send when someone asked to see the work. From post-production pipelines to rural ISPs, home automation, dashboards, music tools, and the occasional website. The work was real. The URL did not exist. I was the dead link.

This website is the fix, and this post is the first entry in it. 

Deadlink Labs is a lab notebook I build in public. The first experiment is the notebook itself. It's live now, which is the short answer: yes, you can design and ship your own site with AI, in public. 

What follows is the decisions and the reasons.

## Think first, then prompt

The easy mistake is to open an AI coding tool and ask it for a website.

**I did the opposite, and spent the expensive part, the thinking, up front.**

The plan branched into three documents, all growing from one idea: the **premise**, the reason the site exists at all.

- The **blueprint** is the why: the manifesto the lab is built on.
- The **design** is how it looks and feels.
- The **structure** is how it works: the pages, the content model, the rules.

I drafted each one myself first, in an Obsidian canvas, then argued it out with AI to sharpen the edges. Never the other way around. 

**Bring your own idea first, then pressure-test it against the machine. Do it backwards and you end up with cookie-cutter slop that could belong to anyone.**

A design lesson landed here too. I iterated the whole look inside a design tool before a single line of the site existed. A layout change there costs one prompt. That same change after the site is built can cost an afternoon. 

**Takeaway**: Iterate where iteration is cheap.

## One brief beats a hundred corrections

I reconciled all three into one file, `CLAUDE.md`, the brief for the entire project. Blueprint, design decisions, structure, voice rules, even how I number my commits, in a single source of truth. When the AI has a question, that file answers it. The quality of what you build comes straight from the quality of that file. One clear brief beats a hundred small corrections later.

![A diagram drawn in pale hairlines on a dark ground. One node at the left, labelled PREMISE, opens outward into three parallel rails: BLUEPRINT, the why; DESIGN, look and feel; STRUCTURE, how it works. The three rails close again on the right onto a single glowing orange node labelled CLAUDE.md, so the whole shape opens and then narrows to one point.](./assets/the-brief.svg)

## A stack chosen for invisibility and speed

This is a content archive, not an app, so the stack is not the main character.

**Astro** builds the site and ships zero JavaScript by default. The pages are plain, fast HTML. Nothing loads to perform at the reader. The work is the point, not the interface, and Astro lets the interface get out of the way.

**TypeScript** catches type mistakes before they become bugs. **Tailwind** keeps styling in the markup, so there's no separate stylesheet to hunt through. Motion is CSS-first, no animation library riding along, which keeps the promise of shipping almost no JavaScript honest.

![Three pale nodes stacked in a column on the left, labelled MARKDOWN NOTES, ASTRO COMPONENTS and DESIGN TOKENS, joined by a vertical spine that runs down into a fourth node glowing orange, labelled STATIC HTML. Filling the right half of the frame, in large letters: nothing loads to perform at the reader.](./assets/what-astro-ships.svg)

*Measured from the build that produced this page: the browser is asked for zero JavaScript files. That is not the same as no JavaScript at all. There are 145 bytes of it, inline, running the header, and that is the whole of it.*

## Version control before the first real line of code

Git on my machine, then three services, each doing one job.

**Git** is the version control itself, and it runs on my machine: it saves a snapshot of the whole project every time I commit. 

**GitHub** stores those snapshots in the cloud, so the backup lives somewhere other than my desk. Both were running before the first real line of code, so nothing built from that point
on can be lost. The commit history doubles as the changelog: every message starts
with a version number, so anyone can read the log and watch the site grow one
version at a time.

**Vercel** builds and hosts. It connects straight to the GitHub repo, detects that it's an Astro project, and deploys it. No servers, no build settings to configure. 

**Cloudflare** runs the DNS and points the real domain at Vercel.

That version numbering has one rule I like. A leading zero means "still in development." A leading one means "live and confirmed online." The moment deadlinklabs.com resolved in a clean browser tab, that zero became a one.

## No CMS, because Obsidian is already my source of truth

There's no CMS, on purpose. I already write everything in Obsidian: notes, daily logs, research, all of it. So the vault is the source. A plain note becomes a published page by saving it and pushing, with nothing in between and no second copy of the content living anywhere else.

![Two lanes compared on a dark ground. The upper lane, THE USUAL WAY, runs EDITOR to CMS DATABASE to SITE and ends in the numeral 2 over the words COPIES OF THE CONTENT. The lower lane, THIS SITE, runs from a glowing orange node labelled VAULT NOTE straight to SITE, and ends in a much larger numeral 1 over the words COPY OF THE CONTENT.](./assets/no-second-copy.svg)

How that actually works is a big enough topic to be its own thing: a note in a vault,
turning into a live page, with no step in between. That's LOG 002.

## The decisions, on the record

Every record in this lab keeps a decision register: the calls that were made, and where each one stands. Here's the register for this build.

| DEC | Decision | Status |
|---|---|---|
| DEC 001 | Astro as the framework, zero JavaScript shipped by default | SETTLED |
| DEC 002 | TypeScript and Tailwind for safety and speed of iteration | SETTLED |
| DEC 003 | GitHub for backup, with versioned commits as the changelog | SETTLED |
| DEC 004 | Vercel for hosting, Cloudflare for DNS | SETTLED |
| DEC 005 | One brief, `CLAUDE.md`, as the single source of truth | SETTLED |
| DEC 006 | Obsidian vault as the content source, no CMS | SETTLED |
| DEC 007 | Think first, prompt second: premise and design before code | SETTLED |
| DEC 008 | Build in public and document every decision | SETTLED |

## Watch the build (soon)

The full walk-through is the video, in two parts. Part one is the thinking: the premise, the design, and the structure coming together. Part two is the build: wiring the stack, standing up the site, and putting it online at its real address. Everything I used is linked in the video description.

An empty folder at the start. A live website by the end. Planned, designed, structured, built, and documented the whole way through. Nothing here 404s anymore.
