import { StyleSheet, 
  Text, 
  Image, 
  Pressable,
   
  Alert, 
  View , 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Modal, 
  Platform,
  ScrollView,
  Switch,
  TextInput,

 } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';//fondo bonito linegradient


import { Link } from 'expo-router';
// poner como comentario estoooooooo ------>>>>>>>>>>>>>>>>>>>>
 import { router } from 'expo-router';


import { useState } from 'react';
//PARA LA BARRA DE NAVEGADOR DE CELULAR HORA ETC señal de wif todo 
 import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  // ESTADOS formularios con nombre y se obtenga con setnombre, y sus demas para el formulario con set se guarda
   
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

      <Text style={styles.titulo}>Huellitas Veterinaria</Text>

      <Text style={styles.texto}>Duban Giron Vt.</Text>

      <Text style={styles.texto}>
        Cuidamos la salud y bienestar de tus mascotas con atención profesional y mucho cariño.
      </Text>

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
{/* PONER COMO COMENTARIO ESTO: ----------------->>>>>> */}
{/* <Pressable onPress={() => router.push('/contacto')}>
  <Image
    source={{
      uri: 'https://cdn-icons-png.flaticon.com/512/751/751381.png',
    }}
    style={styles.imagenclase7}
  />
</Pressable> */}

  {/*  <Pressable
  onPress={() =>
    Alert.alert(
      'Huellitas Veterinaria',
      'Cuidamos la salud y bienestar de tus mascotas con atención profesional y mucho cariño.'
    )
  }>
  <Image
    source={{
      uri: 'https://cdn-icons-png.flaticon.com/512/403/403890.png',
    }}
    style={styles.imagenBotonInfo}
  />
</Pressable> */}
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
    textAlign: 'center',
    paddingHorizontal: 25,
  },
  contenido: {
  alignItems: 'center',
},
imagenclase7: {
  width: 100,
    height: 100,
    marginTop: 10,
},
});