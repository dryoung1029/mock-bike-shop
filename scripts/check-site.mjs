#!/usr/bin/env node
/**
 * Site-kit doctor. Complements `jeldon doctor` (which checks the content
 * engine) by checking everything the /setup wizard is supposed to fill in.
 * Exit 0 = ready to launch. Warnings are listed but don't fail.
 */
import { readFile, readdir } from 'node:fs/promises';

const ok = (m) => console.log(`✔ ${m}`);
const warn = (m) => (warnings++, console.log(`⚠ ${m}`));
const bad = (m) => (errors++, console.log(`✖ ${m}`));
let errors = 0;
let warnings = 0;

const siteSrc = await readFile('site.config.ts', 'utf8');
const packSrc = await readFile('jeldon.config.ts', 'utf8');

// 1. SETUP markers (owner still has to decide) and SAMPLE markers (demo data) left behind
const count = (s) => (s.match(/SETUP:/g) || []).length;
const countSample = (s) => (s.match(/SAMPLE:/g) || []).length;
let sampleMarkers = countSample(siteSrc) + countSample(packSrc);
const openMarkers = count(siteSrc) + count(packSrc);
let contentMarkers = 0;
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(md|astro|json)$/.test(e.name)) out.push(p);
  }
  return out;
}
for (const dir of ['src/content', 'src/pages']) {
  for (const f of await walk(dir)) {
    const src = await readFile(f, 'utf8');
    contentMarkers += count(src);
    sampleMarkers += countSample(src);
  }
}
for (const f of ['public/brand/logo.svg']) sampleMarkers += countSample(await readFile(f, 'utf8').catch(() => ''));
if (openMarkers === 0) ok('no SETUP markers left in site.config.ts / jeldon.config.ts');
else warn(`${openMarkers} SETUP marker(s) still in site.config.ts / jeldon.config.ts (run /setup to fill them)`);
if (contentMarkers === 0) ok('no SETUP markers left in services, team, pages');
else warn(`${contentMarkers} SETUP marker(s) still in content or pages`);
if (sampleMarkers === 0) ok('no SAMPLE (demo) data left');
else warn(`${sampleMarkers} SAMPLE marker(s): demo data (address, phone, prices, team…) — fine for the mock site, replace before real use`);

// 2. Things the owner must confirm before launch
if (/hoursConfirmed:\s*true/.test(siteSrc)) ok('hours shown on the site'); else warn('hours not confirmed (footer says "call for hours" until they are)');
if (/booking:\s*\{\s*url: '[^']+'/.test(siteSrc)) ok('online booking link set'); else warn('no online booking link — "Book a service" buttons go to the contact form (that is fine)');
if (/cloudflareToken: '[^']+'/.test(siteSrc)) ok('Cloudflare Web Analytics token set'); else warn('no Cloudflare Web Analytics token — no traffic data will be collected');
if (/placeId: ''/.test(packSrc)) warn('Google place ID blank (needed for local-rank tracking later; not needed to launch)'); else ok('Google place ID set');

// 3. Secrets for the live site (checked as env here; on Cloudflare they live in the dashboard)
const env = process.env;
const secretsDoc = 'set in Cloudflare → Workers & Pages → js-wheels-site → Settings → Variables and Secrets';
if (!env.BREVO_API_KEY) warn(`BREVO_API_KEY not set in this environment (${secretsDoc}). Secrets live in Cloudflare, so the real check is \`npm run test:contact -- <live url>\` — /launch requires it to pass.`);
else ok('contact-form email (Brevo) configured');

// 4. Content sanity
const articles = (await readdir('src/content/articles')).filter((f) => f.endsWith('.md'));
let live = 0;
for (const f of articles) if (!/^draft:\s*true/m.test(await readFile(`src/content/articles/${f}`, 'utf8'))) live++;
if (live > 0) ok(`${live} published article(s)`); else warn('no published articles yet (the seed article is a draft until the owner approves it)');

console.log(`\n${errors ? '✖' : '✔'} check:site — ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
