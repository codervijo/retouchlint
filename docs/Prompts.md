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
