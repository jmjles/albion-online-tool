import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
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
          placeholder={Translate["enterItem"][lang]}
          autoFocus={true}
        />
      </View>
      <ScrollView style={styles.itemList}>
        {results.map((entry) => (
          <TouchableOpacity
            key={entry.uniName}
            style={styles.item}
            onPress={() => handlePress(entry.uniName, entry.displayName)}
          >
            <Image source={{uri:`https://render.albiononline.com/v1/item/${entry.uniName}.png?quality=1`}} style={{width:50,height:50}} />
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
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
  },
  itemList: {
    marginBottom: 15,
  },
  item: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
  },
});
