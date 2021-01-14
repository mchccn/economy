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
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite",
});
var CurrencyShop = require("./models/CurrencyShop")(sequelize, sequelize_1.DataTypes);
var Occupations = require("./models/Occupations")(sequelize, sequelize_1.DataTypes);
require("./models/Users")(sequelize, sequelize_1.DataTypes);
require("./models/UserItems")(sequelize, sequelize_1.DataTypes);
require("./models/Blacklisted")(sequelize, sequelize_1.DataTypes);
require("./models/BlackMarket")(sequelize, sequelize_1.DataTypes);
var force = process.argv.includes("--force") || process.argv.includes("-f");
try {
    (function () {
        return __awaiter(this, void 0, void 0, function () {
            var upserts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sequelize.sync({ force: force })];
                    case 1:
                        _a.sent();
                        upserts = [
                            CurrencyShop.upsert({
                                emoji: "🍵",
                                name: "Tea",
                                cost: 10,
                                description: "Drink some tea. Green tea.",
                                worth: "SMALL",
                                type: "COLLECTABLE",
                                edible: false,
                            }),
                            CurrencyShop.upsert({
                                emoji: "☕",
                                name: "Coffee",
                                cost: 15,
                                description: "Drink some coffee. No sugar included.",
                                worth: "SMALL",
                                type: "COLLECTABLE",
                                edible: false,
                            }),
                            CurrencyShop.upsert({
                                emoji: "🍰",
                                name: "Cake",
                                cost: 30,
                                description: "Eat some cake for carbs.",
                                worth: "SMALL",
                                type: "USE_ONCE",
                                edible: true,
                            }),
                            CurrencyShop.upsert({
                                emoji: "🧲",
                                name: "Magnet",
                                cost: 200,
                                description: "Find some coins with this heavy duty magnet.",
                                worth: "MEDIUM",
                                type: "USE_MANY",
                                edible: false,
                            }),
                            CurrencyShop.upsert({
                                emoji: "🕶",
                                name: "Sunglasses",
                                cost: 500,
                                description: "Look nice and gain perks. Breaks easily, be careful.",
                                worth: "MEDIUM",
                                type: "USE_ONCE",
                                edible: false,
                            }),
                            CurrencyShop.upsert({
                                emoji: "🖥",
                                name: "Computer",
                                cost: 1000,
                                description: "Post some dank memes and get ad revenue.",
                                worth: "MEDIUM",
                                type: "USE_MANY",
                                edible: false,
                            }),
                            CurrencyShop.upsert({
                                emoji: "🏆",
                                name: "Trophy",
                                cost: 10000,
                                description: "What's the point of this again?",
                                worth: "LARGE",
                                type: "COLLECTABLE",
                                edible: false,
                            }),
                            Occupations.upsert({
                                name: "unemployed",
                                min: 0,
                                max: 0,
                                scramble: null,
                                words: null,
                                level: 0,
                            }),
                            Occupations.upsert({
                                name: "accountant",
                                min: 30,
                                max: 45,
                                scramble: "numbers statistics mathematics calculate",
                                words: "account number spreadsheet calculator data",
                                level: 10,
                            }),
                            Occupations.upsert({
                                name: "salesman",
                                min: 35,
                                max: 50,
                                scramble: "soliciting marketing travel selling suitcase",
                                words: "sales necktie stereotype annoying soliciting",
                                level: 15,
                            }),
                            Occupations.upsert({
                                name: "businessman",
                                min: 50,
                                max: 65,
                                scramble: "business corporate company tired",
                                words: "corporation group business stocks",
                                level: 20,
                            }),
                            Occupations.upsert({
                                name: "developer",
                                min: 60,
                                max: 75,
                                scramble: "production errors develop typescript javascript python java",
                                words: "error warning logs console terminal",
                                level: 25,
                            }),
                            Occupations.upsert({
                                name: "manager",
                                min: 100,
                                max: 125,
                                scramble: "manage layoff moderate paperwork",
                                words: "records manage work scream",
                                level: 30,
                            }),
                            Occupations.upsert({
                                name: "ceo",
                                min: 175,
                                max: 200,
                                scramble: "stocks marketshare manage decide",
                                words: "talk manage decisions moderate",
                                level: 40,
                            }),
                            Occupations.upsert({
                                name: "president",
                                min: 225,
                                max: 250,
                                scramble: "speech treaty executive president election",
                                words: "election vote laws veto press",
                                level: 45,
                            }),
                        ];
                        return [4 /*yield*/, Promise.all(upserts)];
                    case 2:
                        _a.sent();
                        console.log("Database synced");
                        sequelize.close();
                        return [2 /*return*/];
                }
            });
        });
    })();
}
catch (e) {
    console.error(e);
}
