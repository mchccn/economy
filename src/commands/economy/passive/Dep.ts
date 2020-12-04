import Command, { Category } from "../../../Command";
import { Users } from "../../../dbObjects";

export default {
  name: "dep",
  aliases: ["deposit"],
  args: true,
  usage: "<amount>",
  category: Category.ECONOMY,
  cooldown: 5,
  description: "Deposit some money into your bank",
  async execute(message, args, client) {
    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const maxDep = user.max_bank - user.bank;

    if (maxDep === 0) return message.channel.send("Your bank is full!");

    let amount = parseInt(args[0]);

    if (["all", "max"].includes(args[0])) amount = user.balance;

    if (amount > user.balance) {
      message.channel.send("You don't have that much!");
      return "invalid";
    }

    if (amount < 0) {
      message.channel.send("Please enter a valid amount!");
      return "invalid";
    }

    const toDep = maxDep >= amount ? amount : amount - maxDep;

    user.decrement("balance", {
      by: toDep,
    });
    user.increment("bank", {
      by: toDep,
    });
    user.save();

    return message.channel.send(`You deposited ${toDep} coins!`);
  },
} as Command;
