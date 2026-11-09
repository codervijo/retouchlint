# Prompt History — retouchlint.com

<!-- Append new prompts at the bottom, newest last. Format:

## YYYY-MM-DD [optional title]
> <prompt text or short summary>

The dated H2 (`## YYYY-MM-DD`) is what `portfolio project check` parses
to surface "last AI prompt" per project. Keep entries append-only.
-->

## 2026-06-06 — scaffolded via portfolio new bootstrap

> Created project skeleton. Stack chosen, scaffolding written, git initialized.

## 2026-09-16 — v1.B content surface

> "ship v1.B" — publish the `content-draft/` articles as real Astro routes.
> Built 10 routes (pillar + FAQ + blog index + 7 articles), shared
> `ArticleLayout.astro`, schema, and a link resolver over `linking-map.json`.
> Fact-checking AB 723 against the enrolled text found the drafts materially
> wrong on the statute; pages ship `noindex` + out of sitemap until the
> editorial pass (v1.C).

## 2026-09-18 — v1.C editorial pass, content opened to indexing

> "move to push as much as possible" — completed the statutory corrections,
> lifted `noindex` + sitemap filter together, fixed the homepage canonical.
> Suite green (16 tests), build clean (15 pages). Not committed.

## 2026-09-18 — pushed v1.B + v1.C

> "commit and push it" — committed as `5111bf3` and pushed to `origin/main`,
> which triggers the Cloudflare Git-integration build. 25 files, +6203/-14.
> Left out of the commit deliberately: `lamill.toml` (mode 600, tooling state),
> the `.lamill-translation-pending` deletion, and `content-draft/` (now a stale
> duplicate of `src/content/`).

## 2026-09-30 — v1.E SEO basics + AB 723 positioning

> Operator spec: noindex app routes, OG image, retarget homepage to "AB 723 listing
> photo disclosure" (AB 723, § 10140.8, CRMLS 11.5.2), "Powered by" on share pages,
> fix `.app` mock domain + Brokerage CTA, build `/tools/disclosure-generator/`; one
> commit per item; future items appended to PRD § 7 SEO Roadmap. Also: "don't make me
> submit sitemap manually: use lamill". Built and committed (not pushed); Brokerage
> contact = hello@lamill.io (operator choice — retouchlint.com has no MX).

## 2026-09-30 — v1.F claims accuracy

> "fix the packet disclosure text and features overclaims" — packet text rewritten to
> § 10140.8(a)(1) shape with a per-packet originals URL; in-app and landing claims
> matched to what the client-side MVP does. Pricing tier lists left for operator
> (billing out of scope). "commit and push".

## 2026-09-30 — end of session

> "let us call it a day" / "save any incomplete work into PRD and other docs" — pending
> list recorded in `docs/prd.md` § 6 (2026-09-30 end-of-session entry); `AI_AGENTS.md`
> post-deploy checklist updated; lamill sitemap-fallback bug logged as BUG-092 in
> `sites/portfolio/docs/bugs.md`. Docs edits left uncommitted pending operator.

## 2026-11-08 — growth reviews (v1.C content, v1.E homepage)

> "do the growth reviews" — pulled GSC query/page data (through 2026-11-06) and filled
> Result/Learning in `docs/growth.md`. Indexing met (10/10); 55 imp / 0 clicks / pos 29.9
> (28d); no statute-specific query traction. Both entries extended to 2026-12-06.

## 2026-11-08 — 10x impressions plan (v1.G–v1.K renumber)

> "how do we expand impressions 10x? use tregs and data to make the plan" — keyword volume,
> SERPs and backlinks via treg ($0.16). Finding: the niche is ~520 US searches/mo; DA 3 is the
> first gap. Operator chose option A, all three phases: v1.G backlinks, v1.H MLS photo
> requirements hub, v1.I virtual-staging legality + edit types; conversion → v1.J, content
> cadence → v1.K. PRD updated; no code.

## 2026-11-08 — v1.G started (backlinks)

> "commit the docs and start v1.G" — committed `74b65d6`. Found link targets via treg SERP
> + DataForSEO (~$0.03): 6 California MLS/association AB 723 pages, 4 photographer pages,
> r/RealEstatePhotography. Current 29 referring domains are all spam. Wrote
> `docs/outreach.md` (targets, honest-claims guardrail, 2 pitch templates, tracker).
> Operator sends; contact addresses not yet looked up.

## 2026-11-08 — virtual staging keyword data, v1.I narrowed

> "with tregs, find some data around virtualstaging and related keywords" — 125 keywords via
> DataForSEO ($0.09). Legality/disclosure terms ≤10/mo or unreported; state variants all
> unreported; head terms are vendor SERPs and declining. "yes, update v1.I in the PRD" — v1.I
> is now one consolidated legality/meaning page + per-edit-type pages; per-state pages dropped.
