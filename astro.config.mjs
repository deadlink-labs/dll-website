// @ts-check
// `envField` is the helper that describes one environment variable for the
// `env.schema` block below (its type, where it may be read, and whether it is
// a secret). It ships with Astro, so it comes from the same import as
// `defineConfig`; nothing extra to install.
import { defineConfig, envField } from 'astro/config';
// The Vercel adapter. An adapter is the piece that teaches Astro how to run
// server code on a specific host. Without one, Astro can only emit static
// HTML; with this one, a route that opts out of prerendering becomes a Vercel
// serverless function. Pinned to ^9.0.5 in package.json: that is the newest
// major built for Astro 5 (v10 needs Astro 6, v11 needs Astro 7). CLAUDE.md §4.
import vercel from '@astrojs/vercel';
// The sitemap integration. After every build it walks the list of pages Astro
// just prerendered and writes them to `sitemap-index.xml` + `sitemap-0.xml`
// in the output folder, one <url> per page, absolute URLs built from `site`
// below. Only real pages go in: draft posts never get a page in the first
// place (getStaticPaths reads getPublishedLog / getPublishedProducts), and
// endpoints like /rss.xml are skipped by the integration itself. Nothing to
// maintain by hand; a new published post is in the sitemap on the next build.
import sitemap from '@astrojs/sitemap';
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
  // `site` is also what the sitemap integration prefixes every URL with, and
  // it is the URL `public/robots.txt` points crawlers at. Keep the two in step.
  site: 'https://deadlinklabs.com',

  // Integrations are the plugin slot. Only the sitemap lives here; Tailwind is
  // wired through Vite below, and Vercel is an adapter, not an integration.
  //
  // The sitemap ships while the site is still `noindex` (BaseLayout.astro's
  // ALLOW_INDEXING). That is deliberate and harmless: a crawler that follows
  // the sitemap still reads the meta tag on each page and stays out. The two
  // are independent switches, and the roadmap's LOG 004 order stands:
  // spam-guard the contact form, THEN flip ALLOW_INDEXING, THEN submit this
  // sitemap in Search Console. Until the flip, Search Console would only
  // report every URL as "submitted URL marked noindex".
  // The terms page is filtered out: it carries its own permanent `noindex`
  // (a legal document has no business competing with the product page in
  // search), and listing a page in the sitemap while telling crawlers to skip
  // it is two instructions that contradict each other. This filter is about
  // that one page, NOT about the site-wide ALLOW_INDEXING switch above.
  integrations: [sitemap({ filter: (page) => !page.includes('/products/yerba/terms') })],

  // `output` is deliberately NOT set, so it stays Astro's default: 'static'.
  // Adding an adapter does NOT change that. Every page is still prerendered
  // HTML at build time; the adapter only makes it POSSIBLE for a single route
  // to opt out with `export const prerender = false` and run on the server.
  // The contact form's action is the one thing that will do so (CLAUDE.md §4).
  // Do not add `output: 'server'`: that would turn every page into a function
  // and throw away the point of a static archive.
  //
  // `vercel()` is called with no options. The defaults are right for this
  // site: Node serverless functions, and Vercel reads `dist/` as it always has.
  adapter: vercel(),

  // Which hosts Astro may trust when a request arrives through a proxy.
  // Vercel sits in front of the serverless function, so the function does
  // not see "www.deadlinklabs.com" directly; it sees Vercel's internal host,
  // plus an `X-Forwarded-Host` header that carries the real one. Since
  // Astro 5.14.2 that header is IGNORED unless the host is listed here, and
  // the ignored header is what broke the contact form: Astro rebuilt the
  // request URL from the internal host, the browser's `Origin` header said
  // "https://www.deadlinklabs.com", the two did not match, and the CSRF check
  // answered every submit with "Cross-site POST form submissions are
  // forbidden". Listing both public hosts lets Astro use the forwarded one,
  // so the URL and the Origin agree and the form is accepted. This does NOT
  // turn the CSRF check off; it only tells Astro who we are.
  security: {
    allowedDomains: [
      { protocol: 'https', hostname: 'www.deadlinklabs.com' },
      { protocol: 'https', hostname: 'deadlinklabs.com' },
    ],
  },

  // Environment variables the site depends on, declared up front so Astro can
  // check them. Anything listed here is available in code through the
  // `astro:env/server` import, typed, and validated when it is read: if the
  // variable is missing on Vercel, the function fails with a clear message
  // instead of silently sending nothing. Never read a secret through
  // `import.meta.env`; Astro replaces those at build time, which would bake
  // the key's VALUE into the JavaScript bundle (CLAUDE.md §4, "Secrets").
  env: {
    // `schema` is the list of variables. One entry per variable, keyed by the
    // exact name it has in Vercel's dashboard and in the local `.env` file.
    schema: {
      // The Resend API key, used by the contact form to send email.
      //   `string`  -> the value is plain text (Astro also offers number,
      //                boolean and enum).
      //   `context: 'server'` -> only server code may read it. Any attempt to
      //                import it from a browser-side script fails the build,
      //                which is the guarantee that keeps the key off the wire.
      //   `access: 'secret'` -> Astro looks it up at RUNTIME on the server,
      //                never inlines it, and never prints it in build logs.
      // No `default` and no `optional`, so a build or a request without this
      // variable set fails loudly rather than shipping a form that cannot send.
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
