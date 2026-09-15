import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  Alert,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function CitasScreen() {

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoanimal, setTipoanimal] = useState('');
  const [raza, setRaza] = useState('');
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [tipoconsulta, setTipoconsulta] = useState('');

  const [estado, setEstado] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const [resultados, setResultados] = useState('');


  const enviarFormulario = () => {

    if (
      nombre.trim() === '' ||
      telefono.trim() === '' ||
      tipoanimal.trim() === '' ||
      raza.trim() === '' ||
      peso.trim() === '' ||
      edad.trim() === '' ||
      tipoconsulta.trim() === ''
    ) {
      Alert.alert(
        'Campos incompletos',
        'Por favor completa todos los campos.'
      );

      return;
    }

    setProcesando(true);

    setTimeout(() => {

      setProcesando(false);

      setResultados(
        `Paciente: ${nombre}
Teléfono: ${telefono}
Animal: ${tipoanimal}
Raza: ${raza}
Peso: ${peso} kg
Edad: ${edad}
Motivo de consulta: ${tipoconsulta}
Estado de salud: ${estado ? 'Enfermo' : 'Saludable'}`
      );

      setModalVisible(true);

    }, 1200);
  };


  return (
    <LinearGradient
      colors={['#8193e6', '#BFE3C8', '#5C9F71']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >

      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <ScrollView
          contentContainerStyle={styles.contenido}
          showsVerticalScrollIndicator={false}
        >

          {/* IMAGEN */}
          <Image
            source={{
              uri: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-veterinarian-character-illustration-png-image_13144784.png',
            }}
            style={styles.imagen}
          />

          {/* TÍTULO */}
          <Text style={styles.titulo}>
            Agendar cita
          </Text>

          <Text style={styles.subtitulo}>
            Completa los datos de tu mascota
          </Text>


          {/* TARJETA DEL FORMULARIO */}
          <View style={styles.tarjeta}>

            {/* NOMBRE */}
            <Text style={styles.label}>
              Nombre del propietario
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ingrese su nombre"
              value={nombre}
              onChangeText={setNombre}
            />


            {/* TELÉFONO */}
            <Text style={styles.label}>
              Teléfono
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ingrese su teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />


            {/* TIPO DE ANIMAL */}
            <Text style={styles.label}>
              Tipo de animal
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej: Perro, gato..."
              value={tipoanimal}
              onChangeText={setTipoanimal}
            />


            {/* RAZA */}
            <Text style={styles.label}>
              Raza
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ingrese la raza"
              value={raza}
              onChangeText={setRaza}
            />


            {/* PESO */}
            <Text style={styles.label}>
              Peso
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej: 5"
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
            />


            {/* EDAD */}
            <Text style={styles.label}>
              Edad
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej: 3 años"
              value={edad}
              onChangeText={setEdad}
            />


            {/* MOTIVO DE CONSULTA */}
            <Text style={styles.label}>
              Motivo de consulta
            </Text>

            <TextInput
              style={[styles.input, styles.inputGrande]}
              placeholder="Describa el motivo de la consulta"
              value={tipoconsulta}
              onChangeText={setTipoconsulta}
              multiline
            />


            {/* ESTADO DE SALUD */}
            <View style={styles.filaEstado}>

              <View>
                <Text style={styles.labelEstado}>
                  ¿La mascota está enferma?
                </Text>

                <Text style={styles.estadoTexto}>
                  {estado ? 'Sí, está enferma' : 'No, está saludable'}
                </Text>
              </View>

              <Switch
                value={estado}
                onValueChange={setEstado}
              />

            </View>


            {/* BOTÓN ENVIAR */}
            <Pressable
              style={styles.boton}
              onPress={enviarFormulario}
              disabled={procesando}
            >

              {procesando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.botonTexto}>
                  Solicitar cita
                </Text>
              )}

            </Pressable>


            {/* BOTÓN REGRESAR */}
            <Pressable
              style={styles.botonRegresar}
              onPress={() => router.back()}
            >

              <Text style={styles.botonRegresarTexto}>
                Regresar
              </Text>

            </Pressable>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>


      {/* MODAL DE RESULTADO */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >

        <View style={styles.fondoModal}>

          <View style={styles.modal}>

            <Image
              source={{
                uri: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-veterinarian-character-illustration-png-image_13144784.png',
              }}
              style={styles.imagenModal}
            />

            <Text style={styles.tituloModal}>
              ¡Cita solicitada!
            </Text>

            <Text style={styles.resultado}>
              {resultados}
            </Text>

            <Pressable
              style={styles.botonModal}
              onPress={() => setModalVisible(false)}
            >

              <Text style={styles.botonModalTexto}>
                Aceptar
              </Text>

            </Pressable>

          </View>

        </View>

      </Modal>

    </LinearGradient>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  keyboard: {
    flex: 1,
  },

  contenido: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
  },

  imagen: {
    width: 180,
    height: 180,
    marginBottom: 5,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 17,
    marginTop: 8,
    marginBottom: 15,
    fontFamily: 'serif',
    textAlign: 'center',
  },

  tarjeta: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F7D4A',
    marginTop: 10,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#B8D6C1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 16,
    backgroundColor: '#F8FFFA',
  },

  inputGrande: {
    height: 90,
    textAlignVertical: 'top',
  },

  filaEstado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 10,
  },

  labelEstado: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F7D4A',
  },

  estadoTexto: {
    fontSize: 14,
    marginTop: 4,
    color: '#555555',
  },

  boton: {
    backgroundColor: '#2F7D4A',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  botonTexto: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  botonRegresar: {
    borderWidth: 1,
    borderColor: '#2F7D4A',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  botonRegresarTexto: {
    color: '#2F7D4A',
    fontSize: 16,
    fontWeight: 'bold',
  },

  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },

  imagenModal: {
    width: 120,
    height: 120,
  },

  tituloModal: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2F7D4A',
    marginTop: 5,
    marginBottom: 15,
  },

  resultado: {
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    color: '#333333',
  },

  botonModal: {
    backgroundColor: '#2F7D4A',
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },

  botonModalTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});