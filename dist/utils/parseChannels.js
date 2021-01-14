"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseChannels = function (args, message) {
    return args
        .map(function (arg) {
        if (/^<#\d{18}>$/.test(arg))
            return arg.slice(2, -1);
        else if (/^\d{18}$/.test(arg))
            return arg;
        else
            return undefined;
    })
        .filter(function (arg) { return !!arg; })
        .map(function (id) { return message.client.channels.cache.get(id); })
        .filter(function (channel) { return !!channel; });
};
exports.default = parseChannels;
