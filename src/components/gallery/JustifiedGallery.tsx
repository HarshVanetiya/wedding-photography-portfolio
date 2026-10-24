"use client";

import { GalleryTile } from "@/components/gallery/GalleryTile";
import { useLightbox } from "@/components/gallery/useLightbox";
import { getPhoto, type Photo, type PhotoSlug } from "@/lib/photos";

// Target row height per breakpoint (px), matching the --row-h values below.
const ROW_HEIGHTS: [minWidth: number, rowHeight: number][] = [
  [1536, 368],
  [1024, 304],
  [768, 240],
  [640, 192],
  [0, 144],
];

/** Rows stretch up to ~1.5× their target height to fill the line. */
function tileSizes(photo: Photo) {
  const ratio = photo.width / photo.height;
  return ROW_HEIGHTS.map(([minWidth, rowHeight]) => {
    const width = `${Math.round(ratio * rowHeight * 1.5)}px`;
    return minWidth ? `(min-width: ${minWidth}px) ${width}` : width;
  }).join(", ");
}

type JustifiedGalleryProps = {
  slugs: PhotoSlug[];
  label: string;
  /** Closing tile: fills whatever space the last row leaves, so no photo sits stranded. */
  footer: React.ReactNode;
};

/**
 * Justified layout: every row shares one height and each photo keeps its true
 * aspect ratio. Pure CSS (flex-grow by aspect ratio), so reading order stays
 * left-to-right and nothing shifts on load.
 */
export function JustifiedGallery({ slugs, label, footer }: JustifiedGalleryProps) {
  const photos = slugs.map(getPhoto);
  const { listRef, open, lightbox } = useLightbox<HTMLUListElement>(photos, tileSizes);

  return (
    <>
      <ul
        ref={listRef}
        aria-label={label}
        className="flex flex-wrap gap-1 [--row-h:144px] sm:[--row-h:192px] md:[--row-h:240px] lg:[--row-h:304px] 2xl:[--row-h:368px]"
      >
        {photos.map((photo, i) => {
          const ratio = photo.width / photo.height;
          return (
            <li key={photo.slug} className="min-w-0" style={{ flexGrow: ratio, flexBasis: `calc(var(--row-h) * ${ratio})` }}>
              <GalleryTile photo={photo} sizes={tileSizes(photo)} delay={(i % 4) * 0.08} onOpen={(tile) => open(i, tile)} />
            </li>
          );
        })}
        <li className="flex min-h-(--row-h) min-w-0" style={{ flexGrow: 999999, flexBasis: "calc(var(--row-h) * 1.4)" }}>
          {footer}
        </li>
      </ul>
      {lightbox}
    </>
  );
}
