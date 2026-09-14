import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import { router } from 'expo-router';

export default function Contacto() {
  return (
    <View style={styles.container}>

      <Text style={styles.icono}>🐾</Text>

      <Text style={styles.titulo}>
        Huellitas Veterinaria
      </Text>

      <Text style={styles.subtitulo}>
        Estamos para cuidar a tu mascota.
      </Text>

      <View style={styles.tarjeta}>

        <Text style={styles.label}>📍 Dirección</Text>
        <Text style={styles.valor}>
          Pasto, Nariño
        </Text>

        <Text style={styles.label}>📞 Teléfono</Text>
        <Text style={styles.valor}>
          300 123 4567
        </Text>

        <Text style={styles.label}>✉️ Correo</Text>
        <Text style={styles.valor}>
          huellitas@veterinaria.com
        </Text>

        <Text style={styles.label}>🕐 Horario</Text>
        <Text style={styles.valor}>
          Lunes a sábado · 8:00 AM - 6:00 PM
        </Text>

      </View>

      <Pressable
        style={styles.boton}
        onPress={() => router.push('/citas')}>
        <Text style={styles.botonTexto}>
          Solicitar una cita
        </Text>
      </Pressable>

      <Pressable
        style={styles.regresar}
        onPress={() => router.back()}>
        <Text style={styles.regresarTexto}>
          Regresar
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F8EE',
    justifyContent: 'center',
    padding: 22,
  },

  icono: {
    fontSize: 55,
    textAlign: 'center',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F4D2C',
    textAlign: 'center',
    marginTop: 10,
  },

  subtitulo: {
    fontSize: 16,
    color: '#315C3D',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 25,
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
  },

  label: {
    fontSize: 13,
    color: '#6C806F',
    marginTop: 8,
  },

  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4D2C',
    marginTop: 3,
  },

  boton: {
    backgroundColor: '#2F7D4A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },

  botonTexto: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  regresar: {
    alignItems: 'center',
    marginTop: 15,
  },

  regresarTexto: {
    color: '#2F7D4A',
    fontWeight: 'bold',
  },
});