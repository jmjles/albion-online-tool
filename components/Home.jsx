import React from "react";
import { StyleSheet, Text } from "react-native";
import { Link } from "react-router-native";
import MainLayout from '../layouts/MainLayout'
export default function Home() {
  return (
    <MainLayout>
      <Text style={styles.header}>Albion Online Tool</Text>
      <Link to="/market" style={styles.button}>
        <Text style={styles.buttonText}>Market</Text>
      </Link>
      <Link to="/guild" style={styles.button}>
        <Text style={styles.buttonText}>Guilds</Text>
      </Link>
      <Link to="/player" style={styles.button}>
        <Text style={styles.buttonText}>Players</Text>
      </Link>
      <Link to="/options" style={styles.button}>
        <Text style={styles.buttonText}>Options</Text>
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
    width: 150,
    height: 50,
    borderStyle: "solid",
    borderColor: "black",
    backgroundColor: "#FF5C00",
    borderWidth: 2,
    marginBottom: 58,
    alignItems:'center',
  },
  buttonText: {
    fontSize: 24,
    color:'white',
    padding:6
  },
  mark: {
    position:'absolute',
    bottom:0,
    right:10
  },
});
