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
var Command_1 = require("../../Command");
exports.default = {
    name: "syntax",
    aliases: ["args", "params"],
    args: false,
    usage: "",
    description: "Displays a helpful message for reading argument syntax.",
    category: Command_1.Category.UTIL,
    cooldown: 0,
    execute: function (message, args, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, message.channel.send(new discord_js_1.MessageEmbed()
                        .setTitle("Reading argument syntax")
                        .setDescription("<@" + ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id) + "> uses a specific argument syntax. Use this message for future reference. If you still don't get it, join our support server and ask a developer.")
                        .addField("Required arguments", "`<arg>` indicates that the argument is required. Failure to provide an argument will result in an error message.")
                        .addField("Optional arguments", "`[arg]` indicates that the argument is optional. You may exclude it if you wish, but optional arguments provide more info to the bot.`")
                        .addField("Separate prompts", "`|` indicates that the bot will prompt you with different messages.")
                        .addField("Enumerated arguments", "`|` inside of `<>` or `[]` indicates that you must choose between the values. For example, `<foo|bar>` means that the argument is required and you must choose either `foo` or `bar`.")
                        .addField("Listed arguments", "`,` represents a list. `[arg, [arg]]` represents an optional argument that can be listed after the first.")
                        .addField("Persistent arguments", "`...` is the persistent operator. `[arg, ...]` is used to represent a list of arguments, all of which are optional.")
                        .setColor("RANDOM"))];
            });
        });
    },
};
