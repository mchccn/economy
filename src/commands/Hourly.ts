import Discord from "discord.js";
import Command, { Category } from "../Command";
import parseUsers from "../utils/parseUsers";

export default {
  name: "hourly",
  aliases: [],
  args: false,
  usage: "",
  category: Category.ECONOMY,
  description: "Get your hour's worth",
  cooldown: 60,
  async execute(message, args, client, currency, users) {
    const amount = 100;
    //@ts-ignore
    currency.add(message.author.id, amount);
    message.channel.send(`You got ${amount} coins!`);
  },
} as Command;
