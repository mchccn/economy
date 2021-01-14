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
var sequelize_1 = require("sequelize");
var Command_1 = require("../../../Command");
var dbObjects_1 = require("../../../dbObjects");
var parseUsers_1 = __importDefault(require("../../../utils/parseUsers"));
exports.default = {
    name: "give",
    aliases: ["transfer"],
    args: true,
    usage: "<user> <amount> [item]",
    category: Command_1.Category.ECONOMY,
    description: "Give stuff to someone",
    cooldown: 5,
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            var author, currentAmount, transferTarget, target, transferAmount, item_1, userItem_1, targetItem;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, dbObjects_1.Users.findOne({
                            where: {
                                user_id: message.author.id,
                            },
                        })];
                    case 1:
                        author = _b.sent();
                        currentAmount = author.balance;
                        transferTarget = parseUsers_1.default(args, message)[0];
                        if (!transferTarget) {
                            message.channel.send("User not found!");
                            return [2 /*return*/, "invalid"];
                        }
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: transferTarget === null || transferTarget === void 0 ? void 0 : transferTarget.id,
                                },
                            })];
                    case 2:
                        target = _b.sent();
                        transferAmount = parseInt(args[1]);
                        if ((!transferAmount || isNaN(transferAmount)) &&
                            !["all", "max"].includes(args[1])) {
                            message.channel.send("Sorry **" + message.author.username + "**, that's an invalid amount.");
                            return [2 /*return*/, "invalid"];
                        }
                        if (transferAmount > currentAmount) {
                            message.channel.send("Sorry **" + message.author.username + "**, you only have " + currentAmount + ".");
                            return [2 /*return*/, "invalid"];
                        }
                        if (transferAmount <= 0) {
                            message.channel.send("Please enter an amount greater than zero, **" + message.author.username + "**.");
                            return [2 /*return*/, "invalid"];
                        }
                        if (!!args[2]) return [3 /*break*/, 3];
                        if (["all", "max"].includes(args[1]))
                            transferAmount = author.balance;
                        author.decrement("balance", {
                            by: transferAmount,
                        });
                        author.save();
                        //@ts-ignore
                        target.increment("balance", {
                            by: transferAmount,
                        });
                        target.save();
                        return [2 /*return*/, message.channel.send("Successfully transferred " + transferAmount + " coin" + (author.balance - transferAmount !== 1 ? "s" : "") + " to " + transferTarget.username + "! Your current balance is " + (author.balance - transferAmount) + " coin" + (author.balance - transferAmount !== 1 ? "s" : "") + ".")];
                    case 3: return [4 /*yield*/, dbObjects_1.CurrencyShop.findOne({
                            where: { name: (_a = {}, _a[sequelize_1.Op.like] = args[2], _a) },
                        })];
                    case 4:
                        item_1 = _b.sent();
                        return [4 /*yield*/, author.getItems()];
                    case 5:
                        userItem_1 = (_b.sent()).find(function (i) { return i.dataValues.item.name === item_1.dataValues.name; });
                        if (["all", "max"].includes(args[1]))
                            transferAmount = userItem_1.dataValues.amount;
                        if (userItem_1.dataValues.amount < transferAmount) {
                            message.channel.send("Sorry, but you don't have enough items");
                            return [2 /*return*/, "invalid"];
                        }
                        return [4 /*yield*/, target.getItems()];
                    case 6:
                        targetItem = (_b.sent()).find(function (i) { return i.dataValues.item.name === userItem_1.item.dataValues.name; });
                        if (!targetItem) {
                            targetItem = target.addItem(item_1);
                            targetItem.increment("amount", {
                                by: transferAmount - 1,
                            });
                        }
                        else {
                            targetItem.increment("amount", {
                                by: transferAmount,
                            });
                        }
                        targetItem.save();
                        userItem_1.decrement("amount", {
                            by: transferAmount,
                        });
                        userItem_1.save();
                        return [2 /*return*/, message.channel.send("Successfully transferred " + transferAmount + " item" + (transferAmount !== 1 ? "s" : "") + " to " + transferTarget.username + "! You have " + (userItem_1.dataValues.amount - transferAmount) + " item" + (userItem_1.dataValues.amount - transferAmount !== 1 ? "s" : "") + " left.")];
                }
            });
        });
    },
};
