import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity as Button,
} from "react-native";
import MainLayout from "../layouts/MainLayout";
import { Link, useHistory } from "react-router-native";
import { Picker } from "native-base";
import translate from "../functions/Translate.js";

export default function Options({ lang: [lang, setLang] }) {
  const history = useHistory();
  const handlePast = () => history.goBack();
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
      <View style={styles.pContainer}>
        <Text style={styles.pickerLabel}>{translate["language"][lang]}:</Text>
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
      </View>
      <Button style={styles.button} onPress={handlePast}>
        <Text style={styles.buttonText}>{translate["back"][lang]}</Text>
      </Button>
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
  pickerLabel: {
    fontSize: 24,
  },
  picker: {
    maxWidth: 170,
    marginLeft: 10,
  },
  pContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 58,
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
