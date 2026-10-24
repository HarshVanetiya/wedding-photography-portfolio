import photos from "../data/photos.json";

type LoaderProps = { src: string; width: number; quality?: number };

const available: Record<string, number[]> = Object.fromEntries(
  Object.entries(photos).map(([slug, photo]) => [slug, photo.widths]),
);

// Maps a next/image request to the closest pre-built file from `npm run images`.
// To serve images from a CDN later (e.g. Cloudinary), return its resize URL here,
// e.g. `https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,w_${width}/${slug}`.
export default function imageLoader({ src, width }: LoaderProps) {
  const slug = src.replace(/^\/images\//, "");
  const widths = available[slug];
  if (!widths) return src;
  const best = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return `/images/${slug}-${best}.webp`;
}
