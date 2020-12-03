import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const CurrencyShop = require("./models/CurrencyShop")(sequelize, DataTypes);

require("./models/Users")(sequelize, DataTypes);
require("./models/UserItems")(sequelize, DataTypes);
require("./models/Blacklisted")(sequelize, DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

try {
  (async function () {
    await sequelize.sync({ force });
    const shop = [
      CurrencyShop.upsert({
        emoji: "🍵",
        name: "Tea",
        cost: 10,
        description: "Drink some tea",
        worth: "SMALL",
        type: "COLLECTABLE",
      }),
      CurrencyShop.upsert({
        emoji: "☕",
        name: "Coffee",
        cost: 15,
        description: "Drink some coffee",
        worth: "SMALL",
        type: "COLLECTABLE",
      }),
      CurrencyShop.upsert({
        emoji: "🍰",
        name: "Cake",
        cost: 25,
        description: "Eat some cake",
        worth: "SMALL",
        type: "COLLECTABLE",
      }),
      CurrencyShop.upsert({
        emoji: "🧲",
        name: "Magnet",
        cost: 200,
        description: "Find some coins",
        worth: "MEDIUM",
        type: "USE_MANY",
      }),
    ];
    await Promise.all(shop);
    console.log("Database synced");
    sequelize.close();
  })();
} catch (e) {
  console.error(e);
}
