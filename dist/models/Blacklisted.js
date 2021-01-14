"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, dataTypes) {
    return sequelize.define("blacklisted", {
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
    });
};
