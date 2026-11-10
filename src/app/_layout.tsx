import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { ActivityIndicator, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

import { AuthProvider, useAuth } from '../context/AuthContext';

function NavegacionRaiz() {
  const { session, cargando } = useAuth();

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#2F7D4A" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Rutas públicas: login y registro. */}
      <Stack.Protected guard={!session}>
        <Stack.Screen name="auth" />
      </Stack.Protected>

      {/* Todas las pantallas de la veterinaria requieren sesión. */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="app" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle="dark-content" />
      <AuthProvider>
        <NavegacionRaiz />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  cargando: {
    alignItems: 'center',
    backgroundColor: '#F4FBF6',
    flex: 1,
    justifyContent: 'center',
  },
});
