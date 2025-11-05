import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: "#0d1117",
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  text: {
    color: "#58a6ff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
