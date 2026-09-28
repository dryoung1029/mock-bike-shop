---
description: Guided setup wizard — interviews the owner in plain language, confirms or replaces the sample data, and walks him through each account one screen at a time.
---

# /setup — the guided setup wizard

You are running the setup wizard for the J's Wheels website. Read
`CLAUDE.md` first if you haven't this session. Follow the rules there about
talking to the owner: one step at a time, exact clicks, plain words, wait for
confirmation, never a terminal, never a secret in chat.

This is a mock/demo site. Many facts (address, phone, prices, hours, team) are
made-up sample data marked `SAMPLE:`. For each one, ask the owner: keep it as
a demo, or replace it with the real thing? When he gives a real value, write
it in and remove the `SAMPLE:` marker. If he says the site stays a demo, leave
the value and the marker exactly as they are.

The wizard has **stages**. Each stage ends with a short "Done with X — next is
Y. Ready, or want a break?" The owner can say skip / later / stop at any point.

## Stage 0 — Find out where we are

1. Run `npm install` if `node_modules` is missing, then `npm run check:site`
   and read `docs/PROGRESS.md` if it exists. That file is the wizard's memory:
   which stages are done, what he skipped, open questions, and whether he
   wants a demo or a real shop site.
2. Count `SETUP:` and `SAMPLE:` markers in `site.config.ts`,
   `jeldon.config.ts`, `src/content/**`, `src/pages/**`.
3. If this is the first run, say roughly this (in your own words, warmly):

   > Hi Jason — I'm going to set up the J's Wheels website with you. Right
   > now it's a demo: the address, phone, prices, hours, and team are made-up
   > sample data so you can see how it all looks. As we go, you can keep any
   > of it as a demo or swap in the real thing. I'll ask questions one at a
   > time, and for the few places where you need to click around in a website
   > (like Cloudflare), I'll tell you exactly what to click and wait for you.
   > Nothing goes live until you say so. You can say "skip" or "stop" any time
   > and we'll pick up where we left off. Ready for the first questions?

   Then ask once: "Is this staying a demo for now, or are we setting it up
   for a real shop?" Write the answer in `docs/PROGRESS.md`.

   If resuming, summarize what's done in two sentences and offer the next stage.
4. Create or update `docs/PROGRESS.md` as you go (a simple checklist with
   dates and notes). Commit it with each stage.

## Stage 1 — The basics (10 minutes)

Ask, one question per message, and write answers into `site.config.ts`
and `jeldon.config.ts` (keep name, URL, and phone the same in both). Show
what's already there and ask "keep, or change?" rather than asking from scratch:

- Shop name and the exact way he wants it written ("J's Wheels").
- Address and phone. These are samples (`214 Spoke Street, Anytown, OR 97000`,
  `(555) 010-0142`). Real values replace them in both config files; remove
  the `SAMPLE:` markers when he does.
- A landmark line ("Right by the river trail") — his words, or leave the sample.
- **Lead email**: which inbox should get website messages? (`site.email`, and
  `LEAD_NOTIFY_TO` later in Cloudflare).
- **Hours**: the sample is closed Monday, Tue–Fri 10 AM–6 PM, Sat 9 AM–5 PM,
  Sun 11 AM–4 PM. Ask "Are these your real hours?" If not, ask day by day, or
  "same every weekday?" Write them as `'10:00 AM – 6:00 PM'` per day in
  `site.config.ts → hours` (`''` = closed), set `hoursConfirmed: true`, and
  remove the `SAMPLE:` markers. If he isn't sure yet, set `hoursConfirmed:
  false` so pages say "Call for hours." The footer and the LocalBusiness
  structured data both read from there.
- **Social links**: Facebook, Instagram, a Strava club (if the shop runs group
  rides), YouTube. Blank is fine; blank ones are hidden.
- **Google Business Profile**: ask him to open Google Maps, search for his
  shop, and paste the share link. That link goes in `address.mapsUrl` (and the
  embed link in `address.mapsEmbedUrl` if he wants a map on the contact page —
  in Google Maps: **Share** → **Embed a map** → copy only the `src="..."` part).
  From the share link you can usually find the place ID (or WebSearch
  "<shop name> <town> place id"); put it in `brand.nap.placeId` and
  `competitors.ourPlaceId`. If not found, leave it blank — it only matters for
  rank tracking later. If he has no Business Profile, note it in
  `docs/PROGRESS.md` for `/launch`. Never make up a place ID.

Run `npm run build`, commit "Setup: basics".

## Stage 2 — Services and prices (15 minutes)

For each file in `src/content/services/` (tune-ups, flat-tire-repair,
overhauls, wheel-truing, bike-fitting, e-bike-service):
1. Show him the current page text in chat (the body, not the frontmatter) and
   ask: "Is this how you'd explain it? What would you change?" Apply his edits
   in his words.
2. Confirm `price`, `turnaround` ("same day", "2–3 days"), `audience`, and the
   `faqs`. These start as samples — replace with his real numbers and remove
   the `SAMPLE:` marker, or leave them if it stays a demo.
3. Ask if there's a service he doesn't offer (set `draft: true` on that file)
   or one that's missing (make a new file in the same shape, with his words).
4. **Pricing table** in `site.config.ts → pricing`: walk every row. Confirm
   each price and the small print ("labor", "plus tube", "parts extra"), and
   which one to feature. The `/pricing/` page reads from here, so the service
   pages and the table must agree — check they do.
5. **Booking link**: "Do you use an online booking tool — Square Appointments,
   Calendly, a shop-management system?" If yes, ask him to open it and copy
   the public booking link, paste it here, and put it in
   `site.config.ts → booking.url`. Open it with WebFetch (a 200 is enough).
   If no, leave it blank: every "Book a Service" button then goes to the
   contact form, which works fine.

Build, commit "Setup: services and pricing".

## Stage 3 — The team (15 minutes)

The team files (`src/content/team/`: `jason`, `sam-rivera`, `alex-kim`) are
samples. For each real person: name spelling, role ("Mechanic", "Fit
specialist"), credentials as he wants them shown (e.g. a mechanic school or a
brand certification — only if real), specialties, and a 3–5 sentence bio. Ask
him to tell you about each person in his own words and write the bio from
that — don't invent details. Photos: see Stage 5.

Sample people who aren't real: set `draft: true` (or, if he says the site
stays a demo, leave them). New people get a new file in the same shape.

His own bio goes on the team page **and** in `jeldon.config.ts → authors[0]`
(`name`, `title`, `profile.jobTitle`, `profile.credential`, `alumniOf`
(e.g. a mechanic school), `memberOf` (e.g. a local bike advocacy group),
`knowsAbout`, `sameAs`). This is what tells Google and AI engines who wrote
the articles. If he wants his last name shown, add it in both places.

Build, commit "Setup: team".

## Stage 4 — His voice (10 minutes)

This is what makes the articles sound like him instead of like a robot.
Ask these, one at a time, and listen:

1. "Describe the shop to a friend in two sentences."
2. "What do you tell someone who walks in and says 'I don't know anything
   about bikes'?"
3. "What's a phrase or word you'd never want on your website?"
4. "Paste two Instagram captions, emails, or texts to customers you've written
   that sound like you."
5. "Who's the rider you picture when you write — a commuter, a weekend road
   rider, a parent with a kid's bike, someone new to e-bikes?"

Then rewrite `jeldon.config.ts → voice.persona`, add to `bannedPhrasings` and
`rules` from his answers, and save his two samples verbatim in
`docs/VOICE-SAMPLES.md` (this file is what `/article` reads to match his
voice). Read the result back to him in one paragraph: "Here's how I'll try to
sound." Adjust until he says yes.

Commit "Setup: voice".

## Stage 5 — Photos and logo (10 minutes)

The site works without photos, but photos of the real shop — the repair
stand, the team, bikes on the floor — are the single biggest trust signal. Run
the `/photos` command here (read `.claude/commands/photos.md`): it gives him
one GitHub upload link that works from his phone, and you do the resizing, alt
text, and placement after he says "done".

Ask if the logo in `public/brand/logo.svg` is the one he wants. If he has a
real logo (SVG, or PNG on a transparent background), same upload steps; then
`npm run icons` rebuilds the favicon, touch icon, and share image from it.

Build, commit "Setup: photos".

## Stage 6 — Cloudflare (the one that makes it live) (20 minutes)

Follow `docs/ACCOUNTS.md` → **Cloudflare**, screen by screen. Dashboards
change; if what he sees doesn't match, ask him to read the menu names to you
and find the equivalent. Summary:

1. Create a free Cloudflare account (email + password; no card).
2. **Workers & Pages** → **Create** → **Import a repository** → Connect
   GitHub → pick `mock-bike-shop`.
3. Settings on that screen: Project name `js-wheels-site`; Build command
   `npm run build`; Deploy command `npm run deploy:cf`. Click **Save and Deploy**.
4. Wait for the green check. He'll get a URL ending in `.workers.dev`.
   Ask him to paste it. Open it with WebFetch to confirm it's the site.
   Write it in `docs/PROGRESS.md`.
5. **Web Analytics**: Cloudflare left menu → **Analytics & Logs** → **Web
   Analytics** → **Add a site** → the hostname (the `.workers.dev` one for now,
   or his real domain if he has one) → copy the token from the snippet (the
   part after `"token":"`) → paste it here. It is not a secret; put it in
   `site.config.ts → analytics.cloudflareToken`.

From now on every commit you push deploys in about a minute. Tell him that.

## Stage 7 — Contact form plumbing (20 minutes)

The contact form (and the "Book a Service" page, when there's no booking
link) sends an email to the shop through Brevo, a free email-sending service.

**Brevo** (`docs/ACCOUNTS.md` → Brevo): free account → verify his sender email
→ **SMTP & API** → **API Keys** → **Generate a new API key** → name it
`js-wheels-website`.

> Important: don't paste the key here. Open Cloudflare in another tab →
> Workers & Pages → js-wheels-site → **Settings** → **Variables and
> Secrets** → **Add** → type `BREVO_API_KEY`, choose **Secret**, paste the key
> → **Deploy**. Then add two plain variables: `LEAD_NOTIFY_TO` (the inbox that
> gets website messages) and `LEAD_NOTIFY_FROM` (the sender he verified in Brevo).

Optional spam protection: Cloudflare **Turnstile** → add a widget → the site
key goes in `site.config.ts → contactForm.turnstileSiteKey` (not a secret);
the secret key goes in Cloudflare as `TURNSTILE_SECRET_KEY` (Secret), same
routine as above. Skip unless he's getting spam.

Then test, together:
1. Trigger a redeploy (push an empty commit "Redeploy for secrets").
2. Run `npm run test:contact -- https://<his>.workers.dev`. Expect `{"ok":true}`.
3. Ask him to check the inbox for the test message. If it's not there after a
   couple of minutes, ask him to check spam. If the test didn't return
   `{"ok":true}`, the redeploy may not have finished — wait a minute and re-run;
   if it still fails, the key or the sender email is wrong — check both names
   in Cloudflare letter by letter with him.

## Stage 8 — Search Console (10 minutes)

There's no verification tag yet. Google Search Console is Google's free
dashboard that shows what people searched to find the site.

1. Ask him to open search.google.com/search-console and sign in with the
   Google account he uses for the shop.
2. **Add property** → **URL prefix** → paste the site address (the
   `.workers.dev` URL for now; the real domain is added again at `/launch`).
3. Choose **HTML tag** as the verification method. Ask him to copy just the
   code inside `content="..."` and paste it here. It is not a secret.
4. Put it in `site.config.ts → analytics.googleSiteVerification`, build,
   commit "Add Search Console verification", push. Wait about a minute.
5. Tell him to click **Verify**. He should see a green "Ownership verified".

If he'd rather wait until there's a real domain, skip this and note it for
`/launch`.

## Stage 9 — Review together, then plan the launch

1. Run `npm run check:site`, `npm run doctor`, `npm run build`. Fix anything
   red. Tell him how many `SAMPLE:` markers are left and what they are, in
   one short list. If it's staying a demo, that's fine — say so.
2. Send him the `.workers.dev` link and ask him to click through every page on
   his phone: home, services, pricing, team, book a service, contact. Collect
   changes; make them; push.
3. Offer the first article: "Want to write the first blog post now? Type
   `/article` and I'll ask you what you want to write about." The seed
   article `how-often-should-you-tune-up-your-bike.md` is a draft he can adopt,
   edit, or delete.
4. When he's happy: "The last step is pointing your real web address at the
   new site. We do that one step at a time with a tech-savvy helper on the
   call — type `/launch` when you've set a time." If there's no real domain
   yet (still a demo), say that the `.workers.dev` link works as-is and
   `/launch` can wait. Update `docs/PROGRESS.md`.

## Things to never do in this wizard

- Never invent hours, prices, turnaround times, credentials, bios, reviews,
  or testimonials. Sample data stays marked `SAMPLE:` until he gives a real
  value.
- Never remove a `SAMPLE:` marker unless he's given the real fact.
- Never invent a competitor, a place ID, or a booking link.
- Never ask for or accept an API key, password, or card number in chat.
- Never touch DNS or the domain registrar.
- Never publish an article (`draft: false`) — that's `/publish`, after he reads it.
- Never push a build that fails.
