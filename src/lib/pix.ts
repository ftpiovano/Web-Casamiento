/**
 * Builds a Pix "copia e cola" payload (BR Code / EMV-MPM, static with amount).
 * Spec: Banco Central do Brasil — Manual do BR Code.
 */

/**
 * Formats one EMV TLV field: id + 2-digit length + value.
 * @param {string} id Two-digit field id.
 * @param {string} value Field value.
 * @return {string} The encoded field.
 */
function tlv(id: string, value: string) {
  return `${id}${String(value.length).padStart(2, '0')}${value}`;
}

/**
 * CRC16-CCITT (poly 0x1021, init 0xFFFF) as required by the BR Code.
 * @param {string} payload The payload up to and including the "6304" prefix.
 * @return {string} 4-char uppercase hex checksum.
 */
export function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Strips accents/symbols and uppercases, as the BR Code only allows plain ASCII.
 * @param {string} text Raw text.
 * @param {number} max Maximum length.
 * @return {string} Sanitized text.
 */
function ascii(text: string, max: number) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .toUpperCase()
    .trim()
    .slice(0, max);
}

export interface PixParams {
  key: string;
  receiverName: string;
  city: string;
  amount?: number;
  txid?: string;
}

/**
 * Creates the Pix "copia e cola" string for a payment to `key`.
 * @param {PixParams} params Pix key, receiver, city and optional amount (BRL).
 * @return {string} The payload to copy or encode in a QR Code.
 */
export function buildPixPayload({ key, receiverName, city, amount, txid = '***' }: PixParams) {
  const account = tlv('00', 'br.gov.bcb.pix') + tlv('01', key.trim());
  let payload =
    tlv('00', '01') +
    tlv('26', account) +
    tlv('52', '0000') +
    tlv('53', '986');
  if (amount && amount > 0) payload += tlv('54', amount.toFixed(2));
  payload +=
    tlv('58', 'BR') +
    tlv('59', ascii(receiverName, 25)) +
    tlv('60', ascii(city, 15)) +
    tlv('62', tlv('05', ascii(txid, 25) || '***'));
  payload += '6304';
  return payload + crc16(payload);
}
