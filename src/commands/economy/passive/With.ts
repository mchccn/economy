import Command, { Category } from "../../../Command";
import { Users } from "../../../dbObjects";

export default {
  name: "with",
  aliases: ["withdraw"],
  args: true,
  usage: "<amount>",
  category: Category.ECONOMY,
  cooldown: 5,
  description: "Withdraw some money from your bank",
  async execute(message, args, client) {
    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const maxWith = user.bank;

    let amount = parseInt(args[0]);

    if (["all", "max"].includes(args[0])) amount = user.bank;

    if (amount > user.bank) {
      message.channel.send("You don't have that much in your bank!");
      return "invalid";
    }

    if (amount < 0) {
      message.channel.send("Please enter a valid amount!");
      return "invalid";
    }

    const toWith = maxWith >= amount ? amount : amount - maxWith;

    user.decrement("bank", {
      by: toWith,
    });
    user.increment("balance", {
      by: toWith,
    });
    user.save();

    return message.channel.send(`You withdrew ${toWith} coins!`);
  },
} as Command;
