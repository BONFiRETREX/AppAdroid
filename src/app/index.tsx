import { Redirect } from 'expo-router';

import { useAuth } from '../context/AuthContext';

/**
 * Punto de entrada para el esquema nativo miprimeraapp:///.
 * Al abrir la APK, Expo Router necesita una ruta raiz antes de
 * decidir si el usuario debe ver Login o las pantallas privadas.
 */
export default function Inicio() {
  const { session } = useAuth();

  return <Redirect href={session ? '/app' : '/auth/login'} />;
}
