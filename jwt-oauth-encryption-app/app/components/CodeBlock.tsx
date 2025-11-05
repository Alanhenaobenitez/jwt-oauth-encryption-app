import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function CodeBlock({ code }: { code: string }) {
  return (
    <ScrollView horizontal style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.text}>{code}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0d1117",
    borderRadius: 8,
    marginVertical: 8,
  },
  inner: {
    padding: 10,
  },
  text: {
    color: "#c9d1d9",
    fontFamily: "monospace",
    fontSize: 12,
  },
});
