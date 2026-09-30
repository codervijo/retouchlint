// Homepage FAQ — rendered by Landing.tsx and emitted as FAQPage JSON-LD by
// src/pages/index.astro from this one array, so the schema always matches the
// visible text.
//
// Every claim here was checked on 2026-09-30 against:
//   - Bus. & Prof. Code § 10140.8 (enrolled AB 723), leginfo.legislature.ca.gov
//   - CRMLS Digitally Altered Image Guidance & FAQs, kb.crmls.org
//   - Bay East Digitally Altered MLS Photo Rule, bayeast.org
// Penalty amounts are deliberately absent: CRMLS sources disagreed on them.

export const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: "Who does AB 723 apply to?",
    a: "A real estate broker or salesperson, or a person acting on their behalf, who includes a digitally altered image in an advertisement or other promotional material for the sale of real property. A photographer or editor producing listing images at an agent's direction is working on the agent's behalf, so the agent's disclosure depends on the photographer's record of what changed.",
  },
  {
    q: "Which edits make a listing photo \"digitally altered\" under § 10140.8?",
    a: "Adding, removing, or changing elements in the image with photo-editing software or AI — the statute lists fixtures, furniture, appliances, flooring, walls, paint color, hardscape, landscape, facade, floor plans, and elements outside or visible from the property such as streetlights, utility poles, views through windows, and neighboring properties. The list is \"including, but not limited to\", so it is not exhaustive.",
  },
  {
    q: "Do color correction and exposure edits need a disclosure?",
    a: "No. The statute excludes images where only lighting, sharpening, white balance, color correction, angle, straightening, cropping, exposure, or other common adjustments were made that do not change the representation of the property.",
  },
  {
    q: "What does the disclosure itself have to say?",
    a: "It must state that the image has been altered, be reasonably conspicuous and located on or adjacent to the image, and include language saying the unaltered images can be accessed at the linked website, URL, or QR code. The link must lead to a publicly accessible page that includes and clearly identifies the original, unaltered image.",
  },
  {
    q: "What does CRMLS Rule 11.5.2 add on top of AB 723?",
    a: "CRMLS requires the original, unaltered photo to appear in the MLS listing immediately before or after the digitally altered one, and the altered photo to be labeled in the photo description field. Other MLSs have their own versions — Bay East's rule, also numbered 11.5.2, requires the original immediately after the altered image — so check your board's rules.",
  },
  {
    q: "When did AB 723 take effect?",
    a: "January 1, 2026. AB 723 was signed on October 10, 2025 and added Section 10140.8 to the California Business and Professions Code.",
  },
];
