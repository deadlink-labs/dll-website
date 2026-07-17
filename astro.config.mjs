// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deadlink Labs — deadlinklabs.com
// A content archive, not an app. Astro ships zero JavaScript by default;
// components hydrate only when explicitly marked as islands.
// See CLAUDE.md §4 for the full stack rationale.
export default defineConfig({
  site: 'https://deadlinklabs.com',

  // Tailwind v4 is wired through the Vite plugin (no @astrojs/tailwind).
  vite: {
    plugins: [tailwindcss()],
  },

  // Prose-first output. No experimental client hydration by default.
  build: {
    format: 'directory',
  },
});
