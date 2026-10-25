# RJ Studio: Design Brief

This brief has two parts. Part 1 analyzes the reference site (pic-time.com). Part 2 covers the design decisions for the RJ Studio demo.

The reference values come from pic-time.com's live stylesheet, its inline scripts and its Webflow interaction data, all inspected on 2026-10-24. They are a source of **feel** only. We copy no logo, copy, branding or assets.

---

## Part 1: Reference analysis (pic-time.com)

### Color

The palette is warm and almost colorless. Off-white and stone sections alternate, and near-black text sits on top. Color comes from the photography, not the UI.

| Role | Hex | Notes |
| --- | --- | --- |
| Hero / "milk grey" background | `#F0EFE8` | Warm off-white; the dominant canvas |
| Beige section | `#F2EAE1` | Alternating section background |
| Stone beige section | `#F1EEE8` | Alternating section background |
| Cream | `#FEFCF5` | Lightest warm tint |
| Light grey sections | `#F9F9F9`, `#FBFBFB` | Neutral breaks |
| White | `#FFFFFF` | Navbar when scrolled, cards |
| Primary text / dark buttons | `#232323` | Near-black, never pure black for text |
| Secondary text | `#444444`, `#979797` | Muted copy, hover state on nav links |
| Hairlines | `#E8E8E8`, `rgba(0,0,0,.1)` | Borders and dividers |
| Warm accents (used sparingly) | `#844F27` saddle brown, `#98452A` warm orange, `#250B0B` deep brown, `#E6D0AB` wheat | Small details only |

**Background/foreground balance.** About 90% light warm neutrals, about 8% near-black type and buttons, and under 2% accent. Each section changes background by only a few percent of lightness (`#F0EFE8` → `#FFFFFF` → `#F2EAE1`), so the page reads as "chapters" without hard borders.

**Accent usage.** Accents never fill large areas. Primary buttons are dark (`#232323`) with white text. Hover states mostly change text color to grey `#979797`.

### Typography

| Use | Reference font | Style |
| --- | --- | --- |
| Display (hero) | Garamond Premier Pro Display (Adobe) | **Uppercase**, weight 400, `6.5rem` (104px) desktop / `4rem` mobile, line-height `1` |
| Headings h2/h3 | TT Norms Pro (commercial grotesque) | Weight 500, `letter-spacing: -0.02em`, h2 40–56px / h3 20–28px, line-height 1.2 |
| Body | TT Norms Pro | 16px, weight 400 |
| Buttons / labels | TT Norms Pro | **Uppercase**, weight 500, 14–16px, `letter-spacing: 0.06em` |
| Editorial accent | Newsreader 300/400 (Google) | Loaded for serif accents |

Pattern: a single huge, airy serif statement contrasts with a small, tight sans-serif for everything else. Uppercase is used only for the display line and for button/label text.

### Image presentation

- **Hero.** Images sit in a tight grid with only **2px gutters**: one large image (≈64% width, ratio 922:793) beside a stacked pair (≈36%). The images are nearly edge-to-edge inside a 40px page gutter. They are served as AVIF with `fetchpriority="high"`.
- **Gallery covers ("Built for Inspiration").** A centered, looping carousel of large covers, with no gap between slides, autoplay every 5s and a 600ms slide transition.
- **Testimonials.** A centered carousel with 80px between slides and a slow 1000ms transition.
- **Keyword ticker.** A horizontal marquee of keywords (18px, 35px apart, 28px vertical padding) acts as a calm divider between sections.
- **Containers.** Max widths are 1280 / 1328 / 1550px, with `2.5rem` side padding and a 104px navbar.
- **Shape.** Images have square corners and no shadows. Buttons are pills (`border-radius: 30px`, padding `17px 34px`).
- **Hover.** Hover effects are minimal: link color fades over `.2s`. Images do not jump.

### Animation and motion

- **Signature hero interaction (scroll-linked).** The hero section is `200vh` tall. As you scroll, the image grid scales from **0.75 to 1**, and the two halves of the display headline ("left" and "right" spans) slide apart horizontally. The motion is tied to scroll progress with heavy smoothing (Webflow `smoothing: 86`), so it feels weighted rather than snappy.
- **Scroll reveals.** There are about 37 "while scrolling in view" interactions and 6 "scroll into view" triggers. Content drifts and fades into place.
- **Easing and timing.** The dominant easing is **`inOutQuint`** (`cubic-bezier(0.83, 0, 0.17, 1)`), followed by plain `ease` and `easeOut`. Most actions run **500ms**, with others at 300–400ms and the slower ones at 600–800ms.
- **Micro-interactions.** Buttons and links transition `color` and `background-color` over `.2s`, and borders over `.3s ease-in-out`.
- **Navbar.** The navbar is transparent at the top of the page and turns solid white as soon as the page scrolls.
- **Carousels.** Swiper runs at speed 600–1000ms and loops.
- **Restraint.** There is no bounce, no parallax gimmickry and no page-transition effects. The motion is slow, smooth and confident.

---

## Part 2: RJ Studio design decisions

### Brand cues from the client

The client's own Instagram posts use two framing colors around their photos, plus an "NRJS" wordmark. These are a perfect bridge to the reference's warm neutrals:

- **Sand** `#D4B598` (sampled from their framed posts)
- **Maroon** `#540000` (sampled from their framed posts)

### Palette (tokens)

| Token | Hex | Use |
| --- | --- | --- |
| `ivory` | `#F0EFE8` | Main canvas (reference "milk grey") |
| `paper` | `#FBFAF6` | Alternate light sections |
| `sand-50` | `#F2EAE1` | Warm section background (Services, Testimonials) |
| `sand` | `#D4B598` | Client sand: thin rules and decorative marks only (too light for text on ivory) |
| `ink` | `#232323` | Headings, body, primary buttons |
| `ink-muted` | `#6B6560` | Secondary text (warm grey, AA contrast on ivory) |
| `line` | `#E4DED4` | Hairlines and borders |
| `maroon` | `#540000` | Client accent: hover underline, active states, the occasional italic word |
| `maroon-deep` | `#250B0B` | The dark sections (Contact, Footer) give the page a closing "night" chapter |

The proportions follow the reference: about 90% ivory/paper/sand, about 8% ink and under 2% maroon. Maroon is never used for large fills except the final dark band.

Focus rings are maroon on light backgrounds, sand on the dark sections, and ivory over photographs, so keyboard focus is always visible.

### Typography (Google Fonts via `next/font`)

The reference fonts are commercial, so we pair free fonts that match their feel:

- **Display/headings: Cormorant Garamond** (300, 400, 400 italic). It is a high-contrast display Garamond, the closest free match to Garamond Premier Pro Display. The hero name is uppercase with wide tracking (`0.08em`). Section headings use mixed case at 300 weight, with `-0.01em` tracking, and an italic word for emotion (e.g. "Stories *told* in light").
- **Body/UI: Manrope** (400, 500). It is a clean grotesque close to TT Norms Pro. Body is 16–17px with line-height 1.7 (looser than the reference, for longer studio copy).
- **Labels/buttons:** Manrope 500, uppercase, 12–13px, `letter-spacing: 0.18em` for eyebrows and `0.12em` for buttons.

Scale (desktop → mobile): hero 104 → 56px, h2 56 → 36px, h3 28 → 22px, body 17 → 16px.

### Image presentation

- **Photos dominate.** There is no text on top of gallery images. Corners are square and there are no shadows, as in the reference.
- **Tight gutters** in galleries (4px desktop, 2px mobile) echo the reference's 2px hero grid. Generous whitespace (`py-28`–`py-40`) goes around sections instead.
- **Justified gallery layout.** Rows share a height and each image keeps its true aspect ratio. Unlike CSS-column masonry, the reading order stays left-to-right, which keeps keyboard and lightbox order intuitive. It needs no JS layout, so there is no layout shift.
- **Hover:** the image scales to 1.04 over 900ms and a 15% ink overlay fades in. On touch devices nothing happens.
- **Gallery ending:** a sand "Every story, in full" tile closes the gallery. It fills whatever space the last row leaves, so no photo sits stranded at the end at any screen width.
- **Story pages:** consecutive portraits pair up at equal height, and landscapes get a row to themselves, giving an editorial rhythm.
- **Hero on phones:** the hero is 92% of the screen height, so the keyword ticker peeks in as a cue to scroll. On wider screens the text sits in a low band, title left and tagline right, so faces in the photo stay clear.

### Phones (most visitors)

The desktop layout is the reference; phones get their own decisions rather than a squeezed version of it.

- **WhatsApp within thumb reach.** From the About section onward, a floating "Enquire" pill sits bottom-right. It steps aside over the hero, at the contact form and in the footer, so it never doubles up with another call to action.
- **More room for photos.** The navbar slides away while you scroll down and returns on any scroll up. The About photo runs edge to edge.
- **Shorter page.** Stories and testimonials become swipeable rows with the next card peeking in, and section spacing is tighter. The home page went from 14.7 to 11.9 screens.
- **Touch-first details.** Every small text link has a tap area of at least 44px. Taps give visible feedback, since hover never fires on touch. Gallery thumbnails carry a "Tap any photo" hint.
- **Lightbox gestures.** Swipe sideways to page through photos, or pull down to close; the backdrop fades as you pull.
- **Story pages** stack every photo full width instead of pairing small portraits.
- **Contact** puts the form straight after the intro, before the contact details.
- **Lighter hero.** On 3x screens the hero loads a 1080px photo instead of 1440px. That's about 40% less data, with no visible difference.
- **Notch-safe.** The page content, the floating button, the menu and the lightbox controls all respect safe-area insets.

### Motion system

| Token | Value | Use |
| --- | --- | --- |
| `ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances (reveals, fades) |
| `ease-in-out-quint` | `cubic-bezier(0.83, 0, 0.17, 1)` | State changes (menu overlay, lightbox slide) — the reference's dominant curve |
| `fast` | 200–300ms | Color and hover changes |
| `base` | 600–800ms | Reveals, overlays |
| `slow` | 1200ms crossfade / 7s Ken Burns | Hero |

Rules:
- Nothing bounces. There are no springs with overshoot.
- Reveal distances are small (16–24px).
- Stagger steps are 60–90ms.
- `prefers-reduced-motion` turns off all transforms, keeps the opacity fades, and makes the hero a single static image.

**The three "wow" moments** (everything else stays quiet):

1. **Hero.** Full-screen slideshow with a slow Ken Burns zoom (scale 1 → 1.08 over 7s) and a 1.2s crossfade. The studio name rises in line by line through a mask.
2. **Gallery reveal.** Inspired by the reference's scroll-linked hero, the section heading's two halves drift apart slightly with scroll. Tiles then unveil row by row with a clip-path wipe and a scale settle (1.08 → 1), staggered.
3. **Lightbox.** The clicked photo grows out of its tile into a full-screen view, and shrinks back into the tile when closed. It supports keyboard (← → Esc), swipe on touch, and shows a counter (e.g. "04 / 13").

Supporting motion, kept subtle:
- **Navbar:** transparent → ivory on scroll.
- **Keyword ticker:** a slow keyword marquee, a nod to the reference.
- **Button hovers:** `.2s` color and background transitions.
