// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import remarkMark from './src/plugins/remark-mark.mjs';
import remarkTerminal from './src/plugins/remark-terminal.mjs';
import remarkSvgSpecimen from './src/plugins/remark-svg-specimen.mjs';
import remarkPhotoFigure from './src/plugins/remark-photo-figure.mjs';

// Deadlink Labs — deadlinklabs.com
// A content archive, not an app. Astro ships zero JavaScript by default;
// components hydrate only when explicitly marked as islands.
// See CLAUDE.md §4 for the full stack rationale.
export default defineConfig({
  site: 'https://deadlinklabs.com',

  // `output` is deliberately NOT set, so it stays Astro's default: 'static'.
  // The adapter is here so a single route can opt out with
  // `export const prerender = false` — that is /api/contact and nothing else.
  // Everything on this site is still prerendered HTML; one serverless function
  // exists so the contact form can hand a message to Resend (CLAUDE.md §4).
  // This is NOT a switch to `output: 'server'`; doing that would make every
  // page on-demand and throw away the whole point of a static archive.
  adapter: vercel(),

  // Server-only secret, read at RUNTIME. Deliberately not `import.meta.env`:
  // non-PUBLIC_ vars there are statically replaced at build time, which bakes
  // the key into the function bundle. `astro:env/server` also validates it, so
  // a missing key fails loudly instead of sending mail as `undefined`.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },

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
    // ORDER IS LOAD-BEARING.
    // remarkMark runs FIRST, while the tree is still pure markdown. It turns
    // ==text== into <mark>, and every specimen tile in content/ opens with a
    // `<!-- ==========` comment banner — so if it ran after remarkSvgSpecimen
    // inlined those tiles as raw HTML, it would chew through the banners.
    // remarkPhotoFigure runs last: it wraps raster photographs (and their
    // caption) in a <figure>, resolving a portrait photo's real width at build
    // so its caption lines up with it. It skips .svg, which remarkSvgSpecimen
    // has already turned into its own figure.
    remarkPlugins: [remarkMark, remarkTerminal, remarkSvgSpecimen, remarkPhotoFigure],
  },

  // Prose-first output. No experimental client hydration by default.
  build: {
    format: 'directory',
  },
});
