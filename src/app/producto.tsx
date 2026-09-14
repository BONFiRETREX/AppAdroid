import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';

import { router } from 'expo-router';

export default function Producto() {
  return (
    <View style={styles.container}>

      <Image
        source={{
          uri: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-veterinarian-character-illustration-png-image_13144784.png',
        }}
        style={styles.imagen}
      />

      <Text style={styles.titulo}>
        Consulta veterinaria
      </Text>

      <Text style={styles.descripcion}>
        Realizamos una revisión general de tu mascota,
        evaluando su estado de salud y proporcionando
        recomendaciones para su cuidado.
      </Text>

      <View style={styles.tarjeta}>

        <Text style={styles.label}>Servicio</Text>
        <Text style={styles.valor}>Consulta general</Text>

        <Text style={styles.label}>Precio</Text>
        <Text style={styles.valor}>$50.000</Text>

        <Text style={styles.label}>Duración</Text>
        <Text style={styles.valor}>30 minutos</Text>

      </View>

      <Pressable
        style={styles.boton}
        onPress={() => router.push('/citas')}>
        <Text style={styles.botonTexto}>
          Agendar cita
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

  imagen: {
    width: '100%',
    height: 190,
    resizeMode: 'contain',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F4D2C',
    textAlign: 'center',
    marginTop: 10,
  },

  descripcion: {
    fontSize: 16,
    color: '#315C3D',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 12,
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
  },

  label: {
    fontSize: 13,
    color: '#6C806F',
    marginTop: 8,
  },

  valor: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F4D2C',
    marginTop: 3,
  },

  boton: {
    backgroundColor: '#2F7D4A',
    padding: 16,
    borderRadius: 12,
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