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
var Command_1 = require("../../Command");
var dbObjects_1 = require("../../dbObjects");
exports.default = {
    name: "guess",
    aliases: [],
    args: false,
    usage: "[bet] | <guess>, ...",
    category: Command_1.Category.ECONOMY,
    cooldown: 12,
    description: "Guess my chosen number!",
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            function play() {
                return __awaiter(this, void 0, void 0, function () {
                    var choice, guess;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, message.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 15000,
                                    errors: ["time"],
                                })];
                            case 1:
                                choice = (_a.sent()).first();
                                if (!choice)
                                    return [2 /*return*/, "invalid"];
                                guess = parseInt(choice.content);
                                if (!guess)
                                    return [2 /*return*/, message.channel.send("Ending the game...")];
                                if (guess > random) {
                                    message.channel.send("Too high! Try again.");
                                    bet = Math.ceil(bet / 2);
                                    return [2 /*return*/, play()];
                                }
                                if (guess < random) {
                                    message.channel.send("Too low! Try again.");
                                    bet = Math.ceil(bet / 2);
                                    return [2 /*return*/, play()];
                                }
                                user.increment("balance", {
                                    by: bet,
                                });
                                return [2 /*return*/, message.channel.send("You're right! Good job!")];
                        }
                    });
                });
            }
            var min, max, random, user, bet, filter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        min = Math.round(Math.random() * 10 + 1);
                        max = min + Math.floor(Math.random() * 6 + 10);
                        random = Math.round(Math.random() * (max + 0.01 - min) + min);
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: message.author.id,
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        bet = (parseInt(args[0]) || 0) * 2;
                        filter = function (response) {
                            return response.author.id === message.author.id;
                        };
                        message.channel.send("I am thinking of an integer between " + min + " and " + max + " (inclusive). Guess what it is!");
                        play();
                        return [2 /*return*/];
                }
            });
        });
    },
};
