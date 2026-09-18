# Growth Log — retouchlint.com

> **What this file is for:** an honest, append-only log of growth experiments
> on this site — what was tried, what was measured, what happened. The data
> source is GSC; this file narrates *why*. Future-you (or future-Claude)
> reads this when deciding what to try next, both on this site and on
> related sister sites.

## How to use this (workflow — re-read this when you forget)

**Add an entry whenever you do something growth-relevant.** That includes:
shipping new content, structural SEO changes (sitemap, schema, redirects,
internal linking), tech changes that affect crawl/indexing, marketing
pushes, backlink campaigns. *Not* every code commit — just things you'd
want to point at when GSC numbers move (or fail to).

**Each entry is a hypothesis you can be wrong about.** Commit to a
measurable KPI and an observation window before acting — otherwise "did
this work?" is just a feeling.

### Lifecycle of one entry

1. **Day of action** — append a new dated H2 with `Status: active`, the
   hypothesis, the KPI you'll watch, current baseline numbers, what you
   did, and the date to review (default: today + 28 days, matching GSC's
   reporting window).
2. **Review day** — pull current GSC numbers, compute delta vs baseline.
   Fill in **Result** and **Learning**. Set **Status** to `shipped` (worked,
   keep going), `failed` (didn't pay off, abandon), or extend the review
   another window if results are ambiguous.
3. **Never rewrite older entries.** Wrong hypotheses are the most valuable
   data — they tell you what NOT to repeat on the next site. Append, don't
   edit.

### Where to get the numbers

```bash
cd ~/work/projects/sites/portfolio && make run ARGS="gsc sync"
```

Then read the row for `retouchlint.com`. Or pull from
https://search.google.com/search-console directly.

### Format

```
## YYYY-MM-DD — <one-line hypothesis or action>
- **Status:** active | testing | shipped | failed | abandoned
- **Hypothesis:** <what you're betting will work — only on initial / new-bet entries>
- **KPI:** <what GSC metric / query / page>
- **Baseline:** <numbers at start>
- **Action:** <what was done; 1-2 lines>
- **Result:** <numbers after window; "TBD — review YYYY-MM-DD" until then>
- **Learning:** <why it worked / didn't; what to try next; "TBD" until reviewed>
```

---

## 2026-06-06 — New listing-photo disclosure rules will create confusion before…
- **Status:** active
- **Hypothesis:** New listing-photo disclosure rules will create confusion before brokerages standardize their process. RetouchLint can grow by targeting real estate photographers first, because they influence many agents, then expand into brokerage accounts once agents begin requesting packets as part of every listing media delivery.
- **KPI:** any GSC traffic — clicks, impressions, indexed-page count
- **Baseline:** 0 clicks / 0 impressions (just deployed)
- **Action:** project scaffolded via `portfolio new bootstrap`; first deploy pending. After deploy: verify in GSC as `sc-domain:retouchlint.com` and submit the sitemap.
- **Result:** TBD — review 2026-07-04
- **Learning:** TBD

## 2026-09-16 — Publish the disclosure content cluster (built, held at noindex)
- **Status:** active
- **Hypothesis:** A 9-page cluster targeting photographers' panic searches
  (California AB 723, virtual staging, material alteration, MLS compliance,
  attestation, original-image access) will earn the site's first impressions,
  because the product itself has no discovery path — nobody searches
  "RetouchLint."
- **KPI:** indexed-page count, then impressions on the pillar
  `/real-estate-photo-disclosure/` and the 7 `/blog/*` articles
- **Baseline:** 0 clicks / 0 impressions / 0 indexed pages; GSC property not yet
  verified
- **Action:** built the content surface (v1.B) — 10 routes, shared article
  layout, Article/FAQPage/BreadcrumbList schema, 24 resolved internal links.
  **Held at `noindex` and excluded from the sitemap**: fact-checking against the
  enrolled text of AB 723 found the drafts had the wrong session, wrong
  enactment year, wrong effective date, a false claim that the statute is silent
  on *how* to disclose, and one fabricated statutory quotation. Publishing
  incorrect legal claims on a compliance site would cost more than the traffic
  is worth. Three claims corrected in the pillar; the rest is v1.C.
- **Result:** TBD — no measurement possible until v1.C lifts `noindex` and v1.D
  verifies GSC. Review 2026-10-14.
- **Learning:** TBD. Early note: lamill-generated drafts were fluent and
  structurally sound but wrong on every checkable legal specific. Treat
  generated content about regulation as unverified by default — the fluency
  carries no signal about accuracy.

## 2026-09-18 — Content cluster corrected and opened to indexing
- **Status:** active
- **KPI:** indexed-page count, then impressions on the pillar and the 7 articles
- **Baseline:** 0 clicks / 0 impressions / 0 indexed pages; GSC still unverified
- **Action:** completed the v1.C editorial pass — 13 statutory corrections against
  the enrolled text of AB 723 and the NAR Code of Ethics, two fabricated
  statutory quotations removed, three FAQ answers rewritten and one added
  covering the link-to-originals requirement. Lifted `noindex` on all 10 content
  pages and restored them to the sitemap (15 URLs). Fixed the homepage canonical
  to the trailing-slash form so it matches the sitemap and `og:url`.
- **Result:** TBD — review 2026-10-16, after GSC verification (v1.D).
- **Learning:** TBD. The correction pass found that the drafts inverted the
  statute's own test in several places — telling photographers to disclose
  colour correction and exposure, which AB 723 expressly excludes, while
  treating object removal as safe. Fluent generated content can be confidently
  backwards, not just vague.
