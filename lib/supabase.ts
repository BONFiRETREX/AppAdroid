import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

const esClavePublicaValida =
  supabasePublishableKey?.startsWith('sb_publishable_') ||
  supabasePublishableKey?.startsWith('eyJ');

if (!supabaseUrl || !supabasePublishableKey || !esClavePublicaValida) {
  throw new Error(
    'La clave pública de Supabase es inválida o falta. En .env pega la Publishable key de Dashboard > Connect en EXPO_PUBLIC_SUPABASE_KEY; no uses el texto de ejemplo ni service_role.'
  );
}

/** Cliente compartido para Huellitas Veterinaria.
 * Esta práctica no incluye autenticación, por eso no persiste sesiones.
 */
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
