import type { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { supabase } from '../../lib/supabase';

type AuthContextValue = {
  session: Session | null;
  cargando: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    const obtenerSesion = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('No se pudo recuperar la sesión:', error.message);
      }

      if (activo) {
        setSession(data.session);
        setCargando(false);
      }
    };

    void obtenerSesion();

    const { data: suscripcion } = supabase.auth.onAuthStateChange((_evento, nuevaSesion) => {
      if (activo) {
        setSession(nuevaSesion);
        setCargando(false);
      }
    });

    return () => {
      activo = false;
      suscripcion.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ session, cargando }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.');
  }

  return contexto;
}
