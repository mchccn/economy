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

const force = process.argv.includes("--force") || process.argv.includes("-f");

try {
  (async function () {
    await sequelize.sync({ force });
    const shop = [
      CurrencyShop.upsert({
        emoji: "🍵",
        name: "Tea",
        cost: 5,
        description: "Drink some tea",
      }),
      CurrencyShop.upsert({
        emoji: "☕",
        name: "Coffee",
        cost: 10,
        description: "Drink some coffee",
      }),
      CurrencyShop.upsert({
        emoji: "🍰",
        name: "Cake",
        cost: 20,
        description: "Eat some cake",
      }),
    ];
    await Promise.all(shop);
    console.log("Database synced");
    sequelize.close();
  })();
} catch (e) {
  console.error(e);
}
