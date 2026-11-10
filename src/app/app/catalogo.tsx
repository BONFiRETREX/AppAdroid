import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import { supabase } from "../../../lib/supabase";

type ItemCatalogo = {
  codigo: string;
  titulo: string;
  descripcion: string;
  precio: number | string;
  created_at: string;
  detalle: string;
};

const productosEjemplo: ItemCatalogo[] = [
  {
    codigo: "VET-001",
    titulo: "Correa para perro grande",
    descripcion: "Correa reforzada para paseos de perros grandes.",
    precio: 65000,
    created_at: "2026-01-01T00:00:00.000Z",
    detalle: "Correa ajustable con mosquetón metálico y agarre acolchado.",
  },
  {
    codigo: "VET-002",
    titulo: "Alimento premium para perros",
    descripcion: "Alimento balanceado para perros adultos.",
    precio: 120000,
    created_at: "2026-01-01T00:00:00.000Z",
    detalle: "Bolsa de 3 kg con proteínas, vitaminas y minerales.",
  },
  {
    codigo: "VET-003",
    titulo: "Juguete mordedor resistente",
    descripcion: "Juguete de caucho para el entretenimiento de perros.",
    precio: 25000,
    created_at: "2026-01-01T00:00:00.000Z",
    detalle: "Ayuda a estimular el juego y el cuidado dental.",
  },
  {
    codigo: "VET-004",
    titulo: "Shampoo hipoalergénico",
    descripcion: "Shampoo suave para perros y gatos con piel sensible.",
    precio: 38000,
    created_at: "2026-01-01T00:00:00.000Z",
    detalle: "Presentación de 500 ml, libre de parabenos.",
  },
  {
    codigo: "VET-005",
    titulo: "Collar antipulgas",
    descripcion: "Collar de protección contra pulgas y garrapatas.",
    precio: 42000,
    created_at: "2026-01-01T00:00:00.000Z",
    detalle: "Protección continua para mascotas según las indicaciones del empaque.",
  },
  {
    codigo: "VET-006",
    titulo: "Transportadora para gatos",
    descripcion: "Transportadora ventilada para llevar gatos de forma segura.",
    precio: 95000,
    created_at: "2026-01-01T00:00:00.000Z",
    detalle: "Cuenta con puerta frontal y espacio cómodo para el traslado.",
  },
];

export default function CatalogoScreen() {
  const router = useRouter();
  const [items, setItems] = useState<ItemCatalogo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorText, setErrorText] = useState("");

  const cargarCatalogo = useCallback(async () => {
    setCargando(true);
    setErrorText("");

    try {
      const { data, error } = await supabase
        .from("catalogo")
        .select("codigo, titulo, descripcion, precio, created_at, detalle")
        .order("titulo", { ascending: true });

      if (error) {
        console.error("Error Supabase:", error);
        throw error;
      }

      console.log("Productos recibidos:", data);
      setItems((data ?? []) as ItemCatalogo[]);
    } catch (error: unknown) {
      console.error("Error al cargar catálogo:", error);
      const mensaje =
        error instanceof Error
          ? error.message
          : typeof error === "object" && error !== null && "message" in error
            ? String(error.message)
            : String(error);

      setItems([]);
      setErrorText("No fue posible cargar: " + mensaje);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargarCatalogo();
  }, [cargarCatalogo]);

  const mostrarEjemplos = !cargando && !errorText && items.length === 0;
  const itemsMostrados = mostrarEjemplos ? productosEjemplo : items;

  if (cargando) {
    return (
      <View style={[styles.container, styles.centro]}>
        <ActivityIndicator size="large" color="#2F7D4A" />
        <Text style={styles.cargandoTexto}>Consultando productos en Supabase...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={itemsMostrados}
        keyExtractor={(item) => item.codigo}
        onRefresh={cargarCatalogo}
        refreshing={cargando}
        contentContainerStyle={
          itemsMostrados.length === 0 ? styles.listaVacia : styles.lista
        }
        ListHeaderComponent={
          <View style={styles.encabezado}>
            <Text style={styles.titulo}>Catálogo veterinario</Text>
            <Text style={styles.subtitulo}>
              Servicios y productos registrados
            </Text>
            {mostrarEjemplos ? (
              <Text style={styles.avisoEjemplo}>Productos de ejemplo</Text>
            ) : null}
            <Pressable
              style={styles.botonCargar}
              onPress={() => void cargarCatalogo()}
            >
              <Text style={styles.botonCargarTexto}>Cargar catálogo</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={
          cargando ? (
            <View style={styles.centro}>
              <ActivityIndicator size="large" color="#2F7D4A" />
              <Text style={styles.cargandoTexto}>Consultando productos en Supabase...</Text>
            </View>
          ) : (
            <View style={styles.centro}>
              <Text style={styles.mensaje}>
                {errorText || "Aún no hay elementos en el catálogo."}
              </Text>
              {errorText ? (
                <Pressable
                  style={styles.botonReintentar}
                  onPress={cargarCatalogo}
                >
                  <Text style={styles.botonReintentarTexto}>Reintentar</Text>
                </Pressable>
              ) : null}
            </View>
          )
        }
        renderItem={renderizarProducto}
        ListFooterComponent={
          <View style={styles.acciones}>
            <Pressable
              style={styles.boton}
              onPress={() => router.push("/app/detalle")}
            >
              <Text style={styles.botonTexto}>Ver pantalla de detalle</Text>
            </Pressable>
            <Pressable
              style={styles.botonSecundario}
              onPress={() => router.push("/app/escanear")}
            >
              <Text style={styles.botonSecundarioTexto}>Abrir escáner</Text>
            </Pressable>
            <Pressable style={styles.volver} onPress={() => router.back()}>
              <Text style={styles.volverTexto}>Regresar</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

function renderizarProducto({ item }: { item: ItemCatalogo }) {
  return <TarjetaCatalogo elemento={item} />;
}

function TarjetaCatalogo({ elemento }: { elemento: ItemCatalogo }) {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.codigo}>{elemento.codigo}</Text>
      <Text style={styles.nombre}>{elemento.titulo}</Text>
      <Text style={styles.descripcion}>{elemento.descripcion}</Text>
      <Text style={styles.precio}>{formatearPrecio(elemento.precio)}</Text>
    </View>
  );
}

function formatearPrecio(precio: number | string) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(precio));
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3FBF5" },
  lista: { padding: 18, paddingBottom: 30 },
  listaVacia: { flexGrow: 1, padding: 18 },
  encabezado: { marginBottom: 18 },
  titulo: {
    color: "#2F7D4A",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    color: "#4B5563",
    fontSize: 15,
    marginTop: 5,
    textAlign: "center",
  },
  avisoEjemplo: {
    color: "#8A5A00",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  botonCargar: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#2F7D4A",
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  botonCargarTexto: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 2,
    marginBottom: 12,
    padding: 16,
  },
  codigo: { color: "#2F7D4A", fontSize: 13, fontWeight: "700" },
  nombre: { color: "#1F2937", fontSize: 18, fontWeight: "bold", marginTop: 5 },
  descripcion: { color: "#4B5563", fontSize: 15, lineHeight: 21, marginTop: 7 },
  precio: { color: "#2F7D4A", fontSize: 17, fontWeight: "bold", marginTop: 10 },
  centro: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  mensaje: {
    color: "#4B5563",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  cargandoTexto: {
    color: "#2F7D4A",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    textAlign: "center",
  },
  botonReintentar: {
    backgroundColor: "#2F7D4A",
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  botonReintentarTexto: { color: "#FFFFFF", fontWeight: "bold" },
  acciones: { alignItems: "center", marginTop: 10 },
  boton: {
    alignItems: "center",
    backgroundColor: "#2F7D4A",
    borderRadius: 12,
    marginTop: 16,
    padding: 15,
    width: "100%",
  },
  botonTexto: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  botonSecundario: {
    alignItems: "center",
    borderColor: "#2F7D4A",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 12,
    padding: 15,
    width: "100%",
  },
  botonSecundarioTexto: { color: "#2F7D4A", fontSize: 16, fontWeight: "bold" },
  volver: { marginTop: 14, padding: 10 },
  volverTexto: { color: "#2F7D4A", fontSize: 15, fontWeight: "bold" },
});
