import { useEffect, useMemo, useRef, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/Dashboard";
import { store, type Project, type Photo, type PhotoPair, type EditTag, EDIT_OPTIONS, disclosureText, recommendation } from "@/lib/store";

type Step = "upload" | "pair" | "checklist" | "attestation" | "packet";

export default function ProjectPage({ id }: { id: string }) {
  const [project, setProject] = useState<Project | undefined>();
  const [step, setStep] = useState<Step>("upload");

  useEffect(() => {
    const load = () => setProject(store.get(id));
    load();
    window.addEventListener("retouchlint:change", load);
    return () => window.removeEventListener("retouchlint:change", load);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="container-page py-20 flex-1">
          <p className="text-muted-foreground">Listing not found.</p>
          <a href="/dashboard" className="text-foreground underline mt-3 inline-block">← Back to dashboard</a>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const steps: { id: Step; label: string }[] = [
    { id: "upload", label: "Upload" },
    { id: "pair", label: "Pair" },
    { id: "checklist", label: "Edits" },
    { id: "attestation", label: "Attestation" },
    { id: "packet", label: "Packet" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="container-page py-10 flex-1">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">← Dashboard</a>
            <h1 className="font-display text-4xl text-foreground mt-2">{project.address}</h1>
            <p className="text-muted-foreground mt-1">
              {project.agent || "—"} {project.brokerage && `· ${project.brokerage}`} {project.mls && `· MLS ${project.mls}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { if (confirm("Delete this listing?")) { store.remove(project.id); window.location.href = "/dashboard"; }}}
              className="text-sm text-muted-foreground hover:text-destructive"
            >Delete</button>
          </div>
        </div>

        <nav className="mt-8 flex items-center gap-1 border-b border-border overflow-x-auto">
          {steps.map((s, i) => (
            <button key={s.id} onClick={() => setStep(s.id)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${step === s.id ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <span className="text-muted-foreground font-mono mr-2">0{i + 1}</span>{s.label}
            </button>
          ))}
        </nav>

        <div className="mt-8">
          {step === "upload" && <UploadStep project={project} onNext={() => setStep("pair")} />}
          {step === "pair" && <PairStep project={project} onNext={() => setStep("checklist")} />}
          {step === "checklist" && <ChecklistStep project={project} onNext={() => setStep("attestation")} />}
          {step === "attestation" && <AttestationStep project={project} onNext={() => setStep("packet")} />}
          {step === "packet" && <PacketStep project={project} />}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

/* ---------------- Upload ---------------- */

function UploadStep({ project, onNext }: { project: Project; onNext: () => void }) {
  const ready = project.originals.length > 0 && project.edited.length > 0;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <PhotoBucket
        title="Original photos"
        sub="Camera-original or unedited source files."
        photos={project.originals}
        onAdd={(photos) => store.update(project.id, { originals: [...project.originals, ...photos] })}
        onRemove={(pid) => store.update(project.id, { originals: project.originals.filter((p) => p.id !== pid) })}
      />
      <PhotoBucket
        title="Edited / final photos"
        sub="The versions you intend to publish to the MLS."
        photos={project.edited}
        onAdd={(photos) => store.update(project.id, { edited: [...project.edited, ...photos] })}
        onRemove={(pid) => store.update(project.id, { edited: project.edited.filter((p) => p.id !== pid) })}
      />
      <div className="md:col-span-2 flex justify-end">
        <button disabled={!ready} onClick={onNext} className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
          Continue → Pair photos
        </button>
      </div>
    </div>
  );
}

function PhotoBucket({ title, sub, photos, onAdd, onRemove }: { title: string; sub: string; photos: Photo[]; onAdd: (p: Photo[]) => void; onRemove: (id: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const arr = await Promise.all(Array.from(files).slice(0, 12).map(readFile));
    onAdd(arr);
  }
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{sub}</p>
        </div>
        <button onClick={() => inputRef.current?.click()} className="text-sm rounded-md border border-border px-3 py-1.5 hover:bg-secondary">+ Add</button>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
      </div>
      {photos.length === 0 ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
          className="mt-4 cursor-pointer rounded-lg border border-dashed border-border bg-secondary/30 p-10 text-center text-sm text-muted-foreground hover:bg-secondary/50"
        >
          Drop images here or click to upload
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {photos.map((p) => (
            <div key={p.id} className="relative group rounded-md overflow-hidden border border-border aspect-[4/3] bg-secondary">
              <img src={p.dataUrl} alt={p.name} className="w-full h-full object-cover" />
              <button onClick={() => onRemove(p.id)} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-background/90 border border-border rounded-md px-1.5 py-0.5 text-xs">✕</button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent text-[10px] text-white px-1.5 py-1 truncate">{p.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function readFile(file: File): Promise<Photo> {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve({ id: crypto.randomUUID(), name: file.name, dataUrl: r.result as string });
    r.readAsDataURL(file);
  });
}

/* ---------------- Pair ---------------- */

function PairStep({ project, onNext }: { project: Project; onNext: () => void }) {
  const [selectedOriginal, setSelectedOriginal] = useState<string | null>(null);

  const pairedOriginals = new Set(project.pairs.map((p) => p.originalId));
  const pairedEdited = new Set(project.pairs.map((p) => p.editedId));

  function makePair(editedId: string) {
    if (!selectedOriginal) return;
    const pair: PhotoPair = { id: crypto.randomUUID(), originalId: selectedOriginal, editedId, edits: [] };
    store.update(project.id, { pairs: [...project.pairs, pair] });
    setSelectedOriginal(null);
  }

  function removePair(pid: string) {
    store.update(project.id, { pairs: project.pairs.filter((p) => p.id !== pid) });
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-medium text-foreground">Pair originals with finals</h3>
        <p className="text-sm text-muted-foreground mt-1">Click an original on the left, then the matching final on the right to create a pair.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Originals</p>
            <div className="grid grid-cols-3 gap-2">
              {project.originals.map((p) => {
                const used = pairedOriginals.has(p.id);
                const active = selectedOriginal === p.id;
                return (
                  <button key={p.id} disabled={used} onClick={() => setSelectedOriginal(p.id)} className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 transition ${active ? "border-primary ring-2 ring-primary/30" : "border-border"} ${used ? "opacity-40 cursor-not-allowed" : "hover:border-primary/60"}`}>
                    <img src={p.dataUrl} alt={p.name} className="w-full h-full object-cover" />
                    {used && <span className="absolute top-1 left-1 text-[10px] bg-success text-success-foreground px-1.5 rounded">paired</span>}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Finals {selectedOriginal && <span className="text-primary normal-case">— pick a match</span>}</p>
            <div className="grid grid-cols-3 gap-2">
              {project.edited.map((p) => {
                const used = pairedEdited.has(p.id);
                return (
                  <button key={p.id} disabled={used || !selectedOriginal} onClick={() => makePair(p.id)} className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 transition ${selectedOriginal && !used ? "border-border hover:border-primary cursor-pointer" : "border-border"} ${used ? "opacity-40 cursor-not-allowed" : ""}`}>
                    <img src={p.dataUrl} alt={p.name} className="w-full h-full object-cover" />
                    {used && <span className="absolute top-1 left-1 text-[10px] bg-success text-success-foreground px-1.5 rounded">paired</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {project.pairs.length > 0 && (
        <div>
          <h3 className="font-medium text-foreground mb-3">Pairs ({project.pairs.length})</h3>
          <div className="space-y-3">
            {project.pairs.map((pair) => {
              const o = project.originals.find((x) => x.id === pair.originalId);
              const e = project.edited.find((x) => x.id === pair.editedId);
              return (
                <div key={pair.id} className="rounded-lg border border-border bg-card p-3 flex items-center gap-3">
                  <img src={o?.dataUrl} className="h-16 w-20 object-cover rounded" />
                  <span className="text-muted-foreground">→</span>
                  <img src={e?.dataUrl} className="h-16 w-20 object-cover rounded" />
                  <div className="flex-1 text-sm">
                    <div className="text-foreground">{o?.name} <span className="text-muted-foreground">→</span> {e?.name}</div>
                    <div className="text-xs text-muted-foreground">{pair.edits.length} edit{pair.edits.length === 1 ? "" : "s"} tagged</div>
                  </div>
                  <button onClick={() => removePair(pair.id)} className="text-xs text-muted-foreground hover:text-destructive">Unpair</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button disabled={project.pairs.length === 0} onClick={onNext} className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
          Continue → Edit checklist
        </button>
      </div>
    </div>
  );
}

/* ---------------- Checklist ---------------- */

function ChecklistStep({ project, onNext }: { project: Project; onNext: () => void }) {
  function toggle(pairId: string, tag: EditTag) {
    const next = project.pairs.map((p) => {
      if (p.id !== pairId) return p;
      const has = p.edits.includes(tag);
      return { ...p, edits: has ? p.edits.filter((t) => t !== tag) : [...p.edits, tag] };
    });
    store.update(project.id, { pairs: next });
  }
  function setNotes(pairId: string, notes: string) {
    const next = project.pairs.map((p) => (p.id === pairId ? { ...p, notes } : p));
    store.update(project.id, { pairs: next });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-accent/30 p-4 text-sm text-foreground">
        For each photo pair, check every edit that was applied to the final version. This list becomes the disclosure language and the audit packet.
      </div>
      {project.pairs.map((pair, idx) => {
        const o = project.originals.find((x) => x.id === pair.originalId);
        const e = project.edited.find((x) => x.id === pair.editedId);
        return (
          <div key={pair.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Pair {idx + 1}</h3>
              <Badge tone={pair.edits.length ? "accent" : "muted"}>{pair.edits.length} tagged</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Compare label="Original" name={o?.name ?? ""} src={o?.dataUrl ?? ""} />
              <Compare label="Final" name={e?.name ?? ""} src={e?.dataUrl ?? ""} />
            </div>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {EDIT_OPTIONS.map((opt) => {
                const active = pair.edits.includes(opt.id);
                return (
                  <button key={opt.id} onClick={() => toggle(pair.id, opt.id)} className={`text-left rounded-md border px-3 py-2.5 text-sm transition ${active ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-secondary/40"}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-foreground font-medium">{opt.label}</span>
                      <span className={`h-4 w-4 rounded border flex items-center justify-center ${active ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}>
                        {active && <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l4 4L19 7" /></svg>}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.material ? "Material edit" : "Non-material"}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-foreground">Notes (optional)</label>
              <textarea
                value={pair.notes ?? ""}
                onChange={(ev) => setNotes(pair.id, ev.target.value)}
                rows={2}
                placeholder="e.g. Removed neighbor's trash bin from driveway."
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        );
      })}
      <div className="flex justify-end">
        <button onClick={onNext} className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Continue → Attestation
        </button>
      </div>
    </div>
  );
}

function Compare({ label, name, src }: { label: string; name: string; src: string }) {
  return (
    <div>
      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border bg-secondary">
        {src && <img src={src} alt={name} className="w-full h-full object-cover" />}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground truncate ml-2">{name}</span>
      </div>
    </div>
  );
}

/* ---------------- Attestation ---------------- */

function AttestationStep({ project, onNext }: { project: Project; onNext: () => void }) {
  const [a, setA] = useState(project.attestation);
  function sign() {
    const signed = { ...a, signed: true, date: new Date().toISOString() };
    store.update(project.id, { attestation: signed });
    onNext();
  }
  return (
    <div className="max-w-3xl">
      <div className="rounded-xl border border-border bg-card p-7">
        <h3 className="font-display text-2xl text-foreground">Photographer / editor attestation</h3>
        <p className="text-sm text-muted-foreground mt-2">
          By signing below, I attest that the edits documented in this packet represent, to the best of my knowledge, the changes applied to the final listing photos for <span className="text-foreground font-medium">{project.address}</span>. Original source files have been preserved unaltered. This attestation is provided in support of the listing's disclosure obligations and does not constitute legal advice.
        </p>

        <div className="mt-6 rounded-lg border border-border bg-secondary/40 p-4 text-sm">
          <div className="font-medium text-foreground mb-2">Summary of declared edits</div>
          <SummaryList project={project} />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Field label="Full name">
            <input value={a.name} onChange={(e) => setA({ ...a, name: e.target.value })} placeholder="Casey Morgan" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </Field>
          <Field label="Role">
            <select value={a.role} onChange={(e) => setA({ ...a, role: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
              <option value="">Select role…</option>
              <option>Photographer</option>
              <option>Photo editor</option>
              <option>Listing agent</option>
              <option>Brokerage staff</option>
            </select>
          </Field>
        </div>

        <div className="mt-6 rounded-md border border-dashed border-border p-5 text-center">
          <div className="font-display italic text-3xl text-foreground">{a.name || "Your signature"}</div>
          <p className="text-xs text-muted-foreground mt-2">Typed signature — will be timestamped at signing.</p>
        </div>

        <div className="mt-6 flex justify-between items-center">
          {project.attestation.signed ? <Badge tone="success">Signed {new Date(project.attestation.date).toLocaleString()}</Badge> : <span className="text-xs text-muted-foreground">Not yet signed</span>}
          <button disabled={!a.name || !a.role} onClick={sign} className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            Sign &amp; generate packet
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function SummaryList({ project }: { project: Project }) {
  const tags = useMemo(() => {
    const map = new Map<EditTag, number>();
    project.pairs.forEach((p) => p.edits.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1)));
    return [...map.entries()];
  }, [project]);
  if (!tags.length) return <p className="text-muted-foreground">No edits tagged.</p>;
  return (
    <ul className="space-y-1">
      {tags.map(([t, n]) => {
        const opt = EDIT_OPTIONS.find((o) => o.id === t)!;
        return <li key={t} className="flex justify-between"><span>{opt.label}</span><span className="text-muted-foreground">{n} photo{n === 1 ? "" : "s"}</span></li>;
      })}
    </ul>
  );
}

/* ---------------- Packet ---------------- */

function PacketStep({ project }: { project: Project }) {
  const rec = recommendation(project);
  const text = disclosureText(project);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/share?id=${project.id}` : "";

  function copy() {
    navigator.clipboard.writeText(text);
  }
  function publish() {
    store.update(project.id, { published: true });
    alert("Public packet link is live.");
  }
  function downloadPdf() {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `retouchlint-${project.address.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-medium text-foreground">Disclosure recommendation</h3>
            <Badge tone={rec.level === "required" ? "warning" : rec.level === "recommended" ? "accent" : "success"}>
              {rec.level === "required" ? "Disclosure required" : rec.level === "recommended" ? "Disclosure recommended" : "No disclosure needed"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{rec.summary}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Copy-paste disclosure language</h3>
            <button onClick={copy} className="text-sm rounded-md border border-border px-3 py-1.5 hover:bg-secondary">Copy</button>
          </div>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed bg-secondary/40 border border-border rounded-md p-4 text-foreground">{text}</pre>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-medium text-foreground">Before / after</h3>
          <div className="mt-4 space-y-6">
            {project.pairs.map((pair, idx) => {
              const o = project.originals.find((x) => x.id === pair.originalId);
              const e = project.edited.find((x) => x.id === pair.editedId);
              return (
                <div key={pair.id}>
                  <div className="text-sm text-muted-foreground mb-2">Pair {idx + 1}</div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Compare label="Original" name={o?.name ?? ""} src={o?.dataUrl ?? ""} />
                    <Compare label="Final" name={e?.name ?? ""} src={e?.dataUrl ?? ""} />
                  </div>
                  {pair.edits.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {pair.edits.map((t) => <Badge key={t} tone="accent">{EDIT_OPTIONS.find((o) => o.id === t)?.label}</Badge>)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <h4 className="font-medium text-foreground">Packet</h4>
          <ul className="mt-3 text-sm text-muted-foreground space-y-1.5">
            <li>· {project.originals.length} originals archived</li>
            <li>· {project.edited.length} finals documented</li>
            <li>· {project.pairs.length} paired</li>
            <li>· Attestation: {project.attestation.signed ? <span className="text-success">signed</span> : <span className="text-warning">unsigned</span>}</li>
          </ul>
          <button onClick={downloadPdf} className="mt-4 w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Download PDF packet
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h4 className="font-medium text-foreground">Public original-photo link</h4>
          <p className="text-xs text-muted-foreground mt-1">Share with buyers, MLS reviewers, or brokers.</p>
          <div className="mt-3 flex items-center gap-2">
            <input readOnly value={shareUrl} className="flex-1 rounded-md border border-border bg-secondary/40 px-2 py-1.5 text-xs" />
            <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="text-xs rounded-md border border-border px-2 py-1.5 hover:bg-secondary">Copy</button>
          </div>
          {project.published ? (
            <div className="mt-3 flex items-center justify-between">
              <Badge tone="success">Live</Badge>
              <a href={`/share?id=${project.id}`} className="text-xs text-foreground underline">Open page →</a>
            </div>
          ) : (
            <button onClick={publish} className="mt-3 w-full inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
              Publish public page
            </button>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 text-xs text-muted-foreground">
          RetouchLint supports the disclosure workflow. It does not detect AI-generated content and does not provide legal advice. Verify your jurisdiction's specific MLS and disclosure requirements.
        </div>
      </aside>
    </div>
  );
}
