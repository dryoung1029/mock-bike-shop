---
description: Write a new blog article in the owner's voice — researched, sourced, scored by the content engine, saved as a draft for his review.
---

# /article — draft a blog post

Read `CLAUDE.md`, `jeldon.config.ts` (voice, content, scoring, citation), and
`docs/VOICE-SAMPLES.md` if it exists. The output is a Markdown file in
`src/content/articles/` with `draft: true`. Only `/publish` makes it live.

## 1. Pick the topic (with him, briefly)

If he gave a topic in the command (`/article when to replace a chain`), use it.
Otherwise offer three from `data/reddit/ideas-*.md` (newest) or, if none, three
you propose from the `aeo.querySet` and `content.tags` in `jeldon.config.ts`.
One message, three bullets, "which one, or something else?"

Then ask exactly two questions:
1. "What do you actually tell customers about this at the counter?" (his real
   take — this is what makes it his)
2. "Anything you want to make sure is in it, or kept out?"

## 2. Research (you, silently)

- WebSearch the topic. Prefer primary sources: manufacturer service manuals
  and tech docs (Shimano, SRAM), Park Tool's repair help, Sheldon Brown,
  CPSC (recalls, bike and e-bike battery safety), NHTSA, the League of
  American Bicyclists, PeopleForBikes, university or government pages. Aim for
  3–5 references.
- Open each source with WebFetch and note the specific finding you'll cite,
  with numbers where they exist (chain-wear limits, tire pressures, service
  intervals). If a source doesn't say it, don't cite it.
- Check what the top three ranking pages for the query do, so the article can
  be clearly better: more specific, more local, more honest, more useful.

## 3. Write it

Follow `voice.persona` and `voice.rules` exactly. Structure that scores well
**and** reads well (both matter; voice wins ties):

- Title 40–60 characters that contains the question people search.
- `excerpt` 120–160 characters that answers the question in one line.
- Open by answering the question in the first two sentences.
- 700–1,500 words. Reading level grade 6–9 (short sentences, common words).
- 3–6 H2s written as questions where natural ("How often should…?").
- First person from the repair stand: "when I overhaul a bike", "in our shop",
  "what I tell customers".
- Real numbers from the sources, stated plainly. One short attributed quote
  from a source is good; a fake quote is a firing offense.
- Two internal links (`/services/...`, `/pricing/`, `/book-service/`, `/faq/`,
  another `/blog/...`).
- One plain next step at the end (book a service, stop by the shop, read a
  related post).
- A `## References` section: `Author or org, year. Description. [link](URL)`.
- Frontmatter: `category` from `content.categories` (guide, maintenance, gear,
  riding, community), 3–6 `tags` from `content.tags`, `author`/`authorSlug` =
  `jason`, `draft: true`, `publishDate` = today,
  `docNotes: "Drafted by /article on <date>; sources verified <date>"`.
- **Safety framing.** General education from a mechanic. Never promise a
  repair or a check makes a bike "safe". For brakes, frame or fork damage,
  carbon parts, crashes, and e-bike batteries, tell readers to bring the bike
  in for an inspection rather than judging it from home. For recalls, point to
  the manufacturer and CPSC. Never explain how to bypass an e-bike speed
  limiter or modify a battery.

## 4. Verify and score (you)

```
npm run check:frontmatter -- src/content/articles/<slug>.md
npm run check:citations   -- src/content/articles/<slug>.md
npm run check:geo         -- src/content/articles/<slug>.md
```
Also run the SEO scorer directly (see `docs/JELDON.md` → "Score one file") and
look at the `meh`/`bad` checks. If GEO is below the category target, improve
the weak check **without** flattening the voice — add a real number from a
source, a question heading, a first-person line. If a fix would make it sound
like a manual, leave the score where it is and say so.

Re-open every reference link one more time. Confirm each says what the
article says it says.

## 5. Hand it to him

Commit the draft ("Draft: <title>"). Then, in chat:

- The title and excerpt.
- The full article text (so he can read it right here — he may be on his phone).
- A three-line scorecard in plain words: "Search readiness: good. AI-citation
  readiness: 82 (target 80). Reading level: grade 7."
- "Read it like a customer would. Tell me anything that doesn't sound like you
  and I'll change it. When it's right, type `/publish <slug>`."

Apply his edits as conversation ("make the second section shorter", "I'd never
say 'drivetrain optimization'"). Each round: edit, re-score, show the changed
part only.

## Never

- Never publish. Never set `draft: false` here.
- Never cite a source you haven't opened.
- Never invent a customer story, a repair he did, or a statistic. General
  framing only, unless he gives you a real story and says it's okay to use.
- Never name a competitor shop critically.
- Never tell a reader their bike is safe to ride.
