import React from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { useHistory, Link } from "react-router-native";
import { Icon } from "native-base";
import Translate from "../functions/Translate";
export default function SearchLayout(props) {
  const past = useHistory();
  const { lang, name } = props;

  BackHandler.addEventListener("hardwareBackPress", () => {
    past.push("/");
    return true;
  });

  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <Text style={styles.app}>
          {Translate[name][lang]} {Translate["search"][lang]}
        </Text>
        <Link to="/options">
          <Icon
            type="FontAwesome"
            name="cog"
            style={{ fontSize: 28, color: "#fff" }}
          />
        </Link>
      </View>
      {props.children}
      <View style={styles.bottomContainer}>
        <Link
          style={name === "market" ? styles.activeButton : styles.button}
          to="/market"
        >
          <Text
            style={name === "market" ? styles.activeText : styles.buttonText}
          >
            {Translate["market"][lang]}
          </Text>
        </Link>
        <Link
          style={name === "guild" ? styles.activeButton : styles.button}
          to="/guild"
        >
          <Text
            style={name === "guild" ? styles.activeText : styles.buttonText}
          >
            {Translate["guilds"][lang]}
          </Text>
        </Link>
        <Link
          style={name === "player" ? styles.activeButton : styles.button}
          to="/player"
        >
          <Text
            style={name === "player" ? styles.activeText : styles.buttonText}
          >
            {Translate["player"][lang]}
          </Text>
        </Link>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flex: 1,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5C00",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    borderColor: "#FF5C00",
    borderTopWidth: 2,
    width: "100%",
  },
  activeButton: {
    backgroundColor: "#FF5C00",
    padding: 10,
    flexBasis: "33%",
    flexGrow: 1,
  },
  activeText: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
  },
  button: {
    padding: 10,
    flexBasis: "33%",
    flexGrow: 1,
  },
  buttonText: {
    fontSize: 22,
    textAlign: "center",
  },
  app: {
    fontSize: 22,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    marginBottom: 20,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  title: {
    textAlign: "center",
    fontSize: 28,
    textTransform: "capitalize",
  },
});
