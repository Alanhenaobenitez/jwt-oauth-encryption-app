import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function OAuthScreen({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 OAuth 2.0</Text>
      <Text style={styles.text}>
        OAuth es un protocolo que permite a las aplicaciones acceder a recursos protegidos en nombre del usuario sin compartir su contraseña.
      </Text>

      <View style={styles.flow}>
        <Text style={styles.box}>1️⃣ Usuario → App: Solicita acceso</Text>
        <Text style={styles.box}>2️⃣ App → Servidor OAuth: Solicita Token</Text>
        <Text style={styles.box}>3️⃣ OAuth → App: Devuelve Access Token</Text>
        <Text style={styles.box}>4️⃣ App → API: Usa Token para acceder</Text>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅ Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161b22", padding: 20 },
  title: { color: "#58a6ff", fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { color: "#c9d1d9", marginBottom: 20 },
  flow: { gap: 8 },
  box: {
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#238636",
  },
  backBtn: { marginTop: 20, alignSelf: "center" },
  backText: { color: "#58a6ff" },
});
