import { SiteFooter, SiteHeader } from "@/components/site-header";
import { HOME_FAQ } from "@/data/home-faq";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <LogoBar />
        <LawSection />
        <Problem />
        <Solution />
        <Features />
        <Pricing />
        <HomeFaq />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="container-page pt-20 pb-16">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          California AB 723 · Bus. &amp; Prof. Code § 10140.8 · CRMLS Rule 11.5.2
        </span>
        <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05] text-foreground">
          AB 723 listing photo disclosure, <em className="italic text-muted-foreground">before</em> the photos hit the MLS.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          Since January 1, 2026, California's AB 723 requires every digitally altered listing photo to carry a disclosure on or next to it, plus a link or QR code to the original, unaltered image. CRMLS Rule 11.5.2 also puts the original immediately before or after the altered photo in the MLS. RetouchLint records what changed in each photo and writes the disclosure for you.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/projects/new" className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Create a packet
          </a>
          <a href="/dashboard" className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary">
            View dashboard
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          No credit card required for your first packet. Built for transparency, not detection.
        </p>
      </div>
      <HeroPreview />
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="mt-14 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <span className="text-xs text-muted-foreground">retouchlint.com / packet / 142-elm-st</span>
        <span className="text-xs text-success font-medium">● Disclosure required</span>
      </div>
      <div className="grid md:grid-cols-2">
        <PreviewImage label="Original" sub="IMG_4421.RAW · captured 10:42 AM" tone="muted" />
        <PreviewImage label="Final / MLS" sub="Sky replaced · Grass enhanced · Wires removed" tone="bright" />
      </div>
      <div className="border-t border-border p-5 grid md:grid-cols-3 gap-4 text-sm">
        <Stat k="Material edits" v="3" />
        <Stat k="Recommendation" v="Disclosure required" tone="warning" />
        <Stat k="Packet status" v="Ready to share" tone="success" />
      </div>
    </div>
  );
}

function Stat({ k, v, tone }: { k: string; v: string; tone?: "warning" | "success" }) {
  const color = tone === "warning" ? "text-warning" : tone === "success" ? "text-success" : "text-foreground";
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{k}</div>
      <div className={`mt-1 font-medium ${color}`}>{v}</div>
    </div>
  );
}

function PreviewImage({ label, sub, tone }: { label: string; sub: string; tone: "muted" | "bright" }) {
  return (
    <div className="p-5">
      <div className={`aspect-[4/3] rounded-lg border border-border relative overflow-hidden ${tone === "muted" ? "bg-hero-muted" : "bg-hero-bright"}`}>
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full opacity-90">
          <polygon points="0,220 80,160 150,200 220,140 300,190 400,150 400,300 0,300" className="fill-illustration-grass" />
          <rect x="160" y="170" width="120" height="90" className="fill-illustration-house" />
          <polygon points="160,170 220,120 280,170" className="fill-illustration-roof" />
          <rect x="195" y="200" width="25" height="60" className="fill-illustration-door" />
        </svg>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{sub}</span>
      </div>
    </div>
  );
}

function LogoBar() {
  const items = ["AB 723 · § 10140.8", "CRMLS Rule 11.5.2", "Original ↔ final pairing", "Photographer attestation", "No AI detection"];
  return (
    <section className="container-page py-10 border-y border-border">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
        {items.map((i) => <span key={i}>{i}</span>)}
      </div>
    </section>
  );
}

function LawSection() {
  const reqs = [
    { t: "A disclosure statement", d: "On or adjacent to the altered image, reasonably conspicuous, saying the image has been altered and that the unaltered images can be accessed at the linked website, URL, or QR code." },
    { t: "A link to the original", d: "A link, URL, or QR code to a publicly accessible page that includes, and clearly identifies, the original, unaltered image." },
    { t: "Original next to altered (CRMLS)", d: "CRMLS Rule 11.5.2 requires the unaltered photo immediately before or after the altered one in the listing, with the altered photo labeled in its photo description." },
  ];
  const delivers = [
    { t: "Edit record per photo", d: "Pair each original with its final and tag what changed, using the statute's line between altered elements and exempt adjustments like exposure or color correction." },
    { t: "Disclosure text", d: "Copy-paste disclosure language for the MLS photo description, remarks, and marketing." },
    { t: "Photographer attestation", d: "The photographer or editor signs a statement of the work performed, so the agent's disclosure rests on a record rather than memory." },
    { t: "Original-photo page", d: "Each original shown beside its published final with the edit list. Packets are stored in your browser, so publish the originals where the public can open them and add that URL to the packet — it goes straight into the disclosure." },
  ];
  return (
    <section id="ab-723" className="container-page py-20">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">What the law requires</p>
      <h2 className="mt-3 font-display text-4xl text-foreground max-w-3xl">AB 723 needs two things on every altered listing photo — and CRMLS adds a third.</h2>
      <p className="mt-4 text-muted-foreground max-w-3xl">
        Business and Professions Code § 10140.8 applies to brokers, salespersons, and anyone acting on their behalf — including the photographer who edits the shoot. An image is "digitally altered" when editing software or AI adds, removes, or changes elements such as furniture, appliances, flooring, paint, landscape, the facade, or views through windows. Lighting, white balance, color correction, straightening, cropping, and exposure alone are exempt.
      </p>
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {reqs.map((r) => (
          <div key={r.t} className="rounded-lg border border-border bg-card p-6">
            <div className="font-medium text-foreground">{r.t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
          </div>
        ))}
      </div>
      <h3 className="mt-14 font-display text-3xl text-foreground">How RetouchLint delivers it</h3>
      <div className="mt-6 grid md:grid-cols-2 gap-5">
        {delivers.map((r) => (
          <div key={r.t} className="rounded-lg border border-border p-6">
            <div className="font-medium text-foreground">{r.t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        <a href="/tools/disclosure-generator/" className="text-primary underline underline-offset-4 font-medium">Free AB 723 disclosure generator</a>
        {" · "}
        <a href="/real-estate-photo-disclosure/" className="text-primary underline underline-offset-4">real estate photo disclosure guide</a>
        {" · "}
        <a href="/blog/california-real-estate-photo-disclosure/" className="text-primary underline underline-offset-4">California photo disclosure under AB 723</a>
        {" · "}
        <a href="/blog/original-image-access/" className="text-primary underline underline-offset-4">giving buyers access to the original image</a>
        {" · "}
        <a href="/blog/mls-edited-photo-compliance/" className="text-primary underline underline-offset-4">MLS edited-photo compliance</a>
      </p>
    </section>
  );
}

function HomeFaq() {
  return (
    <section id="faq" className="container-page py-20">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">AB 723 FAQ</p>
      <h2 className="mt-3 font-display text-4xl text-foreground">Questions agents and photographers ask about AB 723</h2>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {HOME_FAQ.map((f) => (
          <div key={f.q} className="py-6">
            <h3 className="font-medium text-foreground">{f.q}</h3>
            <p className="mt-2 text-muted-foreground max-w-3xl">{f.a}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        More in the <a href="/faq/" className="text-primary underline underline-offset-4">full photo disclosure FAQ</a>. RetouchLint does not provide legal advice.
      </p>
    </section>
  );
}

function Problem() {
  return (
    <section className="container-page py-20">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">The problem</p>
          <h2 className="mt-3 font-display text-4xl text-foreground">Edited listing photos quietly create disclosure risk.</h2>
        </div>
        <div className="space-y-4 text-muted-foreground">
          <p>Sky replacements, virtual staging, removed furniture, and "just a little" lawn enhancement are routine in listing photos. Often nobody keeps a record of what was changed, by whom, or whether buyers were told.</p>
          <p>When a complaint, audit, or lawsuit shows up, the agent and the photographer are left reconstructing the edit history from memory — sometimes years later.</p>
          <p className="text-foreground font-medium">RetouchLint creates the paper trail at the moment of editing, not after the dispute.</p>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    { n: "01", t: "Upload originals & finals", d: "Drag in the source photos and the edited versions you plan to publish." },
    { n: "02", t: "Pair and tag each edit", d: "Match each final to its original, then check off what changed — sky, staging, lawn, defects." },
    { n: "03", t: "Sign the attestation", d: "The photographer or editor signs a short attestation describing the work performed." },
    { n: "04", t: "Generate the packet", d: "RetouchLint tells you whether AB 723 disclosure applies and writes the copy-paste disclosure language." },
  ];
  return (
    <section className="bg-secondary/40 border-y border-border">
      <div className="container-page py-20">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">The workflow</p>
        <h2 className="mt-3 font-display text-4xl text-foreground max-w-2xl">Four steps from raw files to a broker-ready disclosure packet.</h2>
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="rounded-lg border border-border bg-card p-6">
              <div className="text-xs font-mono text-muted-foreground">{s.n}</div>
              <div className="mt-3 font-medium text-foreground">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { t: "Original + final pairing", d: "Each published final is paired with the source photo it came from, so what changed is visible side by side." },
    { t: "Edit record per photo", d: "Tag each edit against AB 723's line between digital alterations and exempt adjustments like exposure or color correction." },
    { t: "Photographer attestation", d: "The photographer or editor signs a statement of the work performed, stamped with the date and time of signing." },
    { t: "AB 723 disclosure language", d: "Copy-paste wording that says the photos were altered and where the originals can be seen, with your link to the originals filled in." },
    { t: "Original-photo page", d: "A page showing each original beside its final and the edit list. Packets are stored in your browser, so host the originals publicly for the AB 723 link." },
    { t: "Downloadable disclosure", d: "Save the disclosure text as a file to send along with the photo delivery." },
  ];
  return (
    <section id="features" className="container-page py-20">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">What's in the packet</p>
      <h2 className="mt-3 font-display text-4xl text-foreground max-w-2xl">A record of what changed in every listing photo, and who changed it.</h2>
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {features.map((f) => (
          <div key={f.t} className="rounded-lg border border-border p-6 hover:shadow-sm transition-shadow">
            <div className="h-9 w-9 rounded-md bg-accent text-accent-foreground inline-flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12l4 4L19 7" />
              </svg>
            </div>
            <div className="font-medium text-foreground">{f.t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Per listing", price: "$19", per: "/ packet", desc: "Best for one-off transactions or testing the workflow.", features: ["1 disclosure packet", "Public original-photo page", "PDF audit packet", "30-day archive"], cta: "Create a packet", to: "/projects/new", highlight: false },
    { name: "Solo agent", price: "$49", per: "/ month", desc: "Active agents and independent photographers.", features: ["Unlimited packets", "Brokerage branding", "1-year archive", "Email support"], cta: "Start solo plan", to: "/projects/new", highlight: true },
    { name: "Brokerage", price: "$199", per: "/ month", desc: "Teams that need shared compliance records.", features: ["Unlimited seats & packets", "Centralized broker dashboard", "Permanent archive", "Priority support"], cta: "Talk to us", to: "mailto:hello@lamill.io?subject=RetouchLint%20Brokerage%20plan", highlight: false },
  ];
  return (
    <section id="pricing" className="bg-secondary/40 border-y border-border">
      <div className="container-page py-20">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Pricing</p>
        <h2 className="mt-3 font-display text-4xl text-foreground">Simple, per-listing or per-seat.</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div key={t.name} className={`rounded-xl border bg-card p-7 flex flex-col ${t.highlight ? "border-primary shadow-lg" : "border-border"}`}>
              {t.highlight && <span className="self-start text-xs font-medium uppercase tracking-wider text-primary mb-3">Most popular</span>}
              <div className="font-medium text-foreground">{t.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl text-foreground">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.per}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
              <ul className="mt-5 space-y-2 text-sm text-foreground flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 mt-0.5 text-success" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l4 4L19 7" /></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={t.to} className={`mt-7 inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium ${t.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border text-foreground hover:bg-secondary"}`}>
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="container-page py-24 text-center">
      <h2 className="font-display text-4xl md:text-5xl text-foreground max-w-2xl mx-auto">Stop reconstructing edit history after the fact.</h2>
      <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Create your first packet in the browser. No sign-up required to try.</p>
      <a href="/projects/new" className="mt-8 inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Create a packet
      </a>
    </section>
  );
}
