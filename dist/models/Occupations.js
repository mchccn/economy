"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, dataTypes) {
    return sequelize.define("occupations", {
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
    }, {
        timestamps: false,
    });
};
