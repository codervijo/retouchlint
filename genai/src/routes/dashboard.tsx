import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { store, type Project, recommendation } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — RetouchLint" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const load = () => setProjects(store.list());
    load();
    window.addEventListener("retouchlint:change", load);
    return () => window.removeEventListener("retouchlint:change", load);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="container-page py-12 flex-1">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-4xl text-foreground">Listings</h1>
            <p className="text-muted-foreground mt-1">Your disclosure packets and audit records.</p>
          </div>
          <Link to="/projects/new" className="inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            + New listing
          </Link>
        </div>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-8 rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-muted-foreground text-left">
                <tr>
                  <th className="px-5 py-3 font-medium">Address</th>
                  <th className="px-5 py-3 font-medium">Agent</th>
                  <th className="px-5 py-3 font-medium">Pairs</th>
                  <th className="px-5 py-3 font-medium">Disclosure</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => {
                  const rec = recommendation(p);
                  return (
                    <tr key={p.id} className="border-t border-border hover:bg-secondary/30">
                      <td className="px-5 py-4 font-medium text-foreground">{p.address}</td>
                      <td className="px-5 py-4 text-muted-foreground">{p.agent}</td>
                      <td className="px-5 py-4 text-muted-foreground">{p.pairs.length}</td>
                      <td className="px-5 py-4">
                        <Badge tone={rec.level === "required" ? "warning" : rec.level === "recommended" ? "accent" : "muted"}>
                          {rec.level === "required" ? "Required" : rec.level === "recommended" ? "Recommended" : "None"}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <Badge tone={p.attestation.signed ? "success" : "muted"}>
                          {p.attestation.signed ? "Packet ready" : "Draft"}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link to="/projects/$id" params={{ id: p.id }} className="text-foreground hover:underline">Open →</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-xl border border-dashed border-border bg-secondary/30 p-16 text-center">
      <div className="mx-auto h-12 w-12 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6"/></svg>
      </div>
      <h3 className="mt-4 font-medium text-foreground">No listings yet</h3>
      <p className="mt-1 text-sm text-muted-foreground">Start a new listing to upload originals, document edits, and generate a packet.</p>
      <Link to="/projects/new" className="mt-5 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Create your first packet
      </Link>
    </div>
  );
}

export function Badge({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "success" | "warning" | "accent" }) {
  const map = {
    muted: "bg-secondary text-muted-foreground border-border",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/15 text-warning border-warning/30",
    accent: "bg-accent text-accent-foreground border-accent",
  } as const;
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${map[tone]}`}>{children}</span>;
}
