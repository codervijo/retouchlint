---
project: retouchlint.com
prd_version: 2
project_version: v1.D
status: active
owner: Vijo
last_updated: 2026-09-18
---

# retouchlint.com — PRD

## 1. Problem

Listing photos are edited as a matter of course — sky replacement, virtual
staging, lawn enhancement, object removal — but photo-disclosure obligations
are tightening (California AB 723, NAR ethics guidance, per-MLS alteration
fields) without a workable definition of "materially altered." Photographers
get asked "did you edit this?" and have no defensible answer; agents carry the
legal obligation but not the edit record. Neither wants to hire a lawyer or
build an archive-and-attestation process from scratch.

## 2. Users

- **Primary (ICP):** real estate photographers and small media companies
  shooting multiple listings a month for agents in states with new or
  unclear photo-disclosure rules. They influence many agents each, which
  makes them the cheapest wedge into the market.
- **Secondary:** listing agents and broker-owners who need the disclosure
  language and the original-photo link to attach to a listing.
- **Later:** small brokerage compliance teams standardizing a packet across
  every listing media delivery.

## 3. Goals & non-goals

**Goals:**
- Be the easiest way to produce a defensible disclosure packet for **one
  listing**: pair original ↔ final, tag the edits, capture photographer
  attestation, emit disclosure language + a public share page.
- Win trust by being **workflow-first, not AI-detector-first** — the value is
  the documented chain of custody, not a probabilistic "was this AI?" verdict.
- Rank for the panic searches (state rules, virtual staging, material
  alteration, MLS compliance) and convert that traffic into packet creation.

**Non-goals:**
- AI-generated-image *detection* or any forensic "is this edited?" claim.
- Legal advice or jurisdiction-specific legal conclusions — the product
  documents what was done and produces disclosure language; it does not tell
  a licensee whether they have met their statutory duty.
- Accounts, server-side persistence, or hosted image archiving in v1 — the
  MVP is entirely client-side (`localStorage`, see `src/lib/store.ts`);
  dropped server pieces are inventoried in `src/lib/server-todo.md`.
- Full MLS/CRM integrations.

## 4. Versions

Two-level versioning convention (canonical: `sites/portfolio/AI_AGENTS.md`):

- `vN` = major capability tier; SemVer-MAJOR semantics.
- `vN.X` = phase letter within a tier; internal slicing.

| Version | Theme | Acceptance |
|---|---|---|
| v0 | scaffold | local builds, CF `wrangler.jsonc` + `public/_headers` in place, repo initialized |
| v1 | single-listing disclosure packet + SEO surface | a photographer can document one listing end-to-end in the browser and get disclosure text + a shareable page; the site's core disclosure content is published, crawlable, and measured in GSC |
| v2 | persistence & multi-listing (undecided — see § 6) | *not scoped* |

## 5. Phases

| Phase | Theme | Features | Status |
|---|---|---|---|
| **v0.A** | scaffolded | `portfolio new bootstrap` ran; standard files written; git initialized | ✅ |
| **v1.A** | packet MVP (client-side) | Astro static app ported from the TanStack Start source: landing, dashboard, `projects/new`, `projects/view`, `share`; `store.ts` with 10 edit tags (material / non-material), pairing, attestation, `disclosureText()` + `recommendation()`; `localStorage` persistence | ✅ live (HTTP 200, serving the real app) |
| **v1.B** | SEO content surface | shipped `5111bf3`. 10 routes: pillar `/real-estate-photo-disclosure/`, `/faq/`, `/blog/` + 7 articles; shared `ArticleLayout.astro` with canonical/OG/Article+FAQPage+BreadcrumbList schema; `links.ts` resolves `linking-map.json` (24 of 44 links live, 20 dropped as dead targets) | ✅ |
| **v1.C** | editorial + legal verification | 13 statutory corrections against the enrolled text of AB 723 and nar.realtor; 2 fabricated quotations removed; 3 FAQ answers rewritten + 1 added; `noindex` and the sitemap filter lifted together | ✅ shipped `5111bf3` |
| **v1.D** | indexing baseline | GSC property `sc-domain:retouchlint.com` verified via DNS TXT; `sitemap-index.xml` submitted; first GSC numbers recorded in `docs/growth.md` | planned |
| **v1.E** | conversion path | route content readers into the packet workflow (in-content CTA → `projects/new`); measure content → packet-start rate | planned |
| **v1.F** | content cadence | execute `content-draft/blog-calendar.md` (12 posts, monthly) against whichever v1.B pages actually earn impressions | planned |

**Current state note:** all 15 routes are in `sitemap-index.xml` and no page
carries a `robots` meta tag. The statutory claims were checked against the
enrolled text of AB 723 (Bus. & Prof. Code § 10140.8) and the NAR Code of Ethics
on nar.realtor on 2026-09-18. `src/__tests__/content.test.js` keeps `noindex`
and the sitemap filter in agreement if either is reintroduced.

**Known gap:** the homepage is a single React island, so its links only exist
after hydration. The content cluster is reachable via the sitemap and via
cross-links between content pages, but nothing in the homepage's server-rendered
HTML points into it. Worth a static link from the landing page before v1.D.

## 6. Open questions

- *(append-only log; mark answered with date but never delete)*
- **2026-09-16 — What is v2?** The MVP is `localStorage`-only, so a packet
  dies with the browser profile and the "original photos available on
  request" promise in the generated disclosure text is not actually backed by
  hosted originals. Candidates: (a) hosted original-image archive + durable
  share URLs, (b) accounts/multi-listing history, (c) stay client-side and
  export a signed ZIP packet. Not decided — do not scope until v1.C gives
  traffic signal.
- **2026-09-16 — Does the share page need to be durable to be credible?**
  `share.astro` renders from local state; a link sent to an agent or buyer
  from a different device has nothing to resolve. This may force (a) above
  earlier than traffic would otherwise justify.
- **2026-09-16 — Content-to-product distance.** The content targets
  photographers researching *rules*; the product asks them to do per-listing
  data entry. Unknown whether that gap converts, which is what v1.D measures.
- **2026-09-18 — RESOLVED (v1.C).** All corrections below were applied and the
  pages are indexable. Original finding retained because it is the reason to
  distrust the next batch of generated content.
- **2026-09-16 — AB 723 was mis-stated throughout the drafts.** Checked against
  the enrolled text: AB 723 is from the **2025–26** session, signed
  **2025-10-10**, effective **2026-01-01**, adding **Bus. & Prof. Code
  § 10140.8**. The drafts said "enacted in 2024" and "effective January 1,
  2025", and claimed the law "doesn't specify *how* disclosure must happen" —
  it does. Three claims were corrected in `pillar.md`; the other 8 files still
  frame the statute around a "material alteration" test the statute does not
  use, and `original-image-access.md` attributes a quotation
  ("substantial, non-cosmetic alteration") that does not appear in the text.
  Fixing this is v1.C and is an editorial call, not a mechanical one.
- **2026-09-16 — The statute requires exactly what the product cannot yet do.**
  § 10140.8 requires a link, URL, or QR code to a *publicly accessible* copy of
  the original unaltered image. That is precisely `share.astro` — except the
  MVP keeps everything in `localStorage`, so a share link does not resolve for
  the agent, the buyer, or anyone on another device. The durable-originals
  question above is therefore not a v2 nicety; it is the compliance artifact the
  law names, and the content pages will be sending readers to a tool that stops
  one step short of it.
