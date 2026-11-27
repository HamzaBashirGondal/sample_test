import {
  BrandTestimonial,
  ColorName,
  FaqItem,
  ShirtProduct,
  ShirtSize,
  SizeMeasurement,
} from '../types/shop';

export const BRAND_IMAGES = {
  hero: '/src/assets/images/hero_streetwear_model_1795362273823.jpg',
  atelier: '/src/assets/images/atelier_fabric_craft_1795362278412.jpg',
  vintageBlack: '/src/assets/images/shirt_vintage_black_1795362272580.jpg',
  premiumWhite: '/src/assets/images/shirt_premium_white_1795362274271.jpg',
  graphicPrint: '/src/assets/images/shirt_graphic_print_1795362276311.jpg',
  beigeCotton: '/src/assets/images/shirt_beige_cotton_1795362275566.jpg',
  vintageBrown: '/src/assets/images/shirt_vintage_brown_1795362276530.jpg',
  minimalistOlive: '/src/assets/images/shirt_minimalist_olive_1795362276821.jpg',
  heavyweightBoxy: '/src/assets/images/shirt_heavyweight_boxy_1795362276673.jpg',
  urbanTee: '/src/assets/images/shirt_urban_tee_1795362277692.jpg',
} as const;

export const COLOR_PALETTE: Record<ColorName, string> = {
  'Jet Black': '#0E0E0E',
  'Off White': '#F6F5F1',
  'Charcoal Grey': '#2A2B2A',
  Beige: '#D8CFC0',
  'Vintage Brown': '#5C4033',
  'Olive Green': '#4A5240',
};

export const SHIRT_SIZES: ShirtSize[] = ['S', 'M', 'L', 'XL', 'XXL'];

export const SIZE_GUIDE_ROWS: SizeMeasurement[] = [
  { size: 'S', chest: '45.0"', length: '27.0"', shoulder: '22.5"', sleeve: '9.0"', recommendedHeight: "5'5\" – 5'8\"" },
  { size: 'M', chest: '47.5"', length: '28.0"', shoulder: '23.5"', sleeve: '9.5"', recommendedHeight: "5'8\" – 5'11\"" },
  { size: 'L', chest: '50.0"', length: '29.0"', shoulder: '24.5"', sleeve: '10.0"', recommendedHeight: "5'10\" – 6'1\"" },
  { size: 'XL', chest: '53.0"', length: '30.2"', shoulder: '25.5"', sleeve: '10.5"', recommendedHeight: "6'1\" – 6'4\"" },
  { size: 'XXL', chest: '56.0"', length: '31.5"', shoulder: '26.5"', sleeve: '11.0"', recommendedHeight: "6'3\"+" },
];

export const SHIRT_PRODUCTS: ShirtProduct[] = [
  {
    id: 'kroft-01',
    sku: 'KR-320-BLK',
    slug: 'oversized-vintage-black-shirt',
    name: 'Oversized Vintage Black Shirt',
    category: 'Mineral Wash',
    price: 68,
    compareAtPrice: 82,
    rating: 4.9,
    reviewCount: 214,
    gsm: 320,
    fit: 'Boxy Oversized',
    shortDescription: 'Enzyme-washed 320 GSM combed jersey with a wide dropped shoulder and structured mock collar.',
    description:
      'Engineered as the cornerstone of the daily uniform, the Oversized Vintage Black Shirt undergoes an enzyme mineral wash for a sun-softened charcoal patina without losing fabric density. Cut with an intentional boxy chest and wide sleeve opening that sits cleanly past the elbow.',
    fabricDetails: [
      '320 GSM 100% USA Ring-Spun Organic Cotton',
      '1.25-inch high-density ribbed collar that resists bacon-necking',
      'Pre-shrunk enzyme mineral wash with zero post-wash torque',
      'Double-needle blind stitch hem and reinforced shoulder tape',
    ],
    modelNote: 'Model is 5\'9" wearing Size M for an effortless oversized drape.',
    image: BRAND_IMAGES.vintageBlack,
    colors: [
      { name: 'Jet Black', hex: COLOR_PALETTE['Jet Black'], image: BRAND_IMAGES.vintageBlack },
      { name: 'Charcoal Grey', hex: COLOR_PALETTE['Charcoal Grey'], image: BRAND_IMAGES.heavyweightBoxy },
      { name: 'Vintage Brown', hex: COLOR_PALETTE['Vintage Brown'], image: BRAND_IMAGES.vintageBrown },
      { name: 'Off White', hex: COLOR_PALETTE['Off White'], image: BRAND_IMAGES.premiumWhite },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNewArrival: true,
    isBestSeller: true,
    stockNote: 'In Stock',
    reviews: [
      {
        id: 'rev-101',
        author: 'Devon Brooks',
        location: 'Brooklyn, NY',
        verifiedSize: 'L',
        heightNote: "6'0\" · 178 lbs",
        rating: 5,
        date: 'Oct 18, 2026',
        title: 'Collar structure stays locked after ten washes',
        comment:
          'I used to burn through boxy tees because the neckline stretched out in two weeks. This 320 GSM fabric holds its frame all day and the washed black tone pairs with everything.',
      },
      {
        id: 'rev-102',
        author: 'Maya Lin',
        location: 'Los Angeles, CA',
        verifiedSize: 'S',
        heightNote: "5'6\" · 130 lbs",
        rating: 5,
        date: 'Oct 09, 2026',
        title: 'Ideal cropped-boxy balance',
        comment:
          'Hits right at the upper hip without looking sloppy. Thick enough that it feels substantial under an open flannel or solo.',
      },
    ],
  },
  {
    id: 'kroft-02',
    sku: 'KR-300-WHT',
    slug: 'premium-white-baggy-shirt',
    name: 'Premium White Baggy Shirt',
    category: 'Heavyweight Core',
    price: 64,
    rating: 4.9,
    reviewCount: 189,
    gsm: 300,
    fit: 'Relaxed Architectural',
    shortDescription: 'Opaque 300 GSM warm off-white cotton with architectural wide sleeves and clean drape.',
    description:
      'Finally, a white baggy shirt with zero transparency. Milled from tightly spun 300 GSM unbleached-tone off-white cotton, it drapes away from the torso with crisp volume and clean shoulder lines tailored for everyday American streetwear.',
    fabricDetails: [
      '300 GSM opaque heavyweight jersey — zero show-through',
      'Custom Off-White alabaster dye formulated to avoid sterile starkness',
      'Dropped shoulder seam pitched 2.5 inches past natural shoulder',
      'Garment pre-washed in Los Angeles for immediate softness',
    ],
    modelNote: 'Model is 5\'8" wearing Size M.',
    image: BRAND_IMAGES.premiumWhite,
    colors: [
      { name: 'Off White', hex: COLOR_PALETTE['Off White'], image: BRAND_IMAGES.premiumWhite },
      { name: 'Beige', hex: COLOR_PALETTE['Beige'], image: BRAND_IMAGES.beigeCotton },
      { name: 'Jet Black', hex: COLOR_PALETTE['Jet Black'], image: BRAND_IMAGES.vintageBlack },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNewArrival: true,
    isBestSeller: true,
    stockNote: 'In Stock',
    reviews: [
      {
        id: 'rev-201',
        author: 'Hannah Ortiz',
        location: 'Austin, TX',
        verifiedSize: 'M',
        heightNote: "5'7\" · 140 lbs",
        rating: 5,
        date: 'Nov 02, 2026',
        title: 'Completely opaque and architectural',
        comment:
          'The warm off-white shade looks ten times richer than bright optical white. Sleeves hit just above the elbow crease exactly how a luxury boxy shirt should.',
      },
    ],
  },
  {
    id: 'kroft-03',
    sku: 'KR-310-GRF',
    slug: 'streetwear-graphic-print-shirt',
    name: 'Streetwear Graphic Print Shirt',
    category: 'Graphic Editions',
    price: 74,
    rating: 4.8,
    reviewCount: 142,
    gsm: 310,
    fit: 'Drop-Shoulder Wide',
    shortDescription: 'Charcoal grey oversized shirt with tonal water-based architectural linework chest print.',
    description:
      'Subtlety over loud logos. Our Streetwear Graphic Print Shirt pairs a pigment-dyed charcoal canvas with hand-pulled tonal black architectural linework using breathable water-based ink that settles directly into the 310 GSM weave.',
    fabricDetails: [
      '310 GSM heavyweight combed cotton in Charcoal Grey',
      'Soft-hand water-based screenprint — never cracks or peels',
      'Wide drop-shoulder streetwear silhouette',
      'Split-hem micro vents with herringbone twill reinforcement',
    ],
    modelNote: 'Model is 6\'1" wearing Size L.',
    image: BRAND_IMAGES.graphicPrint,
    colors: [
      { name: 'Charcoal Grey', hex: COLOR_PALETTE['Charcoal Grey'], image: BRAND_IMAGES.graphicPrint },
      { name: 'Jet Black', hex: COLOR_PALETTE['Jet Black'], image: BRAND_IMAGES.vintageBlack },
      { name: 'Olive Green', hex: COLOR_PALETTE['Olive Green'], image: BRAND_IMAGES.minimalistOlive },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNewArrival: true,
    isBestSeller: false,
    stockNote: 'Limited Run',
    reviews: [
      {
        id: 'rev-301',
        author: 'Malik Carter',
        location: 'Chicago, IL',
        verifiedSize: 'XL',
        heightNote: "6'2\" · 195 lbs",
        rating: 5,
        date: 'Oct 29, 2026',
        title: 'Print blends right into the charcoal cotton',
        comment:
          'No heavy plastic ink chest patch. You barely feel the graphic and the tonal black-on-charcoal contrast looks clean with raw denim.',
      },
    ],
  },
  {
    id: 'kroft-04',
    sku: 'KR-340-BGE',
    slug: 'oversized-beige-cotton-shirt',
    name: 'Oversized Beige Cotton Shirt',
    category: 'Heavyweight Core',
    price: 78,
    rating: 4.9,
    reviewCount: 163,
    gsm: 340,
    fit: 'Relaxed Architectural',
    shortDescription: 'Brushed 340 GSM warm sand beige slub cotton with generous wide-cut long sleeves.',
    description:
      'Built for transitional layering and standalone statement fits, the Oversized Beige Cotton Shirt features a tactile slub weave at 340 GSM. Wide-draping sleeves and a relaxed collarless crew profile deliver effortless West Coast minimalism.',
    fabricDetails: [
      '340 GSM heavy textured organic slub cotton',
      'Warm desert beige yarn-dyed colorfast tone',
      'Dropped shoulder with wide kimono-inspired sleeve fall',
      'Raw-edge reinforced interior neck taping',
    ],
    modelNote: 'Model is 6\'0" wearing Size L.',
    image: BRAND_IMAGES.beigeCotton,
    colors: [
      { name: 'Beige', hex: COLOR_PALETTE['Beige'], image: BRAND_IMAGES.beigeCotton },
      { name: 'Off White', hex: COLOR_PALETTE['Off White'], image: BRAND_IMAGES.premiumWhite },
      { name: 'Vintage Brown', hex: COLOR_PALETTE['Vintage Brown'], image: BRAND_IMAGES.vintageBrown },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNewArrival: true,
    isBestSeller: false,
    stockNote: 'In Stock',
    reviews: [
      {
        id: 'rev-401',
        author: 'Julian Vance',
        location: 'Seattle, WA',
        verifiedSize: 'L',
        heightNote: "5'11\" · 172 lbs",
        rating: 5,
        date: 'Nov 08, 2026',
        title: 'Feels like a custom knit',
        comment:
          'The slub texture in person is unreal. Heavy enough for cool evenings on its own and layers clean under a wool overcoat.',
      },
    ],
  },
  {
    id: 'kroft-05',
    sku: 'KR-320-BRN',
    slug: 'vintage-washed-brown-shirt',
    name: 'Vintage Washed Brown Shirt',
    category: 'Mineral Wash',
    price: 70,
    compareAtPrice: 84,
    rating: 4.8,
    reviewCount: 176,
    gsm: 320,
    fit: 'Boxy Oversized',
    shortDescription: 'Sun-faded espresso brown garment-dyed baggy shirt with authentic high-low seam patina.',
    description:
      'Each Vintage Washed Brown Shirt is individually garment-dyed and potassium-misted to replicate years of California sun wear along the collar and shoulder seams. Heavy 320 GSM jersey keeps the silhouette crisp and structured.',
    fabricDetails: [
      '320 GSM heavyweight ring-spun cotton jersey',
      'Small-batch espresso mineral dye — subtle variation per piece',
      'Slightly cropped boxy length with generous chest room',
      'Zero synthetic blends — 100% breathable natural fiber',
    ],
    modelNote: 'Model is 6\'1" wearing Size L.',
    image: BRAND_IMAGES.vintageBrown,
    colors: [
      { name: 'Vintage Brown', hex: COLOR_PALETTE['Vintage Brown'], image: BRAND_IMAGES.vintageBrown },
      { name: 'Jet Black', hex: COLOR_PALETTE['Jet Black'], image: BRAND_IMAGES.vintageBlack },
      { name: 'Beige', hex: COLOR_PALETTE['Beige'], image: BRAND_IMAGES.beigeCotton },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNewArrival: false,
    isBestSeller: true,
    stockNote: 'Best Seller',
    reviews: [
      {
        id: 'rev-501',
        author: 'Andre Morales',
        location: 'Miami, FL',
        verifiedSize: 'L',
        heightNote: "6'0\" · 185 lbs",
        rating: 5,
        date: 'Oct 22, 2026',
        title: 'Wash patina looks genuinely vintage',
        comment:
          'Worn it twice a week since it landed. Pairs crazy well with washed grey cargos and earth-tone sneakers.',
      },
    ],
  },
  {
    id: 'kroft-06',
    sku: 'KR-310-OLV',
    slug: 'minimalist-oversized-shirt',
    name: 'Minimalist Oversized Shirt',
    category: 'Boxy Solids',
    price: 66,
    rating: 4.9,
    reviewCount: 151,
    gsm: 310,
    fit: 'Boxy Oversized',
    shortDescription: 'Matte olive green oversized silhouette with clean blind stitching and zero external branding.',
    description:
      'Pure form and proportion. The Minimalist Oversized Shirt removes all exterior logos so the muted Olive Green pigment and structured drop-shoulder geometry speak for themselves. Built to anchor tonal monochrome or earth-palette outfits.',
    fabricDetails: [
      '310 GSM combed cotton interlock with matte finish',
      'Custom field Olive Green reactive dye',
      'Clean exterior — woven size tag tucked discreetly inside collar',
      'Wide half-sleeve cut that balances relaxed trousers',
    ],
    modelNote: 'Model is 6\'0" wearing Size L.',
    image: BRAND_IMAGES.minimalistOlive,
    colors: [
      { name: 'Olive Green', hex: COLOR_PALETTE['Olive Green'], image: BRAND_IMAGES.minimalistOlive },
      { name: 'Charcoal Grey', hex: COLOR_PALETTE['Charcoal Grey'], image: BRAND_IMAGES.heavyweightBoxy },
      { name: 'Beige', hex: COLOR_PALETTE['Beige'], image: BRAND_IMAGES.beigeCotton },
      { name: 'Jet Black', hex: COLOR_PALETTE['Jet Black'], image: BRAND_IMAGES.vintageBlack },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNewArrival: false,
    isBestSeller: true,
    stockNote: 'In Stock',
    reviews: [
      {
        id: 'rev-601',
        author: 'Noah Kim',
        location: 'San Francisco, CA',
        verifiedSize: 'M',
        heightNote: "5'10\" · 160 lbs",
        rating: 5,
        date: 'Nov 04, 2026',
        title: 'Cleanest olive shade in my rotation',
        comment:
          'Most olive shirts lean too neon or camo. This muted earth olive looks tailored and expensive with charcoal wool trousers.',
      },
    ],
  },
  {
    id: 'kroft-07',
    sku: 'KR-340-CHR',
    slug: 'heavyweight-boxy-fit-shirt',
    name: 'Heavyweight Boxy Fit Shirt',
    category: 'Heavyweight Core',
    price: 72,
    rating: 5.0,
    reviewCount: 248,
    gsm: 340,
    fit: 'Boxy Oversized',
    shortDescription: 'Our thickest 340 GSM charcoal slate jersey with high mock-rib collar and sculptural boxy drape.',
    description:
      'Designed for purists who measure quality by fabric weight. At 340 GSM, the Heavyweight Boxy Fit Shirt holds an architectural shape independent of body frame, anchored by a tall mock-inspired ribbed collar and broad dropped shoulders.',
    fabricDetails: [
      '340 GSM ultra-heavyweight double-knit cotton jersey',
      'Deep Charcoal Slate matte pigment finish',
      'High-profile 1.4-inch ribbed crew collar',
      'Pre-shrunk and enzyme-tumbled for zero shrinkage',
    ],
    modelNote: 'Model is 6\'2" wearing Size XL.',
    image: BRAND_IMAGES.heavyweightBoxy,
    colors: [
      { name: 'Charcoal Grey', hex: COLOR_PALETTE['Charcoal Grey'], image: BRAND_IMAGES.heavyweightBoxy },
      { name: 'Jet Black', hex: COLOR_PALETTE['Jet Black'], image: BRAND_IMAGES.vintageBlack },
      { name: 'Olive Green', hex: COLOR_PALETTE['Olive Green'], image: BRAND_IMAGES.minimalistOlive },
      { name: 'Off White', hex: COLOR_PALETTE['Off White'], image: BRAND_IMAGES.premiumWhite },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNewArrival: false,
    isBestSeller: true,
    stockNote: 'Top Rated',
    reviews: [
      {
        id: 'rev-701',
        author: 'Tyler Hayes',
        location: 'Denver, CO',
        verifiedSize: 'XL',
        heightNote: "6'2\" · 205 lbs",
        rating: 5,
        date: 'Nov 12, 2026',
        title: '340 GSM hits completely different',
        comment:
          'Feels halfway between a structured tee and a lightweight crewneck sweatshirt. Holds its boxy silhouette from morning to night.',
      },
    ],
  },
  {
    id: 'kroft-08',
    sku: 'KR-305-URB',
    slug: 'urban-streetwear-graphic-tee',
    name: 'Urban Streetwear Graphic Tee',
    category: 'Graphic Editions',
    price: 68,
    rating: 4.8,
    reviewCount: 134,
    gsm: 305,
    fit: 'Drop-Shoulder Wide',
    shortDescription: 'Cream off-white oversized graphic tee with vintage collegiate charcoal chest typography.',
    description:
      'Inspired by 1990s downtown athletic archives, the Urban Streetwear Graphic Tee pairs our signature off-white 305 GSM boxy body with softened charcoal chest typography. Relaxed wide sleeves and a clean straight hem complete the silhouette.',
    fabricDetails: [
      '305 GSM 100% combed ring-spun cotton',
      'Off-White cream base with distressed charcoal ink print',
      'Drop-shoulder relaxed streetwear block',
      'Reinforced collar binding to preserve crisp crewneck arc',
    ],
    modelNote: 'Model is 5\'11" wearing Size L.',
    image: BRAND_IMAGES.urbanTee,
    colors: [
      { name: 'Off White', hex: COLOR_PALETTE['Off White'], image: BRAND_IMAGES.urbanTee },
      { name: 'Charcoal Grey', hex: COLOR_PALETTE['Charcoal Grey'], image: BRAND_IMAGES.graphicPrint },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNewArrival: false,
    isBestSeller: false,
    stockNote: 'Limited Run',
    reviews: [
      {
        id: 'rev-801',
        author: 'Chris Park',
        location: 'New York, NY',
        verifiedSize: 'L',
        heightNote: "5'11\" · 168 lbs",
        rating: 5,
        date: 'Oct 31, 2026',
        title: 'Instant staple with carpenter pants',
        comment:
          'Love how the cream tone and charcoal lettering match raw black denim. Fit is spot-on baggy without drowning my frame.',
      },
    ],
  },
];

export const WHY_CHOOSE_PILLARS = [
  {
    number: '01.',
    title: '300–340 GSM Heavyweight Cotton',
    description:
      'Standard retail tees average 150 GSM and cling after two wears. Every KROFT shirt is milled at 300–340 GSM from 100% USA ring-spun organic cotton so the fabric drapes like architecture.',
  },
  {
    number: '02.',
    title: 'Engineered Drop-Shoulder Block',
    description:
      'Rather than simply sizing up a regular shirt, our Los Angeles patternmakers re-proportioned the chest width, sleeve pitch, and slightly cropped body length specifically for an authentic baggy fit.',
  },
  {
    number: '03.',
    title: 'Locked 1.25-Inch Ribbed Collars',
    description:
      'Each neckline is knit from high-recovery 1x1 heavy rib and double-stitched at the shoulder seam, eliminating collar warping wash after wash.',
  },
  {
    number: '04.',
    title: 'Pre-Shrunk Small-Batch Dyeing',
    description:
      'Every garment undergoes enzyme mineral washing before leaving our facility, locking in muted earth tones with zero surprise shrinkage at home.',
  },
];

export const BRAND_TESTIMONIALS: BrandTestimonial[] = [
  {
    id: 'test-1',
    name: 'Jordan Vance',
    age: 24,
    city: 'Los Angeles, CA',
    role: 'Creative Director, Studio Nine',
    productPurchased: 'Heavyweight Boxy Fit Shirt',
    sizePurchased: 'L',
    rating: 5,
    quote:
      'I stopped buying designer blanks once I tried KROFT. Before this, every oversized shirt I owned either draped too long like a dress or lost its collar tension. The 340 GSM charcoal cut nails the cropped boxy proportions from day one.',
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    age: 22,
    city: 'Brooklyn, NY',
    role: 'Editorial Stylist',
    productPurchased: 'Premium White Baggy Shirt',
    sizePurchased: 'M',
    rating: 5,
    quote:
      'Pulling crisp off-white tees for shoots used to be a gamble because thin cotton turns sheer under studio lights. KROFT gives me total opacity, zero shoulder-seam drooping, and an effortless drape on every body type.',
  },
  {
    id: 'test-3',
    name: 'Marcus Bell',
    age: 27,
    city: 'Chicago, IL',
    role: 'Product Designer',
    productPurchased: 'Vintage Washed Brown Shirt',
    sizePurchased: 'XL',
    rating: 5,
    quote:
      'Bought the Vintage Brown and Minimalist Olive shirts before a two-week trip. After six cold washes they look even better—zero shrinking, zero collar wave, and the matte pigment tones match literally everything.',
  },
];

export const BRAND_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Sizing & Fit',
    question: 'Should I take my normal size or size down for the baggy fit?',
    answer:
      'Take your true normal size. Our patterns are already engineered with a wider chest, dropped shoulders, and generous sleeve length for an intentional oversized drape. Size down only if you prefer a closer, standard boxy fit.',
  },
  {
    id: 'faq-2',
    category: 'Fabric & Care',
    question: 'Will my KROFT shirt shrink or lose collar tension after washing?',
    answer:
      'No. Every shirt is enzyme pre-washed and pre-shrunk during finishing in Los Angeles. Machine wash cold inside-out with mild detergent and hang dry or tumble low to preserve the 300–340 GSM cotton structure and 1.25-inch collar.',
  },
  {
    id: 'faq-3',
    category: 'Fabric & Care',
    question: 'What is the difference between 300 GSM and 340 GSM jersey?',
    answer:
      '300 GSM (used in our Premium White and Graphic Editions) offers breathable all-season heavyweight drape with complete opacity. 340 GSM (used in our Heavyweight Boxy and Beige Slub cuts) has a denser, sculptural hand-feel ideal for crisp standalone structure.',
  },
  {
    id: 'faq-4',
    category: 'Shipping & Returns',
    question: 'How fast is US shipping and what is your return policy?',
    answer:
      'Orders placed before 2:00 PM PST ship same-day from our Los Angeles warehouse. Standard US Ground is free on orders over $120 (3–5 business days), with 2-Day Express available. Unworn items with tags qualify for free 30-day size exchanges or returns.',
  },
  {
    id: 'faq-5',
    category: 'Shipping & Returns',
    question: 'Do you accept Cash on Delivery or Express Checkout?',
    answer:
      'Yes. At checkout we support all major US Credit/Debit cards, Express Pay, and verified Cash on Delivery (COD) across eligible US ZIP codes with instant order tracking.',
  },
];

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];
