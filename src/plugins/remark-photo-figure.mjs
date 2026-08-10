// remark-photo-figure — wrap a raster photograph (and its caption) in a real
// <figure>, and give a PORTRAIT photograph an explicit max-width.
//
// Why this exists. A markdown image and the italic paragraph under it are
// SIBLINGS. Left alone they are two independent blocks, each as wide as the
// prose column. That is fine while the image fills the column, and it breaks the
// moment the image does not: a tall photograph capped by max-height renders
// narrower than the column while its caption stays full width, so the caption no
// longer lines up with the picture it belongs to. Sibling elements cannot share a
// computed width in CSS, and `width: fit-content` does not help because a
// height-capped image still reports its full intrinsic width to the sizing pass.
//
// So the width is resolved HERE, at build, where the real pixel dimensions are
// readable. A portrait image gets a figure with max-width = CAP_H * (w / h),
// which is exactly the width that image occupies once its height is capped. The
// caption then inherits the figure's width and the two edges agree.
//
// The image node is deliberately left as an mdast `image` and never converted to
// raw HTML: Astro's image pipeline transforms mdast image nodes, so emitting
// <img> here would skip optimization and break the relative asset path. Only the
// wrapper is raw HTML.
//
// SVG specimen tiles are skipped: remark-svg-specimen already inlines those and
// builds its own <figure class="specimen-fig">.
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

/** Height a portrait photo is capped to, in px. Mirrors the CSS max-height so a
    tall frame cannot push its own caption and the next paragraph off screen. */
const CAP_H = 620;

const isRelative = (url) => url && !/^(https?:)?\/\//.test(url) && !url.startsWith('/');
const isRaster = (url) => /\.(jpe?g|png|webp|avif|gif)$/i.test(url);

const onlyImage = (node) =>
  node?.type === 'paragraph' && node.children?.length === 1 && node.children[0].type === 'image'
    ? node.children[0]
    : null;

const onlyCaption = (node) =>
  node?.type === 'paragraph' && node.children?.length === 1 && node.children[0].type === 'emphasis';

export default function remarkPhotoFigure() {
  return async (tree, file) => {
    const baseDir = file?.history?.[0]
      ? dirname(file.history[0])
      : dirname(fileURLToPath(import.meta.url));

    const kids = tree.children;
    // Walk backwards: each match splices the array underneath us.
    for (let i = kids.length - 1; i >= 0; i--) {
      const img = onlyImage(kids[i]);
      if (!img || !isRelative(img.url) || !isRaster(img.url)) continue;

      let style = '';
      try {
        const { width, height } = await sharp(resolve(baseDir, img.url)).metadata();
        if (width && height && height > width) {
          style = ` style="max-width:${Math.round(CAP_H * (width / height))}px"`;
        }
      } catch {
        // Unreadable file: fall through to a plain full-width figure rather than
        // failing the build. Astro's own image resolver reports the real error
        // for a genuinely missing asset, and it names the file when it does.
      }

      const hasCaption = onlyCaption(kids[i + 1]);
      kids.splice(
        i,
        hasCaption ? 2 : 1,
        { type: 'html', value: `<figure class="photo-fig"${style}>` },
        kids[i],
        ...(hasCaption ? [kids[i + 1]] : []),
        { type: 'html', value: '</figure>' },
      );
    }
  };
}
