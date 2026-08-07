// generate-favicon — write public/favicon.svg and the favicon PNG set from the
// Deadlink Labs alien.
//
//   npm run favicon
//
// The alien is the mark from my_assets/logos/ ("Deadlink Labs - Site-selection.png").
// The source art is a glitched raster with no vector original: the figure is
// fractured into thin displaced slivers with chromatic-orange edges. It was
// quantized to its own underlying pixel grid (20x16), the glitch fragments
// dropped and the symmetry restored, then halved to the 10x8 grid below. So
// this is the same Space Invader, de-glitched — not a redrawing.
//
// Why 10x8 and not the 20x16 it came from: a favicon is rasterized at 32px
// (16 CSS px on a retina tab), and pixel art only stays sharp when its cells
// land on whole pixels. At 20x16 the alien has to use 1.5px cells to fill the
// badge and smears into grey striping; at 10x8 it fills the same width with
// 3px cells and stays crisp. Keep CELL an integer number of pixels at 32px if
// you change the geometry.
//
// Sizing: the circle is full-bleed (r = canvas/2) and the alien spans 30 of 32
// units — it nearly touches the rim, which is what makes a favicon read at tab
// size. The limit is the farthest filled cell corner (5.10 cells from centre,
// so 5.10 * 3 = 15.3 < 16), not the bounding box, whose corners are empty.
//
// The apple-touch-icon is the exception: full-bleed ink square (iOS applies its
// own rounded-corner mask, so a drawn circle reads as a target inside a target)
// with the alien inset to SQUARE_CELL, keeping it clear of that corner mask.

import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const INK = '#191714';
const PAPER = '#F7F5F1';
const SIGNAL = '#F04A00';

const CANVAS = 32; // design units; every size below is a scale of this
const CELL = 3; // circle badges: alien spans 10 * 3 = 30 of 32 units
const SQUARE_CELL = 2.2; // apple-touch: inset for the iOS corner mask

// Inclusive [startCol, endCol] runs per row, top to bottom. The eyes are the
// gaps in the run lists — the ink background reads through them.
const ALIEN = {
  cols: 10,
  rows: [
    [[2, 2], [7, 7]], // antennae, outer
    [[3, 3], [6, 6]], // antennae, angling in
    [[2, 7]], // head
    [[1, 2], [4, 5], [7, 8]], // eye row
    [[0, 9]], // arms, full width
    [[2, 7]], // body
    [[2, 2], [7, 7]], // arms descending
    [[2, 3], [6, 7]], // legs
  ],
  // The one live node (CLAUDE.md §3: exactly one orange element): the left eye,
  // as [col, row, wCols, hRows].
  accent: [3, 3, 1, 1],
};

/** The alien centered on the canvas at `cell` units per grid cell. */
function figure(cell) {
  const { cols, rows, accent } = ALIEN;
  const ox = (CANVAS - cols * cell) / 2;
  const oy = (CANVAS - rows.length * cell) / 2;
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

function badge({ background, cell }) {
  const bg =
    background === 'circle'
      ? `<circle cx="${CANVAS / 2}" cy="${CANVAS / 2}" r="${CANVAS / 2}" fill="${INK}"/>`
      : `<rect x="0" y="0" width="${CANVAS}" height="${CANVAS}" fill="${INK}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}">
  ${bg}
  <g>
    ${figure(cell)}
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

const circle = badge({ background: 'circle', cell: CELL });
const square = badge({ background: 'square', cell: SQUARE_CELL });

writeFileSync('public/favicon.svg', circle);
console.log('✓ public/favicon.svg');

await rasterize(circle, 16, 'public/favicon-16x16.png');
await rasterize(circle, 32, 'public/favicon-32x32.png');
await rasterize(square, 180, 'public/apple-touch-icon.png', { flatten: true });
