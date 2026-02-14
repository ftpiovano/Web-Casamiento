'use server';

import { supabase } from '@/lib/supabase';

/**
 * Interface for RSVP form data.
 */
export interface RSVPData {
  name: string;
  email: string;
  attending: string;
  adults: number;
  kids: number;
  notes: string;
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
        adults: data.adults,
        kids: data.kids,
        notes: data.notes,
      },
    ]);

  if (error) {
    console.error('Error submitting RSVP:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Fetches all RSVPs from Supabase.
 * @return {Promise<{success: boolean, data?: any[], error?: string}>} The fetched RSVPs.
 */
export async function getRSVPs() {
  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching RSVPs:', error);
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
  const correctPassword = process.env.ADMIN_PASSWORD;
  return { success: password === correctPassword };
}
