import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const suscribirse = () => () => {};
const obtenerEstadoCliente = () => true;
const obtenerEstadoServidor = () => false;

/**
 * Durante el renderizado estático se usa "light". Después de hidratar la web,
 * React vuelve a calcular el tema del dispositivo sin actualizar estado dentro
 * de un efecto.
 */
export function useColorScheme() {
  const hasHydrated = useSyncExternalStore(
    suscribirse,
    obtenerEstadoCliente,
    obtenerEstadoServidor,
  );
  const colorScheme = useRNColorScheme();

  return hasHydrated ? colorScheme : 'light';
}
