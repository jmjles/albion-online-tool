import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useHistory } from "react-router-native";
import { productName } from "../functions/albion-api";
import SearchLayout from "../layouts/SearchLayout";
import Translate from "../functions/Translate";

export default function Market({ setItemName, lang: [lang, setLang] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const history = useHistory();
  const handleChange = (text) => {
    setQuery(text);
    const name = productName(text, lang);
    if (text === "") setResults([]);
    else setResults(name);
  };
  const handlePress = (uniName, name) => {
    setItemName(name);
    history.push(`market/${uniName}`);
  };
  return (
    <SearchLayout lang={lang}>
      <View style={styles.container}>
        <TextInput
          onChangeText={handleChange}
          style={styles.textinput}
          value={query}
          placeholder={Translate['enterItem'][lang]}
        />
      </View>
      <ScrollView style={styles.itemList}>
        {results.map((entry) => (
          <TouchableOpacity
            key={entry.uniName}
            style={styles.item}
            onPress={() => handlePress(entry.uniName, entry.displayName)}
          >
            <Text style={styles.itemText}>{entry.displayName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SearchLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  textinput: {
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 1,
    width: 200,
    textAlign:'center'
  },
  itemList: {
    marginBottom:15
  },
  item: {
    paddingTop: 5,
    paddingLeft:10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    marginBottom: 15,
  },
  itemText:{
    fontSize: 18,
  }
});
