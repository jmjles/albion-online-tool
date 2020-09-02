import React from "react";
import { StyleSheet, Text } from "react-native";
import { Link } from "react-router-native";
import MainLayout from "../layouts/MainLayout";
import Translate from "../functions/Translate";
export default function Home({ lang: [lang, setLang] }) {
  return (
    <MainLayout>
      <Text style={styles.header}>{Translate["title"][lang]}</Text>
      <Link to="/market" style={styles.button}>
        <Text style={styles.buttonText}>{Translate["search"][lang]}</Text>
      </Link>
      <Link to="/options" style={styles.button}>
        <Text style={styles.buttonText}>{Translate["settings"][lang]}</Text>
      </Link>
      <Text style={styles.mark}>@JMJLES</Text>
    </MainLayout>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 48,
    textAlign: "center",
    marginTop: 58,
    marginBottom: 58,
  },
  button: {
    minWidth: 150,
    height: 50,
    borderStyle: "solid",
    borderColor: "black",
    backgroundColor: "#FF5C00",
    borderWidth: 2,
    marginBottom: 58,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    padding: 6,
  },
  mark: {
    position: "absolute",
    bottom: 0,
    right: 10,
  },
});
