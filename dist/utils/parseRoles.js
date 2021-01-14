"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseRoles = function (args, message) {
    return args
        .map(function (arg) {
        if (/^<@&\d{18}>$/.test(arg))
            return arg.slice(3, -1);
        else if (/^\d{18}$/.test(arg))
            return arg;
        else
            return undefined;
    })
        .filter(function (arg) { return !!arg; })
        .map(function (id) { var _a, _b; return (_b = message.client.guilds.cache.get((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id)) === null || _b === void 0 ? void 0 : _b.roles.cache.get(id); })
        .filter(function (role) { return !!role; });
};
exports.default = parseRoles;
