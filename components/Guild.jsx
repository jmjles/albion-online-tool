import React, { useState, useEffect } from "react";
import { useParams } from "react-router-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Picker,
  TouchableOpacity,
} from "react-native";
import { useHistory } from "react-router-native";
import { getGuild, getGuildMember } from "../functions/albion-api.js";
import ItemLayout from "../layouts/ItemLayout";
import { Spinner } from "native-base";

export default function ItemResult({
  guilds: [guilds, setGuilds],
  guildName: [guildName, setGuildName],
}) {
  const id = useParams().id;
  const history = useHistory();
  const [guild, setGuild] = useState({});
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      let result = await getGuild(id);
      result = {
        tag: result.AllianceTag,
        tagID: result.AllianceId,
        founded: result.Founded,
        founderID: result.FounderId,
        founderName: result.FounderName,
        memberCount: result.MemberCount,
      };
      setGuild(result);
      setLoading(false);
      setLoading2(true);
      result = await getGuildMember(id);
      setMembers(result);
      setLoading2(false);
    })();
  }, []);

  const handleChange = (id) => {
    const selected = guilds.find((guild) => guild.id == id);
    setGuildName(selected.name);
    history.push(`/guild/${id}`);
  };

  const handlePress = (id,name)=>{
    history.push(`/player/${id}`)
  }
  return (
    <ItemLayout name={guildName}>
      {loading ? (
        <Spinner color="red" />
      ) : (
        <View>
          <View style={styles.related}>
            <Text style={styles.label}>Related Guilds:</Text>
            <Picker mode="dropdown" onValueChange={handleChange} style={styles.picker}>
              {guilds.map((guild) => (
                <Picker.Item
                  label={guild.name}
                  value={guild.id}
                  key={guild.id}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.guildInfo}>
            <Text>{guild.tag && `Alliance Tag: ${guild.tag}`}</Text>
            <Text>{guild.founderName && `Founder: ${guild.founderName}`}</Text>
            <Text>
              {guild.memberCount && `Member Count: ${guild.memberCount}`}
            </Text>
          </View>
          <Text style={styles.title}>Members:</Text>
          {loading2 ? (
            <Spinner color="red" />
          ) : (
            <ScrollView style={styles.members}>
              {members.map((member) => (
                <TouchableOpacity style={styles.member} onPress={()=>handlePress(member.id,member.name)}>
                  <Text style={styles.memberText}>{member.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </ItemLayout>
  );
}
const styles = StyleSheet.create({
    related:{
        flexDirection:'row',
    },
    label:{
        lineHeight:43
    },
    picker:{
        minWidth:270
    },
  guildInfo: {},
  members: {
      marginTop:15,
      marginBottom:15,
      maxHeight:500
  },
  member: {
    marginBottom: 10,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  memberText: {
    fontSize: 16,
  },
});
