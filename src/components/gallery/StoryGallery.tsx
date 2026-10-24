"use client";

import { GalleryTile } from "@/components/gallery/GalleryTile";
import { useLightbox } from "@/components/gallery/useLightbox";
import { cn } from "@/lib/cn";
import { getPhoto, type Photo, type PhotoSlug } from "@/lib/photos";

const isPortrait = (photo: Photo) => photo.height > photo.width;

/** Editorial rhythm: consecutive portraits pair up side by side, everything else gets its own row. */
function toRows(photos: Photo[]) {
  const rows: Photo[][] = [];
  for (let i = 0; i < photos.length; i++) {
    const next = photos[i + 1];
    if (isPortrait(photos[i]) && next && isPortrait(next)) {
      rows.push([photos[i], next]);
      i++;
    } else {
      rows.push([photos[i]]);
    }
  }
  return rows;
}

function rowSizes(row: Photo[]) {
  if (row.length === 1) {
    return isPortrait(row[0]) ? "(min-width: 640px) 576px, 100vw" : "(min-width: 1100px) 1024px, 100vw";
  }
  const total = row.reduce((sum, p) => sum + p.width / p.height, 0);
  return row.map((p) => {
    const share = (p.width / p.height) / total;
    return `(min-width: 1100px) ${Math.round(share * 1024)}px, ${Math.round(share * 100)}vw`;
  });
}

export function StoryGallery({ slugs }: { slugs: PhotoSlug[] }) {
  const photos = slugs.map(getPhoto);
  const rows = toRows(photos);
  const sizesBySlug = new Map<string, string>();
  rows.forEach((row) => {
    const sizes = rowSizes(row);
    row.forEach((p, i) => sizesBySlug.set(p.slug, Array.isArray(sizes) ? sizes[i] : sizes));
  });
  const thumbSizes = (photo: Photo) => sizesBySlug.get(photo.slug) ?? "100vw";
  const { listRef, open, lightbox } = useLightbox<HTMLDivElement>(photos, thumbSizes);

  return (
    <>
      <div ref={listRef} className="mx-auto flex max-w-5xl flex-col gap-3 md:gap-6">
        {rows.map((row) => (
          <div key={row[0].slug} className={cn("flex gap-3 md:gap-6", row.length === 1 && isPortrait(row[0]) && "mx-auto w-full max-w-xl")}>
            {row.map((photo) => (
              // Equal-height pairs: each photo's width is proportional to its aspect ratio.
              <div key={photo.slug} className="min-w-0" style={{ flex: `${photo.width / photo.height} 1 0%` }}>
                <GalleryTile
                  photo={photo}
                  sizes={thumbSizes(photo)}
                  onOpen={(tile) => open(photos.indexOf(photo), tile)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {lightbox}
    </>
  );
}
