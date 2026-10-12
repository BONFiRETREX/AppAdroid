import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { supabase } from '../../../lib/supabase';

export default function LoginScreen() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [ingresando, setIngresando] = useState(false);

  const iniciarSesion = async () => {
    if (!correo.trim() || !contrasena) {
      Alert.alert('Campos incompletos', 'Escribe tu correo y contraseña.');
      return;
    }

    try {
      setIngresando(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: correo.trim().toLowerCase(),
        password: contrasena,
      });

      if (error) {
        Alert.alert('No fue posible iniciar sesión', error.message);
      }
      // AuthContext detecta el inicio correcto y abre la ruta protegida inicial.
    } catch {
      Alert.alert('Error de conexión', 'No fue posible conectar con Supabase. Intenta de nuevo.');
    } finally {
      setIngresando(false);
    }
  };

  return (
    <LinearGradient colors={['#EAF7EE', '#BFE3C8', '#8193E6']} style={styles.fondo}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.contenedor}>
        <View style={styles.tarjeta}>
          <Text style={styles.icono}>🐾</Text>
          <Text style={styles.titulo}>Huellitas Veterinaria</Text>
          <Text style={styles.subtitulo}>Ingresa para administrar a tus pacientes.</Text>

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
            autoComplete="current-password"
            onChangeText={setContrasena}
            placeholder="Tu contraseña"
            secureTextEntry
            style={styles.input}
            value={contrasena}
          />

          <Pressable
            disabled={ingresando}
            onPress={() => void iniciarSesion()}
            style={[styles.botonPrincipal, ingresando && styles.botonDeshabilitado]}>
            {ingresando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.textoBoton}>Iniciar sesión</Text>}
          </Pressable>

          <Pressable disabled={ingresando} onPress={() => router.push('/auth/registro')} style={styles.botonSecundario}>
            <Text style={styles.textoSecundario}>¿No tienes una cuenta? Regístrate</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1 },
  contenedor: { alignItems: 'center', flex: 1, justifyContent: 'center', padding: 24 },
  tarjeta: { backgroundColor: '#FFFFFF', borderRadius: 24, elevation: 5, maxWidth: 420, padding: 26, shadowColor: '#275A36', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 9, width: '100%' },
  icono: { fontSize: 55, textAlign: 'center' },
  titulo: { color: '#235E38', fontFamily: 'serif', fontSize: 29, fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
  subtitulo: { color: '#52605A', fontSize: 16, lineHeight: 23, marginBottom: 20, marginTop: 8, textAlign: 'center' },
  etiqueta: { color: '#245D39', fontSize: 15, fontWeight: '700', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#F7FCF8', borderColor: '#B8D6C1', borderRadius: 12, borderWidth: 1, fontSize: 16, paddingHorizontal: 14, paddingVertical: 13 },
  botonPrincipal: { alignItems: 'center', backgroundColor: '#2F7D4A', borderRadius: 12, marginTop: 25, minHeight: 50, justifyContent: 'center' },
  botonDeshabilitado: { opacity: 0.65 },
  textoBoton: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
  botonSecundario: { alignItems: 'center', paddingTop: 19 },
  textoSecundario: { color: '#246B9B', fontSize: 15, fontWeight: '600' },
});
