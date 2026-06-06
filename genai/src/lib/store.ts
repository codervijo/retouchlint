// Client-side mock store using localStorage. MVP scope.
export type EditTag =
  | "sky_replaced"
  | "grass_enhanced"
  | "furniture_added"
  | "furniture_removed"
  | "virtual_staging"
  | "surface_changed"
  | "defects_removed"
  | "lighting_color"
  | "crop_straighten"
  | "other";

export const EDIT_OPTIONS: { id: EditTag; label: string; material: boolean; description: string }[] = [
  { id: "sky_replaced", label: "Sky replaced", material: true, description: "Original sky substituted with a different sky image." },
  { id: "grass_enhanced", label: "Grass / lawn enhanced", material: true, description: "Lawn or landscaping digitally greened or repaired." },
  { id: "furniture_added", label: "Furniture added", material: true, description: "Furniture or decor inserted that was not physically present." },
  { id: "furniture_removed", label: "Furniture removed", material: true, description: "Existing items digitally removed from the room." },
  { id: "virtual_staging", label: "Virtual staging", material: true, description: "Empty space digitally staged with furniture and decor." },
  { id: "surface_changed", label: "Wall, floor, or color changed", material: true, description: "Paint color, flooring, or finishes altered from actual condition." },
  { id: "defects_removed", label: "Defects removed", material: true, description: "Cracks, stains, wires, or other condition issues edited out." },
  { id: "lighting_color", label: "Lighting / color correction only", material: false, description: "Exposure, white balance, and contrast adjustments." },
  { id: "crop_straighten", label: "Crop / straighten only", material: false, description: "Framing and perspective corrections." },
  { id: "other", label: "Other", material: true, description: "Other material edit described in notes." },
];

export type Photo = { id: string; name: string; dataUrl: string };
export type PhotoPair = {
  id: string;
  originalId: string;
  editedId: string;
  edits: EditTag[];
  notes?: string;
};
export type Attestation = {
  signed: boolean;
  name: string;
  role: string;
  date: string;
};
export type Project = {
  id: string;
  address: string;
  agent: string;
  brokerage: string;
  mls?: string;
  createdAt: string;
  originals: Photo[];
  edited: Photo[];
  pairs: PhotoPair[];
  attestation: Attestation;
  published: boolean;
};

const KEY = "retouchlint:v1";

function read(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
function write(list: Project[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("retouchlint:change"));
}

export const store = {
  list(): Project[] {
    return read();
  },
  get(id: string): Project | undefined {
    return read().find((p) => p.id === id);
  },
  create(input: { address: string; agent: string; brokerage: string; mls?: string }): Project {
    const p: Project = {
      id: crypto.randomUUID(),
      address: input.address,
      agent: input.agent,
      brokerage: input.brokerage,
      mls: input.mls,
      createdAt: new Date().toISOString(),
      originals: [],
      edited: [],
      pairs: [],
      attestation: { signed: false, name: "", role: "", date: "" },
      published: false,
    };
    write([p, ...read()]);
    return p;
  },
  update(id: string, patch: Partial<Project>) {
    write(read().map((p) => (p.id === id ? { ...p, ...patch } : p)));
  },
  remove(id: string) {
    write(read().filter((p) => p.id !== id));
  },
};

export function disclosureText(project: Project): string {
  const tags = new Set<EditTag>();
  project.pairs.forEach((p) => p.edits.forEach((e) => tags.add(e)));
  const material = EDIT_OPTIONS.filter((o) => tags.has(o.id) && o.material);
  const minor = EDIT_OPTIONS.filter((o) => tags.has(o.id) && !o.material);

  if (material.length === 0 && minor.length === 0) {
    return `Photos of ${project.address} are presented as captured, with no material digital alterations. Original source images are archived and available on request.`;
  }
  const lines: string[] = [];
  lines.push(`DISCLOSURE — Digitally Altered Listing Photos`);
  lines.push(``);
  lines.push(`Some photographs of ${project.address} have been digitally edited. The following changes were applied to one or more images in this listing:`);
  lines.push(``);
  material.forEach((m) => lines.push(`• ${m.label} — ${m.description}`));
  if (minor.length) {
    lines.push(``);
    lines.push(`Non-material adjustments also applied: ${minor.map((m) => m.label.toLowerCase()).join(", ")}.`);
  }
  lines.push(``);
  lines.push(`Original, unedited source photos are archived and available for inspection. Buyers and their representatives are encouraged to review the property in person and request the original image archive prior to making any offer.`);
  return lines.join("\n");
}

export function recommendation(project: Project): { level: "none" | "recommended" | "required"; summary: string } {
  const tags = new Set<EditTag>();
  project.pairs.forEach((p) => p.edits.forEach((e) => tags.add(e)));
  const material = EDIT_OPTIONS.some((o) => tags.has(o.id) && o.material);
  const minor = [...tags].some((t) => !EDIT_OPTIONS.find((o) => o.id === t)?.material);
  if (material) return { level: "required", summary: "Material edits detected. Written disclosure is strongly recommended for MLS and marketing materials." };
  if (minor) return { level: "recommended", summary: "Only non-material adjustments detected. A brief note is recommended for transparency." };
  return { level: "none", summary: "No edits documented. No disclosure required at this time." };
}
