// Source list for every photo on the site.
//
// `npm run images` reads each `source` file from attachments/ (never modified),
// applies the optional `crop` (pixels in the original), and writes web-ready
// copies to public/images/ plus metadata to src/data/photos.json.
//
// To add a photo: drop it in attachments/, add an entry here, run `npm run images`,
// then reference its `slug` in src/config/site.ts.

export const photos = [
  // Ceremony
  {
    slug: 'bride-entrance-floral-canopy',
    source: 'SaveVid.Net_743995969_18108727112049593_6173461718899348953_n.jpg',
    category: 'ceremony',
    alt: 'Smiling bride in a red lehenga walking beneath a floral canopy held up by family members',
  },
  {
    slug: 'ceremony-pheras-sacred-fire',
    source: 'SaveVid.Net_744782392_18108727148049593_2553776693796350476_n.jpg',
    category: 'ceremony',
    alt: 'Bride and groom taking the pheras around the sacred fire at their wedding mandap',
  },
  {
    slug: 'ceremony-mandap-wide',
    source: 'SaveVid.Net_746230638_18108727100049593_1815358574930571399_n.jpg',
    // Crops off the couple's names printed across the top of the original.
    crop: { left: 0, top: 1560, width: 3271, height: 2536 },
    category: 'ceremony',
    alt: 'Wide view of a mandap decorated with red roses and white floral strings as the couple sits before the sacred fire',
  },

  // Bridal
  {
    slug: 'bride-garden-canopy',
    source: 'SaveVid.Net_469212180_18050892110049593_9155147683318123078_n.jpg',
    category: 'bridal',
    alt: 'Bride in a red embroidered lehenga seen from behind, framed by a canopy of green leaves in a sunlit garden',
  },

  // Couple portraits
  {
    slug: 'couple-lakeside-golden-hour',
    source: 'SaveVid.Net_485262678_18277590967267561_7126300664586992725_n.jpg',
    category: 'couple',
    alt: 'Couple laughing together on a stone ghat by the lake at golden hour, with birds and a white lake palace behind them',
  },
  {
    slug: 'couple-pavilion-dance-bw',
    source: 'SaveVid.Net_485261997_18277590994267561_1949797898468401559_n.jpg',
    crop: { left: 0, top: 421, width: 1440, height: 957 },
    category: 'couple',
    alt: 'Black-and-white photo of a couple dancing beneath the carved arches of a lakeside pavilion',
  },
  {
    slug: 'couple-white-scalloped-arch',
    source: 'SaveVid.Net_618681070_18090945689049593_8641309415661667243_n.jpg',
    crop: { left: 333, top: 228, width: 774, height: 1345 },
    category: 'couple',
    alt: 'Couple in white traditional outfits gazing at each other beneath a scalloped Rajasthani arch',
  },
  {
    slug: 'couple-white-pavilion-dance',
    source: 'SaveVid.Net_619237443_18090945659049593_7662322276781374364_n.jpg',
    crop: { left: 184, top: 544, width: 1072, height: 713 },
    category: 'couple',
    alt: 'Couple in white twirling together inside a white marble pavilion by the water',
  },
  {
    slug: 'couple-white-palace-steps',
    source: 'SaveVid.Net_619545777_18090945725049593_4291838317643654285_n.jpg',
    crop: { left: 18, top: 22, width: 1403, height: 1756 },
    category: 'couple',
    alt: 'Groom leading his partner by the hand down the steps of a white palace courtyard',
  },
  {
    slug: 'couple-boat-day',
    source: 'SaveVid.Net_497636477_18066375473049593_4669559466577323655_n.jpg',
    crop: { left: 66, top: 42, width: 947, height: 629 },
    category: 'couple',
    alt: 'Couple dressed in black standing on a wooden boat on a misty lake',
  },
  {
    slug: 'couple-boat-dusk',
    source: 'SaveVid.Net_497636477_18066375473049593_4669559466577323655_n.jpg',
    crop: { left: 66, top: 678, width: 947, height: 628 },
    category: 'couple',
    alt: 'Couple posing on a wooden boat at dusk as a flock of birds crosses the sky',
  },

  // Details
  {
    slug: 'detail-hands-engagement-ring',
    source: 'SaveVid.Net_485144617_18277590976267561_1380397111926586823_n.jpg',
    crop: { left: 277, top: 605, width: 886, height: 589 },
    category: 'details',
    alt: "Close-up of a couple holding hands, her engagement ring and gold bracelet against a pale sky",
  },
  {
    slug: 'detail-hands-ring-watch',
    source: 'SaveVid.Net_619228266_18090945680049593_6092811664661890495_n.jpg',
    crop: { left: 183, top: 475, width: 1075, height: 715 },
    category: 'details',
    alt: "Close-up of a couple's joined hands, her diamond ring and gold watch against white embroidered fabric",
  },
];

// Social sharing image (1200x630), cut from one of the photos above.
export const ogImage = { slug: 'ceremony-mandap-wide', position: 'centre' };
