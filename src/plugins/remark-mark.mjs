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
// SCARCITY IS THE POINT, so the counts are REPORTED here rather than remembered.
// A highlight that appears four times a page marks nothing — but that is a
// judgement about prose, and the author makes it. The limits below print a
// warning naming the file and the section; they do NOT fail the build.
//
// They used to (changed 2026-08-12, at Marcelo's call). Encoding an editorial
// guideline as a thrown error meant the writer could not overrule his own style
// guide without editing a plugin, and it halted a deploy over a fourth
// highlight. That is the wrong tool: `assertFits` and the web-number uniqueness
// check throw because their failures produce a BROKEN PAGE, and a fourth
// highlight produces a page someone might merely disagree with. `npm run
// emphasis` remains the fuller report (positions, distribution, bold devices).
//
// Still fatal, because these do break the page: an unclosed `==`, which would
// render as a literal `==` nobody notices, and an empty `====`.
//
// ORDERING MATTERS: register this BEFORE remarkSvgSpecimen in astro.config.mjs.
// That plugin replaces image nodes with raw HTML containing an inlined SVG, and
// every specimen tile in this repo opens with a `<!-- =========` comment banner.
// Running after it would let this marker chew straight through those banners.
// The `html` skip below is the second line of defence, not the first.

/** Node types whose contents are never markdown prose. */
const SKIP = new Set(['code', 'inlineCode', 'html', 'yaml', 'toml', 'math', 'inlineMath']);

/** Guidance, reported as a warning: one highlight per H2 section, three per post. */
const MAX_PER_SECTION = 1;
const MAX_PER_POST = 3;

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
 * The `<mark>` node. `emphasis` with an overridden tag name, so the result stays
 * a real mdast node that later plugins can walk, with no raw HTML.
 */
const markNode = (children) => ({ type: 'emphasis', data: { hName: 'mark' }, children });

/**
 * Locate the next `==` at ONE level of the inline tree, from {i, off} onward.
 *
 * SKIP nodes are not searched — their contents are not prose — but they are not
 * barriers either: a marker may open before one and close after it, and the node
 * gets carried inside the mark. That is how ``==the `--force` flag matters==``
 * works.
 */
function findMarker(kids, fromI, fromOff) {
  for (let i = fromI; i < kids.length; i++) {
    const k = kids[i];
    if (k.type !== 'text' || SKIP.has(k.type)) continue;
    const off = k.value.indexOf('==', i === fromI ? fromOff : 0);
    if (off !== -1) return { i, off };
  }
  return null;
}

/** Concatenated prose of a node list, for the empty-highlight check. */
function flatten(nodes) {
  let out = '';
  const walk = (n) => {
    if (typeof n.value === 'string') out += n.value;
    if (n.children) n.children.forEach(walk);
  };
  nodes.forEach(walk);
  return out;
}

/**
 * Wrap `==…==` runs, INCLUDING those that span sibling inline nodes.
 *
 * The first version only ever split a single text node, so a highlight that
 * wrapped any formatting silently failed: `==**bold**==` parses to
 * [text("=="), strong(…), text("==")], the two markers land in different nodes,
 * the regex never sees a pair, and the build died on "2 stray ==". That syntax
 * is valid Obsidian and renders there, so the vault and the site disagreed —
 * which is the one thing the ==…== convention exists to prevent (§4).
 *
 * So pairing happens across the children array rather than inside one string:
 * find an opening marker, find the next one at the same level, and wrap
 * everything between — partial text at each end, whole nodes in the middle.
 */
function applyMarks(parent, ctx) {
  const kids = parent.children;
  if (!Array.isArray(kids)) return;

  // Depth first, so a mark living entirely inside a link or bold resolves in its
  // own container and its markers are gone before this level pairs anything.
  for (const child of kids) {
    if (child.type !== 'text' && !SKIP.has(child.type)) applyMarks(child, ctx);
  }

  let i = 0;
  let off = 0;
  for (;;) {
    const open = findMarker(kids, i, off);
    if (!open) return;
    const close = findMarker(kids, open.i, open.off + 2);
    // Unclosed. Leave it: countStrays reports it against the real section name.
    if (!close) return;

    const openNode = kids[open.i];
    const closeNode = kids[close.i];
    const before = openNode.value.slice(0, open.off);
    const after = closeNode.value.slice(close.off + 2);

    let inner;
    if (open.i === close.i) {
      inner = [{ type: 'text', value: openNode.value.slice(open.off + 2, close.off) }];
    } else {
      const head = openNode.value.slice(open.off + 2);
      const tail = closeNode.value.slice(0, close.off);
      inner = [
        ...(head ? [{ type: 'text', value: head }] : []),
        ...kids.slice(open.i + 1, close.i),
        ...(tail ? [{ type: 'text', value: tail }] : []),
      ];
    }

    if (!flatten(inner).trim()) {
      fail(ctx.fileName, 'an empty highlight (`====`). Remove it or fill it in.');
    }

    const repl = [
      ...(before ? [{ type: 'text', value: before }] : []),
      markNode(inner),
      ...(after ? [{ type: 'text', value: after }] : []),
    ];
    kids.splice(open.i, close.i - open.i + 1, ...repl);
    ctx.made += 1;

    // Resume just past the mark, at the start of whatever trails it.
    i = (before ? open.i + 1 : open.i) + 1;
    off = 0;
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
    const counts = new Map([[section, 0]]);
    let total = 0;

    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === 2) {
        section = headingText(node) || '(untitled section)';
        if (!counts.has(section)) counts.set(section, 0);
        continue;
      }

      const ctx = { fileName, made: 0 };
      applyMarks(node, ctx);

      // Still fatal: an unclosed marker renders as a literal `==` on the page,
      // which nobody notices. A marker that merely wraps formatting is now
      // paired correctly above, so reaching here means it was never closed.
      const strays = countStrays(node);
      if (strays) {
        fail(
          fileName,
          `${strays} stray "==" left under "${section}".\n` +
            `  A highlight was opened and never closed.`,
        );
      }

      counts.set(section, counts.get(section) + ctx.made);
      total += ctx.made;
    }

    // Guidance, not a gate (see the header). Collected and printed once, so a
    // post over the count reports every section in one block instead of dying
    // on the first one.
    const over = [...counts].filter(([, n]) => n > MAX_PER_SECTION);
    if (total > MAX_PER_POST || over.length) {
      const lines = [`[remark-mark] ${fileName}`];
      if (total > MAX_PER_POST) {
        lines.push(`  ${total} highlights in this post; guidance is ${MAX_PER_POST}.`);
      }
      for (const [name, n] of over) {
        lines.push(`  ${n} highlights under "${name}"; guidance is ${MAX_PER_SECTION}.`);
      }
      lines.push(`  Scarcity is the point, but the call is yours. \`npm run emphasis\` has the full report.`);
      console.warn(lines.join('\n'));
    }
  };
}
