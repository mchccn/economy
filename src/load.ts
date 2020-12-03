import fs from "fs";
import path from "path";
import Command from "./Command";
import { Client } from "discord.js";

export default function init(client: Client) {
  fs.readdirSync(path.join(__dirname, "/commands")).forEach((folder) => {
    fs.readdirSync(path.join(__dirname, "/commands", `/${folder}`))
      .filter((file) => file.endsWith(".ts"))
      .forEach((file) => {
        const command: Command = require(`./commands/${folder}/${file}`)
          .default;
        client.commands.set(command.name, command);
      });
  });

  fs.readdirSync(path.join(__dirname, "/extensions"))
    .filter((file) => file.endsWith(".ts"))
    .forEach((file) => {
      require(`./extensions/${file}`).default();
    });

  fs.readdirSync(path.join(__dirname, "/events"))
    .filter((file) => file.endsWith(".ts"))
    .forEach((file) => {
      const event = require(`./events/${file}`).default;
      //@ts-ignore
      client[event.type](event.event, event.run);
    });
}
