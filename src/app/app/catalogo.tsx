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
  detalle: string | null;
  precio: number | string | null;
  created_at: string | null;
};

function obtenerMensajeError(error: unknown) {
  return error instanceof Error
    ? error.message
    : typeof error === "object" && error !== null && "message" in error
      ? String(error.message)
      : String(error);
}

async function consultarCatalogo() {
  const { data, error } = await supabase
    .from("catalogo")
    .select("codigo, titulo, descripcion, detalle, precio, created_at")
    .order("titulo", { ascending: true });

  if (error) {
    console.error("Error Supabase:", error);
    throw error;
  }

  console.log("Productos recibidos:", data);
  return (data ?? []) as ItemCatalogo[];
}

export default function CatalogoScreen() {
  const router = useRouter();
  const [items, setItems] = useState<ItemCatalogo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState("");

  const cargarCatalogo = useCallback(async () => {
    setCargando(true);
    setErrorTexto("");

    try {
      setItems(await consultarCatalogo());
    } catch (error: unknown) {
      console.error("Error al cargar catálogo:", error);
      setItems([]);
      setErrorTexto("No fue posible cargar: " + obtenerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let activo = true;

    async function cargarInicial() {
      try {
        const productos = await consultarCatalogo();

        if (activo) {
          setItems(productos);
        }
      } catch (error: unknown) {
        console.error("Error al cargar catálogo:", error);

        if (activo) {
          setItems([]);
          setErrorTexto("No fue posible cargar: " + obtenerMensajeError(error));
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    void cargarInicial();

    return () => {
      activo = false;
    };
  }, []);

  const abrirDetalle = (codigo: string) => {
    router.push({
      pathname: "/app/detalle",
      params: { codigo },
    });
  };

  const renderizarProducto = ({ item }: { item: ItemCatalogo }) => {
    return <TarjetaCatalogo elemento={item} onPress={() => abrirDetalle(item.codigo)} />;
  };

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
        data={items}
        keyExtractor={(item) => item.codigo}
        renderItem={renderizarProducto}
        onRefresh={() => void cargarCatalogo()}
        refreshing={cargando}
        contentContainerStyle={items.length === 0 ? styles.listaVacia : styles.lista}
        ListHeaderComponent={
          <View style={styles.encabezado}>
            <Text style={styles.titulo}>Catálogo veterinario</Text>
            <Text style={styles.subtitulo}>Productos registrados en Huellitas Veterinaria</Text>
            <Pressable
              accessibilityLabel="Cargar nuevamente el catálogo"
              style={styles.botonCargar}
              onPress={() => void cargarCatalogo()}
            >
              <Text style={styles.botonCargarTexto}>Cargar catálogo</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.centro}>
            <Text style={styles.mensaje}>
              {errorTexto || "Aún no hay productos en el catálogo."}
            </Text>
            {errorTexto ? (
              <Pressable style={styles.botonReintentar} onPress={() => void cargarCatalogo()}>
                <Text style={styles.botonReintentarTexto}>Reintentar</Text>
              </Pressable>
            ) : null}
          </View>
        }
        ListFooterComponent={
          <View>
            <View style={styles.acciones}>
              <Pressable
                accessibilityLabel="Mostrar los códigos QR de prueba uno por uno"
                style={styles.botonQrPruebas}
                onPress={() => router.push("/app/qr-pruebas")}
              >
                <Text style={styles.botonQrPruebasTexto}>▣ Ver QR de prueba</Text>
              </Pressable>
              <Pressable
                accessibilityLabel="Abrir el escáner de códigos QR"
                style={styles.botonEscaner}
                onPress={() => router.push("/app/escanear")}
              >
                <Text style={styles.botonEscanerTexto}>📷 Escanear código QR</Text>
              </Pressable>
              <Pressable style={styles.volver} onPress={() => router.back()}>
                <Text style={styles.volverTexto}>Regresar al inicio</Text>
              </Pressable>
            </View>
          </View>
        }
      />
    </View>
  );
}

function TarjetaCatalogo({
  elemento,
  onPress,
}: {
  elemento: ItemCatalogo;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={`Ver detalles de ${elemento.titulo}`}
      style={({ pressed }) => [styles.tarjeta, pressed && styles.tarjetaPresionada]}
      onPress={onPress}
    >
      <Text style={styles.codigo}>{elemento.codigo}</Text>
      <Text style={styles.nombre}>{elemento.titulo}</Text>
      <Text style={styles.descripcion}>{elemento.descripcion}</Text>
      <Text style={styles.precio}>
        {elemento.precio == null ? "Precio por consultar" : formatearPrecio(elemento.precio)}
      </Text>
      <Text style={styles.verDetalle}>Ver detalles</Text>
    </Pressable>
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
  tarjetaPresionada: { opacity: 0.78 },
  codigo: { color: "#2F7D4A", fontSize: 13, fontWeight: "700" },
  nombre: { color: "#1F2937", fontSize: 18, fontWeight: "bold", marginTop: 5 },
  descripcion: { color: "#4B5563", fontSize: 15, lineHeight: 21, marginTop: 7 },
  precio: { color: "#2F7D4A", fontSize: 17, fontWeight: "bold", marginTop: 10 },
  verDetalle: { color: "#1F6138", fontSize: 14, fontWeight: "700", marginTop: 12 },
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
  acciones: { alignItems: "center", marginTop: 8 },
  botonQrPruebas: {
    alignItems: "center",
    backgroundColor: "#EAF7EE",
    borderColor: "#2F7D4A",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 12,
    padding: 15,
    width: "100%",
  },
  botonQrPruebasTexto: { color: "#1F6138", fontSize: 16, fontWeight: "bold" },
  botonEscaner: {
    alignItems: "center",
    borderColor: "#2F7D4A",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 12,
    padding: 15,
    width: "100%",
  },
  botonEscanerTexto: { color: "#2F7D4A", fontSize: 16, fontWeight: "bold" },
  volver: { marginTop: 14, padding: 10 },
  volverTexto: { color: "#2F7D4A", fontSize: 15, fontWeight: "bold" },
});
