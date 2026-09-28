---
description: Read Search Console (and Cloudflare Web Analytics) numbers and say what to do about them in plain words.
---

# /traffic — what the numbers say

If Search Console isn't set up yet (see `docs/PROGRESS.md`, `/setup` Stage 8),
say so in one sentence and offer to set it up first. New sites need a few
weeks before there's much to read.

## Getting the data (owner, ~3 minutes, no API)

Say this, then wait:

> 1. Open search.google.com/search-console and pick your site's address.
> 2. Left menu → **Performance** → **Search results**.
> 3. Top right, set the date range to **Last 3 months**.
> 4. Click **Export** (top right) → **Download CSV**. It saves a zip.
> 5. Unzip it. Then on github.com, open your repository → folder `data` →
>    `search-console` → **Add file** → **Upload files** → drag in the CSVs
>    (Queries, Pages, Dates, Devices) → **Commit changes**.
> 6. Tell me "uploaded".

Cloudflare Web Analytics has no export; ask him to read you three numbers from
Cloudflare → Analytics & Logs → Web Analytics (last 30 days): **visits**,
**page views**, and the **top 3 pages**. Note them in the report.

## Running it

`git pull`, then `npm run traffic`. Read `data/search-console/report.md`.

## Interpreting (write `data/search-console/report-<date>.md`)

Plain English, five short sections:

1. **Headline**: clicks and impressions this period vs. the last file if one
   exists (trend, not just numbers).
2. **What people search to find us** — the top queries, grouped: brand
   ("j's wheels"), local intent ("bike repair near me", "bike shop <town>"),
   and questions ("how often should I tune up my bike").
3. **Pages doing the work** and pages getting impressions but few clicks
   (rewrite the title/description: name the fix).
4. **Opportunities**: queries at positions 8–20 with real impressions — each
   gets one recommended action (`/article` topic, or strengthen an existing
   service or pricing page).
5. **Do this next** — one thing.

Then, in chat, the headline plus the one thing. Offer to do it.

Never claim a cause you can't see in the data ("traffic fell because of the
algorithm"). Say what changed and what you'd try. Seasonal swings are normal
for a bike shop (busy spring and summer, quiet winter) — mention it only if
the dates in the data actually show it.
