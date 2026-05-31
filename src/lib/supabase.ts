import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isTest = process.env.NODE_ENV === 'test';

if (!isTest && (!supabaseUrl || !supabaseAnonKey)) {
  // Loud error in server logs — easier to triage than a generic
  // "fetch failed" from a placeholder URL.
  console.error(
    '[supabase] Missing env vars: ' +
      [
        !supabaseUrl && 'NEXT_PUBLIC_SUPABASE_URL',
        !supabaseAnonKey && 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      ]
        .filter(Boolean)
        .join(', ') +
      '. Database calls will fail.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
);

