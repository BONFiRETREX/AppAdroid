import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';

export default function PerfilScreen() {
  const { session } = useAuth();
  const [cerrandoSesion, setCerrandoSesion] = useState(false);
  const correo = session?.user.email ?? 'Correo no disponible';
  const inicial = correo.charAt(0).toUpperCase();

  const cerrarSesion = async () => {
    try {
      setCerrandoSesion(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        Alert.alert('No fue posible cerrar sesión', error.message);
      }
    } catch {
      Alert.alert('Error de conexión', 'No fue posible cerrar la sesión. Intenta de nuevo.');
    } finally {
      setCerrandoSesion(false);
    }
  };

  return (
    <LinearGradient colors={['#EAF7EE', '#BFE3C8', '#8193E6']} style={styles.fondo}>
      <View style={styles.contenedor}>
        <View style={styles.tarjeta}>
          <View style={styles.avatar}>
            <Text style={styles.inicial}>{inicial}</Text>
          </View>

          <Text style={styles.titulo}>Mi perfil</Text>
          <Text style={styles.subtitulo}>Sesión activa de Huellitas Veterinaria</Text>

          <View style={styles.dato}>
            <Text style={styles.etiqueta}>CORREO ELECTRÓNICO</Text>
            <Text selectable style={styles.correo}>{correo}</Text>
          </View>

          <View style={styles.dato}>
            <Text style={styles.etiqueta}>ESTADO</Text>
            <Text style={styles.activo}>● Sesión iniciada</Text>
          </View>

          <Pressable
            disabled={cerrandoSesion}
            onPress={() => void cerrarSesion()}
            style={[styles.botonCerrar, cerrandoSesion && styles.botonDeshabilitado]}>
            {cerrandoSesion ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.textoBotonCerrar}>Cerrar sesión</Text>
            )}
          </Pressable>

          <Pressable disabled={cerrandoSesion} onPress={() => router.back()} style={styles.botonVolver}>
            <Text style={styles.textoVolver}>Volver al inicio</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1 },
  contenedor: { alignItems: 'center', flex: 1, justifyContent: 'center', padding: 24 },
  tarjeta: { backgroundColor: '#FFFFFF', borderRadius: 24, elevation: 5, maxWidth: 420, padding: 26, shadowColor: '#275A36', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 9, width: '100%' },
  avatar: { alignItems: 'center', alignSelf: 'center', backgroundColor: '#2F7D4A', borderColor: '#D9F2E1', borderRadius: 48, borderWidth: 6, height: 96, justifyContent: 'center', width: 96 },
  inicial: { color: '#FFFFFF', fontSize: 39, fontWeight: 'bold' },
  titulo: { color: '#235E38', fontFamily: 'serif', fontSize: 30, fontWeight: 'bold', marginTop: 15, textAlign: 'center' },
  subtitulo: { color: '#52605A', fontSize: 15, marginTop: 6, textAlign: 'center' },
  dato: { backgroundColor: '#F5FBF6', borderColor: '#D6EBD9', borderRadius: 14, borderWidth: 1, marginTop: 18, padding: 15 },
  etiqueta: { color: '#547161', fontSize: 12, fontWeight: 'bold', letterSpacing: 0.7 },
  correo: { color: '#1F2937', fontSize: 16, marginTop: 7 },
  activo: { color: '#21723F', fontSize: 16, fontWeight: '600', marginTop: 7 },
  botonCerrar: { alignItems: 'center', backgroundColor: '#B42318', borderRadius: 12, justifyContent: 'center', marginTop: 26, minHeight: 50 },
  botonDeshabilitado: { opacity: 0.65 },
  textoBotonCerrar: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  botonVolver: { alignItems: 'center', marginTop: 18, padding: 8 },
  textoVolver: { color: '#246B9B', fontSize: 15, fontWeight: '600' },
});
