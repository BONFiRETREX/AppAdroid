import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#8193e6', '#BFE3C8', '#5C9F71']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}>

      <View style={styles.contenido}>

        <Image
          source={{
            uri: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-veterinarian-character-illustration-png-image_13144784.png',
          }}
          style={styles.imagenVeterinaria}
        />

        <Text style={styles.titulo}>
          Huellitas Veterinaria
        </Text>

        <Text style={styles.texto}>
          Duban Giron Vt.
        </Text>

        <Text style={styles.texto}>
          Cuidamos la salud y bienestar de tus mascotas con atención profesional y mucho cariño.
        </Text>

        {/* BOTÓN PARA CITAS */}
        <Link href="/citas" asChild>
          <Pressable>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/403/403890.png',
              }}
              style={styles.imagenBotonInfo}
            />
          </Pressable>
        </Link>

        {/* BOTÓN PARA CONTACTO */}
        <Pressable
          onPress={() => router.push('/contacto')}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/751/751381.png',
            }}
            style={styles.imagenclase7}
          />
        </Pressable>

        {/* BOTÓN PARA SERVICIOS */}
        <Pressable
          style={styles.botonServicios}
          onPress={() => router.push('/servicios')}>

          <Text style={styles.botonServiciosTexto}>
            Ver servicios
          </Text>

        </Pressable>

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contenido: {
    alignItems: 'center',
  },

  imagenVeterinaria: {
    width: 412,
    height: 410,
    marginTop: -130,
  },

  imagenBotonInfo: {
    width: 100,
    height: 100,
    marginTop: 10,
  },

  imagenclase7: {
    width: 100,
    height: 100,
    marginTop: 10,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },

  texto: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'serif',
    textAlign: 'center',
    paddingHorizontal: 25,
  },

  botonServicios: {
    backgroundColor: '#2F7D4A',
    padding: 14,
    borderRadius: 12,
    marginTop: 15,
  },

  botonServiciosTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});