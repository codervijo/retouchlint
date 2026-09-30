// AB 723 disclosure generator — the statement must satisfy § 10140.8(a)(1):
// say the image was altered AND say the unaltered image is at the link.
import { describe, it, expect } from 'vitest';
import { generateDisclosure, GEN_EDITS, LINK_PLACEHOLDER } from '../lib/disclosure';

describe('generateDisclosure', () => {
  it('returns empty with nothing selected', () => {
    expect(generateDisclosure([]).kind).toBe('empty');
  });

  it('treats § 10140.8(b)(2) adjustments alone as exempt', () => {
    expect(generateDisclosure(['lighting_color', 'framing', 'sharpening']).kind).toBe('exempt');
  });

  it('every altering edit produces all three statutory-shaped texts', () => {
    for (const e of GEN_EDITS.filter((x) => !x.exempt)) {
      const d = generateDisclosure([e.id]);
      expect(d.kind, e.id).toBe('required');
      for (const t of [d.caption, d.mlsDescription, d.remarks]) {
        expect(t).toMatch(/digitally altered/i);
        expect(t).toMatch(/original, unaltered/);
        expect(t).toContain(LINK_PLACEHOLDER);
      }
    }
  });

  it('lists only the altering edits, and uses the supplied link', () => {
    const d = generateDisclosure(['virtual_staging', 'lighting_color'], ' https://example.com/orig ');
    expect(d.caption).toBe('Digitally altered image: virtually staged with furniture or decor. The original, unaltered image can be accessed at https://example.com/orig.');
    expect(d.caption).not.toMatch(/exposure/);
  });

  it('matches the worked example on the page', () => {
    const d = generateDisclosure(['sky', 'landscape', 'exterior_objects']);
    expect(d.caption).toMatch(/^Digitally altered image: lawn or landscaping enhanced; sky replaced; and utility poles, wires, streetlights, or vehicles removed\./);
  });
});
