import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { supabase } from '../../lib/supabase';

export default function CitasScreen() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoAnimal, setTipoAnimal] = useState('');
  const [raza, setRaza] = useState('');
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [mascotaEnferma, setMascotaEnferma] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const guardarCita = async () => {
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !tipoAnimal.trim() ||
      !raza.trim() ||
      !peso.trim() ||
      !edad.trim() ||
      !motivoConsulta.trim()
    ) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    const pesoKg = Number(peso.replace(',', '.'));
    if (!Number.isFinite(pesoKg) || pesoKg <= 0) {
      Alert.alert('Peso inválido', 'Ingresa un peso mayor que cero, por ejemplo: 5.5');
      return;
    }

    try {
      setGuardando(true);
      const { data: cliente, error } = await supabase
        .from('clientes_veterinaria')
        .insert({
          nombre: nombre.trim(),
          correo: correo.trim(),
          telefono: telefono.trim(),
          tipo_animal: tipoAnimal.trim(),
          raza: raza.trim(),
          peso_kg: pesoKg,
          edad: edad.trim(),
          motivo_consulta: motivoConsulta.trim(),
          mascota_enferma: mascotaEnferma,
        })
        .select()
        .single();

      if (error || !cliente) {
        Alert.alert('No se pudo guardar', error?.message ?? 'No se recibió el cliente creado.');
        return;
      }

      router.push({
        pathname: './resultado',
        params: {
          id: String(cliente.id),
          nombre: cliente.nombre,
          correo: cliente.correo,
          telefono: cliente.telefono,
          tipoAnimal: cliente.tipo_animal,
          raza: cliente.raza,
          pesoKg: String(cliente.peso_kg),
          edad: cliente.edad,
          motivoConsulta: cliente.motivo_consulta,
          mascotaEnferma: String(cliente.mascota_enferma),
        },
      });
    } catch {
      Alert.alert('Error de conexión', 'No fue posible guardar el cliente. Inténtalo de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <LinearGradient
      colors={['#8193e6', '#BFE3C8', '#5C9F71']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>
          <Image
            source={{
              uri: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-veterinarian-character-illustration-png-image_13144784.png',
            }}
            style={styles.imagen}
          />
          <Text style={styles.titulo}>Registrar cliente</Text>
          <Text style={styles.subtitulo}>Completa los datos del propietario y su mascota</Text>

          <View style={styles.tarjeta}>
            <Campo etiqueta="Nombre del propietario" placeholder="Ingresa tu nombre" value={nombre} onChangeText={setNombre} />
            <Campo etiqueta="Correo electrónico" placeholder="correo@ejemplo.com" value={correo} onChangeText={setCorreo} keyboardType="email-address" />
            <Campo etiqueta="Teléfono" placeholder="Ingresa tu teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
            <Campo etiqueta="Tipo de animal" placeholder="Ej.: perro o gato" value={tipoAnimal} onChangeText={setTipoAnimal} />
            <Campo etiqueta="Raza" placeholder="Ingresa la raza" value={raza} onChangeText={setRaza} />
            <Campo etiqueta="Peso en kg" placeholder="Ej.: 5.5" value={peso} onChangeText={setPeso} keyboardType="decimal-pad" />
            <Campo etiqueta="Edad" placeholder="Ej.: 3 años" value={edad} onChangeText={setEdad} />
            <Campo etiqueta="Motivo de consulta" placeholder="Describe el motivo de la consulta" value={motivoConsulta} onChangeText={setMotivoConsulta} multiline />

            <View style={styles.filaEstado}>
              <View style={styles.estadoContenido}>
                <Text style={styles.labelEstado}>¿La mascota está enferma?</Text>
                <Text style={styles.estadoTexto}>{mascotaEnferma ? 'Sí, está enferma' : 'No, está saludable'}</Text>
              </View>
              <Switch value={mascotaEnferma} onValueChange={setMascotaEnferma} />
            </View>

            <Pressable style={[styles.boton, guardando && styles.botonDeshabilitado]} onPress={guardarCita} disabled={guardando}>
              {guardando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.botonTexto}>Guardar cliente</Text>}
            </Pressable>
            <Pressable style={styles.botonRegresar} onPress={() => router.back()}>
              <Text style={styles.botonRegresarTexto}>Regresar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

type CampoProps = {
  etiqueta: string;
  placeholder: string;
  value: string;
  onChangeText: (texto: string) => void;
  keyboardType?: 'default' | 'decimal-pad' | 'email-address' | 'phone-pad';
  multiline?: boolean;
};

function Campo({ etiqueta, placeholder, value, onChangeText, keyboardType, multiline }: CampoProps) {
  return (
    <View>
      <Text style={styles.label}>{etiqueta}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputGrande]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboard: { flex: 1 },
  contenido: { alignItems: 'center', paddingTop: 20, paddingBottom: 40 },
  imagen: { width: 180, height: 180, marginBottom: 5 },
  titulo: { fontSize: 30, fontWeight: 'bold', fontFamily: 'serif', textAlign: 'center' },
  subtitulo: { fontSize: 17, marginTop: 8, marginBottom: 15, fontFamily: 'serif', textAlign: 'center' },
  tarjeta: { width: '90%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#2F7D4A', marginTop: 10, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#B8D6C1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 16, backgroundColor: '#F8FFFA' },
  inputGrande: { height: 90, textAlignVertical: 'top' },
  filaEstado: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingVertical: 10 },
  estadoContenido: { flex: 1, paddingRight: 12 },
  labelEstado: { fontSize: 16, fontWeight: 'bold', color: '#2F7D4A' },
  estadoTexto: { fontSize: 14, marginTop: 4, color: '#555555' },
  boton: { backgroundColor: '#2F7D4A', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  botonDeshabilitado: { opacity: 0.7 },
  botonTexto: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
  botonRegresar: { borderWidth: 1, borderColor: '#2F7D4A', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  botonRegresarTexto: { color: '#2F7D4A', fontSize: 16, fontWeight: 'bold' },
});
