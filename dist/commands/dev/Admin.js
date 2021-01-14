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
var sequelize_1 = require("sequelize");
var Command_1 = require("../../Command");
var dbObjects_1 = require("../../dbObjects");
exports.default = {
    name: "admin",
    aliases: ["administrator", "sudo", "superuserdo"],
    args: true,
    usage: "<command> <args>",
    category: Command_1.Category.DEV,
    description: "Execute admin commands",
    cooldown: 0,
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, amount, item_1, userItem, _b, bal, bank, max_bank, totalItems, level;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, dbObjects_1.Users.findOne({
                            where: {
                                user_id: message.author.id,
                            },
                        })];
                    case 1:
                        user = _d.sent();
                        _a = args[0];
                        switch (_a) {
                            case "give": return [3 /*break*/, 2];
                            case "clear": return [3 /*break*/, 9];
                            case "delete": return [3 /*break*/, 19];
                            case "exp": return [3 /*break*/, 20];
                        }
                        return [3 /*break*/, 21];
                    case 2:
                        amount = parseInt(args[1]);
                        if (!!args[2]) return [3 /*break*/, 3];
                        user.increment("balance", {
                            by: amount,
                        });
                        user.save();
                        return [2 /*return*/, message.channel.send("```economy: give: given " + amount + " coins to " + message.author.username + "```")];
                    case 3: return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                            where: { name: (_c = {}, _c[sequelize_1.Op.like] = args[2], _c) },
                        })];
                    case 4:
                        item_1 = _d.sent();
                        if (!item_1)
                            return [2 /*return*/, message.channel.send("```economy: give: could not find item " + args[1] + "```")];
                        return [4 /*yield*/, user.getItems()];
                    case 5:
                        userItem = (_d.sent()).find(function (i) { return i.dataValues.item.name === item_1.name; });
                        if (!!userItem) return [3 /*break*/, 7];
                        return [4 /*yield*/, user.addItem(item_1)];
                    case 6:
                        userItem = _d.sent();
                        userItem.increment("amount", {
                            by: amount - 1,
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        userItem.increment("amount", {
                            by: amount,
                        });
                        _d.label = 8;
                    case 8:
                        user.save();
                        userItem.save();
                        return [2 /*return*/, message.channel.send("```economy: give: given " + amount + " items to " + message.author.username + "```")];
                    case 9:
                        _b = args[1];
                        switch (_b) {
                            case "bal": return [3 /*break*/, 10];
                            case "bank": return [3 /*break*/, 11];
                            case "max_bank": return [3 /*break*/, 12];
                            case "inv": return [3 /*break*/, 13];
                            case "level": return [3 /*break*/, 16];
                            case "kill": return [3 /*break*/, 17];
                        }
                        return [3 /*break*/, 18];
                    case 10:
                        bal = user.balance;
                        user.balance = 0;
                        user.save();
                        return [2 /*return*/, message.channel.send("```economy: clear: bal: cleared " + bal + " coins```")];
                    case 11:
                        bank = user.bank;
                        user.bank = 0;
                        user.save();
                        return [2 /*return*/, message.channel.send("```economy: clear: bank: cleared " + bank + " coins```")];
                    case 12:
                        max_bank = user.max_bank;
                        if (user.bank > 250)
                            user.bank = 250;
                        user.max_bank = 250;
                        user.save();
                        return [2 /*return*/, message.channel.send("```economy: clear: max_bank: cleared " + max_bank + " coins```")];
                    case 13: return [4 /*yield*/, user.getItems()];
                    case 14:
                        totalItems = (_d.sent()).reduce(function (acc, cur) { return acc + cur.dataValues.amount; }, 0) || 0;
                        return [4 /*yield*/, user.getItems()];
                    case 15:
                        (_d.sent()).forEach(function (item) {
                            item.destroy();
                        });
                        return [2 /*return*/, message.channel.send("```economy: clear: inv: cleared " + totalItems + " items```")];
                    case 16:
                        level = user.level;
                        user.level = 0;
                        user.exp = 0;
                        user.save();
                        return [2 /*return*/, message.channel.send("```economy: clear: level: cleared " + level + " levels```")];
                    case 17:
                        user.kill();
                        return [2 /*return*/, message.channel.send("```economy: clear: kill: cleared everything```")];
                    case 18: return [2 /*return*/, message.channel.send("```economy: clear: " + args[1] + ": command not found```")];
                    case 19:
                        user.destroy();
                        return [2 /*return*/, message.channel.send("```economy: delete: deleted user " + message.author.id + "```")];
                    case 20:
                        user.exp += parseInt(args[1]) || 100;
                        user.save();
                        return [2 /*return*/, message.channel.send("```economy: exp: gave " + (parseInt(args[1]) || 100) + " exp to user " + message.author.id + "```")];
                    case 21: return [2 /*return*/, message.channel.send("```economy: " + args[0] + ": command not found```")];
                }
            });
        });
    },
};
