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
var Command_1 = require("../../../Command");
var index_1 = require("../../../index");
exports.default = {
    name: "shop",
    aliases: [],
    args: false,
    usage: "[page]",
    category: Command_1.Category.ECONOMY,
    description: "Visit the shop for items to buy",
    cooldown: 2,
    execute: function (message, args, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var items, itemsPerPage, pages, pageNumber, page, embed, _i, page_1, item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, index_1.CurrencyShop.findAll()];
                    case 1:
                        items = _b.sent();
                        itemsPerPage = 5;
                        pages = items
                            .map(function (_, i) {
                            return i % itemsPerPage
                                ? undefined
                                : items.slice(i, Math.floor(i / itemsPerPage) * itemsPerPage + itemsPerPage);
                        })
                            .filter(function ($) { return !!$; });
                        pageNumber = parseInt(args[0]) || 1;
                        if (pageNumber > pages.length || pageNumber === 0) {
                            message.channel.send("Enter a valid page (1-" + pages.length + ")!");
                            return [2 /*return*/, "invalid"];
                        }
                        page = pages[pageNumber - 1 > pages.length - 1 ? pages.length - 1 : pageNumber - 1];
                        embed = new discord_js_1.MessageEmbed()
                            .setColor("RANDOM")
                            .setFooter((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag)
                            .setTimestamp(message.createdTimestamp)
                            .setTitle("Shop");
                        for (_i = 0, page_1 = page; _i < page_1.length; _i++) {
                            item = page_1[_i];
                            embed.addField(item.emoji + " " + item.name + " - " + item.cost, item.description);
                        }
                        return [2 /*return*/, message.channel.send(embed)];
                }
            });
        });
    },
};
