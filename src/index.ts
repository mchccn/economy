import Discord from "discord.js";
import fs from "fs";
import path from "path";
import Command from "./Command";
import { token, prefix } from "./config.json";

const client = new Discord.Client();
client.commands = new Discord.Collection<string, Command>();
const { Users, CurrencyShop } = require("./dbObjects");
import { Op } from "sequelize";
const currency = new Discord.Collection<any, any>();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command: Command = require(`./commands/${file}`).default;

  client.commands.set(command.name, command);
}

Reflect.defineProperty(currency, "add", {
  value: async function add(id: any, amount: any) {
    const user: any = currency.get(id);
    if (user) {
      user.balance += Number(amount);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, balance: amount });
    currency.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(currency, "getBalance", {
  value: function getBalance(id: any) {
    const user: any = currency.get(id);
    return user ? user.balance : 0;
  },
});

Reflect.defineProperty(currency, "getBank", {
  value: function getBank(id: any) {
    const user: any = currency.get(id);
    return user ? user.bank : 0;
  },
});

Reflect.defineProperty(currency, "getMaxBank", {
  value: function getBank(id: any) {
    const user: any = currency.get(id);
    return user ? user.max_bank : 0;
  },
});

client.once("ready", async () => {
  console.log("Ready!");
  const storedBalances = await Users.findAll();
  storedBalances.forEach((b: any) => currency.set(b.user_id, b));
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
    command.execute(message, args, client, currency, Users, CurrencyShop);
  } catch (err) {
    console.error(err);
    message.channel.send("Something went wrong!");
  }
});

client.login(token);
