import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Spinner } from 'native-base'
import { getPlayers } from "../functions/albion-api";
import SearchLayout from "../layouts/SearchLayout";
import { useHistory } from "react-router-native";
export default function Players({playerName:[playerName,setPlayerName]}) {
  const [query, setQuery] = useState("");
  const [loading,setLoading] =useState(false)
  const [players,setPlayers] = useState([])

  const history = useHistory()
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
    setPlayerName(name)
    history.push(`/player/${id}`);
  };

  return (
    <SearchLayout>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={handleChange}
          value={query}
          style={styles.textinput}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Spinner color="red" />
      ) : (
        <ScrollView style={styles.playerList}>
          {players.map((player) => (
            <TouchableOpacity
              onPress={() => handlePress(player.id, player.name)}
              style={styles.player}
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
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    color: "white",
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
