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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var Command_1 = require("../../../Command");
var dbObjects_1 = require("../../../dbObjects");
var suitChars = ["♠️", "♥️", "♣️", "♦️"];
var letters = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];
exports.default = {
    name: "blackjack",
    aliases: ["bj"],
    args: false,
    usage: "[bet]",
    category: Command_1.Category.ECONOMY,
    cooldown: 10,
    description: "Play a game of blackjack",
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            function play(choice) {
                return __awaiter(this, void 0, void 0, function () {
                    var card, win, playerChoice;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (choice === "hit") {
                                    card = cards.splice(0, 1)[0];
                                    player.splice(0, -1, card);
                                    if (player.reduce(function (a, b) { return a + b.value; }, 0) > 21) {
                                        if (bet) {
                                            user.decrement("balance", {
                                                by: bet,
                                            });
                                            user.save();
                                        }
                                        return [2 /*return*/, message.channel.send(new discord_js_1.MessageEmbed()
                                                .setAuthor(message.author.username + "'s blackjack game", message.author.displayAvatarURL())
                                                .setTitle("You bust!")
                                                .setDescription("**You drew " + card.name + " and bust with a total of " + player.reduce(function (a, b) { return a + b.value; }, 0) + "**!")
                                                .addField(message.author.username + "'s cards", player
                                                .map(function (c) { return c.name; })
                                                .join(" ") + "\nTotal: `" + player.reduce(function (a, b) { return a + b.value; }, 0) + "`", true)
                                                .addField("Dealer's cards", dealer
                                                .map(function (c) { return c.name; })
                                                .join(" ") + "\nTotal: `" + dealer.reduce(function (a, b) { return a + b.value; }, 0) + "`", true)
                                                .setFooter("Try again!")
                                                .setColor("RANDOM"))];
                                    }
                                }
                                if (choice === "stand") {
                                    while (dealer.reduce(function (a, b) { return a + b.value; }, 0) < 17)
                                        dealer.splice.apply(dealer, __spreadArrays([0, -1], cards.splice(0, 1)));
                                    if (dealer.reduce(function (a, b) { return a + b.value; }, 0) > 21) {
                                        user.increment("balance", {
                                            by: bet,
                                        });
                                        user.save();
                                        return [2 /*return*/, message.channel.send(new discord_js_1.MessageEmbed()
                                                .setAuthor(message.author.username + "'s blackjack game", message.author.displayAvatarURL())
                                                .setTitle("Dealer busts!")
                                                .setDescription("**The dealer busts with a total of " + dealer.reduce(function (a, b) { return a + b.value; }, 0) + "**!")
                                                .addField(message.author.username + "'s cards", player
                                                .map(function (c) { return c.name; })
                                                .join(" ") + "\nTotal: `" + player.reduce(function (a, b) { return a + b.value; }, 0) + "`", true)
                                                .addField("Dealer's cards", dealer
                                                .map(function (c) { return c.name; })
                                                .join(" ") + "\nTotal: `" + dealer.reduce(function (a, b) { return a + b.value; }, 0) + "`", true)
                                                .setFooter("Play again!")
                                                .setColor("RANDOM"))];
                                    }
                                    win = dealer.reduce(function (a, b) { return a + b.value; }, 0) <
                                        player.reduce(function (a, b) { return a + b.value; }, 0) ||
                                        dealer.reduce(function (a, b) { return a + b.value; }, 0) <
                                            player.reduce(function (a, b) { return a + b.value; }, 0) +
                                                (player.some(function (card) { return card.name.split(" ")[0] === "ace"; })
                                                    ? 10
                                                    : 0);
                                    if (bet) {
                                        if (win) {
                                            user.increment("balance", {
                                                by: bet,
                                            });
                                            user.save();
                                        }
                                        else {
                                            user.decrement("balance", {
                                                by: bet,
                                            });
                                            user.save();
                                        }
                                    }
                                    return [2 /*return*/, message.channel.send(new discord_js_1.MessageEmbed()
                                            .setAuthor(message.author.username + "'s blackjack game", message.author.displayAvatarURL())
                                            .setTitle("You " + (win ? "win" : "lose") + "!")
                                            .setColor("RANDOM")
                                            .setDescription("`Dealer : " + dealer.reduce(function (a, b) { return a + b.value; }, 0) + "\nYou    : " + player.reduce(function (a, b) { return a + b.value; }, 0) + "`")
                                            .addField(message.author.username + "'s cards", player.map(function (c) { return c.name; }).join(" ") + "\nTotal: `" + player.reduce(function (a, b) { return a + b.value; }, 0) + "`", true)
                                            .addField("Dealer's cards", player.map(function (c) { return c.name; }).join(" ") + "\nTotal: `" + dealer.reduce(function (a, b) { return a + b.value; }, 0) + "`", true)
                                            .setFooter("Play again!"))];
                                }
                                message.channel.send(new discord_js_1.MessageEmbed()
                                    .setAuthor(message.author.username + "'s blackjack game", message.author.displayAvatarURL())
                                    .setDescription("Hit or stand? (h/s)")
                                    .setColor("RANDOM")
                                    .addField(message.author.username + "'s cards", player.map(function (c) { return c.name; }).join(" ") + "\nTotal: `" + player.reduce(function (a, b) { return a + b.value; }, 0) + "`", true)
                                    .addField("Dealer's card", dealer[0].name + "\nTotal: `?`", true)
                                    .setFooter("K, Q, J = 10 | A = 1 or 11"));
                                return [4 /*yield*/, message.channel.awaitMessages(filter, {
                                        max: 1,
                                        time: 15000,
                                        errors: ["time"],
                                    })];
                            case 1:
                                playerChoice = (_a.sent()).first();
                                if (!playerChoice)
                                    return [2 /*return*/, message.channel.send("Exiting the game...")];
                                if (playerChoice.content.toLowerCase().startsWith("h"))
                                    return [2 /*return*/, play("hit")];
                                else if (playerChoice.content.toLowerCase().startsWith("s"))
                                    return [2 /*return*/, play("stand")];
                                else
                                    return [2 /*return*/, message.channel.send("Exiting the game...")];
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var bet, user, suits, cards, player, dealer, j, suit, i, i, cur, rnd, tmp, filter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bet = parseInt(args[0]);
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: message.author.id,
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        if (["max", "all"].includes(args[0]))
                            bet = user.balance;
                        if (!bet) {
                            message.channel.send("Please bet a valid number!");
                            return [2 /*return*/, "invalid"];
                        }
                        if (bet < 20) {
                            message.channel.send("You must bet at least 20 coins!");
                            return [2 /*return*/, "invalid"];
                        }
                        if (bet > user.balance) {
                            message.channel.send("You don't have that much!");
                            return [2 /*return*/, "invalid"];
                        }
                        suits = ["spades", "hearts", "clubs", "diamonds"];
                        cards = [];
                        player = [];
                        dealer = [];
                        for (j = 0; j < suits.length; j++) {
                            suit = suits[j];
                            for (i = 1; i < 14; i++) {
                                cards.push({
                                    value: i > 10 ? 10 : i,
                                    suit: suit,
                                    name: "[`" + suitChars[j] + " " + letters[i - 1] + "`](https://www.youtube.com/watch?v=dQw4w9WgXcQ)",
                                });
                            }
                        }
                        for (i = 0; i < cards.length; i++) {
                            cur = cards[i];
                            rnd = Math.floor(Math.random() * cards.length);
                            tmp = cards[rnd];
                            cards[rnd] = cur;
                            cards[i] = tmp;
                        }
                        player.splice.apply(player, __spreadArrays([0, -1], cards.splice(0, 2)));
                        dealer.splice.apply(dealer, __spreadArrays([0, -1], cards.splice(0, 2)));
                        filter = function (response) {
                            return response.author.id === message.author.id;
                        };
                        play("");
                        return [2 /*return*/];
                }
            });
        });
    },
};
