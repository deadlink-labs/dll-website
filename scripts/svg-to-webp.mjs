// Rasterize the hand-authored specimen tiles (CLAUDE.md §3 "graphite specimen
// tile") from SVG to WebP, so the conversion is a committed, repeatable step
// instead of an undocumented one-liner.
//
//   npm run tiles                       # every content/**/assets/*.svg
//   npm run tiles -- path/to/assets     # one directory
//   npm run tiles -- path/to/tile.svg   # one file
//
// Tiles are authored at their intrinsic size (1280x720) and written 1:1 — no
// upscale, no density override — which is what every surface expects (16:9).
//
// Fonts: the SVGs ask for IBM Plex Mono. It lives in node_modules only as
// .woff2, which a rasterizer cannot read, so it must be installed system-wide
// (`brew install --cask font-ibm-plex-mono`) or the labels silently fall back to
// the system monospace. Checked below; a miss warns rather than fails.

import { readdir, stat } from 'node:fs/promises';
import { readdirSync } from 'node:fs';
import { join, extname, dirname, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const CONTENT_ROOT = 'content';
const QUALITY = 82;

/** Warn once if the brand mono is missing, since the failure is silent. */
function checkFont() {
  try {
    const fonts = execFileSync('fc-list', [], { encoding: 'utf8' });
    if (!/IBM Plex Mono/i.test(fonts)) throw new Error('not found');
  } catch {
    // fc-list is not on macOS by default; fall back to looking in the font dirs.
    const dirs = [
      `${process.env.HOME}/Library/Fonts`,
      '/Library/Fonts',
      '/System/Library/Fonts',
    ];
    const found = dirs.some((d) => {
      try {
        return readdirSync(d).some((f) => /IBMPlexMono|IBM_Plex_Mono/i.test(f));
      } catch {
        return false;
      }
    });
    if (!found) {
      console.warn(
        '! IBM Plex Mono is not installed system-wide. Labels will rasterize in\n' +
          '  the system monospace fallback, not the brand face.\n' +
          '  Fix: brew install --cask font-ibm-plex-mono\n',
      );
    }
  }
}

/** Every .svg under a directory, recursively. */
async function collect(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collect(path)));
    else if (extname(entry.name).toLowerCase() === '.svg') out.push(path);
  }
  return out;
}

async function resolveTargets(args) {
  if (args.length === 0) return collect(CONTENT_ROOT);
  const targets = [];
  for (const arg of args) {
    const info = await stat(arg);
    if (info.isDirectory()) targets.push(...(await collect(arg)));
    else targets.push(arg);
  }
  return targets;
}

const targets = await resolveTargets(process.argv.slice(2));

if (targets.length === 0) {
  console.log('No .svg tiles found.');
  process.exit(0);
}

checkFont();

for (const src of targets) {
  const out = join(dirname(src), `${basename(src, '.svg')}.webp`);
  // density 72 keeps the raster at the SVG's own width/height attributes.
  const { width, height } = await sharp(src, { density: 72 })
    .webp({ quality: QUALITY })
    .toFile(out);
  console.log(`✓ ${out}  ${width}x${height}`);
}
