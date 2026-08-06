// remark-svg-specimen — inline a local .svg specimen tile into the page.
//
// A relative SVG image reference in a post:
//
//     ![Post-production throughput, roughly doubling.](./assets/dashboard.svg)
//
// becomes an inlined <svg> inside a <figure class="specimen-fig">, instead of an
// <img>. In Obsidian it stays an ordinary image embed and renders as the graphic.
//
// Why inline rather than <img src="…svg">: an SVG loaded through <img> is a
// sandboxed document with no access to the page's fonts, so the tiles would fall
// back to the system monospace and lose IBM Plex Mono. Inlined, the text inherits
// --font-mono from the page like everything else.
//
// Raster images (.webp, .jpg, …) are left alone and keep going through Astro's
// image pipeline. Only relative .svg references are touched — remote URLs and
// absolute paths are ignored.
//
// CACHING CAVEAT — why package.json builds with `astro --force`:
// the .svg files read here are build inputs that Astro does not know about, so
// they are not part of a content entry's digest. Edit a tile without touching
// its .md and Astro 5 replays the cached render from
// `node_modules/.astro/data-store.json` (which survives `rm -rf .astro`), and
// the change silently does not ship. `--force` clears that store every run. The
// site builds in about a second, so the cache buys nothing here and the trap is
// expensive: it looks like the edit worked.

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/** Attributes we strip from the root <svg> so it scales to its container. */
const SIZE_ATTR_RE = /\s(?:width|height)="[^"]*"/g;
/**
 * Graphite tiles carry the house stack on every text node (the raster path needs
 * it); once inlined the page's webfont should own it instead, so we drop it.
 *
 * Matched on the stack's `DejaVu Sans Mono` fallback rather than on
 * `font-family` generally, and that narrowness is the point. An artifact brought
 * in from somewhere else — a client deck, a tool's own canvas — chooses its fonts
 * deliberately, and the n8n canvas in LOG 011 mixes Plex Sans for node titles
 * with Plex Mono for sublabels. Stripping every font-family flattened it to all
 * mono and quietly destroyed the thing worth showing.
 */
const FONT_ATTR_RE = /\sfont-family="[^"]*DejaVu Sans Mono[^"]*"/g;

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function isLocalSvg(url) {
  if (typeof url !== 'string') return false;
  if (!url.toLowerCase().endsWith('.svg')) return false;
  // Leave remote and root-absolute references to the normal pipeline.
  return !/^([a-z]+:)?\/\//i.test(url) && !url.startsWith('/');
}

function inlineSvg(node, mdPath) {
  const svgPath = resolve(dirname(mdPath), node.url);

  let raw;
  try {
    raw = readFileSync(svgPath, 'utf8');
  } catch {
    // Never silently fall through to a broken <img>: a missing specimen is a
    // build failure, named, the same way the content schema fails a bad field.
    throw new Error(
      `[remark-svg-specimen] Cannot read "${node.url}" referenced by ${mdPath}\n` +
        `  Looked for: ${svgPath}`,
    );
  }

  // Keep only the <svg> element itself (drop any XML prolog or comments before it).
  const start = raw.indexOf('<svg');
  if (start === -1) {
    throw new Error(`[remark-svg-specimen] No <svg> root element in ${svgPath}`);
  }
  let svg = raw.slice(start).trimEnd();

  const openEnd = svg.indexOf('>');
  let open = svg.slice(0, openEnd);
  const rest = svg.slice(openEnd);

  if (!/viewBox=/.test(open)) {
    throw new Error(
      `[remark-svg-specimen] ${svgPath} has no viewBox, so it cannot scale. ` +
        `Add one matching its width/height.`,
    );
  }

  // Strip the fixed pixel size; the container decides the rendered size.
  open = open.replace(SIZE_ATTR_RE, '');
  // The tile is one image, not a pile of shapes, for assistive tech.
  open += ' role="img" focusable="false"';

  svg = open + rest.replace(FONT_ATTR_RE, '');

  const alt = escapeAttr(node.alt ?? '');
  const label = alt ? ` aria-label="${alt}"` : ' aria-hidden="true"';

  return {
    type: 'html',
    value: `<figure class="specimen-fig"${label}>${svg}</figure>`,
  };
}

function transform(node, mdPath) {
  if (!node || !Array.isArray(node.children)) return;

  node.children = node.children.flatMap((child) => {
    if (child.type === 'image' && isLocalSvg(child.url)) {
      return inlineSvg(child, mdPath);
    }
    // A lone image sits inside a paragraph; unwrap it so the <figure> is not
    // nested in a <p> (invalid, and the browser would close the <p> early).
    if (
      child.type === 'paragraph' &&
      child.children?.length === 1 &&
      child.children[0].type === 'image' &&
      isLocalSvg(child.children[0].url)
    ) {
      return inlineSvg(child.children[0], mdPath);
    }
    transform(child, mdPath);
    return child;
  });
}

export default function remarkSvgSpecimen() {
  return (tree, file) => {
    const mdPath = file?.history?.[0] ?? file?.path;
    if (!mdPath) return;
    transform(tree, mdPath);
  };
}
