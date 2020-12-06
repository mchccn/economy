import { DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return sequelize.define("blackmarket", {
    user_id: {
      type: dataTypes.STRING,
      primaryKey: true,
    },
    price: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    offer: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
    },
  });
};
