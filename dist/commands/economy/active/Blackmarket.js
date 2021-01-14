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
var lodash_1 = require("lodash");
var sequelize_1 = require("sequelize");
var Command_1 = require("../../../Command");
var dbObjects_1 = require("../../../dbObjects");
exports.default = {
    name: "blackmarket",
    aliases: ["offers", "offer", "marketplace"],
    args: false,
    usage: "[<price|'buy' <id>> <offer> [description]]",
    category: Command_1.Category.ECONOMY,
    description: "Interact with the black market",
    cooldown: 30,
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            var user, offer, offerOffer, offerAmount, offerItem, item_1, userItem, id, user, dealer, offer, dealerUser, offerOffer, offerAmount, offerItem, pricePrice, priceAmount, priceItem, paymentItem_1, userItem, returnedItem_1, dealerItem, userReturnedItem, dealerReturnedItem, returnedItem_2, dealerItem, paymentItem_2, userItem, returnedItem_3, dealerItem, paymentItem_3, userItem, formatOffer, formatPrice, user, price, offer, item_2, offerItem, description, offers, _a;
            var _b, _c, _d, _e, _f, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (!(args[0] === "cancel")) return [3 /*break*/, 8];
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: message.author.id,
                                },
                            })];
                    case 1:
                        user = _k.sent();
                        return [4 /*yield*/, dbObjects_1.BlackMarket.findOne({
                                where: {
                                    user_id: message.author.id,
                                },
                            })];
                    case 2:
                        offer = _k.sent();
                        if (!offer) {
                            message.channel.send("You do not have any active offers!");
                            return [2 /*return*/, "invalid"];
                        }
                        offerOffer = offer.offer.split(" ").slice(0, 2);
                        offerAmount = offerOffer[0];
                        offerItem = offerOffer[1];
                        return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                                where: { name: (_b = {}, _b[sequelize_1.Op.like] = offer[1], _b) },
                            })];
                    case 3:
                        item_1 = _k.sent();
                        if (!(offerItem === "coin")) return [3 /*break*/, 4];
                        user.increment("balance", {
                            by: offerAmount,
                        });
                        return [3 /*break*/, 7];
                    case 4:
                        if (!item_1) return [3 /*break*/, 6];
                        return [4 /*yield*/, user.getItems()];
                    case 5:
                        userItem = (_k.sent()).find(function (i) { return i.dataValues.item.name === item_1.name; });
                        if (!userItem) {
                            user.increment("balance", {
                                by: 100,
                            });
                            user.save();
                            return [2 /*return*/, message.channel.send("Sorry! There was an error in parsing your offer. You got 100 coins for compensation, though.")];
                        }
                        userItem.increment("amount", {
                            by: offerAmount,
                        });
                        userItem.save();
                        return [3 /*break*/, 7];
                    case 6:
                        offer.destroy();
                        user.increment("balance", {
                            by: 100,
                        });
                        user.save();
                        return [2 /*return*/, message.channel.send("Sorry! There was an error in parsing your offer. You got 100 coins for compensation, though.")];
                    case 7:
                        offer.destroy();
                        return [2 /*return*/, message.channel.send("Canceled offer " + offer.user_id + " and refunded your stuff!")];
                    case 8:
                        if (!(args[0] === "buy")) return [3 /*break*/, 30];
                        id = args[1];
                        if (!/^\d{18}$/.test(args[1])) {
                            message.channel.send("Enter a valid offer id.");
                            return [2 /*return*/, "invalid"];
                        }
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: message.author.id,
                                },
                            })];
                    case 9:
                        user = _k.sent();
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: id,
                                },
                            })];
                    case 10:
                        dealer = _k.sent();
                        return [4 /*yield*/, dbObjects_1.BlackMarket.findOne({
                                where: {
                                    user_id: id,
                                },
                            })];
                    case 11:
                        offer = _k.sent();
                        if (!dealer) {
                            message.channel.send("Could not find the offer with an id of " + args[1]);
                            return [2 /*return*/, "invalid"];
                        }
                        dealerUser = client.users.cache.get(dealer.user_id);
                        if (!dealerUser) {
                            offer.destroy();
                            message.channel.send("Looks like the dealer wasn't found. Deleting offer...");
                            return [2 /*return*/, "invalid"];
                        }
                        offerOffer = offer.offer.split(" ").slice(0, 2);
                        offerAmount = offerOffer[0];
                        offerItem = offerOffer[1];
                        pricePrice = offer.price.split(" ").slice(0, 2);
                        priceAmount = pricePrice[0];
                        priceItem = pricePrice[1];
                        if (!(offerItem !== "coin" && priceItem !== "coin")) return [3 /*break*/, 18];
                        return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                                where: { name: (_c = {}, _c[sequelize_1.Op.like] = priceItem, _c) },
                            })];
                    case 12:
                        paymentItem_1 = _k.sent();
                        return [4 /*yield*/, user.getItems()];
                    case 13:
                        userItem = (_k.sent()).find(function (i) { return i.dataValues.item.name === paymentItem_1.name; });
                        return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                                where: { name: (_d = {}, _d[sequelize_1.Op.like] = offerItem, _d) },
                            })];
                    case 14:
                        returnedItem_1 = _k.sent();
                        return [4 /*yield*/, dealer.getItems()];
                    case 15:
                        dealerItem = (_k.sent()).find(function (i) { return i.dataValues.item.name === returnedItem_1.name; });
                        return [4 /*yield*/, dealer.getItems()];
                    case 16:
                        userReturnedItem = (_k.sent()).find(function (i) { return i.dataValues.item.name === returnedItem_1.name; });
                        return [4 /*yield*/, dealer.getItems()];
                    case 17:
                        dealerReturnedItem = (_k.sent()).find(function (i) { return i.dataValues.item.name === paymentItem_1.name; });
                        if (userItem) {
                            if (userItem.dataValues.amount < priceAmount) {
                                message.channel.send("You don't have that many items!");
                                return [2 /*return*/, "invalid"];
                            }
                            userItem.decrement("amount", {
                                by: parseInt(offerAmount),
                            });
                            userItem.save();
                            dealerItem.decrement("amount", {
                                by: parseInt(priceAmount),
                            });
                            dealerItem.save();
                            dealerReturnedItem.increment("amount", {
                                by: parseInt(priceAmount),
                            });
                            dealerReturnedItem.save();
                            userReturnedItem.increment("amount", {
                                by: parseInt(offerAmount),
                            });
                            userReturnedItem.save();
                        }
                        else {
                            message.channel.send("You don't have that many items!");
                            return [2 /*return*/, "invalid"];
                        }
                        return [3 /*break*/, 29];
                    case 18:
                        if (!(offerItem === "coin" && priceItem !== "coin")) return [3 /*break*/, 23];
                        return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                                where: { name: (_e = {}, _e[sequelize_1.Op.like] = priceItem, _e) },
                            })];
                    case 19:
                        returnedItem_2 = _k.sent();
                        return [4 /*yield*/, dealer.getItems()];
                    case 20:
                        dealerItem = (_k.sent()).find(function (i) { return i.dataValues.item.name === returnedItem_2.name; });
                        return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                                where: { name: (_f = {}, _f[sequelize_1.Op.like] = priceItem, _f) },
                            })];
                    case 21:
                        paymentItem_2 = _k.sent();
                        return [4 /*yield*/, user.getItems()];
                    case 22:
                        userItem = (_k.sent()).find(function (i) { return i.dataValues.item.name === paymentItem_2.name; });
                        userItem.decrement("amount", {
                            by: parseInt(offerAmount),
                        });
                        userItem.save();
                        dealerItem.increment("amount", {
                            by: parseInt(offerAmount),
                        });
                        dealerItem.save();
                        user.increment("balance", {
                            by: parseInt(priceAmount),
                        });
                        user.save();
                        dealer.decrement("balance", {
                            by: parseInt(priceAmount),
                        });
                        dealer.save();
                        return [3 /*break*/, 29];
                    case 23:
                        if (!(offerItem !== "coin" && priceItem === "coin")) return [3 /*break*/, 28];
                        return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                                where: { name: (_g = {}, _g[sequelize_1.Op.like] = offerItem, _g) },
                            })];
                    case 24:
                        returnedItem_3 = _k.sent();
                        return [4 /*yield*/, dealer.getItems()];
                    case 25:
                        dealerItem = (_k.sent()).find(function (i) { return i.dataValues.item.name === returnedItem_3.name; });
                        return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                                where: { name: (_h = {}, _h[sequelize_1.Op.like] = priceItem, _h) },
                            })];
                    case 26:
                        paymentItem_3 = _k.sent();
                        return [4 /*yield*/, user.getItems()];
                    case 27:
                        userItem = (_k.sent()).find(function (i) { return i.dataValues.item.name === paymentItem_3.name; });
                        userItem.increment("amount", {
                            by: parseInt(offerAmount),
                        });
                        userItem.save();
                        dealerItem.decrement("amount", {
                            by: parseInt(offerAmount),
                        });
                        dealerItem.save();
                        user.decrement("balance", {
                            by: parseInt(priceAmount),
                        });
                        user.save();
                        dealer.increment("balance", {
                            by: parseInt(priceAmount),
                        });
                        dealer.save();
                        return [3 /*break*/, 29];
                    case 28:
                        user.decrement("balance", {
                            by: parseInt(offerAmount),
                        });
                        user.save();
                        dealer.decrement("balance", {
                            by: parseInt(priceAmount),
                        });
                        dealer.save();
                        _k.label = 29;
                    case 29:
                        try {
                            offer.destroy();
                            formatOffer = offerAmount + " " + offerItem + (parseInt(offerAmount) !== 1 && !offerItem.endsWith("es") ? "s" : "");
                            formatPrice = priceAmount + " " + priceItem + (parseInt(priceAmount) !== 1 && !priceItem.endsWith("es") ? "s" : "");
                            message.channel.send("You paid " + dealerUser.username + " " + formatPrice + " and got " + formatOffer + " in return!");
                            return [2 /*return*/, dealerUser.send(message.author.username + " has bought your offer!")];
                        }
                        catch (e) {
                            message.channel.send("Transaction failed!");
                            return [2 /*return*/, "invalid"];
                        }
                        _k.label = 30;
                    case 30:
                        if (!(parseInt(args[0]) > 0)) return [3 /*break*/, 39];
                        return [4 /*yield*/, dbObjects_1.BlackMarket.findOne({
                                where: {
                                    user_id: message.author.id,
                                },
                            })];
                    case 31:
                        if (_k.sent()) {
                            message.channel.send("You already have an active offer!");
                            return [2 /*return*/, "invalid"];
                        }
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: message.author.id,
                                },
                            })];
                    case 32:
                        user = _k.sent();
                        price = args[0].split("-").slice(0, 2);
                        if (price.length < 2 || !parseInt(price[0])) {
                            message.channel.send("Please enter prices like this: `amount-item_type`. For example: `420-coin`.");
                            return [2 /*return*/, "invalid"];
                        }
                        offer = args[1].split("-").slice(0, 2);
                        if (offer.length < 2 || !parseInt(offer[0])) {
                            message.channel.send("Please enter prices like this: `amount-item_type`. For example: `420-coin`.");
                            return [2 /*return*/, "invalid"];
                        }
                        return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                                where: { name: (_j = {}, _j[sequelize_1.Op.like] = offer[1], _j) },
                            })];
                    case 33:
                        item_2 = _k.sent();
                        if (!(offer[1] === "coin")) return [3 /*break*/, 34];
                        if (user.balance < offer[0]) {
                            message.channel.send("You don't have that many coins!");
                            return [2 /*return*/, "invalid"];
                        }
                        user.balance -= parseInt(offer[0]);
                        user.save();
                        return [3 /*break*/, 37];
                    case 34:
                        if (!item_2) return [3 /*break*/, 36];
                        return [4 /*yield*/, user.getItems()];
                    case 35:
                        offerItem = (_k.sent()).find(function (i) { return i.dataValues.item.name === item_2.name; });
                        if (offerItem) {
                            if (offerItem.dataValues.amount < offer[0]) {
                                message.channel.send("You don't have that many items!");
                                return [2 /*return*/, "invalid"];
                            }
                            offerItem.decrement("amount", {
                                by: parseInt(offer[0]),
                            });
                            offerItem.save();
                        }
                        else {
                            message.channel.send("You don't have that many items!");
                            return [2 /*return*/, "invalid"];
                        }
                        return [3 /*break*/, 37];
                    case 36:
                        message.channel.send("Could not find that item!");
                        return [2 /*return*/, "invalid"];
                    case 37:
                        description = args.slice(2).join(" ") || null;
                        return [4 /*yield*/, dbObjects_1.BlackMarket.create({
                                user_id: message.author.id,
                                price: price.join(" "),
                                offer: offer.join(" "),
                                description: description,
                            })];
                    case 38:
                        _k.sent();
                        return [2 /*return*/, message.channel.send("Created a new offer!")];
                    case 39:
                        if (!!args.length) return [3 /*break*/, 41];
                        _a = lodash_1.shuffle;
                        return [4 /*yield*/, dbObjects_1.BlackMarket.findAll()];
                    case 40:
                        offers = _a.apply(void 0, [_k.sent()]).slice(0, 5);
                        return [2 /*return*/, message.channel.send(new discord_js_1.MessageEmbed()
                                .setTitle("Blackmarket Offers")
                                .setDescription("The blackmarket is ran by the users. Don't tell nobody.")
                                .addFields(offers.map(function (c) {
                                var price = c.dataValues.price.split(" ").slice(0, 2);
                                var formatPrice = price[0] + " " + price[1] + (parseInt(price[0]) !== 1 && !price[1].endsWith("es")
                                    ? "s"
                                    : "");
                                var offer = c.dataValues.offer.split(" ").slice(0, 2);
                                var formatOffer = offer[0] + " " + offer[1] + (parseInt(offer[0]) !== 1 && !offer[1].endsWith("es")
                                    ? "s"
                                    : "");
                                return {
                                    name: "Offer id: " + c.dataValues.user_id,
                                    value: "Price: " + formatPrice + "\nOffer: " + formatOffer + "\n*" + (c.dataValues.description || "No description") + "*",
                                };
                            }))
                                .setColor("RANDOM")
                                .setFooter("shhhhhhhhhh!"))];
                    case 41: return [2 /*return*/];
                }
            });
        });
    },
};
