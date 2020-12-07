import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const CurrencyShop = require("./models/CurrencyShop")(sequelize, DataTypes);
const Occupations = require("./models/Occupations")(sequelize, DataTypes);

require("./models/Users")(sequelize, DataTypes);
require("./models/UserItems")(sequelize, DataTypes);
require("./models/Blacklisted")(sequelize, DataTypes);
require("./models/BlackMarket")(sequelize, DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

try {
  (async function () {
    await sequelize.sync({ force });
    const upserts = [
      CurrencyShop.upsert({
        emoji: "🍵",
        name: "Tea",
        cost: 10,
        description: "Drink some tea. Green tea.",
        worth: "SMALL",
        type: "COLLECTABLE",
        edible: false,
      }),
      CurrencyShop.upsert({
        emoji: "☕",
        name: "Coffee",
        cost: 15,
        description: "Drink some coffee. No sugar included.",
        worth: "SMALL",
        type: "COLLECTABLE",
        edible: false,
      }),
      CurrencyShop.upsert({
        emoji: "🍰",
        name: "Cake",
        cost: 30,
        description: "Eat some cake for carbs.",
        worth: "SMALL",
        type: "USE_ONCE",
        edible: true,
      }),
      CurrencyShop.upsert({
        emoji: "🧲",
        name: "Magnet",
        cost: 200,
        description: "Find some coins with this heavy duty magnet.",
        worth: "MEDIUM",
        type: "USE_MANY",
        edible: false,
      }),
      CurrencyShop.upsert({
        emoji: "🕶",
        name: "Sunglasses",
        cost: 500,
        description: "Look nice and gain perks. Breaks easily, be careful.",
        worth: "MEDIUM",
        type: "USE_ONCE",
        edible: false,
      }),
      CurrencyShop.upsert({
        emoji: "🖥",
        name: "Computer",
        cost: 1000,
        description: "Post some dank memes and get ad revenue.",
        worth: "MEDIUM",
        type: "USE_MANY",
        edible: false,
      }),
      CurrencyShop.upsert({
        emoji: "🏆",
        name: "Trophy",
        cost: 10000,
        description: "What's the point of this again?",
        worth: "LARGE",
        type: "COLLECTABLE",
        edible: false,
      }),
      Occupations.upsert({
        name: "unemployed",
        min: 0,
        max: 0,
        scramble: null,
        words: null,
        level: 0,
      }),
      Occupations.upsert({
        name: "accountant",
        min: 30,
        max: 45,
        scramble: "numbers statistics mathematics calculate",
        words: "account number spreadsheet calculator data",
        level: 10,
      }),
      Occupations.upsert({
        name: "salesman",
        min: 35,
        max: 50,
        scramble: "soliciting marketing travel selling suitcase",
        words: "sales necktie stereotype annoying soliciting",
        level: 15,
      }),
      Occupations.upsert({
        name: "businessman",
        min: 50,
        max: 65,
        scramble: "business corporate company tired",
        words: "corporation group business stocks",
        level: 20,
      }),
      Occupations.upsert({
        name: "developer",
        min: 60,
        max: 75,
        scramble: "production errors develop typescript javascript python java",
        words: "error warning logs console terminal",
        level: 25,
      }),
      Occupations.upsert({
        name: "manager",
        min: 100,
        max: 125,
        scramble: "manage layoff moderate paperwork",
        words: "records manage work scream",
        level: 30,
      }),
      Occupations.upsert({
        name: "ceo",
        min: 175,
        max: 200,
        scramble: "stocks marketshare manage decide",
        words: "talk manage decisions moderate",
        level: 40,
      }),
      Occupations.upsert({
        name: "president",
        min: 225,
        max: 250,
        scramble: "speech treaty executive president election",
        words: "election vote laws veto press",
        level: 45,
      }),
    ];
    await Promise.all(upserts);
    console.log("Database synced");
    sequelize.close();
  })();
} catch (e) {
  console.error(e);
}
