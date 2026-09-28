# START HERE — your new website, step by step

Hi Jason. This is the setup sheet for the J's Wheels website. You don't need
to know anything technical. There are four short steps to get to the point
where Claude takes over and asks you questions. Do them in order.

It starts as a **demo**: the address, phone number, prices, and team are
made-up samples (marked `SAMPLE:` inside the files). Setup swaps them for your
real details, one question at a time.

## What you're setting up (the one-minute version)

- **GitHub** holds the website's files, like a Google Drive folder for websites.
- **Claude Code** is Claude with hands: it edits those files for you when you ask.
- **Cloudflare** turns the files into a live website, for free, every time
  something changes. (You'll set that up later, with Claude walking you through it.)

You do the clicking in websites; Claude does everything else.

## Step 1 — Make a free GitHub account (3 minutes)

1. Go to **github.com** and click **Sign up**.
2. Use your shop email. Pick any username (for example `jswheels`).
3. Confirm the email GitHub sends you.

## Step 2 — Get your copy of the website (1 minute)

The files live here: **https://github.com/dryoung1029/mock-bike-shop**

- If that's your own account, you already have it. Skip to Step 3.
- If not, open the link and click the green button near the top right that
  says **Use this template** (or **Fork**), then **Create a new repository**.
  Name it `mock-bike-shop`, choose **Private**, and click **Create repository**.

You now have your own copy. Nobody else can see it.

## Step 3 — Open it in Claude Code (2 minutes)

1. Go to **claude.ai/code** (or open Claude Code in the Claude app).
2. It will ask to connect to GitHub. Say yes, and allow it to see
   `mock-bike-shop`.
3. Pick `mock-bike-shop` as the repository to work in.

## Step 4 — Say the magic word

In the message box, type:

```
/setup
```

Claude will introduce itself and start asking you questions — your hours,
your repair prices, who's on the team, how you describe the shop, that kind of
thing. One question at a time. When a step needs you to click around in a
website (Cloudflare, Brevo), Claude tells you exactly what to click and waits.

## Good to know

- **You can stop any time.** Type `stop`. Next time, type `/setup` again and
  it picks up where you left off.
- **Nothing is on a real domain until you say so.** The site builds at a
  practice address first (ending in `.workers.dev`). Putting it on your real
  web address is the very last step, done with a helper on the call.
- **Never paste passwords or API keys into the chat.** Claude will tell you the
  exact place in Cloudflare to put them instead.
- **Type `/help`** any time to see everything Claude can do for the site.
- **Plan on 3–4 short sessions**, not one long one. The site is ready to show
  people after the second.

## If something looks wrong

Tell Claude "I'm stuck" and describe what's on your screen. That's it. If
Claude can't sort it out, ask your technical helper.
