import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function LoggedInScreen({
  user,
  onLogout,
}: {
  user: any;
  onLogout: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Sesión iniciada correctamente</Text>

      <Image source={{ uri: user.picture }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#58a6ff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  name: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  email: { color: "#c9d1d9", marginBottom: 20 },
  logoutBtn: {
    backgroundColor: "#c93c37",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
});
