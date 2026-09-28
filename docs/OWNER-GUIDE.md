# Your website, in plain English

A map of what's where, so you can ask Claude for changes in your own words.
You never need to open these files yourself.

## The pages

| Page | Address | What's on it |
|---|---|---|
| Home | `/` | The big pitch, what we fix, how booking works, FAQ, map |
| Services | `/services/` | The six services. Each has its own page under `/services/...` (tune-ups, flat tire repair, overhauls, wheel truing, bike fitting, e-bike service) |
| Pricing | `/pricing/` | The repair price list |
| Book a Service | `/book-service/` | The page everything points to. How drop-off and booking work + the "Book a Service" button |
| Team | `/team/` | Everyone in the shop with a bio and photo |
| Blog | `/blog/` | Articles. Only published ones show |
| Contact | `/contact/` | The form, phone, email, map |
| FAQ, About | `/faq/`, `/about/` | Questions, the shop's story |
| Privacy, Terms | `/privacy/`, `/terms/` | The fine print |

There's also `/thanks/` (shown after someone sends the form), a "page not
found" page, and `/llms.txt` (a short summary of the shop for AI tools).

## Where the facts live

- **Hours, phone, email, address, repair prices, booking link, social links**
  → one file, `site.config.ts`. Say "change Saturday hours to 9–3" and Claude
  edits it.
- **Service descriptions** (what's included, price, turnaround time, FAQs) →
  one file per service in `src/content/services/`.
- **Team bios** → one file per person in `src/content/team/`.
- **FAQ questions** → `src/content/faqs.json`.
- **Blog articles** → one file per article in `src/content/articles/`.
  An article with `draft: true` is invisible to visitors.
- **Photos** → type `/photos`. Claude gives you one link; you pick photos from
  your phone or computer, tap Commit, say "done". Claude shrinks them, writes
  the descriptions, and puts them on the right pages.
- **Logo** → `public/brand/logo.svg`. Claude rebuilds the little browser icon
  and the share picture from it whenever it changes.
- **Who you are, how you write, what the articles should sound like** →
  `jeldon.config.ts`. Claude fills this in during `/setup`.

## Sample data

Right now most business facts are made up so the demo looks real: the address
(214 Spoke Street, Anytown), the phone (555) 010-0142, the prices, the hours,
and the team. Each one is marked `SAMPLE:`. Things you still need to decide
are marked `SETUP:`. Ask Claude "what's still sample?" any time.

## How a change goes live

1. You ask Claude for the change.
2. Claude edits the file, checks that the site still builds, and saves ("commits") it.
3. Cloudflare notices and rebuilds the site. About a minute.
4. You refresh the page.

Nothing you ask for can break the live site without Claude noticing first,
because the site is rebuilt from scratch every time and a broken build doesn't
go out.

## What the "scores" mean

When Claude writes an article it reports two numbers:

- **Search readiness** — title length, description, headings, links, reading
  level. Google basics.
- **AI-citation readiness (GEO)** — does the article have the things AI
  answer engines (ChatGPT, Perplexity, Google's AI answers) tend to quote:
  real facts, a source you can click, a mechanic's first-person experience,
  headings phrased as questions. Each article has a target (70–80 depending on the
  type). Below target, Claude improves it; but your voice always wins over the number.

## Things that need you

- Approving every article before it goes live (`/publish`).
- Confirming any business fact (hours, prices, turnaround times, who's on the team).
- Clicking around in Cloudflare and Brevo when Claude asks.
- The domain switch, with a helper on the call.

## Things you never have to do

- Use a terminal. Run commands. Edit code. Fix a broken build. Remember file names.
