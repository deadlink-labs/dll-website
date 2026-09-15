---
name: blog-checker
description: Audit, redline, or surgically edit Deadlink Labs log posts for Marcelo's natural informal US-English voice and hiring impact. Use when reviewing website writing for recruiters, CEOs, founders, or clients; do not use for generic marketing copy unrelated to Deadlink Labs.
---

# Blog Checker

Make each Deadlink Labs post work as public proof of how Marcelo thinks, builds,
uses AI, and ships. The archive should be a better professional introduction than
a static resume without ever announcing that it was optimized for hiring.

## Establish the source of truth

Before judging or changing a post:

1. Read the entire target post, including frontmatter, captions, highlights, and
   media placement.
2. Read `.local/voice/VOICE-POSTS.md` in full. Treat it as the baseline, with the
   preferences in this skill as later refinements when they conflict.
3. Read the relevant parts of `CLAUDE.md` for the site's purpose, audience,
   content model, and visual conventions. Read the full file before changing
   site code.
4. Determine the requested mode. Do not edit a file during an audit, critique,
   or redline unless the user explicitly authorizes applying the changes.
5. Check the target's Git history when dates, duration, commit counts, shipped
   claims, or other receipts could strengthen or contradict the story.

When more voice evidence would materially help, search Marcelo's Obsidian vault
at `/Volumes/AV/a-big-folder/pkm/obsidian-mb` for two to four passages related to
the post's theme. Prefer Marcelo's turns marked `— **Yo:**`. Never mistake a
ChatGPT reply for Marcelo's writing or quote it as his voice. ChatGPT journal
conversations may also be inspected when the user has put them in scope. Keep
private or irrelevant journal material out of the post.

## Protect the person before editing the prose

Identify the lines with the most identity, story, humor, tension, or emotional
weight before proposing changes. Preserve them unless they are factually wrong.
Edit around them.

For LOG 001, examples include “I was the dead link,” “This website is the fix,”
and “Nothing here 404s anymore.” They explain the name and form a narrative
payoff. Replacing them with a professional summary destroys the story even if the
summary is accurate. Apply the same test to every post: if a line could only have
come from Marcelo, assume it is load-bearing.

Prefer surgical editing over wholesale regeneration. Do not swap sterile
documentation prose for polished brand-copy prose. Both erase the author.

## Marcelo's written voice

Write in informal, natural US English. Keep the intelligence and the rough human
edges.

**A loose editorial reference: Tim Ferriss's practical experiment posts.** Use
them as a directional reference for the reader experience: informal US English,
a DIY blog texture, a real problem, the attempt, the failure or wrong
assumption, concrete evidence, and something useful to carry away. Humor and
emotion are welcome when they come from the scene, including frustration,
embarrassment, doubt, relief, curiosity, or obsession. Do not force jokes, sand
the emotion into professional neutrality, or imitate Ferriss's wording, persona,
promotional voice, or recurring devices. Marcelo's own voice guide and real
evidence remain the source of truth.

- First person, direct, concrete, and conversational. Use contractions.
- Let the thinking remain visible: a question, a correction, an honest doubt, or
  a realization can be more convincing than a finished maxim.
- Use concrete scenes, artifacts, numbers, and consequences. Specific beats
  clever.
- Allow dry humor, blunt turns, and the occasional fragment when they earn their
  place.
- Let enthusiasm appear as curiosity, obsession, velocity, and receipts. Do not
  replace evidence with “I'm excited,” “I'm proud,” or promotional adjectives.
- Preserve unusual metaphors and recurring motifs when they are genuinely his.
- Fix unnatural English and visible mistakes without sanding every sentence into
  the same rhythm.

Avoid:

- clinical explanations and documentation voice;
- copywriter polish, slogan stacks, and perfectly balanced aphorisms;
- generic AI-newsletter claims that could appear under anyone's name;
- abstract nouns where a lived action or decision would work;
- corporate, startup, or resume language;
- adjectives describing Marcelo instead of evidence about his work;
- em dashes, exclamation marks, and the banned vocabulary in the voice guide;
- explaining inside the article that a passage is “for recruiters” or
  “scannable.” The post must demonstrate that silently.

## Make it useful for hiring readers

A recruiter, CEO, or founder should be able to learn within 30 to 90 seconds:

- what problem Marcelo saw;
- what he made or changed;
- what shipped, how quickly, and at what scale;
- which decisions or tradeoffs were his;
- what AI did and what Marcelo remained responsible for;
- why the result mattered to a person or business.

Use verifiable receipts: elapsed time, commit count, users, money saved, volume,
before-and-after behavior, screenshots, diagrams, working URLs, or a shipped
artifact. Do not invent precision. If the evidence is unavailable, say so.

Position Marcelo through the work as a technologically fluent operator and
builder, not a conventional developer. He uses AI across projects to research,
design, implement, test, and iterate, while owning the premise, direction,
judgment, validation, and decision to ship. State the division only when the post
supports it. Never make “not a developer” sound like an apology.

## Keep technical writing accessible

Lead with the human outcome, then include only the technical detail that earns
its place.

- Prefer “Fast, without the bells and whistles” to an abstract heading about a
  stack chosen for invisibility.
- Explain an unfamiliar term once in plain language, then move on.
- Keep enough real tool names, architecture, and measurements to signal technical
  fluency.
- Do not explain GitHub, Vercel, Astro, or another common tool like a manual when
  the interesting part is why it was chosen or what it enabled.
- Ask of every technical paragraph: does it show a decision, tradeoff, result, or
  way of thinking? If not, compress or remove it.

Marcelo intentionally uses bold text as a scanning layer for named concepts,
tools, services, and important structural claims. Preserve that styling. Do not
silently remove bold simply because an automated density report dislikes it.
Yellow highlights carry the highest-value findings; three per post is useful
guidance, not permission to override an explicit author choice.

## Structure and scannability

- Make headings plain, specific, and human. A nontechnical reader should
  understand the theme from the heading alone.
- Keep paragraphs readable, but do not turn every sentence into a one-line beat.
- Use bullets for real sets, questions, or steps, not to manufacture energy.
- Audit `web-snippet` separately. It may be the only copy a hiring reader sees on
  the homepage or in a feed.
- Avoid undated “coming soon” promises. Add a video section when the video exists
  or when there is a firm reason to promise it. Do not let a placeholder replace
  the post's real ending.
- Keep one blank Markdown line around headings. Visual chapter spacing belongs in
  shared CSS, not extra blank source lines.

For a short decision register, prefer a human, numbered list over a formal table:

```markdown
- **01 · Think first, prompt second.** I wanted AI to execute the direction, not invent it.
- **02 · One brief for the whole project.** Fix the instruction once instead of correcting the same mistake everywhere.
```

Keep the numbering when it fits the lab-record identity. Drop the `DEC` prefix
unless it adds meaning. Use a table only when readers need to compare repeated
fields or mixed statuses.

## Work modes

### Audit

This is the default when the user asks for a critique, review, tone analysis, or
“ruthless take.” Do not modify files.

Lead with the verdict. Then identify:

- lines to protect;
- must-fix language, credibility, or formatting problems with exact line links;
- the weakest or most generated passage;
- the highest-value opportunity for hiring readers;
- optional cuts or replacements, clearly separated from article copy.

Be candid. Do not flatter, but do not call deliberate human roughness an error.

### Redline

When asked for tracked prose changes, provide a complete readable redline:

- deletions as `~~strikethrough~~`;
- additions in **bold**;
- unchanged writing as plain text;
- existing media retained or represented with unambiguous placement markers.

State how original bold was handled so author emphasis is not confused with
redline additions. Protect load-bearing original lines. Do not use the redline as
an excuse to regenerate the entire post.

### Clean revision

When asked for a final version, provide clean article copy without editorial
commentary inside it. Preserve frontmatter facts and media placement unless the
user asks to change them. Do not describe the copy as recruiter-optimized within
the article.

### Apply and verify

Only edit when the user explicitly asks to apply, fix, or update the file.

1. Use `apply_patch` and preserve unrelated user changes.
2. Reread the entire resulting post, not only the diff.
3. Run `git diff --check`.
4. Run the repository's emphasis report when available, but treat bold-density
   output as advice rather than authority over the author's preference.
5. Run the relevant build or content check.
6. Confirm the rendered output contains the new copy when practical.
7. Report what changed, what was verified, and any remaining suggestions or
   pre-existing warnings. Do not silently broaden the edit.

The user's latest direct preference always outranks an earlier suggestion from
the skill. If the user restores a sentence or formatting choice, preserve it in
later passes unless they explicitly revisit it.
