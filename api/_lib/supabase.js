import { createClient } from '@supabase/supabase-js';

let cachedClient = null;

/**
 * Returns a trusted Supabase client using Service-Role key from server environment.
 * The client bypasses public RLS to read registration data and update team answers.
 */
export function getSupabaseAdmin() {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase server credentials missing in process.env (SUPABASE_URL and SUPABASE_SECRET_KEY required).');
  }

  cachedClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  return cachedClient;
}

/**
 * Normalizes email: lowercases and trims.
 */
export function normalizeEmail(email) {
  if (typeof email !== 'string') return '';
  return email.trim().toLowerCase();
}

/**
 * Normalizes phone number: strips non-digits or standardizes string.
 */
export function normalizePhone(phone) {
  if (typeof phone !== 'string' && typeof phone !== 'number') return '';
  return String(phone).replace(/\D/g, '');
}
