import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';

import { router } from 'expo-router';

export default function Servicios() {
  return (
    <ScrollView
      contentContainerStyle={styles.contenido}>

      <Text style={styles.titulo}>
        Nuestros servicios
      </Text>

      <Text style={styles.subtitulo}>
        Conoce los servicios que ofrecemos para cuidar la salud de tu mascota.
      </Text>


      {/* CONSULTA GENERAL */}
      <View style={styles.tarjeta}>

        <Text style={styles.icono}>
          🩺
        </Text>

        <Text style={styles.nombre}>
          Consulta general
        </Text>

        <Text style={styles.descripcion}>
          Revisión completa de la salud de tu mascota.
          Permite detectar posibles problemas y realizar
          un seguimiento de su estado de salud.
        </Text>

        <Text style={styles.precio}>
          $50.000
        </Text>

      </View>


      {/* VACUNACIÓN */}
      <View style={styles.tarjeta}>

        <Text style={styles.icono}>
          💉
        </Text>

        <Text style={styles.nombre}>
          Vacunación
        </Text>

        <Text style={styles.descripcion}>
          Aplicación y control de vacunas para mascotas.
          Ayuda a prevenir diferentes enfermedades y
          mantener actualizado su esquema de vacunación.
        </Text>

        <Text style={styles.precio}>
          $35.000
        </Text>

      </View>


      {/* DESPARASITACIÓN */}
      <View style={styles.tarjeta}>

        <Text style={styles.icono}>
          💊
        </Text>

        <Text style={styles.nombre}>
          Desparasitación
        </Text>

        <Text style={styles.descripcion}>
          Tratamiento preventivo para controlar parásitos
          internos y externos y contribuir al bienestar
          general de tu mascota.
        </Text>

        <Text style={styles.precio}>
          $30.000
        </Text>

      </View>


      {/* REGRESAR */}
      <Pressable
        style={styles.regresar}
        onPress={() => router.back()}>

        <Text style={styles.regresarTexto}>
          Regresar
        </Text>

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
    padding: 20,
    marginBottom: 18,
    alignItems: 'center',
  },

  icono: {
    fontSize: 45,
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F4D2C',
    marginTop: 8,
  },

  descripcion: {
    fontSize: 14,
    color: '#55705E',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
  },

  precio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F7D4A',
    marginTop: 12,
  },

  regresar: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },

  regresarTexto: {
    color: '#2F7D4A',
    fontWeight: 'bold',
    fontSize: 16,
  },

});