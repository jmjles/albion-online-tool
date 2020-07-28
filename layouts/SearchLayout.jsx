import React from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { useHistory,useLocation,} from "react-router-native";
import {Icon} from 'native-base'
import Translate from '../functions/Translate'
export default function SearchLayout(props) {
  const past = useHistory();
  const handlePress = () => past.goBack();
  let name = useLocation().pathname.replace('/',"")
  const lang = props.lang
   BackHandler.addEventListener("hardwareBackPress", () => {
     past.goBack();
     return true;
   });
  return (
    <View style={styles.root}>
      <Icon
        type="FontAwesome"
        name="arrow-circle-left"
        onPress={handlePress}
        style={{ color: "#FF5C00", fontSize: 28 }}
      />
      <View style={styles.container}>
  <Text style={styles.title}>{Translate[name][lang]} {Translate['search'][lang]}</Text>
      </View>
      {props.children}
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    flex:1
  },
  container: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    textTransform: "capitalize",
  },
});
