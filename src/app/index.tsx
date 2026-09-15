import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#8193e6', '#BFE3C8', '#5C9F71']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >

      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >

        {/* IMAGEN PRINCIPAL */}
        <Image
          source={{
            uri: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-veterinarian-character-illustration-png-image_13144784.png',
          }}
          style={styles.imagenVeterinaria}
        />

        {/* TÍTULO */}
        <Text style={styles.titulo}>
          Huellitas Veterinaria
        </Text>

        {/* NOMBRE */}
        <Text style={styles.texto}>
          Duban Giron Vt.
        </Text>

        {/* DESCRIPCIÓN */}
        <Text style={styles.texto}>
          Cuidamos la salud y bienestar de tus mascotas con atención profesional y mucho cariño.
        </Text>


        {/* ========================= */}
        {/* FORMULARIO */}
        {/* ========================= */}

        <Pressable
          style={styles.tarjetaFormulario}
          onPress={() => router.push('/citas')}
        >

          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/403/403890.png',
            }}
            style={styles.imagenFormulario}
          />

          <Text style={styles.tituloFormulario}>
            Formulario
          </Text>

        </Pressable>


        {/* ========================= */}
        {/* 4 OPCIONES EN UNA LÍNEA */}
        {/* ========================= */}

        <View style={styles.filaBotones}>

          {/* CITAS */}
          <Pressable
            style={styles.tarjetaPequena}
            onPress={() => router.push('/citas')}
          >

            <Text style={styles.icono}>
              📋
            </Text>

            <Text style={styles.tituloTarjeta}>
              Citas
            </Text>

          </Pressable>


          {/* CONTACTO */}
          <Pressable
            style={styles.tarjetaPequena}
            onPress={() => router.push('/contacto')}
          >

            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/751/751381.png',
              }}
              style={styles.imagenPequena}
            />

            <Text style={styles.tituloTarjeta}>
              Contacto
            </Text>

          </Pressable>


          {/* PRODUCTOS */}
          <Pressable
            style={styles.tarjetaPequena}
            onPress={() => router.push('/producto')}
          >

            <Text style={styles.icono}>
              🛒
            </Text>

            <Text style={styles.tituloTarjeta}>
              Productos
            </Text>

          </Pressable>


          {/* SERVICIOS */}
          <Pressable
            style={styles.tarjetaPequena}
            onPress={() => router.push('/servicios')}
          >

            <Text style={styles.icono}>
              🐾
            </Text>

            <Text style={styles.tituloTarjeta}>
              Servicios
            </Text>

          </Pressable>

        </View>

      </ScrollView>

    </LinearGradient>
  );
}


const styles = StyleSheet.create({

  /* ========================= */
  /* CONTENEDOR */
  /* ========================= */

  container: {
    flex: 1,
  },


  /* ========================= */
  /* CONTENIDO */
  /* ========================= */

  contenido: {
    alignItems: 'center',
    paddingBottom: 30,
  },


  /* ========================= */
  /* IMAGEN PRINCIPAL */
  /* ========================= */

  imagenVeterinaria: {
    width: 312,
    height: 310,
    marginTop: -20,
  },


  /* ========================= */
  /* TÍTULO */
  /* ========================= */

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textAlign: 'center',
  },


  /* ========================= */
  /* TEXTOS */
  /* ========================= */

  texto: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'serif',
    textAlign: 'center',
    paddingHorizontal: 25,
  },


  /* ========================= */
  /* FORMULARIO */
  /* ========================= */

  tarjetaFormulario: {
    width: 300,
    height: 100,
    backgroundColor: '#d6fafd',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  imagenFormulario: {
    width: 65,
    height: 65,
  },

  tituloFormulario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F7D4A',
    marginTop: 3,
    fontFamily: 'serif',
  },


  /* ========================= */
  /* 4 TARJETAS EN UNA LÍNEA */
  /* ========================= */

  filaBotones: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginTop: 15,
  },


  /* ========================= */
  /* TARJETAS PEQUEÑAS */
  /* ========================= */

  tarjetaPequena: {
    width: 82,
    height: 96,
    backgroundColor: '#d6eaec',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },


  /* ========================= */
  /* IMAGEN CONTACTO */
  /* ========================= */

  imagenPequena: {
    width: 42,
    height: 42,
  },


  /* ========================= */
  /* ICONOS */
  /* ========================= */

  icono: {
    fontSize: 38,
  },


  /* ========================= */
  /* TÍTULOS TARJETAS */
  /* ========================= */

  tituloTarjeta: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#2F7D4A',
    marginTop: 3,
    textAlign: 'center',
  },

});