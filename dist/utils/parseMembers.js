"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parseUsers_1 = __importDefault(require("./parseUsers"));
var parseMembers = function (args, message) {
    return parseUsers_1.default(args, message).map(function (user) { var _a; return (_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(user === null || user === void 0 ? void 0 : user.id); });
};
exports.default = parseMembers;
