import React, { useState, useEffect } from "react";
import { NativeRouter as Router, Route, Switch } from "react-router-native";
import AsyncStorage from "@react-native-community/async-storage";

import Home from "./components/Home";
import SafeLayout from "./layouts/SafeLayout";

import Guilds from "./components/Guilds";
import Guild from "./components/Guild";

import Players from "./components/Players";
import Player from "./components/Player";

import Market from "./components/Market";
import ItemResult from "./components/ItemResult";
import Options from "./components/Options";

export default function App() {
  const [lang, setLang] = useState("EN-US");

  useEffect(() => {
    const getLang = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("lang");
        if (savedLang !== null) setLang(savedLang);
      } catch {}
    };
    getLang();
  }, []);

  useEffect(() => {
    const saveLang = async () => {
      try {
        await AsyncStorage.setItem("lang", lang);
      } catch {}
    };
    saveLang();
  }, [lang]);

  const [itemName, setItemName] = useState("");
  const [guilds, setGuilds] = useState([]);
  const [guildName, setGuildName] = useState([]);
  const [playerName, setPlayerName] = useState("");

  return (
    <SafeLayout>
      <Router>
        <Switch>
          <Route
            path="/market/:id"
            children={
              <ItemResult
                itemName={[itemName, setItemName]}
                lang={[lang, setLang]}
              />
            }
          />

          <Route
            path="/guild/:id"
            children={
              <Guild
                guilds={[guilds, setGuilds]}
                guildName={[guildName, setGuildName]}
                playerName={[playerName, setPlayerName]}
                lang={[lang, setLang]}
              />
            }
          />
          <Route
            path="/guild"
            children={
              <Guilds
                guilds={[guilds, setGuilds]}
                guildName={[guildName, setGuildName]}
                lang={[lang, setLang]}
              />
            }
          />
          <Route
            path="/player/:id"
            children={
              <Player
                playerName={[playerName, setPlayerName]}
                guildName={[guildName, setGuildName]}
                lang={[lang, setLang]}
              />
            }
          />
          <Route
            path="/player"
            children={
              <Players
                playerName={[playerName, setPlayerName]}
                lang={[lang, setLang]}
              />
            }
          />
          <Route
            path="/options"
            children={<Options lang={[lang, setLang]} />}
          />
          <Route
            path="/"
            children={
              <Market setItemName={setItemName} lang={[lang, setLang]} />
            }
          />
        </Switch>
      </Router>
    </SafeLayout>
  );
}
