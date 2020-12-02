import Discord from "discord.js";
import Command, { Category } from "../Command";
import parseUsers from "../utils/parseUsers";

export default {
  name: "give",
  aliases: ["transfer"],
  args: true,
  usage: "<user> <amount> [item]",
  category: Category.ECONOMY,
  description: "Give stuff to someone",
  cooldown: 10,
  async execute(message, args, client, currency, users) {
    //@ts-ignore
    const currentAmount = currency.getBalance(message.author.id);
    const transferTarget = parseUsers(args, message)[0];
    const transferAmount = parseInt(args[1]);

    if (!transferAmount || isNaN(transferAmount))
      return message.channel.send(
        `Sorry ${message.author}, that's an invalid amount.`
      );
    if (transferAmount > currentAmount)
      return message.channel.send(
        `Sorry ${message.author}, you only have ${currentAmount}.`
      );
    if (transferAmount <= 0)
      return message.channel.send(
        `Please enter an amount greater than zero, ${message.author}.`
      );
    if (!transferTarget) return message.channel.send("User not found!");

    if (!args[2]) {
      //@ts-ignore
      currency.add(message.author.id, -transferAmount);
      //@ts-ignore
      currency.add(transferTarget.id, transferAmount);

      return message.channel.send(
        `Successfully transferred ${transferAmount} to ${
          transferTarget.username
          //@ts-ignore
        }! Your current balance is ${currency.getBalance(message.author.id)}.`
      );
    } else {
      //TODO: GIVE THE ITEM TO THE TARGET
    }
  },
} as Command;
