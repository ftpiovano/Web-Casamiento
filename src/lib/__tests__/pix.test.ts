import { describe, it, expect } from 'vitest';
import { buildPixPayload, crc16 } from '../pix';

/** Decodes a flat EMV TLV string into { id: value } (like a bank app would). */
function parse(s: string) {
  const out: Record<string, string> = {};
  let i = 0;
  while (i < s.length) {
    const id = s.slice(i, i + 2);
    const len = parseInt(s.slice(i + 2, i + 4), 10);
    out[id] = s.slice(i + 4, i + 4 + len);
    i += 4 + len;
  }
  return out;
}

describe('pix', () => {
  it('computes CRC16-CCITT-FALSE (standard check value)', () => {
    expect(crc16('123456789')).toBe('29B1');
  });

  it('builds a valid static payload with key, amount and checksum', () => {
    const p = buildPixPayload({ key: 'user@example.com', receiverName: 'Alexita & Chico', city: 'São Paulo', amount: 400 });
    const f = parse(p);
    expect(f['00']).toBe('01');
    expect(parse(f['26'])).toEqual({ '00': 'br.gov.bcb.pix', '01': 'user@example.com' });
    expect(f['52']).toBe('0000');
    expect(f['53']).toBe('986');
    expect(f['54']).toBe('400.00');
    expect(f['58']).toBe('BR');
    expect(f['59']).toBe('ALEXITA  CHICO');
    expect(f['60']).toBe('SAO PAULO');
    expect(parse(f['62'])).toEqual({ '05': '***' });
    // CRC covers everything up to and including "6304"
    expect(f['63']).toBe(crc16(p.slice(0, -4)));
    expect(p.slice(-8, -4)).toBe('6304');
  });

  it('formats decimals and omits the amount when it is zero; strips accents', () => {
    expect(parse(buildPixPayload({ key: 'a@b.co', receiverName: 'X', city: 'Y', amount: 99.5 }))['54']).toBe('99.50');
    const f = parse(buildPixPayload({ key: 'a@b.co', receiverName: 'José', city: 'Brasília', amount: 0 }));
    expect(f['54']).toBeUndefined();
    expect(f['59']).toBe('JOSE');
    expect(f['60']).toBe('BRASILIA');
  });
});
