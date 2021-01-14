"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.levels = exports.Occupations = exports.BlackMarket = exports.Blacklisted = exports.UserItems = exports.CurrencyShop = exports.Users = exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite",
});
var Users = require("./models/Users")(exports.sequelize, sequelize_1.DataTypes);
exports.Users = Users;
var CurrencyShop = require("./models/CurrencyShop")(exports.sequelize, sequelize_1.DataTypes);
exports.CurrencyShop = CurrencyShop;
var UserItems = require("./models/UserItems")(exports.sequelize, sequelize_1.DataTypes);
exports.UserItems = UserItems;
var Blacklisted = require("./models/Blacklisted")(exports.sequelize, sequelize_1.DataTypes);
exports.Blacklisted = Blacklisted;
var BlackMarket = require("./models/BlackMarket")(exports.sequelize, sequelize_1.DataTypes);
exports.BlackMarket = BlackMarket;
var Occupations = require("./models/Occupations")(exports.sequelize, sequelize_1.DataTypes);
exports.Occupations = Occupations;
UserItems.belongsTo(CurrencyShop, { foreignKey: "item_id", as: "item" });
Users.prototype.income = function (amount) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            this.balance += Math.round(amount * this.multiplier);
            return [2 /*return*/, this.save()];
        });
    });
};
Users.prototype.kill = function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this.balance = 0;
                    return [4 /*yield*/, this.getItems()];
                case 1:
                    (_a.sent()).forEach(function (item) {
                        item.destroy();
                    });
                    this.save();
                    return [2 /*return*/];
            }
        });
    });
};
Users.prototype.addItem = function (item) {
    return __awaiter(this, void 0, void 0, function () {
        var userItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserItems.findOne({
                        where: { user_id: this.user_id, item_id: item.id },
                    })];
                case 1:
                    userItem = _a.sent();
                    if (userItem) {
                        userItem.amount += 1;
                        return [2 /*return*/, userItem.save()];
                    }
                    return [2 /*return*/, UserItems.create({
                            user_id: this.user_id,
                            item_id: item.id,
                            amount: 1,
                        })];
            }
        });
    });
};
Users.prototype.removeItem = function (item) {
    return __awaiter(this, void 0, void 0, function () {
        var userItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserItems.findOne({
                        where: { user_id: this.user_id, item_id: item.id },
                    })];
                case 1:
                    userItem = _a.sent();
                    userItem.amount -= 1;
                    return [2 /*return*/, userItem.save()];
            }
        });
    });
};
Users.prototype.getItems = function () {
    return UserItems.findAll({
        where: { user_id: this.user_id },
        include: ["item"],
    });
};
var levels = (function () {
    var Level = /** @class */ (function () {
        function Level(level, exp) {
            this.level = level;
            this.exp = exp;
        }
        return Level;
    }());
    var levels = [];
    for (var i = 0; i < 101; i++)
        levels.push(new Level(i, Math.round(Math.pow(i, 2) / 2) +
            levels.reduce(function (acc, cur) { return acc + cur.exp; }, 0) +
            100));
    return levels;
})();
exports.levels = levels;
