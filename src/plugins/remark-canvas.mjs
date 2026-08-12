// remark-canvas — render an Obsidian canvas into the page as an inline SVG.
//
// A native Obsidian embed in a post:
//
//     ![[DLL Web Premise Canvas.canvas]]
//     ![[DLL Web Premise Canvas.canvas|alt text describing the diagram]]
//
// becomes an inlined <svg> inside a <figure class="specimen-fig canvas-fig">.
// In Obsidian it stays a LIVE, pannable canvas preview, which is the whole
// reason this syntax was chosen over a ```canvas fence: a fence shows a code
// block while you write, and vault-first authoring means what you see in the
// vault is what ships.
//
// WHY ![[…]] IS ALLOWED HERE AND NOWHERE ELSE (CLAUDE.md §8): the embed ban is
// about IMAGES, because Astro's image pipeline cannot resolve a wikilink. A
// canvas never touches that pipeline — this plugin reads the JSON off disk and
// emits vector markup, so the reason for the ban does not apply.
//
// ── CONFORMANCE ────────────────────────────────────────────────────────────
// This renderer implements JSON CANVAS 1.0 — https://jsoncanvas.org/spec/1.0/
// The FORMAT is open source (MIT), open-sourced by Obsidian in 2024
// (obsidian.md/blog/json-canvas, github.com/obsidianmd/jsoncanvas). The Obsidian
// APP is not: there is no reference renderer to copy, so this is written to the
// published spec rather than to Obsidian's internals.
//
// Implemented, per spec:
//   top level  nodes[], edges[] — both optional arrays
//   all nodes  id, type, x, y, width, height, color
//   text       text ................................. rendered
//   link       url .................................. rendered
//   group      label ................................ rendered
//              background, backgroundStyle .......... REJECTED, named
//   file       file, subpath ........................ REJECTED, named
//   edges      id, fromNode, fromSide, fromEnd, toNode, toSide, toEnd,
//              color, label ......................... all honoured
//   defaults   fromEnd "none", toEnd "arrow" ........ per spec
//   canvasColor  hex, or presets "1".."6" = red, orange, yellow, green,
//                cyan, purple ....................... both forms
// The two rejections are vault-path problems, not spec gaps: file and group
// background paths are vault-absolute, and the build only has content/.
//
// A .canvas carries NO frontmatter — the spec has exactly two top-level keys —
// so every canvas needs a companion note to hold its metadata. Here that is the
// post: alt text rides the embed's pipe, and the caption is an italic paragraph
// directly below (already styled by `.prose p:has(> em:only-child)`).
//
// AS IS, NOT REDRAWN. The canvas keeps its own geometry and its own colour
// coding — the same exemption LOG 011's n8n canvas has (CLAUDE.md §3, "quote in
// the original"). That means a canvas MAY show more than one orange, which the
// one-live-node rule forbids on hand-authored tiles. Accepted: this is evidence,
// not house artwork.
//
// WHY THE CARD TEXT LIVES IN <foreignObject>: so the browser lays it out, with
// the real proportional font and real wrapping — which is what makes the page
// match the vault. The first pass set the text in <text> with IBM Plex Mono and
// wrapped it by hand against mono's 0.6em advance. That needed a markdown
// parser, a line breaker, and a shrink-to-fit search, and it still could not
// look like Obsidian, because Obsidian sets canvas cards in its sans UI font.
// Every bug in that pass (`**WEBSITE PREMISE**` printing its asterisks when a
// bold span wrapped; three different text sizes in one drawing) came from doing
// by hand what the layout engine does for free. foreignObject deletes all of it.
//
// The one cost: foreignObject does not render when an SVG is rasterized by
// resvg/sharp or loaded through <img>. Neither happens to these — they are
// inlined into the page, and covers are a separate raster path. It does mean a
// local `sharp` preview of one of these SVGs shows empty cards; screenshot the
// real page instead.
//
// CACHING CAVEAT — why package.json builds with `astro --force`:
// the .canvas files read here are build inputs Astro does not know about, so
// they are not part of a content entry's digest. Edit a canvas without touching
// its .md and Astro 5 replays the cached render from
// `node_modules/.astro/data-store.json` (which survives `rm -rf .astro`), and
// the change silently does not ship. Identical trap to remark-svg-specimen.

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { COLOR } from '../lib/tile-system.mjs';

/** A paragraph that is nothing but one canvas embed. */
const EMBED_RE = /^!\[\[([^[\]|]+?\.canvas)(?:\|([^[\]]*))?\]\]$/;

/**
 * Obsidian's preset node colours, indices 1–6, matched to its own accent
 * variables so a canvas reads on the page the way it reads in the vault. A node
 * may also carry a raw hex ("#0400ff"), which is passed through untouched.
 */
const PRESET = {
  1: '#fb464c', // red
  2: '#e9973f', // orange
  3: '#e0de71', // yellow
  4: '#44cf6e', // green
  5: '#53dfdd', // cyan
  6: '#a882ff', // purple
};

/** Card metrics, matched to Obsidian's own. Geometry comes from the canvas;
    only the inside of a card is ours. */
const PAD = 12;
const RADIUS = 8; // Obsidian's card radius, not the house 4px — quoted as is
const SIZE = 16; // Obsidian's canvas body size
const LINE = 1.5;

/**
 * Breathing room around the drawing, in canvas units.
 *
 * Deliberately NOT tile-system's MARGIN (64). That is the rail for a fixed
 * 1280px tile; a canvas is whatever size it is, and 64 a side cost this one 14%
 * of its width in empty ground — which comes straight off the rendered text
 * size, because the figure is scaled to fit the column. Obsidian's own
 * zoom-to-fit hugs the content, so this does too.
 */
const EDGE = 32;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return esc(s).replace(/"/g, '&quot;');
}

function colorOf(raw, fallback = COLOR.ink) {
  if (raw === undefined || raw === null || raw === '') return fallback;
  const key = String(raw);
  if (PRESET[key]) return PRESET[key];
  if (/^#[0-9a-f]{3,8}$/i.test(key)) return key;
  return fallback;
}

// ── ONLY <div> AND <span> MAY BE EMITTED BELOW ─────────────────────────────
//
// A foreignObject's contents are real HTML sitting inside `.prose`, so EVERY
// prose rule cascades into them. That is not theoretical: `<p><em>WHY</em> the
// website exists</p>` was matched by
//
//     .prose p:has(> em:only-child) { font-size: 13px; color: ink-60 }
//
// — the caption rule in log/[slug].astro — because `:only-child` counts element
// siblings only, and the trailing text node does not count. Ink at 62% on a dark
// panel is invisible, so that card's second line vanished. The sibling card
// escaped purely because `***HOW***` emits <strong><em>, whose only element
// child is the <strong>.
//
// Rather than fight the cascade rule by rule, nothing here emits a tag the prose
// styles target. `div` and `span` are unstyled in both prose blocks, and every
// property this renderer needs is set inline, where it outranks any stylesheet
// rule that is not !important (there are none). Adding a `<p>`, `<ul>`, `<li>`,
// `<strong>` or `<em>` here re-opens the hole.

const BOLD = 'font-weight:600';
const ITALIC = 'font-style:italic';

/**
 * The inline markdown a canvas card uses: bold, italic, both.
 *
 * Escaped first, then longest marker first so `***x***` is not eaten by the
 * `**` rule, and so `_**WHY**_` resolves to italic wrapping bold rather than
 * printing its inner asterisks. Anything else is left literal — a canvas is
 * quoted, not reformatted.
 */
function inlineMd(text) {
  return esc(text)
    .replace(/(\*\*\*|___)([^]+?)\1/g, `<span style="${BOLD};${ITALIC}">$2</span>`)
    .replace(/(\*\*|__)([^]+?)\1/g, `<span style="${BOLD}">$2</span>`)
    .replace(/(?<![\w*])\*([^*\n]+?)\*(?![\w*])/g, `<span style="${ITALIC}">$1</span>`)
    .replace(/(?<![\w_])_([^_\n]+?)_(?![\w_])/g, `<span style="${ITALIC}">$1</span>`);
}

/**
 * A card's markdown as blocks: paragraphs, headings, bullet lists.
 *
 * THE BLANK LINE IS WHY THIS EXISTS. Mapping every `\n` to `<br>` turns a
 * paragraph break into two full line boxes, which is taller than the real thing
 * — enough that four of five cards in the first canvas overflowed and lost their
 * last line. A blank line is a paragraph gap (0.5em), a single newline is a
 * `<br>`, and the card fits the way it fits in Obsidian.
 *
 * Headings and bullets are here because they are what a planning canvas
 * actually contains; anything further (tables, code fences, images) renders as
 * literal text, which is legible and honest for a quoted artifact.
 */
function blockMd(body) {
  const gap = 'margin:0 0 0.5em';
  return String(body)
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const heading = /^(#{1,6})\s+(.*)$/.exec(block);
      if (heading) {
        const level = heading[1].length;
        const size = [1.5, 1.3, 1.15, 1.05, 1, 1][level - 1];
        return `<div style="${gap};${BOLD};font-size:${size}em">${inlineMd(heading[2])}</div>`;
      }
      const lines = block.split('\n');
      if (lines.every((l) => /^\s*[-*+]\s+/.test(l))) {
        // A hanging-indent div per item, not <ul>/<li> — see the cascade note.
        return lines
          .map(
            (l) =>
              `<div style="margin:0 0 0.15em;padding-left:1em;text-indent:-1em">` +
              `• ${inlineMd(l.replace(/^\s*[-*+]\s+/, ''))}</div>`,
          )
          .join('');
      }
      return `<div style="${gap}">${inlineMd(block).replace(/\n/g, '<br/>')}</div>`;
    })
    .join('');
}

// ── edges ──────────────────────────────────────────────────────────────────

/** Anchor point and outward normal for a node side. */
function anchor(node, side) {
  const cx = node.x + node.width / 2;
  const cy = node.y + node.height / 2;
  switch (side) {
    case 'top':
      return { x: cx, y: node.y, nx: 0, ny: -1 };
    case 'bottom':
      return { x: cx, y: node.y + node.height, nx: 0, ny: 1 };
    case 'left':
      return { x: node.x, y: cy, nx: -1, ny: 0 };
    default:
      return { x: node.x + node.width, y: cy, nx: 1, ny: 0 };
  }
}

/** Which side faces the other node, when the canvas does not say. */
function inferSide(from, to) {
  const dx = to.x + to.width / 2 - (from.x + from.width / 2);
  const dy = to.y + to.height / 2 - (from.y + from.height / 2);
  if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? 'right' : 'left';
  return dy >= 0 ? 'bottom' : 'top';
}

function renderEdge(edge, byId, canvasPath) {
  const from = byId.get(edge.fromNode);
  const to = byId.get(edge.toNode);
  if (!from || !to) {
    throw new Error(
      `[remark-canvas] Edge "${edge.id}" points at a node that does not exist in ${canvasPath}\n` +
        `  fromNode: ${edge.fromNode}\n  toNode  : ${edge.toNode}`,
    );
  }

  const a = anchor(from, edge.fromSide ?? inferSide(from, to));
  const b = anchor(to, edge.toSide ?? inferSide(to, from));
  const pull = Math.max(60, Math.hypot(b.x - a.x, b.y - a.y) / 3);
  const c1 = { x: a.x + a.nx * pull, y: a.y + a.ny * pull };
  const c2 = { x: b.x + b.nx * pull, y: b.y + b.ny * pull };

  const stroke = colorOf(edge.color, COLOR.ink);
  // JSON Canvas defaults: toEnd is an arrow, fromEnd is none.
  const head = (on, dir) =>
    on ? ` marker-${dir}="url(#canvas-arrow-${stroke.replace('#', '')})"` : '';

  const path =
    `<path d="M ${a.x} ${a.y} C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ` +
    `${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${b.x} ${b.y}" fill="none" ` +
    `stroke="${stroke}" stroke-opacity="0.55" stroke-width="2"` +
    `${head((edge.fromEnd ?? 'none') === 'arrow', 'start')}` +
    `${head((edge.toEnd ?? 'arrow') === 'arrow', 'end')}/>`;

  if (!edge.label) return { path, stroke };

  // A label sits on a plate the colour of the ground so the curve never crosses
  // type — the rule the-brief.svg states in its own header comment.
  const mx = (a.x + c1.x * 3 + c2.x * 3 + b.x) / 8; // bezier midpoint
  const my = (a.y + c1.y * 3 + c2.y * 3 + b.y) / 8;
  const w = edge.label.length * SIZE * 0.55 + 12;
  const label =
    `<rect x="${(mx - w / 2).toFixed(1)}" y="${(my - 13).toFixed(1)}" width="${w.toFixed(1)}" ` +
    `height="22" rx="3" fill="${COLOR.panel}"/>\n    ` +
    `<text x="${mx.toFixed(1)}" y="${(my + 3).toFixed(1)}" text-anchor="middle" ` +
    `font-family="var(--font-sans)" font-size="13" fill="${COLOR.ink}" ` +
    `fill-opacity="0.7">${esc(edge.label)}</text>`;
  return { path, stroke, label };
}

// ── nodes ──────────────────────────────────────────────────────────────────

/** The text a card carries: a link node shows its URL, a text node its body. */
const bodyOf = (node) => (node.type === 'link' ? node.url : node.text) || '';

function renderCard(node) {
  const accent = colorOf(node.color);
  const parts = [
    `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" rx="${RADIUS}" ` +
      `fill="${COLOR.ink}" fill-opacity="0.05" stroke="${accent}" stroke-opacity="0.85" stroke-width="2"/>`,
  ];

  const body = bodyOf(node);
  if (body) {
    // A URL is the live thing on the page — same idiom as the terminal specimen.
    const fill = node.type === 'link' ? COLOR.signal : COLOR.ink;
    // overflow is VISIBLE, not hidden. Obsidian scrolls an overfull card, which
    // a static page cannot do, so the choice is between spilling and clipping.
    // Spilling is loud and costs nothing; clipping silently deletes the end of
    // the text, which is how the last line of four cards went missing once.
    // A spill means the card wants resizing in Obsidian — fix it at the source.
    parts.push(
      `<foreignObject x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" overflow="visible">\n      ` +
        `<div xmlns="http://www.w3.org/1999/xhtml" style="box-sizing:border-box;` +
        `padding:${PAD}px;font-family:var(--font-sans);font-size:${SIZE}px;` +
        `line-height:${LINE};color:${fill};opacity:0.92">${blockMd(body)}</div>\n    ` +
        `</foreignObject>`,
    );
  }
  return parts.join('\n    ');
}

function renderGroup(node) {
  const accent = colorOf(node.color);
  const frame =
    `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" rx="${RADIUS}" ` +
    `fill="${COLOR.ink}" fill-opacity="0.03" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>`;
  if (!node.label) return frame;
  return (
    `${frame}\n    <text x="${node.x + PAD}" y="${node.y - 8}" font-family="var(--font-sans)" ` +
    `font-size="14" letter-spacing="1.2" fill="${accent}" fill-opacity="0.8">` +
    `${esc(String(node.label).toUpperCase())}</text>`
  );
}

// ── the canvas ─────────────────────────────────────────────────────────────

function renderCanvas(raw, canvasPath) {
  let doc;
  try {
    doc = JSON.parse(raw);
  } catch (err) {
    throw new Error(`[remark-canvas] ${canvasPath} is not valid JSON\n  ${err.message}`);
  }

  const nodes = Array.isArray(doc.nodes) ? doc.nodes : [];
  const edges = Array.isArray(doc.edges) ? doc.edges : [];
  if (nodes.length === 0) {
    throw new Error(`[remark-canvas] ${canvasPath} has no nodes, so there is nothing to render.`);
  }

  for (const node of nodes) {
    if (node.type === 'file') {
      throw new Error(
        `[remark-canvas] Node "${node.id}" in ${canvasPath} is a FILE node, which is not supported.\n` +
          `  file: ${node.file}\n` +
          `  Canvas file paths are vault-absolute, and the build only has content/ —\n` +
          `  anything outside it cannot resolve. Replace it with a text node, or\n` +
          `  reference the asset from the post with standard markdown.`,
      );
    }
    if (!['text', 'link', 'group'].includes(node.type)) {
      throw new Error(
        `[remark-canvas] Node "${node.id}" in ${canvasPath} has unsupported type "${node.type}".\n` +
          `  Supported: text, link, group.`,
      );
    }
    // A group's `background` is an image path, so it has the same vault-absolute
    // problem a file node does. Named rather than ignored: dropping it quietly
    // would ship a group that looks wrong and say nothing.
    if (node.type === 'group' && node.background) {
      throw new Error(
        `[remark-canvas] Group "${node.id}" in ${canvasPath} has a background image, which is not supported.\n` +
          `  background: ${node.background}\n` +
          `  Canvas image paths are vault-absolute and cannot resolve from content/.`,
      );
    }
  }

  // Groups sit behind, edges under the cards, cards on top.
  const groups = nodes.filter((n) => n.type === 'group');
  const cards = nodes.filter((n) => n.type !== 'group');

  const minX = Math.min(...nodes.map((n) => n.x));
  const minY = Math.min(...nodes.map((n) => n.y));
  const vb = {
    x: minX - EDGE,
    y: minY - EDGE,
    w: Math.max(...nodes.map((n) => n.x + n.width)) - minX + EDGE * 2,
    h: Math.max(...nodes.map((n) => n.y + n.height)) - minY + EDGE * 2,
  };

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const drawn = edges.map((e) => renderEdge(e, byId, canvasPath));

  // One arrow marker per colour in play; markers do not inherit stroke.
  const markers = [...new Set(drawn.map((e) => e.stroke))]
    .map(
      (c) =>
        `<marker id="canvas-arrow-${c.replace('#', '')}" viewBox="0 0 10 10" refX="9" refY="5" ` +
        `markerWidth="6" markerHeight="6" orient="auto-start-reverse">` +
        `<path d="M 0 1 L 9 5 L 0 9 z" fill="${c}" fill-opacity="0.75"/></marker>`,
    )
    .join('\n    ');

  // The dot grid Obsidian draws behind a canvas. Faint on purpose: it should
  // read as the surface the artifact was made on, not as a texture. This is the
  // one piece of chrome the house rules would normally strip — it stays because
  // the canvas is quoted as is, and the grid is part of what it is.
  const grid =
    `<pattern id="canvas-grid" width="20" height="20" patternUnits="userSpaceOnUse">` +
    `<circle cx="1" cy="1" r="1" fill="${COLOR.ink}" fill-opacity="0.07"/></pattern>`;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}" role="img" focusable="false">`,
    `  <defs>\n    ${grid}\n    ${markers}\n  </defs>`,
    `  <rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="${COLOR.panel}"/>`,
    `  <rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="url(#canvas-grid)"/>`,
    ...groups.map((n) => `  <g>\n    ${renderGroup(n)}\n  </g>`),
    ...drawn.map((e) => `  <g>\n    ${e.path}${e.label ? `\n    ${e.label}` : ''}\n  </g>`),
    ...cards.map((n) => `  <g>\n    ${renderCard(n)}\n  </g>`),
    `</svg>`,
  ].join('\n');
}

/**
 * Find the canvas on disk.
 *
 * Obsidian resolves an embed vault-wide by filename; the build only has the
 * cloned content/ tree, so resolution is deliberately narrow — a canvas lives in
 * its post's assets/ or beside the note, and anything else fails by name.
 */
function readCanvas(name, mdPath) {
  const base = dirname(mdPath);
  const tried = [resolve(base, 'assets', name), resolve(base, name)];
  for (const path of tried) {
    try {
      return { raw: readFileSync(path, 'utf8'), path };
    } catch {
      /* try the next one */
    }
  }
  throw new Error(
    `[remark-canvas] Cannot find "${name}" embedded by ${mdPath}\n` +
      tried.map((p) => `  Looked for: ${p}`).join('\n') +
      `\n  A canvas must live in the post's assets/ folder — the build only has content/.`,
  );
}

function toFigure(name, alt, mdPath) {
  const { raw, path } = readCanvas(name, mdPath);
  const svg = renderCanvas(raw, path);
  // Alt DESCRIBES for someone who cannot see it; absent, the figure is
  // decorative. Same rule as the SVG specimen tiles (CLAUDE.md §4).
  const label = alt ? ` aria-label="${escapeAttr(alt)}"` : ' aria-hidden="true"';
  return { type: 'html', value: `<figure class="specimen-fig canvas-fig"${label}>${svg}</figure>` };
}

/**
 * A paragraph holding nothing but one embed. `![[…]]` is not markdown, so it
 * arrives as a plain text node — the same way every other wikilink passes
 * through today. Requiring the WHOLE paragraph to be the embed means prose that
 * merely mentions a canvas is never swallowed.
 */
function loneEmbed(node) {
  if (node?.type !== 'paragraph' || node.children?.length !== 1) return null;
  const child = node.children[0];
  if (child.type !== 'text') return null;
  const m = EMBED_RE.exec(child.value.trim());
  return m ? { name: m[1].trim(), alt: m[2]?.trim() ?? '' } : null;
}

function transform(node, mdPath) {
  if (!node || !Array.isArray(node.children)) return;
  node.children = node.children.map((child) => {
    const embed = loneEmbed(child);
    if (embed) return toFigure(embed.name, embed.alt, mdPath);
    transform(child, mdPath);
    return child;
  });
}

export default function remarkCanvas() {
  return (tree, file) => {
    const mdPath = file?.history?.[0] ?? file?.path;
    if (!mdPath) return;
    transform(tree, mdPath);
  };
}
