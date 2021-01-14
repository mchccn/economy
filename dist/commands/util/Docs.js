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
var node_fetch_1 = __importDefault(require("node-fetch"));
var Command_1 = require("../../Command");
var parseTrim_1 = __importDefault(require("../../utils/parseTrim"));
exports.default = {
    name: "docs",
    aliases: ["dox", "doc", "documentation"],
    args: true,
    usage: "<platform> <query>",
    category: Command_1.Category.UTIL,
    description: "Search the discord.js docs",
    cooldown: 2.5,
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            var platform, query, res, json, res, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = args[0];
                        query = args.slice(1).join(" ");
                        if (!query)
                            return [2 /*return*/, message.channel.send("Please enter a search query!")];
                        if (!["djs", "d.js", "discord.js"].includes(platform)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node_fetch_1.default("https://djsdocs.sorta.moe/v2/embed?src=stable&q=" + encodeURIComponent(query))];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, message.channel.send(json ? { embed: json } : "Could not find that term!")];
                    case 3:
                        if (!["mdn", "moz", "mozilla"].includes(platform)) return [3 /*break*/, 6];
                        return [4 /*yield*/, node_fetch_1.default("https://developer.mozilla.org/api/v1/search/en-US?q=" + encodeURIComponent(query))];
                    case 4:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 5:
                        json = _a.sent();
                        return [2 /*return*/, message.channel.send(new discord_js_1.MessageEmbed()
                                .setColor("RANDOM")
                                .setDescription(parseTrim_1.default(json.documents
                                .slice(0, 3)
                                .map(function (doc) {
                                return "**[$" + doc.title + "](https://developer.mozilla.org/" + doc.locale + "/docs/" + doc.slug + ")**\n" + doc.excerpt.replace(/<\/?mark>/g, "");
                            })
                                .join("\n\n"), 2048))
                                .addField("\u200b", "Search results for `" + query + "`")
                                .setAuthor("Mozilla Developer Network [Full results]", "https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png", "https://developer.mozilla.org/en-US/search?q=" + encodeURIComponent(query)))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
};
