// YouTube ID parsing — so authors can paste a share link OR a bare ID into the
// web-video frontmatter field and the build resolves it either way. Returns
// undefined for anything unrecognizable; the schema turns that into a build
// error (see src/content.config.ts) so a malformed link never ships silently.

const ID = '[a-zA-Z0-9_-]{11}';

const PATTERNS = [
  new RegExp(`[?&]v=(${ID})`), // watch?v=<id>
  new RegExp(`youtu\\.be/(${ID})`), // youtu.be/<id>
  new RegExp(`embed/(${ID})`), // /embed/<id>
  new RegExp(`shorts/(${ID})`), // /shorts/<id>
  new RegExp(`live/(${ID})`), // /live/<id>
];

export function parseYouTubeId(input: string | undefined): string | undefined {
  if (!input) return undefined;
  const s = input.trim();
  if (new RegExp(`^${ID}$`).test(s)) return s; // already a bare ID
  for (const p of PATTERNS) {
    const m = s.match(p);
    if (m) return m[1];
  }
  return undefined;
}
