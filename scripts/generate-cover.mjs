// generate-cover — write a post's cover tile (thumb.svg) from the design system.
//
// The cover is the one tile that provably repeats: every post has exactly one,
// same four zones, only the words change. Everything else stays hand-authored
// against the spec in CLAUDE.md §3.
//
//   npm run cover -- \
//     --out content/log/2026/<slug>/assets/thumb.svg \
//     --stamp "SHIPPED · CASE STUDY" \
//     --title "CREHANA" \
//     --subtitle "CONTENT OPERATION → SYSTEM" \
//     --steps "SPREADSHEETS,DASHBOARDS,ONE BOARD,AUTOMATED" \
//     --mark "#.#/.##/#.#"
//
// Then `npm run tiles -- <that path>` rasterizes it to .webp at 2x, which is what
// web-thumb points at. Covers must stay files on disk: the homepage card, the
// clients band and OG cards all need a raster, and Astro's image() validates the
// path. That is why a cover is not a fenced block.
//
// --steps is optional. Without it the graphic zone is left as a marked slot for a
// bespoke drawing (LOG 001's network mark, for instance).

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import {
  BOX, SIZE, OP, open, chassis, text, node, liveNode,
  stations, modularMark, measure, assertFits,
} from '../src/lib/tile-system.mjs';

// --- the settled four zones (CLAUDE.md §3) --------------------------------
const ZONE = {
  stamp: 100,
  markTop: 152,
  markModule: 26,
  wordmark: 222,
  subtitle: 272,
  stepBottom: 570, // lowest station; each one above is 60px higher
  stepRise: 60,
  legend: 660,
};
const TYPE = {
  stamp: { size: 28, ls: 4, op: 0.5 },
  wordmark: { size: 86, ls: 8, op: 0.9, weight: 600 },
  subtitle: { size: 30, ls: 4, op: OP.support },
  legend: { size: 30, ls: 2, op: OP.eyebrow, last: 0.6 },
};

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
    out[key] = val;
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
for (const required of ['out', 'stamp', 'title']) {
  if (!args[required]) {
    console.error(`Missing --${required}\n\nSee the header of scripts/generate-cover.mjs for usage.`);
    process.exit(1);
  }
}

// A cover must not carry its record number. The feed row, the clients band and
// the record stamp all print it beside the image, and baking it into a raster
// freezes it: renumber the record and the artwork is wrong everywhere it has
// already been cached. Status and kind only. (CLAUDE.md §3 Imagery.)
const recordNumber = args.stamp.match(/\b(LOG|EXP|DEC)\s*0*\d+\b/i);
if (recordNumber) {
  console.error(
    `[generate-cover] --stamp contains a record number: "${recordNumber[0]}"\n` +
      `  The feed already prints it next to the cover, and a number baked into\n` +
      `  the image is wrong the day the record is renumbered.\n` +
      `  Use status and kind only, e.g. "SHIPPED · CASE STUDY".`,
  );
  process.exit(1);
}

const parts = [];

// Zone 1 · stamp
assertFits('stamp', args.stamp, TYPE.stamp.size, TYPE.stamp.ls, BOX.left);
parts.push(text(args.stamp, { x: BOX.left, y: ZONE.stamp, ...TYPE.stamp }));

// Zone 2 · title block. An optional modular client mark shifts the wordmark.
let lockupX = BOX.left;
if (args.mark) {
  const mark = modularMark(args.mark, {
    x: BOX.left, y: ZONE.markTop, module: ZONE.markModule,
  });
  parts.push(mark.svg);
  lockupX = BOX.left + mark.width + 36;
}
assertFits('title', args.title, TYPE.wordmark.size, TYPE.wordmark.ls, lockupX);
parts.push(text(args.title, { x: lockupX, y: ZONE.wordmark, ...TYPE.wordmark }));
if (args.subtitle) {
  assertFits('subtitle', args.subtitle, TYPE.subtitle.size, TYPE.subtitle.ls, lockupX);
  parts.push(text(args.subtitle, { x: lockupX, y: ZONE.subtitle, ...TYPE.subtitle }));
}

// Zone 3 + 4 · the growth staircase and its legend.
if (args.steps) {
  const labels = args.steps.split(',').map((s) => s.trim()).filter(Boolean);
  const xs = stations(labels, TYPE.legend.size, TYPE.legend.ls);
  labels.forEach((l, i) =>
    assertFits(`legend label ${i + 1}`, l, TYPE.legend.size, TYPE.legend.ls, xs[i], 'middle'),
  );

  // Climb 60px per station, joined by 45° risers — the network mark's angle family.
  // Climbs left to right: the first station sits lowest, the live node highest.
  const ys = labels.map((_, i) => ZONE.stepBottom - i * ZONE.stepRise);
  let d = `M${xs[0]},${ys[0]}`;
  for (let i = 1; i < xs.length; i++) {
    d += ` L${xs[i] - ZONE.stepRise},${ys[i - 1]} L${xs[i]},${ys[i]}`;
  }
  parts.push(
    `<path d="${d}" fill="none" stroke="#ece8e1" stroke-opacity="0.4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  );
  xs.slice(0, -1).forEach((x, i) => parts.push(node(x, ys[i])));
  parts.push(liveNode(xs[xs.length - 1], ys[ys.length - 1]));

  parts.push(
    labels
      .map((l, i) =>
        text(l, {
          x: xs[i], y: ZONE.legend, size: TYPE.legend.size, ls: TYPE.legend.ls,
          op: i === labels.length - 1 ? TYPE.legend.last : TYPE.legend.op,
          anchor: 'middle',
        }),
      )
      .join('\n  '),
  );
} else {
  parts.push(`<!-- Zone 3 · graphic slot, y 320-590, x ${BOX.left}-${BOX.right}. -->`);
}

const svg = `${open()}
  ${chassis()}

  <!-- Generated by scripts/generate-cover.mjs. Four zones on the 64px rail:
       stamp ${ZONE.stamp} · wordmark ${ZONE.wordmark} · subtitle ${ZONE.subtitle} · legend ${ZONE.legend}.
       Safe to hand-edit; re-running the generator overwrites it. -->
  ${parts.join('\n\n  ')}
</svg>
`;

mkdirSync(dirname(args.out), { recursive: true });
writeFileSync(args.out, svg);
console.log(`✓ ${args.out}`);
if (args.steps) {
  const labels = args.steps.split(',').map((s) => s.trim()).filter(Boolean);
  console.log(`  stations ${stations(labels, TYPE.legend.size, TYPE.legend.ls).join(' / ')}`);
}
console.log(`  next: npm run tiles -- ${args.out}`);
