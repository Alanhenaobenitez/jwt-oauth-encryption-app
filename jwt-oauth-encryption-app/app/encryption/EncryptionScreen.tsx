import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { encryptText, decryptText } from "../utils/cryptoUtils";

export default function EncryptionScreen({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Cifrado de Datos (AES)</Text>

      <TextInput
        placeholder="Escribe un texto..."
        placeholderTextColor="#555"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const enc = encryptText(text);
          setEncrypted(enc);
          setDecrypted(decryptText(enc));
        }}
      >
        <Text style={styles.btnText}>Cifrar y Mostrar</Text>
      </TouchableOpacity>

      {encrypted ? (
        <View style={styles.result}>
          <Text style={styles.label}>🔐 Cifrado:</Text>
          <Text style={styles.code}>{encrypted}</Text>

          <Text style={styles.label}>🔓 Descifrado:</Text>
          <Text style={styles.code}>{decrypted}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅ Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161b22", padding: 20 },
  title: { color: "#58a6ff", fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: {
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#238636",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 15,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  result: { backgroundColor: "#0d1117", padding: 15, borderRadius: 6 },
  label: { color: "#79c0ff", fontWeight: "bold", marginTop: 10 },
  code: { color: "#c9d1d9", fontSize: 12 },
  backBtn: { marginTop: 20, alignSelf: "center" },
  backText: { color: "#58a6ff" },
});
