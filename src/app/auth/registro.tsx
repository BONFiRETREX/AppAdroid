import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { supabase } from '../../../lib/supabase';

export default function RegistroScreen() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [registrando, setRegistrando] = useState(false);

  const crearCuenta = async () => {
    if (!correo.trim() || !contrasena || !confirmacion) {
      Alert.alert('Campos incompletos', 'Completa correo y contraseña.');
      return;
    }

    if (contrasena.length < 6) {
      Alert.alert('Contraseña muy corta', 'La contraseña debe tener mínimo 6 caracteres.');
      return;
    }

    if (contrasena !== confirmacion) {
      Alert.alert('Las contraseñas no coinciden', 'Escribe exactamente la misma contraseña en ambos campos.');
      return;
    }

    try {
      setRegistrando(true);
      const { data, error } = await supabase.auth.signUp({
        email: correo.trim().toLowerCase(),
        password: contrasena,
      });

      if (error) {
        Alert.alert('No fue posible crear la cuenta', error.message);
        return;
      }

      // Si Supabase creó una sesión, se cierra para que el taller conserve
      // el flujo explícito: registro y después inicio de sesión.
      if (data.session) {
        await supabase.auth.signOut();
      }

      Alert.alert('Cuenta creada', 'Ahora puedes iniciar sesión con tus datos.', [
        { text: 'Ir al inicio de sesión', onPress: () => router.replace('/auth/login') },
      ]);
    } catch {
      Alert.alert('Error de conexión', 'No fue posible conectar con Supabase. Intenta de nuevo.');
    } finally {
      setRegistrando(false);
    }
  };

  return (
    <LinearGradient colors={['#EAF7EE', '#BFE3C8', '#8193E6']} style={styles.fondo}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.teclado}>
        <ScrollView contentContainerStyle={styles.contenedor} keyboardShouldPersistTaps="handled">
          <View style={styles.tarjeta}>
            <Text style={styles.icono}>💚</Text>
            <Text style={styles.titulo}>Crear cuenta</Text>
            <Text style={styles.subtitulo}>Regístrate para acceder a Huellitas Veterinaria.</Text>

            <Text style={styles.etiqueta}>Correo electrónico</Text>
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setCorreo}
              placeholder="correo@ejemplo.com"
              style={styles.input}
              value={correo}
            />

            <Text style={styles.etiqueta}>Contraseña</Text>
            <TextInput
              autoComplete="new-password"
              onChangeText={setContrasena}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              style={styles.input}
              value={contrasena}
            />

            <Text style={styles.etiqueta}>Confirmar contraseña</Text>
            <TextInput
              autoComplete="new-password"
              onChangeText={setConfirmacion}
              placeholder="Repite tu contraseña"
              secureTextEntry
              style={styles.input}
              value={confirmacion}
            />

            <Pressable
              disabled={registrando}
              onPress={() => void crearCuenta()}
              style={[styles.botonPrincipal, registrando && styles.botonDeshabilitado]}>
              {registrando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.textoBoton}>Crear cuenta</Text>}
            </Pressable>

            <Pressable disabled={registrando} onPress={() => router.replace('/auth/login')} style={styles.botonSecundario}>
              <Text style={styles.textoSecundario}>Ya tengo una cuenta</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1 },
  teclado: { flex: 1 },
  contenedor: { alignItems: 'center', flexGrow: 1, justifyContent: 'center', padding: 24 },
  tarjeta: { backgroundColor: '#FFFFFF', borderRadius: 24, elevation: 5, maxWidth: 420, padding: 26, shadowColor: '#275A36', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 9, width: '100%' },
  icono: { fontSize: 52, textAlign: 'center' },
  titulo: { color: '#235E38', fontFamily: 'serif', fontSize: 29, fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
  subtitulo: { color: '#52605A', fontSize: 16, lineHeight: 23, marginBottom: 20, marginTop: 8, textAlign: 'center' },
  etiqueta: { color: '#245D39', fontSize: 15, fontWeight: '700', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#F7FCF8', borderColor: '#B8D6C1', borderRadius: 12, borderWidth: 1, fontSize: 16, paddingHorizontal: 14, paddingVertical: 13 },
  botonPrincipal: { alignItems: 'center', backgroundColor: '#2F7D4A', borderRadius: 12, justifyContent: 'center', marginTop: 25, minHeight: 50 },
  botonDeshabilitado: { opacity: 0.65 },
  textoBoton: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
  botonSecundario: { alignItems: 'center', paddingTop: 19 },
  textoSecundario: { color: '#246B9B', fontSize: 15, fontWeight: '600' },
});
