---
description: Score the site against a quality checklist and against 1–3 real local competitor shop sites, on every measurable dimension. The site launches only when nothing is failing.
---

# /benchmark — measurably good, provably

The directive (CLAUDE.md): every change should make the site measurably better
and never worse. There's no old J's Wheels site to beat, so this command
measures two things instead:

- **The checklist** — each dimension below has a pass bar. Our site must pass.
- **Real competitors** — 1–3 local bike-shop websites the owner names. Our
  site should win or tie against them on each dimension.

Inputs: OURS = the `.workers.dev` URL (or the real domain after launch). If
it isn't in `docs/PROGRESS.md`, ask for it. THEIRS = 1–3 real shop sites. Use
the ones in `jeldon.config.ts → competitors.roster` if there are any;
otherwise ask: "Name one to three bike shops near you whose websites you'd
want to beat." If he'd rather you find them, WebSearch "bike shop <his town>",
show him what you found, and use only the ones he confirms. Never invent a
competitor. Zero competitors is fine — then score against the checklist only.

## Dimensions and how to measure each (same method for every site)

1. **Speed** — PageSpeed Insights API, no key:
   `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=<url>&strategy=mobile`
   (and `desktop`). Record performance score, LCP, CLS, INP/TBT, total bytes.
   Do the home page and one service page. Run twice; keep the better.
   Pass bar: mobile ≥ 90, LCP ≤ 2.5 s, CLS ≤ 0.1.
2. **Search hygiene** — for the home page, services, one service page,
   pricing, book-service, contact, blog index, one article: unique `<title>`
   40–60 (short page names OK), unique meta description 120–160, exactly one
   H1, canonical present, `lang`, viewport, no `noindex` on public pages,
   sitemap present and listing only 200 pages, robots.txt present. Count
   passes per page. Pass bar: every check on every page.
3. **Duplicate URLs** — pages that answer the same intent at two addresses.
   Count them. Pass bar: zero.
4. **Structured data** — JSON-LD types on each page above; whether
   Organization/LocalBusiness/BicycleStore carries name, address, phone, and
   hours; Service on service pages; Article on articles; FAQPage where FAQs
   render; BreadcrumbList. Count present types and missing fields.
5. **Citability (GEO)** — `npm run competitors -- <url>` on each site;
   homepage `geoScore` from `data/competitors/adhoc-*.json`. For articles,
   score with `check:geo`. Pass bar: articles at or above their category
   target in `jeldon.config.ts`.
6. **Content depth** — number of indexable pages, words on home page, number
   of service pages with a price and turnaround, blog posts with ≥ 600 words
   and a References section, FAQ count.
7. **Conversion path** — clicks from home to booking a repair; whether "Book a
   Service" and a tap-to-call phone link are above the fold on mobile;
   whether prices are published as text; whether the contact form works
   (`npm run test:contact` on ours only — never send test messages to a
   competitor); dead links and `#` links counted.
8. **Accessibility** — alt text on all images, form labels present, one H1,
   skip link, color contrast of body text and buttons (compute from the CSS
   tokens for ours; sample from computed styles you can read in HTML for
   theirs), focus styles present, reduced-motion respected.
9. **Honesty** — copy claims that can't be sourced (invented stats, fake
   urgency like an expired "Spring Tune-Up Special", stale copyright year).
   Count. On ours, also count `SAMPLE:` values still showing to visitors — fine
   for a demo, a fail for a real launch.
10. **Local** — name, address, phone match the Google Business Profile exactly
    (skip if there's no profile yet); phone is a `tel:` link; map present if
    `mapsUrl` is set; hours published (only if confirmed).

## Output

`data/benchmark/scorecard-<date>.md` and `data/benchmark/latest.json`:

| Dimension | Pass bar | Ours | Competitor A | Competitor B | Verdict |
|---|---|---|---|---|---|

Verdict is **pass / fail** against the bar, plus **ahead / tied / behind**
against the best competitor. Any **fail** blocks `/launch`; any **behind**
gets a fix on the list. Below the table: the three biggest strengths in plain
words (he can quote these — but never name a competitor in public copy), and
a fix list for anything failing, behind, or tied that could be a win.

In chat: the table, then one sentence. Keep every scorecard; the trend matters.
