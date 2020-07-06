import React, { useState, useEffect } from "react";
import { useParams } from "react-router-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useHistory } from "react-router-native";
import { getPlayer } from "../functions/albion-api.js";
import ItemLayout from "../layouts/ItemLayout";
import { Spinner } from "native-base";

export default function Player({ playerName: [playerName, setPlayerName], guildName:[guildName,setGuildName]}) {
  const id = useParams().id;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState({});
  useEffect(() => {
    (async () => {
      setLoading(true);
      let result = await getPlayer(id);
      setPlayer(result);
      setLoading(false);
    })();
  }, []);

  const handlePress = (id, name) => {
    setGuildName(name)
    history.push(`/guild/${id}`);
  };
  return (
    <ItemLayout name={playerName}>
      {loading ? (
        <Spinner color="red" />
      ) : (
        <View style={styles.playerInfo}>
          {player.guildName && (
            <View style={styles.section}>
              <TouchableOpacity onPress={()=>handlePress(player.guildID,player.guildName)}>
                <Text>
                  Associate of: {player.alliance && `[${player.alliance}]`}{" "}
                  {player.guildName}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.section}>
            <Text style={styles.title}>Combat Stats</Text>
            {player.killFame && <Text>Kill Fame: {player.killFame}</Text>}
            {player.deathFame && <Text>Death Fame: {player.deathFame}</Text>}
            {player.fameRatio && <Text>Fame Ratio: {player.fameRatio}</Text>}
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>PvE Stats</Text>
            {player.royalFame && (
              <Text>Royal Cont. Fame: {player.killFame}</Text>
            )}
            {player.outlandsFame && (
              <Text>Outlands Cont. Fame: {player.killFame}</Text>
            )}
            {player.hellgateFame && (
              <Text>Hellgate Fame: {player.killFame}</Text>
            )}
            {player.totalFame && <Text>Total Fame: {player.killFame}</Text>}
          </View>
        </View>
      )}
    </ItemLayout>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  section: {
    marginBottom: 15,
  },
});
