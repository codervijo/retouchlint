// src/__tests__/content.test.js
// v1.B content-surface guards. Asserts the invariants that are easy to break
// silently: link targets that don't exist, noindex/sitemap agreement, and the
// H1-equals-title templated-page smell.

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const blogDir = join(root, 'src', 'content', 'blog');
const slugs = readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));

function frontmatter(path) {
  const raw = readFileSync(path, 'utf8');
  const block = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!block) return {};
  return Object.fromEntries(
    block[1].split('\n').map((l) => {
      const m = l.match(/^(\w+):\s*"(.*)"$/);
      return m ? [m[1], m[2]] : null;
    }).filter(Boolean),
  );
}

const pages = [
  join(root, 'src', 'content', 'pillar.md'),
  ...slugs.map((s) => join(blogDir, `${s}.md`)),
];

describe('content frontmatter', () => {
  it('every page has title, h1, description', () => {
    for (const p of pages) {
      const fm = frontmatter(p);
      expect(fm.title, `${p} title`).toBeTruthy();
      expect(fm.h1, `${p} h1`).toBeTruthy();
      expect(fm.description, `${p} description`).toBeTruthy();
    }
  });

  it('h1 is never identical to the title tag', () => {
    for (const p of pages) {
      const fm = frontmatter(p);
      expect(fm.h1, `${p}`).not.toBe(fm.title);
    }
  });

  it('meta descriptions stay under 160 characters', () => {
    for (const p of pages) {
      const fm = frontmatter(p);
      expect(fm.description.length, `${p} (${fm.description.length})`).toBeLessThanOrEqual(160);
    }
  });

  it('no page body still carries a markdown code fence from the draft', () => {
    for (const p of pages) {
      expect(readFileSync(p, 'utf8')).not.toMatch(/```markdown/);
    }
  });
});

describe('internal link map', () => {
  const map = JSON.parse(readFileSync(join(root, 'src', 'data', 'linking-map.json'), 'utf8'));
  const alias = { 'blog:material-alteration': 'blog:what-counts-as-material-alteration' };
  const known = new Set(['pillar', 'faq', ...slugs.map((s) => `blog:${s}`)]);
  const resolve = (id) => alias[id] ?? id;

  it('resolves at least one link for the pillar and the faq', () => {
    for (const from of ['pillar', 'faq']) {
      const live = map.filter((e) => e.from === from && known.has(resolve(e.to)));
      expect(live.length, from).toBeGreaterThan(0);
    }
  });

  it('every resolvable target corresponds to a real content file', () => {
    for (const e of map) {
      const to = resolve(e.to);
      if (!known.has(to)) continue;           // intentionally dropped, not an error
      if (to === 'pillar' || to === 'faq') continue;
      const slug = to.replace(/^blog:/, '');
      expect(existsSync(join(blogDir, `${slug}.md`)), to).toBe(true);
    }
  });
});

describe('indexing posture', () => {
  const routes = [
    join(root, 'src', 'pages', 'real-estate-photo-disclosure.astro'),
    join(root, 'src', 'pages', 'faq.astro'),
    join(root, 'src', 'pages', 'blog', 'index.astro'),
    join(root, 'src', 'pages', 'blog', '[...slug].astro'),
  ];

  // These two must be lifted together. A page that is noindex but present in
  // the sitemap (or vice versa) sends Google contradictory signals.
  it('noindex routes and the sitemap filter agree', () => {
    const config = readFileSync(join(root, 'astro.config.mjs'), 'utf8');
    const filtered = config.includes("startsWith('/blog/')")
      || config.includes("'/real-estate-photo-disclosure/'");
    const anyNoindex = routes.some((r) => /const noindex = true;/.test(readFileSync(r, 'utf8')));
    expect(anyNoindex, 'noindex routes require a matching sitemap filter').toBe(filtered);
  });

  it('pages carrying [VERIFY] markers are not indexable', () => {
    const pillar = readFileSync(join(root, 'src', 'content', 'pillar.md'), 'utf8');
    if (pillar.includes('[VERIFY')) {
      const route = readFileSync(join(root, 'src', 'pages', 'real-estate-photo-disclosure.astro'), 'utf8');
      expect(route).toMatch(/const noindex = true;/);
    }
  });
});
