import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const Users = require("./models/Users")(sequelize, DataTypes);
const CurrencyShop = require("./models/CurrencyShop")(sequelize, DataTypes);
const UserItems = require("./models/UserItems")(sequelize, DataTypes);

UserItems.belongsTo(CurrencyShop, { foreignKey: "item_id", as: "item" });

Users.prototype.addItem = async function (item: any) {
  const userItem = await UserItems.findOne({
    where: { user_id: this.user_id, item_id: item.id },
  });

  if (userItem) {
    userItem.amount += 1;
    return userItem.save();
  }

  return UserItems.create({
    user_id: this.user_id,
    item_id: item.id,
    amount: 1,
  });
};

Users.prototype.removeItem = async function (item: any) {
  const userItem = await UserItems.findOne({
    where: { user_id: this.user_id, item_id: item.id },
  });

  userItem.amount -= 1;
  return userItem.save();
};

Users.prototype.getItems = function () {
  return UserItems.findAll({
    where: { user_id: this.user_id },
    include: ["item"],
  });
};

module.exports = { Users, CurrencyShop, UserItems };
