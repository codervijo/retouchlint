// Packet disclosure text (store.ts) must meet § 10140.8(a)(1) like the free
// generator: say the photos were altered AND where the originals can be accessed.
import { describe, it, expect } from 'vitest';
import { disclosureText, recommendation, EDIT_OPTIONS } from '../lib/store';
import { LINK_PLACEHOLDER } from '../lib/disclosure';

const project = (edits, originalsUrl) => ({
  id: 'p', address: '142 Elm St', agent: '', brokerage: '', createdAt: '',
  originals: [], edited: [], published: false, originalsUrl,
  attestation: { signed: false, name: '', role: '', date: '' },
  pairs: [{ id: 'a', originalId: 'o', editedId: 'e', edits }],
});

describe('packet disclosureText', () => {
  it('altered photos: statement + link language, placeholder until a URL is set', () => {
    const t = disclosureText(project(['virtual_staging', 'lighting_color']));
    expect(t).toMatch(/have been digitally altered: virtually staged/);
    expect(t).toMatch(/original, unaltered images can be accessed at \[link to original image\]/);
    expect(t).not.toMatch(/on request/i);
    expect(t).not.toMatch(/lighting/);
  });

  it('uses the packet originalsUrl when present', () => {
    const t = disclosureText(project(['sky_replaced'], 'https://ex.com/orig'));
    expect(t).toContain('can be accessed at https://ex.com/orig.');
    expect(t).not.toContain(LINK_PLACEHOLDER);
  });

  it('exempt-only edits cite § 10140.8(b)(2) and ask for no link', () => {
    const t = disclosureText(project(['lighting_color', 'crop_straighten']));
    expect(t).toMatch(/10140\.8\(b\)\(2\)/);
    expect(t).not.toContain(LINK_PLACEHOLDER);
    expect(recommendation(project(['lighting_color'])).level).toBe('exempt');
  });

  it('every material tag yields AB 723-shaped text', () => {
    for (const o of EDIT_OPTIONS.filter((x) => x.material)) {
      expect(recommendation(project([o.id])).level, o.id).toBe('required');
      expect(disclosureText(project([o.id])), o.id).toMatch(/digitally altered: .*The original, unaltered images can be accessed at/s);
    }
  });
});

describe('landing copy makes no unsupported claims', () => {
  it('drops permanent-link, PDF, C2PA and NAR claims outside pricing', async () => {
    const { readFileSync } = await import('node:fs');
    const src = readFileSync('src/components/Landing.tsx', 'utf8').replace(/function Pricing[\s\S]*?\n}\n/, '');
    for (const bad of [/permanent reference link/i, /PDF packet/i, /C2PA/, /NAR-aligned/, /Public original-photo links/]) {
      expect(src).not.toMatch(bad);
    }
  });
});
