import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  CameraView,
  type BarcodeScanningResult,
  useCameraPermissions,
} from "expo-camera";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { supabase } from "../../../lib/supabase";

export default function EscanearScreen() {
  const router = useRouter();
  const [permiso, solicitarPermiso] = useCameraPermissions();
  const [escaneado, setEscaneado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const procesando = useRef(false);

  const leerQR = async ({ data }: BarcodeScanningResult) => {
    if (procesando.current) {
      return;
    }

    procesando.current = true;
    setEscaneado(true);
    setMensaje("");

    const codigo = data.trim();

    // El QR guarda solamente el código del catálogo, nunca una URL o datos personales.
    if (!/^[A-Za-z0-9_-]{1,50}$/.test(codigo)) {
      setMensaje("Código QR no válido para este catálogo.");
      return;
    }

    try {
      const { data: producto, error } = await supabase
        .from("catalogo")
        .select("codigo")
        .eq("codigo", codigo)
        .maybeSingle();

      if (error) {
        console.error("Error Supabase:", error);
        throw error;
      }

      if (!producto) {
        setMensaje("Código leído, pero el producto no existe.");
        return;
      }

      // replace evita volver a una cámara activa después de abrir el detalle.
      router.replace({
        pathname: "/app/detalle",
        params: { codigo: producto.codigo },
      });
    } catch (error: unknown) {
      console.error("Error al consultar QR:", error);
      setMensaje("No fue posible consultar Supabase. Intenta de nuevo.");
    }
  };

  const escanearDeNuevo = () => {
    procesando.current = false;
    setEscaneado(false);
    setMensaje("");
  };

  if (!permiso) {
    return (
      <View style={styles.centro}>
        <Text style={styles.texto}>Verificando permiso de cámara...</Text>
      </View>
    );
  }

  if (!permiso.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.titulo}>Se necesita la cámara</Text>
        <Text style={styles.texto}>Concede el permiso para leer códigos QR de productos.</Text>
        <Pressable style={styles.boton} onPress={() => void solicitarPermiso()}>
          <Text style={styles.botonTexto}>Permitir cámara</Text>
        </Pressable>
        {!permiso.canAskAgain ? (
          <Text style={styles.error}>Habilita el permiso de cámara desde Ajustes del celular.</Text>
        ) : null}
        <Pressable style={styles.volver} onPress={() => router.back()}>
          <Text style={styles.volverTexto}>Regresar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escanear producto</Text>
      <Text style={styles.texto}>Apunta al QR impreso o mostrado en otra pantalla.</Text>
      <CameraView
        style={styles.camara}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={escaneado ? undefined : leerQR}
      />
      {mensaje ? <Text style={styles.error}>{mensaje}</Text> : null}
      {escaneado ? (
        <Pressable style={styles.boton} onPress={escanearDeNuevo}>
          <Text style={styles.botonTexto}>Escanear de nuevo</Text>
        </Pressable>
      ) : null}
      <Pressable style={styles.volver} onPress={() => router.back()}>
        <Text style={styles.volverTexto}>Regresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F3FBF5", flex: 1, padding: 20 },
  centro: {
    alignItems: "center",
    backgroundColor: "#F3FBF5",
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },
  titulo: {
    color: "#1F6138",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  texto: {
    color: "#4B5563",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 18,
    marginTop: 10,
    textAlign: "center",
  },
  camara: {
    borderColor: "#A8D5B5",
    borderRadius: 18,
    borderWidth: 2,
    flex: 1,
    minHeight: 280,
    overflow: "hidden",
  },
  boton: {
    alignItems: "center",
    backgroundColor: "#2F7D4A",
    borderRadius: 12,
    marginTop: 16,
    padding: 15,
    width: "100%",
  },
  botonTexto: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  error: {
    color: "#A33A2B",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    textAlign: "center",
  },
  volver: { alignSelf: "center", marginTop: 10, padding: 10 },
  volverTexto: { color: "#2F7D4A", fontSize: 15, fontWeight: "bold" },
});
