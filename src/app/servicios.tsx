import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';

export default function Servicios() {
  return (
    <ScrollView
      contentContainerStyle={styles.contenido}>

      <Text style={styles.titulo}>Nuestros servicios</Text>

      <Text style={styles.subtitulo}>
        Elige el servicio que necesita tu mascota.
      </Text>

      <View style={styles.tarjeta}>
        <Text style={styles.icono}>🩺</Text>

        <View style={styles.info}>
          <Text style={styles.nombre}>Consulta general</Text>
          <Text style={styles.descripcion}>
            Revisión completa de la salud de tu mascota.
          </Text>
          <Text style={styles.precio}>$50.000</Text>
        </View>

        <Pressable
          style={styles.boton}
          onPress={() => router.push('/producto')}>
          <Text style={styles.botonTexto}>Ver</Text>
        </Pressable>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.icono}>💉</Text>

        <View style={styles.info}>
          <Text style={styles.nombre}>Vacunación</Text>
          <Text style={styles.descripcion}>
            Aplicación y control de vacunas para mascotas.
          </Text>
          <Text style={styles.precio}>$35.000</Text>
        </View>

        <Pressable
          style={styles.boton}
          onPress={() => router.push('/producto')}>
          <Text style={styles.botonTexto}>Ver</Text>
        </Pressable>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.icono}>💊</Text>

        <View style={styles.info}>
          <Text style={styles.nombre}>Desparasitación</Text>
          <Text style={styles.descripcion}>
            Tratamiento preventivo para el bienestar de tu mascota.
          </Text>
          <Text style={styles.precio}>$30.000</Text>
        </View>

        <Pressable
          style={styles.boton}
          onPress={() => router.push('/producto')}>
          <Text style={styles.botonTexto}>Ver</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.regresar}
        onPress={() => router.back()}>
        <Text style={styles.regresarTexto}>Regresar</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: {
    flexGrow: 1,
    padding: 22,
    backgroundColor: '#E8F8EE',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1F4D2C',
    textAlign: 'center',
    marginTop: 20,
  },

  subtitulo: {
    fontSize: 16,
    color: '#315C3D',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icono: {
    fontSize: 35,
    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F4D2C',
  },

  descripcion: {
    fontSize: 13,
    color: '#55705E',
    marginTop: 5,
  },

  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F7D4A',
    marginTop: 8,
  },

  boton: {
    backgroundColor: '#2F7D4A',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 10,
  },

  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  regresar: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  regresarTexto: {
    color: '#2F7D4A',
    fontWeight: 'bold',
    fontSize: 16,
  },
});