// generate-favicon — write public/favicon.svg and the favicon PNG set from the
// Deadlink Labs alien.
//
//   npm run favicon
//
// The alien is the mark from my_assets/logos/ ("Deadlink Labs - Site-selection.png").
// The source art is a glitched raster with no vector original: the figure is
// fractured into thin displaced slivers with chromatic-orange edges. It was
// quantized to its own underlying pixel grid, the glitch fragments dropped and
// the symmetry restored. ALIEN below is that reconstruction, unsimplified —
// the three-step head taper, the shoulder band above the eyes and the 3-wide
// legs are all structure the source actually has, so none of it may be
// collapsed to make a size or a grid work out.
//
// The sizing problem this file solves: a favicon is rasterized at 32px (16 CSS
// px on a retina tab), and pixel art only stays sharp when its cells land on
// whole pixels. Twenty columns filling the badge works out to 1.5px per cell,
// and rendered plainly that smears the figure into grey striping. So the raster
// geometry is *snapped*: cell edges are rounded to whole pixels, giving
// alternating 1px and 2px cells that are individually crisp. snapEdges mirrors
// the first half of the widths onto the second so snapping cannot break the
// figure's left-right symmetry, which naive rounding does.
//
// Verified: at 32px the only left-right differences are the deliberate orange
// eye and sub-visible antialiasing on the circle rim.
//
// Snapping is tied to the 32-unit grid, so it is only correct where a unit is a
// whole pixel. The apple-touch-icon is rendered at 180px and therefore uses
// exact uniform cells instead — at that size there is nothing to hint, and
// snapped cells would scale into visibly uneven 5.6px/11.25px blocks. It is
// also a full-bleed ink square (iOS applies its own rounded-corner mask, so a
// drawn circle reads as a target inside a target) with the alien inset clear of
// that mask.

import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const INK = '#191714';
const PAPER = '#F7F5F1';
const SIGNAL = '#F04A00';

const CANVAS = 32; // design units; one unit is one pixel at favicon size
const BADGE_SPAN = 30; // circle badges: the alien spans 30 of 32 units, near the rim
const SQUARE_SPAN = 22; // apple-touch: inset for the iOS corner mask

// Inclusive [startCol, endCol] runs per row, top to bottom. The eyes are the
// gaps in the run lists — the ink background reads through them.
const ALIEN = {
  cols: 20,
  rows: [
    [[4, 5], [14, 15]], // antennae, outer
    [[4, 5], [14, 15]],
    [[6, 7], [12, 13]], // antennae, angling in
    [[6, 7], [12, 13]],
    [[6, 13]], // head, narrow
    [[4, 15]], // head, wider
    [[2, 17]], // shoulders
    [[2, 5], [8, 11], [14, 17]], // eye row
    [[2, 5], [8, 11], [14, 17]],
    [[0, 19]], // arms, full width
    [[4, 15]], // body
    [[4, 15]],
    [[4, 5], [14, 15]], // arms descending
    [[4, 5], [14, 15]],
    [[6, 8], [11, 13]], // legs
    [[6, 8], [11, 13]],
  ],
  // The one live node (CLAUDE.md §3: exactly one orange element): the left eye,
  // as [col0, col1, row0, row1] inclusive.
  accent: [6, 7, 7, 8],
};

/**
 * Cell boundaries for `n` cells spanning `total` units, centered on the canvas.
 * `snap` rounds every edge to a whole unit and mirrors the first half's widths
 * onto the second, so the figure stays symmetric; without it the cells are exact.
 */
function edges(n, total, snap) {
  const offset = (CANVAS - total) / 2;
  if (!snap) return Array.from({ length: n + 1 }, (_, i) => offset + (i * total) / n);

  const raw = Array.from(
    { length: n },
    (_, i) => Math.round(((i + 1) * total) / n) - Math.round((i * total) / n),
  );
  const half = n >> 1;
  const widths = raw.map((w, i) => (i < half ? w : raw[n - 1 - i]));
  const out = [offset];
  for (const w of widths) out.push(out[out.length - 1] + w);
  return out;
}

/** The alien centered on the canvas, spanning `span` units wide. */
function figure(span, snap) {
  const { cols, rows, accent } = ALIEN;
  const ex = edges(cols, span, snap);
  const ey = edges(rows.length, (span * rows.length) / cols, snap);
  const rect = (c0, c1, r0, r1, fill) =>
    `<rect x="${ex[c0]}" y="${ey[r0]}" width="${ex[c1 + 1] - ex[c0]}" height="${ey[r1 + 1] - ey[r0]}" fill="${fill}"/>`;

  const out = [];
  rows.forEach((ranges, r) => {
    for (const [c0, c1] of ranges) out.push(rect(c0, c1, r, r, PAPER));
  });
  const [ac0, ac1, ar0, ar1] = accent;
  out.push(rect(ac0, ac1, ar0, ar1, SIGNAL));
  return out.join('\n    ');
}

function badge({ background, span, snap }) {
  const bg =
    background === 'circle'
      ? `<circle cx="${CANVAS / 2}" cy="${CANVAS / 2}" r="${CANVAS / 2}" fill="${INK}"/>`
      : `<rect x="0" y="0" width="${CANVAS}" height="${CANVAS}" fill="${INK}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}">
  ${bg}
  <g>
    ${figure(span, snap)}
  </g>
</svg>
`;
}

async function rasterize(svg, size, outPath, { flatten = false } = {}) {
  let pipeline = sharp(Buffer.from(svg), { density: 72 * (size / CANVAS) }).resize(size, size);
  if (flatten) pipeline = pipeline.flatten({ background: INK });
  const { width, height } = await pipeline.png().toFile(outPath);
  console.log(`✓ ${outPath}  ${width}x${height}`);
}

const circle = badge({ background: 'circle', span: BADGE_SPAN, snap: true });
const square = badge({ background: 'square', span: SQUARE_SPAN, snap: false });

writeFileSync('public/favicon.svg', circle);
console.log('✓ public/favicon.svg');

await rasterize(circle, 16, 'public/favicon-16x16.png');
await rasterize(circle, 32, 'public/favicon-32x32.png');
await rasterize(square, 180, 'public/apple-touch-icon.png', { flatten: true });
