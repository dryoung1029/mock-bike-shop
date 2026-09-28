---
description: Mine Reddit and similar forums for the real questions people ask about bike repair, maintenance, e-bikes, and riding in the owner's town, and turn them into an article idea list.
---

# /reddit-ideas — what riders are actually asking

No Reddit account or API needed. Use WebSearch with queries like:

- "reddit <his town> bike shop", "reddit <his town> bike repair", "reddit
  <his town> bike commute" (use his real town from `site.config.ts`; if the
  address is still the `SAMPLE:` Anytown, ask him which town to use, or skip
  the local queries)
- "reddit how often tune up bike", "reddit is a bike tune-up worth it",
  "reddit when to replace bike chain", "reddit keep getting flat tires",
  "reddit squeaky disc brakes", "reddit wheel wobble true", "reddit is a bike
  fit worth it", "reddit e-bike battery care winter", "reddit e-bike repair
  shop won't work on", "reddit used bike what to check", "reddit first bike
  commuter beginner"
- Subreddits that matter: r/bikewrench (the repair questions), r/bicycling,
  r/cycling, r/whichbike (buying questions), r/ebikes, and his local city
  subreddit (ask him which one, or WebSearch "r/<town>").

Open the promising threads with WebFetch. You're looking for the **question
underneath the post** and the phrases people use (those are the search terms).
Skip anything a mechanic couldn't honestly answer without seeing the bike
(crash damage, cracked carbon, a swollen or damaged battery) — or turn it into
a "when to bring it in for an inspection" idea instead. Never an idea about
bypassing e-bike speed limits or modifying batteries.

Write `data/reddit/ideas-<date>.md`:

| # | Working title (a question) | Search phrase(s) people use | Category | Tags | Why it fits J's Wheels | Evidence angle (what source you'd cite) |

Ten rows, best first. "Best" = lots of people ask it + we can answer it
honestly + it's close to what the shop sells (tune-ups, repairs, wheel work,
fittings, e-bike service). Category and tags come from `jeldon.config.ts →
content`. Mark any that are local to his town (those rank fastest). Note
thread URLs at the bottom so the reasoning can be checked.

Then in chat: the top three as one line each, and "Type `/article <number>`
to write one." (`/article` reads this file.)

Rules: quote nothing from Reddit in an article. Never use a real person's
story from a thread. The list is inspiration, not content.
