import { Pressable, StyleSheet, Text, View } from 'react-native';

import { router } from 'expo-router';

export default function EscanearScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escanear código</Text>
      <Text style={styles.descripcion}>
        La pantalla del escáner está lista. La cámara y la lectura de QR se agregarán después.
      </Text>

      <Pressable style={styles.boton} onPress={() => router.back()}>
        <Text style={styles.botonTexto}>Regresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F3FBF5',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  titulo: { color: '#2F7D4A', fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  descripcion: { color: '#4B5563', fontSize: 16, lineHeight: 24, marginTop: 14, textAlign: 'center' },
  boton: { backgroundColor: '#2F7D4A', borderRadius: 12, marginTop: 28, padding: 15, width: '100%' },
  botonTexto: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});
