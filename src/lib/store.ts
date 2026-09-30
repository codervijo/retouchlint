// Client-side mock store using localStorage. MVP scope.
import { LINK_PLACEHOLDER, joinList } from "./disclosure";
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

// `material: false` = the § 10140.8(b)(2) adjustments that fall outside the
// statute's "digitally altered image". `phrase` is used in the disclosure text.
export const EDIT_OPTIONS: { id: EditTag; label: string; material: boolean; description: string; phrase: string }[] = [
  { id: "sky_replaced", label: "Sky replaced", material: true, description: "Original sky substituted with a different sky image.", phrase: "sky replaced" },
  { id: "grass_enhanced", label: "Grass / lawn enhanced", material: true, description: "Lawn or landscaping digitally greened or repaired.", phrase: "lawn or landscaping enhanced" },
  { id: "furniture_added", label: "Furniture added", material: true, description: "Furniture or decor inserted that was not physically present.", phrase: "furniture or decor added" },
  { id: "furniture_removed", label: "Furniture removed", material: true, description: "Existing items digitally removed from the room.", phrase: "existing items removed" },
  { id: "virtual_staging", label: "Virtual staging", material: true, description: "Empty space digitally staged with furniture and decor.", phrase: "virtually staged with furniture or decor" },
  { id: "surface_changed", label: "Wall, floor, or color changed", material: true, description: "Paint color, flooring, or finishes altered from actual condition.", phrase: "wall, floor, or paint color changed" },
  { id: "defects_removed", label: "Defects removed", material: true, description: "Cracks, stains, wires, or other condition issues edited out.", phrase: "defects or objects such as cracks, stains, or wires removed" },
  { id: "lighting_color", label: "Lighting / color correction only", material: false, description: "Exposure, white balance, and contrast adjustments.", phrase: "lighting or color corrected" },
  { id: "crop_straighten", label: "Crop / straighten only", material: false, description: "Framing and perspective corrections.", phrase: "cropped or straightened" },
  { id: "other", label: "Other", material: true, description: "Other material edit described in notes.", phrase: "other alterations (see photo notes)" },
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
  /** Publicly accessible page showing the unaltered originals (AB 723 link). */
  originalsUrl?: string;
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

// Wording follows Bus. & Prof. Code § 10140.8(a)(1): say the images were
// altered, and say the unaltered images can be accessed at the linked
// website, URL, or QR code. Same shape as the free generator (lib/disclosure.ts).
export function disclosureText(project: Project): string {
  const tags = new Set<EditTag>();
  project.pairs.forEach((p) => p.edits.forEach((e) => tags.add(e)));
  const material = EDIT_OPTIONS.filter((o) => tags.has(o.id) && o.material);
  const minor = EDIT_OPTIONS.filter((o) => tags.has(o.id) && !o.material);

  if (material.length === 0 && minor.length === 0) {
    return `No digital alterations were declared for the photos of ${project.address}.`;
  }
  if (material.length === 0) {
    return `Photos of ${project.address} were edited only with adjustments that are not digital alterations under California Business and Professions Code § 10140.8(b)(2): ${joinList(minor.map((m) => m.phrase))}.`;
  }
  const url = project.originalsUrl?.trim() || LINK_PLACEHOLDER;
  return [
    `DISCLOSURE — Digitally Altered Listing Photos`,
    ``,
    `Some photos of ${project.address} have been digitally altered: ${joinList(material.map((m) => m.phrase))}. The original, unaltered images can be accessed at ${url}.`,
    ``,
    `On or next to each altered photo: "Digitally altered image. The original, unaltered image can be accessed at ${url}."`,
  ].join("\n");
}

export function recommendation(project: Project): { level: "none" | "exempt" | "required"; summary: string } {
  const tags = new Set<EditTag>();
  project.pairs.forEach((p) => p.edits.forEach((e) => tags.add(e)));
  const material = EDIT_OPTIONS.some((o) => tags.has(o.id) && o.material);
  if (material) return { level: "required", summary: "Digitally altered photos. For California listings, AB 723 requires a disclosure on or next to each altered photo plus a link to a publicly accessible copy of the original." };
  if (tags.size > 0) return { level: "exempt", summary: "Only adjustments excluded by § 10140.8(b)(2), such as exposure or color correction. No AB 723 disclosure is needed; your MLS may have its own rules." };
  return { level: "none", summary: "No edits documented. No disclosure needed." };
}
