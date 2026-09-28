---
description: Find the weak spots on our own site — speed, SEO, structured data, links, accessibility, copy — and fix the easy ones.
---

# /audit — weak-spot check of our site

Two modes. Ask which, or do both if he says "everything".

## A. Live site audit (needs the `.workers.dev` URL or the real domain)

1. `npm run competitors -- <our live url>` — reuses the competitor scanner on
   us: citability score, headings, schema types, sitemap, robots, page sample.
2. WebFetch the home page, `/services/`, one service page, `/pricing/`,
   `/book-service/`, `/contact/`, `/team/`, the blog index, and the newest
   article. For each check:
   - Title 40–60 chars, unique; meta description 120–160 chars, unique.
   - Exactly one H1; H2s in order; no empty headings.
   - JSON-LD present and valid-looking (Organization/LocalBusiness/BicycleStore
     on every page with name, address, phone; Service on service pages;
     Article + FAQPage on posts; FAQPage where FAQs show). Paste each into the
     Schema Markup Validator via WebFetch of `https://validator.schema.org/`
     only if it can be automated; otherwise eyeball the JSON for missing fields.
   - Every link resolves (HEAD/GET, no 404s). Every image has alt text.
   - Every "Book a Service" button goes somewhere that works (the booking
     link in `site.config.ts → booking.url`, or the contact form).
   - No `SETUP:` markers or placeholder text visible to a visitor. If the site
     is going live as a real shop, no `SAMPLE:` data either (the fake
     `(555) 010-0142` number, `Spoke Street` address, `example.com` email).
   - Hours shown match what the owner confirmed (or say "Call for hours").
3. Speed: run Google PageSpeed Insights via WebFetch of
   `https://pagespeed.web.dev/analysis?url=<url>` is not reliable; instead call
   the API with no key: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=<url>&strategy=mobile`
   and read `lighthouseResult.categories.performance.score` and the Core Web
   Vitals fields. Anything under 90 on mobile gets a line in the report.
4. Search Console, if he has exported CSVs: `npm run traffic` and read
   `data/search-console/report.md` for pages with impressions but no clicks
   (weak titles/descriptions) and queries at positions 8–20 (one good article
   or a stronger page could move them).

## B. Repo audit (no URL needed)

`npm run build`, `npm run check`, `npm run doctor`, `npm run check:site`,
`npm run check:frontmatter`, `npm run check:geo`, `npm run check:citations`.
Grep for `TODO`, `SETUP:`, `SAMPLE:`, `lorem`. List the `SAMPLE:` items
separately — they're expected on a demo, but each one blocks using the site
for a real shop. Check that service prices in `src/content/services/*.md`
match `site.config.ts → pricing`. If the shop had an old website, check
`public/_redirects` covers every old URL listed in `docs/OLD-URLS.md`.

## Report and fix

Write `data/audit-<date>.md`: a table of findings with **Severity** (blocks
launch / hurts ranking / cosmetic), **Page**, **What**, **Fix**, **Who**
(me now / owner decision / tech helper). Then fix everything in the "me now"
column, build, commit "Audit fixes <date>", push, and re-check the fixed items
live. Never "fix" a `SAMPLE:` value by guessing the real one — that's an
owner decision.

In chat: how many issues found, how many already fixed, and the one decision
he needs to make (if any). Keep it to five sentences.
