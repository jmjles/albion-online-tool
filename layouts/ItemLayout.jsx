import React from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { useHistory } from "react-router-native";
import { Icon } from "native-base";
export default function ItemLayout(props) {
  const past = useHistory();
  const handlePress = () => past.goBack();
  let name = props.name

  BackHandler.addEventListener('hardwareBackPress',()=> {
    past.goBack()
    return true
  })
  return (
    <View style={styles.root}>
      <Icon
        type="FontAwesome"
        name="arrow-circle-left"
        onPress={handlePress}
        style={{color:'#FF5C00',fontSize:28}}
      />
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
      </View>
      {props.children}
    </View>
  );
}
const styles = StyleSheet.create({
  root:{
    width:'90%',
    marginLeft:'auto',
    marginRight:'auto',
    flex:1,
    },
  container: {
    marginBottom: 20,
    flexDirection:'row',
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    flex:1,
    textTransform: "capitalize",
  }
});
