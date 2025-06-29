import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Brak konfiguracji Supabase w backendzie');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
