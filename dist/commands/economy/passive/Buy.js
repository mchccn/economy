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
var discord_js_1 = require("discord.js");
var sequelize_1 = require("sequelize");
var Command_1 = require("../../../Command");
var dbObjects_1 = require("../../../dbObjects");
exports.default = {
    name: "buy",
    aliases: ["purchase"],
    args: true,
    usage: "<item> [amount]",
    category: Command_1.Category.ECONOMY,
    description: "Buy an item, or items",
    cooldown: 5,
    execute: function (message, args, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var item, user, amount, totalCost, i;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                            where: { name: (_b = {}, _b[sequelize_1.Op.like] = args[0], _b) },
                        })];
                    case 1:
                        item = _c.sent();
                        return [4 /*yield*/, dbObjects_1.Users.findOne({ where: { user_id: message.author.id } })];
                    case 2:
                        user = _c.sent();
                        if (!item) {
                            message.channel.send("That item doesn't exist.");
                            return [2 /*return*/, "invalid"];
                        }
                        amount = parseInt(args[1]) || 1;
                        if (amount <= 0) {
                            message.channel.send("Invalid amount of items to purchase!");
                            return [2 /*return*/, "invalid"];
                        }
                        if (["all", "max"].includes(args[1]))
                            if (user.balance % item.cost === 0)
                                amount = user.balance / item.cost;
                            else
                                amount = Math.floor(user.balance / item.cost);
                        totalCost = item.cost * amount;
                        //@ts-ignore
                        if (totalCost > user.balance) {
                            message.channel.send(
                            //@ts-ignore
                            "You currently have " + user.balance + " coins, but the you need " + totalCost + " coins to buy " + amount + "!");
                            return [2 /*return*/, "invalid"];
                        }
                        //@ts-ignore
                        user.decrement("balance", {
                            by: totalCost,
                        });
                        user.save();
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < amount)) return [3 /*break*/, 6];
                        return [4 /*yield*/, user.addItem(item)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        message.channel.send(new discord_js_1.MessageEmbed()
                            .setTitle("Thank you for shopping!")
                            .setDescription("code: " + Math.random().toString().slice(2))
                            .addField("Item bought", item.name)
                            .addField("Amount bought", amount)
                            .addField("Total cost", item.cost * amount)
                            .setColor("RANDOM")
                            .setFooter((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag)
                            .setTimestamp(message.createdAt));
                        return [2 /*return*/];
                }
            });
        });
    },
};
