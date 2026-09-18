// src/lib/links.ts — resolves content-draft/linking-map.json into real URLs.
//
// The map was authored against a 11-post plan (see content-draft/blog-calendar.md);
// only 7 supporting drafts exist. Links whose target has no page are DROPPED
// rather than shipped as internal 404s. `MISSING_TARGETS` is the list to
// revisit when those posts get written.
import rawMap from "../data/linking-map.json";

export type PageNode = { url: string; label: string };
export type Related = { url: string; anchor: string };

type MapEntry = { from: string; to: string; anchor_text: string };

/** The map calls this post `material-alteration`; the draft is filed under its
 *  fuller, keyword-matching slug. */
const ALIASES: Record<string, string> = {
  "blog:material-alteration": "blog:what-counts-as-material-alteration",
};

export const BLOG_SLUGS = [
  "california-real-estate-photo-disclosure",
  "listing-photo-disclosure",
  "mls-edited-photo-compliance",
  "original-image-access",
  "photographer-attestation",
  "virtual-staging-disclosure-rules",
  "what-counts-as-material-alteration",
] as const;

export const PILLAR_URL = "/real-estate-photo-disclosure/";
export const FAQ_URL = "/faq/";
export const BLOG_INDEX_URL = "/blog/";

const PAGES: Record<string, PageNode> = {
  pillar: { url: PILLAR_URL, label: "Real estate photo disclosure" },
  faq: { url: FAQ_URL, label: "Disclosure FAQ" },
  ...Object.fromEntries(
    BLOG_SLUGS.map((s) => [`blog:${s}`, { url: `/blog/${s}/`, label: s }]),
  ),
};

function resolve(id: string): PageNode | undefined {
  return PAGES[ALIASES[id] ?? id];
}

const map = rawMap as MapEntry[];

/** Targets referenced by the link map that have no page yet. */
export const MISSING_TARGETS = [
  ...new Set(map.map((e) => e.to).filter((t) => !resolve(t))),
].sort();

/** Outbound links for a page id, siblings + hub, dead targets removed. */
export function relatedFor(id: string): Related[] {
  const seen = new Set<string>();
  const out: Related[] = [];
  for (const e of map) {
    if (e.from !== id) continue;
    const node = resolve(e.to);
    if (!node || seen.has(node.url)) continue;
    seen.add(node.url);
    out.push({ url: node.url, anchor: e.anchor_text });
  }
  return out;
}

export function idForSlug(slug: string): string {
  return `blog:${slug}`;
}
