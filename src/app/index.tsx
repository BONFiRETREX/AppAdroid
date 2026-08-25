import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Image
        source={{
          uri: 'https://img.magnific.com/vector-gratis/veterinario-muchos-tipos-animales_1308-65733.jpg?semt=ais_hybrid&w=740&q=80'
        }}
        style={styles.imagenVeterinaria}
      />

      <Text style={styles.titulo}>
        Desarrollo movil
      </Text>

      <Text style={styles.texto}>
        Mi primera app
      </Text>

      <Text style={styles.texto}>
        Ing sistemas
      </Text>

      <Text style={styles.mensaje}>
        care cui
      </Text>

      <Pressable>
        <Text>Inicio</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagenVeterinaria: {
    width: 300,
    height: 200,
    marginTop: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  texto: {
    fontSize: 18,
    marginTop: 10,
  },

  mensaje: {
    fontSize: 18,
    marginTop: 30,
  },
});