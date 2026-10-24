// Builds web-ready images from the originals in attachments/.
//
//   npm run images
//
// For every entry in scripts/photos.mjs this writes:
//   public/images/<slug>-<width>.webp   one file per responsive width
//   src/data/photos.json                size, alt text, widths and blur placeholder
// It also writes the social sharing image (public/og.jpg) and the
// Apple touch icon (src/app/apple-icon.png). Originals are only read, never changed.

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { ogImage, photos } from './photos.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'attachments');
const OUT_DIR = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'src', 'data', 'photos.json');

// Keep in sync with images.imageSizes + images.deviceSizes in next.config.ts.
const WIDTHS = [256, 384, 640, 828, 1080, 1440, 1920, 2560];

async function loadPhoto(photo) {
  // .rotate() applies EXIF orientation before cropping.
  let pipeline = sharp(path.join(SOURCE_DIR, photo.source)).rotate();
  if (photo.crop) pipeline = pipeline.extract(photo.crop);
  const buffer = await pipeline.toBuffer();
  const { width, height } = await sharp(buffer).metadata();
  return { buffer, width, height };
}

async function buildPhoto(photo) {
  const { buffer, width, height } = await loadPhoto(photo);

  // Never upscale: keep the standard widths below the source width, then the source width itself.
  const widths = WIDTHS.filter((w) => w < width);
  if (width <= WIDTHS.at(-1)) widths.push(width);

  await Promise.all(
    widths.map((w) =>
      sharp(buffer)
        .resize({ width: w })
        .webp({ quality: 78, effort: 5 })
        .toFile(path.join(OUT_DIR, `${photo.slug}-${w}.webp`)),
    ),
  );

  const blur = await sharp(buffer).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();

  return {
    src: `/images/${photo.slug}`,
    width,
    height,
    alt: photo.alt,
    category: photo.category,
    widths,
    blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
  };
}

async function buildOgImage() {
  const photo = photos.find((p) => p.slug === ogImage.slug);
  const { buffer } = await loadPhoto(photo);
  await sharp(buffer)
    .resize(1200, 630, { fit: 'cover', position: ogImage.position })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(ROOT, 'public', 'og.jpg'));
}

async function buildAppleIcon() {
  const svg = await readFile(path.join(ROOT, 'src', 'app', 'icon.svg'));
  // iOS rounds the corners itself, so fill the SVG's transparent corners.
  await sharp(svg, { density: 300 })
    .resize(180, 180)
    .flatten({ background: '#540000' })
    .png()
    .toFile(path.join(ROOT, 'src', 'app', 'apple-icon.png'));
}

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });
await mkdir(path.dirname(MANIFEST), { recursive: true });

const manifest = {};
for (const photo of photos) {
  manifest[photo.slug] = await buildPhoto(photo);
  console.log(`✓ ${photo.slug} (${manifest[photo.slug].width}×${manifest[photo.slug].height})`);
}
await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
await buildOgImage();
await buildAppleIcon();
console.log(`\nWrote ${photos.length} photos, og.jpg and apple-icon.png`);
