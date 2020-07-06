import React, { useState, useEffect } from "react";
import { useParams } from "react-router-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Picker,
  Image
} from "react-native";
import { priceLookup,aboutItem } from "../functions/albion-api.js";
import ItemLayout from "../layouts/ItemLayout";

export default function ItemResult({ itemName: [itemName, setItemName] , lang:[lang,setLang]}) {
  const [quailtiy, setQuaility] = useState(1);
  const [prices, setPrices] = useState([]);
  const [img, setImg] = useState("");
  const [desc,setDesc] = useState('')
  const uniName = useParams().id;
  useEffect(() => {
    const getItem = async () => {
      const result = await priceLookup(uniName, quailtiy);
      setDesc(aboutItem(uniName,lang))
      setPrices(result.results);
      setImg(result.img);
      console.log(img)
    };
    getItem();
  }, [quailtiy]);

  const qualities = [
    { name: "Normal", value: 1 },
    { name: "Good", value: 2 },
    { name: "Outstanding", value: 3 },
    { name: "Excellent", value: 4 },
    { name: "Masterpeace", value: 5 },
  ];
  const handleQuality = (val) => {
    setQuaility(val);
  };
  return (
    <ItemLayout name={itemName}>
      <View style={styles.aboutContainer}>
        <Image source={{ uri: img }} style={styles.img} />
        <Text style={styles.desc}>{desc}</Text>
      </View>

      <View style={styles.quailtiyContainer}>
        <Text style={styles.label}>Quality:</Text>
        <Picker
          selectedValue={quailtiy}
          onValueChange={handleQuality}
          mode="dropdown"
          style={styles.picker}
        >
          {qualities.map((qual) => (
            <Picker.Item
              label={qual.name}
              value={qual.value}
              key={qual.value}
            />
          ))}
        </Picker>
      </View>

      <ScrollView style={styles.itemList}>
        {prices.map((item) => (
          <View style={styles.item}>
            <Text key={item.city} style={styles.itemTitle}>
              {item.city}
            </Text>
            {item.sellPrice == 0 ? (
              <Text style={styles.itemText}>Sell Price: N/A</Text>
            ) : (
              <Text style={styles.itemText}>
                Sell Price: {item.sellPrice} | {item.sellPriceDate}
              </Text>
            )}
            {item.buyPrice == 0 ? (
              <Text style={styles.itemText}>Buy Price: N/A</Text>
            ) : (
              <Text style={styles.itemText}>
                Buy Price: {item.buyPrice} | {item.buyPriceDate}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </ItemLayout>
  );
}
const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 24,
  },
  itemText: {
    fontSize: 16,
  },
  item: {
    marginBottom: 10,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingBottom:10
  },
  desc: {
    flex: 1,
  },
  aboutContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  quailtiyContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  label: {
    lineHeight: 43,
    textAlign: "center",
  },
  picker: {
    minWidth: 170,
  },
  img: {
    width: 100,
    height: 100,
    margin: 0,
  },
  itemList: {
    marginBottom: 15,
  },
});