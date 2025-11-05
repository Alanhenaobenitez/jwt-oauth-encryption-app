import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  onNavigate: (screen: "jwt" | "oauth" | "encryption" | "auth") => void;
};

export default function HomeScreen({ onNavigate }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Seguridad en Aplicaciones</Text>
      <Text style={styles.subtitle}>JWT · OAuth · Cifrado de Datos</Text>

      <TouchableOpacity style={styles.button} onPress={() => onNavigate("jwt")}>
        <Text style={styles.btnText}>Ver JWT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onNavigate("oauth")}>
        <Text style={styles.btnText}>Ver OAuth</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onNavigate("encryption")}>
        <Text style={styles.btnText}>Ver Cifrado</Text>
      </TouchableOpacity>

      {/* ✅ Nuevo botón */}
      <TouchableOpacity style={styles.button} onPress={() => onNavigate("auth")}>
        <Text style={styles.btnText}>Autenticación con JWT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d1117",
    padding: 20,
  },
  title: {
    color: "#58a6ff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#c9d1d9",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#238636",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
