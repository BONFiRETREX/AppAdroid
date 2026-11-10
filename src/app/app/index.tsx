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

        <Pressable style={styles.botonPerfil} onPress={() => router.push('/app/perfil')}>
          <Text style={styles.textoPerfil}>Mi perfil</Text>
        </Pressable>

        {/* ========================= */}
        {/* FORMULARIO */}
        {/* ========================= */}

        <Pressable
          style={styles.tarjetaFormulario}
          onPress={() => router.push('/app/formulario')}
        >

          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/403/403890.png',
            }}
            style={styles.imagenFormulario}
          />

          <Text style={styles.tituloFormulario}>
            Registrar cliente
          </Text>

        </Pressable>

        <Pressable
          style={styles.tarjetaHistorial}
          onPress={() => router.push('/app/registros')}
        >

          <Text style={styles.iconoHistorial}>
            Historial
          </Text>

          <Text style={styles.tituloHistorial}>
            Ver clientes registrados
          </Text>

        </Pressable>

        <Text style={styles.tituloSeccion}>Escáner QR</Text>

        <View style={styles.filaCatalogo}>
          <Pressable style={styles.tarjetaCatalogo} onPress={() => router.push('/app/escanear')}>
            <Text style={styles.iconoCatalogo}>📷</Text>
            <Text style={styles.tituloCatalogo}>Escanear código QR</Text>
          </Pressable>
        </View>


        {/* ========================= */}
        {/* 4 OPCIONES EN UNA LÍNEA */}
        {/* ========================= */}

        <View style={styles.filaBotones}>

          {/* CITAS */}
          <Pressable
            style={styles.tarjetaPequena}
            onPress={() => router.push('/app/formulario')}
          >

            <Text style={styles.icono}>
              📋
            </Text>

            <Text style={styles.tituloTarjeta}>
              Clientes
            </Text>

          </Pressable>


          {/* CONTACTO */}
          <Pressable
            style={styles.tarjetaPequena}
            onPress={() => router.push('/app/contacto')}
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
            onPress={() => router.push('/app/imagenes')}
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
            onPress={() => router.push('/app/servicios')}
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

  botonPerfil: {
    alignItems: 'center',
    backgroundColor: '#EAF7EE',
    borderColor: '#2F7D4A',
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },

  textoPerfil: {
    color: '#1F6138',
    fontSize: 14,
    fontWeight: 'bold',
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

  tarjetaHistorial: {
    width: 300,
    backgroundColor: '#EAF7EE',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 14,
  },

  iconoHistorial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F7D4A',
    fontFamily: 'serif',
  },

  tituloHistorial: {
    fontSize: 15,
    color: '#2F7D4A',
    marginTop: 3,
  },

  tituloSeccion: {
    color: '#1F6138',
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 22,
  },

  filaCatalogo: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 10,
    width: '92%',
  },

  tarjetaCatalogo: {
    alignItems: 'center',
    backgroundColor: '#F3FBF5',
    borderColor: '#A8D5B5',
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    minHeight: 100,
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 12,
  },

  iconoCatalogo: {
    fontSize: 30,
  },

  tituloCatalogo: {
    color: '#2F7D4A',
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
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
