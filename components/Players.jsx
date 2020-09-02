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
import { getPlayers } from "../functions/albion-api";
import SearchLayout from "../layouts/SearchLayout";
import { useHistory } from "react-router-native";
import Translate from "../functions/Translate";
export default function Players({
  playerName: [playerName, setPlayerName],
  lang: [lang, setLang],
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  const history = useHistory();
  const handleChange = (text) => {
    setQuery(text);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const result = await getPlayers(query);
    setPlayers(result);
    setLoading(false);
  };

  const handlePress = (id, name) => {
    setPlayerName(name);
    history.push(`/player/${id}`);
  };

  return (
    <SearchLayout lang={lang}>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={handleChange}
          value={query}
          style={styles.textinput}
          placeholder={Translate["enterPlayer"][lang]}
          autoFocus={true}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Spinner color="red" />
        </View>
      ) : (
        <ScrollView style={styles.playerList}>
          {players.map((player) => (
            <TouchableOpacity
              onPress={() => handlePress(player.id, player.name)}
              style={styles.player}
              key={player.id}
            >
              <Text>{player.name}</Text>
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
  playerList: {
    marginTop: 15,
    marginBottom: 15,
  },
  player: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    borderBottomWidth: 2,
    marginBottom: 15,
    paddingLeft: 10,
  },
});
