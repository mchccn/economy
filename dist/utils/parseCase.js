"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseCase = function (string) {
    return string
        .split("_")
        .map(function (c) { return c[0] + c.slice(1).toLowerCase(); })
        .join(" ");
};
exports.default = parseCase;
