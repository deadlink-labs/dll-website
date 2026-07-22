---
# --- Obsidian-internal (site ignores all of these) ---
type: work journal
created: 2026-07-14
project: "[[DLL Web]]"
people: []

# --- web-* namespace (the ONLY fields the site reads) ---
web-status: published
web-title: "Designing and building deadlinklabs.com with AI, in public"
web-pub-date: 2026-07-14
web-snippet: "The decisions behind deadlinklabs.com, and why: the brief-first workflow, the stack, the hosting, and the Obsidian pipeline that runs it all."
web-type: log
web-number: 1
web-stage: IN PROGRESS
web-tags: [ASTRO, DESIGN, AI-ASSISTED, WORKFLOW]
# web-video: "https://youtu.be/XXXXXXXXXXX"   # YouTube share link or bare ID -> renders the video facade at the top. Omit and no embed shows.
web-thumb: "./assets/thumb.webp"   # network-mark header tile (generated); source at assets/thumb.svg
---

For thirty years I built things and had no link to send when someone asked to
see the work. Post-production pipelines, home automation, dashboards, music
tools, the occasional website. The work was real. The URL did not exist. I was
the dead link.

This is the fix, and this post is the first entry in it. Deadlink Labs is a lab
notebook I build in public. The first experiment is the notebook itself: design
this site, build it, and write down every decision while the camera runs. It is
live now, which is the short answer: yes, you can design and ship your own site
with AI, in public. This post is the long answer.

What follows is the short version, the decisions and the reasons. The full step
by step is on video, linked at the bottom.

## Think first, then prompt

The easy mistake is to open an AI coding tool and ask it for a website. You get
generic output because you handed it a generic request. So I did the opposite. I
spent the expensive part, the thinking, up front.

The plan branched into three documents, all growing from one idea.

- The **premise** is why the site exists at all.
- The **blueprint** is how it should look and feel.
- The **structure** is how it works: the pages, the content model, the rules.

I drafted each one myself first, on paper and in an Obsidian canvas, then argued
it out with AI to sharpen the edges. Never the other way around. Bring your own
idea first, then pressure-test it against the machine. Do it backwards and you
end up with cookie-cutter slop that could belong to anyone.

A design lesson landed here too. I iterated the whole look inside a design tool
before a single line of the site existed. A layout change there costs one
prompt. That same change after the site is built can cost an afternoon. So
iterate where iteration is cheap.

Then all three documents got reconciled into one file, `CLAUDE.md`, the brief
for the entire project. Blueprint, design decisions, structure, voice rules, even
how I number my commits, in a single source of truth. When the AI has a
question, that file answers it. The quality of what you build comes straight from
the quality of that file. One clear brief beats a hundred small corrections
later.

## The stack, and why

This is a content archive, not an app, so the stack is chosen to disappear.

**Astro** builds the site and ships zero JavaScript by default. The pages are
plain, fast HTML. Nothing loads to perform at the reader. The work is the point,
not the interface, and Astro lets the interface get out of the way.

**TypeScript** catches type mistakes before they become bugs. **Tailwind**
keeps styling in the markup, so there is no separate stylesheet to hunt through.
Motion is CSS-first, no animation library riding along, which keeps the promise
of shipping almost no JavaScript honest.

## Where it lives

Three services, each doing one job.

**GitHub** holds the code and every snapshot of it. I set up version control
before the first real line of code, so nothing built from that point on can be
lost. The commit history doubles as the changelog: every message starts with a
version number, so anyone can read the log and watch the site grow one version at
a time.

**Vercel** builds and hosts. It connects straight to the GitHub repo, detects
that it is an Astro project, and deploys it. No servers, no build settings to
configure. **Cloudflare** runs the DNS and points the real domain at Vercel.

That version numbering has one rule I like. A leading zero means "still in
development." A leading one means "live and confirmed online." The moment
deadlinklabs.com resolved in a clean browser tab, that zero became a one.

## The content backend

There is no CMS, on purpose. I already write everything in Obsidian: notes, daily
logs, research, all of it. So the vault is the source. A plain note becomes a
published page by saving it and pushing, with nothing in between and no second
copy of the content living anywhere else.

How that actually works, a note in a vault turning into a live page automatically,
is a big enough topic to be its own thing. That is the next series.

## The decisions, on the record

Every record in this lab keeps a decision register: the calls that were made, and
where each one stands. Here is the register for this build.

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

## Watch the build

The full walk-through is the video at the top of this page, in two parts. Part
one is the thinking: the premise, the design, and the structure coming together.
Part two is the build: wiring the stack, standing up the site, and putting it
online at its real address. Everything I used is linked in the video description.

<details>
<summary>Video transcript</summary>

I did a few more rounds with Claude Design, then let it sit over the weekend.
Coming back with fresh eyes makes the decision easier. Version 8A feels right. It
has the atmosphere I want without getting in the way of the content. One of the
changes that got it there: I asked for a header that represents experiments, how
each node builds the foundation for the next one. It is a simple way to show what
Build to Understand actually means here. A layout change in a design tool costs
one prompt. That same change once the site is built could cost an afternoon. So
iterate where iteration is cheap.

Over the weekend I also thought through the website structure. I sketched a draft
in an Obsidian canvas, my own rough idea first, then went back and forth on it
with ChatGPT. Once it was solid I documented the full structure and saved it to
my Obsidian vault. Always bring your own idea first, then discuss it with AI,
never the other way around. Do it backwards and you end up with generic slop.

Now we have the blueprint, the design, and the structure, three things branching
from one core idea, the premise. The blueprint is the why. The design is how it
looks and feels. The structure is how it works. All three feed into one place,
ready to build. The thinking is the expensive part. Once the premise, the design,
and the structure are locked, the code basically writes itself.

On to the build. First, if you do not have it, grab VS Code, it is free. I make a
new folder for the project, then open the Claude Code panel right inside VS Code.
I use the extension instead of the terminal because it shows me every change as a
diff before I accept it, so I catch anything I do not want before it happens.

This is CLAUDE.md, my brief for the whole project. The blueprint, the design
decisions, the site structure, my voice rules, even how I number my commits, all
in one file. The single source of truth. I drop it into the root of the project,
where Claude Code reads it automatically. The quality of what you build comes
straight from the quality of this file.

Then I make sure Node is installed, which is what lets us run and preview the site
locally. Before I connect anything to the cloud, I get git running, so every
change is tracked from the first step. Git is free version control that runs on
your machine. It saves snapshots of the project, like an undo button for the
whole thing. The commit history itself is the changelog. Every message starts
with a version number, so future me, or anyone else, can read the log and see the
whole story.

The last setup step is backing up to GitHub, which stores those snapshots in the
cloud. I publish to a private repository. Version control is not a later thing.
Setting it up now means nothing I build from here is ever lost.

Now Claude Code reads the whole brief and scaffolds the project. The prompt is
short because the whole specification is already in the brief. It spins up the
Astro project, pulls in what it needs, and lays out the folders. I run the dev
server and open localhost, and I get a 404, which is literally a dead link.
Fitting. It just means there are no pages yet.

Then we give the site its feel: the colors, the fonts, the paper-sheet-on-a-desk
layout, the header. Every design decision is already in the brief, so the prompt
is short again. Every project needs one thing people remember. For this site it
is the mark up top, a small truss of nodes that builds upward and resolves onto
one live orange dot. The dead link resolves. It draws itself in when the page
loads. Quiet, no flash.

Once the brief is this detailed, I ask for the entire rest of the site in a single
prompt: the stamps, the status dots, the content system, the homepage, the Log,
the Products page, the About page, the nav, and the RSS feed. All of it, one go.
A whole site from one prompt, not because the tool is magic, but because every
decision was already made and written down.

Vercel connects straight to the GitHub repo, sees it is an Astro project, builds
it, and hosts it. No servers, no setup. It hands me a live link. I own
deadlinklabs.com, and the DNS lives on Cloudflare, so I tell Vercel about the
domain and point Cloudflare at Vercel. DNS takes a few minutes to spread.

Then I open a clean tab and type the real address. deadlinklabs.com. Live.
Online. Real. For thirty years, when someone asked where they could see my work,
I had no link to send. I was the dead link. Not anymore. Every commit so far
started with a zero, because zero means still in development. The site is online
now, so that zero becomes a one. An empty folder at the start, a live website by
the end. I am Marcelo. This was Deadlink Labs, LOG 001. Build to understand.

</details>

An empty folder at the start. A live website by the end. Planned, designed,
structured, built, and documented the whole way through. Nothing here 404s
anymore.

Build to understand.
