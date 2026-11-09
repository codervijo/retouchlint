---
project: retouchlint.com
prd_version: 2
project_version: v1.F
status: active
owner: Vijo
last_updated: 2026-11-08
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
| **v1.D** | indexing baseline | GSC property `sc-domain:retouchlint.com` verified via DNS TXT; `sitemap-index.xml` submitted; first GSC numbers recorded in `docs/growth.md` | ✅ 2026-09-30 (12 imp / 0 clicks / pos 6.0, 28d) |
| **v1.E** | SEO basics + AB 723 positioning | app routes (`/dashboard/`, `/projects/*`, `/share/`) `noindex` + out of sitemap; 1200×630 OG image + `summary_large_image`; homepage retargeted to "AB 723 listing photo disclosure" (names AB 723, § 10140.8, CRMLS Rule 11.5.2, California) with server-rendered law section + FAQPage schema; "Powered by RetouchLint" link on the public original-photo page; mock-UI domain → `.com`, Brokerage CTA → real contact; free no-login `/tools/disclosure-generator/` ending in a packet CTA | ✅ shipped 2026-09-30 (`ba35da9`…`e1ccb85`, pushed `c040d96`) |
| **v1.F** | claims accuracy | packet `disclosureText()` rewritten to § 10140.8(a)(1) shape (altered + where originals can be accessed) with a per-packet `originalsUrl`; exempt-only edits cite (b)(2); in-app labels match reality ("Download disclosure text (.txt)", originals "stored in this browser", share page "opens only here"); landing Features / badge bar / workflow copy drop permanent-link, PDF, C2PA, NAR claims. Pricing tier lists untouched (billing out of scope) | ✅ shipped 2026-09-30 |
| **v1.G** | authority (backlinks) | operator-run link outreach: photographer communities, MLS vendor/resource directories, California Realtor associations and MLSs already publishing AB 723 guidance (e.g. SDMLS, PFAR); the free `/tools/disclosure-generator/` is the linkable asset. Claude prepares the target list, pitch copy, and per-target landing URL. KPI: Moz DA above 3 (baseline DA 3, 13 referring domains / 6 nofollow, 2026-11-08; DataForSEO lists 29 referring domains, all spam) and existing content pages reaching page 1. Target list + pitches in `docs/outreach.md` | 🔨 in progress — 11 targets drafted 2026-11-08; awaiting operator sends |
| **v1.H** | MLS photo requirements hub | one hub page covering MLS photo specs (size, aspect ratio) + alteration/disclosure rules, plus per-MLS pages (§ 7 pSEO: CRMLS, SDMLS, …), each citing that MLS's own rules document and passing a v1.C-style primary-source check before indexing. Folds in the v1.K content-cadence slot for this topic | ✅ deployed 2026-11-08 (`4438996`) — hub `/mls-photo-requirements/` + CRMLS, MLSListings, Bay East pages; sources quoted in `docs/mls-sources.md`. SDMLS hub-only (no published rule text). **Photo specs (size, aspect ratio) not covered:** no California MLS publishes them in its rules (CRMLS Rules & Policies has none); they come from the listing software |
| **v1.I** | virtual-staging legality + edit types | **one** consolidated page: "is virtual staging legal / do you have to disclose it", also answering "what does virtually staged mean" and "digitally staged" (reachable pool ≈ 400–500 US searches/mo: "digital staging"/"digitally staged" 210, "what is virtual staging" 110, "virtually staged photos" 90, "virtual staging meaning" 90, "virtually staged meaning" 70, "digitally altered photos" 50, plus ~10/mo each for legal / disclosure / disclaimer / watermark variants) + § 7 per-edit-type pages ("Is [sky replacement / virtual staging / …] allowed under AB 723?"). **Per-state pages dropped** (2026-11-08): all 13 "is virtual staging legal in {state}" variants measured show no reportable volume. Head terms ("virtual staging" 4,400, "virtual staging ai" 2,900, KD 26–37) not targeted — vendor product SERPs; the group fell ~50–60% Oct 2025 → Sep 2026. Statute claims get a v1.C-style primary-source check | 🔨 in progress 2026-11-08 — split by audience (operator: "do 1 and 3"): buyer/renter page `/virtually-staged-meaning/` ("virtually staged meaning" 70 + "what does virtually staged mean" 70/mo, Sep 140+90, rising) and the agent-facing legality/disclosure page = rewrite of `/blog/virtual-staging-disclosure-rules/` (v1.J). Per-edit-type pages still to do. `/virtually-staged-meaning/` deployed 2026-11-08 (`a21822e`) |
| **v1.J** | retarget existing pages | rewrite pages that rank on page 3–9 for terms they can't win toward specific queries: `/blog/california-real-estate-photo-disclosure/` → "AB 723" explainer incl. the AB 2025 amendments ("ab 723" 90/mo avg, 260 at Dec–Jan peak); `/blog/virtual-staging-disclosure-rules/` → "is virtual staging legal / do you have to disclose it". Slugs kept (indexed). Statute claims checked against `docs/law-sources.md` | ✅ deployed 2026-11-08 (`a21822e`) — both posts rewritten; also replaced unsourced "other states are adopting" lines in 3 posts with the NY/DC facts |
| **v1.K** | disclosure-law tracker (linkable asset) | `/laws/` tracker of listing-photo disclosure laws and bills (status, scope, what each requires, status-checked date) + one page per jurisdiction: California rentals (AB 2025 → Civ. Code § 1940.11, chaptered 2026-09-27, effective 2027-01-01), New York A11635 (in committee), Washington DC B26-0858 (introduced). Built before passage on purpose (operator 2026-11-08: waiting until a bill passes is too late). Generator gets a rental mode for § 1940.11. Sources: `docs/law-sources.md` | ✅ deployed 2026-11-08 (`a21822e`) — `/laws/` + `california-rentals/`, `new-york/`, `washington-dc/`; generator "For rent" mode + "fully AI-generated" option (no original required, § 1940.11(b)(2)(B)); "Laws by state" in nav/footer. Re-check bill status at each 28-day review |
| **v1.L** | conversion path | route content readers into the packet workflow (in-content CTA → `projects/new`); measure content → packet-start rate. Moved behind v1.G–v1.K (2026-11-08): 0 clicks site-wide, nothing to convert yet | planned |
| **v1.M** | content cadence | execute `content-draft/blog-calendar.md` (12 posts, monthly) against whichever pages actually earn impressions; re-scope against v1.H–v1.K output before starting | planned |

**v1.G–v1.I rationale (2026-11-08, operator chose option A):** 10x impressions (55 → ~550 / 28d)
needs page-1 rankings across nearly the whole measurable niche. US Google Ads volume
(DataForSEO via treg, 2026-11-08): AB 723 terms ~140/mo averaged (40/mo now; peaked 260/mo
Dec 2025–Jan 2026 around the effective date); MLS photo spec terms ~290/mo ("mls photos" 140,
"mls photo size requirements" 70, "mls photo requirements" 40, KD 0–22); disclosure / legality
long-tail ~90/mo. Head terms ("virtual staging" 4,400, "real estate photo editing" 590) are
vendor product SERPs, KD 23–37, off-ICP — not targeted. Ads volumes are bucketed and miss the
long tail (76% of GSC impressions are anonymized queries), so these are floors. The "ab 723"
top 10 includes a LinkedIn post, an unrelated Facebook page and YouTube Shorts while
retouchlint ranks 94 → authority, not content, is the first gap. Review in 28-day windows;
first check 2026-12-06 (`docs/growth.md`).

**Current state note:** all 15 routes are in `sitemap-index.xml` and no page
carries a `robots` meta tag. The statutory claims were checked against the
enrolled text of AB 723 (Bus. & Prof. Code § 10140.8) and the NAR Code of Ethics
on nar.realtor on 2026-09-18. `src/__tests__/content.test.js` keeps `noindex`
and the sitemap filter in agreement if either is reintroduced.

**Known gap:** the homepage is a single React island, so its links only exist
after hydration. The content cluster is reachable via the sitemap and via
cross-links between content pages, but nothing in the homepage's server-rendered
HTML points into it. v1.E adds a server-rendered law section to the homepage that links into it.

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
  data entry. Unknown whether that gap converts, which is what v1.G measures
  (renumbered v1.J on 2026-11-08).
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

- **2026-09-30 — Pending after v1.E (not scheduled; operator to slot).**
  1. *Packet disclosure text is not AB 723-shaped.* `disclosureText()` in
     `src/lib/store.ts` says originals are "available on request"; § 10140.8(a)(1)
     requires language saying the unaltered image can be accessed at a linked
     website/URL/QR code. The free generator (`src/lib/disclosure.ts`) already
     produces compliant wording — the paid packet should reuse it.
  2. *Landing Features section overclaims.* "Original + final archive … permanent
     reference link", "Public original-photo links", and "Broker-ready PDF packet"
     describe capabilities the client-side MVP does not have (share pages resolve
     only in the creating browser; no PDF export exists). The v1.E law section
     already states the share-page limitation, so the page now contradicts itself.
     Also review the LogoBar badges ("NAR-aligned", "C2PA-friendly") for support.
  3. *Durable original-photo hosting* — see 2026-09-16 entries above; items 1–2
     are cheap copy fixes, this is the real product gap.
  4. *Post-deploy:* `portfolio settings gsc submit-sitemap --site retouchlint.com
     --force` after each deploy that changes the URL set; v1.E growth review
     2026-10-28.

- **2026-09-30 — RESOLVED (v1.F): pending items 1–2 above.** Packet text and the
  landing/in-app claims fixed. Still open: the **Pricing tier lists** promise
  "Public original-photo page", "PDF audit packet", 30-day / 1-year / permanent
  archive, "Brokerage branding", and a "Centralized broker dashboard" — none exist.
  Left alone because pricing/billing was declared out of scope; operator to decide.

- **2026-09-30 — End-of-session pending list (open until each is closed).**
  1. *Operator validation of v1.F in real use* — suite green (34 tests) but the
     packet flow was not clicked through in a browser: set the originals URL on a
     packet, confirm it lands in the disclosure text, download the .txt, check the
     share page / dashboard badges ("Exempt edits only").
  2. *Pricing tier overclaims* — see the RESOLVED (v1.F) entry above; operator call.
  3. *Durable original-photo hosting* — the 2026-09-16 entries; the real product gap.
  4. *Growth reviews* — 2026-10-16 (v1.C content indexing) and 2026-10-28 (v1.E
     homepage + generator) in `docs/growth.md`. **Done 2026-11-08** — both
     extended one window; next review 2026-12-06.
  5. *Doc hygiene* — `AI_AGENTS.md § Versioning` still permits `vN.X.Y`, which
     contradicts the canonical two-level scheme in `sites/portfolio/AI_AGENTS.md`;
     `docs/CLAUDE.md § Project` is still the template placeholder; `AI_AGENTS.md`
     mixes "CF Pages" and "Workers" for the deploy target.
  6. *Uncommitted local state, deliberately left out of every commit* —
     `lamill.toml` (mode 600 tooling state), the `.lamill-translation-pending`
     deletion, and `content-draft/` (stale duplicate of `src/content/`, but
     `content-draft/blog-calendar.md` is still the input for v1.H, now v1.K). Operator to
     decide whether to commit, gitignore, or delete.
  7. *lamill `submit-sitemap` fallback bug* — logged as BUG-092 in
     `sites/portfolio/docs/bugs.md`; until fixed, pass `--url
     https://retouchlint.com/sitemap-index.xml`.

## 7. SEO Roadmap

Future work, queued after v1.E. **Not scheduled into phases yet — do not build
until the operator slots an item.** Slotted 2026-11-08: pSEO per MLS → v1.H; pSEO per
edit type → v1.I; Backlinks → v1.G. The rest stays unscheduled. Any page stating a statute, MLS rule, or
penalty needs the v1.C-style check against the primary source before it is
indexable.

- **`/tools/edit-checker/`** — "does this edit need disclosure?" for specific
  edits (sky, lawn, staging, wires, trash cans, …), answered against the
  § 10140.8(b) definition and exclusions.
- **`/tools/qr-generator/`** — QR code for an original-photo page (the
  statute accepts a link, URL, or QR code). Only useful once share URLs are
  durable (§ 6, 2026-09-16).
- **pSEO: one page per MLS** — CRMLS, SDMLS, MLSListings, Bay East, CLAW, …:
  rule number, requirements, original/altered sequencing rule. Rule numbers
  collide across MLSs (Bay East also uses 11.5.2), so every page cites its
  own MLS's rules document.
- **pSEO: one page per edit type** — "Is [sky replacement / virtual staging /
  …] allowed under AB 723?"
- **State pages** tracking similar bills outside California (FL etc.).
- **Blog** — AB 723 explainer, guide for photographers, DRE enforcement and
  penalties.
- **Backlinks** — photographer communities, MLS vendor directories.
