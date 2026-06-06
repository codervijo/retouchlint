import { useEffect, useState } from "react";
import { Logo, SiteFooter } from "@/components/site-header";
import { store, type Project, disclosureText, recommendation, EDIT_OPTIONS } from "@/lib/store";

export default function SharePage({ id }: { id: string }) {
  const [project, setProject] = useState<Project | undefined>();
  useEffect(() => { setProject(store.get(id)); }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Packet not found.
      </div>
    );
  }

  const rec = recommendation(project);
  const text = disclosureText(project);

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <header className="bg-background border-b border-border">
        <div className="container-page py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold tracking-tight">RetouchLint</span>
          </a>
          <span className="text-xs text-muted-foreground">Public disclosure page</span>
        </div>
      </header>

      <main className="container-page py-12 flex-1 max-w-4xl">
        <div className="text-sm text-muted-foreground">Listing disclosure</div>
        <h1 className="font-display text-4xl text-foreground mt-2">{project.address}</h1>
        <p className="text-muted-foreground mt-1">
          {project.agent && <>Listed by {project.agent}</>}{project.brokerage && <> · {project.brokerage}</>}{project.mls && <> · MLS {project.mls}</>}
        </p>

        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-medium text-foreground">Disclosure</h2>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${rec.level === "required" ? "bg-warning/15 text-warning border-warning/30" : rec.level === "recommended" ? "bg-accent text-accent-foreground border-accent" : "bg-success/10 text-success border-success/20"}`}>
              {rec.level === "required" ? "Disclosure required" : rec.level === "recommended" ? "Disclosure recommended" : "No edits declared"}
            </span>
          </div>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">{text}</pre>
        </div>

        {project.attestation.signed && (
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h2 className="font-medium text-foreground">Attestation</h2>
            <p className="text-sm text-muted-foreground mt-2">Signed by <span className="text-foreground font-medium">{project.attestation.name}</span> ({project.attestation.role}) on {new Date(project.attestation.date).toLocaleString()}.</p>
            <div className="mt-3 font-display italic text-2xl text-foreground border-t border-border pt-3">{project.attestation.name}</div>
          </div>
        )}

        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <h2 className="font-medium text-foreground">Original photo archive</h2>
          <p className="text-sm text-muted-foreground mt-1">Below are the original, unedited source photos paired with the published finals.</p>
          <div className="mt-5 space-y-6">
            {project.pairs.map((pair, idx) => {
              const o = project.originals.find((x) => x.id === pair.originalId);
              const e = project.edited.find((x) => x.id === pair.editedId);
              return (
                <div key={pair.id}>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Photo {idx + 1}</div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Frame label="Original" src={o?.dataUrl ?? ""} />
                    <Frame label="Published final" src={e?.dataUrl ?? ""} />
                  </div>
                  {pair.edits.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {pair.edits.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-border bg-secondary text-muted-foreground">
                          {EDIT_OPTIONS.find((o) => o.id === t)?.label}
                        </span>
                      ))}
                    </div>
                  )}
                  {pair.notes && <p className="text-xs text-muted-foreground mt-1.5 italic">Note: {pair.notes}</p>}
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-8 text-center">
          This disclosure page was generated with RetouchLint, a photo-provenance and disclosure workflow. RetouchLint does not detect AI-generated content and does not provide legal advice.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

function Frame({ label, src }: { label: string; src: string }) {
  return (
    <div>
      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border bg-secondary">
        {src && <img src={src} alt={label} className="w-full h-full object-cover" />}
      </div>
      <div className="mt-1.5 text-xs font-medium text-foreground">{label}</div>
    </div>
  );
}
