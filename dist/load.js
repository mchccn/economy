"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function init(client) {
    load(path_1.default.join(__dirname, "/commands"), function (err, res) {
        if (err)
            return console.error(err);
        res.forEach(function (r) {
            var command = require(r).default;
            client.commands.set(command.name, command);
        });
    });
    load(path_1.default.join(__dirname, "/events"), function (err, res) {
        if (err)
            return console.error(err);
        res.forEach(function (r) {
            var event = require(r).default;
            //@ts-ignore
            client[event.type](event.event, event.run);
        });
    });
    function load(dir, done) {
        var results = [];
        fs_1.default.readdir(dir, function (err, list) {
            if (err)
                return done(err);
            var pending = list.length;
            if (!pending)
                return done(null, results);
            list.forEach(function (file) {
                file = path_1.default.resolve(dir, file);
                fs_1.default.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        load(file, function (err, res) {
                            results = results.concat(res);
                            if (!--pending)
                                done(null, results);
                        });
                    }
                    else {
                        results.push(file);
                        if (!--pending)
                            done(null, results);
                    }
                });
            });
        });
    }
}
exports.default = init;
