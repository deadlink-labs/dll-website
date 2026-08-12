# deadlinklabs.com

Source for **Deadlink Labs**, the working laboratory and proof-of-work archive of
Marcelo Brouard. The site is built in public: the brief, the plan and the voice
guides are all in this repo, and the build itself is documented on the site as
numbered log entries.

## The documents

This project is written down before it is coded. Four files carry the rules and
outrank anything inferred from the source.

| File | Holds |
|---|---|
| [CLAUDE.md](CLAUDE.md) | The brief. Design system, content model, page specs, versioning. **The rules.** |
| [ROADMAP.md](ROADMAP.md) | The sequence. Episodes, checkboxes, decisions log. **What is next.** |
| [VOICE-POSTS.md](VOICE-POSTS.md) | How posts, product pages and site copy are written. |
| [VOICE-SCRIPTS.md](VOICE-SCRIPTS.md) | How video narration is written. Different rules, on purpose. |

Where the code and CLAUDE.md disagree, CLAUDE.md is the bug report.

## Stack

Astro 5 (content collections, static output) · TypeScript · Tailwind 4 · IBM Plex
· Resend · Vercel · Cloudflare DNS.

Zero client JavaScript by default. Every page is prerendered except
`src/pages/api/contact.ts`, which opts out with `export const prerender = false`.
No analytics, no cookie banner, no third-party scripts.

## Commands

```
npm run dev        # local dev server
npm run build      # astro check + astro build
npm run emphasis   # emphasis-ladder report across the archive (VOICE-POSTS.md §4)
npm run cover      # cover tile for a post with no artwork of its own
npm run tiles      # rasterize specimen SVGs to 2x .webp
npm run favicon    # favicon set derived from the network mark
```

The `--force` flag on `dev` and `build` is deliberate. Specimen `.svg` files are
build inputs Astro does not track, so a cached render otherwise ships stale
artwork.

## Content

Posts live in `content/`, one folder per post with assets co-located. The folder
name is the slug; the `.md` inside is named for the post title so it reads
correctly in Obsidian. The build reads only the `web-*` frontmatter namespace, and
only `web-status: published` renders anywhere. Full model in CLAUDE.md §4.

`content/` is committed here for now. It moves to a separate private repo, cloned
at build time, in LOG 003 (see ROADMAP.md).

## Versioning

`vMAJOR.MINOR.PATCH`, zero-padded, e.g. `v1.02.055`. PATCH ticks once per commit.
Versions describe the state of the software and are not tied to log or episode
numbers. CLAUDE.md §9.
