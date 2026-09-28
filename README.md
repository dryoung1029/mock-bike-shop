# J's Wheels — website (mock/demo)

Fast, SEO/AEO-ready site for J's Wheels, a neighborhood bike shop. **This is a
mock site:** the address, phone, prices, and team are fictional sample data
marked `SAMPLE:` in the code. Astro 5 + Cloudflare Workers, with the Jeldon
content engine for article scoring, structured data, and competitor scanning.
Built to be run by the owner through Claude Code.

**Owner? Start with [`docs/START-HERE.md`](docs/START-HERE.md).**
**Agent? Start with [`CLAUDE.md`](CLAUDE.md).**

## What's here

```
site.config.ts        the website's facts: hours, repair prices, booking link, nav, analytics
jeldon.config.ts      the content engine's Domain Pack: brand, author, voice, scoring
src/pages/            one file per page; api/contact.ts is the only server route
src/content/          articles, services, team, faqs.json
src/layouts, src/components, src/styles/global.css
public/               logo (brand/logo.svg), icons, robots.txt, _redirects, _headers
scripts/              CI checks and workbench tools (competitors, traffic, site doctor, icons)
.claude/commands/     /setup /article /publish /photos /competitors /reddit-ideas /audit /traffic /benchmark /launch /help
docs/                 START-HERE, OWNER-GUIDE, ACCOUNTS, LAUNCH, DESIGN, JELDON, OLD-URLS, PROGRESS
vendor/@jeldon/       built Jeldon packages (until they're on npm)
data/                 drop folders for Search Console CSVs and scan output (git-ignored)
```

## Commands

```
npm install
npm run dev              # local preview at localhost:4321
npm run build            # production build → dist/
npm run preview          # run the built site on the local Workers runtime
npm run doctor           # content engine wired?
npm run check:site       # SETUP:/SAMPLE: markers and what the owner still needs to fill in
npm run check:geo -- src/content/articles/<slug>.md
npm run competitors      # scan competitors → data/competitors/summary.md
npm run traffic          # Search Console CSVs → report
npm run icons            # rebuild favicon, touch icon and share image from brand/logo.svg
```

## Deploy

Cloudflare Workers (Worker name `js-wheels-site`), connected to the GitHub repo
`dryoung1029/mock-bike-shop`. Build command `npm run build`, deploy command
`npm run deploy:cf`. Secrets (Brevo, Turnstile) live in the Cloudflare
dashboard, never here. See `docs/ACCOUNTS.md`.

## Stack notes

- Static output; `/api/contact/` opts into server rendering and runs on Workers.
  It emails the shop through Brevo. There is no other back end.
- Content collections use Astro 5's content layer (`glob` / `file` loaders).
- Article scoring, lifecycle, JSON-LD and citation lint come from `@jeldon/*`.
  `docs/JELDON.md` explains the Domain Pack and how the packages are vendored.
- There was no previous website, so `public/_redirects` starts empty of old
  URLs (see `docs/OLD-URLS.md`).
