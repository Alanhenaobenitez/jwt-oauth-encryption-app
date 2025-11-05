import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { decodeJwt } from "../utils/jwtUtils";

export default function JwtScreen({ onBack }: { onBack: () => void }) {
  const sampleToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJ1c2VyIjoiTGF1cmEifQ." +
    "xR5C5MjY6cWcD_rPX_vfF1Uvz2P9x0GSGghcXr9XKJg";

  const decoded = decodeJwt(sampleToken);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 JWT (JSON Web Token)</Text>
      <Text style={styles.text}>Un JWT tiene tres partes:</Text>

      <View style={styles.tokenContainer}>
        <Text style={styles.header}>HEADER</Text>
        <Text style={styles.tokenPart}>{decoded.header}</Text>
        <Text style={styles.payload}>PAYLOAD</Text>
        <Text style={styles.tokenPart}>{decoded.payload}</Text>
        <Text style={styles.signature}>SIGNATURE</Text>
        <Text style={styles.tokenPart}>{decoded.signature}</Text>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅ Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#161b22" },
  title: { color: "#58a6ff", fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { color: "#c9d1d9", marginBottom: 15 },
  tokenContainer: { backgroundColor: "#0d1117", padding: 15, borderRadius: 8 },
  header: { color: "#ffa657", fontWeight: "bold", marginTop: 5 },
  payload: { color: "#79c0ff", fontWeight: "bold", marginTop: 10 },
  signature: { color: "#a5d6ff", fontWeight: "bold", marginTop: 10 },
  tokenPart: { color: "#c9d1d9", fontSize: 12 },
  backBtn: { marginTop: 20, alignSelf: "center" },
  backText: { color: "#58a6ff" },
});
