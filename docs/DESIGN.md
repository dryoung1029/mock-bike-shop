# Design rules

So new pages look like they belong. Tokens live in `src/styles/global.css`.

- **Logo and icons.** The logo is `public/brand/logo.svg`, a text wordmark
  used in the header and footer. The favicon (`favicon.png`), touch icon
  (`apple-touch-icon.png`) and default share image (`brand/og-default.jpg`) are
  built from it with `npm run icons` — rerun that after any logo change instead
  of editing the images by hand. If the owner supplies a real logo file, it
  replaces `logo.svg` and is never redrawn.
- **Colors.** Blue `#1f6feb` does the work (links, structure, secondary
  buttons). Orange is spent once per page: the "Book a Service"
  button (`--orange` `#c2410c`, darker than the logo's `#f25c05` so white
  button text passes contrast). Charcoal `#22262b` text on white; dark mode is automatic and there's
  a toggle in the header. Tokens live at the top of
  `src/styles/global.css` (`--blue`, `--orange`, `--charcoal`, …).
- **Type.** One family, Nunito (rounded, friendly, matches the wordmark).
  Weights: 400 body, 700 emphasis and nav, 800 headings. Size scale is fluid
  (`--step-*`). Line length capped at 66 characters (`--measure`).
- **Layout.** Left-aligned. `.container` (max 72rem) and `.section` spacing.
  `.split` for two-column content on wide screens. Cards only where a thing is
  genuinely a card (price list items, team members); services are a list with
  rules, not cards.
- **Buttons.** `.btn--primary` (orange) = the one action we want: Book a
  Service. `.btn--blue` = secondary actions (call the shop, see prices).
  `.btn--ghost` = everything else.
- **FAQ** uses native `<details>`; every FAQ block also emits FAQPage JSON-LD.
- **No motion** except things the user opens. Reduced-motion is respected.
- **Every page** sets a unique title (aim for 40–60 chars; short page names are fine) and description (120–160),
  passes breadcrumb JSON-LD, and has exactly one H1.
- **Images**: WebP, sized, lazy below the fold, descriptive alt text. Photos of
  real bikes, real repairs, and the real shop beat stock every time; no stock photos.
- **Copy**: sentence case, plain verbs, no ALL-CAPS labels, no "→" on links.
  The site talks the way Jason talks at the repair counter.
