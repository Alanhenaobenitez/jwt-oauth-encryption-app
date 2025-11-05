import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

// 🏠 Pantallas
import HomeScreen from "./app/screens/HomeScreen";
import JwtScreen from "./app/jwt/JwtScreen";
import OAuthScreen from "./app/oauth/OAuthScreen";
import EncryptionScreen from "./app/encryption/EncryptionScreen";

export default function App() {
  // Estado para manejar la pantalla actual
  const [screen, setScreen] = useState<"home" | "jwt" | "oauth" | "encryption">(
    "home"
  );

  // Renderiza la pantalla según el estado
  const renderScreen = () => {
    switch (screen) {
      case "jwt":
        return <JwtScreen onBack={() => setScreen("home")} />;
      case "oauth":
        return <OAuthScreen onBack={() => setScreen("home")} />;
      case "encryption":
        return <EncryptionScreen onBack={() => setScreen("home")} />;
      default:
        return <HomeScreen onNavigate={setScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.inner}>{renderScreen()}</View>
    </SafeAreaView>
  );
}

// 🎨 Estilos globales
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117", // fondo oscuro elegante
  },
  inner: {
    flex: 1,
    padding: 10,
  },
});
