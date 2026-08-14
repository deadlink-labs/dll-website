// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkObsidian from './src/plugins/remark-obsidian.mjs';
import remarkMark from './src/plugins/remark-mark.mjs';
import remarkTerminal from './src/plugins/remark-terminal.mjs';
import remarkSvgSpecimen from './src/plugins/remark-svg-specimen.mjs';
import remarkCanvas from './src/plugins/remark-canvas.mjs';
import remarkPhotoFigure from './src/plugins/remark-photo-figure.mjs';

// Deadlink Labs — deadlinklabs.com
// A content archive, not an app. Astro ships zero JavaScript by default;
// components hydrate only when explicitly marked as islands.
// See CLAUDE.md §4 for the full stack rationale.
export default defineConfig({
  site: 'https://deadlinklabs.com',

  // `output` is deliberately NOT set, so it stays Astro's default: 'static'.
  // There is no adapter and no server route: every page here is prerendered
  // HTML. LOG 002 adds the Vercel adapter so the contact form, and only the
  // contact form, gets a server (CLAUDE.md §4).

  // Tailwind v4 is wired through the Vite plugin (no @astrojs/tailwind).
  // Cast: @tailwindcss/vite and Astro resolve slightly different Vite type
  // versions, so the plugin type mismatches at check time; it is valid at runtime.
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },

  // Fenced-block components (CLAUDE.md §3.6): ```terminal -> specimen panel.
  // remarkSvgSpecimen inlines relative .svg tiles so they scale as vectors and
  // inherit the page's IBM Plex Mono; raster images keep the image pipeline.
  // remarkCanvas renders an Obsidian ![[…canvas]] embed as inline SVG.
  markdown: {
    // ORDER IS LOAD-BEARING.
    // remarkObsidian runs before everything: it strips %%comments%%, whose
    // contents are private and may legally hold an unclosed == or a stray
    // bracket that would trip the plugins after it. It also resolves [[links]]
    // and ![[image]] embeds, leaving .canvas embeds for remarkCanvas.
    // remarkMark runs next, while the tree is still pure markdown. It turns
    // ==text== into <mark>, and every specimen tile in content/ opens with a
    // `<!-- ==========` comment banner — so if it ran after remarkSvgSpecimen
    // inlined those tiles as raw HTML, it would chew through the banners.
    // remarkCanvas sits after the inliners for the same reason: it emits raw
    // HTML too, and it must see the ![[…]] embed as the plain text node remark
    // hands through, before anything else has rewritten the paragraph.
    // remarkPhotoFigure runs last: it wraps raster photographs (and their
    // caption) in a <figure>, resolving a portrait photo's real width at build
    // so its caption lines up with it. It skips .svg, which remarkSvgSpecimen
    // has already turned into its own figure.
    remarkPlugins: [
      remarkObsidian,
      remarkMark,
      remarkTerminal,
      remarkSvgSpecimen,
      remarkCanvas,
      remarkPhotoFigure,
    ],
  },

  // Prose-first output. No experimental client hydration by default.
  build: {
    format: 'directory',
  },
});
