import { useState } from "react";
import { GEN_EDITS, generateDisclosure } from "@/lib/disclosure";

export default function DisclosureGenerator() {
  const [selected, setSelected] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const result = generateDisclosure(selected, link);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="not-prose my-8 rounded-xl border border-border bg-card p-6 text-base leading-normal">
      <fieldset>
        <legend className="font-medium text-foreground">1. What was done to the photo?</legend>
        <div className="mt-3 grid sm:grid-cols-2 gap-2">
          {GEN_EDITS.map((e) => (
            <label key={e.id} className="flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm cursor-pointer hover:bg-secondary">
              <input type="checkbox" className="mt-0.5" checked={selected.includes(e.id)} onChange={() => toggle(e.id)} />
              <span className="text-foreground">
                {e.label}
                {e.exempt && <span className="ml-1 text-xs text-muted-foreground">(exempt)</span>}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="font-medium text-foreground">2. Link to the original image</span>
        <span className="block text-xs text-muted-foreground mt-0.5">Optional — a publicly accessible page showing the unaltered photo. Leave blank to keep a placeholder.</span>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://"
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
        />
      </label>

      <div className="mt-6" aria-live="polite">
        <div className="font-medium text-foreground">3. Your disclosure</div>
        {result.kind === "empty" && (
          <p className="mt-2 text-sm text-muted-foreground">Pick at least one edit above.</p>
        )}
        {result.kind === "exempt" && (
          <p className="mt-2 rounded-md border border-success/30 bg-success/10 p-4 text-sm text-foreground">
            No AB 723 disclosure needed for these edits. Section 10140.8(b)(2) excludes lighting, sharpening, white balance, color correction, angle, straightening, cropping, and exposure adjustments that don't change how the property is represented. Your MLS may still have its own rules.
          </p>
        )}
        {result.kind === "required" && (
          <div className="mt-3 space-y-4">
            <Output label="On or next to the photo (caption, flyer, website)" text={result.caption} />
            <Output label="MLS photo description" text={result.mlsDescription} />
            <Output label="Listing remarks (whole listing)" text={result.remarks} />
          </div>
        )}
      </div>

      <div className="mt-8 rounded-lg bg-secondary/60 p-5">
        <div className="font-medium text-foreground">Documenting a whole shoot?</div>
        <p className="mt-1 text-sm text-muted-foreground">
          A RetouchLint packet pairs every original with its final, records the edits photo by photo, and captures the photographer's attestation.
        </p>
        <a href="/projects/new" className="mt-3 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Create a packet
        </a>
      </div>
    </div>
  );
}

function Output({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — text is still selectable */
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
        <button type="button" onClick={copy} className="text-xs rounded-md border border-border px-2.5 py-1 text-foreground hover:bg-secondary">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-1.5 rounded-md border border-border bg-background p-3 text-sm text-foreground select-all">{text}</p>
    </div>
  );
}
