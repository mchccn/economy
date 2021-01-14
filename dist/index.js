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
exports.client = exports.Users = exports.CurrencyShop = exports.Blacklisted = void 0;
var discord_js_1 = __importDefault(require("discord.js"));
var ms_1 = __importDefault(require("ms"));
var Command_1 = require("./Command");
var config_json_1 = require("./config.json");
var dbObjects_1 = require("./dbObjects");
Object.defineProperty(exports, "Blacklisted", { enumerable: true, get: function () { return dbObjects_1.Blacklisted; } });
Object.defineProperty(exports, "CurrencyShop", { enumerable: true, get: function () { return dbObjects_1.CurrencyShop; } });
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return dbObjects_1.Users; } });
var load_1 = __importDefault(require("./load"));
var parseUsers_1 = __importDefault(require("./utils/parseUsers"));
var intents = new discord_js_1.default.Intents([
    discord_js_1.default.Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS",
]);
exports.client = new discord_js_1.default.Client({
    ws: { intents: intents },
});
exports.client.commands = new discord_js_1.default.Collection();
var cooldowns = new discord_js_1.default.Collection();
load_1.default(exports.client);
exports.client.on("message", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var blacklisted, user, args, commandName, command, _i, _a, user_1, now, timestamps, cooldownAmount, expirationTime, timeLeft, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (message.author.bot ||
                    !message.content.startsWith(config_json_1.prefix) ||
                    !message.guild)
                    return [2 /*return*/];
                return [4 /*yield*/, dbObjects_1.Blacklisted.findOne({
                        where: {
                            user_id: message.author.id,
                        },
                    })];
            case 1:
                if (!_c.sent()) return [3 /*break*/, 3];
                return [4 /*yield*/, dbObjects_1.Blacklisted.findOne({
                        where: {
                            user_id: message.author.id,
                        },
                    })];
            case 2:
                blacklisted = _c.sent();
                if (blacklisted.notified)
                    return [2 /*return*/];
                blacklisted.notified = true;
                return [2 /*return*/, message.author.send("You have been blacklisted for " + blacklisted.reason + ".")];
            case 3: return [4 /*yield*/, dbObjects_1.Users.findOne({
                    where: {
                        user_id: message.author.id,
                    },
                })];
            case 4:
                user = _c.sent();
                if (!!user) return [3 /*break*/, 6];
                return [4 /*yield*/, dbObjects_1.Users.create({ user_id: message.author.id, balance: 0 })];
            case 5:
                user = _c.sent();
                _c.label = 6;
            case 6:
                args = message.content.slice(config_json_1.prefix.length).trim().split(/ +/);
                commandName = args.shift().toLowerCase();
                if (!commandName)
                    return [2 /*return*/];
                command = exports.client.commands.get(commandName) ||
                    exports.client.commands.find(function (cmd) { return cmd.aliases.includes(commandName); });
                if (!command)
                    return [2 /*return*/];
                if (command.category === Command_1.Category.DEV && !config_json_1.devs.includes(message.author.id))
                    return [2 /*return*/];
                if (command.args && !args.length) {
                    return [2 /*return*/, message.channel.send("The usage of `" + command.name + "` is `" + command.usage + "`. Use `" + config_json_1.prefix + "help " + command.name + "` for more info.")];
                }
                _i = 0, _a = parseUsers_1.default(args, message);
                _c.label = 7;
            case 7:
                if (!(_i < _a.length)) return [3 /*break*/, 11];
                user_1 = _a[_i];
                return [4 /*yield*/, dbObjects_1.Users.findOne({
                        where: {
                            user_id: user_1 === null || user_1 === void 0 ? void 0 : user_1.id,
                        },
                    })];
            case 8:
                if (!!(_c.sent())) return [3 /*break*/, 10];
                return [4 /*yield*/, dbObjects_1.Users.create({
                        user_id: user_1 === null || user_1 === void 0 ? void 0 : user_1.id,
                    })];
            case 9:
                _c.sent();
                _c.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 7];
            case 11:
                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new discord_js_1.default.Collection());
                }
                now = Date.now();
                timestamps = cooldowns.get(command.name);
                cooldownAmount = command.cooldown * 1000;
                if (timestamps.has(message.author.id)) {
                    expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                    if (now < expirationTime) {
                        timeLeft = expirationTime - now;
                        return [2 /*return*/, message.channel.send("Please wait " + (ms_1.default(Math.round(timeLeft), {
                                long: true,
                            }).endsWith("ms")
                                ? (timeLeft / 1000).toFixed(1) + " seconds"
                                : ms_1.default(Math.round(timeLeft), {
                                    long: true,
                                })) + " before reusing the `" + command.name + "` command.")];
                    }
                }
                _c.label = 12;
            case 12:
                _c.trys.push([12, 14, , 15]);
                return [4 /*yield*/, command.execute(message, args, exports.client)];
            case 13:
                if ((_c.sent()) !== "invalid") {
                    user.increment("max_bank", {
                        by: Math.round(Math.random()),
                    });
                    user.increment("exp", {
                        by: command.cooldown > 60 ? 60 : command.cooldown,
                    });
                    if (user.exp <= dbObjects_1.levels[dbObjects_1.levels.length - 1].exp) {
                        user.level = (_b = dbObjects_1.levels.find(function (l) { return user.exp < l.exp; })) === null || _b === void 0 ? void 0 : _b.level;
                    }
                    else {
                        user.level = dbObjects_1.levels[dbObjects_1.levels.length - 1].level;
                    }
                    user.save();
                    timestamps.set(message.author.id, now);
                    setTimeout(function () { return timestamps.delete(message.author.id); }, cooldownAmount);
                }
                return [3 /*break*/, 15];
            case 14:
                err_1 = _c.sent();
                console.error(err_1);
                message.channel.send("Something went wrong!");
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); });
exports.client.login(config_json_1.token);
