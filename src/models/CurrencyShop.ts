import { DataTypes, Sequelize } from "sequelize";

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
      worth: {
        type: dataTypes.ENUM("SMALL", "MEDIUM", "LARGE"),
        allowNull: false,
        defaultValue: "SMALL",
      },
      type: {
        type: dataTypes.ENUM("COLLECTABLE", "USE_ONCE", "USE_MANY"),
        allowNull: false,
        defaultValue: "COLLECTABLE",
      },
      edible: {
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
