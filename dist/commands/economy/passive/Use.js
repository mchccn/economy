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
var Command_1 = require("../../../Command");
var dbObjects_1 = require("../../../dbObjects");
exports.default = {
    name: "use",
    aliases: [],
    args: true,
    usage: "<item>",
    category: Command_1.Category.ECONOMY,
    description: "Use an item",
    cooldown: 15,
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            var user, item, userItem, magnetCoins, sunglassesPerk, memes, chosenMeme, min, max, reply, memeCoins;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, dbObjects_1.Users.findOne({
                            where: {
                                user_id: message.author.id,
                            },
                        })];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                                where: { name: (_a = {}, _a[sequelize_1.Op.like] = args[0], _a) },
                            })];
                    case 2:
                        item = _b.sent();
                        if (!item) {
                            message.channel.send("That item doesn't exist!");
                            return [2 /*return*/, "invalid"];
                        }
                        return [4 /*yield*/, user.getItems()];
                    case 3:
                        userItem = (_b.sent()).find(function (i) { return i.dataValues.item.name === item.dataValues.name; });
                        if (userItem.dataValues.amount < 1 || !userItem) {
                            message.channel.send("You don't have that item!");
                            return [2 /*return*/, "invalid"];
                        }
                        if (item.type.startsWith("USE")) {
                            switch (item.name) {
                                case "Magnet":
                                    magnetCoins = Math.floor(Math.random() * 5 + 5);
                                    user.increment("balance", {
                                        by: magnetCoins,
                                    });
                                    user.save();
                                    return [2 /*return*/, message.channel.send("You found " + magnetCoins + " coins with your trusty magnet!")];
                                case "Sunglasses":
                                    sunglassesPerk = Math.round(Math.random() * 2 + 2);
                                    user.increment("multiplier", {
                                        by: sunglassesPerk,
                                    });
                                    user.save();
                                    userItem.decrement("amount");
                                    userItem.save();
                                    return [2 /*return*/, message.channel.send("You wear your cool shades and gain " + sunglassesPerk + " as a perk! ~~Unfortunately the expensive sunglasses were cheaply made and broke as a result~~")];
                                case "Computer":
                                    if (Math.random() > 0.95) {
                                        userItem.decrement("amount");
                                        userItem.save();
                                        return [2 /*return*/, message.channel.send("Your dank meme was taken down for being low effort and you raged, breaking your computer!")];
                                    }
                                    memes = [
                                        {
                                            min: 10,
                                            max: 15,
                                            reply: "with a few upvotes and got $ coins",
                                        },
                                        {
                                            min: 12,
                                            max: 18,
                                            reply: "with a some upvotes and gained $ coins",
                                        },
                                        {
                                            min: 15,
                                            max: 22,
                                            reply: "with a lot of upvotes and you got $ coins from ads",
                                        },
                                        {
                                            min: 18,
                                            max: 25,
                                            reply: "with a over 1000 upvotes and the ads earned $ coins",
                                        },
                                        {
                                            min: 25,
                                            max: 30,
                                            reply: "with an incredible amount of upvotes and got $ coins",
                                        },
                                        {
                                            min: 30,
                                            max: 40,
                                            reply: "with a over 10000 upvotes and earned $ coins from ads",
                                        },
                                    ];
                                    chosenMeme = memes[Math.floor(Math.random() * memes.length)];
                                    min = chosenMeme.min, max = chosenMeme.max, reply = chosenMeme.reply;
                                    memeCoins = Math.round(Math.random() * (max - min) + min);
                                    user.income(memeCoins);
                                    return [2 /*return*/, message.channel.send("You posted a dank meme **" + reply + "**!")];
                            }
                        }
                        else {
                            message.channel.send("You can't use this item!" + item.edible
                                ? "\nTo use this item you must eat it!"
                                : "");
                            return [2 /*return*/, "invalid"];
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
};
