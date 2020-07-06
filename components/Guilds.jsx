import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Spinner } from "native-base";
import { useHistory } from "react-router-native";
import { getGuilds } from "../functions/albion-api";
import SearchLayout from "../layouts/SearchLayout";

export default function Guilds({guilds:[guilds,setGuilds],guildName:[guildName,setGuildName]}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handleChange = (text) => {
    setQuery(text);
  };

  const handlePress = (id,name) => {
    setGuildName(name)
    history.push(`guild/${id}`);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const result = await getGuilds(query);
    setGuilds(result);
    setLoading(false);
  };
  return (
    <SearchLayout>
      <View style={styles.searchContainer}>
        <TextInput onChangeText={handleChange} value={query} style={styles.textinput} placeholder="Enter a Guild Name"/>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Spinner color="red" />
      ) : (
        <ScrollView style={styles.guildList}>
          {guilds.map((guild) => (
            <TouchableOpacity onPress={() => handlePress(guild.id,guild.name)} style={styles.guild}>
              <Text>{guild.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SearchLayout>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent:'center'
  },
  textinput: {
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 1,
    width: 200,
    textAlign: "center",
    marginRight: 20,
  },
  button: {
    backgroundColor: "#FF5C00",
    borderWidth:2,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
  },
  buttonText: {
    color: "white",
  },
  guildList: {
    marginTop:15,
    marginBottom:15
  },
  guild: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    borderBottomWidth: 2,
    marginBottom: 15,
    paddingLeft:10,
  },
});
