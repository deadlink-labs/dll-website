// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkTerminal from './src/plugins/remark-terminal.mjs';
import remarkSvgSpecimen from './src/plugins/remark-svg-specimen.mjs';
import remarkPhotoFigure from './src/plugins/remark-photo-figure.mjs';

// Deadlink Labs — deadlinklabs.com
// A content archive, not an app. Astro ships zero JavaScript by default;
// components hydrate only when explicitly marked as islands.
// See CLAUDE.md §4 for the full stack rationale.
export default defineConfig({
  site: 'https://deadlinklabs.com',

  // Tailwind v4 is wired through the Vite plugin (no @astrojs/tailwind).
  // Cast: @tailwindcss/vite and Astro resolve slightly different Vite type
  // versions, so the plugin type mismatches at check time; it is valid at runtime.
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },

  // Fenced-block components (CLAUDE.md §3.6): ```terminal -> specimen panel.
  // remarkSvgSpecimen inlines relative .svg tiles so they scale as vectors and
  // inherit the page's IBM Plex Mono; raster images keep the image pipeline.
  markdown: {
    // remarkPhotoFigure runs last: it wraps raster photographs (and their
    // caption) in a <figure>, resolving a portrait photo's real width at build
    // so its caption lines up with it. It skips .svg, which remarkSvgSpecimen
    // has already turned into its own figure.
    remarkPlugins: [remarkTerminal, remarkSvgSpecimen, remarkPhotoFigure],
  },

  // Prose-first output. No experimental client hydration by default.
  build: {
    format: 'directory',
  },
});
