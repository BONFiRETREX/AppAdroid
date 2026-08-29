import { StyleSheet, View, Text, Image, Pressable,Alert } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Image
        source={{
          uri: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-veterinarian-character-illustration-png-image_13144784.png'
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

      <Text style={styles.mensaje}>
        
      </Text>

      <Pressable onPress={() => Alert.alert('Agenda tu cita',
      'Comunícate con nuestra veterinaria para elegir el día y la hora de atención para tu mascota.')}>
  <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/403/403890.png'
        }}
        style={styles.imagenBotonInfo}
      />
</Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDF3E4', // verde claro pastel
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

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },

  texto: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'serif',
  },

  mensaje: {
    fontSize: 18,
    marginTop: 30,
    fontFamily: 'serif',
  },
 
});