import { DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return sequelize.define(
    "occupations",
    {
      name: {
        type: dataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      min: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      max: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      scramble: {
        type: dataTypes.STRING,
      },
      words: {
        type: dataTypes.STRING,
      },
      level: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
