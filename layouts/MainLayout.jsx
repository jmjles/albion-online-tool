import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
export default function MainLayout(props) {
  return (
  <View style={styles.container}>
      {props.children}
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    flex:1,
    flexDirection: "column",
    alignItems: "center",
  },
});
