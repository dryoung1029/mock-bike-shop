/**
 * J'S WHEELS — DOMAIN PACK
 *
 * This is the one file that tells the Jeldon content engine who J's Wheels
 * is: brand, author, voice, scoring, citation policy, and competitors. Every
 * article the site publishes is scored and validated against what's in here.
 *
 * Values marked `// SETUP:` are placeholders the /setup wizard fills in with
 * the owner. `// SAMPLE:` values are made-up demo data (this is a mock site).
 * Field-by-field guide: docs/JELDON.md.
 */
import { defineDomainPack, defaultScoringConfig } from '@jeldon/config';

const SITE_URL = 'https://jswheels.example.com'; // SAMPLE: keep in sync with site.config.ts

export default defineDomainPack({
  brand: {
    name: "J's Wheels",
    siteUrl: SITE_URL,
    tagline: 'Honest repairs. Fast turnarounds. Bikes that ride like new.',
    geoFraming: 'Anytown, Oregon and nearby', // SAMPLE
    nap: {
      address: '214 Spoke Street', // SAMPLE
      city: 'Anytown', // SAMPLE
      region: 'OR',
      postalCode: '97000', // SAMPLE
      phone: '+1-555-010-0142', // SAMPLE
      placeId: '', // SETUP: Google Business Profile place ID (wizard finds it)
    },
    logoUrl: '/brand/logo.svg',
    brandColors: {
      blue: '#1f6feb',
      orange: '#f25c05',
      charcoal: '#22262b',
    },
  },

  authors: [
    {
      slug: 'jason',
      name: 'Jason',
      title: 'Owner & Head Mechanic',
      schemaId: `${SITE_URL}/team/#jason`,
      isPrimary: true,
      profile: {
        name: 'Jason',
        jobTitle: "Owner & Head Mechanic, J's Wheels",
        url: `${SITE_URL}/team/`,
        // credential: '', // SETUP: any mechanic certifications he wants shown
        knowsAbout: [
          'bicycle repair',
          'bike tune-ups',
          'wheel building and truing',
          'bike fitting',
          'e-bike maintenance',
          'commuter bikes',
          'road and gravel bikes',
        ],
        alumniOf: [], // SETUP: mechanic school, if any
        memberOf: [], // SETUP: e.g. a bike advocacy group or trade association
        sameAs: [], // SETUP: social profiles
      },
    },
  ],

  voice: {
    persona:
      "Jason, the owner and head mechanic of J's Wheels, a neighborhood bike shop. " + // SETUP: /setup Stage 4 rewrites this in his words
      'Friendly, practical, and straight with people. Speaks from the repair stand in the first person ("when I ' +
      'overhaul a bike", "in our shop", "what I tell customers"). Explains the why behind maintenance in plain words ' +
      'a smart 9th grader would follow. Never upsells, never talks down to beginners, never gear-snobbish.',
    bannedTopics: [
      'promising a repair makes a bike "safe"',
      'diagnosing carbon-frame or battery damage from a description',
      'modifying e-bike speed limiters or batteries',
      'criticizing a named competitor shop by name',
    ],
    bannedPhrasings: [
      'studies have shown',
      'unlock your potential',
      'game-changer',
      'in today\'s fast-paced world',
      'it\'s that simple',
      'ride like a pro',
    ],
    rules: [
      'Lead with the reader\'s question and answer it in the first two sentences.',
      'Use "I" and "we" — this is a mechanic talking, not a brochure.',
      'When a claim rests on a standard, a recall, or research, link the actual source in a References section. Never invent a citation.',
      'If a section would only hit a score check by flattening the voice, cut the claim instead.',
      'General education only: for brakes, frame damage, carbon, and e-bike batteries, tell readers to get the bike inspected in person. Point to the manufacturer or CPSC for recalls.',
      'Mention the town naturally when it fits; never stuff it.',
      'Every article ends with one plain next step (book a service, stop by the shop, read a related post).',
    ],
    voiceAnchorUrls: [], // SETUP: add 1–2 published articles once Jason approves them
    readingGradeBand: [6, 9],
  },

  content: {
    categories: ['guide', 'maintenance', 'gear', 'riding', 'community'],
    categoryTargets: { guide: 80, maintenance: 80, gear: 75, riding: 75, community: 70 },
    tags: [
      'beginners',
      'tune-ups',
      'flat-tires',
      'brakes',
      'drivetrain',
      'chains',
      'wheels',
      'tires',
      'bike-fit',
      'e-bikes',
      'batteries',
      'commuting',
      'road-bikes',
      'gravel',
      'mountain-bikes',
      'kids-bikes',
      'winter-riding',
      'safety',
      'buying-a-bike',
      'used-bikes',
      'maintenance-schedule',
      'diy',
      'local-rides',
    ],
    defaultAuthorSlug: 'jason',
    timezone: 'America/Los_Angeles',
  },

  scoring: {
    ...defaultScoringConfig,
    geo: {
      ...defaultScoringConfig.geo,
      floor: 70,
      checks: defaultScoringConfig.geo.checks.map((check) => {
        if (check.id === 'citation') {
          return {
            ...check,
            // Primary sources a bike-maintenance or safety article would actually cite.
            patterns: [
              'cpsc\\.gov|nhtsa\\.gov|cdc\\.gov|transportation\\.gov|fhwa\\.dot\\.gov|' +
                'parktool\\.com|sheldonbrown\\.com|si\\.shimano\\.com|bike\\.shimano\\.com|sram\\.com|' +
                'bikeleague\\.org|peopleforbikes\\.org|iso\\.org|doi\\.org\\/|pubmed\\.ncbi\\.nlm\\.nih\\.gov',
            ],
          };
        }
        if (check.id === 'firstPerson') {
          return {
            ...check,
            patterns: [
              '\\bwhen I\\b|\\bI (?:see|find|tell|recommend|use|check|fix|replace|adjust|ask|start|ride|true|build)\\b|' +
                '\\bin (?:our|the) shop\\b|\\bour customers\\b|\\bat J\'s\\b|' +
                '\\bwe (?:see|find|use|recommend|check|fix|replace|adjust|start|ride)\\b',
            ],
          };
        }
        return check;
      }),
    },
    seo: {
      ...defaultScoringConfig.seo,
      internalLinkPrefixes: ['blog', 'services', 'team', 'pricing', 'faq', 'book-service', 'contact'],
      reading: { good: [6, 9], mehMax: 11 },
      wordCount: { good: [700, 1600], mehMin: 450 },
    },
  },

  citation: {
    policy: 'direct-source-urls',
    forbiddenPatterns: [],
    referenceFormat: 'Author or organization, year. Short description. [link](URL)',
    verifier: { kind: 'none' }, // Claude Code opens every reference link before publishing (see .claude/commands/article.md)
  },

  aeo: {
    brandMentions: ["j's wheels", 'js wheels', 'jswheels'],
    localSearchLocation: 'Anytown, Oregon', // SAMPLE
    querySet: [
      { id: 'q1', query: 'bike repair shop near me Anytown', tags: ['discovery', 'local'] },
      { id: 'q2', query: 'bike tune-up cost Anytown Oregon', tags: ['discovery', 'local'] },
      { id: 'q3', query: 'e-bike repair Anytown', tags: ['discovery', 'local', 'e-bikes'] },
      { id: 'q4', query: 'bike fitting near Anytown', tags: ['discovery', 'local'] },
      { id: 'q5', query: 'how often should I tune up my bike', tags: ['education'] },
      { id: 'q6', query: 'how long does a bike tune-up take', tags: ['education'] },
      { id: 'q7', query: 'when should I replace my bike chain', tags: ['education'] },
      { id: 'q8', query: 'how to fix a flat bike tire', tags: ['education', 'diy'] },
    ],
    engines: ['perplexity', 'anthropic'],
    highPriorityTags: ['discovery', 'local'],
  },

  competitors: {
    ourName: "J's Wheels",
    ourPlaceId: '', // SETUP: same as brand.nap.placeId
    localPackLocation: 'Anytown, OR', // SAMPLE
    // SETUP: empty on purpose. /competitors asks the owner which real local
    // shops to watch (or finds them and confirms with him). Never invent names.
    roster: [],
    targetKeywords: [
      'bike shop anytown',
      'bike repair anytown',
      'bike tune up anytown',
      'e-bike repair anytown',
      'bike fitting anytown',
      'used bikes anytown',
    ],
    highValuePatterns: ['/blog', '/pricing', '/services', '/repair', '/service', '/fit', '/book', '/about'],
    skipPatterns: ['/wp-admin', '/cart', '/checkout', '/login', '/account', '/privacy', '/terms'],
    templateVendors: [
      { name: 'Shopify', fingerprints: ['cdn.shopify.com', 'Shopify.theme'] },
      { name: 'SmartEtailing', fingerprints: ['smartetailing.com'] },
      { name: 'Webflow', fingerprints: ['website-files.com', 'data-wf-page'] },
      { name: 'Wix', fingerprints: ['wixstatic.com', 'wix-code'] },
      { name: 'Squarespace', fingerprints: ['squarespace.com', 'static1.squarespace'] },
      { name: 'WordPress', fingerprints: ['wp-content', 'wp-includes'] },
    ],
  },

  schema: {
    orgType: ['Organization', 'LocalBusiness', 'BicycleStore'],
    org: {
      name: "J's Wheels",
      url: SITE_URL,
      logoUrl: `${SITE_URL}/brand/logo.svg`,
      sameAs: [], // SETUP: social profiles
      // Address and phone come from brand.nap above. `extra` is merged verbatim
      // into the LocalBusiness node.
      extra: {
        priceRange: '$$',
        // Opening hours are added at build time from site.config.ts once hoursConfirmed is true.
      },
    },
    articleTypes: ['Article'],
    emitLlmsTxt: true,
    llmsTxt: {
      summary: "J's Wheels is a neighborhood bike shop offering tune-ups, repairs, wheel truing, bike fittings, and e-bike service.",
      intro:
        'Services: tune-ups, flat tire repair, full overhauls, wheel truing, bike fitting, and e-bike service. ' +
        'Articles are written by the owner and mechanics and cite primary sources.',
      sections: [
        {
          heading: 'Key pages',
          items: [
            { label: 'Services', url: `${SITE_URL}/services/` },
            { label: 'Pricing', url: `${SITE_URL}/pricing/` },
            { label: 'Book a service', url: `${SITE_URL}/book-service/` },
            { label: 'Team', url: `${SITE_URL}/team/` },
            { label: 'Blog', url: `${SITE_URL}/blog/` },
          ],
        },
      ],
    },
  },

  compliance: {
    pack: 'none',
    requireHumanReviewTags: ['brakes', 'e-bikes', 'batteries', 'safety', 'kids-bikes'],
  },

  capabilities: {
    drafting: false, // Drafting happens in Claude Code (/article), not through the API pipeline.
    amplify: false,
    audio: false,
    heroImages: false,
    competitiveIntel: true,
    engagementAnalytics: false,
    entityPresence: false,
  },

  services: {
    store: 'fs',
    contentDir: 'src/content/articles',
    analytics: 'none',
    requiredEnv: [], // The site kit's secrets are checked by `npm run check:site`, not by jeldon doctor.
  },
});
