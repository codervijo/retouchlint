// AB 723 disclosure text for /tools/disclosure-generator/.
//
// Wording follows Bus. & Prof. Code § 10140.8(a)(1): the statement must say
// the image has been altered AND say the unaltered images can be accessed at
// the linked website, URL, or QR code. Edits marked `exempt` are the
// § 10140.8(b)(2) adjustments that fall outside "digitally altered image".
// Checked against the statute text on leginfo.legislature.ca.gov, 2026-09-30.

export type GenEdit = {
  id: string;
  label: string;
  /** Past-tense phrase used inside the generated statement. */
  phrase: string;
  exempt: boolean;
};

export const GEN_EDITS: GenEdit[] = [
  { id: "virtual_staging", label: "Virtual staging (furniture or decor added)", phrase: "virtually staged with furniture or decor", exempt: false },
  { id: "items_removed", label: "Furniture or personal items removed", phrase: "furniture or personal items removed", exempt: false },
  { id: "fixtures", label: "Fixtures or appliances added, removed, or changed", phrase: "fixtures or appliances changed", exempt: false },
  { id: "surfaces", label: "Walls, flooring, or paint color changed", phrase: "walls, flooring, or paint color changed", exempt: false },
  { id: "landscape", label: "Lawn or landscaping enhanced", phrase: "lawn or landscaping enhanced", exempt: false },
  { id: "sky", label: "Sky replaced", phrase: "sky replaced", exempt: false },
  { id: "exterior_objects", label: "Utility poles, wires, streetlights, or vehicles removed", phrase: "utility poles, wires, streetlights, or vehicles removed", exempt: false },
  { id: "window_view", label: "View through windows replaced", phrase: "view through windows replaced", exempt: false },
  { id: "defects", label: "Defects removed (cracks, stains, damage)", phrase: "defects such as cracks, stains, or damage removed", exempt: false },
  { id: "lighting_color", label: "Exposure, lighting, white balance, or color correction", phrase: "exposure or color adjusted", exempt: true },
  { id: "framing", label: "Cropping, straightening, or angle correction", phrase: "cropped or straightened", exempt: true },
  { id: "sharpening", label: "Sharpening", phrase: "sharpened", exempt: true },
];

export const LINK_PLACEHOLDER = "[link to original image]";

export type Disclosure =
  | { kind: "empty" }
  | { kind: "exempt" }
  | { kind: "required"; caption: string; mlsDescription: string; remarks: string };

export function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join("; ")}; and ${items[items.length - 1]}`;
}

export function generateDisclosure(selected: string[], link = ""): Disclosure {
  const chosen = GEN_EDITS.filter((e) => selected.includes(e.id));
  if (chosen.length === 0) return { kind: "empty" };
  const altering = chosen.filter((e) => !e.exempt);
  if (altering.length === 0) return { kind: "exempt" };

  const url = link.trim() || LINK_PLACEHOLDER;
  const what = joinList(altering.map((e) => e.phrase));

  return {
    kind: "required",
    caption: `Digitally altered image: ${what}. The original, unaltered image can be accessed at ${url}.`,
    mlsDescription: `Digitally altered — ${what}. The original, unaltered photo appears next to this image in the listing and can be accessed at ${url}.`,
    remarks: `Some photos of this property have been digitally altered (${what}). The original, unaltered images can be accessed at ${url}.`,
  };
}
