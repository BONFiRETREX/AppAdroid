import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';

export default function Producto() {
  return (
    <ScrollView
      contentContainerStyle={styles.contenido}>

      <Text style={styles.titulo}>
        Productos
      </Text>

      <Text style={styles.subtitulo}>
        Productos disponibles para el cuidado de tu mascota.
      </Text>


      {/* PRODUCTO 1 */}
      <View style={styles.tarjeta}>

        <Text style={styles.icono}>
          🦴
        </Text>

        <Text style={styles.nombre}>
          Alimento para mascotas
        </Text>

        <Text style={styles.descripcion}>
          Alimento balanceado para perros y gatos.
        </Text>

        <Text style={styles.precio}>
          $45.000
        </Text>

      </View>


      {/* PRODUCTO 2 */}
      <View style={styles.tarjeta}>

        <Text style={styles.icono}>
          🧴
        </Text>

        <Text style={styles.nombre}>
          Shampoo veterinario
        </Text>

        <Text style={styles.descripcion}>
          Shampoo especial para el cuidado del pelaje.
        </Text>

        <Text style={styles.precio}>
          $25.000
        </Text>

      </View>


      {/* PRODUCTO 3 */}
      <View style={styles.tarjeta}>

        <Text style={styles.icono}>
          🐶
        </Text>

        <Text style={styles.nombre}>
          Collar para mascota
        </Text>

        <Text style={styles.descripcion}>
          Collar cómodo y resistente para perros y gatos.
        </Text>

        <Text style={styles.precio}>
          $20.000
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
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F4D2C',
    marginTop: 8,
  },

  descripcion: {
    fontSize: 14,
    color: '#55705E',
    textAlign: 'center',
    marginTop: 6,
  },

  precio: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2F7D4A',
    marginTop: 10,
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