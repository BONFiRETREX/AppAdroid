import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { useColorScheme, StatusBar } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >

      {/* Barra de estado superior */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <Stack>

        {/* Pantalla principal */}
        <Stack.Screen
          name="index"
          options={{
            title: 'Huellitas Veterinaria',
          }}
        />

        {/* Citas */}
        <Stack.Screen
          name="citas"
          options={{
            title: 'Agendar cita',
          }}
        />

        {/* Servicios */}
        <Stack.Screen
          name="servicios"
          options={{
            title: 'Servicios',
          }}
        />

        {/* Detalle del servicio */}
        <Stack.Screen
          name="producto"
          options={{
            title: 'Detalle del servicio',
          }}
        />

        {/* Contacto */}
        <Stack.Screen
          name="contacto"
          options={{
            title: 'Contacto',
          }}
        />

      </Stack>

    </ThemeProvider>
  );
}