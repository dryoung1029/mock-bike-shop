/**
 * SITE KIT CONFIG — everything about the website that is NOT the content
 * engine: navigation, hours, repair price list, booking link, social links,
 * analytics IDs.
 *
 * The /setup wizard fills the `SETUP:` items with the owner. `SAMPLE:` items
 * are made-up demo data (this is a mock site); replace them with real facts
 * before using the site for a real shop. Pages read from here so there is one
 * place to change a phone number or a price.
 */
// Plain data only — no imports. This file is bundled into the contact-form
// Worker, so it must stay free of Node-only code. Keep brand name/URL/phone in
// sync with jeldon.config.ts (the wizard edits both).

export const site = {
  name: "J's Wheels",
  url: 'https://jswheels.example.com', // SAMPLE: real domain goes here (also in jeldon.config.ts)
  tagline: 'Honest repairs. Fast turnarounds. Bikes that ride like new.',
  shortPitch: 'A neighborhood bike shop for tune-ups, repairs, wheel work, fittings, and e-bike service.',
  phone: '+1-555-010-0142', // SAMPLE: 555-01xx numbers are reserved for fiction
  phoneDisplay: '(555) 010-0142', // SAMPLE
  email: 'hello@jswheels.example.com', // SAMPLE
  address: {
    street: '214 Spoke Street', // SAMPLE
    city: 'Anytown', // SAMPLE
    region: 'OR', // SAMPLE
    postalCode: '97000', // SAMPLE
    landmark: 'Right by the river trail', // SAMPLE
    /** Google Maps share link and embed URL. Blank = the map and "Get directions" link are hidden. SETUP */
    mapsUrl: '',
    mapsEmbedUrl: '',
  },

  /** Home-page hero photo. /photos fills this in; blank = text-only hero. */
  heroPhoto: { src: '', alt: '' },

  /** Day keys are Mon–Sun; "" = closed. Pages only show hours once
   *  `hoursConfirmed` is true. Until then they say "Call for hours." */
  hours: {
    Mon: '',
    Tue: '10:00 AM – 6:00 PM',
    Wed: '10:00 AM – 6:00 PM',
    Thu: '10:00 AM – 6:00 PM',
    Fri: '10:00 AM – 6:00 PM',
    Sat: '9:00 AM – 5:00 PM',
    Sun: '11:00 AM – 4:00 PM',
  } as Record<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun', string>, // SAMPLE: demo hours
  hoursConfirmed: true, // SAMPLE: true so the demo shows hours; set false until the owner confirms real ones

  social: {
    facebook: '', // SETUP
    instagram: '', // SETUP
    strava: '', // SETUP (a Strava club link, if the shop runs group rides)
    youtube: '', // SETUP
  },

  /**
   * Online booking. If the shop uses a booking tool (Square Appointments,
   * Calendly, a shop-management system…), paste its public link here and every
   * "Book a service" button goes straight to it. Blank = the contact form. SETUP
   */
  booking: {
    url: '',
  },

  /** Displayed on /pricing. SAMPLE: demo prices — the wizard confirms real ones with the owner. */
  pricing: [
    { name: 'Standard Tune-Up', price: '$119', period: 'labor', note: 'Most popular', featured: true },
    { name: 'Basic Tune-Up', price: '$79', period: 'labor', note: '', featured: false },
    { name: 'Full Overhaul', price: '$249', period: 'labor', note: 'Parts extra', featured: false },
    { name: 'Flat Repair', price: '$15', period: 'plus tube', note: 'Usually while you wait', featured: false },
    { name: 'Wheel True', price: '$25', period: 'per wheel', note: '', featured: false },
    { name: 'Bike Fitting', price: '$150', period: 'about 90 minutes', note: '', featured: false },
    { name: 'E-Bike Check-Up', price: '$69', period: 'labor', note: '', featured: false },
  ],

  /** Main navigation. Keep to 6 items or fewer. */
  nav: [
    { label: 'Services', href: '/services/' },
    { label: 'Pricing', href: '/pricing/' },
    { label: 'Team', href: '/team/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'FAQ', href: '/faq/' },
    { label: 'Contact', href: '/contact/' },
  ],
  primaryCta: { label: 'Book a Service', href: '/book-service/' },

  analytics: {
    /** Cloudflare Web Analytics token (Cloudflare dashboard → Web Analytics). SETUP */
    cloudflareToken: '',
    /** Google Search Console HTML-tag verification code. SETUP (optional) */
    googleSiteVerification: '',
    /** Optional GA4 measurement ID (G-XXXX). Leave blank to skip GA entirely. */
    ga4MeasurementId: '',
  },

  contactForm: {
    /** Cloudflare Turnstile is optional spam protection. */
    turnstileSiteKey: '', // SETUP (optional)
    subjects: ['Book a repair', 'Tune-up question', 'Bike fitting', 'E-bike service', 'Buying a bike', 'Something else'],
  },
} as const;

export type Site = typeof site;

/** Where every "Book a service" button goes: the booking tool if set, else the contact form. */
export function bookingHref(): string {
  return site.booking.url || '/contact/?subject=Book%20a%20repair';
}
