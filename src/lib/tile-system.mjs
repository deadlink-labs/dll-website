// tile-system — the specimen-tile design system, as code rather than discipline.
//
// The tiles in content/**/assets/*.svg are hand-authored, but their alignment is
// COMPUTED, not drawn: station positions come from label widths, which is how a
// legend row lands flush on both margins. Every correction those tiles needed was
// arithmetic, not taste. This module holds the constants and the arithmetic so
// neither has to be retyped or re-derived.
//
// Plain ESM on purpose: a node script, an Astro component and a future remark
// plugin can all import it.
//
// Consumers: scripts/generate-cover.mjs. See CLAUDE.md §3 for the written spec.

export const CANVAS = { w: 1280, h: 720 };

/** The rail everything aligns to. Content lives between left and right. */
export const MARGIN = 64;
export const BOX = {
  left: MARGIN,
  right: CANVAS.w - MARGIN, // 1216
  width: CANVAS.w - MARGIN * 2, // 1152
};

/** The only three colours a tile may use (CLAUDE.md §3). */
export const COLOR = {
  panel: '#23201b',
  ink: '#ece8e1',
  signal: '#f04a00',
};

/** Kept verbatim: the raster path needs it on every <text>. The remark plugin
    strips it when inlining, so the page's webfont takes over. */
export const FONT = "'IBM Plex Mono', ui-monospace, 'DejaVu Sans Mono', monospace";

/** Instrument-panel scale. Hero-to-eyebrow is ~5:1 — hierarchy comes from big
    jumps, not gentle steps. */
export const SIZE = {
  eyebrow: 24,
  micro: 22,
  support: 28,
  secondary: 72,
  hero: 120,
};

/** Opacity tiers on the panel. Nothing informational sits below 0.45, which is
    3.79:1 — the 0.32 tier used previously was 2.59:1 and failed every threshold. */
export const OP = {
  hero: 0.95,
  strong: 0.75,
  secondary: 0.72,
  support: 0.55,
  eyebrow: 0.45,
  micro: 0.45,
  fill: 0.3,
  track: 0.14,
  hairline: 0.12,
};

/** Contrast floor for any text, as a fraction. Below this, do not put words. */
export const TEXT_FLOOR = 0.45;

/**
 * Width of a run of monospace text.
 * IBM Plex Mono's advance is 0.6em; letter-spacing adds once per character.
 * This is the function that makes tile alignment computable instead of eyeballed.
 */
export function measure(text, size, letterSpacing = 0) {
  return String(text).length * (size * 0.6 + letterSpacing);
}

/** Left and right edge of a text run, honouring the SVG text-anchor. */
export function span(text, size, letterSpacing, x, anchor = 'start') {
  const w = measure(text, size, letterSpacing);
  if (anchor === 'middle') return [x - w / 2, x + w / 2];
  if (anchor === 'end') return [x - w, x];
  return [x, x + w];
}

/**
 * Throw if a text run would cross the rail, naming the offender.
 *
 * This is the load-bearing piece. It turns "I checked the arithmetic" into "the
 * build checked it", and would have caught three real collisions: a hero wider
 * than its station, a value label landing on a threshold line, and a legend
 * label running past the right margin.
 */
export function assertFits(name, text, size, letterSpacing, x, anchor = 'start') {
  const [l, r] = span(text, size, letterSpacing, x, anchor);
  const slack = 0.5; // rounding
  if (l < BOX.left - slack || r > BOX.right + slack) {
    throw new Error(
      `[tile-system] ${name} does not fit the rail.\n` +
        `  text  : "${text}"\n` +
        `  spans : ${l.toFixed(1)} → ${r.toFixed(1)}\n` +
        `  rail  : ${BOX.left} → ${BOX.right}\n` +
        `  Shorten the text, reduce the size, or move its anchor.`,
    );
  }
  return [l, r];
}

/** Guard the contrast floor for anything carrying words. */
export function assertReadable(name, opacity) {
  if (opacity < TEXT_FLOOR) {
    throw new Error(
      `[tile-system] ${name} sits at ${opacity} opacity, below the ${TEXT_FLOOR} text floor.`,
    );
  }
  return opacity;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** A <text> element carrying the house font stack. */
export function text(content, { x, y, size, ls = 0, op, anchor, weight } = {}) {
  const attrs = [
    `x="${x}"`,
    `y="${y}"`,
    anchor && anchor !== 'start' ? `text-anchor="${anchor}"` : '',
    `font-family="${FONT}"`,
    `font-size="${size}"`,
    weight ? `font-weight="${weight}"` : '',
    ls ? `letter-spacing="${ls}"` : '',
    `fill="${COLOR.ink}"`,
    `fill-opacity="${op}"`,
  ].filter(Boolean);
  return `<text ${attrs.join(' ')}>${esc(content)}</text>`;
}

/** The one orange live node per tile: faint halo plus solid dot. */
export function liveNode(cx, cy, { r = 15, halo = 36 } = {}) {
  return (
    `<circle cx="${cx}" cy="${cy}" r="${halo}" fill="${COLOR.signal}" fill-opacity="0.12"/>\n` +
    `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${COLOR.signal}"/>`
  );
}

/** A settled (non-live) node. */
export function node(cx, cy, r = 11) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${COLOR.panel}" stroke="${COLOR.ink}" stroke-opacity="0.55" stroke-width="2"/>`;
}

/** Panel background plus the inset frame every tile shares. */
export function chassis() {
  return (
    `<rect width="${CANVAS.w}" height="${CANVAS.h}" fill="${COLOR.panel}"/>\n` +
    `  <rect x="0.5" y="0.5" width="${CANVAS.w - 1}" height="${CANVAS.h - 1}" fill="none" stroke="${COLOR.ink}" stroke-opacity="0.10"/>`
  );
}

export function open() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS.w}" height="${CANVAS.h}" viewBox="0 0 ${CANVAS.w} ${CANVAS.h}">`;
}

/**
 * Evenly spaced stations whose OUTER labels land flush on the rail.
 *
 * Centring the first and last label on the margins would push half of each label
 * outside it, so the stations are inset by half a label width. This derivation is
 * what fixed the cover's alignment; it is the part worth never doing by hand.
 */
export function stations(labels, size, ls, { minGap = 24 } = {}) {
  if (labels.length < 2) return [BOX.left + BOX.width / 2];
  const first = BOX.left + measure(labels[0], size, ls) / 2;
  const last = BOX.right - measure(labels[labels.length - 1], size, ls) / 2;
  const step = (last - first) / (labels.length - 1);
  const xs = labels.map((_, i) => +(first + step * i).toFixed(1));

  // Because the outer stations are inset by half a label, they always sit inside
  // the rail — so a rail check can never catch a bad legend. Overlap between
  // neighbours is the real failure mode, and it is checked here.
  for (let i = 0; i < labels.length - 1; i++) {
    const rightEdge = xs[i] + measure(labels[i], size, ls) / 2;
    const leftEdge = xs[i + 1] - measure(labels[i + 1], size, ls) / 2;
    const gap = leftEdge - rightEdge;
    if (gap < minGap) {
      throw new Error(
        `[tile-system] legend labels collide.\n` +
          `  "${labels[i]}" and "${labels[i + 1]}" leave ${gap.toFixed(0)}px between them (minimum ${minGap}).\n` +
          `  Shorten the labels or use fewer stations.`,
      );
    }
  }
  return xs;
}

/**
 * A 3x3 modular client mark from a compact grid string, e.g. "#.#/.##/#.#".
 * Rows separated by "/", "#" filled. Emitted as overlapping rects under a group
 * `opacity` (not per-child `fill-opacity`) so shared edges neither seam nor
 * double-composite. This is how the Crehana mark was derived, by sampling cells.
 */
export function modularMark(grid, { x, y, module: m, op = 0.72 } = {}) {
  const rows = String(grid).split('/');
  const cells = [];
  rows.forEach((row, r) => {
    [...row].forEach((c, col) => {
      if (c === '#') cells.push([col, r]);
    });
  });
  // Merge vertical runs per column so touching cells overlap instead of abut.
  const rects = [];
  const cols = Math.max(...cells.map(([c]) => c)) + 1;
  for (let c = 0; c < cols; c++) {
    const ys = cells.filter(([cc]) => cc === c).map(([, rr]) => rr).sort();
    let runStart = null;
    for (let r = 0; r <= rows.length; r++) {
      const on = ys.includes(r);
      if (on && runStart === null) runStart = r;
      if (!on && runStart !== null) {
        rects.push([c, runStart, 1, r - runStart]);
        runStart = null;
      }
    }
  }
  const body = rects
    .map(([c, r, w, h]) => `<rect x="${x + c * m}" y="${y + r * m}" width="${w * m}" height="${h * m}"/>`)
    .join('\n    ');
  return {
    width: cols * m,
    height: rows.length * m,
    svg: `<g fill="${COLOR.ink}" opacity="${op}">\n    ${body}\n  </g>`,
  };
}
