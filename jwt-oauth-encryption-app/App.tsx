import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

// 🏠 Pantallas
import HomeScreen from "./app/screens/HomeScreen";
import JwtScreen from "./app/jwt/JwtScreen";
import OAuthScreen from "./app/oauth/OAuthScreen";
import EncryptionScreen from "./app/encryption/EncryptionScreen";
import AuthWithJwtScreen from "./app/jwt/AuthWithJwtScreen"; // ✅ nueva pantalla

export default function App() {
  const [screen, setScreen] = useState<
    "home" | "jwt" | "oauth" | "encryption" | "auth"
  >("home");

  const renderScreen = () => {
    switch (screen) {
      case "jwt":
        return <JwtScreen onBack={() => setScreen("home")} />;
      case "oauth":
        return <OAuthScreen onBack={() => setScreen("home")} />;
      case "encryption":
        return <EncryptionScreen onBack={() => setScreen("home")} />;
      case "auth":
        return <AuthWithJwtScreen onBack={() => setScreen("home")} />; // ✅ nuevo caso
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117",
  },
  inner: {
    flex: 1,
    padding: 10,
  },
});
