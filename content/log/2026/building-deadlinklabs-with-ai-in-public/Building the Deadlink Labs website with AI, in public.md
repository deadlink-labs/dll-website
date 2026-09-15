---
type: work journal
created: 2026-07-22
project: "[[DLL Web]]"
people: []
aliases:
  - LOG 001
web-status: published
web-title: Building the Deadlink Labs website with AI, in public
web-pub-date: 2026-07-14
web-snippet: Yes, AI can build a website. But the interesting part happens way before the first line of code. Start prompting too soon, and you get a website that could belong to anyone. Think first. Plan it. Then prompt.
web-type: log
web-number: 1
web-stage: SHIPPED
web-tags:
  - ASTRO
  - DESIGN
  - AI-ASSISTED
  - WORKFLOW
web-thumb: ./assets/the-wiring.webp
web-thumb-alt: "A horizontal chain of five stations on a dark ground: VS Code and Git, then GitHub, Vercel, Cloudflare, and the domain, which is a glowing orange node with deadlinklabs.com written beneath it. Above the chain, a dashed node labelled Obsidian Vault, next, joined to the Vercel station by a dashed diagonal line to show that link is not built yet."
---
Of course AI can build a website. The interesting thing happens when you ==**think everything through first, and only then let AI do the building**==. If you haven't decided what the website is for, AI just helps you build the wrong thing faster.

So I ran the experiment in public: I started with a long walk along the river, with ChatGPT in voice mode capturing the outline as I talked.
- Why did I want the site?
- What belonged in it?
- What should it feel like?
- What did I want someone to understand about me without me having to tell them?

Back home, I opened an empty folder. ==Five days and 29 commits later, the site was live.== I kept a record of every decision along the way.

The reason for this project goes back more than 20 years. I kept building things, but whenever someone asked to see the work, I had no link to send them. Post-production pipelines, a rural ISP, home automation, dashboards, music tools, and the occasional website. The work was real. The URL did not exist. **I was the dead link.**

I think there's another reason, one I understood later. I'm tired of starting from zero. I would build something, move on, and years later have to explain from scratch what I knew how to do. Almost none of it accumulated in one place where other people could see it.

This website is the fix, and this post is the first entry in it.

Deadlink Labs is a lab notebook I'm building in public. The first experiment is the notebook itself.

Here are the decisions and why I made them.

## Think first, then prompt

**The easy mistake is to open an AI coding tool and ask it for a website.**
**I did the opposite and spent the expensive part, the thinking, up front.**

The plan branched into three documents, all growing from one idea: the premise, the reason the site exists at all.

- **The Blueprint** is the why: the manifesto the lab is built on.
- **The Design** is how it looks and feels.
- **The Structure** is how it works: the pages, the content model, the rules.

I drafted each one myself first, in an **Obsidian Canvas**, then argued it out with AI. Never the other way around.

![[DLL Web Premise Canvas.canvas|One card at the left, DEADLINK LABS WEBSITE PREMISE, with arrows out to three stacked cards: BLUEPRINT, the why the website exists; DESIGN, how it looks and feels; STRUCTURE, how it works and how knowledge is structured. All three point right, into a final card reading READY TO BUILD with Claude Code, only now do we start writing code.]]

*The canvas itself, exactly as it sits in the vault. Nothing here was redrawn for the site.*

**Bring your own idea first, then pressure-test it against the machine.** **Do it backward and you end up with cookie-cutter slop. A generic website.**

A design lesson landed here too. I iterated the whole look inside Claude Design before a single line of the site existed. A layout change here costs one prompt. That same change after the site is built can cost an entire day.

**TAKEAWAY: Iterate where iteration is cheap.**

## One brief beats a hundred corrections

I joined all three into one file, `CLAUDE.md`, the brief for the entire project. Blueprint, design decisions, structure, voice rules, even how I number my commits, in a single source of truth. When the AI has a question, that file answers it. The quality of what you build comes straight from the quality of that file. ==One clear brief beats a hundred small corrections later.==

![A diagram drawn in pale hairlines on a dark ground. One node at the left, labelled PREMISE, opens outward into three parallel rails: BLUEPRINT, the why; DESIGN, look and feel; STRUCTURE, how it works. The three rails close again on the right onto a single glowing orange node labelled CLAUDE.md, so the whole shape opens and then narrows to one point.](./assets/the-brief.svg)

## Fast, without the bells and whistles

**I chose the tools to make the website fast and keep everything else out of the way.**

I chose Astro because it builds the site and ships zero JavaScript by default. The pages are plain, fast HTML. The work is the point, not the interface.

Claude kept suggesting another component, another animation, and another dependency. I had to keep asking whether any of it helped someone read the work.

Usually, it didn't.

![Three pale nodes stacked in a column on the left, labelled MARKDOWN NOTES, ASTRO COMPONENTS and DESIGN TOKENS, joined by a vertical spine that runs down into a fourth node glowing orange, labelled STATIC HTML. Filling the right half of the frame, in large letters: nothing loads to perform at the reader.](./assets/what-astro-ships.svg)

*Measured from the build that produced this page: the browser is asked for zero JavaScript files. That is not the same as no JavaScript at all. There are 145 bytes of it, inline, running the header, and that is the whole of it.*

## Version control before the first real line of code

Git was running before the first real line of the site existed. I wanted the history from the beginning, including the parts that went wrong.

**Git** keeps the snapshots on my machine. **GitHub** keeps another copy in the cloud. **Vercel** watches the repository and deploys the site. **Cloudflare** points the real domain at it.

The commit history doubles as the changelog. Every message starts with a version number, so I can go back and see the order in which things happened: the first scaffold, the masthead redesign, the network mark, the responsive fixes, and finally the first live deployment.

Nothing fancy. I push. The site builds.

## No CMS, because Obsidian is already my source of truth

I already write everything in **Obsidian**: notes, daily logs, research, all of it. Adding a **Wordpress** or any other CMS would mean another copy of every post, another login, and another inbox to neglect.

So the vault remains the source.

==A plain note becomes a published page by saving it and pushing, with nothing in between and no second copy of the content living anywhere else.==

That matters beyond convenience. If documenting the work becomes a separate job, eventually I won't do it. I know myself.

![Two lanes compared on a dark ground. The upper lane, THE USUAL WAY, runs EDITOR to CMS DATABASE to SITE and ends in the numeral 2 over the words COPIES OF THE CONTENT. The lower lane, THIS SITE, runs from a glowing orange node labelled VAULT NOTE straight to SITE, and ends in a much larger numeral 1 over the words COPY OF THE CONTENT.](./assets/no-second-copy.svg)

How that actually works is a big enough topic to be its own thing: a note in a vault turning into a live page, with no step in between. That's LOG 003.

## The decisions, on the record

- **01 · Think first, prompt second.** I wanted AI to execute the direction, not invent it.
- **02 · One brief for the whole project.** Fix the instruction once instead of correcting the same mistake everywhere.
- **03 · Fast, without the bells and whistles.** I chose Astro to keep the website fast and ship almost no JavaScript.
- **04 · Obsidian instead of a CMS.** I keep one copy of the writing, in the place where I already work.

## What shipped

The first live version was mostly structure and placeholder posts. I shipped it anyway because I wanted to prove the whole thing worked: an idea in Obsidian, a change in Git, a build in Vercel, and a page at the real address. 

Did AI build the website? Yes. **Claude** wrote a lot of the code, much faster than I could have.

But it didn't decide why the site should exist. It didn't know which parts felt like me, which parts were too much, or what the work was supposed to say when I wasn't there to explain it.

That was the experiment. An empty folder at the start. A live website five days and 29 commits later. 

Nothing here 404s anymore.
