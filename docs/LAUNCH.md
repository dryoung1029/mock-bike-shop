# Launch checklist (the DNS cutover)

`/launch` drives this with the owner confirming each screen and a technical
helper on hand. Never a solo walkthrough. Reference only.

## Ready when
- [ ] Every `SAMPLE:` value replaced with a real fact (`npm run check:site` shows none left); a mock site never goes on a real domain
- [ ] `npm run check:site` has no errors; `npm run build` green
- [ ] Owner has clicked every page on his phone and approved
- [ ] Contact form tested on the `.workers.dev` URL: email received at `LEAD_NOTIFY_TO`
- [ ] Every "Book a Service" button goes where it should (booking tool, or the contact form)
- [ ] At least one published article (optional but recommended)
- [ ] `public/_redirects` covers every URL in `docs/OLD-URLS.md` (none, unless an old site turned up)
- [ ] Owner has access to Google Search Console for the real domain
- [ ] WHOIS run on the real domain; registrar and current DNS host known

## The switch (see `.claude/commands/launch.md` for the step-by-step)
1. Custom domains added to the `js-wheels-site` Worker in Cloudflare (root + www)
2. Nameservers moved to Cloudflare **or** the specific records added at the current DNS host
3. All MX / email records preserved verbatim
4. Wait; verify root and www both serve the new site with HTTPS

## After
- [ ] Spot-check pages and any redirects on the real domain
- [ ] Sitemap submitted; home page "Request indexing"
- [ ] Google Business Profile website + booking link updated
- [ ] Social bios updated
- [ ] Web Analytics receiving
- [ ] `docs/PROGRESS.md` updated: Launched <date>
