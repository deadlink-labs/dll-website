// generate-two-pipes — the LOG 002 specimen tile.
//
// Two pipes converging on one inbox. Sending: the About form posts to the
// site's one server route, which hands the message to Resend. Receiving:
// anyone emails hello@ directly. Both arrive at the same address, because the
// endpoint sends TO hello@ rather than to a personal inbox — that convergence
// is the point of the diagram and the reason the tile has exactly one orange
// node (CLAUDE.md §3: one live node per tile, and here it is also the payoff).
//
// Station positions are COMPUTED, not typed. Every label is run through
// assertFits, so a rename that would cross the rail fails here rather than
// shipping crooked. Do not nudge these numbers in a visual editor.
//
// Groups carry `class="step step--N"`. They are inert in the post — no CSS in
// the site targets them — and exist so the video harness can reveal the
// diagram one beat at a time. The tile itself ships static, deliberately: the
// marching-dash treatment its LOG 012 siblings use is ambient texture, while a
// sequential reveal is a performance, and §3 keeps performances out from under
// prose someone is reading.
//
//   node scripts/generate-two-pipes.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { CANVAS, BOX, COLOR, SIZE, OP, text, node, liveNode, chassis, open, assertFits } from '../src/lib/tile-system.mjs';

const OUT = 'content/log/2026/contact-form-and-domain-email/assets/two-pipes.svg';

// The video harness. Written into my_assets/video-scripts/, which .gitignore
// excludes, so it never ships and never reaches the build. It is generated from
// the same run that writes the tile, which is the only way the two cannot drift.
const HARNESS = 'my_assets/video-scripts/two-pipes-reveal.html';

// --- geometry -------------------------------------------------------------
// Three angle families only: horizontal, vertical, 45° (CLAUDE.md §3).
const ROW1_Y = 312; // sending
const TAIL_Y = 442; // the shared tail, centred between the rows
const ROW2_Y = 572; // receiving
// Baseline offset from a node's centre. Set by the LIVE node, not the settled
// ones: its halo is the widest thing on the tile, and every label shares one
// baseline, so the halo's radius is what decides where that baseline can sit.
const R = 16; // settled node radius
const LIVE = { r: 18, halo: 44 };
const LABEL_DROP = LIVE.halo + 28;

const LABEL = { size: SIZE.support, op: OP.strong };
const ROW = { size: SIZE.support, op: OP.support, ls: 2 };

/** Sending pipe, left to right. */
const SENDING = [
  { x: 140, label: 'FORM' },
  { x: 340, label: 'ENDPOINT' },
  { x: 540, label: 'RESEND' },
];
/** Receiving pipe. One hop, because receiving genuinely is one hop. */
const RECEIVING = [{ x: 140, label: 'ANYONE' }];
/**
 * The shared tail. CLOUDFLARE is a node rather than a caption on the arrow: it
 * is half of what this episode builds, and the micro tier renders at roughly
 * 5px on a phone, which is where load-bearing labels go to die (CLAUDE.md §3).
 */
const TAIL = [
  { x: 800, label: 'HELLO@' },
  { x: 975, label: 'CLOUDFLARE' },
  { x: 1145, label: 'INBOX', live: true },
];

// The merge is a 45° elbow, so its horizontal run is fixed by the vertical drop
// — derived, not chosen. Both rows sit the same distance from the tail, which
// is what makes the two diagonals mirror each other.
const DROP = TAIL_Y - ROW1_Y;
if (ROW2_Y - TAIL_Y !== DROP) {
  throw new Error(`[two-pipes] rows are not symmetric about the tail; the 45° elbows would not mirror.`);
}
const MERGE_END_X = TAIL[0].x - R - 14;
const ELBOW_X = MERGE_END_X - DROP;
// The elbow has to start clear of the last sending node, or the diagonal begins
// inside it and the horizontal run disappears.
const lastSending = SENDING[SENDING.length - 1];
if (ELBOW_X - (lastSending.x + R + 10) < 40) {
  throw new Error(
    `[two-pipes] the 45° elbow starts ${(ELBOW_X - lastSending.x - R - 10).toFixed(0)}px after "${lastSending.label}".\n` +
      `  Move the tail right or the sending row left.`,
  );
}

// --- guards ---------------------------------------------------------------
for (const s of [...SENDING, ...RECEIVING, ...TAIL]) {
  assertFits(`station "${s.label}"`, s.label, LABEL.size, 0, s.x, 'middle');
}
assertFits('row label SENDING', 'SENDING', ROW.size, ROW.ls, BOX.left);
assertFits('row label RECEIVING', 'RECEIVING', ROW.size, ROW.ls, BOX.left);

// Neighbouring station labels must not touch. stations() does this for evenly
// spaced legends; these rows are hand-placed, so the check is repeated here.
for (const row of [SENDING, TAIL]) {
  for (let i = 0; i < row.length - 1; i++) {
    const a = row[i];
    const b = row[i + 1];
    const gap =
      b.x - (b.label.length * LABEL.size * 0.6) / 2 - (a.x + (a.label.length * LABEL.size * 0.6) / 2);
    if (gap < 40) {
      throw new Error(`[two-pipes] "${a.label}" and "${b.label}" leave only ${gap.toFixed(0)}px. Shorten one.`);
    }
  }
}

// --- drawing helpers ------------------------------------------------------
const stroke = (d, { op = 0.5 } = {}) =>
  `<path d="${d}" fill="none" stroke="${COLOR.ink}" stroke-opacity="${op}" stroke-width="2.5" marker-end="url(#tip)"/>`;

/** Radius a connector has to clear. The live node's halo is wider than its dot. */
const clearance = (s) => (s.live ? LIVE.halo : R);

/** Horizontal run between two stations, clear of both node edges and any halo. */
const between = (a, b, y) => `M ${a.x + clearance(a) + 10} ${y} H ${b.x - clearance(b) - 8}`;

const station = ({ x, label, live }, y) =>
  [
    live ? liveNode(x, y, LIVE) : node(x, y, R),
    text(label, { x, y: y + LABEL_DROP, size: LABEL.size, op: live ? OP.hero : LABEL.op, anchor: 'middle' }),
  ].join('\n    ');

const step = (n, body) => `<g class="step step--${n}">\n    ${body}\n  </g>`;

// --- assembly -------------------------------------------------------------
const parts = [];

parts.push(`<defs>
    <marker id="tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="${COLOR.ink}" stroke-opacity="0.5" stroke-width="1.6"/>
    </marker>
  </defs>`);

parts.push(chassis());

parts.push(
  text('HOW A MESSAGE REACHES ME', {
    x: BOX.left,
    y: 110,
    size: SIZE.eyebrow,
    ls: 2,
    op: OP.eyebrow,
  }),
);

// 1 — the sending pipe opens
parts.push(
  step(1, [
    text('SENDING', { x: BOX.left, y: 232, size: ROW.size, ls: ROW.ls, op: ROW.op }),
    station(SENDING[0], ROW1_Y),
  ].join('\n    ')),
);

// 2, 3 — it advances one hop at a time
parts.push(step(2, [stroke(between(SENDING[0], SENDING[1], ROW1_Y)), station(SENDING[1], ROW1_Y)].join('\n    ')));
parts.push(step(3, [stroke(between(SENDING[1], SENDING[2], ROW1_Y)), station(SENDING[2], ROW1_Y)].join('\n    ')));

// 4 — the receiving pipe, deliberately one hop
parts.push(
  step(4, [
    text('RECEIVING', { x: BOX.left, y: 512, size: ROW.size, ls: ROW.ls, op: ROW.op }),
    station(RECEIVING[0], ROW2_Y),
  ].join('\n    ')),
);

// 5 — both turn 45° and merge on the same address. This is the whole idea:
// the form's message is not delivered to a personal inbox, it is delivered to
// hello@, the same door everything else comes through.
const mergeFromSending = `M ${SENDING[2].x + R + 10} ${ROW1_Y} H ${ELBOW_X} L ${MERGE_END_X} ${TAIL_Y}`;
const mergeFromReceiving = `M ${RECEIVING[0].x + R + 10} ${ROW2_Y} H ${ELBOW_X} L ${MERGE_END_X} ${TAIL_Y}`;
parts.push(step(5, [stroke(mergeFromSending), stroke(mergeFromReceiving), station(TAIL[0], TAIL_Y)].join('\n    ')));

// 6, 7 — routed, and landing in one inbox
parts.push(step(6, [stroke(between(TAIL[0], TAIL[1], TAIL_Y)), station(TAIL[1], TAIL_Y)].join('\n    ')));
parts.push(step(7, [stroke(between(TAIL[1], TAIL[2], TAIL_Y)), station(TAIL[2], TAIL_Y)].join('\n    ')));

const svg = `${open()}
  ${parts.join('\n  ')}
</svg>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, svg);

// --- video harness --------------------------------------------------------
// The tile ships static. This page is the only place the step classes mean
// anything: it reveals them one beat at a time so the sequence can be screen
// recorded and cut between scenes. Local-only, so JS is free here — none of it
// goes anywhere near the site.
const STEPS = parts.filter((p) => p.startsWith('<g class="step')).length;

// Cumulative reveal, enumerated: step n is visible at every state from n
// onward. Built as one flat list and joined once — assembling it per-group and
// joining the groups leaves a trailing comma before the brace, which makes the
// whole selector list invalid and silently reveals nothing at all.
const reveal = [];
for (let n = 1; n <= STEPS; n++) {
  for (let at = n; at <= STEPS; at++) reveal.push(`  body[data-step="${at}"] .step--${n}`);
}

const harness = `<!doctype html>
<meta charset="utf-8">
<title>LOG 002 · two pipes — step reveal</title>
<style>
  :root { color-scheme: dark; }
  html, body { margin: 0; height: 100%; background: ${COLOR.panel}; }
  body { display: grid; place-items: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; }
  svg { width: min(96vw, calc(96vh * ${CANVAS.w} / ${CANVAS.h})); height: auto; display: block; }

  /* Cumulative reveal. Each step fades its own group in; everything before it
     stays on screen, so the diagram builds rather than flickers. */
  .step { opacity: 0; transition: opacity .45s ease; }
${reveal.join(',\n')} { opacity: 1; }

  #hud {
    position: fixed; left: 20px; bottom: 16px;
    font-size: 13px; letter-spacing: .12em; text-transform: uppercase;
    color: ${COLOR.ink}; opacity: .35; user-select: none;
  }
  body.clean #hud { display: none; }
</style>

${svg.trim()}

<div id="hud">step <b id="n">0</b> / ${STEPS} &nbsp;·&nbsp; ← → step &nbsp;·&nbsp; 0 reset &nbsp;·&nbsp; P play &nbsp;·&nbsp; H hide this</div>

<script>
  const MAX = ${STEPS};
  let step = 0, timer = null;
  const hud = document.getElementById('n');
  function set(n) {
    step = Math.max(0, Math.min(MAX, n));
    document.body.dataset.step = step;
    hud.textContent = step;
  }
  function play() {
    clearInterval(timer);
    set(0);
    timer = setInterval(() => { if (step >= MAX) clearInterval(timer); else set(step + 1); }, 900);
  }
  addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); set(step + 1); }
    else if (e.key === 'ArrowLeft') set(step - 1);
    else if (e.key === '0') { clearInterval(timer); set(0); }
    else if (e.key.toLowerCase() === 'p') play();
    else if (e.key.toLowerCase() === 'h') document.body.classList.toggle('clean');
    else if (/^[1-9]$/.test(e.key)) { clearInterval(timer); set(+e.key); }
  });
  set(0);
</script>
`;

mkdirSync(dirname(HARNESS), { recursive: true });
writeFileSync(HARNESS, harness);

console.log(`[two-pipes] wrote ${OUT} (${CANVAS.w}x${CANVAS.h}, ${STEPS} steps)`);
console.log(`[two-pipes] wrote ${HARNESS} — open it in a browser to record the reveal`);
