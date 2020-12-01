import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return sequelize.define(
    "users",
    {
      user_id: {
        type: dataTypes.STRING,
        primaryKey: true,
      },
      balance: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      bank: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      max_bank: {
        type: dataTypes.INTEGER,
        defaultValue: 250,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
