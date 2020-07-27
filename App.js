import React, { useState } from "react";
import { NativeRouter as Router, Route, Switch } from "react-router-native";

import Home from "./components/Home";
import SafeLayout from "./layouts/SafeLayout";

import Guilds from "./components/Guilds";
import Guild from "./components/Guild";

import Players from "./components/Players";
import Player from './components/Player'

import Market from "./components/Market";
import ItemResult from "./components/ItemResult";
import Options from "./components/Options";
export default function App() {
  const [lang, setLang] = useState("EN-US");
  const [itemName, setItemName] = useState("");
  const [guilds, setGuilds] = useState([]);
  const [guildName, setGuildName] = useState([]);
  const [playerName, setPlayerName ] = useState('')
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
            path="/market"
            children={
              <Market setItemName={setItemName} lang={[lang, setLang]} />
            }
          />
          <Route
            path="/guild/:id"
            children={
              <Guild
                guilds={[guilds, setGuilds]}
                guildName={[guildName, setGuildName]}
              />
            }
          />
          <Route
            path="/guild"
            children={
              <Guilds
                guilds={[guilds, setGuilds]}
                guildName={[guildName, setGuildName]}
              />
            }
          />
          <Route
            path="/player/:id"
            children={
              <Player
                playerName={[playerName, setPlayerName]}
                guildName={[guildName, setGuildName]}
              />
            }
          />
          <Route
            path="/player"
            children={<Players playerName={[playerName, setPlayerName]} />}
          />
          <Route
            path='/options'
            children={
              <Options lang={[lang,setLang]}/>
            }
          />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </SafeLayout>
  );
}
