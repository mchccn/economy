"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, dataTypes) {
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
