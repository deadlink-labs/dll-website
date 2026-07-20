// remark-terminal — the first fenced-block component (CLAUDE.md §3.6).
//
// A ```terminal code fence in a post becomes the dark "specimen" panel on the
// built site, while staying an ordinary, readable code block in Obsidian. The
// block's lines ARE the content:
//
//     ```terminal
//     $ npm run dev
//     astro  v5.18.2  ready in 415 ms
//     ┃ Local   http://localhost:4321/
//     watching for file changes...
//     ```
//
// Rendering rules (kept deliberately simple and predictable):
//   - lines starting with `$` or `#` render dim (prompts / comments)
//   - http(s) URLs render in signal orange (the one live accent)
//   - everything else is plain panel text
// The emitted markup reuses the shared `.specimen` classes (src/styles/global.css).

const URL_RE = /(https?:\/\/[^\s<]+)/g;

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderLine(raw) {
  const escaped = escapeHtml(raw);
  const trimmed = raw.trimStart();
  // Prompt / comment lines are dimmed whole; no orange inside them.
  if (trimmed.startsWith('$') || trimmed.startsWith('#')) {
    return `<span class="specimen__dim">${escaped}</span>`;
  }
  // Otherwise, light up any URL.
  return escaped.replace(URL_RE, '<span class="specimen__on">$1</span>');
}

function renderTerminal(value) {
  const body = value
    .replace(/\n+$/, '') // drop trailing blank lines
    .split('\n')
    .map(renderLine)
    .join('\n');
  return `<pre class="specimen" aria-label="Terminal capture"><code>${body}</code></pre>`;
}

function transform(node) {
  if (!node || !Array.isArray(node.children)) return;
  node.children = node.children.map((child) => {
    if (child.type === 'code' && child.lang === 'terminal') {
      return { type: 'html', value: renderTerminal(child.value ?? '') };
    }
    transform(child);
    return child;
  });
}

export default function remarkTerminal() {
  return (tree) => transform(tree);
}
