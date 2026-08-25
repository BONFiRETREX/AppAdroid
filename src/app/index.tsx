
import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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