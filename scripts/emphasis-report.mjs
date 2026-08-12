// emphasis-report — inventory the emphasis ladder across posts (VOICE-POSTS.md §4).
//
//   npm run emphasis                      # every published post
//   npm run emphasis -- <file> [<file>…]  # named files
//
// This is an AUTHORING AID, deliberately not wired into the build.
// src/plugins/remark-mark.mjs already fails the build on the hard caps (one
// highlight per H2, three per post). What that plugin cannot see, and what the
// eye misses, is DISTRIBUTION: three highlights bunched in the first third leave
// the back half of a post bare, and a mark past ~85% sits behind where a skimmer
// stops. So the useful column here is `at%` — how far through the prose each mark
// falls.
//
// PARSE THE WHOLE FILE, NOT LINE BY LINE. Highlights legally span a soft wrap
// (remark-mark's regex is dotall for exactly that reason), so a line-based grep
// undercounts every hard-wrapped post in the archive. An earlier survey did
// precisely that and reported rural-point as having zero.

import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { basename, dirname } from 'node:path';

const MARK = /==(.+?)==/gs;
const BOLD = /\*\*(.+?)\*\*/gs;

/** Per-post highlight cap. The per-H2 cap is remark-mark's job, at build. */
const MAX_PER_POST = 3;

/** A mark this far through the prose is behind where a skimmer stops. */
const LATE = 85;
/** Two marks closer together than this read as one clump. */
const CLUMP = 10;
/** Below this, a file is a stub with nothing to mark. */
const STUB_WORDS = 200;

/** Strip frontmatter and fenced code so `==` inside a terminal fence is ignored. */
function prose(raw) {
  const body = raw.startsWith('---') ? raw.split(/^---$/m).slice(2).join('---') : raw;
  return body.replace(/```[\s\S]*?```/g, '');
}

/**
 * Split prose into blocks: paragraphs, and each list item as its own block.
 * Headings become their own block so a section boundary is visible.
 */
function blocks(text) {
  const out = [];
  for (const para of text.split(/\n\s*\n/)) {
    const t = para.trim();
    if (!t) continue;
    if (/^[-*] /m.test(t)) out.push(...t.split(/\n(?=[-*] )/).map((s) => s.trim()));
    else out.push(t);
  }
  return out;
}

/**
 * Count bold DEVICES, not raw markers (VOICE-POSTS.md §4).
 *
 * A bulleted list whose every item carries a lead-in label is ONE device, and so
 * is a run of paragraphs each opening with a bold lead-in — LOG 012's three
 * architecture paragraphs are exactly that shape. Counting raw `**` pairs instead
 * would report that post as 13 bolds in 9 sections and demand deletions that the
 * rule does not actually ask for.
 *
 * So: a RUN of consecutive blocks that each open with bold counts once, plus any
 * bold that is not a lead-in counts on its own.
 */
function boldDevices(bs) {
  let devices = 0;
  let inRun = false;
  for (const b of bs) {
    const total = [...b.matchAll(BOLD)].length;
    if (!total) {
      inRun = false;
      continue;
    }
    const leadIn = /^(?:[-*] )?\*\*/.test(b);
    if (leadIn) {
      if (!inRun) devices += 1; // the run itself
      inRun = true;
      devices += total - 1; // extra bolds inside a lead-in block still count
    } else {
      inRun = false;
      devices += total;
    }
  }
  return devices;
}

function analyze(file) {
  const text = prose(readFileSync(file, 'utf8'));
  const marks = [...text.matchAll(MARK)].map((m) => ({
    text: m[1].replace(/\s+/g, ' ').trim(),
    at: Math.round((m.index / text.length) * 100),
  }));
  const sections = (text.match(/^## /gm) || []).length;

  // Per-section device counts, so "at most one bold per H2" is checkable.
  const perSection = [];
  for (const chunk of text.split(/^## /m)) {
    perSection.push(boldDevices(blocks(chunk)));
  }

  return {
    file,
    words: text.split(/\s+/).filter(Boolean).length,
    marks,
    bolds: boldDevices(blocks(text)),
    raw: [...text.matchAll(BOLD)].length,
    perSection,
    sections,
  };
}

/** Everything the caps and the distribution rules have to say about one post. */
function warnings(r) {
  const out = [];
  if (r.words < STUB_WORDS) return out; // a stub has nothing to mark
  if (r.marks.length > MAX_PER_POST) out.push(`${r.marks.length} highlights, cap is ${MAX_PER_POST}`);
  if (r.marks.length === 0) out.push('no highlights: a skimmer gets nothing');
  const over = r.perSection.filter((n) => n > 1).length;
  if (over) out.push(`${over} section${over === 1 ? '' : 's'} with more than one bold device`);
  if (r.sections >= 4 && r.bolds === 0) out.push('no bold: nothing structural in a long post');

  const at = r.marks.map((m) => m.at);
  if (at.some((p) => p > LATE)) out.push(`a mark at ${Math.max(...at)}%, past where a skimmer stops`);
  for (let i = 1; i < at.length; i++) {
    if (at[i] - at[i - 1] < CLUMP) out.push(`marks clumped at ${at[i - 1]}% and ${at[i]}%`);
  }
  if (at.length >= 2 && Math.max(...at) < 50) out.push('every mark in the first half');
  return out;
}

const args = process.argv.slice(2);
const files = args.length
  ? args
  : [...globSync('content/log/*/*/*.md'), ...globSync('content/products/*/*.md')].sort();

let flagged = 0;
for (const f of files) {
  const r = analyze(f);
  const slug = basename(dirname(f));
  const at = r.marks.map((m) => `${m.at}%`).join(' ') || '—';
  const stub = r.words < STUB_WORDS ? '  (stub)' : '';
  const bold = r.raw === r.bolds ? `${r.bolds} bold` : `${r.bolds} bold devices (${r.raw} markers)`;
  console.log(
    `\n${slug}${stub}\n` +
      `  ${r.words}w · ${r.sections} sections · ${r.marks.length} highlight${r.marks.length === 1 ? '' : 's'} · ${bold}\n` +
      `  at: ${at}`,
  );
  for (const m of r.marks) console.log(`     ==${m.text.slice(0, 78)}${m.text.length > 78 ? '…' : ''}==`);
  const w = warnings(r);
  if (w.length) {
    flagged++;
    for (const line of w) console.log(`  !  ${line}`);
  }
}

console.log(
  `\n${files.length} file${files.length === 1 ? '' : 's'}, ${flagged} flagged.` +
    `\nCaps are enforced at build by src/plugins/remark-mark.mjs; distribution is not.` +
    `\nThe check no script can run is the skim test: read only the marked lines, in order.\n`,
);
