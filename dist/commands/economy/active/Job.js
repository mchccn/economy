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
var Command_1 = require("../../../Command");
var dbObjects_1 = require("../../../dbObjects");
exports.default = {
    name: "job",
    aliases: ["work", "jobs"],
    args: false,
    usage: "['list'|'info'|'resign']",
    category: Command_1.Category.ECONOMY,
    cooldown: 0,
    description: "Work at your office and earn some income",
    execute: function (message, args, client) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var user, _c, occupations_1, itemsPerPage_1, pages, pageNumber, page, embed, _i, page_1, occ, userOcc, occupation, occ_1, game, filter_1, scrambles, randWord, scrambled, answer, income, income, e_1, income, colors, chosen, words, chosenWords, chosenColor_1, map_1, i, memo_1;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, dbObjects_1.Users.findOne({
                            where: {
                                user_id: message.author.id,
                            },
                        })];
                    case 1:
                        user = _d.sent();
                        if (!args[0]) return [3 /*break*/, 10];
                        _c = args[0];
                        switch (_c) {
                            case "list": return [3 /*break*/, 2];
                            case "info": return [3 /*break*/, 4];
                            case "resign": return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 2: return [4 /*yield*/, dbObjects_1.Occupations.findAll()];
                    case 3:
                        occupations_1 = (_d.sent()).filter(function (o) { return o.name !== "unemployed"; });
                        itemsPerPage_1 = 4;
                        pages = occupations_1
                            .map(function (_, i) {
                            return i % itemsPerPage_1
                                ? undefined
                                : occupations_1.slice(i, Math.floor(i / itemsPerPage_1) * itemsPerPage_1 + itemsPerPage_1);
                        })
                            .filter(function ($) { return !!$; });
                        pageNumber = parseInt(args[1]) || 1;
                        if (pageNumber > pages.length || pageNumber === 0) {
                            message.channel.send("Enter a valid page (1-" + pages.length + ")!");
                            return [2 /*return*/, "invalid"];
                        }
                        page = pages[pageNumber - 1 > pages.length - 1
                            ? pages.length - 1
                            : pageNumber - 1];
                        embed = new discord_js_1.MessageEmbed()
                            .setColor("RANDOM")
                            .setFooter((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag)
                            .setTimestamp(message.createdTimestamp)
                            .setTitle("Shop");
                        for (_i = 0, page_1 = page; _i < page_1.length; _i++) {
                            occ = page_1[_i];
                            embed.addField(occ.name, "Level required: `" + occ.level + "`\nSalary: `" + occ.min + " \u2013\u00A0" + occ.max + "`");
                        }
                        message.channel.send(embed);
                        return [2 /*return*/, "invalid"];
                    case 4: return [4 /*yield*/, dbObjects_1.Occupations.findOne({
                            where: {
                                name: user.occupation,
                            },
                        })];
                    case 5:
                        userOcc = _d.sent();
                        message.channel.send(new discord_js_1.MessageEmbed()
                            .setTitle("Info for " + message.author.username + "'s current job")
                            .addField("Name", userOcc.name)
                            .addField("Level required", userOcc.level)
                            .addField("Salary", "`" + userOcc.min + " \u2013\u00A0" + userOcc.max + "`")
                            .setColor("RANDOM")
                            .setFooter((_b = client.user) === null || _b === void 0 ? void 0 : _b.tag)
                            .setTimestamp(message.createdTimestamp));
                        return [2 /*return*/, "invalid"];
                    case 6:
                        if (user.occupation === "unemployed") {
                            message.channel.send("You're already unemployed!");
                            return [2 /*return*/, "invalid"];
                        }
                        user.occupation = "unemployed";
                        user.save();
                        return [2 /*return*/, message.channel.send("You have resigned from your job!")];
                    case 7: return [4 /*yield*/, dbObjects_1.Occupations.findOne({
                            where: {
                                name: args[0],
                            },
                        })];
                    case 8:
                        occupation = _d.sent();
                        if (!occupation) {
                            message.channel.send("Occupation `" + args[0] + "` not found!");
                        }
                        else {
                            if (user.occupation !== "unemployed") {
                                message.channel.send("You have to resign first!");
                                return [2 /*return*/, "invalid"];
                            }
                            if (occupation.name === "unemployed") {
                                message.channel.send("You can't apply to be unemployed, simply resign!");
                                return [2 /*return*/, "invalid"];
                            }
                            if (occupation.name === user.occupation) {
                                message.channel.send("You're already working there!");
                                return [2 /*return*/, "invalid"];
                            }
                            if (!occupation) {
                                message.channel.send("Occupation `" + args[0] + "` not found!");
                            }
                            if (user.level < occupation.level) {
                                message.channel.send("Sorry, you need to be level " + occupation.level + " to unlock this job.");
                            }
                            else {
                                if (user.balance < occupation.min) {
                                    message.channel.send("You need " + occupation.min + " coins to pay for everything!");
                                }
                                else {
                                    user.decrement("balance", {
                                        by: occupation.min,
                                    });
                                    message.channel.send("Congratulations! You are now working as a " + occupation.name + "!");
                                }
                            }
                        }
                        return [2 /*return*/, "invalid"];
                    case 9: return [3 /*break*/, 18];
                    case 10: return [4 /*yield*/, dbObjects_1.Occupations.findOne({
                            where: {
                                name: user.occupation,
                            },
                        })];
                    case 11:
                        occ_1 = _d.sent();
                        if (occ_1.name === "unemployed") {
                            message.channel.send("You can't work, you're unemployed!");
                            return [2 /*return*/, "invalid"];
                        }
                        game = Math.random() > 0.5;
                        filter_1 = function (response) {
                            return response.author.id === message.author.id;
                        };
                        if (!game) return [3 /*break*/, 16];
                        scrambles = occ_1.scramble.split(" ");
                        randWord = scrambles[Math.floor(Math.random() * scrambles.length)];
                        scrambled = scramble(randWord);
                        message.channel.send("Unscramble this word: `" + scrambled + "`");
                        _d.label = 12;
                    case 12:
                        _d.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, message.channel.awaitMessages(filter_1, {
                                max: 1,
                                time: 10000,
                                errors: ["time"],
                            })];
                    case 13:
                        answer = (_d.sent()).first();
                        if ((answer === null || answer === void 0 ? void 0 : answer.content) === randWord) {
                            income = Math.round(Math.random() * (occ_1.max - occ_1.min) + occ_1.min);
                            user.income(income);
                            message.channel.send("**Boss:** Excellent work, " + message.author.username + "! I'm giving you " + income + " coins!");
                        }
                        else {
                            income = Math.round(occ_1.min / 2);
                            user.income(income);
                            message.channel.send("**Boss:** Unacceptable, " + message.author.username + ". I'm only giving you " + income + " coins.");
                        }
                        return [3 /*break*/, 15];
                    case 14:
                        e_1 = _d.sent();
                        income = Math.round(occ_1.min / 2);
                        user.income(income);
                        message.channel.send("**Boss:** Stop slacking, " + message.author.username + ". I'm only giving you " + income + " coins.");
                        return [3 /*break*/, 15];
                    case 15: return [3 /*break*/, 18];
                    case 16:
                        colors = ["red", "orange", "yellow", "green", "blue", "purple"];
                        chosen = lodash_1.sampleSize(colors, 3);
                        words = occ_1.words.split(" ");
                        chosenWords = lodash_1.sampleSize(words, 3);
                        chosenColor_1 = lodash_1.sample(chosen) || chosen[0];
                        map_1 = new Map();
                        for (i = 0; i < chosen.length; i++)
                            map_1.set(chosen[i], chosenWords[i]);
                        return [4 /*yield*/, message.channel.send("Remember the following!\n" + Array.from(map_1)
                                .map(function (_a) {
                                var key = _a[0], value = _a[1];
                                return ":" + key + "_square: \u2013 `" + value + "`";
                            })
                                .join("\n"))];
                    case 17:
                        memo_1 = _d.sent();
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var answer, income, income, e_2, income;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        memo_1.edit("What color was `" + map_1.get(chosenColor_1) + "`?");
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, message.channel.awaitMessages(filter_1, {
                                                max: 1,
                                                time: 10000,
                                                errors: ["time"],
                                            })];
                                    case 2:
                                        answer = (_a.sent()).first();
                                        if (!answer)
                                            return [2 /*return*/];
                                        if (answer === null || answer === void 0 ? void 0 : answer.content.includes(chosenColor_1)) {
                                            income = Math.round(Math.random() * (occ_1.max - occ_1.min) + occ_1.min);
                                            user.income(income);
                                            message.channel.send("**Boss:** Excellent work, " + message.author.username + "! I'm giving you " + income + " coins!");
                                        }
                                        else {
                                            income = Math.round(occ_1.min / 2);
                                            user.income(income);
                                            message.channel.send("**Boss:** Unacceptable, " + message.author.username + ". I'm only giving you " + income + " coins.");
                                        }
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_2 = _a.sent();
                                        income = Math.round(occ_1.min / 2);
                                        user.income(income);
                                        message.channel.send("**Boss:** Stop slacking, " + message.author.username + ". I'm only giving you " + income + " coins.");
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }, 1000);
                        _d.label = 18;
                    case 18: return [2 /*return*/];
                }
            });
        });
    },
};
function scramble(str) {
    var strArr = str.split("");
    for (var b = strArr.length - 1; 0 < b; b--) {
        var c = Math.floor(Math.random() * (b + 1));
        var d = strArr[b];
        strArr[b] = strArr[c];
        strArr[c] = d;
    }
    return strArr.join("");
}
