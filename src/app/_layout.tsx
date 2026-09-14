import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router'; //esto sirve para las rutas este automaticamente gestiona la ruta como tal 
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <Stack>
{/* screenOption para utilizarlos en todas las vistas y se exportan en crear la pantalla principal */}
        {/* contiene todas las pantallas de la aplicacion, ayuda con el expo route */}
        {/* cree la pantalla con el stack.screen */}
        <Stack.Screen
        
        
          name="index"
          options={{
            title: 'Huellitas Veterinaria',
          }}
        />

        <Stack.Screen
          name="citas"
          options={{
            title: 'Agendar cita',
          }}
        />

        <Stack.Screen
          name="servicios"
          options={{
            title: 'Servicios',
          }}
        />

        <Stack.Screen
          name="producto"
          options={{
            title: 'Detalle del servicio',
          }}
        />

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