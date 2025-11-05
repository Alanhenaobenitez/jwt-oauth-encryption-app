import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Card({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0d1117",
    borderWidth: 1,
    borderColor: "#30363d",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
  },
  title: {
    color: "#79c0ff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    color: "#c9d1d9",
  },
});
