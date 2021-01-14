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
var discord_js_1 = require("discord.js");
var Command_1 = require("../../../Command");
var dbObjects_1 = require("../../../dbObjects");
var parseUsers_1 = __importDefault(require("../../../utils/parseUsers"));
exports.default = {
    name: "profile",
    aliases: [],
    args: false,
    usage: "[user]",
    category: Command_1.Category.ECONOMY,
    description: "See your profile or someone else's",
    cooldown: 1,
    execute: function (message, args, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var user, profile, items, totalItems;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = parseUsers_1.default(args, message)[0] || message.author;
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: user.id,
                                },
                            })];
                    case 1:
                        profile = _b.sent();
                        return [4 /*yield*/, profile.getItems()];
                    case 2:
                        items = _b.sent();
                        totalItems = items.reduce(function (acc, cur) { return acc + cur.dataValues.amount; }, 0) || 0;
                        return [2 /*return*/, message.channel.send(new discord_js_1.MessageEmbed()
                                .setTitle(user.username + "'s profile")
                                .addField("Balance", profile.balance, true)
                                .addField("Bank", profile.bank + " / " + profile.max_bank, true)
                                .addField("Total", profile.balance + profile.bank, true)
                                .addField("Inventory", totalItems + " item" + (totalItems === 1 ? "" : "s") + " (worth " + items.reduce(function (acc, cur) {
                                return acc + cur.dataValues.amount * cur.item.dataValues.cost;
                            }, 0) + " coins)", true)
                                .addField("Multiplier", profile.multiplier - 1 + "%", true)
                                .addField("Passive", profile.passive ? "yes" : "no", true)
                                .addField("Level and exp", "level " + profile.level + " | " + profile.exp + " exp earned")
                                .addField("Occupation", profile.occupation)
                                .addField("Last updated", profile.updatedAt.toDateString() === new Date().toDateString()
                                ? new Date().toTimeString().slice(0, 8)
                                : profile.updatedAt.toDateString(), true)
                                .addField("Joined at", profile.createdAt.toDateString(), true)
                                .setColor("RANDOM")
                                .setThumbnail(user.displayAvatarURL({
                                dynamic: true,
                            }))
                                .setFooter((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag)
                                .setTimestamp(message.createdAt))];
                }
            });
        });
    },
};
