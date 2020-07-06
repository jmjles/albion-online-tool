import React from "react";
import { StyleSheet,View, StatusBar, Platform } from "react-native";
export default function SafeLayout(props) {
  return <View style={styles.container}>{props.children}</View>;
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
