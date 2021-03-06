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
import Translate from "../functions/Translate";

export default function Guilds({
  guilds: [guilds, setGuilds],
  guildName: [guildName, setGuildName],
  lang: [lang, setLang],
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handleChange = (text) => {
    setQuery(text);
  };

  const handlePress = (id, name) => {
    setGuildName(name);
    history.push(`guild/${id}`);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const result = await getGuilds(query);
    setGuilds(result);
    setLoading(false);
  };
  return (
    <SearchLayout lang={lang} name="guild">
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={handleChange}
          value={query}
          style={styles.textinput}
          placeholder={Translate["enterGuild"][lang]}
          autoFocus={true}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>{Translate["submit"][lang]}</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Spinner color="red" />
        </View>
      ) : (
        <ScrollView style={styles.guildList}>
          {guilds.map((guild) => (
            <TouchableOpacity
              onPress={() => handlePress(guild.id, guild.name)}
              style={styles.guild}
              key={guild.name}
            >
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
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
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
    marginRight: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#FF5C00",
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  guildList: {
    marginTop: 15,
    marginBottom: 15,
  },
  guild: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    borderBottomWidth: 2,
    marginBottom: 15,
    paddingLeft: 10,
  },
});
