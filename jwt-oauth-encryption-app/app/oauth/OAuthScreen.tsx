import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import LoggedInScreen from "./LoggedInScreen";

WebBrowser.maybeCompleteAuthSession();

export default function OAuthScreenDesktop({ onBack }: { onBack: () => void }) {
  const [userInfo, setUserInfo] = useState<any>(null);

  const discovery = AuthSession.useAutoDiscovery(
    "https://accounts.google.com"
  ) as AuthSession.DiscoveryDocument | null;

  // 🔗 Local redirect (sin proxy)
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: false,
  } as any);

  console.log("🔗 Redirect URI generado:", redirectUri);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "360346639771-rpaf60jkfrcom8mmlj9vobc7ar44rdcp.apps.googleusercontent.com",
      scopes: ["openid", "profile", "email"],
      redirectUri,
    },
    discovery 
  );

  useEffect(() => {
    const getUserData = async () => {
      if (response?.type === "success" && response.params?.code && discovery) {
        console.log("✅ Código de autorización:", response.params.code);

        // Intercambiar el código por token (Desktop no necesita secret)
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            code: response.params.code,
            clientId: "360346639771-rpaf60jkfrcom8mmlj9vobc7ar44rdcp.apps.googleusercontent.com",
            redirectUri,
            extraParams: { code_verifier: request?.codeVerifier || "" },
          },
          discovery
        );

        console.log("✅ Token obtenido:", tokenResponse.accessToken);

        const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${tokenResponse.accessToken}` },
        });

        const user = await res.json();
        console.log("🎉 Usuario autenticado:", user);
        setUserInfo(user);
      }
    };
    getUserData();
  }, [response, discovery, request, redirectUri]);

  if (userInfo) {
    return <LoggedInScreen user={userInfo} onLogout={() => setUserInfo(null)} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌍 OAuth 2.0 con Google (Desktop)</Text>
      <Text style={styles.text}>
        Este flujo usa el tipo de cliente “Desktop App” y no necesita client_secret.
      </Text>

      <TouchableOpacity
        style={[styles.button, !request && styles.disabled]}
        disabled={!request}
        onPress={() => promptAsync({ useProxy: false } as any)}
      >
        <Text style={styles.buttonText}>🔐 Iniciar sesión con Google</Text>
      </TouchableOpacity>

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
  text: { color: "#c9d1d9", marginBottom: 20, textAlign: "center" },
  button: {
    backgroundColor: "#238636",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  disabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  backBtn: { marginTop: 30, alignSelf: "center" },
  backText: { color: "#58a6ff" },
});
