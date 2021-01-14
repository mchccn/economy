"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseTrim = function (string, max) {
    return string.length > max ? string.slice(0, max - 3) + "..." : string;
};
exports.default = parseTrim;
