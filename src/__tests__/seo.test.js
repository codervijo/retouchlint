// src/__tests__/seo.test.js
// Technical-SEO regression check for Astro. Reads src/pages/index.astro,
// strips frontmatter, asserts the v3.B SEO baseline tags remain.

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const raw = readFileSync(join(process.cwd(), 'src', 'pages', 'index.astro'), 'utf8');
// Strip frontmatter (between leading `---` markers) so we just check the HTML body.
const html = raw.replace(/^---[\s\S]*?---\n/, '');

describe('SEO baseline (src/pages/index.astro)', () => {
  it('has a <title>', () => {
    expect(html).toMatch(/<title>/);
  });

  it('has <meta name="description">', () => {
    expect(html).toMatch(/<meta\s+name="description"/);
  });

  it('has <link rel="canonical">', () => {
    expect(html).toMatch(/<link\s+rel="canonical"/);
  });

  it('has Open Graph tags', () => {
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:url"/);
  });

  it('has Twitter card meta', () => {
    expect(html).toMatch(/name="twitter:card"/);
  });

  it('has favicon link', () => {
    expect(html).toMatch(/<link\s+rel="icon"[^>]*href="\/favicon\.svg"/);
  });

  it('has JSON-LD Organization + WebSite', () => {
    expect(html).toMatch(/application\/ld\+json/);
    expect(html).toMatch(/"@type":\s*"Organization"/);
    expect(html).toMatch(/"@type":\s*"WebSite"/);
  });
});

describe('social cards (every head template)', () => {
  const heads = ['src/pages/index.astro', 'src/layouts/Layout.astro', 'src/layouts/ArticleLayout.astro'];

  it('uses summary_large_image with the 1200x630 OG image', () => {
    for (const f of heads) {
      const src = readFileSync(join(process.cwd(), f), 'utf8');
      expect(src, f).toMatch(/name="twitter:card" content="summary_large_image"/);
      expect(src, f).toMatch(/property="og:image" content="https:\/\/retouchlint\.com\/og-image\.png"/);
      expect(src, f).toMatch(/name="twitter:image"/);
    }
  });

  it('the OG image file is 1200x630', () => {
    const png = readFileSync(join(process.cwd(), 'public', 'og-image.png'));
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });
});

describe('homepage AB 723 positioning', () => {
  const landing = readFileSync(join(process.cwd(), 'src', 'components', 'Landing.tsx'), 'utf8');

  it('title and description target AB 723 listing photo disclosure', () => {
    const title = raw.match(/const title = "([^"]+)"/)[1];
    const desc = raw.match(/const description = "([^"]+)"/)[1];
    expect(title).toMatch(/AB 723 Listing Photo Disclosure/);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(desc.length).toBeLessThanOrEqual(155);
  });

  it('names AB 723, § 10140.8, CRMLS 11.5.2 and California on the page', () => {
    for (const s of ['AB 723', '10140.8', 'CRMLS Rule 11.5.2', 'California']) expect(landing).toContain(s);
  });

  it('emits FAQPage schema from the same data the page renders', () => {
    expect(raw).toMatch(/"@type": "FAQPage"/);
    expect(raw).toContain('HOME_FAQ.map');
    expect(landing).toContain('HOME_FAQ.map');
  });
});
