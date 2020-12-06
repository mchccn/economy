import { DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return sequelize.define("user_item", {
    user_id: dataTypes.STRING,
    item_id: dataTypes.STRING,
    amount: {
      type: dataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
