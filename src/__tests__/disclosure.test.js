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
    for (const e of GEN_EDITS.filter((x) => !x.exempt && !x.noOriginal)) {
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

  it('rental mode uses § 1940.11 "via the link" wording', () => {
    const d = generateDisclosure(['virtual_staging'], 'https://example.com/o', 'rental');
    expect(d.caption).toBe('Digitally altered image: virtually staged with furniture or decor. The original, unaltered image can be accessed via https://example.com/o.');
    expect(d.remarks).toMatch(/this rental/);
  });

  it('fully AI-generated images get a disclosure but no original link', () => {
    for (const mode of ['sale', 'rental']) {
      const d = generateDisclosure(['ai_generated'], '', mode);
      expect(d.kind).toBe('generated');
      expect(d.caption).toMatch(/AI-generated/);
      expect(d.caption).not.toContain(LINK_PLACEHOLDER);
    }
  });

  it('AI-generated plus edits: lists only the edits, keeps the link', () => {
    const d = generateDisclosure(['ai_generated', 'sky'], '');
    expect(d.kind).toBe('required');
    expect(d.caption).toMatch(/sky replaced/);
    expect(d.caption).not.toMatch(/generated with AI/);
  });
});
