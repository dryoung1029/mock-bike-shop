---
description: Cutover checklist — point the shop's real domain at the new site, with a technical helper on the call, and verify everything after.
---

# /launch — go live on the real domain

Follow `docs/LAUNCH.md`. This is a two-person step: the owner and a
tech-savvy helper he trusts on a call, you driving. Do not start until he
confirms the helper is with him. DNS (the settings that tell the internet
which computer answers for a web address) is never a solo walkthrough.

First, two questions:
- "What's the web address you want the site on?" If he doesn't own one yet,
  or the site is staying a demo, stop: the `.workers.dev` link keeps working,
  and `/launch` waits until there's a real domain. Note it in `docs/PROGRESS.md`.
- "Is there an old website on that address now?" If yes, the redirect and
  old-URL steps below apply; if no, skip them.

## Before the call (you, alone)

- Run `/benchmark`. Every dimension must pass its bar. If any fails, fix it
  first; launch waits. Attach the scorecard to `docs/PROGRESS.md`.
- `npm run check:site` — no errors. `npm run build` green. `/audit` mode B clean.
- **No sample data going live as real.** Every `SAMPLE:` value (address,
  phone, email, hours, prices, team, domain) must be replaced with a real,
  owner-confirmed fact, or the page that shows it hidden. A real shop's site
  with a fake `(555)` number is worse than no site.
- Replace `https://jswheels.example.com` with the real domain in both
  `site.config.ts → url` and `jeldon.config.ts → SITE_URL`. Build, check
  canonicals and the sitemap use it.
- Confirm the contact form works on the `.workers.dev` URL (`npm run test:contact`).
- If there's an old site: WebFetch its sitemap (`https://<domain>/sitemap.xml`),
  list every URL in `docs/OLD-URLS.md`, and make sure each one has a matching
  new page or a line in `public/_redirects`.
- Write the plan into `docs/PROGRESS.md` and tell him what will happen.

## On the call

1. **Where is the domain?** Ask the helper to run a WHOIS (lookup.icann.org)
   for the domain and read the registrar (the company it was bought from). The
   owner logs in there.
2. **Add the domain to the Cloudflare project**: Cloudflare → Workers & Pages →
   js-wheels-site → **Settings** → **Domains & Routes** → **Add** →
   **Custom domain** → `<domain>`, then again for `www.<domain>`.
   Cloudflare shows the DNS records it needs.
3. **Two paths, the helper picks:**
   - **Easiest long-term:** move DNS to Cloudflare (Cloudflare → Add a site →
     `<domain>` → free plan → it lists existing records → at the registrar,
     change nameservers to the two Cloudflare gives). Takes minutes to hours.
     Then the custom domain step above just works.
   - **Minimal change:** keep the current DNS host and add the records
     Cloudflare showed (a CNAME for `www` and the root record it specifies).
   Either way: **keep every MX and email-related record exactly as it is.**
   The shop's email must keep working. Read them back before saving.
4. Lower TTLs first if the DNS host allows it; wait; then change records.
5. Watch: WebFetch `https://<domain>/` every few minutes until the new site
   answers (look for something only the new site has, like the "Book a
   Service" button text). Both `www` and root must work and redirect to one
   canonical (root, per `jeldon.config.ts → brand.siteUrl`).

## Right after

- If there was an old site: WebFetch 10 old URLs from `docs/OLD-URLS.md` —
  each must 301 to the right page.
- Search Console: add the real domain as a property if it isn't there (same
  HTML-tag steps as `/setup` Stage 8) → **Sitemaps** → submit
  `https://<domain>/sitemap-index.xml`. URL Inspection on the home page →
  **Request indexing**.
- Google Business Profile: website field → `https://<domain>/`; add
  `https://<domain>/book-service/` (or his booking tool link) as the
  "Appointment" link.
- Booking tool (if he uses one): update any "website" link in its settings.
- Instagram/Facebook/Strava bio links → `https://<domain>/book-service/` or
  the home page, his choice.
- Cloudflare Web Analytics: add the real domain as a site if the token was
  made for `.workers.dev`; confirm data is arriving (visits > 0 next day).
- Old site (if any): ask him to leave it up but unpublished for 30 days, and
  cancel the old hosting only after redirects are confirmed working.

## The next day

`npm run test:contact -- https://<domain>` and ask him to check the email
landed. WebFetch the home page and one article. Search "<shop name> <town>"
and confirm the new site appears (it can take a few days — say so if not).
Update `docs/PROGRESS.md`: **Launched <date>**. Then say congratulations, and
mean it.
