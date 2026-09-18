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
