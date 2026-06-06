import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { store } from "@/lib/store";

export const Route = createFileRoute("/projects/new")({
  head: () => ({ meta: [{ title: "New listing — RetouchLint" }] }),
  component: NewProject,
});

function NewProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ address: "", agent: "", brokerage: "", mls: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.address.trim()) return;
    const p = store.create(form);
    navigate({ to: "/projects/$id", params: { id: p.id } });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="container-page py-12 flex-1 max-w-2xl">
        <p className="text-sm text-muted-foreground">Step 1 of 4</p>
        <h1 className="font-display text-4xl text-foreground mt-2">New listing</h1>
        <p className="text-muted-foreground mt-2">Start by naming the property. You'll upload photos and document edits on the next screen.</p>

        <form onSubmit={submit} className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6">
          <Field label="Property address" required>
            <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="142 Elm St, Austin, TX 78704" className="input" />
          </Field>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Listing agent">
              <input value={form.agent} onChange={(e) => setForm({ ...form, agent: e.target.value })} placeholder="Jordan Lee" className="input" />
            </Field>
            <Field label="Brokerage">
              <input value={form.brokerage} onChange={(e) => setForm({ ...form, brokerage: e.target.value })} placeholder="Northside Realty" className="input" />
            </Field>
          </div>
          <Field label="MLS # (optional)">
            <input value={form.mls} onChange={(e) => setForm({ ...form, mls: e.target.value })} placeholder="1234567" className="input" />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <button type="submit" className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Continue → Upload photos
            </button>
          </div>
        </form>

        <style>{`.input { display:block; width:100%; border:1px solid var(--color-border); background:var(--color-background); border-radius:0.5rem; padding:0.625rem 0.75rem; font-size:0.875rem; color:var(--color-foreground); outline:none; } .input:focus { border-color: var(--color-ring); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-ring) 20%, transparent); }`}</style>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}{required && <span className="text-destructive"> *</span>}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
