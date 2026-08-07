// generate-favicon — write public/favicon.svg from the alien bitmap below, then
// rasterize the favicon set (16/32/apple-touch-icon) from it.
//
//   npm run favicon
//
// The alien is authored as a coarse 10-column bitmap (see ROWS) rather than
// free-form paths, and CELL/OFFSET_X/OFFSET_Y are all even multiples of
// CANVAS/16 — so every cell boundary lands exactly on a pixel boundary at the
// smallest export (16x16), where a stray fractional-pixel edge would
// otherwise antialias into a soft smear. That misalignment (not the shape
// itself) is why the original hand-drawn art turned to mush at 16px; keep
// this alignment invariant if you edit the grid.
//
// Two backgrounds are composited from the same bitmap: an ink circle (favicon
// 16/32 — matches GitHub's badge logic) and a full-bleed ink square
// (apple-touch-icon — iOS applies its own rounded-corner mask, so a second
// drawn circle would look like a target inside a target).

import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const CANVAS = 32;
const CELL = 2; // keep this an even multiple of CANVAS/16 (here: CANVAS/16 = 2) for pixel-grid alignment at 16px
const OFFSET_X = 6; // even, same reason
const OFFSET_Y = 4; // even, same reason
const RADIUS = 15;
const PAD = 0.02; // negligible overlap, just in case of renderer rounding

const INK = '#191714';
const PAPER = '#F7F5F1';
const SIGNAL = '#F04A00';

// 10-column bitmap (cols 0-9, mirrored i <-> 9-i), top to bottom. Each row is
// a list of [startCol, endCol, fill] ranges (inclusive). 'paper' = the alien
// body; 'signal' = the one exaggerated glitch step on the right shoulder.
const ROWS = [
  [[2, 3, 'paper'], [6, 7, 'paper']], // 0  antenna
  [[2, 7, 'paper']], // 1  head top
  [[2, 7, 'paper']], // 2  head top
  [[2, 2, 'paper'], [4, 5, 'paper'], [7, 7, 'paper']], // 3  eyes (gaps at 3, 6 show the ink background through)
  [[2, 7, 'paper']], // 4  cheek band
  [[2, 7, 'paper']], // 5  body band
  [[3, 6, 'paper']], // 6  taper
  [[1, 6, 'paper'], [7, 9, 'signal']], // 7  shoulders + glitch step
  [[1, 6, 'paper'], [7, 9, 'signal']], // 8  shoulders + glitch step
  [[1, 6, 'paper'], [7, 9, 'signal']], // 9  shoulders + glitch step
  [[2, 2, 'paper'], [4, 5, 'paper'], [7, 7, 'paper']], // 10 legs
  [[2, 2, 'paper'], [4, 5, 'paper'], [7, 7, 'paper']], // 11 legs
];

/** Collapse consecutive rows with identical ranges into one taller rect each, so there's no row-to-row seam for a renderer to antialias. */
function mergedRowGroups(rows) {
  const groups = [];
  rows.forEach((ranges, i) => {
    const key = JSON.stringify(ranges);
    const last = groups.at(-1);
    if (last && last.key === key) last.rowEnd = i;
    else groups.push({ key, ranges, rowStart: i, rowEnd: i });
  });
  return groups;
}

function alienRects() {
  const rects = [];
  for (const { ranges, rowStart, rowEnd } of mergedRowGroups(ROWS)) {
    const y = OFFSET_Y + rowStart * CELL - PAD;
    const h = (rowEnd - rowStart + 1) * CELL + PAD * 2;
    for (const [c0, c1, kind] of ranges) {
      const x = OFFSET_X + c0 * CELL - PAD;
      const w = (c1 - c0 + 1) * CELL + PAD * 2;
      const fill = kind === 'signal' ? SIGNAL : PAPER;
      rects.push(
        `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" fill="${fill}"/>`,
      );
    }
  }
  return rects.join('\n    ');
}

function badgeSvg({ background }) {
  const bg =
    background === 'circle'
      ? `<circle cx="${CANVAS / 2}" cy="${CANVAS / 2}" r="${RADIUS}" fill="${INK}"/>`
      : `<rect x="0" y="0" width="${CANVAS}" height="${CANVAS}" fill="${INK}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}">
  ${bg}
  <g>
    ${alienRects()}
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

const circleSvg = badgeSvg({ background: 'circle' });
const squareSvg = badgeSvg({ background: 'square' });

writeFileSync('public/favicon.svg', circleSvg);
console.log('✓ public/favicon.svg');

await rasterize(circleSvg, 16, 'public/favicon-16x16.png');
await rasterize(circleSvg, 32, 'public/favicon-32x32.png');
await rasterize(squareSvg, 180, 'public/apple-touch-icon.png', { flatten: true });
