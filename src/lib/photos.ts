import manifest from "@/data/photos.json";
import imageLoader from "@/lib/image-loader";

export type PhotoSlug = keyof typeof manifest;

export type Photo = (typeof manifest)[PhotoSlug] & { slug: PhotoSlug };

export function getPhoto(slug: PhotoSlug): Photo {
  return { slug, ...manifest[slug] };
}

/** Plain URL for places next/image can't reach (video posters, metadata). */
export function photoUrl(slug: PhotoSlug, width: number) {
  return imageLoader({ src: manifest[slug].src, width });
}
