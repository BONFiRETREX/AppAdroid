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
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const [nombre, setNombre] = useState('');
  const [tipoanimal, setTipoanimal] = useState('');
  const [raza, setRaza] = useState('');
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [tipoconsulta, setTipoconsulta] = useState('');
  const [estado, setEstado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [resultados, setResultados] = useState('');
  const [telefono, setTelefono]=useState('');

  // FUNCION DEL BOTON IMPORTANTE PARA EL ESTUDIO
  const realizarPedidos = () => {
    // VALIDAMOS QUE TODOS LOS CAMPOS TENGAN INFORMACION
    if (
      nombre.trim() === '' ||
      tipoanimal.trim() === '' ||
      raza.trim() === '' ||
      peso.trim() === '' ||
      edad.trim() === '' ||
      tipoconsulta.trim() === ''||
      telefono.trim()==''
    ) {
      setResultados('Debes completar todos los campos');
      Alert.alert('Datos incompletos', 'Debes completar todos los campos');
      return;
    }

    // MOSTRAMOS INDICADOR DE CARGA
    setProcesando(true);
    setResultados('');

    // SIMULACION DEL PROCESO
    setTimeout(() => {
      setProcesando(false);

      setResultados(
        `Mascota: ${nombre}
Tipo de animal: ${tipoanimal}
Raza: ${raza}
Peso: ${peso} kg
Edad: ${edad} años
Tipo de consulta: ${tipoconsulta}
Estado de la mascota: ${estado ? 'Enferma' : 'Sana'}
telefono:${telefono}    `

      );

      setModalVisible(true);
    }, 1200);
  };

  return (
    <LinearGradient
      colors={['#a4fdc2', '#a7d8f1', '#2e87cb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.pantalla}>
      <KeyboardAvoidingView
        style={styles.pantalla}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <StatusBar style="dark" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contenido}>
          <View style={styles.header}>
            <Text style={styles.logo}>🐾</Text>

            <Text style={styles.titulo}>Huellitas Veterinaria</Text>

            <Text style={styles.subtitulo}>
              Cuidamos a tu mascota con amor.
            </Text>
          </View>

          <Image
            source={{
              uri: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-veterinarian-character-illustration-png-image_13144784.png',
            }}
            style={styles.imagen}
          />

          <Text style={styles.tituloFormulario}>Agenda una cita</Text>

          <Text style={styles.descripcionFormulario}>
            Completa los datos de tu mascota.
          </Text>

          <Text style={styles.label}>Nombre de la mascota</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. Max"
            placeholderTextColor="#7A7A7A"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Tipo de animal</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. Perro o gato"
            placeholderTextColor="#7A7A7A"
            value={tipoanimal}
            onChangeText={setTipoanimal}
          />

          <Text style={styles.label}>Raza</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. Labrador"
            placeholderTextColor="#7A7A7A"
            value={raza}
            onChangeText={setRaza}
          />

          <Text style={styles.label}>Peso</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. 12"
            placeholderTextColor="#7A7A7A"
            value={peso}
            onChangeText={setPeso}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Edad</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. 3"
            placeholderTextColor="#7A7A7A"
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Tipo de consulta</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. Vacunación o consulta general"
            placeholderTextColor="#7A7A7A"
            value={tipoconsulta}
            onChangeText={setTipoconsulta}
          />
            <Text style={styles.label}>Teléfono</Text>
           <TextInput
            style={styles.input}
            placeholder="Ej. Max"
            placeholderTextColor="#7A7A7A"
            value={telefono}
            onChangeText={setTelefono}
          />

          <View style={styles.filaSwitch}>
            <View>
              <Text style={styles.switchTitulo}>¿La mascota está enferma?</Text>

              <Text style={styles.switchDescripcion}>
                Activa si necesita atención médica.
              </Text>
            </View>

            <Switch value={estado} onValueChange={setEstado} />
          </View>

          <Pressable style={styles.boton} onPress={realizarPedidos}>
            <Text style={styles.botonTexto}>Solicitar cita</Text>
          </Pressable>

          {procesando && (
            <View style={styles.cargando}>
              <ActivityIndicator size="large" color="#2F7D4A" />

              <Text style={styles.cargandoTexto}>
                Registrando cita...
              </Text>
            </View>
          )}

          {resultados !== '' && !procesando && (
            <View style={styles.resultado}>
              
              <Text style={styles.resultadoTitulo}>Resumen de la cita
 

              </Text>

              <Text style={styles.resultadoTexto}>{resultados}</Text>
            </View>
          
          )}
        </ScrollView>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalFondo}>
            <View style={styles.modalContenido}>
              <Text style={styles.modalIcono}>🐾</Text>

              <Text style={styles.modalTitulo}>¡Cita solicitada!
   
              </Text>
                                  
              <Text style={styles.modalTexto}>
                Gracias. Registramos la cita de {nombre}.
              </Text>

              <Text style={styles.modalTexto}>
                Pronto nos comunicaremos contigo.
              
              </Text>


              <Pressable
                style={styles.modalBoton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBotonTexto}>Entendido</Text>
              </Pressable>
              
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
  },

  contenido: {
    padding: 22,
    paddingTop: 45,
    paddingBottom: 50,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    fontSize: 45,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1F4D2C',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 16,
    color: '#315C3D',
    marginTop: 5,
  },

  imagen: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },

  tituloFormulario: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4D2C',
    marginBottom: 5,
  },

  descripcionFormulario: {
    fontSize: 16,
    color: '#315C3D',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4D2C',
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  filaSwitch: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  switchTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4D2C',
  },

  switchDescripcion: {
    fontSize: 13,
    color: '#606060',
    marginTop: 3,
    width: 220,
  },

  boton: {
    backgroundColor: '#2F7D4A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },

  botonTexto: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  cargando: {
    alignItems: 'center',
    marginTop: 20,
  },

  cargandoTexto: {
    marginTop: 10,
    fontSize: 16,
    color: '#1F4D2C',
  },

  resultado: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginTop: 20,
  },

  resultadoTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F4D2C',
    marginBottom: 10,
  },

  resultadoTexto: {
    fontSize: 16,
    lineHeight: 24,
    color: '#315C3D',
  },

  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    padding: 25,
  },

  modalContenido: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },

  modalIcono: {
    fontSize: 50,
  },

  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4D2C',
    marginTop: 10,
  },

  modalTexto: {
    fontSize: 16,
    color: '#315C3D',
    textAlign: 'center',
    marginTop: 10,
  },

  modalBoton: {
    backgroundColor: '#2F7D4A',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 35,
    marginTop: 22,
  },

  modalBotonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
   
});