const axios = require("axios");
const itemList = require("../assets/items.json");
const moment = require("moment");

const formatNum = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
//* Gold Lookup
module.exports.goldPriceLookup = async () => {
  const { data } = await axios.get(
    " https://www.albion-online-data.com/api/v2/stats/gold?count=5"
  );
  return data.map(
    (e) => `silver ${e.price} ${moment(e.timestamp).utc(true).fromNow()}\n`
  );
};

//* Product Name Lookup
module.exports.productName = (name, lang) => {
  let filtered = itemList.filter((item) => item.LocalizedNames);
  let regex = new RegExp("nontradable", "gi");
  filtered = filtered.filter(
    (item) => !item.LocalizationNameVariable.match(regex)
  );
  name = name.replace(".", " @");
  const query = name.split(" ");

  query.forEach((word) => {
    regex = new RegExp(word, "gi");
    filtered = filtered.filter(
      (item) =>
        item.LocalizedNames[lang].match(regex) ||
        item.LocalizationNameVariable.match(regex) ||
        item.UniqueName.match(regex)
    );
  });
  //! limit results to 20
  let result = [];
  if (filtered.length === 0) return result;

  for (let i = 0; i < filtered.length && i < 20; i++) {
    const name = filtered[i].LocalizedNames[lang];
    const uniName = filtered[i].UniqueName;
    const displayName = `${uniName[0] !== "T" ? "" : uniName.substring(0, 2)}${
      uniName.includes("@") ? `.${uniName.charAt(uniName.length - 1)}` : ``
    } ${name}`;

    result.push({
      name,
      uniName,
      displayName,
    });
  }
  return result;
};

//* Price Lookup
module.exports.priceLookup = async (name, quality) => {
  const { data } = await axios(
    `https://www.albion-online-data.com/api/v2/stats/prices/${name}?qualities=${quality}`
  );
  const img = `https://render.albiononline.com/v1/item/${name}.png?quality=${quality}`;

  const results = [];
  data.forEach((item) =>
    item.city.match(".*\\d.*")
      ? null
      : results.push({
          city: item.city,
          sellPrice: formatNum(item.sell_price_min),
          sellPriceDate: moment(item.sell_price_min_date).utc(true).fromNow(),
          buyPrice: formatNum(item.buy_price_max),
          buyPriceDate: moment(item.buy_price_min_date).utc(true).fromNow(),
        })
  );
  return {
    results,
    img,
  };
};

//* Player Search
module.exports.getPlayers = async (name) => {
  try {
    const {
      data: { players },
    } = await axios(
      `https://gameinfo.albiononline.com/api/gameinfo/search?q=${name}`
    );
    let result = [];
    players.map((player) =>
      result.push({
        name: player.Name,
        alliance: player.AllianceName,
        guild: player.GuildName,
        killfame: formatNum(player.KillFame),
        deathfame: formatNum(player.DeathFame),
        id: player.Id,
      })
    );
    result.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
    return result;
  } catch (er) {
    console.log(er);
    return [];
  }
};
//* Player lookup
module.exports.getPlayer = async (id) => {
  try {
    const { data } = await axios(
      `https://gameinfo.albiononline.com/api/gameinfo/players/${id}`
    );
    const result = {
      guildName: data.GuildName,
      alliance: data.AllianceName,
      guildID: data.GuildId,
      killFame: formatNum(data.KillFame),
      deathFame: formatNum(data.DeathFame),
      fameRatio: data.FameRatio,
      hellgateFame: formatNum(data.LifetimeStatistics.PvE.Hellgate),
      outlandsFame: formatNum(data.LifetimeStatistics.PvE.Outlands),
      royalFame: formatNum(data.LifetimeStatistics.PvE.Royal),
      totalFame: formatNum(data.LifetimeStatistics.PvE.Total),
    };

    return result;
  } catch (er) {
    console.log(er);
    return [];
  }
};
//* Guild Search
module.exports.getGuilds = async (name) => {
  try {
    const {
      data: { guilds },
    } = await axios(
      `https://gameinfo.albiononline.com/api/gameinfo/search?q=${name}`
    );
    let result = [];
    if (guilds.length === 0) return result;
    guilds.forEach((guild) => {
      result.push({
        name: guild.Name,
        id: guild.Id,
      });
    });

    return result;
  } catch (er) {
    console.log(er);
    return [];
  }
};

//* Guild Lookup
module.exports.getGuild = async (id) => {
  try {
    const { data } = await axios(
      `https://gameinfo.albiononline.com/api/gameinfo/guilds/${id}`
    );

    let result = [];

    if (data.length === 0) return result;
    return data;
  } catch (er) {
    console.log(er);
    return [];
  }
};

//* Guild Members
module.exports.getGuildMember = async (id) => {
  try {
    const { data } = await axios(
      `https://gameinfo.albiononline.com/api/gameinfo/guilds/${id}/members`
    );
    let members = data.map((player) => {
      return { name: player.Name, id: player.Id };
    });
    members.sort((a, b) => {
      a = a.name.toUpperCase();
      b = b.name.toUpperCase();
      return a > b;
    });
    return members;
  } catch (er) {
    console.log(er);
    return [];
  }
};

//* About Item
module.exports.aboutItem = (name, lang) => {
  try {
    const regex = new RegExp(name, "gi");
    const filtered = itemList.filter((item) => item.UniqueName.match(regex));

    if (filtered.length === 0) {
      return "";
    }

    const result = filtered[0];

    return result.LocalizedDescriptions[lang];
  } catch (er) {
    console.log(er);
    return "";
  }
};
