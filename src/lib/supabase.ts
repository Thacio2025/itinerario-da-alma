import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "";

/** false em produção se o build (ex.: Netlify) não recebeu as env VITE_* */
export function isSupabaseConfigured(): boolean {
  return (
    Boolean(supabaseUrl && supabaseAnonKey) &&
    /^https?:\/\//i.test(supabaseUrl)
  );
}

if (!isSupabaseConfigured()) {
  console.warn(
    "[Itinerário da Alma] Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (URL absoluta https://...supabase.co)",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
