import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function OAuthScreen({ onBack }: { onBack: () => void }) {
  const [userInfo, setUserInfo] = useState<any>(null);

  // Descubrimiento automático de endpoints de Google OAuth
  const discovery = AuthSession.useAutoDiscovery("https://accounts.google.com");

  // Configuración de la solicitud de autenticación
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId:
        "360346639771-5r63rm14n097tflp9pl5c2qrmbkbrug7.apps.googleusercontent.com", // 👈 Tu client ID de Google Cloud Console
      scopes: ["openid", "profile", "email"],
      redirectUri: AuthSession.makeRedirectUri({
        // @ts-ignore
        useProxy: false,
        native: "http://localhost:8081" // Permite usar Expo Go sin configuración extra
      }),
    },
    discovery
  );

  // Cuando el usuario inicia sesión exitosamente
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (response?.type === "success" && response.authentication?.accessToken) {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: {
              Authorization: `Bearer ${response.authentication.accessToken}`,
            },
          }
        );
        const user = await userInfoResponse.json();
        setUserInfo(user);
      }
    };
    fetchUserInfo();
  }, [response]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌍 OAuth 2.0 con Google</Text>
      <Text style={styles.text}>
        OAuth permite acceder a recursos protegidos (como tu perfil de Google)
        sin compartir la contraseña. Aquí puedes probar el flujo real:
      </Text>

      {!userInfo ? (
        <>
          <View style={styles.flow}>
            <Text style={styles.box}>1️⃣ Usuario → App: Solicita acceso</Text>
            <Text style={styles.box}>
              2️⃣ App → Google OAuth: Pide permiso al usuario
            </Text>
            <Text style={styles.box}>
              3️⃣ Google → App: Devuelve un token de acceso
            </Text>
            <Text style={styles.box}>
              4️⃣ App → API: Usa ese token para acceder a tu perfil
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, !request && styles.disabled]}
            disabled={!request}
            onPress={() => promptAsync()}
          >
            <Text style={styles.buttonText}>🔐 Iniciar sesión con Google</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.profileBox}>
          <Image source={{ uri: userInfo.picture }} style={styles.avatar} />
          <Text style={styles.name}>{userInfo.name}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>

          <Text style={styles.tokenLabel}>✅ Access Token:</Text>
          <Text numberOfLines={3} style={styles.token}>
            {response && response.type === "success"
              ? response.authentication?.accessToken
              : "No se obtuvo token aún"}
          </Text>
        </View>
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
    justifyContent: "center",
  },
  title: {
    color: "#58a6ff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    color: "#c9d1d9",
    marginBottom: 20,
    textAlign: "center",
  },
  flow: { gap: 8 },
  box: {
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#238636",
  },
  button: {
    backgroundColor: "#238636",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  disabled: { opacity: 0.5 },
  profileBox: {
    alignItems: "center",
    backgroundColor: "#0d1117",
    padding: 20,
    borderRadius: 8,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { color: "#58a6ff", fontWeight: "bold", fontSize: 18 },
  email: { color: "#c9d1d9", marginBottom: 10 },
  tokenLabel: { color: "#79c0ff", marginTop: 10, fontWeight: "bold" },
  token: {
    color: "#c9d1d9",
    fontSize: 12,
    backgroundColor: "#010409",
    padding: 10,
    borderRadius: 6,
  },
  backBtn: { marginTop: 30, alignSelf: "center" },
  backText: { color: "#58a6ff" },
});
