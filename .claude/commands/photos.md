---
description: Add photos to the site — the owner uploads from his phone or computer through one GitHub link; Claude resizes, writes alt text, and places them.
---

# /photos — get real photos onto the site

Photos of the real shop — the repair stand, the team at work, bikes on the
floor — are the biggest trust signal on the site. The owner does the
uploading himself through GitHub's upload page; you do everything after that.
He never needs a terminal or a file manager.

## 1. Find his repo address (once)

Run `git remote get-url origin` and turn it into the upload link:
`https://github.com/<owner>/<repo>/upload/main/public/photos`
(for this repo: `https://github.com/dryoung1029/mock-bike-shop/upload/main/public/photos`).
Save it in `docs/PROGRESS.md` under "Photo upload link" so next time is faster.

## 2. Tell him exactly this (adjust the link)

> Here's how to add photos. Works from your phone or computer:
>
> 1. Open this link (you may need to sign in to GitHub):
>    **<upload link>**
> 2. Tap **choose your files** (on a computer you can also drag photos onto
>    the page). Pick 5–10 photos: the shop front and sign, the repair stand
>    with a bike on it, someone on the team working on a bike, the sales
>    floor, a finished wheel or a fitting in progress.
> 3. Wait for the little progress bars to finish.
> 4. Scroll down and tap the green **Commit changes** button.
> 5. Come back here and say **done**.
>
> Phone photos are fine; I'll shrink them so the site stays fast.

If he says the link asks him to create a fork or shows "You don't have
permission", he's signed into the wrong GitHub account — the one that owns
the repo is the one he created in `docs/START-HERE.md`.

## 3. When he says done

1. `git pull`. Confirm new files landed in `public/photos/`. If nothing new,
   ask him whether the green Commit button was pressed (the most common miss).
2. `npm run photos` — resizes to ≤1600px wide, converts to WebP, keeps the
   originals in `public/photos/originals/`.
3. For each photo, look at it (Read the file) and ask him one short question
   only if you can't tell what it is: "Is this a wheel being trued?" Write
   descriptive alt text (what's in the picture, who, doing what — no keyword
   stuffing).
4. Place them — propose, don't ask about each:
   - Home hero: the best wide shot of the shop or the repair stand →
     `site.config.ts → heroPhoto` (src `/photos/<name>.webp`, alt).
   - Service pages (`heroImage` / `heroImageAlt` in each file in
     `src/content/services/`, if the file has those fields): the photo that
     matches the service — a tune-up on the stand, a wheel in the truing
     stand, a fitting, an e-bike.
   - Team (`photo` / `photoAlt` in each file in `src/content/team/`):
     headshots or "working on a bike" shots. Crop to square if needed
     (`sharp` is available; add a `--square` option to
     `scripts/optimize-photos.mjs` if you need it). A real photo only goes on
     a real person's file — never on a `SAMPLE:` team member.
   - About page and the book-service page: one each.
   - Share image: if he likes it, rebuild the social share image from the
     hero photo plus the logo (`npm run icons` makes the default one from the
     logo alone).
5. `npm run build`, commit "Add photos", push. Show him the practice URL and
   list where each photo went in one line each. Ask if any should move.

## Rules

- Only photos he uploaded or explicitly sent. Never stock images, never
  images pulled from his social accounts, Google, or a bike brand's website
  without his say-so.
- If a photo shows a customer's face (or their bike's license plate or house
  number in the background), ask once: "Is everyone in this photo okay being
  on the website?" Skip any he's unsure about.
- Keep originals; never delete his uploads.
- The logo is always his image file. If he sends a new logo as an SVG,
  replace `public/brand/logo.svg` and run `npm run icons` to rebuild the
  favicon, touch icon, and share image. If he only has a PNG, ask whoever made
  the logo for an SVG. Never trace or redraw it yourself.
