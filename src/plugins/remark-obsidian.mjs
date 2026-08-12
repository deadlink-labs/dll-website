// remark-obsidian — the Obsidian-only syntax that plain markdown does not know.
//
// THE PREMISE THIS SERVES (CLAUDE.md §4): the vault is the source, and a note is
// published by saving it. That only holds if the note LOOKS THE SAME in both
// places. Every construct Obsidian renders and the site prints raw is a crack in
// the pipeline, so the standard here is parity, not "close enough".
//
// Astro ships GFM by default, which already covers most of Obsidian Flavored
// Markdown: bold, italic, strikethrough, inline code, blockquotes, tables, task
// lists, footnotes, nested lists, autolinks, escapes and inline HTML all match
// with no help. `==highlight==` is handled by remark-mark.mjs. This plugin
// covers what is left:
//
//   %%comment%%          removed        Obsidian HIDES these. Printing one is a
//                                       content leak, not a formatting bug —
//                                       "%%TODO: check this%%" would publish.
//   [[Note]]             display text   the note name, as Obsidian shows it
//   [[Note|alias]]       display text   the alias, as Obsidian shows it
//   ![[image.png]]       an image       resolved to ./assets/, so Astro's image
//                                       pipeline optimizes it like any other
//
// STILL NOT COVERED, and deliberately — both need a decision, not a parser:
//   > [!NOTE] callouts   render as a plain blockquote with a literal "[!NOTE]".
//                        Thirteen callout types, each with an icon and a colour,
//                        is a design-system question (§3), not a transform.
//   $math$ / $$math$$    render literally. Needs remark-math + a KaTeX stylesheet.
//
// ORDER: this runs FIRST, before remark-mark. A comment may legally contain
// anything — including an unclosed `==` or a stray bracket — and it must be gone
// before any other plugin can trip over it or count it.
//
// `.canvas` embeds are left alone here; remark-canvas.mjs owns those and needs
// to see the raw `![[…]]` text.

import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';

/** Obsidian comments. Dotall, so a %%\nmulti-line\n%% block inside one paragraph
    goes too. A comment split across a blank line is two paragraphs and is not
    matched — Obsidian treats that as two comments anyway. */
const COMMENT_RE = /%%[\s\S]*?%%/g;

/** ![[target]] or ![[target|size]] — an embed. */
const EMBED_RE = /!\[\[([^[\]|]+?)(?:\|([^[\]]*))?\]\]/;
/** [[target]] or [[target|alias]] — a link. */
const LINK_RE = /\[\[([^[\]|]+?)(?:\|([^[\]]*))?\]\]/;

/** Nodes whose contents are not prose and must never be rewritten. */
const SKIP = new Set(['code', 'inlineCode', 'html', 'yaml', 'toml', 'math', 'inlineMath']);

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg|bmp)$/i;

/**
 * Where an embedded asset lives.
 *
 * Obsidian resolves an embed vault-wide by filename; the build only has the
 * cloned content/ tree, so this looks in the post's assets/ and then beside the
 * note — the same narrow rule remark-canvas uses. A miss is left as an ordinary
 * relative path so Astro's image resolver reports it, naming the file, rather
 * than this plugin inventing a second error message for the same problem.
 */
function assetUrl(name, mdPath) {
  const base = dirname(mdPath);
  return existsSync(resolve(base, 'assets', name)) ? `./assets/${name}` : `./${name}`;
}

/**
 * Rewrite one text node into a list of nodes.
 * Returns null when nothing matched, so the caller leaves the node alone.
 */
function rewrite(value, mdPath) {
  const out = [];
  let rest = value;
  let touched = false;

  for (;;) {
    const embed = EMBED_RE.exec(rest);
    const link = LINK_RE.exec(rest);
    // An embed is a link preceded by "!", so prefer it when they start together.
    const isEmbed = embed && (!link || embed.index <= link.index);
    const m = isEmbed ? embed : link;
    if (!m) break;

    const [raw, target, pipe] = m;
    const name = target.trim();

    // remark-canvas owns canvas embeds and needs the raw text.
    if (isEmbed && name.toLowerCase().endsWith('.canvas')) {
      out.push({ type: 'text', value: rest.slice(0, m.index + raw.length) });
      rest = rest.slice(m.index + raw.length);
      continue;
    }

    touched = true;
    if (m.index > 0) out.push({ type: 'text', value: rest.slice(0, m.index) });

    if (isEmbed && IMAGE_EXT.test(name)) {
      // A real image node, not raw HTML: Astro's image pipeline transforms
      // mdast images, and remark-photo-figure/remark-svg-specimen run on them.
      // Obsidian's |size suffix is a display hint we deliberately drop rather
      // than half-honour; the site sizes images by layout (§3).
      out.push({ type: 'image', url: assetUrl(name, mdPath), alt: name.replace(IMAGE_EXT, '') });
    } else {
      // A note link, or an embed of something that is not an image. Obsidian
      // shows the alias when there is one, otherwise the note name — never the
      // brackets. The relationship itself is not resolved: the target may not be
      // a published page, and a link to a 404 is worse than plain text on a site
      // whose whole premise is that nothing 404s. Kept as prose so the future
      // "Connections" work can still find it.
      out.push({ type: 'text', value: (pipe ?? name).trim() });
    }
    rest = rest.slice(m.index + raw.length);
  }

  if (!touched) return null;
  if (rest) out.push({ type: 'text', value: rest });
  return out;
}

function walk(parent, mdPath) {
  const kids = parent.children;
  if (!Array.isArray(kids)) return;

  for (let i = kids.length - 1; i >= 0; i--) {
    const child = kids[i];
    if (SKIP.has(child.type)) continue;

    if (child.type === 'text') {
      // Comments first: their contents must never reach another plugin.
      if (COMMENT_RE.test(child.value)) {
        COMMENT_RE.lastIndex = 0;
        child.value = child.value.replace(COMMENT_RE, '');
      }
      const parts = rewrite(child.value, mdPath);
      if (parts) kids.splice(i, 1, ...parts);
      continue;
    }
    walk(child, mdPath);
  }

  // A paragraph left empty by a stripped comment would print as a blank <p>.
  if (parent.type === 'root') {
    parent.children = parent.children.filter(
      (n) => !(n.type === 'paragraph' && !n.children.some((c) => (c.value ?? 'x').trim() !== '')),
    );
  }
}

export default function remarkObsidian() {
  return (tree, file) => {
    const mdPath = file?.history?.[0] ?? file?.path;
    if (!mdPath) return;
    walk(tree, mdPath);
  };
}
