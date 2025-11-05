import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as CryptoJS from "crypto-js";
import { Buffer } from "buffer";  // ✅ polyfill
global.Buffer = Buffer;           // ✅ habilita Buffer globalmente
import { decodeJwt } from "../utils/jwtUtils";

export default function AuthWithJwtScreen({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<any>(null);

  const SECRET_KEY = "miClaveSuperSecreta";

  const handleLogin = () => {
    if (!email || !password) return alert("Completa los campos");

    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
      email,
      role: "user",
      iat: Date.now(),
    };

    // ✅ Usa Buffer en lugar de btoa()
    const base64UrlEncode = (obj: object) =>
      Buffer.from(JSON.stringify(obj))
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    const headerEncoded = base64UrlEncode(header);
    const payloadEncoded = base64UrlEncode(payload);

    const hash = CryptoJS.HmacSHA256(
      `${headerEncoded}.${payloadEncoded}`,
      SECRET_KEY
    );
    const signature = CryptoJS.enc.Base64.stringify(hash)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const newToken = `${headerEncoded}.${payloadEncoded}.${signature}`;

    console.log("✅ Token generado:", newToken);

    setToken(newToken);
    setDecoded(decodeJwt(newToken));
  };

  const handleLogout = () => {
    setToken(null);
    setDecoded(null);
    setEmail("");
    setPassword("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔐 Autenticación con JWT</Text>

      {!token ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>✅ Token generado:</Text>
          <Text selectable style={styles.token}>{token}</Text>

          <Text style={styles.subtitle}>📦 Decodificado:</Text>
          <Text style={styles.json}>{JSON.stringify(decoded, null, 2)}</Text>

          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅ Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#161b22",
    padding: 20,
  },
  title: {
    color: "#58a6ff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#0d1117",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#238636",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  subtitle: { color: "#79c0ff", marginTop: 15, fontWeight: "bold" },
  token: {
    color: "#c9d1d9",
    fontSize: 12,
    backgroundColor: "#010409",
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  json: {
    color: "#9BE9A8",
    fontSize: 12,
    backgroundColor: "#0d1117",
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  logout: {
    backgroundColor: "#c93c37",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
  backBtn: { marginTop: 25, alignSelf: "center" },
  backText: { color: "#58a6ff" },
});
