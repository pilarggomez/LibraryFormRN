import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SimpleReport from "./src/components/SimpleReport";
import FullReport from "./src/components/FullReport";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejemplos PDF Biblioteca</Text>

      <SimpleReport />

      <View style={{ height: 12 }} />

      <FullReport />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});
