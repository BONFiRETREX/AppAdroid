import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

type ResultadoParams = {
  id?: string | string[];
  nombre?: string | string[];
  correo?: string | string[];
  telefono?: string | string[];
  tipoAnimal?: string | string[];
  raza?: string | string[];
  pesoKg?: string | string[];
  edad?: string | string[];
  motivoConsulta?: string | string[];
  tipoAtencion?: string | string[];
  mascotaEnferma?: string | string[];
};

const texto = (valor: string | string[] | undefined) =>
  Array.isArray(valor) ? valor[0] ?? '' : valor ?? '';

export default function ResultadoScreen() {
  const params = useLocalSearchParams<ResultadoParams>();
  const mascotaEnferma = texto(params.mascotaEnferma) === 'true';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.icono}>✓</Text>
      <Text style={styles.titulo}>Cliente registrado</Text>
      <Text style={styles.subtitulo}>Los datos fueron guardados en Supabase.</Text>
      <View style={styles.tarjeta}>
        <Dato etiqueta="Registro" valor={`#${texto(params.id)}`} />
        <Dato etiqueta="Propietario" valor={texto(params.nombre)} />
        <Dato etiqueta="Correo" valor={texto(params.correo)} />
        <Dato etiqueta="Teléfono" valor={texto(params.telefono)} />
        <Dato etiqueta="Mascota" valor={texto(params.tipoAnimal)} />
        <Dato etiqueta="Raza" valor={texto(params.raza)} />
        <Dato etiqueta="Peso" valor={`${texto(params.pesoKg)} kg`} />
        <Dato etiqueta="Edad" valor={texto(params.edad)} />
        <Dato etiqueta="Motivo" valor={texto(params.motivoConsulta)} />
        <Dato etiqueta="Tipo de atención" valor={texto(params.tipoAtencion)} />
        <Dato etiqueta="Estado" valor={mascotaEnferma ? 'Enferma' : 'Saludable'} />
      </View>
      <Pressable style={styles.boton} onPress={() => router.push('./registros')}>
        <Text style={styles.botonTexto}>Ver clientes registrados</Text>
      </Pressable>
      <Pressable style={styles.botonSecundario} onPress={() => router.replace('./citas')}>
        <Text style={styles.botonSecundarioTexto}>Registrar otro cliente</Text>
      </Pressable>
    </ScrollView>
  );
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, justifyContent: 'center', backgroundColor: '#F3FBF5' },
  icono: { alignSelf: 'center', width: 64, height: 64, borderRadius: 32, textAlign: 'center', textAlignVertical: 'center', fontSize: 36, color: '#FFFFFF', backgroundColor: '#2F7D4A', marginBottom: 14 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#2F7D4A', textAlign: 'center' },
  subtitulo: { fontSize: 16, color: '#4B5563', textAlign: 'center', marginTop: 8, marginBottom: 22 },
  tarjeta: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, elevation: 2 },
  fila: { marginBottom: 13 },
  etiqueta: { fontSize: 13, fontWeight: '700', color: '#2F7D4A', textTransform: 'uppercase' },
  valor: { fontSize: 16, color: '#1F2937', marginTop: 2 },
  boton: { backgroundColor: '#2F7D4A', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  botonTexto: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  botonSecundario: { padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  botonSecundarioTexto: { color: '#2F7D4A', fontSize: 16, fontWeight: 'bold' },
});
