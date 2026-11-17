'use server';

import { supabase } from '@/lib/supabase';
import { timingSafeEqual } from 'crypto';

/**
 * Checks the admin password against ADMIN_PASSWORD (fails closed when unset).
 * @param {string} password The password to check.
 * @return {boolean} Whether it matches.
 */
function isAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== 'string') return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Interface for RSVP form data.
 */
export interface RSVPData {
  name: string;
  email: string;
  attending: string;
  phone: string;
}

/**
 * Server action to submit an RSVP to Supabase.
 * @param {RSVPData} data The RSVP data to save.
 * @return {Promise<{success: boolean, error?: string}>} The result of the operation.
 */
export async function submitRSVP(data: RSVPData) {
  const { error } = await supabase
    .from('rsvps')
    .insert([
      {
        name: data.name,
        email: data.email,
        attending: data.attending,
        phone: data.phone,
      },
    ]);

  if (error) {
    console.error('Error submitting RSVP:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Normalizes what a guest typed: digits only for phone numbers, otherwise
 * lowercase, accent-free, single-spaced name.
 * @param {string} input Raw search text.
 * @return {string} The normalized lookup key.
 */
function normalizeLookup(input: string) {
  const text = String(input || '').slice(0, 100);
  if (!/[a-zA-Z]/.test(text)) return text.replace(/\D/g, '');
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .join(' ');
}

/**
 * Finds a guest's personal RSVP link (Assessoria VIP) by full name or phone.
 * The invites table has no public read policy: lookup goes through the
 * find_invite() database function, which only returns an exact match.
 * @param {string} query Full name or phone typed by the guest.
 * @return {Promise<{success: boolean, found: boolean, inviteName?: string, url?: string, error?: string}>}
 */
export async function findInvite(query: string) {
  const q = normalizeLookup(query);
  if (q.length < 6) return { success: true, found: false };

  const { data, error } = await supabase.rpc('find_invite', { q });
  if (error) {
    console.error('Error finding invite:', error);
    return { success: false, found: false, error: error.message };
  }

  const row = Array.isArray(data) ? data[0] : null;
  if (!row || typeof row.rsvp_url !== 'string' || !row.rsvp_url.startsWith('https://assessoriavip.com.br/')) {
    return { success: true, found: false };
  }
  return { success: true, found: true, inviteName: row.invite_name as string, url: row.rsvp_url as string };
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Lists every invite (id, display name, searchable guest names) for the
 * type-to-filter dropdown. Phone numbers are never returned.
 * @return {Promise<{success: boolean, invites: {id: string, name: string, aliases: string[]}[]}>} All invites.
 */
export async function listInvites() {
  const { data, error } = await supabase.rpc('list_invites');
  if (error) {
    console.error('Error listing invites:', error);
    return { success: false, invites: [] };
  }
  const invites = (Array.isArray(data) ? data : []).map(
    (r: { id: string; invite_name: string; aliases: string[] | null }) => ({
      id: r.id,
      name: r.invite_name,
      aliases: r.aliases || [],
    }),
  );
  return { success: true, invites };
}

/**
 * Gets the personal RSVP link of the invite picked in the dropdown.
 * @param {string} id The invite id returned by listInvites.
 * @return {Promise<{success: boolean, found: boolean, inviteName?: string, url?: string}>} The invite link.
 */
export async function getInviteLink(id: string) {
  if (!UUID_RE.test(id)) return { success: true, found: false };
  const { data, error } = await supabase.rpc('get_invite_link', { p_id: id });
  if (error) {
    console.error('Error getting invite link:', error);
    return { success: false, found: false };
  }
  const row = Array.isArray(data) ? data[0] : null;
  if (!row || typeof row.rsvp_url !== 'string' || !row.rsvp_url.startsWith('https://assessoriavip.com.br/')) {
    return { success: true, found: false };
  }
  return { success: true, found: true, inviteName: row.invite_name as string, url: row.rsvp_url as string };
}

/**
 * Fetches all RSVPs from Supabase (admin only).
 * @param {string} password The admin password.
 * @return {Promise<{success: boolean, data?: any[], error?: string}>} The fetched RSVPs.
 */
export async function getRSVPs(password: string) {
  if (!isAdminPassword(password)) return { success: false, error: 'Unauthorized' };
  const { data, error } = await supabase.rpc('admin_list_rsvps', { p_token: process.env.ADMIN_DB_TOKEN || '' });

  if (error) {
    console.error('Error fetching RSVPs:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

/**
 * Fetches every gift (who sent it, what, how much, how they paid) for the admin.
 * Requires the admin password; reads through a token-protected DB function.
 * @param {string} password The admin password.
 * @return {Promise<{success: boolean, data?: any[], error?: string}>} The gifts, newest first.
 */
export async function getGiftMessages(password: string) {
  if (!isAdminPassword(password)) return { success: false, error: 'Unauthorized' };
  const { data, error } = await supabase.rpc('admin_list_gifts', { p_token: process.env.ADMIN_DB_TOKEN || '' });

  if (error) {
    console.error('Error fetching gifts:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

/**
 * Validates the admin password.
 * @param {string} password The password to check.
 * @return {Promise<{success: boolean}>} Whether the password is correct.
 */
export async function validateAdminPassword(password: string) {
  return { success: isAdminPassword(password) };
}

/**
 * Interface for gift message data.
 */
export interface GiftMessageData {
  gifterName: string;
  note: string;
  amount: number;
  items: string[];
  paymentMethod: string;
  region: string;
  /** 'pix_copiado' (copied the Pix code, unconfirmed) | 'pagamento_informado' (guest says they paid). */
  status?: string;
  /** One id per checkout so the admin can collapse its rows into one. */
  attemptId?: string;
}

/**
 * Saves a gift message to Supabase.
 * @param {GiftMessageData} data The gift message and order info.
 * @return {Promise<{success: boolean, error?: string}>} The result.
 */
export async function submitGiftMessage(data: GiftMessageData) {
  const row = {
    name: data.gifterName,
    note: data.note,
    amount: data.amount,
    items: data.items.join(', '),
    payment_method: data.paymentMethod,
    region: data.region,
  };
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const extra = {
    status: data.status === 'pix_copiado' || data.status === 'pagamento_informado' ? data.status : null,
    attempt_id: data.attemptId && uuid.test(data.attemptId) ? data.attemptId : null,
  };

  let { error } = await supabase.from('gift_messages').insert([{ ...row, ...extra }]);

  // Never lose a gift because of the optional columns: retry with the base fields.
  if (error && /status|attempt_id|column/i.test(error.message)) {
    ({ error } = await supabase.from('gift_messages').insert([row]));
  }

  if (error) {
    console.error('Error saving gift message:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Interface for a guestbook message.
 */
export interface GuestbookMessageInput {
  name: string;
  text: string;
}

/**
 * Persists a guestbook message to Supabase.
 * @param {GuestbookMessageInput} data The guest's name and message.
 * @return {Promise<{success: boolean, error?: string}>} The result.
 */
export async function submitGuestbookMessage(data: GuestbookMessageInput) {
  const { error } = await supabase
    .from('guestbook_messages')
    .insert([{ name: data.name, text: data.text }]);

  if (error) {
    console.error('Error submitting guestbook message:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Reads all guestbook messages from Supabase, newest first.
 * @return {Promise<{success: boolean, data?: any[], error?: string}>} The fetched messages.
 */
export async function getGuestbookMessages() {
  const { data, error } = await supabase
    .from('guestbook_messages')
    .select('id, name, text, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching guestbook messages:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
