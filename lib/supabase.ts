import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

const esClavePublicaValida =
  supabasePublishableKey?.startsWith('sb_publishable_') ||
  supabasePublishableKey?.startsWith('eyJ');

if (!supabaseUrl || !supabasePublishableKey || !esClavePublicaValida) {
  throw new Error(
    'Falta una clave pública válida de Supabase. Configura EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_KEY; nunca uses service_role en la app.',
  );
}

/** Cliente compartido para Huellitas Veterinaria con sesión persistente. */
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    // En Android e iOS, AsyncStorage conserva la sesión al cerrar la app.
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

// Supabase renueva el token únicamente mientras la aplicación está activa.
// Este listener se registra una sola vez al cargar este módulo.
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (estado) => {
    if (estado === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
