// All editable site content lives here.
// Photos are referenced by slug; see scripts/photos.mjs for the list.

import type { PhotoSlug } from "@/lib/photos";

/** Checks a photo slug at build time, so a typo fails instead of showing a broken image. */
const slug = (name: PhotoSlug) => name;

/** CSS object-position values, so each crop keeps the subject in frame. */
type FocalPoint = { desktop: string; mobile: string };

export type Story = {
  slug: string;
  title: string;
  /** Placeholder until real names are confirmed with the couple. */
  couple: string;
  venue: string;
  type: string;
  cover: PhotoSlug;
  coverPosition: FocalPoint;
  excerpt: string;
  intro: string;
  photos: PhotoSlug[];
};

export const site = {
  name: "RJ Studio",
  // Used for canonical/Open Graph URLs. Replace with the live domain before launch.
  url: "https://rjstudio.example.com",
  location: "Udaipur, Rajasthan",
  description:
    "RJ Studio is a wedding photography studio in Udaipur, Rajasthan, capturing weddings, pre-wedding shoots and destination celebrations with a quiet, storytelling eye.",

  instagram: {
    handle: "@new_rjstudio_udaipur",
    url: "https://www.instagram.com/new_rjstudio_udaipur",
  },

  contact: {
    phone: "[Phone]",
    email: "[Email]",
    address: "Udaipur, Rajasthan, India",
  },

  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
  ],

  // ─── Hero ────────────────────────────────────────────────────────────
  // Set to a video path (e.g. "/videos/hero.mp4" in public/) to replace the
  // slideshow with an autoplaying background video. Leave empty for the slideshow.
  heroVideoSrc: "",
  heroVideoPoster: slug("bride-entrance-floral-canopy"),

  hero: {
    eyebrow: "Wedding Photography · Udaipur",
    title: "RJ Studio",
    tagline: "Timeless wedding stories, told in the soft light of the City of Lakes.",
    cta: { label: "View Our Work", href: "#work" },
    slides: [
      { slug: "bride-entrance-floral-canopy", position: { desktop: "50% 38%", mobile: "50% 50%" } },
      { slug: "couple-lakeside-golden-hour", position: { desktop: "50% 62%", mobile: "58% 50%" } },
      { slug: "ceremony-pheras-sacred-fire", position: { desktop: "50% 40%", mobile: "62% 50%" } },
      { slug: "couple-pavilion-dance-bw", position: { desktop: "50% 55%", mobile: "56% 50%" } },
      { slug: "ceremony-mandap-wide", position: { desktop: "50% 55%", mobile: "54% 50%" } },
    ] satisfies { slug: PhotoSlug; position: FocalPoint }[],
  },

  ticker: [
    "Weddings",
    "Pre-Wedding Shoots",
    "Destination Weddings",
    "Haldi & Mehendi",
    "Candid Moments",
    "Portraits",
    "Udaipur, Rajasthan",
  ],

  about: {
    eyebrow: "About the Studio",
    heading: "Every wedding is a story",
    headingAccent: "worth keeping",
    paragraphs: [
      "RJ Studio is a wedding photography studio based in Udaipur, Rajasthan — the City of Lakes.",
      "We believe the most beautiful photographs aren't posed; they're felt. A grandmother's blessing, a stolen glance during the pheras, the hush before the varmala. We work quietly and closely, letting your day unfold naturally, and shape every frame into a story you'll return to for a lifetime.",
    ],
    photo: slug("bride-garden-canopy"),
    cta: { label: "Start your story", href: "#contact" },
  },

  work: {
    eyebrow: "Portfolio",
    headingStart: "Featured",
    headingEnd: "Work",
    intro: "A selection of weddings and pre-wedding stories, photographed in and around Udaipur.",
    photos: [
      "ceremony-mandap-wide",
      "bride-entrance-floral-canopy",
      "couple-lakeside-golden-hour",
      "couple-pavilion-dance-bw",
      "detail-hands-ring-watch",
      "couple-white-scalloped-arch",
      "ceremony-pheras-sacred-fire",
      "couple-boat-day",
      "bride-garden-canopy",
      "couple-white-pavilion-dance",
      "couple-white-palace-steps",
      "detail-hands-engagement-ring",
      "couple-boat-dusk",
    ] satisfies PhotoSlug[],
  },

  stories: [
    {
      slug: "royal-mandap",
      title: "A Royal Mandap",
      couple: "Couple Name",
      venue: "Venue, Udaipur",
      type: "Wedding",
      cover: "ceremony-pheras-sacred-fire",
      coverPosition: { desktop: "50% 40%", mobile: "62% 50%" },
      excerpt: "Red roses, jasmine strings and the glow of the sacred fire.",
      intro:
        "Red roses, jasmine strings and family close on every side. A wedding told through its rituals — the walk beneath the floral canopy, the pheras around the sacred fire, and every quiet glance in between.",
      photos: ["bride-entrance-floral-canopy", "ceremony-pheras-sacred-fire", "ceremony-mandap-wide"],
    },
    {
      slug: "lakeside-golden-hour",
      title: "Golden Hour by the Lake",
      couple: "Couple Name",
      venue: "Venue, Udaipur",
      type: "Pre-Wedding",
      cover: "couple-lakeside-golden-hour",
      coverPosition: { desktop: "50% 62%", mobile: "58% 50%" },
      excerpt: "Soft evening light, a lakeside ghat and an easy laugh.",
      intro:
        "An evening by the water as the sun dipped behind the hills: a dance beneath carved marble arches, hands held a little tighter, and the soft gold light that makes Udaipur feel like a dream.",
      photos: ["couple-lakeside-golden-hour", "couple-pavilion-dance-bw", "detail-hands-engagement-ring"],
    },
    {
      slug: "ivory-and-arches",
      title: "Ivory & Arches",
      couple: "Couple Name",
      venue: "Venue, Udaipur",
      type: "Pre-Wedding",
      cover: "couple-white-palace-steps",
      coverPosition: { desktop: "50% 42%", mobile: "58% 50%" },
      excerpt: "White on white, framed by scalloped arches and palace steps.",
      intro:
        "Dressed in ivory against white marble — a pre-wedding shoot shaped by Udaipur's architecture. Scalloped arches, palace steps and a slow twirl in a lakeside pavilion.",
      photos: [
        "couple-white-scalloped-arch",
        "couple-white-palace-steps",
        "couple-white-pavilion-dance",
        "detail-hands-ring-watch",
      ],
    },
  ] satisfies Story[],

  services: [
    {
      title: "Wedding Photography",
      description:
        "Your wedding day and the rituals around it — from haldi and mehendi to the pheras and vidaai — told through candid, unposed storytelling and timeless portraits.",
    },
    {
      title: "Pre-Wedding Shoots",
      description:
        "A relaxed shoot before the big day among Udaipur's lakes, palaces and hills: a chance to feel at ease in front of the camera and create images you'll treasure.",
    },
    {
      title: "Destination Weddings",
      description:
        "Celebrating in Udaipur from afar? We photograph destination weddings across the city's palaces, lakeside venues and heritage hotels, so you can be fully present.",
    },
  ],

  // Layout placeholders only — replace with real client words before launch.
  testimonials: [
    { quote: "[Client testimonial goes here]", name: "[Couple Name]", detail: "[Wedding · Venue, Year]" },
    { quote: "[Client testimonial goes here]", name: "[Couple Name]", detail: "[Pre-Wedding · Venue, Year]" },
    { quote: "[Client testimonial goes here]", name: "[Couple Name]", detail: "[Wedding · Venue, Year]" },
  ],

  instagramStrip: [
    "bride-garden-canopy",
    "couple-white-palace-steps",
    "ceremony-pheras-sacred-fire",
    "couple-boat-dusk",
    "detail-hands-ring-watch",
    "couple-lakeside-golden-hour",
  ] satisfies PhotoSlug[],
};
