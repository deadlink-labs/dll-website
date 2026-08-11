// generate-dns-map — the LOG 002 reference tile.
//
// The question this answers: how do two mail services share one domain without
// fighting? A domain gets exactly one set of MX records and one SPF record per
// name, so "Cloudflare receives and Resend sends" sounds like a collision
// waiting to happen. It is not, and the reason is visible here: they own
// different NAMES. Cloudflare takes the apex, Resend takes `send.` and
// `resend._domainkey`. Nothing overlaps, so nothing has to be merged.
//
// No table rules. CLAUDE.md §3 allows lines only for chart elements, and a rule
// that merely divides is clutter — the grouping is done with headers and air.
//
//   node scripts/generate-dns-map.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { BOX, SIZE, OP, text, liveNode, chassis, open, assertFits } from '../src/lib/tile-system.mjs';

const OUT = 'content/log/2026/contact-form-and-domain-email/assets/dns-map.svg';

const COL_A = BOX.left; // 64
const COL_B = 680;

const HEAD = { size: SIZE.support, op: OP.support, ls: 1.5 };
const NAME = { size: 36, op: OP.strong };
const DETAIL = { size: SIZE.support, op: OP.support };

/**
 * Each group is a service and the DNS names it owns. `live` marks the one
 * record you add by hand and the one people get wrong — see the note in the
 * post about `rua` pointing at a Gmail address, which most reporters refuse.
 */
const GROUPS = [
  {
    x: COL_A,
    y: 230,
    head: 'CLOUDFLARE · RECEIVING',
    rows: [{ name: '@', detail: 'MX · TXT SPF' }],
  },
  {
    x: COL_B,
    y: 230,
    head: 'RESEND · SENDING',
    rows: [
      { name: 'send', detail: 'MX · TXT SPF' },
      { name: 'resend._domainkey', detail: 'TXT DKIM' },
    ],
  },
  {
    x: COL_A,
    y: 470,
    head: 'POLICY · BOTH',
    rows: [{ name: '_dmarc', detail: 'TXT · start at p=none', live: true }],
  },
];

const ROW_GAP = 130; // between rows inside a group
const NAME_DROP = 90; // header baseline to first name baseline
const DETAIL_DROP = 44; // name baseline to its detail baseline
const DOT_X = COL_A + 14; // the live marker sits left of the name it flags
const DOT_INDENT = 66;

const parts = [chassis()];

parts.push(
  text('ONE DOMAIN, TWO SERVICES, NO COLLISION', {
    x: BOX.left,
    y: 104,
    size: SIZE.eyebrow,
    ls: 2,
    op: OP.eyebrow,
  }),
);

let liveCount = 0;

for (const g of GROUPS) {
  assertFits(`header "${g.head}"`, g.head, HEAD.size, HEAD.ls, g.x);
  parts.push(text(g.head, { x: g.x, y: g.y, size: HEAD.size, ls: HEAD.ls, op: HEAD.op }));

  g.rows.forEach((row, i) => {
    const y = g.y + NAME_DROP + i * ROW_GAP;
    const x = row.live ? g.x + DOT_INDENT : g.x;

    assertFits(`record name "${row.name}"`, row.name, NAME.size, 0, x);
    assertFits(`record detail "${row.detail}"`, row.detail, DETAIL.size, 0, x);

    if (row.live) {
      liveCount += 1;
      parts.push(liveNode(DOT_X, y - 12, { r: 11, halo: 26 }));
    }
    parts.push(text(row.name, { x, y, size: NAME.size, op: row.live ? OP.hero : NAME.op }));
    parts.push(text(row.detail, { x, y: y + DETAIL_DROP, size: DETAIL.size, op: DETAIL.op }));
  });
}

// The hard rule, enforced rather than remembered (CLAUDE.md §3).
if (liveCount !== 1) {
  throw new Error(`[dns-map] a tile gets exactly one orange live node; this one has ${liveCount}.`);
}

const svg = `${open()}
  ${parts.join('\n  ')}
</svg>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, svg);
console.log(`[dns-map] wrote ${OUT}`);
