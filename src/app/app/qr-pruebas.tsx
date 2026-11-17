import { useState } from "react";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const codigosQrPrueba = [
  {
    codigo: "VET-001",
    titulo: "Correa para perro grande",
    imagen: require("../../../docs/qr/VET-001.png"),
  },
  {
    codigo: "VET-002",
    titulo: "Alimento premium para perros",
    imagen: require("../../../docs/qr/VET-002.png"),
  },
  {
    codigo: "VET-003",
    titulo: "Collar antipulgas",
    imagen: require("../../../docs/qr/VET-003.png"),
  },
  {
    codigo: "VET-004",
    titulo: "Transportadora para gatos",
    imagen: require("../../../docs/qr/VET-004.png"),
  },
  {
    codigo: "QR-TRAMPA",
    titulo: "Prueba de producto inexistente",
    imagen: require("../../../docs/qr/QR-TRAMPA.png"),
    invalido: true,
  },
];

export default function QrPruebasScreen() {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const qrActual = codigosQrPrueba[indice];

  const cambiarQr = (nuevoIndice: number) => {
    if (nuevoIndice >= 0 && nuevoIndice < codigosQrPrueba.length) {
      setIndice(nuevoIndice);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>QR de prueba</Text>
      <Text style={styles.descripcion}>
        Se muestra un solo código a la vez para que la cámara no lea otro por error.
      </Text>
      <Text style={styles.indicacion}>
        Muestra esta pantalla en otro celular o computador y usa un celular diferente para escanear.
      </Text>

      <View style={[styles.tarjetaQr, qrActual.invalido && styles.tarjetaQrInvalida]}>
        <Image source={qrActual.imagen} style={styles.imagenQr} />
        <Text style={styles.codigo}>{qrActual.codigo}</Text>
        <Text style={styles.nombre}>{qrActual.titulo}</Text>
        {qrActual.invalido ? (
          <Text style={styles.advertencia}>Este QR debe mostrar que el producto no existe.</Text>
        ) : (
          <Text style={styles.exito}>Debe abrir exactamente la ficha de este producto.</Text>
        )}
      </View>

      <Text style={styles.contador}>
        QR {indice + 1} de {codigosQrPrueba.length}
      </Text>
      <View style={styles.controles}>
        <Pressable
          disabled={indice === 0}
          style={[styles.botonNavegacion, indice === 0 && styles.botonDeshabilitado]}
          onPress={() => cambiarQr(indice - 1)}
        >
          <Text style={styles.textoBotonNavegacion}>Anterior</Text>
        </Pressable>
        <Pressable
          disabled={indice === codigosQrPrueba.length - 1}
          style={[
            styles.botonNavegacion,
            indice === codigosQrPrueba.length - 1 && styles.botonDeshabilitado,
          ]}
          onPress={() => cambiarQr(indice + 1)}
        >
          <Text style={styles.textoBotonNavegacion}>Siguiente</Text>
        </Pressable>
      </View>

      <Text style={styles.elegirTitulo}>Elegir otro código</Text>
      <View style={styles.selector}>
        {codigosQrPrueba.map((qr, posicion) => (
          <Pressable
            key={qr.codigo}
            accessibilityLabel={`Mostrar ${qr.codigo}`}
            style={[
              styles.botonSelector,
              indice === posicion && styles.botonSelectorActivo,
              qr.invalido && styles.botonSelectorInvalido,
            ]}
            onPress={() => cambiarQr(posicion)}
          >
            <Text
              style={[
                styles.textoSelector,
                indice === posicion && styles.textoSelectorActivo,
              ]}
            >
              {qr.codigo}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.botonCamara} onPress={() => router.push("/app/escanear")}>
        <Text style={styles.botonCamaraTexto}>📷 Abrir cámara para escanear</Text>
      </Pressable>
      <Pressable style={styles.volver} onPress={() => router.back()}>
        <Text style={styles.volverTexto}>Regresar al catálogo</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F3FBF5",
    flexGrow: 1,
    padding: 22,
  },
  titulo: { color: "#1F6138", fontSize: 28, fontWeight: "bold", textAlign: "center" },
  descripcion: {
    color: "#4B5563",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
    textAlign: "center",
  },
  indicacion: {
    color: "#1F6138",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    textAlign: "center",
  },
  tarjetaQr: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#B9DFC3",
    borderRadius: 20,
    borderWidth: 2,
    elevation: 2,
    marginTop: 20,
    padding: 18,
    width: "100%",
  },
  tarjetaQrInvalida: { borderColor: "#EAB0A7" },
  imagenQr: { height: 260, resizeMode: "contain", width: 260 },
  codigo: { color: "#1F6138", fontSize: 22, fontWeight: "bold", marginTop: 12 },
  nombre: { color: "#374151", fontSize: 16, marginTop: 5, textAlign: "center" },
  exito: { color: "#1F6138", fontSize: 14, fontWeight: "600", marginTop: 10, textAlign: "center" },
  advertencia: { color: "#A33A2B", fontSize: 14, fontWeight: "600", marginTop: 10, textAlign: "center" },
  contador: { color: "#4B5563", fontSize: 14, marginTop: 16 },
  controles: { flexDirection: "row", gap: 12, marginTop: 8, width: "100%" },
  botonNavegacion: {
    alignItems: "center",
    backgroundColor: "#2F7D4A",
    borderRadius: 10,
    flex: 1,
    padding: 13,
  },
  botonDeshabilitado: { backgroundColor: "#A8C9B1" },
  textoBotonNavegacion: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  elegirTitulo: { color: "#1F6138", fontSize: 16, fontWeight: "bold", marginTop: 22 },
  selector: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 10 },
  botonSelector: {
    backgroundColor: "#FFFFFF",
    borderColor: "#A8D5B5",
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  botonSelectorActivo: { backgroundColor: "#2F7D4A", borderColor: "#2F7D4A" },
  botonSelectorInvalido: { borderColor: "#EAB0A7" },
  textoSelector: { color: "#1F6138", fontSize: 13, fontWeight: "bold" },
  textoSelectorActivo: { color: "#FFFFFF" },
  botonCamara: {
    alignItems: "center",
    backgroundColor: "#2F7D4A",
    borderRadius: 12,
    marginTop: 24,
    padding: 15,
    width: "100%",
  },
  botonCamaraTexto: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  volver: { marginTop: 10, padding: 10 },
  volverTexto: { color: "#2F7D4A", fontSize: 15, fontWeight: "bold" },
});
