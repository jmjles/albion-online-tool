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
import Translate from "../functions/Translate.js";

export default function Player({ playerName: [playerName, setPlayerName], guildName:[guildName,setGuildName], lang:[lang, setLang]}) {
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
    <ItemLayout name={playerName} >
      {loading ? (
        <Spinner color="red" />
      ) : (
        <View style={styles.playerInfo}>
          {player.guildName && (
            <View style={styles.section}>
              <TouchableOpacity onPress={()=>handlePress(player.guildID,player.guildName)}>
                <Text>
                  {Translate['associate'][lang]}: {player.alliance && `[${player.alliance}]`}{" "}
                  {player.guildName}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.section}>
          <Text style={styles.title}>{Translate['combatStats'][lang]}</Text>
            {player.killFame && <Text>{Translate['kFame'][lang]}: {player.killFame}</Text>}
            {player.deathFame && <Text>{Translate['dFame'][lang]}: {player.deathFame}</Text>}
            {player.fameRatio && <Text>{Translate['fameRatio'][lang]}: {player.fameRatio}</Text>}
          </View>
          <View style={styles.section}>
          <Text style={styles.title}>{Translate['pveStats'][lang]}</Text>
            {player.royalFame && (
              <Text>{Translate['royalFame'][lang]}: {player.royalFame}</Text>
            )}
            {player.outlandsFame && (
              <Text>{Translate['outlandsFame'][lang]}: {player.outlandsFame}</Text>
            )}
            {player.hellgateFame && (
              <Text>{Translate['hellgateFame'][lang]}: {player.hellgateFame}</Text>
            )}
            {player.totalFame && <Text>{Translate['tFame'][lang]}: {player.totalFame}</Text>}
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
