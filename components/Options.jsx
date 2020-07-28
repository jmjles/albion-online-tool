import React from "react";
import { StyleSheet, Text } from "react-native";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-native";
import { Picker } from "native-base";
import translate from '../functions/Translate.js'

export default function Options({ lang: [lang, setLang] }) {
  const languages = [
    { name: "English", value: "EN-US" },
    { name: "Deutsche", value: "DE-DE" },
    { name: "Français", value: "FR-FR" },
    { name: "русский", value: "RU-RU" },
    { name: "Polskie", value: "PL-PL" },
    { name: "Español", value: "ES-ES" },
    { name: "Português", value: "PT-BR" },
    { name: "中文", value: "ZH-CN" },
    { name: "한국어", value: "KO-KR" },
  ];
  const handleLang = (val) => setLang(val);
  return (
    <MainLayout>
      <Text style={styles.header}>{translate["settings"][lang]}</Text>
      <Picker
        selectedValue={lang}
        onValueChange={handleLang}
        mode="dropdown"
        style={styles.picker}
      >
        {languages.map((language) => (
          <Picker.Item
            key={language.value}
            value={language.value}
            label={language.name}
          />
        ))}
      </Picker>
      <Link style={styles.button} to="/">
        <Text style={styles.buttonText}>{translate["back"][lang]}</Text>
      </Link>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 48,
    textAlign: "center",
    marginTop: 58,
    marginBottom: 118,
  },
  picker: {
    minWidth: 170,
  },
  button: {
    minWidth: 150,
    width: 150,
    height: 50,
    borderStyle: "solid",
    borderColor: "black",
    backgroundColor: "#FF5C00",
    borderWidth: 2,
    marginBottom: 58,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    padding: 6,
  },
  mark: {
    position: "absolute",
    bottom: 0,
    right: 10,
  },
});
