# RJ Studio: Wedding Photography Portfolio

A demo portfolio site for **RJ Studio**, a wedding photography studio in Udaipur, Rajasthan.

The site is built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion (`motion`). `next build` exports it as a fully static site, so it needs no server or backend.

- Design brief and reference analysis: [DESIGN.md](DESIGN.md)
- Client Instagram: [@new_rjstudio_udaipur](https://www.instagram.com/new_rjstudio_udaipur)

## Quick start

Requires Node.js 20.11 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm start        # preview out/ at http://localhost:3000
npm run lint
```

## Editing content

All editable content lives in **[src/config/site.ts](src/config/site.ts)**:

| What | Field |
| --- | --- |
| Studio name, live URL, SEO description | `name`, `url`, `description` |
| Instagram handle and link | `instagram` |
| Phone, email, address | `contact` (placeholder values in `[brackets]` render as plain text) |
| Navigation links | `nav` |
| Hero video, slideshow photos, tagline, button | `heroVideoSrc`, `heroVideoPoster`, `hero` |
| Keyword ticker | `ticker` |
| About text and photo | `about` |
| Featured gallery photos and order | `work.photos` |
| Wedding stories (each gets its own page) | `stories` |
| Services | `services` |
| Testimonials | `testimonials` |
| Instagram strip photos | `instagramStrip` |

Photos are referenced by **slug**, for example `"bride-garden-canopy"`. A mistyped slug fails `npm run build` and the type checker, so a broken image can't ship by accident.

## Adding the hero video

1. Put the video in `public/videos/`, for example `public/videos/hero.mp4`.
2. In `src/config/site.ts`, set:

   ```ts
   heroVideoSrc: "/videos/hero.mp4",
   ```

That's the only change needed. The slideshow is replaced by a muted, looping background video that plays inline on phones. The photo in `heroVideoPoster` shows while the video loads. It also stays on screen for visitors who have reduced motion turned on, or who press Pause.

Video tips: export H.264 MP4 at 1920×1080, 10–20 seconds that loop cleanly, no audio track, ideally under 8 MB.

## Adding or replacing photos

Originals live in `attachments/` and are never modified. `npm run images` builds the web versions from them:
- responsive WebP sizes in `public/images/`
- blur placeholders and alt text in `src/data/photos.json`
- the social sharing image (`public/og.jpg`) and the Apple touch icon

**To add a photo:**

1. Copy the original into `attachments/`.
2. Add an entry to [scripts/photos.mjs](scripts/photos.mjs):

   ```js
   {
     slug: 'couple-sunset-ghat',          // used in site.ts
     source: 'IMG_1234.jpg',              // file name in attachments/
     category: 'couple',                  // ceremony | bridal | couple | details
     alt: 'Couple walking along the ghat at sunset',
     // crop: { left, top, width, height },  // optional, in original pixels
   },
   ```

3. Run `npm run images`.
4. Use the slug in `src/config/site.ts`, for example add it to `work.photos` or a story's `photos`.

**To replace a photo:** keep its slug, point `source` at the new file and run `npm run images`.

**To remove a photo:** delete its slug from `site.ts`, then remove its entry from `photos.mjs` and run `npm run images`.

**Cropping framed posts:** some Instagram exports have a coloured border or a logo below the photo. The `crop` option cuts out only the photo; see the existing entries for examples.

**Moving to Cloudinary later:** every image URL goes through [src/lib/image-loader.ts](src/lib/image-loader.ts). Return a Cloudinary resize URL there, and the rest of the site keeps working unchanged.

## Deploying

`npm run build` writes a complete static site to `out/`. Upload that folder to any static host, such as Netlify, Vercel, Cloudflare Pages or a plain web server.

- Set `url` in `site.ts` to the live domain first; it's used for social previews, the sitemap and canonical links.
- To host under a sub-path (for example GitHub Pages at `/repo-name/`), also set `basePath` in `next.config.ts`.
- `scripts/fix-static-export.mjs` runs automatically after every build. It works around a Next.js bug on Windows that breaks link prefetching for story pages. On macOS and Linux it does nothing.

## Before launch: placeholders to replace

- [ ] Phone and email in `contact` (currently `[Phone]` and `[Email]`)
- [ ] Testimonials: real client words, names and weddings
- [ ] Story couple names and venues (currently `Couple Name · Venue, Udaipur`)
- [ ] `url`: the live domain
- [ ] Contact form backend. The form currently shows a success message without sending anything. Connect a service such as Formspree or Web3Forms in [ContactForm.tsx](src/components/sections/ContactForm.tsx).
- [ ] Review the About, Services and story copy with the client
- [ ] Higher-resolution originals and more photos (most current files are 1440px Instagram exports)
- [ ] Hero video, when ready

## Project structure

```
attachments/            client originals (read-only)
scripts/
  photos.mjs            photo list: source file, slug, alt text, crop
  prepare-images.mjs    npm run images
  fix-static-export.mjs postbuild fix for Windows builds
src/
  config/site.ts        all editable content
  data/photos.json      generated by npm run images
  app/                  pages: home, stories/[slug], 404, sitemap, robots, icons
  components/
    layout/             navbar, mobile menu, footer
    sections/           home page sections
    gallery/            justified gallery, story gallery, lightbox
    ui/                 Photo, Reveal, Modal, button styles
  lib/                  image loader, motion tokens, helpers
```
