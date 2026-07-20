// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkTerminal from './src/plugins/remark-terminal.mjs';

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
  markdown: {
    remarkPlugins: [remarkTerminal],
  },

  // Prose-first output. No experimental client hydration by default.
  build: {
    format: 'directory',
  },
});
