import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { supabase } from '../../lib/supabase';

type ClienteVeterinaria = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  tipo_animal: string;
  raza: string;
  peso_kg: number;
  edad: string;
  motivo_consulta: string;
  tipo_atencion: string;
  mascota_enferma: boolean;
};

export default function RegistrosScreen() {
  const [clientes, setClientes] = useState<ClienteVeterinaria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarClientes = useCallback(async () => {
    setCargando(true);
    setError(null);
    const { data, error: errorConsulta } = await supabase
      .from('clientes_veterinaria')
      .select('*')
      .order('id', { ascending: false });

    if (errorConsulta) {
      setError(errorConsulta.message);
      setClientes([]);
    } else {
      setClientes((data ?? []) as ClienteVeterinaria[]);
    }
    setCargando(false);
  }, []);

  useEffect(() => {
    void cargarClientes();
  }, [cargarClientes]);

  return (
    <View style={styles.container}>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        refreshing={cargando}
        onRefresh={cargarClientes}
        contentContainerStyle={clientes.length === 0 ? styles.listaVacia : styles.lista}
        ListHeaderComponent={
          <View style={styles.encabezado}>
            <Text style={styles.titulo}>Clientes registrados</Text>
            <Text style={styles.subtitulo}>Propietarios y mascotas guardados en Supabase</Text>
          </View>
        }
        ListEmptyComponent={
          cargando ? (
            <View style={styles.centro}>
              <ActivityIndicator size="large" color="#2F7D4A" />
              <Text style={styles.mensaje}>Consultando clientes...</Text>
            </View>
          ) : (
            <View style={styles.centro}>
              <Text style={styles.mensaje}>{error ?? 'Aún no hay clientes registrados.'}</Text>
              {error ? (
                <Pressable style={styles.botonReintentar} onPress={cargarClientes}>
                  <Text style={styles.botonReintentarTexto}>Reintentar</Text>
                </Pressable>
              ) : null}
            </View>
          )
        }
        renderItem={({ item }) => <TarjetaCliente cliente={item} />}
      />
    </View>
  );
}

function TarjetaCliente({ cliente }: { cliente: ClienteVeterinaria }) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.filaTitulo}>
        <Text style={styles.nombre}>{cliente.nombre}</Text>
        <Text style={[styles.estado, cliente.mascota_enferma ? styles.enferma : styles.saludable]}>
          {cliente.mascota_enferma ? 'Enferma' : 'Saludable'}
        </Text>
      </View>
      <Text style={styles.detalle}>{cliente.correo}</Text>
      <Text style={styles.detalle}>{cliente.tipo_animal} · {cliente.raza}</Text>
      <Text style={styles.detalle}>Peso: {cliente.peso_kg} kg · Edad: {cliente.edad}</Text>
      <Text style={styles.detalle}>Teléfono: {cliente.telefono}</Text>
      <Text style={styles.atencion}>Atención: {cliente.tipo_atencion}</Text>
      <Text style={styles.motivo}>Motivo: {cliente.motivo_consulta}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3FBF5' },
  lista: { padding: 18, paddingBottom: 30 },
  listaVacia: { flexGrow: 1, padding: 18 },
  encabezado: { marginBottom: 18 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#2F7D4A', textAlign: 'center' },
  subtitulo: { color: '#4B5563', fontSize: 15, textAlign: 'center', marginTop: 5 },
  tarjeta: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2 },
  filaTitulo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  nombre: { flex: 1, fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  estado: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, fontSize: 12, fontWeight: 'bold' },
  saludable: { color: '#166534', backgroundColor: '#DCFCE7' },
  enferma: { color: '#991B1B', backgroundColor: '#FEE2E2' },
  detalle: { color: '#374151', fontSize: 15, marginTop: 7 },
  atencion: { color: '#2F7D4A', fontSize: 15, fontWeight: '700', marginTop: 9 },
  motivo: { color: '#1F2937', fontSize: 15, marginTop: 9, fontStyle: 'italic' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  mensaje: { color: '#4B5563', fontSize: 16, textAlign: 'center', marginTop: 12 },
  botonReintentar: { backgroundColor: '#2F7D4A', borderRadius: 10, marginTop: 16, paddingHorizontal: 16, paddingVertical: 10 },
  botonReintentarTexto: { color: '#FFFFFF', fontWeight: 'bold' },
});
