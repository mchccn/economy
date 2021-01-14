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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Command_1 = require("../../../Command");
var dbObjects_1 = require("../../../dbObjects");
var parseUsers_1 = __importDefault(require("../../../utils/parseUsers"));
var thresholds = [
    {
        percent: 0.01,
        message: "a tiny tiny tiny amount",
    },
    {
        percent: 0.02,
        message: "a tiny tiny amount",
    },
    {
        percent: 0.04,
        message: "a small amount",
    },
    {
        percent: 0.08,
        message: "a nice chunk",
    },
    {
        percent: 0.1,
        message: "a good portion",
    },
    {
        percent: 0.2,
        message: "a massive chunk",
    },
    {
        percent: 0.3,
        message: "an insane amount",
    },
    {
        percent: 0.6,
        message: "almost everything",
    },
    {
        percent: 0.9,
        message: "basically everything",
    },
];
exports.default = {
    name: "rob",
    aliases: ["steal"],
    args: true,
    category: Command_1.Category.ECONOMY,
    cooldown: 60,
    description: "Rob someone!",
    usage: "<user>",
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            var threshold, target, user, victim, amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        threshold = thresholds[Math.floor(Math.random() * Math.random() * thresholds.length)];
                        target = parseUsers_1.default(args, message)[0];
                        if (!target) {
                            message.channel.send("I couldn't find the user!");
                            return [2 /*return*/, "invalid"];
                        }
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: message.author.id,
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        if (user.passive)
                            return [2 /*return*/, message.channel.send("Hey, you're passive! Turn that off first!")];
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: target.id,
                                },
                            })];
                    case 2:
                        victim = _a.sent();
                        if (victim.passive)
                            return [2 /*return*/, message.channel.send("The victim's passive, leave the wimp alone.")];
                        if (victim.balance < 50)
                            return [2 /*return*/, message.channel.send("The victim's too poor, they're not worth the trouble.")];
                        if (user.balance < 50)
                            return [2 /*return*/, message.channel.send("You need at least 50 coins to rob someone.")];
                        if (Math.random() > 0.9) {
                            message.channel.send("Some cops caught you and you have to pay the 100 coin fee.");
                            if (user.balance < 100) {
                                user.kill();
                                return [2 /*return*/, message.channel.send("You couldn't pay the 100 coin fee and the cops beat you.")];
                            }
                            user.decrement("balance", {
                                by: 100,
                            });
                            user.save();
                            victim.income(100);
                            return [2 /*return*/, message.channel.send("You paid a 100 coin fee to your victim for compensation.")];
                        }
                        amount = Math.floor(victim.balance * threshold.percent);
                        victim.decrement("balance", {
                            by: amount,
                        });
                        victim.save();
                        user.income(amount);
                        return [2 /*return*/, message.channel.send("You robbed " + target.username + " and stole **" + threshold.message + "** from them! (" + amount + " coins)")];
                }
            });
        });
    },
};
