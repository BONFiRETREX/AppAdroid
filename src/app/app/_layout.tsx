import { Stack } from 'expo-router';

export default function VeterinariaLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="perfil" />
      <Stack.Screen name="formulario" />
      <Stack.Screen name="resultado" />
      <Stack.Screen name="registros" />
      <Stack.Screen name="catalogo" options={{ title: 'Catálogo veterinario' }} />
      <Stack.Screen name="detalle" options={{ title: 'Detalle del producto' }} />
      <Stack.Screen name="qr-pruebas" options={{ title: 'QR de prueba' }} />
      <Stack.Screen name="escanear" options={{ title: 'Escanear QR' }} />
      <Stack.Screen name="imagenes" />
      <Stack.Screen name="servicios" />
      <Stack.Screen name="contacto" />
      <Stack.Screen name="explore" />
    </Stack>
  );
}
