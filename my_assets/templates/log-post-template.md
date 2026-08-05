---
# =============================================================================
# LOG POST TEMPLATE  ·  Deadlink Labs
# Copy this whole file into content/log/<year>/<slug>/<Post Title>.md in the
# content vault. The folder name IS the slug and the URL (/log/<slug>); the <year>
# is organization only and never appears in the URL. Name the .md after the post
# TITLE (readable in Obsidian's switcher/graph), NOT the folder — the slug comes
# from the folder, so the filename is free-form.
# =============================================================================

# --- Obsidian-internal (the SITE IGNORES all of these) -----------------------
type: work journal
created: 2026-01-01          # your vault date; not read by the site
project: "[[ ]]"
people: []
aliases:                     # Obsidian-only nav handles (site ignores); filename already gives the title
  - "LOG 000"                #   jump by number; add a nickname if useful

# --- web-* namespace (the ONLY fields the site reads) ------------------------
web-status: draft            # gate: set to EXACTLY "published" to go live. Anything else = invisible.
web-title: "Can X become Y?"  # the page H1 + <title>. Experiments use a question. Do NOT repeat it as an # H1 in the body.
web-pub-date: 2026-01-01     # ISO date. Sorts the feed and shows on the record.
web-snippet: "One-line summary. Shows on the homepage featured card and as the meta description."  # optional but recommended
web-type: log               # optional; validated against the folder (must be "log" here).

# --- stamp inputs (the lab-record stamp) -------------------------------------
web-number: 0               # record number -> "LOG 000"
web-stage: IN PROGRESS      # one of: IN PROGRESS · TESTING · SETTLED · ROUGH · RESEARCH · PRIVATE BETA · REVISED · SHIPPED
web-tags: [TAG-ONE, TAG-TWO]  # thread tags shown on the stamp

# --- media ---
# web-video: "https://youtu.be/XXXXXXXXXXX"   # OPTIONAL YouTube share link OR bare ID.
#   -> Renders a click-to-play video at the TOP of the post (nothing loads from
#      YouTube until the visitor clicks). If absent, no embed shows.
# web-thumb: "./assets/thumb.webp"            # EVERY post should carry one (16:9).
#   -> Opens the post as a header image (or the video poster when web-video is
#      set) AND is the homepage feed-card / Shipped-for-clients thumbnail. Save it
#      in this post's assets/. With no photograph to use, prefer an on-brand
#      graphite specimen tile over stock/AI imagery (see LOG 001 / LOG 003).
#
#   !! COMMENTED OUT ON PURPOSE. Uncomment it only AFTER the image file exists.
#      web-thumb runs through Astro's image pipeline, which resolves the path at
#      parse time — BEFORE web-status is consulted. So a pointer to a file that
#      is not there yet FAILS THE WHOLE BUILD, even in a draft. Once the Obsidian
#      pipeline is live that means pushing a half-finished note can stop the site
#      from deploying. Image first, then uncomment.
---

<!--
  AUTHORING NOTES (this HTML comment is hidden in Obsidian reading view and is
  NOT published — the site whitelists only the web-* fields, never the body's
  comments-as-frontmatter):
  - Write plain prose. No opening "# H1" — web-title is the heading.
  - Images: standard relative markdown, ![alt](./assets/name.webp). Not ![[embeds]].
  - Keep the voice: first person, short sentences, numbers over adjectives,
    no em dashes, no exclamation marks (CLAUDE.md §6).
  - Delete any section below you do not need. Not all are required.
-->

Short overview. What is the experiment or entry, and why does it exist. Two or
three sentences is plenty.

<!--
  Optional: a terminal "specimen". A ```terminal fenced block renders as the dark
  panel on the site and stays a plain code block in Obsidian. Lines starting with
  $ or # render dim; http(s) URLs render in orange. Place it wherever it earns its
  spot (top of the post reads as a header). Delete if unused.
-->

```terminal
$ npm run dev
astro  v5.18.2  ready in 415 ms
┃ Local   http://localhost:4321/
watching for file changes...
```

## Decision Register

The crown jewel: the calls made, and where each one stands. Status tokens:
SETTLED / TESTING / REVISED. The last column renders in the stamp style.

| DEC | Decision | Status |
|---|---|---|
| DEC 001 | State the decision in one line | SETTLED |
| DEC 002 | The next one | TESTING |

## Log timeline

<!-- Optional: related entries as they accrue. Plain links in v1; wikilinks [[ ]] are preserved for later. -->

- [[related-entry]] — what it added

## Watch the build

<!--
  Only include this section if the post has a video (web-video set above).
  The player itself renders at the TOP of the post automatically — do NOT paste
  an iframe or a YouTube link here. Use this section for context + the transcript.
-->

One or two sentences pointing at the video at the top of the page.

<details>
<summary>Video transcript</summary>

<!-- Paste a CLEANED transcript here (punctuated, no "um"s), in your voice.
     Keep blank lines between paragraphs so they render as real paragraphs.
     Collapsed by default; zero JavaScript; good for long-tail search. -->

Transcript paragraph one.

Transcript paragraph two.

</details>

Closing line, in voice.
