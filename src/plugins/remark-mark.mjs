// remark-mark — `==text==` becomes a highlighted <mark>, the top rung of the
// emphasis ladder (CLAUDE.md §3, VOICE-POSTS.md).
//
// The syntax is Obsidian's own: a note written in the vault shows a highlight in
// Obsidian and ships as a highlight on the site, with no export step and no
// custom fence. That is the §4 pipeline principle applied to emphasis.
//
// The ladder this belongs to:
//   ==text==   the finding. One sentence a skimmer must not miss. Rendered
//              highlighted AND bold, so the author types one mark, not two.
//   **text**   structural emphasis: a thesis sentence, or a bullet lead-in.
//   plain      everything else, including product and tool names.
//
// SCARCITY IS THE WHOLE POINT, so it is enforced here rather than remembered.
// A highlight that appears four times a page marks nothing. The limits below
// fail the build naming the file and the section, the same way assertFits does
// in src/lib/tile-system.mjs and the web-number uniqueness check does at build.
//
// ORDERING MATTERS: register this BEFORE remarkSvgSpecimen in astro.config.mjs.
// That plugin replaces image nodes with raw HTML containing an inlined SVG, and
// every specimen tile in this repo opens with a `<!-- =========` comment banner.
// Running after it would let this marker chew straight through those banners.
// The `html` skip below is the second line of defence, not the first.

/** Node types whose contents are never markdown prose. */
const SKIP = new Set(['code', 'inlineCode', 'html', 'yaml', 'toml', 'math', 'inlineMath']);

/** One highlight per H2 section, three per post. */
const MAX_PER_SECTION = 1;
const MAX_PER_POST = 3;

/** Non-greedy so `==a== and ==b==` is two marks, not one spanning both.
    Dotall because a markdown soft wrap keeps a phrase in one text node. */
const MARK_RE = /==(.+?)==/gs;

/** Plain text of a heading, for error messages. */
function headingText(node) {
  let out = '';
  const walk = (n) => {
    if (typeof n.value === 'string') out += n.value;
    if (n.children) n.children.forEach(walk);
  };
  walk(node);
  return out.trim();
}

function fail(fileName, message) {
  throw new Error(`[remark-mark] ${fileName}\n  ${message}`);
}

/**
 * Split one text node on `==...==`.
 * Returns null when there is nothing to do, so the caller can leave the node
 * alone rather than replacing it with an identical copy.
 */
function splitMarks(value, ctx) {
  MARK_RE.lastIndex = 0;
  if (!MARK_RE.test(value)) return null;
  MARK_RE.lastIndex = 0;

  const parts = [];
  let last = 0;
  let match;
  while ((match = MARK_RE.exec(value)) !== null) {
    if (match.index > last) parts.push({ type: 'text', value: value.slice(last, match.index) });
    const inner = match[1];
    if (!inner.trim()) fail(ctx.fileName, 'an empty highlight (`====`). Remove it or fill it in.');
    parts.push({
      type: 'emphasis',
      // Overrides the output tag without emitting raw HTML, so the node stays a
      // real mdast node that later plugins can still walk.
      data: { hName: 'mark' },
      children: [{ type: 'text', value: inner }],
    });
    ctx.made += 1;
    last = match.index + match[0].length;
  }
  if (last < value.length) parts.push({ type: 'text', value: value.slice(last) });
  return parts;
}

/** Recurse into anything that holds inline children, skipping code and raw HTML. */
function processParent(parent, ctx) {
  const kids = parent.children;
  if (!Array.isArray(kids)) return;
  // Backwards: each splice grows the array underneath us.
  for (let i = kids.length - 1; i >= 0; i--) {
    const child = kids[i];
    if (SKIP.has(child.type)) continue;
    if (child.type === 'text') {
      const parts = splitMarks(child.value, ctx);
      if (parts) kids.splice(i, 1, ...parts);
    } else {
      processParent(child, ctx);
    }
  }
}

/**
 * Count leftover `==` in the prose of a block, after marks have been extracted.
 *
 * An odd marker left behind means the author opened a highlight and never closed
 * it. An even one means the highlight straddles inline formatting, e.g.
 * ``==see the `flag` here==``, which splits the run across separate text nodes
 * so the regex above never sees a matching pair. Both are author errors and both
 * would otherwise render as literal `==` on the page, which is worse than a
 * build failure because nobody notices it.
 */
function countStrays(node) {
  let n = 0;
  const walk = (x) => {
    if (SKIP.has(x.type)) return;
    if (x.type === 'text') n += (x.value.match(/==/g) || []).length;
    if (x.children) x.children.forEach(walk);
  };
  walk(node);
  return n;
}

export default function remarkMark() {
  return (tree, file) => {
    const fileName = file?.history?.[0] ?? file?.path ?? '(unknown file)';

    let section = '(before the first heading)';
    let inSection = 0;
    let total = 0;

    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === 2) {
        section = headingText(node) || '(untitled section)';
        inSection = 0;
        continue;
      }

      const ctx = { fileName, made: 0 };
      processParent(node, ctx);

      const strays = countStrays(node);
      if (strays) {
        fail(
          fileName,
          `${strays} stray "==" left under "${section}".\n` +
            `  Either a highlight was never closed, or it straddles inline code or a link.\n` +
            `  A highlight has to wrap plain text, so move the formatting outside it.`,
        );
      }

      inSection += ctx.made;
      total += ctx.made;

      if (inSection > MAX_PER_SECTION) {
        fail(
          fileName,
          `${inSection} highlights under "${section}", and the limit is ${MAX_PER_SECTION}.\n` +
            `  A section gets one finding. If two lines both feel essential, one of them\n` +
            `  is structural emphasis and wants ** ** instead.`,
        );
      }
      if (total > MAX_PER_POST) {
        fail(
          fileName,
          `${total} highlights in this post, and the limit is ${MAX_PER_POST}.\n` +
            `  Scarcity is the point: a mark that appears four times marks nothing.`,
        );
      }
    }
  };
}
