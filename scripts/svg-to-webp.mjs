// Rasterize a cover tile from SVG to WebP, so the conversion is a committed,
// repeatable step instead of an undocumented one-liner.
//
//   npm run tiles                       # every content/**/assets/thumb.svg
//   npm run tiles -- path/to/assets     # every .svg in that directory
//   npm run tiles -- path/to/tile.svg   # one file
//
// Only `thumb.svg` (the web-thumb cover) still needs a raster: it feeds the
// homepage feed card, the Shipped-for-clients band, and OG share cards, which
// social platforms will not accept as SVG. In-post specimen tiles are inlined as
// vectors instead (src/plugins/remark-svg-specimen.mjs), so a bare run
// deliberately skips them rather than littering unused .webp files.
//
// Rendered at 2x the authored size (2560x1440 from a 1280x720 tile) so Astro has
// enough pixels to serve a 720px slot on a retina display; it downscales to the
// widths each surface asks for.
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
/** Raster covers are rendered at this multiple of the authored SVG size. */
const SCALE = 2;

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
  // Bare run: only the covers. Everything else is inlined as a vector.
  if (args.length === 0) {
    const all = await collect(CONTENT_ROOT);
    return all.filter((p) => basename(p) === 'thumb.svg');
  }
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
  // density scales the raster relative to the SVG's own width/height attributes:
  // 72 is 1:1, so 72 * SCALE renders at SCALE times the authored size.
  const { width, height } = await sharp(src, { density: 72 * SCALE })
    .webp({ quality: QUALITY })
    .toFile(out);
  console.log(`✓ ${out}  ${width}x${height}`);
}
