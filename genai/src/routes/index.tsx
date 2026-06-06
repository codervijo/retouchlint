import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RetouchLint — Disclosure-ready listing photos" },
      { name: "description", content: "RetouchLint helps agents and photographers document original photos, edited finals, and required disclosures in one clean audit packet." },
      { property: "og:title", content: "RetouchLint — Disclosure-ready listing photos" },
      { property: "og:description", content: "Document originals, edits, and disclosures before photos hit the MLS." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <LogoBar />
        <Problem />
        <Solution />
        <Features />
        <Pricing />
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
          Built for the new MLS photo-disclosure rules
        </span>
        <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05] text-foreground">
          Disclosure-ready listing photos, <em className="italic text-muted-foreground">before</em> they hit the MLS.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          RetouchLint helps agents and photographers document original photos, edited finals, and required disclosures in one clean audit packet — no AI detection guesswork, just a paper trail you can hand to a broker or buyer.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/projects/new" className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Create a packet
          </Link>
          <Link to="/dashboard" className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary">
            View dashboard
          </Link>
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
        <span className="text-xs text-muted-foreground">retouchlint.app / packet / 142-elm-st</span>
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
  const items = ["NAR-aligned", "MLS-ready", "Broker compliance", "C2PA-friendly", "Audit trail"];
  return (
    <section className="container-page py-10 border-y border-border">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
        {items.map((i) => <span key={i}>{i}</span>)}
      </div>
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
          <p>Sky replacements, virtual staging, removed furniture, and "just a little" lawn enhancement now live on every MLS. Most listings have no record of what was changed, by whom, or whether buyers were told.</p>
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
    { n: "04", t: "Generate the packet", d: "RetouchLint produces a disclosure recommendation, copy-paste language, and a downloadable audit packet." },
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
    { t: "Original + final archive", d: "Every source photo is preserved alongside the published version, with a permanent reference link." },
    { t: "Edit attestation", d: "Photographers and editors sign a clear, structured statement of what was changed and why." },
    { t: "Disclosure language", d: "Auto-generated, plain-language copy you can paste into MLS remarks, listing pages, and contracts." },
    { t: "Public original-photo links", d: "Share a clean URL that shows buyers the original images and the documented edit history." },
    { t: "Broker-ready PDF packet", d: "One download containing originals, finals, the edit checklist, the attestation, and the disclosure text." },
    { t: "Audit-ready timeline", d: "Every action is timestamped so the packet stands on its own months or years after the listing closes." },
  ];
  return (
    <section id="features" className="container-page py-20">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">What's in the packet</p>
      <h2 className="mt-3 font-display text-4xl text-foreground max-w-2xl">A complete photo-provenance record for every listing.</h2>
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
    { name: "Per listing", price: "$19", per: "/ packet", desc: "Best for one-off transactions or testing the workflow.", features: ["1 disclosure packet", "Public original-photo page", "PDF audit packet", "30-day archive"], cta: "Create a packet", to: "/projects/new" as const, highlight: false },
    { name: "Solo agent", price: "$49", per: "/ month", desc: "Active agents and independent photographers.", features: ["Unlimited packets", "Brokerage branding", "1-year archive", "Email support"], cta: "Start solo plan", to: "/projects/new" as const, highlight: true },
    { name: "Brokerage", price: "$199", per: "/ month", desc: "Teams that need shared compliance records.", features: ["Unlimited seats & packets", "Centralized broker dashboard", "Permanent archive", "Priority support"], cta: "Talk to us", to: "/projects/new" as const, highlight: false },
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
              <Link to={t.to} className={`mt-7 inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium ${t.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border text-foreground hover:bg-secondary"}`}>
                {t.cta}
              </Link>
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
      <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Create your first packet in under five minutes. No subscription required to try.</p>
      <Link to="/projects/new" className="mt-8 inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Create a packet
      </Link>
    </section>
  );
}
