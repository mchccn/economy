import { DataTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const Users = require("./models/Users")(sequelize, DataTypes);
const CurrencyShop = require("./models/CurrencyShop")(sequelize, DataTypes);
const UserItems = require("./models/UserItems")(sequelize, DataTypes);
const Blacklisted = require("./models/Blacklisted")(sequelize, DataTypes);
const BlackMarket = require("./models/BlackMarket")(sequelize, DataTypes);
const Occupations = require("./models/Occupations")(sequelize, DataTypes);

UserItems.belongsTo(CurrencyShop, { foreignKey: "item_id", as: "item" });

Users.prototype.income = async function (amount: number) {
  this.balance += Math.round(amount * this.multiplier);
  return this.save();
};

Users.prototype.kill = async function () {
  this.balance = 0;
  (await this.getItems()).forEach((item: any) => {
    item.destroy();
  });
  this.save();
};

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

const levels = (function () {
  class Level {
    level: number;
    exp: number;
    constructor(level: number, exp: number) {
      this.level = level;
      this.exp = exp;
    }
  }

  const levels: Level[] = [];

  for (let i = 0; i < 101; i++)
    levels.push(
      new Level(
        i,
        Math.round(Math.pow(i, 2) / 2) +
          levels.reduce((acc, cur) => acc + cur.exp, 0) +
          100
      )
    );

  return levels;
})();

export {
  Users,
  CurrencyShop,
  UserItems,
  Blacklisted,
  BlackMarket,
  Occupations,
  levels,
};
