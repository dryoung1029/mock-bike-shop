# Account setup — click by click

These are the screens `/setup` walks the owner through. Written for the owner
to read too. Menus move around; if a screen doesn't match, describe what you
see and Claude adapts. **Rule for every account: API keys and passwords never
go in the chat.** They go straight into Cloudflare's secrets page.

---

## Cloudflare (hosting — free)

**Create the account**
1. cloudflare.com → **Sign up** → your shop email + a password. No card.
2. Confirm the email.

**Connect the website**
1. Left menu → **Workers & Pages** → **Create** (blue button).
2. Choose **Import a repository** (under the Workers tab).
3. **Connect GitHub** → GitHub asks what Cloudflare may see → choose
   **Only select repositories** → pick `mock-bike-shop` → **Install & Authorize**.
4. Back in Cloudflare, click `mock-bike-shop`.
5. On the setup screen:
   - Project name: `js-wheels-site`
   - Build command: `npm run build`
   - Deploy command: `npm run deploy:cf`
   - Leave the rest alone.
6. Click **Save and Deploy**. A log scrolls for a minute or two. When it says
   **Success**, there's a link ending in `.workers.dev`. That's the practice
   address of the new site. Copy it into the chat.

From now on, every change Claude makes appears at that address about a minute
later.

**Web Analytics (see how many people visit — no cookies, free)**
1. Left menu → **Analytics & Logs** → **Web Analytics** → **Add a site**.
2. Hostname: the shop's real domain (or the `.workers.dev` address until
   there is one) → **Done**.
3. It shows a code snippet. Inside it is `"token":"...."`. Copy the long code
   between the quotes and paste it in the chat. (This one isn't secret.)

**Secrets (where API keys go)**
1. **Workers & Pages** → `js-wheels-site` → **Settings** tab.
2. Find **Variables and Secrets** → **Add**.
3. Type the name exactly as Claude tells you (for example `BREVO_API_KEY`),
   choose **Secret** for keys and **Text** for plain values, paste the value,
   click **Deploy**.
4. The full list the site uses:
   - `BREVO_API_KEY` — **Secret**
   - `LEAD_NOTIFY_TO` — **Text** (the inbox that gets contact-form messages)
   - `LEAD_NOTIFY_FROM` — **Text** (the sender address verified in Brevo)
   - `TURNSTILE_SECRET_KEY` — **Secret**, optional (spam shield, below)

   None of these are needed while the site is being built, only when someone
   sends the contact form.

---

## Brevo (sends you an email when someone uses the contact form — free)

1. brevo.com → **Sign up free** → shop email.
2. Confirm email. Skip the tour. If it asks about a company website, use the
   shop's domain (or the `.workers.dev` address for now).
3. **Senders & IP** (under your name, top right, or Settings) → **Add a sender**
   → name `J's Wheels`, email an address on your domain you can receive at
   (for example `website@` your domain). Brevo emails a confirmation link to
   that address; click it. (If you can't receive at your domain yet, use your
   regular shop email as the sender for now.)
4. Top right, your name → **SMTP & API** → **API Keys** tab → **Generate a new
   API key** → name it `js-wheels-website` → **Generate**. Copy it.
5. Go put it in Cloudflare (see Secrets above) as `BREVO_API_KEY`. Then add two
   Text variables: `LEAD_NOTIFY_TO` = the inbox that should get messages, and
   `LEAD_NOTIFY_FROM` = the sender email you verified in step 3.
6. Claude then sends a test message through the live form
   (`npm run test:contact`) and asks you to check that inbox, including spam.

---

## Online booking tool (optional)

Only if the shop already uses one (Square Appointments, Calendly, a
shop-management system with online drop-off booking…). Open the tool, find its
**public booking link** or **Share** button, and paste the link in chat (not
secret). Claude puts it in `site.config.ts → booking.url`, and every
"Book a Service" button goes straight there. Blank = the buttons go to the
contact form, which is fine.

---

## Google Search Console (Google's report card for the site — free)

1. search.google.com/search-console → sign in with the Google account that
   owns the shop's Google Business Profile.
2. If the shop's domain is already listed, you're done for now.
3. If not: **Add property** → **URL prefix** → `https://` + your domain →
   **HTML tag** method → copy the `content="..."` code → paste it in the chat
   (not secret). Claude puts it in the site; after launch, click **Verify**.
4. After launch, Claude will ask you to submit the sitemap
   (`https://` your domain `/sitemap-index.xml`) under **Sitemaps**.

While the site is a mock at `jswheels.example.com`, skip this — Google can't
verify a made-up domain.

---

## Cloudflare Turnstile (optional spam shield on the contact form)

Only if spam becomes a problem. Cloudflare → **Turnstile** → **Add widget** →
hostname = your domain (and the `.workers.dev` address) → copy the **Site key**
(paste in chat; not secret) and put the **Secret key** in Cloudflare secrets as
`TURNSTILE_SECRET_KEY`. Both must be set together: the site key goes in
`site.config.ts → contactForm.turnstileSiteKey`; a secret key alone makes every
submission fail.

---

## Domain registrar (only during /launch, with a helper)

Where the shop's domain was bought (GoDaddy, Namecheap, Squarespace Domains…).
Claude finds it with a WHOIS lookup. The owner logs in and confirms each
screen; the technical helper reads which records to change; Claude checks the
result. Email records are never touched.
