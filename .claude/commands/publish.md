---
description: Publish an approved draft article (flip draft to false, re-check, push live).
---

# /publish — make an approved article live

Usage: `/publish <slug>` (the file name without `.md`). If no slug, list the
drafts in `src/content/articles/` and ask which one.

1. Confirm in one line: "Publishing **<title>**. You've read the final version
   and it sounds like you — right?" Wait for yes. This is the owner's approval;
   nothing else counts.
2. Set `draft: false` and `publishDate` to today (Pacific). If he wants it out
   on a later date, leave it a draft and note the date in `docs/PROGRESS.md`;
   nothing publishes automatically, so someone runs `/publish` that day.
3. Run the three checks (`check:frontmatter`, `check:citations`, `check:geo`).
   All must pass. Open every reference link once more. Re-read for safety
   framing: no promise that a bike is "safe", and brakes, frames, carbon, and
   e-bike batteries point to an in-shop inspection.
4. If the article has no `heroImage`, ask once whether he wants one of his
   photos on it (name three from `public/photos/`). Add alt text if used.
5. `npm run build`. Commit "Publish: <title>". Push to `main`.
6. Tell him: "Live in about a minute at `https://<site>/blog/<slug>/`."
   After ~90 seconds, WebFetch the live URL to confirm it's up, then say so.
7. Add the URL to `jeldon.config.ts → voice.voiceAnchorUrls` if he said it
   sounds like him and there are fewer than 2 anchors. Commit.
8. Suggest one thing, not five: share it on Instagram with the excerpt as the
   caption, or add an internal link to it from a related service page.
