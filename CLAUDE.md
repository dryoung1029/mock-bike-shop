# CLAUDE.md — J's Wheels website

> You are working in the website repo for J's Wheels, a neighborhood bike shop
> (repairs, tune-ups, fittings, new and used bikes). The owner is Jason.
> **This is a mock/demo site:** business facts (address, phone, prices, team)
> are clearly fictional sample data marked `SAMPLE:` in the code. Keep this
> file lean; depth lives in `docs/`.

## Who you're talking to

Assume the owner runs a bike shop, not a codebase. Write for a smart 9th grader:

- One step at a time. After each step that touches a website or dashboard,
  say what he should see on screen and wait for him to confirm.
- Say exactly what to click ("top right, the blue button that says Deploy") —
  and when the screen doesn't match, ask him to describe it and adapt. Menus
  move; `docs/ACCOUNTS.md` is a best-known map, not a guarantee.
- **You** run every command. He clicks in browsers and answers questions.
- Plain words. Say "the file that holds the shop's hours", not "the config".
  When a technical word is unavoidable, define it in the same sentence, once.
- Short messages. If a step needs more than five sentences, split it.
- He can say **skip**, **later**, or **stop** at any time. Respect it, note
  where he stopped in `docs/PROGRESS.md`, and pick up there next time.

## What this is

- **Site:** Astro 5, static HTML, deployed on Cloudflare Workers from GitHub.
  Pushing to `main` deploys the live site automatically (once connected).
- **Content engine:** Jeldon (`@jeldon/*`, vendored in `vendor/`). It scores
  articles for search and AI-answer-engine citability, validates frontmatter,
  emits structured data, and scans competitors. You never edit `vendor/`.
- **Two config files you edit for the owner:**
  - `site.config.ts` — the website: hours, repair prices, links, nav, analytics IDs.
  - `jeldon.config.ts` — the content engine: brand, author, voice, scoring,
    competitors. Field guide: `docs/JELDON.md`.
- **Content:** `src/content/articles/*.md` (blog), `src/content/services/*.md`
  (repair and fitting services), `src/content/team/*.md` (staff),
  `src/content/faqs.json`.
- **Pages:** `src/pages/`. Layout and styles: `src/layouts/`, `src/styles/global.css`.
- **The one server route:** `src/pages/api/contact.ts` → emails the shop via Brevo.
- **Secrets** live only in the Cloudflare dashboard (and `.dev.vars` locally,
  git-ignored). They are never pasted into chat, never committed, never
  written into any file in this repo.

## Markers

- `SETUP:` — something the owner still has to decide or confirm.
- `SAMPLE:` — made-up demo data (address, phone, prices, team, domain). Fine
  for the mock site; every one must be replaced with a real fact before the
  site is used for a real shop. `npm run check:site` counts both.

## Commands you run (never the owner)

```
npm install                 # first time in a fresh sandbox
npm run build               # must pass before every push
npm run check               # astro check (types)
npm run validate            # Domain Pack shape
npm run doctor              # content engine wired?
npm run check:site          # site-kit doctor: SETUP/SAMPLE markers, missing accounts
npm run check:frontmatter   # article frontmatter valid
npm run check:geo -- <file> # score an article (drafts are skipped unless named)
npm run check:citations     # citation lint
npm run competitors         # scan competitors → data/competitors/summary.md
npm run traffic             # Search Console CSVs → data/search-console/report.md
npm run test:contact -- <url>   # send a test through the live contact form
npm run icons               # rebuild favicon + share image from the logo
```

## Slash commands (the owner types these)

`/setup` `/article` `/publish` `/photos` `/competitors` `/reddit-ideas` `/audit`
`/traffic` `/benchmark` `/launch` `/help`. Each lives in `.claude/commands/`.
Start with `/help` if unsure.

## The standing directive

**Every change should make the site measurably better and never worse.**
Speed, search hygiene, structured data, accessibility, content depth,
citability, conversion paths (booking a repair, calling the shop), and honesty
of copy. `/benchmark` keeps a scorecard in `data/benchmark/`; `/launch` will
not proceed while any dimension is failing. When a change would trade one
dimension for another, say so and let the owner decide.

## Hard rules

1. **Articles need the owner's approval.** They are created with `draft: true`;
   only `/publish`, after he has read the piece, flips it. Other edits (hours,
   a typo, a photo) go live on push — so for anything a visitor will see, show
   the change in chat first and push after he says it's right.
2. **No fabricated facts presented as real.** Demo data is allowed only when
   marked `SAMPLE:`. Never invent reviews, testimonials, statistics, or
   citations — not even as samples. Every reference link in an article is
   opened with WebFetch and confirmed to say what the article says before
   publishing. If a claim can't be sourced, cut it (Jeldon rule: voice beats score).
3. **No safety guarantees.** Articles are general education from a mechanic.
   Don't promise a repair makes a bike "safe"; point readers to a shop
   inspection for brakes, frames, carbon damage, and e-bike batteries, and to
   the manufacturer or CPSC for recalls.
4. **Never guess business facts.** Hours, prices, dates, and staff details come
   from the owner. Until he confirms, keep the `SETUP:`/`SAMPLE:` marker and
   the safe fallback in place.
5. **Never paste, request, or store secrets in chat or in the repo.** Point the
   owner at the exact Cloudflare page instead. If he pastes a key in chat by
   mistake, tell him to rotate it (make a new one) and delete the old one.
6. **Keep the build green.** `npm run build` before every commit. If it fails,
   fix it before saying anything is done.
7. **Small commits, plain messages.** "Add Saturday hours", "Update tune-up prices".
8. **Don't break URLs.** Renaming a page or article slug requires a redirect
   line in `public/_redirects`.
9. **Don't add tracking he didn't ask for.** Cloudflare Web Analytics is the
   default (no cookies, no banner needed). GA4 or pixels only on request, and
   then `src/pages/privacy.astro` must be updated to say so.
10. **DNS is never a solo walkthrough.** Pointing a real domain at the site is
    done in `/launch`, step by step, with the owner confirming each screen and
    a technical helper on hand. Never change DNS or registrar settings on your own.

## Where to read more

| File | When |
|---|---|
| `docs/OWNER-GUIDE.md` | The plain-English map of the site for the owner. Read it to speak his language. |
| `docs/JELDON.md` | Editing `jeldon.config.ts`; how scoring works; what to escalate if the engine needs a change. |
| `docs/ACCOUNTS.md` | Click-by-click account setup (Cloudflare, Brevo, Search Console). `/setup` follows it. |
| `docs/LAUNCH.md` | The cutover checklist. `/launch` follows it. |
| `docs/DESIGN.md` | Design tokens and rules so new pages match the rest of the site. |
| `docs/PROGRESS.md` | The setup wizard's memory: what's done, skipped, and still open. |
