import { DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return sequelize.define(
    "blacklisted",
    {
      user_id: {
        type: dataTypes.STRING,
        primaryKey: true,
      },
      reason: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      notified: {
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
