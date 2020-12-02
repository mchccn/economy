import Discord from "discord.js";
import Command from "./Command";
import { token, prefix } from "./config.json";
import init from "./load";

const { Users, CurrencyShop } = require("./dbObjects");

const intents = new Discord.Intents([
  Discord.Intents.NON_PRIVILEGED,
  "GUILD_MEMBERS",
]);

export const client = new Discord.Client({
  ws: { intents },
});

client.commands = new Discord.Collection<string, Command>();

const cooldowns = new Discord.Collection<
  string,
  Discord.Collection<string, number>
>();

export const currency = new Discord.Collection<any, any>();

init(client);

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

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = command.cooldown * 1000;

  if (timestamps!.has(message.author.id)) {
    const expirationTime = timestamps!.get(message.author.id)! + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  } else {
    timestamps!.set(message.author.id, now);
    setTimeout(() => timestamps!.delete(message.author.id), cooldownAmount);
  }

  try {
    command.execute(message, args, client, currency, Users, CurrencyShop);
  } catch (err) {
    console.error(err);
    message.channel.send("Something went wrong!");
  }
});

client.login(token);
