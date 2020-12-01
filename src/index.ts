import Discord from "discord.js";
import fs from "fs";
import path from "path";
import Command from "./Command";
import { token, prefix } from "./config.json";

const client = new Discord.Client();
client.commands = new Discord.Collection<string, Command>();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command: Command = require(`./commands/${file}`).default;

  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
  client.user?.setActivity({ type: "WATCHING", name: ` for ${prefix}help` });
});

client.on("message", async (message) => {
  if (
    message.author.bot ||
    !message.content.startsWith(prefix) ||
    !message.guild
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()!.toLowerCase();

  if (!commandName) return;

  const command: Command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.args && !args.length) {
    return message.channel.send(
      `The usage of \`${command.name}\` is \`${command.usage}\`. Use \`${prefix}help ${command.name}\` for more info.`
    );
  }

  try {
    command.execute(message, args, client);
  } catch (err) {
    console.error(err);
    message.channel.send("Something went wrong!");
  }
});

client.login(token);
