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
var Command_1 = require("../../../Command");
var dbObjects_1 = require("../../../dbObjects");
var areas = [
    {
        name: "dog",
        money: {
            min: 2,
            max: 10,
        },
        chanceOfDying: 0.01,
        reply: "You search through a stray dog's fur and somehow find $ coins hidden away.",
        deathReply: "The dog bites you, but at least it didn't have rabies. Oh wait it does.",
    },
    {
        name: "person",
        money: {
            min: 5,
            max: 18,
        },
        chanceOfDying: 0.04,
        reply: "You snatch a wallet with $ coins away from a person. Did you just steal?",
        deathReply: "The person was a cop, and he shot you for self-defense.",
    },
    {
        name: "bushes",
        money: {
            min: 4,
            max: 12,
        },
        chanceOfDying: 0.03,
        reply: "Crawling in the bushes results in rashes... and $ coins?",
        deathReply: "You got rashes from a poison bush and died from scratching yourself too much.",
    },
    {
        name: "hole",
        money: {
            min: 5,
            max: 20,
        },
        chanceOfDying: 0.06,
        reply: "In the hole in the ground there lived $ coins. (*The Hobbit*  reference)",
        deathReply: "The hole collapses and buries you alive.",
    },
    {
        name: "farm",
        money: {
            min: 6,
            max: 16,
        },
        chanceOfDying: 0.05,
        reply: "Sifting through manure is not pretty, but you somehow found $ coins.",
        deathReply: "While searching the farm, the walls collapse and you die.",
    },
    {
        name: "couch",
        money: {
            min: 7,
            max: 9,
        },
        chanceOfDying: 0.02,
        reply: "You find $ coins in your couch.... How long has that been sitting there?",
        deathReply: "You get stuck in the couch and suffocate...?",
    },
    {
        name: "bed",
        money: {
            min: 10,
            max: 12,
        },
        chanceOfDying: 0.05,
        reply: "You crawl under your bed and find $ coins lying around.",
        deathReply: "The bed sadly falls on you while you snoop under it.",
    },
    {
        name: "dresser",
        money: {
            min: 12,
            max: 22,
        },
        chanceOfDying: 0.04,
        reply: "The drawers had $ coins in it. What are you doing?",
        deathReply: "You pull a drawer so hard that you knock yourself out of the world.",
    },
    {
        name: "fridge",
        money: {
            min: 5,
            max: 18,
        },
        chanceOfDying: 0.02,
        reply: "You find a rotten sandwich and $ coins in your fridge",
        deathReply: "The fridge door snaps shut and you get stuck inside.",
    },
    {
        name: "shack",
        money: {
            min: 17,
            max: 30,
        },
        chanceOfDying: 0.1,
        reply: "You swing open the creak door and find $ coins at your feet.",
        deathReply: "The shack comes to life and eats you whole.",
    },
    {
        name: "clubhouse",
        money: {
            min: 1,
            max: 30,
        },
        chanceOfDying: 0.065,
        reply: "You join the clubhouse and gain $ coins from the point system(?).",
        deathReply: "You went to the nightclub instead.",
    },
    {
        name: "bank",
        money: {
            min: 30,
            max: 60,
        },
        chanceOfDying: 0.25,
        reply: "You rob your local bank and get $ coins as the payout. Run!",
        deathReply: "You got shot while trying to run away.",
    },
    {
        name: "mailbox",
        money: {
            min: 10,
            max: 12,
        },
        chanceOfDying: 0.01,
        reply: "$ coins were waiting for you. Someone's nice at least.",
        deathReply: "Over 100 bills flow out and drown you in debt.",
    },
    {
        name: "piggybank",
        money: {
            min: 0,
            max: 100,
        },
        chanceOfDying: 0.01,
        reply: "You find $ in your piggybank from when you were a kid...",
        deathReply: "The piggybank shatters and the porcelain cuts you.",
    },
    {
        name: "cow",
        money: {
            min: 2,
            max: 8,
        },
        chanceOfDying: 0.02,
        reply: "The cow poops out $ coins. Ok.",
        deathReply: "The cow decides to sit on you.",
    },
    {
        name: "powerplant",
        money: {
            min: 15,
            max: 25,
        },
        chanceOfDying: 0.2,
        reply: "You find $ radioactive coins near the powerplant.",
        deathReply: "The powerplant has a meltdown and it's Chernoybl all over again.",
    },
    {
        name: "school",
        money: {
            min: 4,
            max: 8,
        },
        chanceOfDying: 0.01,
        reply: "You find $ coins at your local elementary school.",
        deathReply: "The doors slam shut on you while you were trying to enter.",
    },
];
exports.default = {
    name: "search",
    aliases: ["scout"],
    args: false,
    usage: " | <area>",
    category: Command_1.Category.ECONOMY,
    cooldown: 30,
    description: "Search for coins!",
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            var shuffled, chosen, prompt, msg, filter, choice, user, areaChosen, money;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shuffled = shuffleArray(areas);
                        chosen = shuffled.slice(0, 3);
                        prompt = "Where do you want to search?\n" + chosen
                            .map(function (c) { return "`" + c.name + "`"; })
                            .join("\n");
                        return [4 /*yield*/, message.channel.send(prompt)];
                    case 1:
                        msg = _a.sent();
                        filter = function (response) {
                            return chosen
                                .map(function (c) { return c.name; })
                                .includes(response.content.toLocaleLowerCase()) &&
                                response.author.id === message.author.id;
                        };
                        return [4 /*yield*/, msg.channel.awaitMessages(filter, {
                                max: 1,
                                time: 15000,
                                errors: ["time"],
                            })];
                    case 2:
                        choice = (_a.sent()).first();
                        if (!choice)
                            return [2 /*return*/, "invalid"];
                        return [4 /*yield*/, dbObjects_1.Users.findOne({
                                where: {
                                    user_id: message.author.id,
                                },
                            })];
                    case 3:
                        user = _a.sent();
                        areaChosen = chosen.find(function (c) { return c.name === choice.content.toLocaleLowerCase(); });
                        if (Math.random() < areaChosen.chanceOfDying) {
                            user.kill();
                            return [2 /*return*/, choice.channel.send(areaChosen.deathReply)];
                        }
                        money = Math.round(Math.random() * (areaChosen.money.max - areaChosen.money.min) +
                            areaChosen.money.min);
                        user.income(money);
                        return [2 /*return*/, choice.channel.send(areaChosen.reply.replace("$", money))];
                }
            });
        });
    },
};
function shuffleArray(a) {
    var array = a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
