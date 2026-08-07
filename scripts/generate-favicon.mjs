// generate-favicon — write public/favicon.svg and the favicon PNG set from the
// Deadlink Labs alien.
//
//   npm run favicon
//
// The alien is the mark from my_assets/logos/ ("Deadlink Labs - Site-selection.png").
// The source art is a glitched raster with no vector original: the figure is
// fractured into thin displaced slivers with chromatic-orange edges, which is
// what made earlier favicons read as fuzz at small sizes. The grids below were
// derived from that art — quantized to its underlying pixel grid, the glitch
// fragments dropped, and the figure made symmetric again — so this is the same
// character, de-glitched, not a redrawing.
//
// Two hinted resolutions, which is why the grids are hand-listed rather than
// downscaled from one another: cells must land on whole pixels or the figure
// smears. FULL (20x16) is used wherever a cell is >=1px — the SVG, the 32px
// favicon, the apple-touch-icon. SMALL (10x8) is the same alien at half
// resolution for the 16px favicon, where FULL's cells would fall on half-pixels.
//
// Two backgrounds, same figure: an ink circle (favicons — GitHub's badge logic)
// and a full-bleed ink square (apple-touch-icon, since iOS applies its own
// rounded-corner mask and a drawn circle would read as a target inside a target).

import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const INK = '#191714';
const PAPER = '#F7F5F1';
const SIGNAL = '#F04A00';

// Inclusive [startCol, endCol] runs per row, top to bottom. The eyes are the
// gaps in the run lists — the ink background reads through them.
const FULL = {
  cols: 20,
  rows: [
    [[4, 5], [14, 15]], // antennae, outer
    [[4, 5], [14, 15]],
    [[6, 7], [12, 13]], // antennae, angling in
    [[6, 7], [12, 13]],
    [[6, 13]], // head
    [[4, 15]],
    [[2, 17]], // shoulders
    [[2, 5], [8, 11], [14, 17]], // eye row
    [[2, 5], [8, 11], [14, 17]],
    [[0, 19]], // arms, full width
    [[4, 15]],
    [[4, 15]],
    [[4, 5], [14, 15]], // arms descending
    [[4, 5], [14, 15]],
    [[6, 8], [11, 13]], // legs
    [[6, 8], [11, 13]],
  ],
  // The one live node (CLAUDE.md §3: exactly one orange element): the left eye,
  // as [col, row, wCols, hRows].
  accent: [6, 7, 2, 2],
};

const SMALL = {
  cols: 10,
  rows: [
    [[2, 2], [7, 7]],
    [[3, 3], [6, 6]],
    [[2, 7]],
    [[1, 2], [4, 5], [7, 8]], // eye row
    [[0, 9]],
    [[2, 7]],
    [[2, 2], [7, 7]],
    [[2, 3], [6, 7]], // legs
  ],
  accent: [3, 3, 1, 1],
};

/** One alien, centered on a `canvas`-unit square, at `cell` units per grid cell. */
function figure({ cols, rows, accent }, canvas, cell) {
  const ox = (canvas - cols * cell) / 2;
  const oy = (canvas - rows.length * cell) / 2;
  const rect = (x, y, w, h, fill) =>
    `<rect x="${ox + x * cell}" y="${oy + y * cell}" width="${w * cell}" height="${h * cell}" fill="${fill}"/>`;

  const out = [];
  rows.forEach((ranges, r) => {
    for (const [c0, c1] of ranges) out.push(rect(c0, r, c1 - c0 + 1, 1, PAPER));
  });
  const [ax, ay, aw, ah] = accent;
  out.push(rect(ax, ay, aw, ah, SIGNAL));
  return out.join('\n    ');
}

function badge(grid, { background, canvas = 32, cell = 1 }) {
  const bg =
    background === 'circle'
      ? `<circle cx="${canvas / 2}" cy="${canvas / 2}" r="${canvas / 2 - 1}" fill="${INK}"/>`
      : `<rect x="0" y="0" width="${canvas}" height="${canvas}" fill="${INK}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas} ${canvas}">
  ${bg}
  <g>
    ${figure(grid, canvas, cell)}
  </g>
</svg>
`;
}

async function rasterize(svg, canvas, size, outPath, { flatten = false } = {}) {
  let pipeline = sharp(Buffer.from(svg), { density: 72 * (size / canvas) }).resize(size, size);
  if (flatten) pipeline = pipeline.flatten({ background: INK });
  const { width, height } = await pipeline.png().toFile(outPath);
  console.log(`✓ ${outPath}  ${width}x${height}`);
}

const circle = badge(FULL, { background: 'circle' });
const square = badge(FULL, { background: 'square' });
const circleSmall = badge(SMALL, { background: 'circle', canvas: 16 });

writeFileSync('public/favicon.svg', circle);
console.log('✓ public/favicon.svg');

await rasterize(circleSmall, 16, 16, 'public/favicon-16x16.png');
await rasterize(circle, 32, 32, 'public/favicon-32x32.png');
await rasterize(square, 32, 180, 'public/apple-touch-icon.png', { flatten: true });
