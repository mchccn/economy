import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return sequelize.define(
    "currency_shop",
    {
      emoji: {
        type: dataTypes.STRING,
        unique: true,
      },
      name: {
        type: dataTypes.STRING,
        unique: true,
      },
      cost: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
