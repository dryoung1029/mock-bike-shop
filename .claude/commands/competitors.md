---
description: Scan real local competitor bike shops (named or confirmed by the owner) and report where J's Wheels can win.
---

# /competitors — the competitive picture

Read `jeldon.config.ts → competitors`. The roster starts **empty on purpose**:
it only ever holds real shops the owner has named or confirmed. Never invent a
competitor name or website.

## 1. Discover (with him)

First ask: "Which bike shops near you do you think of as competition? Names
are enough — I'll find the websites." Also ask which town he's really in, if
the address is still the `SAMPLE:` one (Anytown isn't real; there's nothing to
search there). If the site is a pure demo with no real town, stop here and say
so in one sentence.

If he'd like help finding them, WebSearch for shops that compete for the same
rider in his town and nearby: "bike shop <town>", "bike repair <town>", "bike
tune-up <town>", "e-bike repair <town>", "bike fitting <town>". Also check
Google Maps results via WebSearch snippets. Big-box stores and online-only
retailers are a different buyer — skip them unless he asks.

Show him the list in one message ("Here's who I found: … Anyone I'm missing?
Anyone to leave out?"). Only after he confirms, add each to
`competitors.roster` (`id`, `name`, `url`), update
`competitors.localPackLocation` and `targetKeywords` to his real town if
they're still samples, and commit.

## 2. Measure (deterministic)

Run `npm run competitors`. It writes `data/competitors/summary.md` and a JSON
per site: homepage citability (GEO) score, word count, headings, schema.org
types, sitemap/robots, template vendor, and a gap table against our site.
Read every summary. Also WebFetch each competitor's service or pricing page
and one blog post if they have one; note whether prices are published, tune-up
tiers and what's included, turnaround times, online booking, e-bike service,
fitting, and any claims about certifications.

## 3. Interpret (you)

Write `data/competitors/report-<date>.md` with these sections, plain English:

- **Where we already win** (e.g. prices published as text; online booking; a
  real blog with sources; e-bike service explained clearly).
- **Where they beat us today** (real findings only: review counts, years in
  business, brands carried, group rides, a clearer service menu).
- **Five moves, ranked by payoff ÷ effort.** Each: what, why, how long, which
  command does it (`/article`, `/audit`, a config change).
- **Article ideas the competitors aren't covering** — feed these to
  `data/reddit/ideas-<date>.md` too.
- **Local pack notes**: who shows in the Google map results for the target
  keywords (from search snippets) and what their listings have that ours
  doesn't (photos, posts, Q&A, categories, hours).

Never write anything that disparages a competitor by name in public content.
This report is internal.

## 4. Tell him

Three sentences in chat: the single biggest thing we have that they don't, the
single biggest thing they have that we don't, and the first move. Link the
report file. Ask if he wants to start on move #1 now.

Re-run quarterly. Keep old reports; they show the trend.
