import { Client } from "discord.js";
import fs from "fs";
import path from "path";
import Command from "./Command";

export default function init(client: Client) {
  load(path.join(__dirname, "/commands"), (err: any, res: any) => {
    if (err) return console.error(err);

    res.forEach((r: any) => {
      const command: Command = require(r).default;

      client.commands.set(command.name, command);
    });
  });

  load(path.join(__dirname, "/events"), (err: any, res: any) => {
    if (err) return console.error(err);

    res.forEach((r: any) => {
      const event = require(r).default;
      //@ts-ignore
      client[event.type](event.event, event.run);
    });
  });

  function load(dir: any, done: any) {
    let results: any[] = [];
    fs.readdir(dir, function (err, list) {
      if (err) return done(err);
      let pending = list.length;
      if (!pending) return done(null, results);
      list.forEach(function (file) {
        file = path.resolve(dir, file);
        fs.stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {
            load(file, function (err: any, res: any) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            results.push(file);
            if (!--pending) done(null, results);
          }
        });
      });
    });
  }
}
