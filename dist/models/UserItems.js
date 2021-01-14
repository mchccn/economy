"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, dataTypes) {
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
