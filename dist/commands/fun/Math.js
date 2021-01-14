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
    name: "math",
    aliases: ["question"],
    args: false,
    usage: "[difficulty]",
    description: "Test your math skills",
    category: Command_1.Category.FUN,
    cooldown: 5,
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            var user, filter, calc, reward, time, choice, responses, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: message.author.id,
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        filter = function (response) {
                            return response.author.id === message.author.id;
                        };
                        calc = void 0;
                        reward = void 0;
                        time = void 0;
                        switch (args[0]) {
                            case "genius":
                            case "impossible":
                                calc = calculate(20);
                                reward = 15;
                                time = 12000;
                                break;
                            case "crazy":
                            case "insane":
                                calc = calculate(15);
                                reward = 12;
                                time = 10000;
                                break;
                            case "hard":
                                calc = calculate(10);
                                reward = 7;
                                time = 8000;
                                break;
                            case "harder":
                            case "hard":
                                calc = calculate(8);
                                reward = 5;
                                time = 7500;
                                break;
                            case "ezish":
                            case "easyish":
                            case "ok":
                                calc = calculate(5);
                                reward = 4;
                                time = 6000;
                                break;
                            case "ez":
                            case "easy":
                                calc = calculate(3);
                                reward = 3;
                                time = 5000;
                                break;
                            case "ezpz":
                            case "easypeasy":
                            default:
                                calc = calculate(2);
                                reward = 2;
                                time = 5000;
                                break;
                        }
                        message.channel.send("What is `" + (calc === null || calc === void 0 ? void 0 : calc.question) + "`?");
                        return [4 /*yield*/, message.channel.awaitMessages(filter, {
                                max: 1,
                                time: time,
                                errors: ["time"],
                            })];
                    case 2:
                        choice = (_a.sent()).first();
                        if (!choice)
                            return [2 /*return*/, "invalid"];
                        if (parseInt(choice.content) !== (calc === null || calc === void 0 ? void 0 : calc.answer))
                            return [2 /*return*/, message.channel.send("Sorry, that was incorrect!")];
                        user.income(reward);
                        responses = [
                            "Excellent! You got $ coins.",
                            "Good job! I gave you $ coins!",
                            "That's right, you earned $ coins.",
                            "Nice. You get $ coins as a reward",
                        ];
                        message.channel.send(responses[Math.floor(Math.random() * responses.length)].replace("$", reward.toString()));
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        message.channel.send("Question timed out.");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
};
function calculate(length) {
    var nums = new Array(length)
        .fill("")
        .map(function (_) { return Math.floor(Math.random() * 8 + 1).toString(); });
    var ops = {
        "＋": "+",
        "－": "-",
        "·": "*",
        "^": "**",
    };
    var lastWasExp = false;
    var operations = nums.slice(1).map(function (_) {
        var initial = ops[Object.keys(ops)[Math.floor(Math.random() * Object.keys(ops).length)]];
        if (initial === "**" && !lastWasExp) {
            lastWasExp = true;
            return initial;
        }
        else {
            lastWasExp = false;
            while (initial === "**")
                initial =
                    ops[Object.keys(ops)[Math.floor(Math.random() * Object.keys(ops).length)]];
            return initial;
        }
    });
    var expression = [];
    for (var i = 0; i < nums.length + operations.length; i++)
        expression.push(i % 2 === 0 ? nums[i / 2] : operations[(i - 1) / 2]);
    var answer = eval(expression.join(" "));
    var question = expression
        .map(function ($) {
        return operations.includes($) ? Object.keys(ops).find(function (o) { return ops[o] === $; }) : $;
    })
        .join(" ");
    return {
        answer: answer,
        question: question,
    };
}
